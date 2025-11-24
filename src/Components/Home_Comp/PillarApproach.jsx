import { useEffect, useState } from "react";
import Technology from "../../Images/HomeComp-Images/TECHNOLOGY.jpg"
import Innovation from "../../Images/HomeComp-Images/Innovation.jpg"
import Diversity from "../../Images/HomeComp-Images/Diversity.jpg"
import Community from "../../Images/HomeComp-Images/Community.jpg"
import { HiArrowSmRight } from "react-icons/hi";
import { Link } from "react-router-dom";

function PillarApproach(){
    const Data = [
        {
            Image: Technology, 
            Title : "Technology",
            Desc : "We believe, the path for digital economic growth lies through collaboration and the use of technology in an effective way.  ", 
            Link : "#"
        },
        {
            Image: Innovation, 
            Title : "Innovation",
            Desc : "To produce innovative ideas and solutions, we are guided by thinking-outside-the box mentality.", 
            Link : "#"
        },
        {
            Image: Diversity, 
            Title : "Diversity",
            Desc : "We strive to bring on-board everyone who wants to be part on this journey without any descrimination..", 
            Link : ""
        },
        {
            Image: Community, 
            Title : "Community",
            Desc : "Building and nurturing a community with diverse skills and common agenda", 
            Link : ""
        },
    ]
    const [index,setIndex] = useState(0)
    useEffect (() => {
        const Interval = setInterval(() => {
            setIndex((prevIndex) => prevIndex === Data.length -1 ? 0 : prevIndex + 1);
        },4000)
        return () => clearInterval(Interval)
    },[Data.length])
    const Current = Data[index]
    
    return (
        <div className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-iriseColor/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12 md:mb-16 relative">
                    <div className="inline-block mb-6">
                        <div className="flex items-center gap-4 justify-center">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                                Our Approach
                            </h1>
                            <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-iriseColor skew-[-20deg] transform rotate-12 ml-2 md:ml-4"></div>
                        </div>
                    </div>
                    <p className="text-lg md:text-xl  text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
                        By merging technology with entrepreneurship, we transform challenges into opportunities. Our approach empowers youth and women to lead ventures that create impact and resilience.
                    </p>
                </div>

                {/* Main Content Card */}
                <div className="relative group">
                    <div className="w-full lg:h-[700px] md:h-[600px] h-[500px] relative rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 hover:shadow-3xl">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0">
                            <img 
                                className="w-full h-full object-cover transition-all duration-1000 ease-in-out transform scale-100 group-hover:scale-110" 
                                src={Current.Image} 
                                alt={Current.Title} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
                            <div className="absolute inset-0 bg-iriseColor/10 mix-blend-overlay"></div>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 lg:px-20">
                            {/* Title Section */}
                            <div className="text-center mb-8 transform transition-all duration-700">
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight drop-shadow-2xl">
                                        {Current.Title}
                                    </h2>
                                    <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-white/80 skew-[-20deg] transform -rotate-12 bg-white/10 backdrop-blur-sm"></div>
                                </div>
                                <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-lg">
                                    {Current.Desc}
                                </p>
                            </div>

                            {/* CTA Button */}
                            {Current.Link && (
                                <Link to={Current.Link}>
                                    <button className="group/btn relative overflow-hidden bg-iriseColor text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-semibold text-base md:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3">
                                        <span className="relative z-10">DISCOVER MORE</span>
                                        <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transform group-hover/btn:translate-x-1 transition-transform duration-300">
                                            <HiArrowSmRight className="text-xl" />
                                        </div>
                                        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                                    </button>
                                </Link>
                            )}
                        </div>

                        {/* Navigation Pills - Bottom */}
                        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
                            <div className="flex flex-wrap justify-center gap-3 md:gap-4 bg-white/10 backdrop-blur-md rounded-full p-2 md:p-3 border border-white/20">
                                {Data.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setIndex(idx)}
                                        className={`relative px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
                                            item === Current
                                                ? "bg-iriseColor text-white shadow-lg scale-105"
                                                : "bg-white/20 text-white/80 hover:bg-white/30 hover:text-white"
                                        }`}
                                    >
                                        <span className="relative z-10">{item.Title}</span>
                                        {item === Current && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-iriseColor to-blue-500 rounded-full opacity-80 animate-pulse"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Progress Indicator */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                            <div 
                                className="h-full bg-gradient-to-r from-iriseColor to-blue-500 transition-all duration-4000 ease-linear"
                                style={{ width: `${((index + 1) / Data.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PillarApproach