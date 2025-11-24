import InnovationIcon from "../../Images/AreasWeFocus-Images/innovationIcon.png"
import AgriTechIcon from "../../Images/AreasWeFocus-Images/AgriTechIcon.png"
import ClimateIcon from "../../Images/AreasWeFocus-Images/climateIcon.png"
import CodingIcon from "../../Images/AreasWeFocus-Images/CodingIcon.png"
import EconomicIcon from "../../Images/AreasWeFocus-Images/EconomicIcon.png"
import GovernanceIcon from "../../Images/AreasWeFocus-Images/GovernanceIcon.png"
import AgriTechBusiness from "../../Images/AreasWeFocus-Images/AgriTechImg.jpeg"
import ClimateResilience from "../../Images/AreasWeFocus-Images/ClimateResilience.jpg"
import CodeLearning from "../../Images/AreasWeFocus-Images/Code Learning.jpeg"
import Economic from "../../Images/AreasWeFocus-Images/Economic.jpg"
import Governance from "../../Images/AreasWeFocus-Images/GovernanceCivic.jpg"
import InnovationEconomy from "../../Images/HomeComp-Images/img-2.jpeg"
import { useEffect } from "react";
function AreasSection (){
    useEffect(() => {
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        };
    
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Handle text animations
              if (entry.target.classList.contains('animate-on-scroll') && !entry.target.classList.contains('image-container')) {
                entry.target.classList.add('animate-in');
              }
              
              // Handle image overlay animation
              if (entry.target.classList.contains('image-container')) {
                const overlay = entry.target.querySelector('.image-overlay');
                if (overlay) {
                  overlay.classList.add('overlay-animate');
                }
              }
            }
          });
        }, observerOptions);
    
        // Observe all elements with animation classes
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));
    
        return () => observer.disconnect();
      }, []);
     const EcosystemData = [
  {
    Icon: InnovationIcon,
    Image: InnovationEconomy,
    Title: "Innovation & Digital Economy",
    Desc: "We believe technology and innovation are powerful drivers of economic growth and social change. Our focus is on creating an enabling environment for digital transformation and supporting innovators to solve local challenges",
    Points: [
      "Incubating and accelerating tech-based startups.",
      "Promoting access to digital platforms, tools, and services.",
      "Strengthening Somalia’s digital economy through ICT and fintech.",
      "Creating pathways for young innovators to launch scalable solutions.",
      "Building partnerships with government, private sector, and global tech ecosystems.",
    ],
  },
  {
    Icon: AgriTechIcon,
    Image: AgriTechBusiness,
    Title: "Agritech and Agribusiness",
    Desc: "Agriculture is the backbone of Somalia’s economy, and we are committed to modernizing it through technology and entrepreneurship.",
    Points: [
      "Supporting farmers with climate-smart solutions like drip irrigation and greenhouses.",
      "Introducing affordable agricultural technologies for smallholder farmers.",
      "Facilitating agro-processing industries to create value-added products.",
      "Providing training in sustainable farming and agribusiness practices.",
      "Strengthening food systems and improving food security at community level.",
    ],
  },
  {
    Icon: CodingIcon,
    Image: CodeLearning,
    Title: "Learning & Coding",
    Desc: "We empower youth and women with practical skills to thrive in the digital era. Our learning programs are designed to be hands-on, engaging, and aligned with the needs of the market.",
    Points: [
      "Coding bootcamps that teach web, mobile, and software development.",
      "Training in digital literacy, ICT, and emerging technologies.",
      "Mentorship programs to guide learners into tech careers.",
      "Partnerships with universities and global tech organizations for curriculum development.",
      "Providing inclusive opportunities for women and marginalized groups in tech.",
    ],
  },
  {
    Icon: EconomicIcon,
    Image: Economic,
    Title: "Economic Resilience",
    Desc: "We focus on strengthening communities and businesses so they can withstand challenges and build long-term prosperity.",
    Points: [
      "Business incubation and acceleration programs (like Kobciye).",
      "Tailored support for SMEs and women-led enterprises to grow.",
      "Access to finance through grants, investors, and development agencies.",
      "Building strong market linkages for startups and entrepreneurs.",
      "Enhancing business competitiveness through training and mentoring.",
      "Promoting inclusive economic participation across all regions.",
    ],
  },
  {
    Icon: GovernanceIcon,
    Image: Governance,
    Title: "Governance and Civic Engagement",
    Desc: "Strong governance and active citizen participation are vital for a peaceful and inclusive society. We foster civic spaces where citizens and leaders can engage openly and constructively.",
    Points: [
      "Promoting transparency, accountability, and democratic participation.",
      "Encouraging youth and women to take leadership roles.",
      "Organizing civic forums and platforms for dialogue between government and citizens.",
      "Supporting community-driven initiatives for better service delivery.",
      "Empowering marginalized groups to have a voice in decision-making.",
    ],
  },
  {
    Icon: ClimateIcon,
    Image: ClimateResilience,
    Title: "Climate Resilience",
    Desc: "We address the urgent need to adapt to climate change while promoting sustainable development and green growth.",
    Points: [
      "Introducing renewable energy and low-carbon solutions.",
      "Promoting sustainable farming practices to cope with droughts and floods.",
      "Facilitating access to climate finance for local businesses and communities.",
      "Building awareness on climate adaptation and environmental protection.",
      "Supporting green entrepreneurship and eco-friendly startups.",
      "Strengthening ecosystems and community livelihoods against climate shocks.",
    ],
  },
];

    return <div className="w-full mt-20 ">
        <style>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }
        
        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Special handling for image containers */
        .image-container.animate-on-scroll {
          opacity: 1;
          transform: none;
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: black;
          transform: translateX(0);
          transition: transform 1.2s ease-out;
          z-index: 10;
        }
        
        .image-overlay.overlay-animate {
          transform: translateX(-100%);
        }
      `}</style>
        <div className="max-w-7xl mx-auto flex  flex-col justify-center px-3 md:px-10 lg:px-30 ">
        { EcosystemData.map((data) => {
            return <div className="mb-20">
                    <div className="lg:w-[800px] md:w-full w-[350px]">
                        <h1 className="md:text-3xl text-2xl font-semibold flex items-center gap-3"> <img src={data.Icon} className="w-[35px]" alt="" /> {data.Title} </h1>
                        <p className="md:text-xl mt-4"> {data.Desc}.</p>
                        <ul className="list-disc list-inside md:text-[18px] md:ml-5 ml-3 space-y-1 mt-5">
                            {data.Points.map((list,index) => (

                                <li key={index}> {list} </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:w-[650px] image-container animate-on-scroll mt-10  md:h-[500px] relative rounded-2xl overflow-hidden">
                        <img className="w-full h-full object-cover transition-all transform duration-300 hover:scale-110" src={data.Image} alt="" />
                        <div className="absolute inset- bg-black image-overlay"></div>
                    </div>
            </div>
            })}
        </div>

    </div>
}
export default AreasSection

// ## 1. **Innovation & Digital Economy**

// We believe technology and innovation are powerful drivers of economic growth and social change. Our focus is on creating an enabling environment for digital transformation and supporting innovators to solve local challenges.

// Incubating and accelerating tech-based startups.
// Promoting access to digital platforms, tools, and services.
// Strengthening Somalia’s digital economy through ICT and fintech.
// Creating pathways for young innovators to launch scalable solutions.
// Building partnerships with government, private sector, and global tech ecosystems.

// ---

// ## 2. **Agritech and Agribusiness**

// Agriculture is the backbone of Somalia’s economy, and we are committed to modernizing it through technology and entrepreneurship.

// * Supporting farmers with climate-smart solutions like drip irrigation and greenhouses.
// * Introducing affordable agricultural technologies for smallholder farmers.
// * Facilitating agro-processing industries to create value-added products.
// * Providing training in sustainable farming and agribusiness practices.
// * Strengthening food systems and improving food security at community level.

// ---

// ## 3. **Learning & Coding**

// We empower youth and women with practical skills to thrive in the digital era. Our learning programs are designed to be hands-on, engaging, and aligned with the needs of the market.

// * Coding bootcamps that teach web, mobile, and software development.
// * Training in digital literacy, ICT, and emerging technologies.
// * Mentorship programs to guide learners into tech careers.
// * Partnerships with universities and global tech organizations for curriculum development.
// * Providing inclusive opportunities for women and marginalized groups in tech.

// ---

// ## 4. **Economic Resilience**

// We focus on strengthening communities and businesses so they can withstand challenges and build long-term prosperity.

// * Business incubation and acceleration programs (like **Kobciye**).
// * Tailored support for SMEs and women-led enterprises to grow.
// * Access to finance through grants, investors, and development agencies.
// * Building strong market linkages for startups and entrepreneurs.
// * Enhancing business competitiveness through training and mentoring.
// * Promoting inclusive economic participation across all regions.

// ---

// ## 5. **Governance and Civic Engagement**

// Strong governance and active citizen participation are vital for a peaceful and inclusive society. We foster civic spaces where citizens and leaders can engage openly and constructively.

// * Promoting transparency, accountability, and democratic participation.
// * Encouraging youth and women to take leadership roles.
// * Organizing civic forums and platforms for dialogue between government and citizens.
// * Supporting community-driven initiatives for better service delivery.
// * Empowering marginalized groups to have a voice in decision-making.

// ---

// ## 6. **Climate Resilience**

// We address the urgent need to adapt to climate change while promoting sustainable development and green growth.

// * Introducing renewable energy and low-carbon solutions.
// * Promoting sustainable farming practices to cope with droughts and floods.
// * Facilitating access to climate finance for local businesses and communities.
// * Building awareness on climate adaptation and environmental protection.
// * Supporting green entrepreneurship and eco-friendly startups.
// * Strengthening ecosystems and community livelihoods against climate shocks.

