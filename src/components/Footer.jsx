import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#058909] text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Kolom 1: Profil Desa */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#FFEF74]">Profil Desa</h3>
          <p className="text-sm leading-relaxed">
            Website ini berisikan informasi seputar Desa Talawe, mulai dari profil desa, program kerja, hingga data dan layanan untuk masyarakat. Tujuannya adalah memudahkan akses informasi dan transparansi bagi seluruh warga.
          </p>
        </div>

        {/* Kolom 2: Tentang Developer */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#FFEF74]">Tentang Developer</h3>
          <p className="text-sm leading-relaxed">
            Website ini dikembangkan oleh Alsa Nurmawan, Mahasiswa Teknik Informatika Fakultas Teknik Universitas Hasanuddin, sebagai kontribusi dalam KKN Gelombang 114 di Desa Talawe, Agustus 2025, untuk mendukung keterbukaan informasi dan kemajuan desa.
          </p>
          <p className="mt-3 italic">"Keep On Fighting Till The End"</p>
        </div>

        {/* Kolom 3: Harapan */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#FFEF74]">Harapan</h3>
          <p className="text-sm leading-relaxed">
            Semoga Desa Talawe terus maju dan berkembang, serta menjadi contoh desa
            yang mandiri dan sejahtera. Harapan kami, masyarakat tetap menjaga
            persatuan, kebersamaan, dan semangat gotong royong.
          </p>
        </div>
      </div>

      {/* Garis pemisah */}
      <div className="border-t border-white mt-8 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Desa Talawe. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
