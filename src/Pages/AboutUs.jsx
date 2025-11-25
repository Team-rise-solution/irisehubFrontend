import { useEffect, useState } from "react";
import BusinessBuilding from "../Components/About_Comp/BusinessBuilding";
import Introduction from "../Components/About_Comp/Intro";
import OurApproach from "../Components/About_Comp/OurApproach";
import OurEcosystem from "../Components/About_Comp/OurEcosystem";
import VisionMission from "../Components/About_Comp/VisionMision";
import OrganizationalChart from "../Components/About_Comp/OrganizationalChart";
import Footer from "../Components/Footer";
import BottomPage from "../Components/Home_Comp/BottomPage";
import PublicHeroSection from "../Components/PublicHeroSection";

function AboutUs() {
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          current = sec.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen relative scroll-smooth">
      <PublicHeroSection />

      <div className="lg:flex gap-4 w-full relative">
        {/* Sidebar */}
        <div className="lg:mt-[120px] flex  shadow-md lg:shadow-none bg-white lg:bg-transparent md:block z-10 lg:sticky lg:top-[120px] lg:self-start lg:h-[calc(100vh-120px)] lg:overflow-y-auto self-start lg:w-[12%] lg:ml-10">
          <ul className="lg:leading-[40px] flex flex-wrap px-2 gap-3 justify-around py-5 lg:py-0 lg:text lg:block">
            {[
              { id: "intro", label: "Introduction" },
              { id: "vision", label: "Vision Mission" },
              { id: "approach", label: "Our Approach" },
              { id: "organizational-chart", label: "Org Chart" },
              
            ].map((item) => (
              <li key={item.id} className={`flex items-center gap-2 lg:text-[14px] ${ activeSection === item.id ? "text-black font-semibold" : "lg:text-gray-400" }`} >
                <div className={`w-[7px] h-[7px] rounded-full ${activeSection === item.id ? "bg-black" : "bg-gray-300"}`}></div>
                <a href={`#${item.id}`} className="hover:underline decoration-1 hover:underline-offset-6" >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="w-full">
          <section id="intro" className="">
            <Introduction />
          </section>
          <section id="vision" className="">
            <VisionMission />
          </section>
          {/* <section id="business" className="">
            <BusinessBuilding />
          </section> */}
          <section id="approach" className=" py-16">
            <OurApproach />
          </section>
          <section id="organizational-chart" className="">
            <OrganizationalChart />
          </section>
          {/* <section id="ecosystem" className="">
            <OurEcosystem />
          </section> */}
        </div>
      </div>

      <Footer />
      {/* <BottomPage /> */}
    </div>
  );
}

export default AboutUs;
