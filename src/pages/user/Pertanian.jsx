import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import padi from '../../asset/foto/padi.jpg';     // Pastikan path ini benar
import jagung from '../../asset/foto/jagung.jpg'; // Pastikan path ini benar

const Pertanian = () => {
  // Scroll ke atas saat page dimuat
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Import Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header Section */}
          <div className="text-center mt-12 mb-8">
            <h1 className="text-3xl font-bold text-green-700 mb-4">SEKTOR PERTANIAN</h1>
            <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Mayoritas penduduk Desa Talawe menggantungkan mata pencaharian pada sektor pertanian, yang telah menjadi 
              denyut nadi kehidupan ekonomi dan sosial masyarakat selama bertahun-tahun. Pertanian tidak hanya berfungsi 
              sebagai sumber penghasilan, tetapi juga menjadi warisan budaya dan kearifan lokal yang terus dijaga turun-temurun. 
              Komoditas utama yang dihasilkan adalah padi dan jagung yang berperan penting dalam ketahanan pangan serta perekonomian desa.
            </p>
          </div>

          {/* Agriculture Section */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Padi Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={padi} alt="Padi" className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-700 mb-3">Padi</h3>
                  <p className="text-gray-600 leading-relaxed text-justify">
                    Hamparan sawah hijau membentang luas di berbagai penjuru desa, menciptakan pemandangan yang indah 
                    sekaligus menyimpan potensi ekonomi yang besar. Berkat ketersediaan sistem pengairan dari saluran irigasi 
                    setempat, para petani mampu memaksimalkan hasil panen hingga dua sampai tiga kali dalam setahun. Siklus tanam 
                    yang teratur dan teknik budidaya yang terus berkembang menjadikan produksi padi di Talawe tetap stabil dan 
                    berkualitas tinggi.
                  </p>
                </div>
              </div>

              {/* Jagung Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={jagung} alt="Jagung" className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-700 mb-3">Jagung</h3>
                  <p className="text-gray-600 leading-relaxed text-justify">
                    Jagung umumnya dibudidayakan di lahan tadah hujan atau lahan yang sementara tidak digunakan untuk menanam padi. 
                    Hasil panen jagung tidak hanya dipasarkan dalam bentuk biji kering untuk memenuhi kebutuhan pangan, tetapi juga 
                    menjadi bahan pakan ternak yang mendukung keberlangsungan sektor peternakan di Talawe, seperti ayam dan sapi. 
                    Dengan demikian, sektor pertanian dan peternakan saling berkaitan dan memperkuat satu sama lain.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Sections */}
          <div className="space-y-8">
            {/* First Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600 leading-relaxed text-justify">
                Pertanian di Desa Talawe bukan sekadar kegiatan ekonomi, tetapi juga sarat dengan nilai kebersamaan. 
                Gotong royong dalam pengolahan lahan, penanaman, hingga panen masih menjadi tradisi yang kuat. 
                Kebiasaan ini tidak hanya mempererat hubungan antarwarga, tetapi juga menjadi bukti bahwa sektor pertanian 
                membentuk identitas dan karakter sosial masyarakat Talawe.
              </p>
            </div>

            {/* Second Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600 leading-relaxed text-justify">
                Dengan potensi alam yang mendukung, sumber daya manusia yang terampil, dan semangat kerja sama yang tinggi, 
                sektor pertanian di Desa Talawe memiliki peluang besar untuk terus berkembang. Dukungan teknologi pertanian modern, 
                peningkatan kualitas irigasi, dan pengelolaan hasil pascapanen akan semakin memperkuat posisi Talawe sebagai desa yang 
                tangguh dan mandiri dalam bidang pertanian.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Import Footer */}
      <Footer />
    </div>
  );
};

export default Pertanian;
