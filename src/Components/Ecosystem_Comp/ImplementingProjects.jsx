import AWE from "../../Images/About-Images/AWE.png"
import BICSomali from "../../Images/About-Images/BIC Somali.png"
import Dalbile from "../../Images/About-Images/Dalbile.png"

function ImplementingProjects (){
     const items = [
    { Name: "BIC (Business Innovation Center)", Desc: "An incubation and innovation hub providing startups with mentorship, resources, and funding pathways to scale.", Image: BICSomali },
    { Name: "AWE (Academy for Women Entrepreneurs)", Desc: "A global program empowering Somali women with entrepreneurship training, networking, and access to finance and markets.", Image: AWE },
    { Name: "Dalbile Youth Initiative", Desc: "Equipping Somali youth with funding, mentorship, and training in health, agriculture, environment, and tourism.", Image: Dalbile },
  ];
    return (
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 mx-auto max-w-7xl py-12 md:py-16">
            {/* Title Section */}
            <div className="mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    Implementing Partners Projects
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
export default ImplementingProjects

