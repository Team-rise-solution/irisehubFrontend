import SOlar from "../../Images/HomeComp-Images/Solar.jpg"
import { HiArrowSmRight } from "react-icons/hi";
// Pages hero image
import EcosystemHeroImage from "../../Images/Ecosystem-Images/EcosystemHero.jpg"
import AboutHero from "../../Images/About-Images/iRisehub.jpg"
import AresWeFocusHero from "../../Images/AreasWeFocus-Images/AreasWeFocusHero.jpg"
import CommunityHero from "../../Images/Community-Images/CommunityHero.jpg"
import StartupsHero from "../../Images/StartUps-Images/StartupsHero.jpg"
import { useLocation,Link } from "react-router-dom";

function BottomPage  (){
    
const NextPageHeroInfo = [
  { path: "/", title: "About Us", Link : "/about", image: AboutHero },
  { path: "/about", title: "Ecosystem", Link : "/ecosystem", image: EcosystemHeroImage },
  { path: "/ecosystem", title: "Areas We Focus", Link : "/areasWe", image: AresWeFocusHero },
  { path: "/areasWe", title: "Community", Link : "/community", image: CommunityHero },
  { path: "/community", title: "Startups", Link : "/startups", image: StartupsHero },
  // add more pages as needed
];
const location = useLocation();
const CurrentPage = NextPageHeroInfo.findIndex((page) => page.path === location.pathname)
const NextPage = NextPageHeroInfo[(CurrentPage + 1) % NextPageHeroInfo.length]

 // Optional: hide BottomPage if there is no next page
  if (!NextPage) return null;

    return <div className="w-full h-[400px] md:h-[600px] relative  ">
        <img className="w-full h-full object-cover" src={NextPage.image} alt={NextPage.title} />
        <div className="w-full h-full flex flex-col justify-center items-center bg-black/20 absolute top-0 ">
            <h1 className="md:text-[80px] text-[50px] text-white font-bold"> {NextPage.title} </h1>
            <Link to={NextPage.Link}>
                <button className="primaryBtn bg-iriseColor mt-7 group text-white py-3 text-[15px] pl-5 "> DISCOVER 
                    <div className="primaryBtnArrayIcon bg-white border-white group-hover:text-white text-iriseColor group-hover:bg-transparent"> <HiArrowSmRight /> </div> 
                </button>
            </Link>        
        </div>
    </div>
}
export default BottomPage