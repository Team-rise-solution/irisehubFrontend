import RiseAcademy from "../../Images/About-Images/Rise Academy.png"
import AWE from "../../Images/About-Images/AWE.png"
import BICSomali from "../../Images/About-Images/BIC Somali.png"
import Dalbile from "../../Images/About-Images/Dalbile.png"
import IFFS from "../../Images/About-Images/IFFS.png"
import Kobciye from "../../Images/About-Images/Kobciye.png"
import Minbar from "../../Images/About-Images/Minbar.png"
import TCI from "../../Images/About-Images/TCI.png"
import MogadishuTech from "../../Images/About-Images/Mogadishu Tech Summit.png"

function EcosystemSection (){
     const items = [
    { Name: "Mogadishu Tech Summit", Desc: "Somalia's largest technology and innovation event, connecting entrepreneurs, investors, and policymakers.", Image: MogadishuTech },
    { Name: "Rise Academy", Desc: "A specialized learning hub focused on coding and programming, empowering youth with digital skills for the future of work.", Image: RiseAcademy },
    { Name: "Minbar", Desc: "A media and knowledge-sharing platform where news, updates, speeches, and thought pieces from politicians, government leaders, and experts are shared to inform and engage the ecosystem.", Image: Minbar },
    // { Name: "AWE (Academy for Women Entrepreneurs)", Desc: "A global program empowering Somali women with entrepreneurship training, networking, and access to finance and markets.", Image: AWE },
    // { Name: "Dalbile Youth Initiative", Desc: "Equipping Somali youth with funding, mentorship, and training in health, agriculture, environment, and tourism.", Image: Dalbile },
    // { Name: "BIC (Business Innovation Center)", Desc: "An incubation and innovation hub providing startups with mentorship, resources, and funding pathways to scale.", Image: BICSomali  },
    { Name: "KOBCIYE Program", Desc: "A digital innovation platform that drives entrepreneurship and tech-based problem-solving for Somalia's digital economy.", Image: Kobciye },
    // { Name: "A Civic Space for Participation", Desc: "Safe centers providing vocational training, ICT, health counseling, and youth programs with 5,000+ youth trained.", Image:  },
    { Name: "Innovative for Food Security (IFFS)", Desc: "Agri-tech solutions such as greenhouses, drip irrigation, and windpumps to improve food production and sustainability.", Image: IFFS },
    { Name: "TVET Centers Initiative", Desc: "Regional hubs delivering technical training, digital literacy, and life skills for young people.", Image: TCI },
    ];
    return (
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 mx-auto max-w-7xl py-12 md:py-16">
            {/* Title Section */}
            <div className="mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    Our Ecosystem
                </h2>
            </div>
            
            {/* Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {
                items.map((company, index) => (
                    <div key={index} className="flex flex-col group transition-all duration-300">
                        {/* Image Box */}
                        <div className="w-full h-52 md:h-60 lg:h-64 flex items-center justify-center p-8 bg-white border border-gray-200 rounded-lg mb-6 transition-all duration-300 group-hover:border-gray-300 group-hover:shadow-sm">
                            <img 
                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" 
                                src={company.Image} 
                                alt={company.Name} 
                            />
                        </div>
                        {/* Description below */}
                        <div className="w-full text-left">
                            <h2 className="text-lg md:text-xl font-medium text-gray-900 mb-3 leading-snug">
                                {company.Name}
                            </h2>
                            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-normal">
                                {company.Desc}
                            </p>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}
export default EcosystemSection    
