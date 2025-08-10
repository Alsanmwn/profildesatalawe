import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Beranda from './pages/user/Beranda';
import ProfilDesa from './pages/user/ProfilDesa';
import DataDesa from './pages/user/DataDesa';
import Dashboard from './pages/admin/Dashboard';
import LoginAdmin from './pages/admin/LoginAdmin';
import DataPenduduk from './pages/admin/DataPenduduk';
import SambutanKades from './pages/admin/SambutanKades';
import Struktur from './pages/admin/Struktur';
import ProgramDesa from './pages/admin/ProgramDesa';
import Peternakan from './pages/user/Peternakan';
import Pertanian from './pages/user/Pertanian';
import Galeri from './pages/user/Galeri';
import Kontak from './pages/user/Kontak';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Router untuk halaman admin */}
          <Route path="/login-admin" element={<AuthProvider><LoginAdmin/></AuthProvider>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/data-penduduk" element={<ProtectedRoute><DataPenduduk /></ProtectedRoute>} />
          <Route path="/sambutan-kades" element={<ProtectedRoute><SambutanKades /></ProtectedRoute>} />
          <Route path="/struktur-desa" element={<ProtectedRoute><Struktur /></ProtectedRoute>} />
          <Route path="/program-desa" element={<ProtectedRoute><ProgramDesa /></ProtectedRoute>} />

          {/* Router untuk halaman user */}
          <Route path="/" element={<Beranda />} />
          <Route path="/ProfilDesa" element={<ProfilDesa />} />
          <Route path="/DataDesa" element={<DataDesa />} />
          <Route path="/peternakan" element={<Peternakan />} />
          <Route path="/Pertanian" element={<Pertanian />} />
          <Route path="/Galeri" element={<Galeri />} />
          <Route path="/Kontak" element={<Kontak />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;