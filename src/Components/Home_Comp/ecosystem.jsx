import RiseAcademy from "../../Images/About-Images/Rise Academy.png";
import Minbar from "../../Images/About-Images/Minbar.png";
import MogadishuTech from "../../Images/About-Images/Mogadishu Tech Summit.png";
import { HiArrowSmRight } from "react-icons/hi";
import { Link } from "react-router-dom";

function Ecosystem() {
  const ecosystemItems = [
    {
      Name: "Rise Academy",
      Desc: "A specialized learning hub focused on coding and programming, empowering youth with digital skills for the future of work.",
      Image: RiseAcademy,
      Link: "/ecosystem/rise-academy"
    },
    {
      Name: "Minbar",
      Desc: "A media and knowledge-sharing platform where news, updates, speeches, and thought pieces from politicians, government leaders, and experts are shared to inform and engage the ecosystem.",
      Image: Minbar,
      Link: "#"
    },
    {
      Name: "Mogadishu Tech Summit",
      Desc: "Somalia's largest technology and innovation event, connecting entrepreneurs, investors, and policymakers.",
      Image: MogadishuTech,
      Link: "#"
    }
  ];

  return (
    <div className="w-full py-16 md:py-24 px-5 md:px-10 lg:px-20 bg-gradient-to-b from-white to-gray-50">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-16">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Our Ecosystem
          </h2>
          <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-gray-400 skew-[-20deg]"></div>
        </div>
        <p className="text-base md:text-lg text-gray-600 max-w-3xl mt-4">
          Discover the key components of our ecosystem that drive innovation, learning, and growth in Somalia's tech landscape.
        </p>
      </div>

      {/* Ecosystem Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {ecosystemItems.map((item, index) => (
          <Link
            key={index}
            to={item.Link}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          >
            {/* Image Container */}
            <div className="relative h-64 md:h-72 overflow-hidden bg-white">
              <div className="w-full h-full flex items-center justify-center p-8">
                <img
                  src={item.Image}
                  alt={item.Name}
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-iriseColor/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center">
                <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <HiArrowSmRight className="text-5xl mx-auto" />
                  <p className="mt-2 font-semibold">Learn More</p>
                </div>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-iriseColor transition-colors duration-300">
                {item.Name}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3">
                {item.Desc}
              </p>
              
              {/* Arrow Indicator */}
              <div className="mt-4 flex items-center text-iriseColor opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                <span className="text-sm font-semibold mr-2">Explore</span>
                <HiArrowSmRight className="text-xl" />
              </div>
            </div>

            {/* Decorative Border */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-iriseColor group-hover:w-full transition-all duration-500"></div>
          </Link>
        ))}
      </div>

      {/* View All CTA Button */}
      <div className="max-w-7xl mx-auto mt-12 md:mt-16 flex justify-center">
        <Link
          to="/ecosystem"
          className="group inline-flex items-center gap-2 px-8 py-4 bg-iriseColor text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span>View All</span>
          <HiArrowSmRight className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}

export default Ecosystem;