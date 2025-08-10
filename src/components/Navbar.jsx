import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LogoTalawe from '../asset/foto/LogoTalawe.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Fungsi untuk handle klik menu
  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Tutup menu mobile kalau sedang terbuka
  };

  const menuItems = [
    { label: 'Beranda', path: '/' },
    { label: 'Profil Desa', path: '/ProfilDesa' },
    { label: 'Data Desa', path: '/DataDesa' },
    { label: 'Galeri', path: '/Galeri' },
    { label: 'Kontak', path: '/Kontak' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#058909] to-[#0aa50e] shadow-lg">
      {/* Container dengan padding kiri-kanan 20px */}
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          
          {/* Kiri: Logo dan Nama Desa - padding kiri dari container */}
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-90 transition-opacity duration-200"
            onClick={() => handleNavClick('/')}
          >
            <div className="flex-shrink-0 bg-white rounded-full p-1">
              <img 
                src={LogoTalawe} 
                alt="Logo Desa Talawe" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-white text-lg font-bold tracking-wide">Desa Talawe</div>
              <div className="text-green-100 text-sm font-medium">Kec. Watang Sidenreng</div>
            </div>
            <div className="block sm:hidden">
              <div className="text-white text-base font-bold">Desa Talawe</div>
            </div>
          </div>

          {/* Kanan: Menu Navigation (desktop only) - padding kanan dari container */}
          <div className="hidden lg:flex items-center">
            <div className="flex space-x-8">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.path)}
                  className="relative px-4 py-2 text-white font-medium text-sm xl:text-base rounded-lg 
                           hover:bg-white hover:bg-opacity-10 transition-all duration-200 
                           hover:text-green-100 active:scale-95 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white 
                                 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white 
                       hover:bg-white hover:bg-opacity-10 transition-all duration-200 
                       focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-5 pt-2 pb-3 space-y-1 bg-green-800 bg-opacity-50 rounded-b-lg backdrop-blur-sm">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.path)}
                  className="block w-full text-left px-3 py-2 text-white font-medium text-base
                           hover:bg-white hover:bg-opacity-10 rounded-md transition-all duration-200
                           active:bg-white active:bg-opacity-20"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;