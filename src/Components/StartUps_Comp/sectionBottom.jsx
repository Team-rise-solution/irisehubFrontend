// Import all eco images (eco1 to eco57) - only existing images
import Eco1 from "../../Images/StartUps-Images/Eco1.jpeg";
import Eco3 from "../../Images/StartUps-Images/eco3.jpeg";
import Eco4 from "../../Images/StartUps-Images/eco4.jpeg";
// import Eco5 from "../../Images/StartUps-Images/eco5.jpeg";
import Eco6 from "../../Images/StartUps-Images/eco6.jpeg";
import Eco7 from "../../Images/StartUps-Images/eco7.jpeg";
import Eco8 from "../../Images/StartUps-Images/eco8.jpeg";
import Eco9 from "../../Images/StartUps-Images/eco9.jpeg";
import Eco10 from "../../Images/StartUps-Images/eco10.jpeg";
import Eco11 from "../../Images/StartUps-Images/eco11.jpeg";
import Eco12 from "../../Images/StartUps-Images/eco12.jpeg";
import Eco13 from "../../Images/StartUps-Images/eco13.jpeg";
import Eco14 from "../../Images/StartUps-Images/eco14.jpeg";
import Eco15 from "../../Images/StartUps-Images/eco15.jpeg";
import Eco16 from "../../Images/StartUps-Images/eco16.jpeg";
import Eco17 from "../../Images/StartUps-Images/eco17.jpeg";
import Eco18 from "../../Images/StartUps-Images/eco18.jpeg";
import Eco19 from "../../Images/StartUps-Images/eco19.jpeg";
import Eco20 from "../../Images/StartUps-Images/eco20.jpeg";
import Eco21 from "../../Images/StartUps-Images/eco21.jpeg";
import Eco23 from "../../Images/StartUps-Images/eco23.jpeg";
import Eco24 from "../../Images/StartUps-Images/eco24.jpeg";
import Eco25 from "../../Images/StartUps-Images/eco25.jpeg";
import Eco26 from "../../Images/StartUps-Images/eco26.jpeg";
import Eco27 from "../../Images/StartUps-Images/eco27.jpeg";
import Eco28 from "../../Images/StartUps-Images/eco28.jpeg";
import Eco29 from "../../Images/StartUps-Images/eco29.jpeg";
import Eco30 from "../../Images/StartUps-Images/eco30.jpeg";
import Eco31 from "../../Images/StartUps-Images/eco31.jpeg";
import Eco32 from "../../Images/StartUps-Images/eco32.jpeg";
import Eco33 from "../../Images/StartUps-Images/eco33.jpeg";
import Eco34 from "../../Images/StartUps-Images/eco34.jpeg";
import Eco35 from "../../Images/StartUps-Images/eco35.jpeg";
import Eco36 from "../../Images/StartUps-Images/eco36.jpeg";
import Eco37 from "../../Images/StartUps-Images/eco37.jpeg";
import Eco39 from "../../Images/StartUps-Images/eco39.jpeg";
import Eco40 from "../../Images/StartUps-Images/eco40.jpeg";
import Eco41 from "../../Images/StartUps-Images/eco41.jpeg";
import Eco42 from "../../Images/StartUps-Images/eco42.jpeg";
import Eco43 from "../../Images/StartUps-Images/eco43.jpeg";
import Eco44 from "../../Images/StartUps-Images/eco44.jpeg";
import Eco45 from "../../Images/StartUps-Images/eco45.jpeg";
import Eco46 from "../../Images/StartUps-Images/eco46.jpeg";
import Eco47 from "../../Images/StartUps-Images/eco47.jpeg";
import Eco48 from "../../Images/StartUps-Images/eco48.jpeg";
import Eco49 from "../../Images/StartUps-Images/eco49.jpeg";
import Eco50 from "../../Images/StartUps-Images/eco50.jpeg";
import Eco51 from "../../Images/StartUps-Images/eco51.jpeg";
import Eco52 from "../../Images/StartUps-Images/eco52.jpeg";
import Eco53 from "../../Images/StartUps-Images/eco53.jpeg";
import Eco54 from "../../Images/StartUps-Images/eco54.jpeg";
import Eco55 from "../../Images/StartUps-Images/eco55.jpeg";
import Eco56 from "../../Images/StartUps-Images/eco56.jpeg";
import Eco57 from "../../Images/StartUps-Images/eco57.jpeg";

function SectionBottom() {
  const startupLogos = [
    Eco1,
    Eco3,
    Eco4,
    // Eco5,
    Eco6,
    Eco7,
    Eco8,
    Eco9,
    Eco10,
    Eco11,
    Eco12,
    Eco13,
    Eco14,
    Eco15,
    Eco16,
    Eco17,
    Eco18,
    Eco19,
    Eco20,
    Eco21,
    Eco23,
    Eco24,
    Eco25,
    Eco26,
    Eco27,
    Eco28,
    Eco29,
    Eco30,
    Eco31,
    Eco32,
    Eco33,
    Eco34,
    Eco35,
    Eco36,
    Eco37,
    Eco39,
    Eco40,
    Eco41,
    Eco42,
    Eco43,
    Eco44,
    Eco45,
    Eco46,
    Eco47,
    Eco48,
    Eco49,
    Eco50,
    Eco51,
    Eco52,
    Eco53,
    Eco54,
    Eco55,
    Eco56,
    Eco57,
  ];

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 py-16">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
        {startupLogos.map((logo, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
          >
            {/* Logo Container */}
            <div className="aspect-square p-2 md:p-3 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
              <img
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 filter group-hover:brightness-105"
                src={logo}
                alt={`Startup logo ${index + 1}`}
              />
            </div>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30 transition-all duration-300 rounded-2xl pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionBottom;
