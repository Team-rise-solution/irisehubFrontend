import SectionOne from "../Components/Community_Comp/section1"
import SectionTwo from "../Components/Community_Comp/section2"
import Footer from "../Components/Footer"
import BottomPage from "../Components/Home_Comp/BottomPage"
import PublicHeroSection from "../Components/PublicHeroSection"
import Seedbox from "../Images/Community-Images/SeedboxLogo.png"
import AThar from "../Images/Community-Images/Athar logo.png"

function Community (){
    return <div>
        <PublicHeroSection />
        <SectionOne />
        <div>
            <SectionTwo />
            {/* <SectionTwo Image = {Seedbox} TitleOne="Seedbox" TitleTwo="Equity investments in tech startups" Desc="Seedbox is dedicated to catalyzing investment in technological startups poised for strategic growth over the medium and long term. Recognizing their potential, Seedbox provides support to these startups, nurturing their development in both business acumen and technological innovation, thereby preparing them for future industrialization. Through strategic investment and mentorship, the aim is to unlock the full potential of these startups, fostering their growth and contribution to the technological landscape" />
            <SectionTwo Image = {AThar} TitleOne="Seedbox" TitleTwo="Equity investments in tech startups" Btn = "VISIT ATHAR.COM" link="/" Desc="Seedbox is dedicated to catalyzing investment in technological startups poised for strategic growth over the medium and long term. Recognizing their potential, Seedbox provides support to these startups, nurturing their development in both business acumen and technological innovation, thereby preparing them for future industrialization. Through strategic investment and mentorship, the aim is to unlock the full potential of these startups, fostering their growth and contribution to the technological landscape" />
            <SectionTwo Image = {Seedbox} TitleOne="Seedbox" TitleTwo="Equity investments in tech startups" Desc="Seedbox is dedicated to catalyzing investment in technological startups poised for strategic growth over the medium and long term. Recognizing their potential, Seedbox provides support to these startups, nurturing their development in both business acumen and technological innovation, thereby preparing them for future industrialization. Through strategic investment and mentorship, the aim is to unlock the full potential of these startups, fostering their growth and contribution to the technological landscape" />
            <SectionTwo Image = {AThar} TitleOne="Seedbox" TitleTwo="Equity investments in tech startups" Btn = "VISIT ATHAR.COM" link="/about" Desc="Seedbox is dedicated to catalyzing investment in technological startups poised for strategic growth over the medium and long term. Recognizing their potential, Seedbox provides support to these startups, nurturing their development in both business acumen and technological innovation, thereby preparing them for future industrialization. Through strategic investment and mentorship, the aim is to unlock the full potential of these startups, fostering their growth and contribution to the technological landscape" /> */}
        </div>
        <Footer />
        {/* <BottomPage /> */}
    </div>
}
export default Community