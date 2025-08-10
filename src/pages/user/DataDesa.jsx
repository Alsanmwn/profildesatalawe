import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  Users,
  Home,
  MapPin,
  Building,
  TreePine,
  Building2,
  School,
  BookOpen,
  GraduationCap,
  Baby,
  Cross,
  Mountain, 
} from 'lucide-react';
import { FaMosque } from 'react-icons/fa';
import { Mosque } from '@mui/icons-material';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../../firebase';
 

const DataDesaPage = () => {
  const [dataPenduduk, setDataPenduduk] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const docRef = doc(db, 'data_desa', 'data_penduduk');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDataPenduduk(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(() => setIsLoaded(true), 300);
      }
    };

    fetchData();
  }, []);

  const dataCards = dataPenduduk
    ? [
        {
          title: 'Total Penduduk',
          value: dataPenduduk.total_penduduk,
          unit: 'Jiwa',
          icon: Users,
          color: 'bg-blue-50 border-blue-200',
        },
        {
          title: 'Jumlah KK',
          value: dataPenduduk.jumlah_kk,
          unit: 'Kepala Keluarga',
          icon: Home,
          color: 'bg-green-50 border-green-200',
        },
        {
          title: 'Jumlah RT',
          value: dataPenduduk.jumlah_rt,
          unit: 'Rukun Tetangga',
          icon: MapPin,
          color: 'bg-purple-50 border-purple-200',
        },
        {
          title: 'Jumlah RW',
          value: dataPenduduk.jumlah_rw,
          unit: 'Rukun Warga',
          icon: Building,
          color: 'bg-yellow-50 border-yellow-200',
        },
        {
          title: 'Jumlah Dusun',
          value: dataPenduduk.jumlah_dusun,
          unit: 'Dusun',
          icon: TreePine,
          color: 'bg-emerald-50 border-emerald-200',
        },
        {
          title: 'Agama',
          value: '',
          unit: dataPenduduk.agama,
          icon: Mosque,
          color: 'bg-red-50 border-red-200',
        },
      ]
    : [];

  const saranaCards = [
    {
      title: 'Kantor Desa Talawe',
      icon: Building,
      color: 'bg-blue-50 border-blue-200',
    },
    {
      title: 'Masjid Babul Jannah',
      icon: FaMosque,
      color: 'bg-green-50 border-green-300',
    },
    {
      title: 'Masjid Darussalam',
      icon: FaMosque,
      color: 'bg-purple-50 border-purple-200',
    },
    {
      title: 'Masjid Al Walidain',
      icon: FaMosque,
      color: 'bg-red-50 border-red-200',
    },
    {
      title: 'Masjid Baturrahman',
      icon: FaMosque,
      color: 'bg-amber-50 border-amber-300',
    },
    {
      title: 'SD Negeri 6 Mojong',
      icon: School,
      color: 'bg-yellow-50 border-yellow-300',
    },
    {
      title: 'Pondok Pesantren Assalam',
      icon: BookOpen,
      color: 'bg-orange-50 border-orange-200',
    },
    {
      title: 'Pondok Pesantren Nurul Azhar Talawe',
      icon: GraduationCap,
      color: 'bg-rose-50 border-rose-200',
    },
    {
      title: 'RA Nurul Azhar Talawe',
      icon: Baby,
      color: 'bg-pink-50 border-pink-200',
    },
    {
      title: 'Perkuburan Sadata',
      icon: Cross,
      color: 'bg-gray-50 border-gray-200',
    },
    {
      title: 'Dusun 1 Bulukonyi',
      icon: Mountain,
      color: 'bg-teal-50 border-teal-200',
    },
    {
      title: 'Dusun 2 Cappabatae',
      icon: Mountain,
      color: 'bg-indigo-50 border-indigo-200',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-12">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Header dengan animasi fade in */}
          <div className={`text-center mb-8 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-3xl font-bold text-green-700 mb-4 animate-pulse">Data Desa</h1>
            <div className="w-16 h-0.5 bg-green-600 mx-auto mb-4 animate-pulse"></div>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Desa Talawe yang berada di Kecamatan Watang Sidenreng, Kabupaten
              Sidenreng Rappang, merupakan desa dengan jumlah penduduk{' '}
              <span className="font-semibold text-green-700 transition-colors duration-300">
                {dataPenduduk ? dataPenduduk.total_penduduk : '...'} jiwa
              </span>{' '}
              yang terbagi dalam{' '}
              <span className="font-semibold text-green-700 transition-colors duration-300">
                {dataPenduduk ? dataPenduduk.jumlah_kk : '...'} kepala keluarga
              </span>.
              Struktur wilayahnya terdiri dari beberapa dusun, RW, dan RT yang
              terorganisir dengan baik, sehingga mendukung kelancaran
              administrasi dan kehidupan bermasyarakat.
            </p>
          </div>

          {/* Data Penduduk Section */}
          <div className={`mb-8 transition-all duration-1000 delay-300 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl font-bold text-green-700 mb-6 relative">
              Data Penduduk
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-green-500 animate-pulse"></div>
            </h2>
            
            <div className="bg-gray-100 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dataCards.length > 0 ? (
                  dataCards.map((card, index) => {
                    const IconComponent = card.icon;
                    return (
                      <div
                        key={index}
                        className={`${card.color} p-6 rounded-lg border-2 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 transform animate-fade-in-up`}
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animationFillMode: 'both'
                        }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <IconComponent className="h-8 w-8 text-gray-600 transform hover:scale-110 hover:rotate-3 transition-all duration-300" />
                        </div>
                        <div className="text-center">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-green-700 transition-colors duration-200">
                            {card.title}
                          </h3>
                          {card.value && (
                            <div className="text-3xl font-bold text-gray-900 mb-1 hover:text-green-600 transition-colors duration-300 transform hover:scale-105">
                              {card.value}
                            </div>
                          )}
                          <div className="text-sm text-gray-600">
                            {card.unit}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 animate-pulse">Memuat data...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sarana & Prasarana Section */}
          <div className={`mb-8 transition-all duration-1000 delay-500 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl font-bold text-green-700 mb-6 relative">
              Sarana & Prasarana
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-green-500 animate-pulse"></div>
            </h2>
            
            <div className="bg-gray-100 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {saranaCards.map((card, index) => {
                  const IconComponent = card.icon;
                  return (
                    <div
                      key={index}
                      className={`${card.color} p-6 rounded-lg border-2 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 transform animate-fade-in-up group`}
                      style={{
                        animationDelay: `${(index + 6) * 80}ms`,
                        animationFillMode: 'both'
                      }}
                    >
                      <div className="flex items-center justify-center mb-4">
                        <IconComponent className="h-12 w-12 text-gray-600 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-200">
                          {card.title}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Custom CSS untuk animasi */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DataDesaPage;