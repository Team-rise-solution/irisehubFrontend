import organizationalChartImg from "../../Images/About-Images/organizationalChart.png";

function OrganizationalChart() {
  return (
    <div className="w-full mt-20 md:mt-32 px-5 md:px-10 lg:px-20 py-10 md:py-16">
      {/* Title Section */}
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-[28px] md:text-[35px] lg:text-[42px] font-bold text-gray-900 mb-3">
          iRiseHub Organization Chart
        </h1>
        <div className="w-20 h-1 bg-[#F24405] mx-auto rounded-full"></div>
      </div>

      {/* Chart Image Container */}
      <div className="w-full flex justify-center items-center">
        <div className="relative w-full max-w-6xl group">
          {/* Shadow/Glow Effect Container */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F24405]/20 via-transparent to-[#F24405]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Image Container */}
          <div className="relative bg-white rounded-2xl shadow-lg md:shadow-2xl overflow-hidden border border-gray-100 p-4 md:p-6 lg:p-8 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
            <img
              className="w-full h-auto object-contain rounded-lg"
              src={organizationalChartImg}
              alt="iRiseHub Organization Chart"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationalChart;