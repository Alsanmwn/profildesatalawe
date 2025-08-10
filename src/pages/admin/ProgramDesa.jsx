// src/pages/ProgramDesa.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Pencil, Trash2, Plus, Upload, X, Camera, Menu } from "lucide-react";

const ProgramDesa = () => {
  const [programs, setPrograms] = useState([]);
  const [form, setForm] = useState({ nama_program: "", deskripsi: "", gambar: "" });
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Konfigurasi Cloudinary - Ganti dengan konfigurasi Anda
  const CLOUDINARY_UPLOAD_PRESET = "desatalawe"; // Gunakan ml_default sebagai fallback
  const CLOUDINARY_CLOUD_NAME = "dy44jlluj"; // Ganti dengan cloud name Anda yang sebenarnya

  // Untuk production, gunakan konfigurasi ini:
  // const CLOUDINARY_UPLOAD_PRESET = "your_actual_upload_preset"; 
  // const CLOUDINARY_CLOUD_NAME = "your_actual_cloud_name";

  const programCollection = collection(db, "program_desa", "program", "program");

  // Utility function untuk membersihkan undefined values
  const cleanObject = (obj) => {
    const cleaned = {};
    Object.keys(obj).forEach(key => {
      if (obj[key] !== undefined && obj[key] !== null) {
        cleaned[key] = obj[key];
      }
    });
    return cleaned;
  };

  // Ambil data dari Firestore
  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(programCollection);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching programs:", error);
      alert("Gagal mengambil data program");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  // Upload gambar ke Cloudinary
  const uploadImageToCloudinary = async (file) => {
    // Validasi konfigurasi Cloudinary
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error("Konfigurasi Cloudinary belum lengkap. Pastikan CLOUD_NAME dan UPLOAD_PRESET sudah diset.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "desa_talawe/program_desa");

    try {
      console.log("Uploading to:", `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);
      console.log("Upload preset:", CLOUDINARY_UPLOAD_PRESET);
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        console.error("Cloudinary response error:", data);
        throw new Error(data.error?.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      console.log("Upload successful:", data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      
      // Berikan pesan error yang lebih spesifik
      if (error.message.includes("Invalid upload preset")) {
        throw new Error("Upload preset tidak valid. Periksa konfigurasi Cloudinary Anda.");
      } else if (error.message.includes("Invalid cloud name")) {
        throw new Error("Cloud name tidak valid. Periksa konfigurasi Cloudinary Anda.");
      } else if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
        throw new Error("Gagal terhubung ke server. Periksa koneksi internet Anda.");
      } else {
        throw new Error(`Upload gagal: ${error.message}`);
      }
    }
  };

  // Handle file selection and preview
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("File harus berupa gambar!");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file maksimal 5MB!");
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const removeSelectedImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  // Tambah / Update data
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.nama_program.trim() || !form.deskripsi.trim()) {
      alert("Nama program dan deskripsi harus diisi!");
      return;
    }

    // Validasi tambahan untuk memastikan tidak ada undefined values
    if (form.nama_program === undefined || form.deskripsi === undefined) {
      alert("Data form tidak valid!");
      return;
    }

    setUploading(true);
    
    try {
      let imageUrl = form.gambar;

      // Upload gambar baru ke Cloudinary jika ada
      if (imageFile) {
        console.log("Starting image upload...");
        imageUrl = await uploadImageToCloudinary(imageFile);
        console.log("Image uploaded successfully:", imageUrl);
      }

      if (editId) {
        // Update - hanya field yang akan diubah
        const updateData = cleanObject({
          nama_program: form.nama_program.trim(),
          deskripsi: form.deskripsi.trim(),
          gambar: imageUrl || "",
          updated_at: new Date().toISOString(),
        });

        console.log("Updating program with data:", updateData);
        await updateDoc(doc(db, "program_desa", "program", "program", editId), updateData);
        alert("Program berhasil diperbarui!");
      } else {
        // Tambah - semua field termasuk created_at
        const addData = cleanObject({
          nama_program: form.nama_program.trim(),
          deskripsi: form.deskripsi.trim(),
          gambar: imageUrl || "",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        console.log("Adding new program with data:", addData);
        await addDoc(programCollection, addData);
        alert("Program berhasil ditambahkan!");
      }

      // Reset form
      setForm({ nama_program: "", deskripsi: "", gambar: "" });
      setImageFile(null);
      setImagePreview("");
      setEditId(null);
      setShowModal(false);
      
      fetchPrograms();
    } catch (error) {
      console.error("Error saving program:", error);
      
      // Tampilkan pesan error yang lebih user-friendly
      let errorMessage = "Terjadi kesalahan saat menyimpan program.";
      
      if (error.message.includes("Upload preset")) {
        errorMessage = "Konfigurasi upload tidak valid. Hubungi administrator.";
      } else if (error.message.includes("Cloud name")) {
        errorMessage = "Konfigurasi cloud tidak valid. Hubungi administrator.";
      } else if (error.message.includes("NetworkError")) {
        errorMessage = "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
      } else if (error.message.includes("permission")) {
        errorMessage = "Tidak memiliki izin untuk menyimpan data. Hubungi administrator.";
      } else {
        errorMessage = error.message || "Gagal menyimpan program. Silakan coba lagi.";
      }
      
      alert(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  // Hapus data
  const handleDelete = async (id, programName) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus program "${programName}"?`)) {
      try {
        await deleteDoc(doc(db, "program_desa", "program", "program", id));
        alert("Program berhasil dihapus!");
        fetchPrograms();
      } catch (error) {
        console.error("Error deleting program:", error);
        alert("Gagal menghapus program");
      }
    }
  };

  // Edit data
  const handleEdit = (program) => {
    setForm({ 
      nama_program: program.nama_program || "", 
      deskripsi: program.deskripsi || "", 
      gambar: program.gambar || "" 
    });
    setEditId(program.id);
    setImagePreview(program.gambar || "");
    setShowModal(true);
  };

  // Cancel edit/add
  const handleCancel = () => {
    setForm({ nama_program: "", deskripsi: "", gambar: "" });
    setImageFile(null);
    setImagePreview("");
    setEditId(null);
    setShowModal(false);
  };

  // Prevent modal body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-gray-100">
      <Sidebar />

      <div className="ml-0 lg:ml-60 p-3 sm:p-4 lg:p-6">
        {/* Header */}
        <div className="pt-16 lg:pt-0 mb-6 lg:mb-8">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#42A91C] mb-2">
                Program Desa
              </h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                Kelola program-program pembangunan dan kegiatan desa
              </p>
            </div>
            
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 bg-[#42A91C] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-600 active:scale-95 transition-all duration-200 w-full sm:w-auto text-sm sm:text-base font-medium shadow-md"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                Tambah Program
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-48 sm:h-64">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#42A91C] mb-4"></div>
            <span className="text-gray-600 text-sm sm:text-base">Memuat data...</span>
          </div>
        ) : (
          <>
            {/* Programs Grid */}
            {programs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <Camera className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Belum ada program
                </h3>
                <p className="text-gray-500 mb-4 text-sm sm:text-base">
                  Mulai dengan menambahkan program desa pertama Anda
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-[#42A91C] text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
                >
                  Tambah Program
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                {programs.map((program) => (
                  <div
                    key={program.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 overflow-hidden group"
                  >
                    {/* Program Image */}
                    <div className="h-40 sm:h-48 bg-gray-100 relative overflow-hidden">
                      {program.gambar ? (
                        <img
                          src={program.gambar}
                          alt={program.nama_program}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      
                      {/* Fallback placeholder */}
                      <div className={`${program.gambar ? 'hidden' : 'flex'} items-center justify-center h-full text-gray-400 bg-gray-100`}>
                        <Camera className="h-8 w-8 sm:h-12 sm:w-12" />
                      </div>
                      
                      {/* Action Buttons - Always visible on mobile, hover on desktop */}
                      <div className="absolute top-2 right-2 flex gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => handleEdit(program)}
                          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 active:scale-95 transition-all duration-200 shadow-md"
                          aria-label="Edit program"
                        >
                          <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(program.id, program.nama_program)}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 active:scale-95 transition-all duration-200 shadow-md"
                          aria-label="Hapus program"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Program Info */}
                    <div className="p-4 sm:p-5">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                        {program.nama_program || 'Program Tanpa Nama'}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base line-clamp-3 leading-relaxed">
                        {program.deskripsi || 'Tidak ada deskripsi'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Modal Form */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[95vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {editId ? 'Edit Program' : 'Tambah Program Baru'}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                  disabled={uploading}
                  aria-label="Tutup modal"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="flex-1 overflow-y-auto">
                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Nama Program */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Nama Program *
                    </label>
                    <input
                      type="text"
                      value={form.nama_program}
                      onChange={(e) => setForm({ ...form, nama_program: e.target.value })}
                      className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42A91C] focus:border-transparent transition-all duration-200"
                      placeholder="Masukkan nama program"
                      required
                      disabled={uploading}
                    />
                  </div>

                  {/* Deskripsi */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Deskripsi *
                    </label>
                    <textarea
                      value={form.deskripsi}
                      onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                      className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42A91C] focus:border-transparent resize-none transition-all duration-200"
                      rows="4"
                      placeholder="Masukkan deskripsi program"
                      required
                      disabled={uploading}
                    />
                  </div>

                  {/* Upload Gambar */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Gambar Program
                    </label>
                    
                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="mb-3 relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-32 sm:h-40 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removeSelectedImage}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-md"
                          disabled={uploading}
                          aria-label="Hapus gambar"
                        >
                          <X className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    )}

                    {/* File Input */}
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-24 sm:h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex flex-col items-center justify-center pt-2 pb-3">
                          <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mb-1 sm:mb-2" />
                          <p className="text-xs sm:text-sm text-gray-500 text-center px-2">
                            {imageFile ? (
                              <span className="font-medium text-[#42A91C]">
                                {imageFile.name.length > 20 
                                  ? `${imageFile.name.substring(0, 20)}...` 
                                  : imageFile.name
                                }
                              </span>
                            ) : (
                              "Pilih gambar (max 5MB)"
                            )}
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileSelect}
                          accept="image/*"
                          disabled={uploading}
                        />
                      </label>
                    </div>
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 p-4 sm:p-6 border-t border-gray-200 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                  disabled={uploading}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2.5 sm:py-3 bg-[#42A91C] text-white rounded-lg hover:bg-green-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base font-medium"
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>{editId ? 'Memperbarui...' : 'Menyimpan...'}</span>
                    </>
                  ) : (
                    <span>{editId ? 'Perbarui' : 'Tambah'}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramDesa;