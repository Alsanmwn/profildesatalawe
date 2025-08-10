import React, { useState, useEffect } from 'react';
import { Edit, Save, X, User, FileText, Upload, Camera, RefreshCw } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

// Firebase imports (assume you already initialized firebase in ../../firebase)
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

/*
  --- PENTING ---
  1) Ganti nilai CLOUDINARY_CLOUD_NAME dan CLOUDINARY_UPLOAD_PRESET di bawah
     dengan konfigurasi Cloudinary kamu (atau gunakan process.env.REACT_APP_...)
  2) Pastikan Upload Preset di Cloudinary dibuat sebagai UNSIGNED agar bisa
     diupload langsung dari client.
  3) Field gambar yang tersimpan di Firestore akan berisi secure_url dari Cloudinary.
*/
const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dy44jlluj';
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'desatalawe';

const SambutanKades = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ gambar: '', nama: '', sambutan: '' });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (showRefreshLoading = false) => {
    try {
      if (showRefreshLoading) setRefreshing(true);
      else setLoading(true);
      
      const docRef = doc(db, 'data_desa', 'sambutan_kades');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const fetchedData = { id: docSnap.id, ...docSnap.data() };
        setData(fetchedData);
        setEditData(fetchedData);
      } else {
        const defaultData = {
          gambar: '',
          nama: 'Nama Kepala Desa',
          sambutan: 'Silakan tambahkan sambutan kepala desa di sini...',
          lastUpdated: new Date().toISOString(),
        };
        // setDoc dengan merge=false untuk membuat dokumen baru
        await setDoc(docRef, defaultData);
        setData({ id: 'sambutan_kades', ...defaultData });
        setEditData({ id: 'sambutan_kades', ...defaultData });
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Gagal memuat data sambutan kades: ' + (err.message || err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData(true);
  };

  const handleSave = async () => {
    if (!editData.nama?.trim() || !editData.sambutan?.trim()) {
      alert('Nama dan sambutan harus diisi!');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const docRef = doc(db, 'data_desa', 'sambutan_kades');
      const dataToSave = {
        nama: editData.nama,
        sambutan: editData.sambutan,
        gambar: editData.gambar || '',
        lastUpdated: new Date().toISOString(),
      };

      // Gunakan setDoc dengan merge true agar aman jika dokumen belum ada
      await setDoc(docRef, dataToSave, { merge: true });

      setData({ ...dataToSave, id: 'sambutan_kades' });
      setIsEditing(false);
      alert('Data berhasil disimpan!');
    } catch (err) {
      console.error('Error saving data:', err);
      setError('Gagal menyimpan data: ' + (err.message || err));
      alert('Gagal menyimpan data. Silakan coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData({ ...data });
    setIsEditing(false);
    setError(null);
  };

  // Upload ke Cloudinary (unsigned)
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file tidak boleh lebih dari 5MB!');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error('Cloudinary upload failed: ' + text);
      }

      const cloudData = await res.json();

      if (cloudData.secure_url) {
        setEditData((prev) => ({ ...prev, gambar: cloudData.secure_url }));
      } else {
        throw new Error('Tidak mendapat URL dari Cloudinary');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Gagal mengupload gambar: ' + (err.message || err));
      setError('Gagal mengupload gambar: ' + (err.message || err));
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 lg:bg-gray-100">
        <Sidebar />
        <div className="ml-0 lg:ml-60 p-3 sm:p-4 lg:p-6">
          <div className="flex flex-col justify-center items-center h-48 sm:h-64 pt-16 lg:pt-0">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#42A91C] mb-4"></div>
            <p className="text-gray-600 text-sm sm:text-base text-center">Memuat data dari Firebase...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-gray-50 lg:bg-gray-100">
        <Sidebar />
        <div className="ml-0 lg:ml-60 p-3 sm:p-4 lg:p-6">
          <div className="text-center py-8 sm:py-12 pt-16 lg:pt-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 max-w-md mx-auto">
              <div className="text-red-500 text-base sm:text-lg mb-4 font-medium">{error}</div>
              <button
                onClick={handleRefresh}
                className="bg-[#42A91C] hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 text-sm sm:text-base"
              >
                Muat Ulang
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-gray-100">
      <Sidebar />

      <div className="ml-0 lg:ml-60 p-3 sm:p-4 lg:p-6">
        {/* Header */}
        <div className="pt-16 lg:pt-0 mb-6 lg:mb-8">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#42A91C] mb-2">
                Sambutan Kepala Desa
              </h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                Kelola sambutan dan profil kepala desa
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center justify-center lg:justify-start">
              <button
                onClick={handleRefresh}
                disabled={refreshing || saving || uploading}
                className="flex items-center justify-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 text-sm sm:text-base order-2 sm:order-1"
              >
                <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                {refreshing ? 'Memuat...' : 'Refresh'}
              </button>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-center gap-2 bg-[#42A91C] hover:bg-green-600 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors duration-200 text-sm sm:text-base font-medium order-1 sm:order-2"
                >
                  <Edit size={16} className="sm:w-5 sm:h-5" />
                  Edit Sambutan
                </button>
              ) : (
                <div className="flex gap-2 order-1 sm:order-2">
                  <button
                    onClick={handleSave}
                    disabled={saving || uploading}
                    className="flex items-center justify-center gap-2 bg-[#42A91C] hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm sm:text-base flex-1 sm:flex-none"
                  >
                    <Save size={16} />
                    {saving ? 'Menyimpan...' : 'Simpan'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={saving || uploading}
                    className="flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm sm:text-base flex-1 sm:flex-none"
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
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base">
            <div className="flex items-start gap-2">
              <div className="text-red-500 mt-0.5">⚠️</div>
              <div>{error}</div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Profile Section */}
              <div className="lg:col-span-1">
                <div className="text-center">
                  {/* Profile Image */}
                  <div className="relative inline-block mb-4 sm:mb-6">
                    {(isEditing ? editData.gambar : data?.gambar) ? (
                      <img
                        src={isEditing ? editData.gambar : data?.gambar}
                        alt="Kepala Desa"
                        className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full object-cover mx-auto border-4 border-[#42A91C] shadow-lg"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full bg-gray-100 flex items-center justify-center mx-auto border-4 border-gray-300">
                        <User size={40} className="text-gray-400 sm:w-12 sm:h-12 lg:w-16 lg:h-16" />
                      </div>
                    )}

                    {/* Upload Button for Edit Mode */}
                    {isEditing && (
                      <label className="absolute bottom-2 right-2 bg-[#42A91C] hover:bg-green-600 text-white p-2 sm:p-3 rounded-full cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95">
                        {uploading ? (
                          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                        ) : (
                          <Upload size={16} className="sm:w-5 sm:h-5" />
                        )}
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload} 
                          disabled={uploading} 
                          className="hidden" 
                        />
                      </label>
                    )}
                  </div>

                  {/* Upload Status */}
                  {uploading && (
                    <div className="mb-4">
                      <div className="inline-flex items-center gap-2 text-blue-600 text-sm">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        Mengupload foto...
                      </div>
                    </div>
                  )}

                  {/* Name Section */}
                  <div className="space-y-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.nama}
                        onChange={(e) => setEditData({ ...editData, nama: e.target.value })}
                        placeholder="Nama Kepala Desa"
                        className="text-lg sm:text-xl lg:text-2xl font-bold text-center w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42A91C] focus:border-transparent transition-all duration-200"
                        disabled={saving || uploading}
                      />
                    ) : (
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 break-words">
                        {data?.nama || 'Nama Kepala Desa'}
                      </h2>
                    )}
                    <p className="text-gray-600 text-sm sm:text-base font-medium">Kepala Desa Talawe</p>
                  </div>
                </div>
              </div>

              {/* Sambutan Section */}
              <div className="lg:col-span-2">
                <div className="border-l-4 border-[#42A91C] pl-4 sm:pl-6">
                  <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <FileText size={20} className="text-[#42A91C] sm:w-6 sm:h-6" />
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                      Sambutan Kepala Desa
                    </h3>
                  </div>

                  {isEditing ? (
                    <div className="space-y-2">
                      <textarea
                        value={editData.sambutan}
                        onChange={(e) => setEditData({ ...editData, sambutan: e.target.value })}
                        placeholder="Masukkan sambutan kepala desa..."
                        rows="10"
                        className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42A91C] focus:border-transparent resize-none transition-all duration-200"
                        disabled={saving || uploading}
                      />
                      <p className="text-xs sm:text-sm text-gray-500">
                        Gunakan Enter untuk membuat paragraf baru
                      </p>
                    </div>
                  ) : (
                    <div className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                      {data?.sambutan ? (
                        data.sambutan.split('\n').map((paragraph, index) => (
                          paragraph.trim() && (
                            <p key={index} className="mb-4 text-justify">
                              {paragraph}
                            </p>
                          )
                        ))
                      ) : (
                        <p className="text-gray-500 italic">Sambutan belum ditambahkan</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Last Updated Info */}
          {data?.lastUpdated && !isEditing && (
            <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
              <div className="text-xs sm:text-sm text-gray-500 text-center lg:text-left">
                Terakhir diperbarui: {new Date(data.lastUpdated).toLocaleString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SambutanKades;