// <<<<<<< HEAD
import Footer from "../Components/Footer"
import BottomPage from "../Components/Home_Comp/BottomPage"
import PublicHeroSection from "../Components/PublicHeroSection"

import React, { useState, useEffect, useRef } from "react";
import HeroSection from "../Components/Home_Comp/HeroSection";
import Header from "../Components/Home_Comp/Header";

// Logos
import tourbaLogo from "../Images/HomeComp-Images/tourba-logo.png";
import aradinovLogo from "../Images/HomeComp-Images/aradinov-logo.png";
import nutribiotekLogo from "../Images/HomeComp-Images/nutribiotek-logo.png";
import agriedgeLogo from "../Images/HomeComp-Images/agriedge-logo.png";

// Icons
import { FaTint } from "react-icons/fa"; // Water icon
import { GiPlantSeed } from "react-icons/gi"; // Agriculture icon
import EcosystemSection from "../Components/Ecosystem_Comp/EcosystemSection";
import ImplementingProjects from "../Components/Ecosystem_Comp/ImplementingProjects";

function Ecosystem() {

  return (
    <div className="relative">
      <PublicHeroSection />

      {/* Qoraalka sare */}
      <div className="py-10 text-black mb-5 lg:mt-10 md:mt-0  px-4">
        <p className="text-2xl md:text-2xl   max-w-3xl mx-auto"> At iRise Hub, our ecosystem connects people, ideas, and opportunities. We empower youth, entrepreneurs, and innovators through programs, spaces, and partnerships that fuel growth, resilience, and lasting impact.</p>
      </div>
      <EcosystemSection />
      <ImplementingProjects />
      <Footer />
      <BottomPage />
    </div>
  );
}

export default Ecosystem;
// AI sections
// {/* Company Cards */}
//       <div className="px-4 mx-auto max-w-7xl">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {companies.map((company, index) => (
//             <div
//               className="bg-white rounded-xl shadow p-6 flex flex-col justify-between transition-all duration-700 transform  hover:scale-105" //Halkan waye madaxa single box
//             >
//               <div className="flex items-start mb-4">
//                 <div className="w-[90px] h-[90px] bg-white border mr-4 overflow-hidden flex items-center justify-center">
//                   <img
//                     src={company.logo}
//                     alt={`${company.name} logo`}
//                     className="w-full h-full object-contain"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold">{company.name}</h3>
//                   <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
//                     <FaTint className="text-[#00bcd4]" />
//                     <GiPlantSeed className="text-green-600" />
//                     <span className="uppercase">{company.category}</span>
//                   </div>
//                 </div>
//               </div>
//               <p className="text-gray-700 text-sm">{company.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>