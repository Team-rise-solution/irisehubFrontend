// Import all startup logos
import SevenG from "../../Images/StartUps-Images/7G Organiztion.png";
import Baaldooro from "../../Images/StartUps-Images/Baaldooro.png";
import Baxnaano from "../../Images/StartUps-Images/Baxnaano.png";
import Bayaan from "../../Images/StartUps-Images/Bayaan.png";
import BeLastQ from "../../Images/StartUps-Images/Be Last Q.png";
import BeerKaal from "../../Images/StartUps-Images/BeerKaal.png";
import Bidhaan from "../../Images/StartUps-Images/Bidhaan.png";
import Bilicsan from "../../Images/StartUps-Images/Bilicsan.png";
import BulshoAgri from "../../Images/StartUps-Images/Bulsho agri.png";
import BulshoBile from "../../Images/StartUps-Images/BulshoBile.png";
import CarwoGK from "../../Images/StartUps-Images/Carwo GK.png";
import Dahardher from "../../Images/StartUps-Images/Dahardher.png";
import Daldhis from "../../Images/StartUps-Images/Daldhis.png";
import DardaaShopping from "../../Images/StartUps-Images/Dardaa shoping.png";
import Dayah from "../../Images/StartUps-Images/Dayah.png";
import Deeryaal from "../../Images/StartUps-Images/Deeryaal.png";
import Delta from "../../Images/StartUps-Images/delta.png";
import DhismeCaawiye from "../../Images/StartUps-Images/Dhisme Caawiye.png";
import DhismoKaab from "../../Images/StartUps-Images/Dhismo Kaab.png";
import DoogDoon from "../../Images/StartUps-Images/Doog Doon.png";
import DoorStep from "../../Images/StartUps-Images/DoorStep.png";
import FastCompany from "../../Images/StartUps-Images/Fast Company.png";
import FeynuusCo from "../../Images/StartUps-Images/Feynuus Co.png";
import Fursad from "../../Images/StartUps-Images/Fursad.png";
import GaraadKobciye from "../../Images/StartUps-Images/Garaad Kobciye.png";
import GreenAqua from "../../Images/StartUps-Images/Green Aqua.png";
import Hubaal from "../../Images/StartUps-Images/Hubaal.png";
import Iftin from "../../Images/StartUps-Images/iftin.png";
import Kifaah from "../../Images/StartUps-Images/Kifaah.png";
import KobciyeFarm from "../../Images/StartUps-Images/Kobciye Farm.png";
import NSalon from "../../Images/StartUps-Images/N-Salon.png";
import NaaleyeAgro from "../../Images/StartUps-Images/Naaleye Agro.png";
import Najax from "../../Images/StartUps-Images/Najax.png";
import Nalayee from "../../Images/StartUps-Images/Nalayee.png";
import QuruxDumar from "../../Images/StartUps-Images/Qurux dumar.png";
import SADA from "../../Images/StartUps-Images/SADA.png";
import Sadra from "../../Images/StartUps-Images/Sadra.png";
import SafariMeals from "../../Images/StartUps-Images/Safari Meals.png";
import SaraEvent from "../../Images/StartUps-Images/Sara Event Managment.png";
import SmartStati from "../../Images/StartUps-Images/Smart Stati.png";
import SolarFarm from "../../Images/StartUps-Images/Solar Farm.png";
import SolarRemit from "../../Images/StartUps-Images/Solar Remit.png";
import StoreForSmall from "../../Images/StartUps-Images/Store for small.png";
import StoreFor from "../../Images/StartUps-Images/Store for.png";
import TayoSare from "../../Images/StartUps-Images/TayoSare.png";
import Tomyo from "../../Images/StartUps-Images/Tomyo.png";
import Tusmo from "../../Images/StartUps-Images/Tusmo.png";
import Xareed from "../../Images/StartUps-Images/Xareed.png";
import ZeyDecr from "../../Images/StartUps-Images/Zey Decr.png";

function SectionBottom() {
  const startupLogos = [
    SevenG,
    Baaldooro,
    Baxnaano,
    Bayaan,
    BeLastQ,
    BeerKaal,
    Bidhaan,
    Bilicsan,
    BulshoAgri,
    BulshoBile,
    CarwoGK,
    Dahardher,
    Daldhis,
    DardaaShopping,
    Dayah,
    Deeryaal,
    Delta,
    DhismeCaawiye,
    DhismoKaab,
    DoogDoon,
    DoorStep,
    FastCompany,
    FeynuusCo,
    Fursad,
    GaraadKobciye,
    GreenAqua,
    Hubaal,
    Iftin,
    Kifaah,
    KobciyeFarm,
    NSalon,
    NaaleyeAgro,
    Najax,
    Nalayee,
    QuruxDumar,
    SADA,
    Sadra,
    SafariMeals,
    SaraEvent,
    SmartStati,
    SolarFarm,
    SolarRemit,
    StoreForSmall,
    StoreFor,
    TayoSare,
    Tomyo,
    Tusmo,
    Xareed,
    ZeyDecr,
  ];

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 py-16">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
        {startupLogos.map((logo, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
          >
            {/* Logo Container */}
            <div className="aspect-square p-6 md:p-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
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
