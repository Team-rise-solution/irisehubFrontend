import BottomPage from "../Components/Home_Comp/BottomPage"
import Footer from "../Components/Footer"
import Header from "../Components/Home_Comp/Header"
import HeroSection from "../Components/Home_Comp/HeroSection"
import NewsEvents from "../Components/Home_Comp/NewsEvents"
import PillarApproach from "../Components/Home_Comp/PillarApproach"
import Section4 from "../Components/Home_Comp/Section4"
import Sectors from "../Components/Home_Comp/Sectors"
import NewsMoreInfo from "../Components/Home_Comp/NewsMoreInfo"
import { useState, useEffect } from "react"
import Impacts from "../Components/Home_Comp/Impacts"
import Partners from "../Components/Home_Comp/Partners"
import Ecosystem from "../Components/Home_Comp/ecosystem"
import OngoingProjects from "../Components/Home_Comp/ongoingProjects"

function Home (){
    const [ShowNewsInfo, setShowNewsInfo] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);

    const HandleOpenNews = (news) => {
        setSelectedNews(news);
        setShowNewsInfo(true);
    };
    const HandleCloseNews = () => {
        setShowNewsInfo(false);
        setSelectedNews(null);
    }

    useEffect(() => {
        if (ShowNewsInfo){
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden")
        }
    })

    return <div>
        <Header />
        <HeroSection />
        <Ecosystem />
        <OngoingProjects />
        <Impacts />
        <div className="mt-30 pb-[100px]">
            <PillarApproach />
        </div>
        {/* <Sectors /> */}
        {/* <Section4 /> */}
        <NewsEvents onEventClicked = {HandleOpenNews} />
        <Partners />
        <Footer />
        <BottomPage />
        {
            ShowNewsInfo && (
                <div className="w-full h-screen  z-10 bg-black/80 fixed top-0">
                    <NewsMoreInfo data={selectedNews} onClose = {HandleCloseNews} />
                </div>
            )
        }
        {/* <NewsMoreInfo /> */}
    </div>
}
export default Home