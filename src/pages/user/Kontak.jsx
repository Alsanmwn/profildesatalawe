import React from 'react';
import { Mail, Youtube, Facebook, Instagram, Music, Phone, MapPin, Clock } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Contact Card Component
const ContactCard = ({ icon: Icon, title, value, link, bgColor, textColor, hoverColor }) => {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${bgColor} ${textColor} p-5 sm:p-6 rounded-xl shadow-lg hover:${hoverColor} transform hover:scale-105 transition-all duration-300 group`}
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-white bg-opacity-20 rounded-lg group-hover:bg-opacity-30 transition-all flex-shrink-0">
          <Icon size={24} className="text-white" />
        </div>
        <div className="min-w-0">
          <h3 className="font-medium text-lg truncate">{title}</h3>
          <p className="text-sm opacity-90 truncate">{value}</p>
        </div>
      </div>
    </a>
  );
};

// Main Contact Component
const ContactPage = () => {
  const contacts = [
    {
      icon: Mail,
      title: "Email",
      value: "talawedesa@gmail.com",
      link: "mailto:talawedesa@gmail.com",
      bgColor: "bg-gradient-to-r from-red-500 to-red-600",
      textColor: "text-white",
      hoverColor: "from-red-600 to-red-700"
    },
    {
      icon: Phone,
      title: "WhatsApp",
      value: "082111165203",
      link: "https://wa.me/6282111165203",
      bgColor: "bg-gradient-to-r from-green-500 to-green-600",
      textColor: "text-white",
      hoverColor: "from-green-600 to-green-700"
    },
    {
      icon: Youtube,
      title: "YouTube",
      value: "Desa Talawe",
      link: "https://youtube.com/c/desatalawe",
      bgColor: "bg-gradient-to-r from-red-600 to-red-700",
      textColor: "text-white",
      hoverColor: "from-red-700 to-red-800"
    },
    {
      icon: Facebook,
      title: "Facebook",
      value: "Pemdes Talawe",
      link: "https://facebook.com/pemdestalawe",
      bgColor: "bg-gradient-to-r from-blue-600 to-blue-700",
      textColor: "text-white",
      hoverColor: "from-blue-700 to-blue-800"
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: "@Pemdes_talawe",
      link: "https://instagram.com/pemdes_talawe",
      bgColor: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500",
      textColor: "text-white",
      hoverColor: "from-pink-600 via-purple-600 to-indigo-600"
    },
    {
      icon: Music,
      title: "TikTok",
      value: "Pemdes Talawe",
      link: "https://tiktok.com/@pemdestalawe",
      bgColor: "bg-gradient-to-r from-gray-800 to-gray-900",
      textColor: "text-white",
      hoverColor: "from-gray-900 to-black"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-green-400 from-emerald-600 to-emerald-800 text-white py-12 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MapPin className="mx-auto mb-4 h-14 w-14 sm:h-16 sm:w-16 text-emerald-200 mt-12" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
            Hubungi Desa Talawe
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto">
            Kami siap melayani dan mendengarkan aspirasi masyarakat. Jangan ragu untuk menghubungi kami melalui berbagai platform komunikasi.
          </p>
        </div>
      </div>

      {/* Contact Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Kontak Kami</h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Pilih platform komunikasi yang paling nyaman untuk Anda. Kami aktif di berbagai media sosial dan siap memberikan informasi terkini tentang Desa Talawe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {contacts.map((contact, index) => (
            <ContactCard
              key={index}
              icon={contact.icon}
              title={contact.title}
              value={contact.value}
              link={contact.link}
              bgColor={contact.bgColor}
              textColor={contact.textColor}
              hoverColor={contact.hoverColor}
            />
          ))}
        </div>

        {/* Office Hours Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
              <Clock className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">Jam Pelayanan Kantor</h3>
            <p className="text-gray-600">Waktu operasional pelayanan masyarakat</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 p-4 bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 rounded-xl text-center">
              <h4 className="font-semibold text-gray-800 mb-1">Senin - Jumat</h4>
              <p className="text-gray-600 text-sm">08:00 - 15:00 WIB</p>
            </div>
            <div className="flex-1 p-4 bg-gradient-to-br from-red-50 to-pink-50 border border-red-100 rounded-xl text-center">
              <h4 className="font-semibold text-gray-800 mb-1">Sabtu - Minggu</h4>
              <p className="text-gray-600 text-sm">Tutup</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-6 sm:p-8 text-center text-white">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">Butuh Bantuan Segera?</h3>
          <p className="text-emerald-100 mb-5 sm:mb-6 text-base sm:text-lg">
            Untuk layanan darurat atau informasi mendesak, hubungi kami melalui WhatsApp
          </p>
          <a
            href="https://wa.me/6282111165203"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-emerald-600 px-5 sm:px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors text-sm sm:text-base"
          >
            <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Hubungi WhatsApp
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;