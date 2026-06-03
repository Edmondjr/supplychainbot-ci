import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import ChatPage from './pages/ChatPage';
import Login from './pages/Login';

function AppLayout({ children }) {
  return (
    <div className="flex flex-col" style={{ minHeight: '100vh', background: '#0a0f1e' }}>
      <Navbar />
      <div className="flex" style={{ paddingTop: '64px', minHeight: 'calc(100vh - 64px)' }}>
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <AppLayout><Dashboard /></AppLayout>
          } />
          <Route path="/chat" element={
            <AppLayout>
              <div style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
                <ChatPage />
              </div>
            </AppLayout>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
