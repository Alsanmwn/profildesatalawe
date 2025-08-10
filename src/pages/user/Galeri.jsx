// src/pages/user/Galeri.jsx
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import profest from "../../asset/foto/profest.jpg"; 
import sadata from "../../asset/foto/sadata.jpg";
import kebunn from "../../asset/foto/kebunn.jpg";
import amir from "../../asset/foto/amir.jpg";
import yuyun from "../../asset/foto/yuyun.jpg";
import posko from "../../asset/foto/posko.jpg";
import gerak from "../../asset/foto/gerak.jpg";
import leya from "../../asset/foto/leya.jpg";
import profest2 from "../../asset/foto/profest2.jpg";
import day1 from "../../asset/foto/day1.jpg";
import liza from "../../asset/foto/liza.jpg";
import sempro from "../../asset/foto/sempro.jpg";
import pupukk from "../../asset/foto/pupukk.jpg";
import rapatt from "../../asset/foto/rapatt.jpg";
import yuyun2 from "../../asset/foto/yuyun2.jpg";
import takziah from "../../asset/foto/takziah.jpg";
import anak from "../../asset/foto/anak.jpg";
import kebunpkk from "../../asset/foto/kebunpkk.jpg";
import tanam from "../../asset/foto/tanam.jpg";
import nanam from "../../asset/foto/nanam.jpg";
import jalan from "../../asset/foto/jalan.jpg";
import makan from "../../asset/foto/makan.jpg";
import haha from "../../asset/foto/haha.jpg";
import amir2 from "../../asset/foto/amir2.jpg";
import rujab from "../../asset/foto/rujab.jpg";
import love from "../../asset/foto/love.jpg";
import voli from "../../asset/foto/voli.jpg";
import gabung from "../../asset/foto/gabung.jpg";
import algi from "../../asset/foto/algi.jpg";
import melayat from "../../asset/foto/melayat.jpg";
import pickup from "../../asset/foto/pickup.jpg";
import sosialisasi from "../../asset/foto/sosialisasi.jpg";
import pkk from "../../asset/foto/pkk.jpg";
import kantor from "../../asset/foto/kantor.jpg";
import pesantren from "../../asset/foto/pesantren.jpg";
import sd from "../../asset/foto/sd.jpg";
import rapat from "../../asset/foto/rapat.jpg";
import part2 from "../../asset/foto/part2.jpg";
import jalan2 from "../../asset/foto/jalan2.jpg";
import botol from "../../asset/foto/botol.jpg";
import nyapu from "../../asset/foto/nyapu.jpg";
import rapat2 from "../../asset/foto/rapat2.jpg";
import cafe from "../../asset/foto/cafe.jpg";
import dante from "../../asset/foto/dante.jpg";
import unhas from "../../asset/foto/unhas.jpg";

