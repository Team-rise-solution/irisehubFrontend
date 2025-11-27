import Netherland from "../../Images/HomeComp-Images/Partners/Netherland.png"
import UNDP from "../../Images/HomeComp-Images/Partners/UNDP.png"
import UNFPA from "../../Images/HomeComp-Images/Partners/UNFPA.png"
import Unicef from "../../Images/HomeComp-Images/Partners/unicef.png"
import UNIDO from "../../Images/HomeComp-Images/Partners/UNIDO.png"
import Ueropean from "../../Images/HomeComp-Images/Partners/Uropean.png"
import USEMPASSY from "../../Images/HomeComp-Images/Partners/US Empassy.jpg"
import MinisterofEducation from "../../Images/HomeComp-Images/Partners/Minister of Education.png"
import MinisterofPlanning from "../../Images/HomeComp-Images/Partners/Ministery of planning.png"
import USAID from "../../Images/HomeComp-Images/Partners/USAID.jpg"
import { Link } from "react-router-dom"
import { HiArrowSmRight } from "react-icons/hi"

const partners = [
  UNFPA,MinisterofEducation, USEMPASSY,Ueropean, Unicef, UNIDO, Netherland, UNDP, MinisterofPlanning, USAID,    
]

function Partners (){
  return (
    <div className="max-w-7xl mx-auto text-[30px] font-semibold mt-40 px-10  lg:px-[100px]">
      <div className="flex items-center relative mb-30">
        <h1 className="text-iriseColor absolute md:text-[32px] z-10 md:ml-20">PARTNERS WHO MADE IT POSSIBLE</h1>
        <div className="w-[70px]  h-[70px] -ml-5 md:ml-10 border-[1.5px] border-black/80 absolute -rotate-10 md:rotate-0 skew-x-[-20deg] "></div>
      </div>
      <div className="mt-12 grid md:grid-cols-3 grid-cols-2 -ml-2 md:ml-0 gap-10   lg:grid-cols-[200px_200px_200px_200px_200px] lg:gap-[20px]">
        {partners.map((logo, index) => (
          <div key={index} className="md:w-[200px] w-[150px] overflow-hidden h-[120px] flex justify-center px-[15px] items-center py-2 rounded-xl ">
            <img className="w-full h-full transition-all hover:scale-110 ease-in-out duration-300 object-contain" src={logo} alt={`Partner-${index}`} />
          </div>
        ))}
      </div>
      
      {/* See More Button */}
      <div className="mt-12 flex justify-center">
        <Link
          to="/partners"
          className="group inline-flex items-center gap-2 px-7 py-3 bg-iriseColor text-white text-sm font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          <span>See More</span>
          <HiArrowSmRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  )
}

export default Partners
