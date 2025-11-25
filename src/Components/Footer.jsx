import IRiseHupLogo from "../Images/HomeComp-Images/iRisehubLogo.png"
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer (){
    // Social media links (matching Header)
    const socialMediaLinks = [
        { Icon: FaLinkedinIn, url: "https://www.linkedin.com/company/irisehub/?originalSubdomain=so" },
        { Icon: FaXTwitter, url: "https://twitter.com/irisehub" },
        { Icon: IoLogoInstagram, url: "https://www.instagram.com/irise_hub/" },
        { Icon: FaFacebookF, url: "https://www.facebook.com/irisehub" },
    ];
    return <div className=" mx-auto max-w-7xl flex flex-col lg:h-[650px] items-center justify-center ">
            <div className="w-full lg:h-[450px] py-10 lg:py-0 flex flex-col lg:flex-row  gap-10 border-b-[1.5px] pb-[30px] lg:pb-10 border-b-gray-300 mt-20 px-10 lg:px-[100px] ">
                {/* Left */}
                <div className="relative w-full md:ml-10 ml-6 lg:ml-0 ">
                    <div className="md:w-[220px] ml-10 w-[150px] h-[120px] md:h-[190px]  bg-iriseColor/10 skew-x-[-40deg]"></div>
                    <div className="w-[300px] absolute top-6 ml-5">
                        <Link to="/"><img className="w-[200px]" src={IRiseHupLogo} alt="" /></Link>
                        <p className="text-[14px] md:text-[16px] lg:text-[14px] mt-5 ml-10"> KM6, Opp. Pizza House, Hodan. Mogadishu, Somalia</p>
                    </div>
                    <div className="flex gap-5 items-center lg:mt-0 mt-16 lg:absolute bottom-0">
                        {socialMediaLinks.map((social, i) => {
                            const Icon = social.Icon;
                            return (
                                <a
                                    key={i}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-[30px] md:w-[50px] lg:w-[35px] lg:h-[35px] md:h-[50px] h-[30px] text-black hover:text-white flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-125 overflow-hidden bg-[#F3F4F4] hover:bg-iriseColor rounded-full group"
                                >
                                    <Icon className="text-[17px] md:text-[22px] lg:text-[15px] transition-transform duration-300 ease-in-out" />
                                </a>
                            );
                        })}
                    </div>
                </div>
                {/* Right */}
                <div className="w-full lg:relative mt-10 lg:mt-0">
                    <h3 className="text-[20px] font-semibold "> Pioneering next industries. </h3>
                    <h1 className="md:mt-10 mt-2 text-gray-600"> At iRise Hub, we build and scale next-generation businesses and industrial ecosystems to catalyse sustainable growth and innovation across Somalia, Africa, and beyond.</h1>
                    <div className="flex justify-start text-gray-800 gap-10 mt-4 lg:absolute w-full lg:bottom-0">
                        <ul className="leading-[35px]">
                            <li>
                                <Link to="/about" className="hover:border-b-[1.5px] hover:border-b-black inline-block"> About </Link>
                            </li>
                            <li>
                                <Link to="/ecosystem" className="hover:border-b-[1.5px] hover:border-b-black inline-block"> Ecosystem </Link>
                            </li>
                            <li>
                                <Link to="/areasWe" className="hover:border-b-[1.5px] hover:border-b-black inline-block"> Areas We Focus </Link>
                            </li>
                            <li>
                                <Link to="/community" className="hover:border-b-[1.5px] hover:border-b-black inline-block"> Community </Link>
                            </li>
                            <li>
                                <Link to="/startups" className="hover:border-b-[1.5px] hover:border-b-black inline-block"> Startups</Link>
                            </li>
                        </ul>
                        {/* <ul className="leading-[35px]">
                            <li className="hover:border-b-[1.5px] hover:border-b-black"> Rise Academy </li>
                            <li className="hover:border-b-[1.5px] hover:border-b-black"> Minbar </li>
                            <li className="hover:border-b-[1.5px] hover:border-b-black"> IRiseHup </li>
                            <li className="hover:border-b-[1.5px] hover:border-b-black"> Kobciye </li>
                        </ul> */}
                        <ul className="leading-[35px]">
                            <li>
                                <Link to="/newsletter" className="hover:border-b-[1.5px] hover:border-b-black inline-block"> Event And News </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:border-b-[1.5px] hover:border-b-black inline-block"> Terms & Condition </a>
                            </li>
                            <li>
                                <a href="#" className="hover:border-b-[1.5px] hover:border-b-black inline-block"> Privacy Policy </a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            <div className="flex justify-center mb-6 lg:mb-0 items-center">
                <p className="text-center text-gray-500 mt-8 text-[14px] "> 2025. IRiseHup. All Rights Reserved. </p>
            </div>
    </div>
}
export default Footer 