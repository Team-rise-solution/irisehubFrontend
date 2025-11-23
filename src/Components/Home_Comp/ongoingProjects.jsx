import { HiArrowSmRight } from "react-icons/hi";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

function OngoingProjects() {
  // Sample projects - you can replace these with actual project data
  const projects = [
    {
      Title: "Digital Skills Training Program",
      Desc: "An intensive 6-month program designed to equip young professionals with cutting-edge digital skills including web development, data analytics, and digital marketing. This initiative aims to bridge the skills gap and create employment opportunities in the tech sector.",
      Image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      Status: "Coming Soon",
      LaunchDate: "Q2 2024"
    },
    {
      Title: "Women Entrepreneurship Hub",
      Desc: "A dedicated space and program supporting women entrepreneurs with mentorship, funding opportunities, and networking events. This hub will provide resources and tools to help women-led businesses scale and succeed in the market.",
      Image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      Status: "In Planning",
      LaunchDate: "Q3 2024"
    },
    {
      Title: "Green Tech Innovation Lab",
      Desc: "A state-of-the-art innovation lab focused on sustainable technology solutions for climate resilience. This project will support startups working on renewable energy, waste management, and environmental conservation technologies.",
      Image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop",
      Status: "Coming Soon",
      LaunchDate: "Q4 2024"
    }
  ];

  return (
    <div className="w-full py-20 md:py-28 px-5 md:px-10 lg:px-20 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-iriseColor/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Ongoing Projects
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mt-6">
            Explore our upcoming initiatives that will shape the future of innovation and entrepreneurship in Somalia.
          </p>
        </div>

        {/* Projects List - Alternating Layout */}
        <div className="space-y-12 md:space-y-20">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`group flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8 md:gap-12`}
              >
                {/* Image Section */}
                <div className="w-full md:w-1/2 relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <FaClock className="text-iriseColor text-sm" />
                      <span className="text-sm font-semibold text-gray-800">{project.Status}</span>
                    </div>
                    
                    {/* Image Container with Diagonal Accent */}
                    <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                      <img
                        src={project.Image}
                        alt={project.Title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Diagonal Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-iriseColor/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Decorative Corner */}
                      <div className={`absolute ${
                        isEven ? "top-0 right-0" : "top-0 left-0"
                      } w-32 h-32 bg-iriseColor/10 -translate-y-16 ${
                        isEven ? "translate-x-16 rotate-45" : "-translate-x-16 -rotate-45"
                      } transition-transform duration-500 group-hover:scale-150`}></div>
                    </div>
                    
                    {/* Bottom Accent Line */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-iriseColor via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="space-y-4">
                    {/* Launch Date Badge */}
                    <div className="inline-flex items-center gap-2 bg-iriseColor/10 text-iriseColor px-4 py-2 rounded-full w-fit">
                      <span className="text-xs font-semibold">Launch: {project.LaunchDate}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 group-hover:text-iriseColor transition-colors duration-300">
                      {project.Title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                      {project.Desc}
                    </p>

                    {/* Learn More Link */}
                    <div className="pt-4">
                      <Link
                        to="#"
                        className="inline-flex items-center gap-2 text-iriseColor font-semibold group/link hover:gap-4 transition-all duration-300"
                      >
                        <span>Learn More</span>
                        <HiArrowSmRight className="text-xl transform group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-16">
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 bg-iriseColor text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <span>View All Projects</span>
            <HiArrowSmRight className="text-xl transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OngoingProjects;

