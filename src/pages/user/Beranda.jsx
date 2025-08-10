import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, onSnapshot, collection, getDocs } from 'firebase/firestore';
import { Users, FileText, Building2, X, ChevronDown } from "lucide-react";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import sawah from '../../asset/foto/sawah.jpg';
import Workshop from '../../asset/foto/Workshop.jpg';
import pakdee from '../../asset/foto/pakdee.png';
import peta from '../../asset/foto/peta.jpg';
import pupuk from '../../asset/foto/pupuk.jpg';
import infografis from '../../asset/foto/Infografis.jpg';

const Beranda = () => {
  const [modalOpen, setModalOpen] = useState(null);

  // State untuk sambutan
  const [sambutanData, setSambutanData] = useState({
    gambar: '',
    nama: '',
    sambutan: ''
  });

  // State untuk program desa
  const [programData, setProgramData] = useState([]);

  // Ambil data sambutan dari Firestore secara real-time
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'data_desa', 'sambutan_kades'), (docSnap) => {
      if (docSnap.exists()) {
        setSambutanData(docSnap.data());
      }
    });
    return () => unsub();
  }, []);

  // Ambil data program desa dari Firestore
  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const programCollection = collection(db, 'program_desa', 'program', 'program');
        const programSnapshot = await getDocs(programCollection);
        const programs = [];
        
        programSnapshot.forEach((doc) => {
          programs.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setProgramData(programs);
      } catch (error) {
        console.error('Error fetching program data:', error);
      }
    };

    fetchProgramData();
  }, []);

  const handleOpen = (index) => setModalOpen(index);
  const handleClose = () => setModalOpen(null);

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 backdrop-blur-sm animate-fade-in">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl relative transform animate-scale-in border border-gray-100">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200 p-2 hover:bg-red-50 rounded-full"
            onClick={onClose}
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-4">{title}</h2>
          <div>{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen md:h-[600px] lg:h-[630px] w-full overflow-hidden flex items-center justify-center mt-16">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 to-black/60 z-20"></div>

        {/* Background Image */}
        <img
          src={sawah}
          alt="Foto Hero"
          className="absolute w-full h-full object-cover transform hover:scale-105 transition-transform duration-[3000ms]"
        />

        {/* Content */}
        <div className="relative z-30 text-white text-center px-6 sm:px-8 md:px-12 animate-fade-in-up max-w-4xl">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg mb-4 leading-tight">
            SELAMAT DATANG DI WEBSITE RESMI
            <span className="block text-yellow-300 mt-2">DESA TALAWE</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-xl drop-shadow-md font-medium opacity-95">
            Sumber Informasi Terkini tentang Pembangunan di Desa Talawe
          </p>

          {/* Chevron Down */}
          <div className="mt-10 sm:mt-12 cursor-pointer">
            <ChevronDown
              className="w-8 h-8 sm:w-10 sm:h-10 mx-auto animate-bounce text-yellow-300"
              onClick={() => {
                document
                  .getElementById("jelajah-desa")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        </div>
      </section>

      {/* Jelajah Desa */}
      <section
        id="jelajah-desa" // ini ID tujuan scroll
        className="text-white text-center py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #35911E 0%, #2d7a1a 50%, #23AE00 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-wide">JELAJAH DESA</h2>
          <p className="text-base md:text-lg px-4 md:px-[60px] mb-16 max-w-5xl mx-auto leading-relaxed opacity-95 font-regular">
            Desa Talawe merupakan salah satu desa yang berada di wilayah administratif Kecamatan Watang Sidenreng, Kabupaten Sidenreng Rappang, Provinsi Sulawesi Selatan. Desa ini memiliki jumlah penduduk sekitar 1.389 jiwa yang tersebar di beberapa dusun, dengan mata pencaharian utama masyarakatnya adalah bertani dan beternak, menjadikannya desa dengan potensi agraris yang cukup besar.
          </p>

          {/* Card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto">
            {[
              { id: 1, title: 'Peta Desa', image: peta, description: 'Peta administratif wilayah' },
              { id: 2, title: 'Infografis', image: infografis, description: 'Data visual desa' },
              { id: 3, title: 'Pupuk Organik', image: pupuk, description: 'Program pertanian berkelanjutan' },
              { id: 4, title: 'Workshop', image: Workshop, description: 'Kegiatan pemberdayaan masyarakat' },
            ].map((card) => (
              <div
                key={card.id}
                onClick={() => handleOpen(card.id)}
                className="bg-white text-black rounded-2xl shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 hover:rotate-1 transition-all duration-500 group border-2 border-transparent hover:border-yellow-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-green-800 group-hover:text-green-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal isOpen={modalOpen === 1} onClose={handleClose} title="Peta Desa">
        <div className="space-y-6 text-left max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
          <img
            src={peta}
            alt="Peta Desa"
            className="w-full h-auto max-h-full object-cover rounded-xl shadow-lg"
          />
          <p className="text-gray-700 leading-relaxed text-justify">
            Berikut merupakan Peta Administrasi Desa Talawe yang disusun sebagai bagian dari program Kuliah Kerja Nyata Tematik (KKNT) Universitas Hasanuddin Gelombang 114 Tahun 2025 yang dilaksanakan di Desa Talawe, Kecamatan Watang Sidenreng, Kabupaten Sidenreng Rappang. Peta ini bertujuan untuk memberikan gambaran visual mengenai batas wilayah, pembagian dusun, infrastruktur desa, serta penggunaan lahan seperti permukiman, persawahan, dan fasilitas umum.
            Penyusunan peta ini didasarkan pada data dari Badan Informasi Geospasial (BIG) serta hasil observasi lapangan, dan diharapkan dapat menjadi referensi yang bermanfaat bagi pemerintah desa dan masyarakat dalam mendukung perencanaan pembangunan dan pengelolaan wilayah yang lebih baik.
          </p>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <p className="italic text-center text-sm font-medium text-green-800">
              Amir Mahmud Idrus
            </p>
          </div>
        </div>
      </Modal>

      <Modal isOpen={modalOpen === 2} onClose={handleClose} title="Infografis">
        <div className="space-y-6 text-left max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
          <img
            src={infografis}
            alt="Infografis Desa"
            className="w-full h-auto max-h-full object-cover rounded-xl shadow-lg"
          />
          <p className="text-gray-700 leading-relaxed text-justify">
            Infografis Profil Desa Talawe ini dibuat dalam program KKNT Universitas Hasanuddin Gelombang 114 Tahun 2025 di Desa Talawe, Kecamatan Watang Sidenreng, Kabupaten Sidenreng Rappang. Profil ini memuat informasi batas wilayah, pembagian dusun, jumlah penduduk, potensi desa, agama, lahan persawahan, infrastruktur, dan fasilitas umum.
            Pembuatan profil Desa ini mengabungkan data yang sudah ada dengan hasil observasi langsung, sehingga akurat dan sesuai kondisi lapangan. 
            Tujuannya untuk memberi gambaran jelas tentang Desa Talawe sekaligus menjadi acuan dalam perencanaan pembangunan dan pengelolaan potensi desa di masa depan.
          </p>
          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
            <p className="italic text-center text-sm font-medium text-purple-800">
              Sandita Aulia
            </p>
          </div>
        </div>
      </Modal>

      <Modal isOpen={modalOpen === 3} onClose={handleClose} title="Pupuk Organik">
        <div className="space-y-6 text-left max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
          <img
            src={pupuk}
            alt="Pupuk Organik"
            className="w-full h-auto max-h-full object-cover rounded-xl shadow-lg"
          />
          <p className="text-gray-700 leading-relaxed text-justify">
            Puji syukur penulis panjatkan ke hadirat Allah SWT karena atas rahmat-Nya, kegiatan Kuliah Kerja Nyata (KKN) dengan tema Pemberdayaan Masyarakat melalui Pemanfaatan Cangkang Telur sebagai Sumber Kalsium dalam Pembuatan Pupuk Organik dapat terlaksana dengan baik. Program ini bertujuan meningkatkan kesadaran masyarakat dalam mengelola limbah rumah tangga, khususnya cangkang telur, agar memiliki nilai guna sebagai pupuk organik yang ramah lingkungan dan mendukung pertanian berkelanjutan. Ucapan terima kasih penulis sampaikan kepada dosen pembimbing, aparat desa, serta seluruh warga yang telah berpartisipasi dan mendukung pelaksanaan kegiatan ini.
          </p>
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <p className="italic text-center text-sm font-medium text-yellow-800">
              Yuyun Arrahma Anwar
            </p>
          </div>
        </div>
      </Modal>

      <Modal isOpen={modalOpen === 4} onClose={handleClose} title="Workshop">
        <div className="space-y-6 text-left max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
          <img
            src={Workshop}
            alt="Workshop"
            className="w-full h-auto max-h-full object-cover rounded-xl shadow-lg"
          />
          <p className="text-gray-700 leading-relaxed">
            Puji syukur kami panjatkan ke hadirat Tuhan Yang Maha Esa atas terselenggaranya kegiatan Workshop Mini Entrepreneur Day: Belajar Berwirausaha Sejak Dini. Kegiatan ini bertujuan untuk melatih keterampilan motorik halus, mengembangkan kreativitas, serta mengenalkan konsep kewirausahaan kepada anak sejak usia dini melalui pembuatan gelang dan kalung manik-manik.
            Kami berharap kegiatan ini dapat memberikan pengalaman belajar yang menyenangkan sekaligus menumbuhkan semangat berkreasi dan berwirausaha pada anak-anak. Terima kasih kepada semua pihak yang telah mendukung terselenggaranya kegiatan ini.
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <p className="italic text-center text-sm font-medium text-red-800">
              A. Siti Nurhaliza Azzahra
            </p>
          </div>
      </Modal>

      {/* Sambutan */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-600 to-green-400"></div>
        
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Gambar Kepala Desa */}
          <div className="flex justify-center w-full lg:w-1/3 relative">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-600 to-green-400 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <img
                src={sambutanData.gambar || pakdee}
                alt="Kepala Desa"
                className="relative w-72 h-auto object-contain rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Teks Sambutan */}
          <div className="w-full lg:w-2/3 text-center lg:text-left">
            <div className="mb-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-green-700 mb-3 leading-tight">
                Sambutan Kepala Desa Talawe
              </h2>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800">{sambutanData.nama}</h3>
              <h4 className="text-base lg:text-lg font-semibold text-gray-600 mb-6 relative inline-block">
                Kepala Desa Talawe
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-transparent"></div>
              </h4>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <p className="text-base lg:text-lg text-gray-700 leading-relaxed text-justify font-medium">
                {sambutanData.sambutan}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sorotan Program Desa */}
      <div className="text-center py-16 bg-white">
        <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-6 tracking-wide">
          SOROTAN PROGRAM DESA
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed px-4">
          "Program-program unggulan yang sedang berjalan di Desa Talawe untuk kemajuan dan kesejahteraan masyarakat"
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Konten Sorotan di Area Berwarna */}
      <section 
        className="py-24 relative overflow-hidden" 
        style={{ background: 'linear-gradient(135deg, #8CD963 0%, #7bc95a 50%, #6ab84f 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-yellow-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-green-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 px-6 max-w-7xl mx-auto">
          {programData.length > 0 ? (
            programData.map((program, index) => (
              <div
                key={program.id}
                className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center justify-between transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border-2 border-transparent hover:border-yellow-300 group"
                style={{ minHeight: '400px' }}
              >
                {program.gambar && (
                  <div className="w-full h-56 mb-6 overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={program.gambar}
                      alt={program.nama_program}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 leading-tight group-hover:text-green-600 transition-colors">
                    {program.nama_program || `Program ${index + 1}`}
                  </h3>
                  <p className="text-gray-600 leading-relaxed flex-1">
                    {program.deskripsi
                      ? program.deskripsi.substring(0, 100) + '...'
                      : 'Deskripsi program tidak tersedia'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            // Fallback loading dengan skeleton
            [1, 2, 3].map((id) => (
              <div
                key={id}
                className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center text-center animate-pulse"
                style={{ minHeight: '400px' }}
              >
                <div className="w-full h-56 bg-gray-200 rounded-2xl mb-6"></div>
                <div className="w-3/4 h-6 bg-gray-200 rounded mb-4"></div>
                <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Layanan Kami */}
      <section className="text-center py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-6 tracking-wide">LAYANAN KAMI</h2>
        <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
          Melayani dengan sepenuh hati untuk kemajuan dan kesejahteraan masyarakat Desa Talawe
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {[
            {
              title: "Administrasi Penduduk",
              desc: "Meliputi pencatatan data kependudukan seperti kelahiran, kematian, pindah datang, dan pembaruan identitas, guna memastikan data warga selalu akurat dan mutakhir.",
              icon: <Users size={32} />,
              color: "from-blue-500 to-blue-600",
              bgColor: "bg-blue-50",
              borderColor: "border-blue-200",
            },
            {
              title: "Surat-Menyurat & Keterangan Umum",
              desc: "Layanan penerbitan berbagai surat resmi seperti surat keterangan domisili, usaha, atau pengantar, untuk mendukung keperluan administrasi warga.",
              icon: <FileText size={32} />,
              color: "from-green-500 to-green-600",
              bgColor: "bg-green-50",
              borderColor: "border-green-200",
            },
            {
              title: "Layanan dan Kelembagaan",
              desc: "Fasilitasi pelayanan publik dan pembinaan kelembagaan desa seperti RT/RW, PKK, Karang Taruna, dan lembaga kemasyarakatan lainnya demi memperkuat partisipasi dan pembangunan desa.",
              icon: <Building2 size={32} />,
              color: "from-purple-500 to-purple-600",
              bgColor: "bg-purple-50",
              borderColor: "border-purple-200",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} ${item.borderColor} border-2 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group`}
            >
              <div className={`w-20 h-20 bg-gradient-to-r ${item.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-gray-800 font-bold text-xl mb-4 leading-tight">{item.title}</h3>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.9);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #10b981 #f3f4f6;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
    </div>
  );
};

export default Beranda;