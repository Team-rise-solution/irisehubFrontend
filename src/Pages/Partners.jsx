import Footer from "../Components/Footer";
import BottomPage from "../Components/Home_Comp/BottomPage";
import PublicHeroSection from "../Components/PublicHeroSection";
import PartnersSection from "../Components/Partners/PartnersSection";

function Partners() {
  return (
    <div className="w-full min-h-screen relative scroll-smooth">
      <PublicHeroSection />
      <PartnersSection />
      <Footer />
      {/* <BottomPage /> */}
    </div>
  );
}

export default Partners;

