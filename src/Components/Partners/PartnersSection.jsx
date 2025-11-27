// Import all partner logos
import AAMINAmbulance from "../../Images/HomeComp-Images/Partners/AAMIN ambulance.png";
import AfriLabs from "../../Images/HomeComp-Images/Partners/AfriLabs.png";
import Ankageo from "../../Images/HomeComp-Images/Partners/Ankageo.jpg";
import Banadir from "../../Images/HomeComp-Images/Partners/Banadir.png";
import CircleInnovation from "../../Images/HomeComp-Images/Partners/Circle Innovation.png";
import CreativeLogo from "../../Images/HomeComp-Images/Partners/CreativeLogo.jpg";
import EYIMPACT from "../../Images/HomeComp-Images/Partners/EYIMPACT.png";
import FCA from "../../Images/HomeComp-Images/Partners/FCA.jpg";
import Funzi from "../../Images/HomeComp-Images/Partners/funzi.webp";
import HIIL from "../../Images/HomeComp-Images/Partners/HIIL.png";
import IBSBank from "../../Images/HomeComp-Images/Partners/IBS Bank.png";
import ICRC from "../../Images/HomeComp-Images/Partners/ICRC.png";
import Jamhuriya from "../../Images/HomeComp-Images/Partners/Jamhuriya.ico";
import Liquid from "../../Images/HomeComp-Images/Partners/Liquid.png";
import MinisterOfEducation from "../../Images/HomeComp-Images/Partners/Minister of Education.png";
import MinisterOfYouth from "../../Images/HomeComp-Images/Partners/MInister of youth.jpg";
import MinisteryOfPlanning from "../../Images/HomeComp-Images/Partners/Ministery of planning.png";
import Netherland from "../../Images/HomeComp-Images/Partners/Netherland.png";
import NOA from "../../Images/HomeComp-Images/Partners/NOA.jpg";
import PANGEA from "../../Images/HomeComp-Images/Partners/PANGEA.png";
import PremiereBank from "../../Images/HomeComp-Images/Partners/Premiere Bank.jpg";
import SBSN from "../../Images/HomeComp-Images/Partners/SBSN.jpg";
import Simad from "../../Images/HomeComp-Images/Partners/Simad.jpg";
import SIU from "../../Images/HomeComp-Images/Partners/SIU.png";
import SOS from "../../Images/HomeComp-Images/Partners/SOS.png";
import UNHabitat from "../../Images/HomeComp-Images/Partners/UN Habitat logo.png";
import UNDP from "../../Images/HomeComp-Images/Partners/UNDP.png";
import UNFPA from "../../Images/HomeComp-Images/Partners/UNFPA.png";
import Unicef from "../../Images/HomeComp-Images/Partners/unicef.png";
import UNIDO from "../../Images/HomeComp-Images/Partners/UNIDO.png";
import Uropean from "../../Images/HomeComp-Images/Partners/Uropean.png";
import USEmpassy from "../../Images/HomeComp-Images/Partners/US Empassy.jpg";
import USAID from "../../Images/HomeComp-Images/Partners/USAID.jpg";
import WorldClassScholars from "../../Images/HomeComp-Images/Partners/World Class Scholars.png";
import PartnersImage from "../../Images/Ecosystem-Images/PartnersImage-removebg-preview.png"
// import PartnersImage from "../../Images/Ecosystem-Images/PartnersImage.jpeg"


function PartnersSection() {
  const partnerLogos = [
    AAMINAmbulance,
    AfriLabs,
    Ankageo,
    Banadir,
    CircleInnovation,
    CreativeLogo,
    EYIMPACT,
    FCA,
    Funzi,
    HIIL,
    IBSBank,
    ICRC,
    Jamhuriya,
    Liquid,
    MinisterOfEducation,
    MinisterOfYouth,
    MinisteryOfPlanning,
    Netherland,
    NOA,
    PANGEA,
    PremiereBank,
    SBSN,
    Simad,
    SIU,
    SOS,
    UNHabitat,
    UNDP,
    UNFPA,
    Unicef,
    UNIDO,
    Uropean,
    USEmpassy,
    USAID,
    WorldClassScholars,
  ];

  return (
    <div className="w-full py-16 md:py-24 px-5 md:px-10 lg:px-20 bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Title Section */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-16">
        <div className="flex items-center relative mb-8">
          <h1 className="text-[28px] md:text-[35px] lg:text-[42px] font-bold text-gray-900 relative z-10 md:ml-20">
          PARTNERS WHO MADE IT POSSIBLE
          </h1>
          <div className="w-[60px] md:w-[70px] h-[60px] md:h-[70px] -ml-5 md:ml-10 border-[1.5px] border-[#F24405] absolute -rotate-10 md:rotate-0 skew-x-[-20deg]"></div>
        </div>
        <p className="text-gray-600 text-base md:text-lg max-w-3xl md:ml-20 mt-6">
          We are proud to collaborate with these incredible organizations and institutions that share our vision of empowering communities and driving positive change.
        </p>
      </div>

      {/* Partners Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
          {partnerLogos.map((logo, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {/* Logo Container */}
              <div className="aspect-square p-6 md:p-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                <img
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 filter group-hover:brightness-105"
                  src={logo}
                  alt={`Partner logo ${index + 1}`}
                />
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F24405]/0 to-[#F24405]/0 group-hover:from-[#F24405]/5 group-hover:to-[#F24405]/10 transition-all duration-300 rounded-2xl pointer-events-none" />
              
              {/* Border accent on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#F24405]/20 rounded-2xl transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Partners Image Section - Bottom */}
      <div className="max-w-7xl mx-auto mt-20 md:mt-0">
        <div className="flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-3xl relative">
            <img
              className="w-full h-auto object-contain"
              src={PartnersImage}
              alt="Our Partners"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnersSection;

