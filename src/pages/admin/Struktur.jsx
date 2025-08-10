import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { 
  Image, 
  User, 
  MapPin, 
  Eye, 
  Target, 
  Edit3, 
  Save, 
  X, 
  Upload,
  RefreshCw,
  AlertCircle,
  Check,
  Menu
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const Struktur = () => {
  const [data, setData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadingField, setUploadingField] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const CLOUD_NAME = 'dy44jlluj';
  const UPLOAD_PRESET = 'desatalawe';

  // Fetch data dengan error handling yang lebih baik
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Mencoba mengambil data dari Firestore...');
        const docRef = doc(db, 'struktur_desa', 'struktur');
        const snap = await getDoc(docRef);
        
        if (snap.exists()) {
          console.log('Data ditemukan:', snap.data());
          const fetchedData = snap.data();
          setData(fetchedData);
          setEditedData(fetchedData);
          setError(null);
        } else {
          console.log('Dokumen tidak ditemukan, membuat struktur default...');
          // Buat dokumen default jika tidak ada
          const defaultData = {
            bagan: '',
            peta_desa: '',
            visi: '',
            misi: '',
            created_at: new Date().toISOString()
          };
          
          await setDoc(docRef, defaultData);
          setData(defaultData);
          setEditedData(defaultData);
          console.log('Data default berhasil dibuat');
        }
      } catch (err) {
        console.error('Error mengambil data:', err);
        setError(`Gagal mengambil data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const docRef = doc(db, 'struktur_desa', 'struktur');
      const dataToSave = {
        ...editedData,
        updated_at: new Date().toISOString()
      };
      
      await updateDoc(docRef, dataToSave);
      setData(dataToSave);
      setEditMode(false);
      setError(null);
      alert('Data berhasil disimpan!');
    } catch (err) {
      console.error('Gagal menyimpan data:', err);
      setError(`Gagal menyimpan data: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const uploadToCloudinary = async (file, fieldName) => {
    if (!file) return;
    
    setUploading(true);
    setUploadingField(fieldName);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      handleChange(fieldName, data.secure_url);
      setError(null);
    } catch (err) {
      console.error('Upload gagal:', err);
      setError(`Upload gagal: ${err.message}`);
    } finally {
      setUploading(false);
      setUploadingField(null);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const docRef = doc(db, 'struktur_desa', 'struktur');
      const snap = await getDoc(docRef);
      
      if (snap.exists()) {
        const fetchedData = snap.data();
        setData(fetchedData);
        setEditedData(fetchedData);
      } else {
        setError('Dokumen tidak ditemukan di database');
      }
    } catch (err) {
      console.error('Error refresh data:', err);
      setError(`Gagal refresh data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Data fields configuration
  const dataFields = [
    {
      field: 'bagan',
      label: 'Bagan Struktur Organisasi',
      type: 'image',
      icon: Image,
      description: 'Upload bagan struktur organisasi desa'
    },
    {
      field: 'peta_desa',
      label: 'Peta Wilayah Desa',
      type: 'image',
      icon: MapPin,
      description: 'Upload peta wilayah Desa Talawe'
    },
    {
      field: 'visi',
      label: 'Visi Desa',
      type: 'textarea',
      icon: Eye,
      description: 'Visi pembangunan desa'
    },
    {
      field: 'misi',
      label: 'Misi Desa',
      type: 'textarea',
      icon: Target,
      description: 'Misi dan program kerja desa'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 lg:ml-60 p-3 sm:p-4 lg:p-6">
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-b-2 border-[#42A91C] mb-4"></div>
            <p className="text-gray-600 font-medium text-sm sm:text-base text-center px-4">
              Memuat data struktur desa...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="flex-1 lg:ml-60 p-3 sm:p-4 lg:p-6">
        {/* Mobile Header with Menu Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-start lg:space-y-0">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Struktur Desa
              </h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                Kelola informasi struktur dan profil Desa Talawe
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={refreshData}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 text-sm sm:text-base text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 w-full sm:w-auto"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
              
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 bg-[#42A91C] text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium text-sm sm:text-base w-full sm:w-auto"
                >
                  <Edit3 size={16} />
                  Edit Data
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleSave}
                    disabled={saving || uploading}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200 text-sm sm:text-base"
                  >
                    <Save size={16} />
                    {saving ? 'Menyimpan...' : 'Simpan'}
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setEditedData(data);
                      setError(null);
                    }}
                    disabled={saving || uploading}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-400 transition-colors duration-200 text-sm sm:text-base"
                  >
                    <X size={16} />
                    Batal
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 sm:mb-6 bg-red-50 border border-red-200 text-red-700 px-3 py-3 sm:px-4 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm sm:text-base">Error:</p>
                <p className="text-xs sm:text-sm break-words">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="mb-4 sm:mb-6 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-3 sm:px-4 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 flex-shrink-0"></div>
              <p className="text-sm sm:text-base">Mengupload {uploadingField}...</p>
            </div>
          </div>
        )}

        {data ? (
          <div className="space-y-4 sm:space-y-6">
            {dataFields.map(({ field, label, type, icon: Icon, description }) => (
              <div key={field} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 sm:p-6">
                  <div className="flex items-start sm:items-center gap-3 mb-4">
                    <div className="bg-[#42A91C] p-2 rounded-lg flex-shrink-0">
                      <Icon size={18} className="text-white sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                        {label}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 break-words">
                        {description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {type === 'image' ? (
                      <div>
                        {editMode && (
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Upload Gambar Baru
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => uploadToCloudinary(e.target.files[0], field)}
                              disabled={uploading}
                              className="block w-full text-xs sm:text-sm text-gray-500 file:mr-2 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-[#42A91C] file:text-white hover:file:bg-green-600 file:cursor-pointer"
                            />
                          </div>
                        )}
                        
                        {(editMode ? editedData[field] : data[field]) ? (
                          <div className="relative">
                            <img
                              src={editMode ? editedData[field] : data[field]}
                              alt={label}
                              className="w-full sm:max-w-md h-48 sm:h-64 object-contain rounded-lg border border-gray-200"
                            />
                            {uploadingField === field && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-white"></div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="w-full sm:max-w-md h-48 sm:h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                            <div className="text-center p-4">
                              <Icon size={32} className="text-gray-400 mx-auto mb-2 sm:w-12 sm:h-12" />
                              <p className="text-gray-500 text-sm">Belum ada gambar</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : type === 'textarea' ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {label}
                        </label>
                        {editMode ? (
                          <textarea
                            rows={6}
                            value={editedData[field] || ''}
                            onChange={(e) => handleChange(field, e.target.value)}
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42A91C] focus:border-transparent resize-none text-sm sm:text-base"
                            placeholder={`Masukkan ${label.toLowerCase()}`}
                          />
                        ) : (
                          <div className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg min-h-[120px] sm:min-h-[150px]">
                            <span className="whitespace-pre-line text-gray-900 text-sm sm:text-base break-words">
                              {data[field] || 'Belum ada data'}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {label}
                        </label>
                        {editMode ? (
                          <input
                            type="text"
                            value={editedData[field] || ''}
                            onChange={(e) => handleChange(field, e.target.value)}
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42A91C] focus:border-transparent text-sm sm:text-base"
                            placeholder={`Masukkan ${label.toLowerCase()}`}
                          />
                        ) : (
                          <div className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg">
                            <span className="text-gray-900 text-sm sm:text-base break-words">
                              {data[field] || 'Belum ada data'}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <AlertCircle size={48} className="mx-auto text-gray-400 mb-4 sm:w-16 sm:h-16" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Data Tidak Tersedia
              </h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base px-2">
                Data struktur desa belum tersedia atau gagal dimuat dari database.
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mb-4 break-all">
                Path: struktur_desa/struktur
              </p>
              <button
                onClick={refreshData}
                className="px-4 py-2 sm:px-6 bg-[#42A91C] text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm sm:text-base"
              >
                Coba Muat Ulang
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Struktur;