import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Auth from './pages/Auth';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AccountSettings from './pages/AccountSettings';
import Deploy from './pages/Deploy';

import Header from './components/Header';
import Footer from './components/Footer';
import FallBack from './pages/FallBack';

const AppLayout = () => {
  const location = useLocation();
  const hideLayout = location.pathname === '/auth'; // Hide Header & Footer on auth page

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
      {!hideLayout && <Header />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/deploy" element={<Deploy />} />
          <Route path="*" element={<FallBack />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