// Data gambar galeri
const galleryImages = [
  { src: profest, alt: "Profest - Kegiatan Kecamatan Watang Sidenreng" },
  { src: sadata, alt: "Sadata - Kegiatan Bersih-bersih" },
  { src: kebunn, alt: "Kebun - Penanaman di Kebun Pkk" },
  { src: amir, alt: "Amir - Dokumentasi Personal" },
  { src: yuyun, alt: "Yuyun - Dokumentasi Personal" },
  { src: posko, alt: "13 Posko - Markas Kegiatan 13 Posko" },
  { src: profest2, alt: "Profest 2 - Kegiatan Kecamatan Watang Sidenreng" },
  { src: leya, alt: "Leya - Dokumentasi Personal" },
  { src: gerak, alt: "Gerak Jalan- Pelatihan" },
  { src: day1, alt: "Day 1 - Hari Pertama Kegiatan KKN" },
  { src: liza, alt: "Liza - Dokumentasi Personal" },
  { src: sempro, alt: "Sempro - Seminar Proposal" },
  { src: pupukk, alt: "Pupuk - Kegiatan Pertanian" },
  { src: rapatt, alt: "Rapat - Rapat Bersama Ibu DPK" },
  { src: yuyun2, alt: "Yuyun 2 - Dokumentasi Lanjutan" },
  { src: takziah, alt: "Takziah - Kegiatan Sosial" },
  { src: anak, alt: "Anak - Kegiatan Program Kerja Liza" },
  { src: kebunpkk, alt: "Kebun PKK - Kegiatan PKK" },
  { src: jalan, alt: "Pohon Tumbang - Pohon Tumbang di Dusun 2" },
  { src: nanam, alt: "Nanam - Kegiatan Menanam" },
  { src: tanam, alt: "Tanam - Kegiatan Pertanian" },
  { src: makan, alt: "Makan - Kegiatan Bersama" },
  { src: amir2, alt: "Amir 2 - Dokumentasi Lanjutan" },
  { src: haha, alt: "Lucu Leya Disini" },
  { src: voli, alt: "Kegiatan Olahraga Voli" },
  { src: love, alt: "Penuh Kasih Sayang" },
  { src: rujab, alt: "Rujab - Kegiatan Resmi" },
  { src: algi, alt: "Algi - Dokumentasi Personal" },
  { src: gabung, alt: "Gabung - Kegiatan Bersama" },
  { src: melayat, alt: "Melayat - Kegiatan Sosial" },
  { src: pickup, alt: "Pickup - Transportasi Kegiatan" },
  { src: sosialisasi, alt: "Sosialisasi - Kegiatan Edukasi" },
  { src: pkk, alt: "PKK - Kegiatan Pemberdayaan" },
  { src: kantor, alt: "Kantor - Kegiatan Administrasi" },
  { src: pesantren, alt: "Pesantren - Kegiatan Keagamaan" },
  { src: sd, alt: "SD - Kegiatan di Sekolah Dasar" },
  { src: rapat, alt: "Rapat - Kegiatan Koordinasi" },
  { src: jalan2, alt: "Jalan 2 - Kegiatan Jalan Lanjutan" },
  { src: part2, alt: "Part 2 - Bagian Kedua Kegiatan" },
  { src: botol, alt: "Botol - Kegiatan Daur Ulang" },
  { src: nyapu, alt: "Nyapu - Kegiatan Kebersihan" },
  { src: rapat2, alt: "Rapat 2 - Rapat Lanjutan" },
  { src: unhas, alt: "Unhas - Foto Bersama" },
  { src: dante, alt: "Dante Pine - Dokumentasi Refreshing" },
  { src: cafe, alt: "Cafe - Kegiatan Santai" },
];

const Galeri = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState({});

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const handleImageLoad = (index) => {
    setIsLoading(prev => ({ ...prev, [index]: false }));
  };

  const handleImageLoadStart = (index) => {
    setIsLoading(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Konten Galeri */}
      <main className="flex-grow mt-12 lg:mt-16">
        {/* Header & Penjelasan */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 mb-4 md:mb-6">
                Galeri Kegiatan
              </h1>
              <div className="space-y-4 md:space-y-6">
                <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                  Selamat datang di halaman galeri kami. Setiap gambar di sini bukan sekadar foto, melainkan kisah kebersamaan, semangat, dan dedikasi yang terjalin di setiap langkah kegiatan kami. Kegiatan ini terwujud berkat hubungan kekeluargaan yang hangat antara Universitas Hasanuddin, Universitas Muhammadiyah Sidenreng Rappang dan Institut Agama Islam Negeri (IAIN) Parepare.
                </p>
                <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                  Kehangatan ini menjadi jembatan yang menyatukan rasa, pikiran, dan langkah, sehingga setiap agenda terasa lebih bermakna dan penuh kebersamaan.
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 md:p-6 rounded-r-lg">
                  <p className="text-sm md:text-base lg:text-lg text-gray-700 font-medium italic">
                    "Dengan penuh rasa hormat, kami menyampaikan terima kasih kepada Kepala Desa, Ibu Desa, Bapak dan Ibu Posko, serta seluruh masyarakat yang telah menerima kami dengan tangan terbuka, mendukung setiap kegiatan, dan menjadi bagian dari cerita indah yang terekam di sini."
                  </p>
                </div>
                <p className="text-xs md:text-sm text-gray-500">
                  Klik pada foto untuk melihat dalam ukuran penuh
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Grid Galeri */}
        <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => openLightbox(image)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    {isLoading[index] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onLoadStart={() => handleImageLoadStart(index)}
                      onLoad={() => handleImageLoad(index)}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                    <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="truncate">{image.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 md:mt-12">
              <p className="text-gray-600 text-sm md:text-base">
                KKNT UNIVERSITAS HASANUDDIN GELOMBANG 114 DESA TALAWE{' '}
                <a
                  href="https://www.instagram.com/kknt114unhas_desatalawe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  @kknt114unhas_desatalawe
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={closeLightbox}
                className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 transition-colors z-10"
                aria-label="Close"
              >
                ✕
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 rounded-b-lg">
                <p className="text-center">{selectedImage.alt}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Galeri;