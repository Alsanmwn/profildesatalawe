import React, { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../../firebase';
import {
  Users,
  Home,
  MapPin,
  Building2,
  Calendar,
  TrendingUp,
  Activity,
  Target,
  Eye,
  Image,
  User,
  FileText,
  Star,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  Camera,
  Menu,
  Bell,
  Settings,
  BarChart3
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
  const [dataPenduduk, setDataPenduduk] = useState(null);
  const [programDesa, setProgramDesa] = useState([]);
  const [sambutanKades, setSambutanKades] = useState(null);
  const [strukturDesa, setStrukturDesa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Real-time data fetching
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch Data Penduduk
        const pendudukRef = doc(db, 'data_desa', 'data_penduduk');
        const pendudukSnap = await getDoc(pendudukRef);
        if (pendudukSnap.exists()) {
          setDataPenduduk(pendudukSnap.data());
        }

        // Fetch Program Desa
        const programCollection = collection(db, 'program_desa', 'program', 'program');
        const programSnap = await getDocs(programCollection);
        const programData = programSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProgramDesa(programData.slice(0, 6)); // Limit to 6 for dashboard

        // Fetch Sambutan Kades
        const sambutanRef = doc(db, 'data_desa', 'sambutan_kades');
        const sambutanSnap = await getDoc(sambutanRef);
        if (sambutanSnap.exists()) {
          setSambutanKades(sambutanSnap.data());
        }

        // Fetch Struktur Desa
        const strukturRef = doc(db, 'struktur_desa', 'struktur');
        const strukturSnap = await getDoc(strukturRef);
        if (strukturSnap.exists()) {
          setStrukturDesa(strukturSnap.data());
        }

        setLastUpdate(new Date());
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Gagal memuat data dashboard: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();

    // Set up real-time listeners for critical data
    const unsubscribers = [];

    // Real-time listener for data penduduk
    const pendudukUnsub = onSnapshot(
      doc(db, 'data_desa', 'data_penduduk'),
      (doc) => {
        if (doc.exists()) {
          setDataPenduduk(doc.data());
          setLastUpdate(new Date());
        }
      },
      (error) => console.error('Error listening to penduduk:', error)
    );
    unsubscribers.push(pendudukUnsub);

    // Real-time listener for sambutan kades
    const sambutanUnsub = onSnapshot(
      doc(db, 'data_desa', 'sambutan_kades'),
      (doc) => {
        if (doc.exists()) {
          setSambutanKades(doc.data());
          setLastUpdate(new Date());
        }
      },
      (error) => console.error('Error listening to sambutan:', error)
    );
    unsubscribers.push(sambutanUnsub);

    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      // Refetch all data
      const pendudukRef = doc(db, 'data_desa', 'data_penduduk');
      const pendudukSnap = await getDoc(pendudukRef);
      if (pendudukSnap.exists()) {
        setDataPenduduk(pendudukSnap.data());
      }

      const programCollection = collection(db, 'program_desa', 'program', 'program');
      const programSnap = await getDocs(programCollection);
      const programData = programSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProgramDesa(programData.slice(0, 6));

      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      setError('Gagal refresh data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Dashboard stats calculation
  const getStats = () => {
    const totalPrograms = programDesa.length;
    const hasVisiMisi = strukturDesa?.visi && strukturDesa?.misi;
    const hasKadesSambutan = sambutanKades?.sambutan;
    const completionRate = Math.round(((hasVisiMisi ? 1 : 0) + (hasKadesSambutan ? 1 : 0) + (totalPrograms > 0 ? 1 : 0)) / 3 * 100);

    return {
      totalPrograms,
      completionRate,
      hasVisiMisi,
      hasKadesSambutan
    };
  };

  const stats = getStats();

  // Population data for cards
  const populationCards = [
    {
      title: 'Total Penduduk',
      value: dataPenduduk?.total_penduduk || '0',
      icon: Users,
      color: 'bg-blue-500',
      change: '+2.5%'
    },
    {
      title: 'Kepala Keluarga',
      value: dataPenduduk?.jumlah_kk || '0',
      icon: Home,
      color: 'bg-green-500',
      change: '+1.8%'
    },
    {
      title: 'Jumlah Dusun',
      value: dataPenduduk?.jumlah_dusun || '0',
      icon: MapPin,
      color: 'bg-purple-500',
      change: 'Stabil'
    },
    {
      title: 'Program Aktif',
      value: programDesa.length.toString(),
      icon: Target,
      color: 'bg-orange-500',
      change: `+${programDesa.length}`
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-0 lg:ml-60 p-3 sm:p-4 lg:p-6">
          <div className="flex flex-col items-center justify-center h-64 pt-16 lg:pt-0">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#42A91C] mb-4"></div>
            <p className="text-gray-600 font-medium text-sm sm:text-base text-center px-4">
              Memuat dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-lg shadow-md border border-gray-200"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="ml-0 lg:ml-60 p-3 sm:p-4 lg:p-6">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 pt-12 lg:pt-0">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-2">
                Selamat datang di sistem informasi Desa Talawe
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
                <Calendar size={14} />
                <span>Terakhir diperbarui: {lastUpdate.toLocaleString('id-ID')}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 lg:flex-col xl:flex-row">
              <button
                onClick={refreshData}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#42A91C] text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm">
                <BarChart3 size={16} />
                Laporan
              </button>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Terjadi Kesalahan</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {populationCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                      {card.value}
                    </p>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={12} className="text-green-500" />
                      <span className="text-xs text-green-600">{card.change}</span>
                    </div>
                  </div>
                  <div className={`${card.color} p-3 rounded-lg flex-shrink-0`}>
                    <card.icon size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Left Column - Sambutan Kades & Completion Status */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Sambutan Kepala Desa */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Sambutan Kepala Desa
                  </h3>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
                
                {sambutanKades ? (
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="flex-shrink-0">
                      {sambutanKades.gambar ? (
                        <img
                          src={sambutanKades.gambar}
                          alt={sambutanKades.nama}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#42A91C]"
                        />
                      ) : (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-300">
                          <User size={24} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-base sm:text-lg mb-1">
                        {sambutanKades.nama || 'Kepala Desa'}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">Kepala Desa Talawe</p>
                      <p className="text-sm sm:text-base text-gray-700 line-clamp-3 leading-relaxed">
                        {sambutanKades.sambutan ? 
                          sambutanKades.sambutan.substring(0, 200) + '...' : 
                          'Sambutan kepala desa belum ditambahkan'
                        }
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <User size={48} className="mx-auto mb-3 text-gray-300" />
                    <p>Data sambutan kepala desa belum tersedia</p>
                  </div>
                )}
              </div>
            </div>

            {/* Program Desa */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Program Desa Terbaru
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {programDesa.length} Program
                    </span>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                </div>

                {programDesa.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {programDesa.map((program) => (
                      <div key={program.id} className="group cursor-pointer">
                        <div className="bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden">
                          <div className="h-24 sm:h-32 bg-gray-100 relative">
                            {program.gambar ? (
                              <img
                                src={program.gambar}
                                alt={program.nama_program}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-400">
                                <Camera size={20} />
                              </div>
                            )}
                          </div>
                          <div className="p-3 sm:p-4">
                            <h4 className="font-medium text-gray-900 text-sm line-clamp-1 mb-1">
                              {program.nama_program}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                              {program.deskripsi}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Target size={48} className="mx-auto mb-3 text-gray-300" />
                    <p>Belum ada program yang ditambahkan</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Info & Struktur */}
          <div className="space-y-6">
            
            {/* Completion Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Status Kelengkapan
                  </h3>
                  <div className="text-2xl font-bold text-[#42A91C]">
                    {stats.completionRate}%
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div 
                    className="bg-[#42A91C] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${stats.completionRate}%` }}
                  ></div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {stats.hasVisiMisi ? (
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-5 h-5 bg-gray-100 rounded-full border border-gray-300"></div>
                    )}
                    <span className="text-sm text-gray-700">Visi & Misi Desa</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {stats.hasKadesSambutan ? (
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-5 h-5 bg-gray-100 rounded-full border border-gray-300"></div>
                    )}
                    <span className="text-sm text-gray-700">Sambutan Kades</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {stats.totalPrograms > 0 ? (
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-5 h-5 bg-gray-100 rounded-full border border-gray-300"></div>
                    )}
                    <span className="text-sm text-gray-700">Program Desa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Statistik Wilayah
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-purple-500" />
                      <span className="text-sm text-gray-700">Jumlah RT</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {dataPenduduk?.jumlah_rt || '0'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 size={16} className="text-indigo-500" />
                      <span className="text-sm text-gray-700">Jumlah RW</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {dataPenduduk?.jumlah_rw || '0'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-pink-500" />
                      <span className="text-sm text-gray-700">Agama Mayoritas</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {dataPenduduk?.agama || '-'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visi Misi Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Visi & Misi
                  </h3>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
                
                {strukturDesa?.visi || strukturDesa?.misi ? (
                  <div className="space-y-4">
                    {strukturDesa.visi && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Eye size={16} className="text-blue-500" />
                          <h4 className="font-medium text-gray-900 text-sm">Visi</h4>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 pl-6">
                          {strukturDesa.visi}
                        </p>
                      </div>
                    )}
                    
                    {strukturDesa.misi && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Target size={16} className="text-green-500" />
                          <h4 className="font-medium text-gray-900 text-sm">Misi</h4>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-3 pl-6">
                          {strukturDesa.misi}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <FileText size={32} className="mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">Visi & misi belum ditambahkan</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-6 sm:mt-8 bg-gradient-to-r from-[#42A91C] to-green-600 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between text-white">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  Sistem Informasi Desa Talawe
                </h3>
                <p className="text-green-100 text-sm sm:text-base opacity-90">
                  Kelola data desa dengan mudah dan efisien
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Activity size={20} />
                <span className="text-sm">Status: Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;