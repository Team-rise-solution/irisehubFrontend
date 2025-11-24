import iRisehupLogo from "../../Images/HomeComp-Images/iRisehubLogo.png";
import { Link } from "react-router-dom";
// Social Media icons
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { useState, useEffect } from "react";
import { PiCaretDownBold } from "react-icons/pi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { VscChromeClose } from "react-icons/vsc";
import { newsAPI, eventAPI } from "../../services/api";

function Header() {
  const [isHoverItem, setIsHoverItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNewsEventsDropdown, setShowNewsEventsDropdown] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [newsCount, setNewsCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);

  // Social media links
  const socialMediaLinks = [
    { Icon: FaLinkedinIn, url: "https://www.linkedin.com/company/irisehub/?originalSubdomain=so" },
    { Icon: FaXTwitter, url: "https://twitter.com/irisehub" },
    { Icon: IoLogoInstagram, url: "https://www.instagram.com/irise_hub/" },
    { Icon: FaFacebookF, url: "https://www.facebook.com/irisehub" },
  ];

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setShowNewsEventsDropdown(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowNewsEventsDropdown(false);
    }, 150); // Small delay to allow moving to dropdown
    setHoverTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  // Fetch counts for news and events
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [newsResponse, eventsResponse] = await Promise.all([
          newsAPI.getAll({ limit: 1 }),
          eventAPI.getAll({ limit: 1 })
        ]);
        
        if (newsResponse.data.success) {
          setNewsCount(newsResponse.data.pagination.totalItems || 0);
        }
        
        if (eventsResponse.data.success) {
          setEventsCount(eventsResponse.data.pagination.totalItems || 0);
        }
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  // Check if we're on news or events pages

  return (
    <>
      

      {/* Main Header */}
      <header className="w-full fixed left-0 top-0 z-40 shadow-md bg-white">
      {/* ✅ Changed: added responsive container padding (px-4 md:px-8) */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 h-[80px]">
        
        {/* ✅ Logo sizing now scales better (140px -> 180px) */}
        <Link to="/" className="flex items-center">
          <img
            className="w-[140px] md:w-[180px] object-contain"
            src={iRisehupLogo}
            alt="iRiseHub Logo"
          />
        </Link>

        {/* ✅ Desktop Nav (hidden on small, flex on lg and up) */}
        <nav className="hidden lg:flex gap-6   text-md relative">
          {/* Dropdown: About */}
            <div className="relative" onMouseEnter={() => setIsHoverItem("about")} onMouseLeave={() => setIsHoverItem(null)}>
                <Link to="/about"> <li className="items-center flex gap-1  hover:border-b hover:border-b-[1.5px] hover:text-iriseColor"> About  </li> </Link>
                {/* <Link to="/about"> <li className="items-center flex gap-1 mb-2"> About  <PiCaretDownBold className={`${isHoverItem === "about" ? "rotate-180 transition-transform duration-300 ease-in-out" : "rotate-0"}`} /> </li> </Link> */}
                {/* { isHoverItem === "about" && (
                <div className={`w-[200px] py-4 px-3 transition-transform duration-10 bg-white absolute top-full left-0 rounded-md z-30 shadow-md shadow-black`}>
                <ul className="leading-[35px]  text-[16px] font-normal text-black">
                    <li className="border-b-1 border-b-gray-200 hover:border-b-black hover:border-b-[1.5px]"> Our Team </li>
                    <li className="border-b-1 border-b-gray-200 hover:border-b-black hover:border-b-[1.5px]"> Policies </li>
                    <li className="border-b-1 border-b-gray-200 hover:border-b-black hover:border-b-[1.5px]"> Visual Identity </li>
                </ul>
            </div>
            )} */}
            </div>

            {/* Dropdown: Ecosystem */}
            {/* <div className="relative" onMouseEnter={() => setIsHoverItem("ecosystem")} onMouseLeave={() => setIsHoverItem(null)}>
                <Link to="/ecosystem"> <li className="items-center flex gap-1 hover:border-b hover:border-b-[1.5px] hover:text-iriseColor"> Ecosystem  <PiCaretDownBold className={`${isHoverItem === "    ecosystem" ? "rotate-180 transition-transform duration-300 ease-in-out" : "rotate-0"}`} /> </li> </Link>
                { isHoverItem === "ecosystem" && (
                <div className={`w-[210px] py-4 px-3 transition-transform duration-10 bg-white absolute top-full left-0 rounded-md z-30 shadow-md shadow-black`}>
                <ul className="leading-[35px] text-[16px] font-normal text-black">
                    <Link to="https://www.riseacademy.so/"><li className="border-b-1 border-b-gray-200 hover:border-b-black hover:border-b-[1.5px]"> Rise Academy </li></Link>
                    <Link to="https://minbarspace.com/"><li className="border-b-1 border-b-gray-200 hover:border-b-black hover:border-b-[1.5px]"> Minbar </li></Link>
                    <Link to="https://mts2024.com/"><li className="border-b-1 border-b-gray-200 hover:border-b-black hover:border-b-[1.5px]"> Mogadishu Tech Summit </li></Link>
                    <Link to="#"><li className="border-b-1 border-b-gray-200 hover:border-b-black hover:border-b-[1.5px]"> Rise Solution </li></Link>
                    <Link to="#"><li className="border-b-1 border-b-gray-200 hover:border-b-black hover:border-b-[1.5px]"> Kobciye </li></Link>
                   
                </ul>
                </div>
                )}
              </div> */}

          {/* ✅ Simple links kept for desktop */}
          <Link className="hover:border-b hover:border-b-[1.5px] hover:text-iriseColor" to="/ecosystem">Ecosystem</Link>
          <Link className="hover:border-b hover:border-b-[1.5px] hover:text-iriseColor" to="/areasWe">Areas We Focus</Link>
          <Link className="hover:border-b hover:border-b-[1.5px] hover:text-iriseColor" to="/community">Community</Link>
          <Link className="hover:border-b hover:border-b-[1.5px] hover:text-iriseColor" to="/startups">Startups</Link>
          
          {/* News & Events Dropdown */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          > 
          <Link>
            <li className="flex items-center gap-1 hover:text-iriseColor hover:border-b hover:border-b-[1.5px] transition-colors">
              News & Events <PiCaretDownBold className="text-xs" />
            </li>
          </Link>
            
            {showNewsEventsDropdown && (
              <div 
                className="absolute top-full left-0 mt-1 w-48 bg-white shadow-xl rounded-xl border border-gray-200 py-3 z-50 backdrop-blur-sm"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
              <Link
                to="/news"
                className="block px-4 py-3 hover:underline pb-4"
                onClick={() => setShowNewsEventsDropdown(false)}
              >
                News
              </Link>
              <Link
                to="/events"
                className="block px-4 py-3 hover:underline pb-4"
                onClick={() => setShowNewsEventsDropdown(false)}
              >
                Events
              </Link>
              <Link
                to="/share-your-story"
                className="block px-4 py-3 hover:underline pb-4"
                onClick={() => setShowNewsEventsDropdown(false)}
              >
                Share Your Story
              </Link>
              </div>
            )}
          </div>
        </nav>

        {/* ✅ Social icons visible only on desktop */}
        <div className="hidden lg:flex gap-4">
          {socialMediaLinks.map((social, i) => {
            const Icon = social.Icon;
            return (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[35px] h-[35px] bg-white shadow-md inset rounded-full flex items-center justify-center text-black hover:bg-iriseColor hover:text-white transition transform hover:scale-110"
              >
                <Icon className="text-lg" />
              </a>
            );
          })}
        </div>

        {/* ✅ Mobile Menu Button (hidden on desktop) */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-3xl md:text-4xl  focus:outline-none"
        >
          {isMenuOpen ? <VscChromeClose /> : <HiBars3BottomRight />}
        </button>
      </div>

      {/* ✅ Mobile Nav (appears only when menu is open) */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white text-black absolute top-[80px] left-0 w-full h-screen p-8">
          <ul className="leading-[45px] text-xl md:text-2xl md:leading-[50px] mt-0  md:mt-5  ">
            <div onMouseEnter={() => setIsHoverItem("about")} onMouseLeave={() => setIsHoverItem(false)}>
                <Link to="/about" ><li>About</li></Link>
                {/* {
                    isHoverItem === "about" && (
                    <ul className="text-[18px] md:text-[22px] leading-8 ml-3 text-gray-600 ">
                        <li className="hover:text-black"> Our Team </li>
                        <li className="hover:text-black"> Policies </li>
                        <li className="hover:text-black"> Visual Identity </li>
                    </ul>
                    )
                } */}
            </div>
            <div onMouseEnter={() => setIsHoverItem("ecosystem")} onMouseLeave={() => setIsHoverItem(false)}>
                <Link to="/ecosystem" ><li>Ecosystem</li></Link>
                {
                    isHoverItem === "ecosystem" && (
                    <ul className="text-[18px] md:text-[22px] leading-8 ml-3 text-gray-600 ">
                        <Link to="/riseAcademy"><li className="hover:text-black"> Rise Academy </li></Link>
                        {/* <Link to="#"><li className="hover:text-black"> Rise Solution </li></Link>
                        <Link to="#"><li className="hover:text-black"> Minbar </li></Link>
                        <Link to="#"><li className="hover:text-black"> Kobciye </li></Link>
                        <Link to="#"><li className="hover:text-black"> Mogadishu Tech Summit </li></Link> */}
                    </ul>
                    )
                }
            </div>
            <Link to="/areasWe"><li>Areas We Focus</li></Link>
            <Link to="/community"><li>Community</li></Link>
            <Link to="/startups"><li>Startups</li></Link>
              <Link to="/news"><li>News</li></Link>
              <Link to="/events"><li>Events</li></Link>
              <Link to="/share-your-story"><li>Share Your Story</li></Link>
          </ul>

          {/* ✅ Added social icons to mobile menu */}
          <div className="flex gap-4 mt-6">
            {socialMediaLinks.map((social, i) => {
              const Icon = social.Icon;
              return (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[35px] h-[35px] md:w-[45px] md:h-[45px] bg-black text-white rounded-full flex items-center justify-center hover:bg-iriseColor transition transform hover:scale-110"
                >
                  <Icon className="text-lg" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
    </>
  );
}

export default Header;
