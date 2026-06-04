import Anthropic from '@anthropic-ai/sdk';
import { parseSources, deduplicateSources } from './sourceParser';

const MODEL = 'claude-sonnet-4-5';

const SYSTEM_PROMPTS = {
  Formation: `Tu es SupplyChainBot CI, un expert en logistique et supply chain spécialisé sur la Côte d'Ivoire.
Tu aides les professionnels à comprendre les procédures douanières, les Incoterms, le GUCE (Guichet Unique du Commerce Extérieur), le Port d'Abidjan, et la réglementation du commerce extérieur ivoirien.
Réponds de manière pédagogique, avec des exemples concrets adaptés au contexte ivoirien.
Utilise des tableaux et des listes pour structurer tes réponses quand c'est utile.
Langue: français.`,

  Veille: `Tu es SupplyChainBot CI, un expert en veille supply chain et commerce international pour la Côte d'Ivoire.
Tu dois TOUJOURS utiliser l'outil web_search pour trouver des informations récentes et actualisées.
Cite systématiquement tes sources avec des liens cliquables.
Couvre: actualités du Port d'Abidjan, GUCE, tarifs douaniers CI, taux de fret, nouvelles réglementations.
Structure ta réponse: résumé des faits récents → sources citées.
Langue: français.`,

  Calcul: `Tu es SupplyChainBot CI, un calculateur expert en coûts logistiques pour la Côte d'Ivoire.
Tu aides à calculer: surestaries (demurrage/detention), coûts de transit, droits de douane, taxes à l'importation/exportation, coûts Incoterms.
Demande toujours les paramètres manquants avant de calculer.
Présente les résultats sous forme de tableau détaillé avec le total en FCFA et/ou USD.
Formules: surestaries = (jours de retard - jours francs) × taux journalier × nombre de conteneurs.
Droits de douane CI: taux selon la nomenclature tarifaire UEMOA/CEDEAO.
Langue: français.`,
};

export async function streamChatMessage({ mode, messages, onDelta, onSources, onDone, onError }) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) {
    onError?.(new Error('VITE_ANTHROPIC_API_KEY non configurée. Ajoutez-la dans votre fichier .env'));
    return;
  }

  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

  const tools = mode === 'Veille'
    ? [{ type: 'web_search_20250305', name: 'web_search' }]
    : [];

  try {
    const stream = await client.messages.stream({
      model: MODEL,
      max_tokens: 4096,
      system: SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.Formation,
      tools,
      messages,
    });

    const collectedSources = [];

    for await (const event of stream) {
      if (event.type === 'content_block_delta') {
        if (event.delta?.type === 'text_delta') {
          onDelta?.(event.delta.text);
        }
      }

      if (event.type === 'message_delta' && event.usage) {
        // usage info available if needed
      }

      // Collect tool results for source extraction
      if (event.type === 'content_block_start' && event.content_block?.type === 'tool_result') {
        const sources = parseSources([event.content_block]);
        collectedSources.push(...sources);
      }
    }

    const finalMessage = await stream.finalMessage();

    // Parse sources from all tool_result blocks in the response
    const allContent = finalMessage.content || [];
    for (const block of allContent) {
      if (block.type === 'tool_result') {
        const sources = parseSources([block]);
        collectedSources.push(...sources);
      }
    }

    // Also check if there were web search results in tool use
    for (const block of allContent) {
      if (block.type === 'tool_use' && block.name === 'web_search') {
        // Sources come from the tool_result in the next turn
      }
    }

    if (collectedSources.length > 0) {
      onSources?.(deduplicateSources(collectedSources));
    }

    onDone?.(finalMessage);
  } catch (err) {
    onError?.(err);
  }
}

export function buildMessageHistory(chatMessages) {
  return chatMessages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({ role: m.role, content: m.content }));
}
