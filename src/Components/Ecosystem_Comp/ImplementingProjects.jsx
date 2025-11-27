import AWE from "../../Images/About-Images/AWE.png"
import BICSomali from "../../Images/About-Images/BIC Somali.png"
import Dalbile from "../../Images/About-Images/Dalbile.png"
import SOS from "../../Images/Ecosystem-Images/SOS Somalia.jpg"
import SaveTheChildren from "../../Images/Ecosystem-Images/Save the children.png"
import UNICEF from "../../Images/HomeComp-Images/Partners/unicef.png"
import UN from "../../Images/HomeComp-Images/Partners/Uropean.png"
import WorldBank from "../../Images/Ecosystem-Images/World Bank.jpg"
import ICRC from "../../Images/Ecosystem-Images/ICRC.png"
import ADESO from "../../Images/Ecosystem-Images/Adeso.webp"
import Nagaasho from "../../Images/HomeComp-Images/NagaashoLogo.png"
function ImplementingProjects (){
     const items = [
    {Name :"Nagaasho", Desc: "The Nagaasho Project is a four-year initiative in Somalia aimed at strengthening community resilience and preventing forced displacement. It focuses on promoting climate-smart livelihoods, inclusive economic opportunities, and social cohesion, particularly for women, youth, and marginalized groups. Implemented by a consortium of partners under the Danish Somalia Strategic Framework, the project employs integrated approaches—including climate science, socio-economic analysis, and community-led planning—to address the root causes of vulnerability in rural communities.", Image: Nagaasho},
    { Name: "BIC (Business Innovation Center)", Desc: "Business Incubators is an EU funded UNIDO program that supports Somali youth with tech based and innovation driven incubation. It operates across Somalia, with iRise Hub incubating 25 startups per cohort. The project runs in three 12 month cohorts and is now in the third phase of the second cohort, where selected entrepreneurs receive equipment grants worth 2,000 to 9,000 dollars.", Image: BICSomali },
    { Name: "AWE (Academy for Women Entrepreneurs)", Desc: "AWE is a U.S. Embassy funded program in Banadir that supports women to start and grow small businesses through practical training and networks. It strengthens women’s economic participation by building skills, confidence, and access to local opportunities in line with the U.S. National Strategy on Gender Equity and Equality.The rollout covers 2 years and the execution stage is ongoing.", Image: AWE },
    { Name: "Dalbile Youth Initiative", Desc: "Dalbile was a youth empowerment project funded by the EU through UNFPA and implemented  with iRise.It took place in Jubbaland, Garowe, South West, BRA, Hirshabelle, Galmudug, and  Puntland. The rollout lasted 36 months and the execution stage is already completed.", Image: Dalbile },
    {Name :"The Next Economy (TNE) ", Desc: "This SOS Children’s Village Iceland funded project supported youth in Banadir to access skills and real entry points to the labour market.It responded to high unemployment and the shortage of entry level roles by helping young people build experience and improve their readiness for work. The rollout lasted 3 years, the execution stage is concluded, and it aligned with national efforts to reduce youth unemployment.", Image: SOS},
    {Name :" UPSHIFT Innovative Livelihoods Program - Benadir Region", Desc: "UNICEF funded this one-year project in Banadir to help youth build practical 21st century skills for work and entrepreneurship. It responded to high unemployment, risky migration paths, and limited leadership support by guiding youth toward safer economic opportunities. The execution stage is concluded", Image: UNICEF},
    {Name :"Economic and Social Empowerment of Youth (EASEY) in Somalia", Desc: "EASEY was a Save the Children and BMZ funded project in Mogadishu that supported displaced youth with business development skills and pitching opportunities. It focused on 350 young people, including youth with disabilities, helping them build entrepreneurship skills and move toward income opportunities. The rollout lasted 1 month and the execution stage is concluded.", Image: SaveTheChildren},
    {Name :"Rajo Hackathon", Desc: "Rajo Hackathon was a UN Habitat funded program in Mogadishu, Garowe, and Kismayo. It trained 400 youth in construction, business, entrepreneurship, and soft skills, with selected participants receiving start up support.The rollout lasted 12 months and the execution stage is concluded.", Image: UN},
    {Name :"Mogadishu Watt", Desc: "Mogadishu Watt was a World Bank funded youth energy challenge in Mogadishu focused on solutions for affordable and sustainable energy.It trained over ten youth groups from idea stage to launch and supported them to develop practical energy innovations.The rollout lasted six months and the execution stage is concluded.", Image: WorldBank},
    {Name :"Catalyzing Economic Development and Livelihoods (CEDL)", Desc: "CEDL was an ADESO funded project in Adado, Jowhar, and Kismayo that supported local economic growth through skills development and business incubation.It helped youth, women, and men strengthen their productivity and competitiveness and improved access to financing for new and existing entrepreneurs.The rollout lasted six months and the execution stage is concluded.", Image: ADESO},
    {Name :"Project Name: Vocational Training Services in Business Skills (Entrepreneurship/SMEs) Course.", Desc: "Vocational Training Services was funded by the International Committee of the Red Cross, delivered in Banadir for youth and women with limited skills because of conflict. It focused on business and entrepreneurship training to help them enter income-generating work in both formal and informal markets. The rollout lasted 6 months and the execution stage is concluded", Image: ICRC}
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

