import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase'; 
import foto4 from '../../asset/foto/foto4.jpg';
import strukturdesa from '../../asset/foto/strukturdesa.jpg';
import pertanian from '../../asset/foto/pertanian.jpg';
import peternakan from '../../asset/foto/peternakan.jpg';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ProfilDesa = () => {
  const [showModal, setShowModal] = useState(false);
  const [expandedSector, setExpandedSector] = useState(null);
  const [visi, setVisi] = useState('');
  const [misi, setMisi] = useState('');
  const [bagan, setBagan] = useState('');
  const [petaDesa, setPetaDesa] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'struktur_desa', 'struktur'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setVisi(data.visi || '');
        setMisi(data.misi || '');
        setBagan(data.bagan || '');
        setPetaDesa(data.peta_desa || ''); 
      }
    });

    return () => unsub();
  }, []);

  const toggleSector = (sector) => {
    setExpandedSector(expandedSector === sector ? null : sector);
  };

  return (
    <div className="bg-white text-gray-800">
      <Navbar />

      {/* Header Image - Responsif */}
      <div className="w-full h-48 sm:h-60 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={foto4}
          alt="Profil Desa Talawe"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-6 md:py-8 space-y-12 md:space-y-16">
        {/* Section Sejarah Desa Talawe - Responsif */}
        <section className="text-center py-6 md:py-8 bg-white">
          <h2 className="text-green-700 text-lg sm:text-xl md:text-2xl font-bold uppercase mb-4 md:mb-6 px-2">
            SEJARAH DESA TALAWE
          </h2>
          <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
            <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed mb-4 text-justify sm:text-center">
              Desa Talawe Resmi terbentuk sebagai Desa Persiapan Talawe Pada Tahun 2004 dan menjadi definitive pada tahun 2021 yang terdiri 
              2 dusun yaitu Dusun 1 Bulukonyi dan Dusun 2 Cappa Batae. Sebelum Talawe dimakarkan Menjadi Desa Persiapan Talawe pada tahun 2004 masih disebut Dusun II
              Bulukonyi menjadi bagian dari Desa Damai dan pada Tahun 2021 setelah Tertib Administrasi menjadi Definitif Desa Talawe...
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="text-xs sm:text-sm font-medium hover:underline transition-colors duration-200"
              style={{ color: '#009AB5' }}
            >
              Lihat lebih banyak
            </button>
          </div>

          {/* Modal Sejarah - Responsif */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white max-w-2xl w-full mx-2 sm:mx-4 rounded-lg shadow-lg p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  &times;
                </button>
                <h3 className="text-green-700 text-base sm:text-lg font-bold mb-4 pr-8">Sejarah Lengkap Desa Talawe</h3>
                <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed text-justify">
                  Desa Talawe resmi terbentuk sebagai Desa Persiapan Talawe pada tahun 2004 dan menjadi desa definitif pada tahun 2021. 
                  Wilayahnya terdiri dari dua dusun, yaitu Dusun I Bulukonyi dan Dusun II Cappa Batae. Sebelum dimekarkan menjadi Desa 
                  Persiapan Talawe, wilayah ini dikenal sebagai Dusun II Bulukonyi, yang merupakan bagian dari Desa Damai. Pada masa itu, masyarakatnya 
                  sebagian besar berprofesi sebagai petani dan peternak, hidup bergotong royong, dan menjunjung tinggi adat istiadat lokal. Perubahan status 
                  menjadi desa persiapan pada tahun 2004 merupakan langkah awal menuju kemandirian pemerintahan desa. Setelah melalui proses pembinaan, penataan 
                  wilayah, dan tertib administrasi, pada tahun 2021 Desa Talawe resmi ditetapkan sebagai desa definitif. Sejak saat itu, Desa Talawe terus berupaya 
                  membangun infrastruktur, meningkatkan pelayanan publik, serta mengembangkan potensi sumber daya alam dan manusia demi kesejahteraan warganya.
                </p>
                <div className="text-right mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-3 sm:px-4 py-2 bg-[#009AB5] text-white text-sm rounded hover:bg-[#007a90] transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section Visi & Misi - Diperbaiki untuk Responsif */}
        <section className="text-center">
          <h2 className="text-green-700 text-lg sm:text-xl md:text-2xl font-bold uppercase mb-6 md:mb-10 px-2">
            VISI & MISI
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Visi - Diperbaiki */}
            <div className="border border-green-600 rounded-lg p-4 sm:p-6 shadow-sm flex flex-col items-center text-center min-h-[200px] sm:min-h-[250px]">
              <h3 className="text-green-700 text-base sm:text-lg font-semibold mb-3 sm:mb-4">Visi</h3>
              <div className="flex-1 flex items-center justify-center w-full">
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed max-w-md break-words whitespace-pre-line text-justify sm:text-center">
                  {visi}
                </p>
              </div>
            </div>

            {/* Misi - Diperbaiki */}
            <div className="border border-green-600 rounded-lg p-4 sm:p-6 shadow-sm flex flex-col items-center text-center min-h-[200px] sm:min-h-[250px]">
              <h3 className="text-green-700 text-base sm:text-lg font-semibold mb-3 sm:mb-4">Misi</h3>
              <div className="flex-1 flex items-center justify-center w-full">
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed max-w-md break-words whitespace-pre-line text-justify sm:text-center">
                  {misi}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Struktur Pemerintahan Desa - Responsif */}
        <section className="text-center">
          <h2 className="text-green-700 text-lg sm:text-xl md:text-2xl font-bold uppercase mb-6 md:mb-10 px-2">
            STRUKTUR PEMERINTAHAN DESA
          </h2>
          <div className="w-full max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={bagan || strukturdesa}
                alt="Struktur Pemerintahan Desa"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </section>

        {/* Section Sektor Ekonomi Masyarakat - Responsif */}
        <section className="text-center">
          <h2 className="text-green-700 text-lg sm:text-xl md:text-2xl font-bold uppercase mb-6 md:mb-10 px-2">
            SEKTOR EKONOMI MASYARAKAT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            
            {/* Sektor Pertanian */}
            <div className="border border-green-600 rounded-lg overflow-hidden shadow-sm">
              <div className="h-40 sm:h-48 md:h-56 overflow-hidden">
                <img
                  src={pertanian}
                  alt="Sektor Pertanian"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-green-700 text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                  Sektor Pertanian
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4 text-justify">
                  Sektor pertanian merupakan tulang punggung ekonomi Desa Talawe. 
                  Mayoritas penduduk menggantungkan hidup dari bercocok tanam, 
                  terutama padi, jagung, dan tanaman palawija lainnya. Dengan dukungan 
                  irigasi yang memadai dan tanah yang subur, petani di desa ini mampu 
                  menghasilkan panen berkualitas tinggi. Pemerintah desa aktif 
                  memberikan penyuluhan, bantuan teknis, penggunaan pupuk organik, 
                  dan memperkenalkan teknik bercocok tanam modern untuk meningkatkan 
                  produktivitas. Selain itu, hasil pertanian juga dipasarkan ke luar 
                  daerah, memberi kontribusi besar terhadap perekonomian lokal.
                </p>
                <Link
                  to="/pertanian"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded transition-colors"
                >
                  Selengkapnya
                </Link>
              </div>
            </div>

            {/* Sektor Peternakan */}
            <div className="border border-green-600 rounded-lg overflow-hidden shadow-sm">
              <div className="h-40 sm:h-48 md:h-56 overflow-hidden">
                <img
                  src={peternakan}
                  alt="Sektor Peternakan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-green-700 text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                  Sektor Peternakan
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4 text-justify">
                  Peternakan menjadi sumber pendapatan penting bagi masyarakat Desa 
                  Talawe selain pertanian. Warga banyak memelihara sapi, kerbau, 
                  kambing, dan unggas seperti ayam serta bebek. Sistem peternakan 
                  umumnya masih tradisional, memanfaatkan lahan sekitar rumah dan 
                  padang penggembalaan komunal. Hasil peternakan digunakan untuk 
                  konsumsi sendiri maupun dijual ke pasar-pasar terdekat. Pemerintah 
                  desa juga mulai memperkenalkan pelatihan manajemen peternakan dan 
                  pakan berkualitas untuk meningkatkan produktivitas dan kesehatan 
                  hewan ternak.
                </p>
                <Link
                  to="/peternakan"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded transition-colors"
                >
                  Selengkapnya
                </Link>
              </div>
            </div>
            
          </div>
        </section>

        {/* Section Titik Lokasi Desa Talawe - Responsif */}
        <section className="text-center">
          <h2 className="text-green-700 text-lg sm:text-xl md:text-2xl font-bold uppercase mb-6 md:mb-10 px-2">
            TITIK LOKASI DESA TALAWE
          </h2>
          <div className="w-full max-w-5xl mx-auto">
            {/* Info Kantor */}
            <div className="mb-6 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-green-700 font-semibold text-sm sm:text-base md:text-lg mb-2">Kantor Desa Talawe</h3>
              <p className="text-gray-700 text-xs sm:text-sm md:text-base break-words">
                Jl. Dahlia, Talawe, W T. Sidenreng, Sidenreng Rappang Regency, South Sulawesi 91651
              </p>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Plus Code: 4VWG+V9R
              </p>
            </div>
            
            {/* Maps - Responsif */}
            <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-lg border border-gray-300 mb-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15895.358714297693!2d120.076108!3d-3.9972218!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d94b8e15c9bb5d7%3A0x3b4f4b4b4b4b4b4b!2s4VWG%2BV9R%2C%20Talawe%2C%20Watang%20Sidenreng%2C%20Sidenreng%20Rappang%20Regency%2C%20South%20Sulawesi!5e0!3m2!1sen!2sid!4v1640000000000!5m2!1sen!2sid&markers=color:red%7Clabel:K%7C-3.997222,120.076108&z=16"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Kantor Desa Talawe"
              ></iframe>
            </div>
            
            {/* Info tambahan */}
            <div className="text-xs sm:text-sm text-gray-600 mb-8 sm:mb-12">
              <p>* Maps dapat di-zoom untuk melihat detail lokasi dengan lebih jelas</p>
              <p>* Klik tombol di atas untuk membuka aplikasi maps di perangkat Anda</p>
            </div>
          </div>
          
          {/* Batas Wilayah & Koordinat - Responsif */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* Gambar Peta dari Firebase */}
            <div className="w-full order-2 lg:order-1">
              <div className="bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
                <img
                  src={petaDesa}
                  alt="Peta Desa Talawe"
                  className="w-full h-64 sm:h-80 md:h-96 object-contain"
                />
              </div>
            </div>

            {/* Info Batas */}
            <div className="bg-green-50 p-4 sm:p-6 rounded-lg border border-green-200 shadow-md text-left order-1 lg:order-2">
              <div>
                <h3 className="text-green-700 text-base sm:text-lg font-semibold mb-3 sm:mb-4">Batas Wilayah</h3>
                <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm space-y-1 sm:space-y-2">
                  <li><strong>Sebelah Utara:</strong> Berbatasan Dengan Desa Cipotakari</li>
                  <li><strong>Sebelah Selatan:</strong> Berbatasan Dengan Desa Aka-Akae</li>
                  <li><strong>Sebelah Timur:</strong> Berbatasan Dengan Desa Damai</li>
                  <li><strong>Sebelah Barat:</strong> Berbatasan Dengan Desa Bulo</li>
                </ul>

                <h3 className="text-green-700 text-base sm:text-lg font-semibold mt-4 sm:mt-6 mb-3 sm:mb-4">Titik Koordinat Kantor Desa</h3>
                <div className="text-xs sm:text-sm text-gray-700 space-y-1">
                  <p><strong>Garis Lintang:</strong> -3.51'</p>
                  <p><strong>Garis Bujur:</strong> 119.52'</p>
                  <p><strong>Ketinggian:</strong> mdpl</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilDesa;