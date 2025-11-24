import EcosystemHeroImage from "../Images/Ecosystem-Images/EcosystemHero.jpg"
import AboutHero from "../Images/About-Images/AboutHero.jpg"
import AresWeFocusHero from "../Images/AreasWeFocus-Images/AreasWeFocusHero.jpg"
import CommunityHero from "../Images/Community-Images/CommunityHero.jpg"
import StartupsHero from "../Images/StartUps-Images/StartupsHero.png"
import NewsEventsHero from "../Images/NewsEvents-Images/NewsletterHeroImage.jpg"
import RiseAcademeyHero from "../Images/Ecosystem-Images/RiseAcademy/RiseAcademyHero.jpg"


import Header from "../Components/Home_Comp/Header"
import { useLocation } from "react-router-dom"
function PublicHeroSection (){
    const location = useLocation();
    const path = location.pathname;
    const HeroSectionData = {
        "/ecosystem" : {
            Image : EcosystemHeroImage,
            Title : "Ecosystem",
            Link : "/ecosystem"
        },
        "/about" : {
            Image : AboutHero,
            Title : "About Us",
            Link : "/about"
        },
        "/areasWe" : {
            Image : AresWeFocusHero,
            Title : "Areas We Focus",
            Link : "/areasWe"
        },
        "/community" : {
            Image : CommunityHero,
            Title : "Community",
            Link : "/community"
        },
        "/startups" : {
            Image : StartupsHero,
            // Title : "Startups",
            Link : "/startups"
        },
        "/newsletter" : {
            Image : NewsEventsHero,
            Title : "News and Events",
            Link : "/newsletter"
        },
        "/riseAcademy" : {
            Image : RiseAcademeyHero,
            Title : "Rise Academy",
            Link : "/riseAcademy"
        },
    }
    const CurrentPage = HeroSectionData[path] || {
        Title : "About Us",
        Image : AboutHero,
    }
    return <div className="w-full relative h-[450px] md:h-[550px]">
                <Header />
                <img className="w-full h-full object-cover" src={CurrentPage.Image} alt={CurrentPage.Title} />
                <div className="w-full h-full absolute flex justify-center bg-black/30 top-0">
                <div className="flex absolute bottom-20 items-center">
                    <h1 className="md:text-[70px] text-[35px] font-semibold  text-white"> {CurrentPage.Title} </h1>
                    {path !== "/startups" && (
                        <div className="w-[70px] h-[70px] border-2 -ml-10 border-white skew-x-[-20deg]"></div>
                    )}
                </div>
                </div>
        </div>
}
export default PublicHeroSection