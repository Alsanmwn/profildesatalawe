import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon,
  AccountTree as StrukturIcon,
  Assignment as ProgramIcon,
  Logout as LogoutIcon,
  ExpandMore,
  ExpandLess,
  Groups as PendudukIcon,
  Person as KadesIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import LogoTalawe from '../asset/foto/LogoTalawe.png';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Sidebar = () => {
  const [isDataDesaOpen, setIsDataDesaOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // untuk mobile drawer
  const navigate = useNavigate();

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut(auth);
      localStorage.removeItem('user');
      navigate('/login-admin');
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Tombol Hamburger di Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-[10000]">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#42A91C] text-white p-2 rounded shadow-lg"
        >
          <MenuIcon />
        </button>
      </div>

      {/* Overlay di Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998] md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-60 bg-[#42A91C] text-white flex flex-col justify-between shadow-lg z-[9999] transform transition-transform duration-300 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* Logo dan Nama Desa */}
        <div>
          {/* Tombol close di mobile */}
          <div className="md:hidden flex justify-end p-3">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex flex-col items-center py-6">
            <img src={LogoTalawe} alt="Logo" className="w-14 h-14 mb-2" />
            <div className="text-center text-sm font-semibold">
              <div>Desa Talawe</div>
              <div className="text-[#FFEF74] text-xs">Kec. Watang Sidenreng</div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col gap-2 mt-6 px-4">
            <SidebarItem icon={<HomeIcon />} text="Dashboard" to="/dashboard" onClick={() => setIsOpen(false)} />

            {/* Dropdown Data Desa */}
            <div>
              <button
                onClick={() => setIsDataDesaOpen(!isDataDesaOpen)}
                className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-[#36901A] transition"
              >
                <div className="flex items-center gap-3">
                  <ProgramIcon />
                  <span className="text-sm font-medium">Data Desa</span>
                </div>
                {isDataDesaOpen ? <ExpandLess /> : <ExpandMore />}
              </button>

              {isDataDesaOpen && (
                <div className="ml-8 mt-1 flex flex-col gap-1">
                  <SidebarItem icon={<PendudukIcon />} text="Data Penduduk" to="/data-penduduk" small onClick={() => setIsOpen(false)} />
                  <SidebarItem icon={<KadesIcon />} text="Sambutan Kades" to="/sambutan-kades" small onClick={() => setIsOpen(false)} />
                </div>
              )}
            </div>

            <SidebarItem icon={<StrukturIcon />} text="Struktur Desa" to="/struktur-desa" onClick={() => setIsOpen(false)} />
            <SidebarItem icon={<ProgramIcon />} text="Program Desa" to="/program-desa" onClick={() => setIsOpen(false)} />
          </nav>
        </div>

        {/* Logout */}
        <div className="px-4 py-6">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-[#36901A] transition text-sm font-medium w-full text-left"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Popup Konfirmasi Logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[10000]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {isLoggingOut ? 'Sedang keluar...' : 'Yakin mau keluar?'}
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmLogout}
                disabled={isLoggingOut}
                className={`${
                  isLoggingOut
                    ? 'bg-red-400 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600'
                } text-white px-4 py-2 rounded flex items-center justify-center gap-2`}
              >
                {isLoggingOut && (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                {isLoggingOut ? 'Keluar...' : 'Keluar'}
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                disabled={isLoggingOut}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SidebarItem = ({ icon, text, to, small, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-[#36901A] transition ${
        small ? 'text-xs pl-2' : 'text-sm font-medium'
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default Sidebar;
