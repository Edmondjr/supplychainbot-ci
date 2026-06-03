import KPIWidget from '../components/dashboard/KPIWidget';
import QuickActionCard from '../components/dashboard/QuickActionCard';

const kpis = [
  { title: 'Navires au Port d\'Abidjan', value: '47', unit: 'en cours', trend: '+3', icon: '🚢', color: '#3b82f6' },
  { title: 'Conteneurs en attente', value: '1 284', unit: 'EVP', trend: '-5.2%', icon: '📦', color: '#60a5fa' },
  { title: 'Délai moyen dédouanement', value: '4.2', unit: 'jours', trend: '-0.8j', icon: '⏱️', color: '#34d399' },
  { title: 'Taux de fret Abidjan—Chine', value: '$3 450', unit: '/EVP', trend: '+8%', icon: '📈', color: '#f59e0b' },
];

const quickActions = [
  {
    title: 'Calculer mes surestaries',
    description: 'Estimez rapidement les frais de surestaries et de détention pour vos conteneurs.',
    icon: '🧮',
    prompt: 'Je souhaite calculer mes surestaries. Mon conteneur 20\' est arrivé au port il y a 10 jours. Les jours francs accordés sont 5 jours et le taux journalier est de $150/conteneur. Quel est le montant total ?',
    mode: 'Calcul',
    accentColor: '#f59e0b',
  },
  {
    title: 'Actualités Port d\'Abidjan',
    description: 'Consultez les dernières informations et perturbations au Port d\'Abidjan.',
    icon: '📰',
    prompt: 'Quelles sont les dernières actualités du Port d\'Abidjan ? Y a-t-il des perturbations, nouveaux services ou changements tarifaires récents ?',
    mode: 'Veille',
    accentColor: '#3b82f6',
  },
  {
    title: 'Expliquer un Incoterm',
    description: 'Comprenez les responsabilités et risques des Incoterms 2020.',
    icon: '📋',
    prompt: 'Explique-moi les différences entre CIF, FOB et DAP dans le contexte des importations en Côte d\'Ivoire. Quand utiliser chacun ?',
    mode: 'Formation',
    accentColor: '#8b5cf6',
  },
  {
    title: 'Tarifs douaniers CI',
    description: 'Renseignez-vous sur les droits et taxes à l\'importation en Côte d\'Ivoire.',
    icon: '🏛️',
    prompt: 'Quels sont les tarifs douaniers applicables pour importer des équipements électroniques (smartphones et ordinateurs) en Côte d\'Ivoire ? Inclure TVA, droits de douane et taxes diverses.',
    mode: 'Veille',
    accentColor: '#10b981',
  },
];

export default function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir';

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Welcome Banner */}
      <div className="rounded-2xl p-6 mb-8 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0d1f3c 0%, #111d35 50%, #0d1526 100%)',
          border: '1px solid rgba(59,130,246,0.2)',
        }}>
        <div className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse at 80% 50%, #3b82f6 0%, transparent 60%)' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
              NexaBridge Solutions
            </span>
          </div>
          <h1 className="text-2xl font-bold mt-3 mb-1" style={{ color: '#f1f5f9' }}>
            SupplyChainBot CI — Votre intelligence supply chain
          </h1>
          <p className="text-sm" style={{ color: '#94a3b8' }}>
            {greeting} ! Gérez vos opérations logistiques, douanières et portuaires en Côte d&apos;Ivoire avec l&apos;IA.
          </p>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-6xl opacity-10 hidden md:block">
          🚢
        </div>
      </div>

      {/* KPI Row */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#475569' }}>
          Indicateurs clés
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(kpi => (
            <KPIWidget key={kpi.title} {...kpi} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#475569' }}>
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map(action => (
            <QuickActionCard key={action.title} {...action} />
          ))}
        </div>
      </div>
    </div>
  );
}
