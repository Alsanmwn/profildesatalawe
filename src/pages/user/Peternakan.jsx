import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ayam from '../../asset/foto/ayam.jpg';     // Pastikan path ini benar
import sapi2 from '../../asset/foto/sapi2.jpg';   // Pastikan path ini benar

const Peternakan = () => {
  // Scroll ke atas ketika page dimuat
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
            <h1 className="text-3xl font-bold text-green-700 mb-4">SEKTOR PETERNAKAN</h1>
            <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed ">
              Sektor peternakan merupakan salah satu penopang penting perekonomian masyarakat Desa Talawe. 
              Selain menjadi sumber penghasilan tambahan, peternakan juga berperan dalam memenuhi kebutuhan pangan hewani masyarakat, 
              seperti daging, telur, dan susu. Aktivitas beternak di Talawe telah menjadi bagian dari kehidupan sehari-hari, diwariskan 
              dari generasi ke generasi, dan berkembang seiring dengan meningkatnya kebutuhan pasar. Jenis ternak yang paling banyak dibudidayakan adalah sapi dan ayam petelur.
            </p>
          </div>

          {/* Livestock Section */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Ayam Petelur Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={ayam} alt="Ayam Petelur" className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-700 mb-3">Ayam Petelur</h3>
                  <p className="text-gray-600 leading-relaxed text-justify">
                    Ayam petelur menjadi sektor unggulan lain yang memiliki prospek cerah. Ayam petelur dipelihara secara intensif di kandang modern 
                    maupun semi-tradisional, dengan pengelolaan pakan, kebersihan, dan kesehatan yang terjaga. Produksi telur dari Desa Talawe 
                    tidak hanya mencukupi kebutuhan warga setempat, tetapi juga dipasarkan ke pasar-pasar di kecamatan dan kabupaten sekitar. 
                    Telur yang dihasilkan memiliki kualitas baik, dengan ukuran seragam dan rasa yang segar.
                  </p>
                </div>
              </div>

              {/* Sapi Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={sapi2} alt="Sapi" className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-700 mb-3">Sapi</h3>
                  <p className="text-gray-600 leading-relaxed text-justify">
                    Peternakan sapi di Talawe umumnya berjenis sapi potong, yang dipelihara untuk menghasilkan daging berkualitas. 
                    Sapi-sapi ini dibesarkan di padang penggembalaan atau kandang khusus dengan pemberian pakan hijauan segar dan 
                    pakan tambahan yang bergizi. Selain dijual untuk konsumsi lokal, sebagian sapi juga dipasarkan ke daerah lain, 
                    terutama saat musim permintaan tinggi seperti Hari Raya Iduladha. Kegiatan ini menjadi sumber pendapatan yang 
                    signifikan bagi para peternak.
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
                Keunggulan sektor peternakan di Talawe juga terletak pada keterpaduannya dengan sektor pertanian. Sisa hasil panen seperti 
                jerami padi dan jagung dimanfaatkan sebagai pakan ternak, sehingga mengurangi biaya produksi dan mendukung pola zero waste 
                dalam pengelolaan sumber daya alam. Sebaliknya, kotoran ternak dimanfaatkan sebagai pupuk organik untuk menyuburkan lahan pertanian, 
                menciptakan siklus ekonomi yang saling menguntungkan.
              </p>
            </div>

            {/* Second Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600 leading-relaxed text-justify">
                Dengan potensi lahan yang memadai, keterampilan peternak yang mumpuni, dan dukungan sumber pakan alami dari sektor pertanian, 
                peternakan sapi dan ayam petelur di Desa Talawe memiliki peluang besar untuk berkembang lebih pesat. Penerapan teknologi modern 
                dalam manajemen peternakan, peningkatan akses pasar, serta pelatihan berkelanjutan bagi peternak akan semakin memperkuat posisi 
                Talawe sebagai desa mandiri dan berdaya saing tinggi dalam sektor peternakan.
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

export default Peternakan;
