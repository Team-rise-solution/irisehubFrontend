// Hero section images 
import Hero1 from "../../Images/HomeComp-Images/img-1.jpeg"
import Hero2 from "../../Images/HomeComp-Images/img-2.jpeg"
import Hero3 from "../../Images/HomeComp-Images/img-3.jpg"
import Hero4 from "../../Images/HomeComp-Images/img-4.jpg"
import Hero5 from "../../Images/HomeComp-Images/img-5.jpeg"
import Hero6 from "../../Images/HomeComp-Images/img-6.jpeg"
import Hero7 from "../../Images/HomeComp-Images/img-7.jpeg"
import Hero8 from "../../Images/HomeComp-Images/img-8.jpeg"
import Hero9 from "../../Images/HomeComp-Images/img-9.jpeg"
// import Hero10 from "../../Images/HomeComp-Images/img-10.jpeg"
// Arrow
import { HiArrowSmRight } from "react-icons/hi";
import { useEffect, useState } from "react"

function HeroSection (){
    const HeroSectionImages = [
        Hero1,Hero2,Hero3,Hero4,Hero5,Hero6,Hero7,Hero8,Hero9,
    ]
    const [index, setIndex] = useState(0);
    const [ClockLikeRotate, setClockLikeRotate] = useState(0);
   useEffect (() => {
    const interval = setInterval(() => {
        setIndex((prevIndex) => prevIndex === HeroSectionImages.length -1 ? 0 : prevIndex + 1);
        setClockLikeRotate((prevDeg) => prevDeg + 6 )
    }, 2000);
    return () => clearInterval(interval)
   },[HeroSectionImages.length])

    return <div className="w-full flex items-center flex-col h-[700px] relative top-0">
            <img className="w-full h-full transition-all duration-300 ease-in-out object-cover" src={HeroSectionImages[index]} alt="" />
            <div className="w-full h-full object-cover bg-black/10 top-0 absolute"></div>
            <div className="lg:w-[600px] lg:px-0 md:px-20 px-5 z-1 absolute top-40">
                <h1 className="lg:text-[80px] md:text-8xl text-6xl text-white font-bold leading-16  md:leading-[100px] ">Somali's Innovation Hub</h1>
                <p className="text-[22px] text-white  mt-5">iRisehub partners with entrepreneurs, governments, and agencies to create sustainable solutions in agritech, climate resilience, civic engagement, and beyond. </p>
                <button className="primaryBtn bg-white mt-5 group "> Play Video 
                    <div className="primaryBtnArrayIcon bg-iriseColor border-iriseColor group-hover:text-iriseColor text-white group-hover:bg-transparent"> <HiArrowSmRight /> </div> 
                </button>
            </div>
            {/* Mirror sec */}
            <div style={{ transform:  `rotate(${ClockLikeRotate}deg) skewX(-39deg)` }} class="relative md:w-[230px] w-[150px] h-[150px] md:h-[230px] duration-100 skew-x-[-39deg] -mt-100 bg-white/10 backdrop-blur-[5px] transform origin-center animate-clocktick">
            </div>
            {/* <div class="relative w-[230px] h-[230px] skew-x-[-39deg] -mt-100 bg-white/10 backdrop-blur-[5px] transform origin-center animate-clocktick">
            </div> */}

    </div>
}
export default HeroSection