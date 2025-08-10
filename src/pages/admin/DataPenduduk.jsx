import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { 
  Users, 
  Home, 
  MapPin, 
  Building2, 
  Calendar, 
  Edit3, 
  Save, 
  X, 
  TrendingUp,
  Eye,
  RefreshCw,
  Menu
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const DataPenduduk = () => {
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Ambil data dari Firestore
  useEffect(() => {
    const fetchDataPenduduk = async () => {
      try {
        const docRef = doc(db, 'data_desa', 'data_penduduk');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
          setEditedData(docSnap.data());
        } else {
          console.log('Dokumen tidak ditemukan!');
        }
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataPenduduk();
  }, []);

  // Ubah data di form
  const handleChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Simpan ke Firestore
  const handleSave = async () => {
    setSaving(true);
    try {
      const docRef = doc(db, 'data_desa', 'data_penduduk');
      await updateDoc(docRef, editedData);
      setData(editedData);
      setEditMode(false);
      alert('Data berhasil disimpan!');
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
      alert('Gagal menyimpan data!');
    } finally {
      setSaving(false);
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setEditMode(false);
    setEditedData(data);
  };

  // Refresh data
  const refreshData = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'data_desa', 'data_penduduk');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
        setEditedData(docSnap.data());
      }
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Data fields configuration
  const dataFields = [
    { 
      field: 'total_penduduk', 
      label: 'Total Penduduk', 
      icon: Users, 
      type: 'text',
      color: 'bg-blue-500',
      description: 'Jumlah total penduduk desa'
    },
    { 
      field: 'jumlah_kk', 
      label: 'Jumlah Kepala Keluarga', 
      icon: Home, 
      type: 'text',
      color: 'bg-green-500',
      description: 'Total kepala keluarga yang terdaftar'
    },
    { 
      field: 'jumlah_dusun', 
      label: 'Jumlah Dusun', 
      icon: MapPin, 
      type: 'text',
      color: 'bg-purple-500',
      description: 'Wilayah dusun dalam desa'
    },
    { 
      field: 'jumlah_rt', 
      label: 'Jumlah RT', 
      icon: Building2, 
      type: 'text',
      color: 'bg-orange-500',
      description: 'Rukun Tetangga yang terdaftar'
    },
    { 
      field: 'jumlah_rw', 
      label: 'Jumlah RW', 
      icon: Building2, 
      type: 'text',
      color: 'bg-indigo-500',
      description: 'Rukun Warga yang terdaftar'
    },
    { 
      field: 'agama', 
      label: 'Agama Mayoritas', 
      icon: Calendar, 
      type: 'text',
      color: 'bg-pink-500',
      description: 'Agama yang dianut mayoritas penduduk'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-0 lg:ml-60 p-3 sm:p-4 lg:p-6">
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#42A91C] mb-4"></div>
            <p className="text-gray-600 font-medium text-sm sm:text-base text-center px-4">
              Memuat data penduduk...
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
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Data Penduduk
              </h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                Informasi demografis Desa Talawe
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-2 mt-2 text-xs sm:text-sm text-gray-500">
                <Calendar size={14} className="sm:w-4 sm:h-4" />
                <span>Terakhir diperbarui: Hari ini</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center justify-center lg:justify-start">
              <button
                onClick={refreshData}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base order-2 sm:order-1"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
              
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center justify-center gap-2 px-6 py-2 bg-[#42A91C] text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium text-sm sm:text-base order-1 sm:order-2"
                >
                  <Edit3 size={16} />
                  Edit Data
                </button>
              ) : (
                <div className="flex gap-2 order-1 sm:order-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200 text-sm sm:text-base flex-1 sm:flex-none"
                  >
                    <Save size={16} />
                    <span className="hidden sm:inline">{saving ? 'Menyimpan...' : 'Simpan'}</span>
                    <span className="sm:hidden">{saving ? '...' : 'Simpan'}</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-400 transition-colors duration-200 text-sm sm:text-base flex-1 sm:flex-none"
                  >
                    <X size={16} />
                    Batal
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {data ? (
          <>
            {/* Stats Grid - Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {dataFields.slice(0, 3).map(({ field, label, icon: Icon, color }) => (
                <div key={field} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`${color} p-2 sm:p-3 rounded-lg flex-shrink-0`}>
                          <Icon size={20} className="text-white sm:w-6 sm:h-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{label}</p>
                          <p className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                            {editMode ? editedData[field] || '-' : data[field] || '-'}
                          </p>
                        </div>
                      </div>
                      <div className="text-green-500 flex-shrink-0">
                        <TrendingUp size={16} className="sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Data Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Detail Data Penduduk</h2>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                    <Eye size={14} className="sm:w-4 sm:h-4" />
                    <span>{editMode ? 'Mode Edit' : 'Mode Lihat'}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {dataFields.map(({ field, label, icon: Icon, type, color, description }) => (
                    <div key={field} className="group">
                      <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                        <div className={`${color} p-2 rounded-lg flex-shrink-0`}>
                          <Icon size={18} className="text-white sm:w-5 sm:h-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <label className="block text-sm sm:text-base font-medium text-gray-900 mb-1">
                            {label}
                          </label>
                          <p className="text-xs text-gray-500 mb-2 sm:mb-3 line-clamp-2">{description}</p>
                          
                          {editMode ? (
                            <input
                              type={type}
                              value={editedData[field] || ''}
                              onChange={(e) => handleChange(field, e.target.value)}
                              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42A91C] focus:border-transparent transition-all duration-200"
                              placeholder={`Masukkan ${label.toLowerCase()}`}
                            />
                          ) : (
                            <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                              <span className="text-gray-900 font-medium text-sm sm:text-base break-words">
                                {data[field] || '-'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <Users size={48} className="mx-auto text-gray-400 mb-4 sm:w-16 sm:h-16" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Data Tidak Tersedia</h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base px-2">
                Data penduduk belum tersedia atau gagal dimuat dari database.
              </p>
              <button
                onClick={refreshData}
                className="px-6 py-2 bg-[#42A91C] text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm sm:text-base"
              >
                Muat Ulang Data
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataPenduduk;