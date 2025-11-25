import Image1 from "../../Images/HomeComp-Images/img-4.jpg";

function SectionTop() {
  return (
    <div className="mt-20 mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 max-w-2xl">
        The Growth Story
      </h1>

      {/* Image */}
      <div className="w-full lg:w-[700px] md:w-[600px] rounded-xl mt-8 overflow-hidden shadow-md">
        <img
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          src={Image1}
          alt="Growth Story"
        />
      </div>

      {/* Description */}
      <div className="mt-12 max-w-3xl">
        <h2 className="text-xl md:text-2xl lg:text-3xl leading-snug font-bold text-gray-800">
          Some of the Startups Incubated
        </h2>
        <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
          Every startup has a story to tell. These are the businesses that grew
          with us — turning bold ideas into real opportunities, creating
          meaningful jobs, and driving innovation that empowers communities and
          inspires the future.
        </p>
      </div>
    </div>
  );
}

export default SectionTop;
