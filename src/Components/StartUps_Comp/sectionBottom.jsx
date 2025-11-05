import { HiArrowSmRight } from "react-icons/hi";
import { Link } from "react-router-dom";

import Beersamo from "../../Images/StartUps-Images/Beersamo.png";
import BulshoBile from "../../Images/StartUps-Images/Bulso Bille.png";
import Daldhis from "../../Images/StartUps-Images/Daldhis.png";
import DoogDoon from "../../Images/StartUps-Images/Doogdoon.png";
import Hubaal from "../../Images/StartUps-Images/Hubaal.png";
import Hiigsi from "../../Images/StartUps-Images/Higsi.png";
import DanKeyd from "../../Images/StartUps-Images/Dankeyd.png";
import Kulmis from "../../Images/StartUps-Images/Kulmis.png";

function SectionBottom() {
  const StartUpsInfo = [
    {
  Image: Hubaal,
  Title: "Hubaal",
  Desc: "Hubaal is a creative event planning and decoration company that brings dreams to life through elegant design, detailed coordination, and professional service. From weddings and engagement parties to birthdays and corporate events, Hubaal provides full event management solutions that reflect the client’s unique personality and vision. The team focuses on quality, creativity, and customer satisfaction, turning every celebration into a memorable and beautiful experience."
},
{
  Image: Daldhis,
  Title: "Daldhis",
  Desc: "Daldhis is a fast-growing construction enterprise that manufactures durable, high-quality bricks designed for modern, safe, and sustainable development projects. The company’s mission is to provide affordable building materials that meet industry standards while promoting environmentally friendly practices. By supporting both large-scale infrastructure and community housing projects, Daldhis contributes to Somalia’s ongoing reconstruction and urban growth, helping build a stronger, more resilient future."
},
{
  Image: Hiigsi,
  Title: "Hiigsi",
  Desc: "Hiigsi is a dynamic initiative that focuses on empowering Somali youth to unlock their entrepreneurial potential and contribute meaningfully to economic development. It offers mentorship, business incubation, and skill development programs that nurture creativity and innovation. Hiigsi inspires young people to take bold steps in launching startups, solving community challenges, and driving progress across sectors — fostering a new generation of visionary entrepreneurs in Somalia."
},
{
  Image: DanKeyd,
  Title: "Dankeyd",
  Desc: "Dankeyd is an event management and decoration company dedicated to crafting unforgettable experiences for weddings, birthdays, and other special celebrations. The company combines creativity, elegance, and modern design trends to create stunning venues and smooth event coordination. With a commitment to excellence and client satisfaction, Dankeyd ensures that every event is planned to perfection, delivering joy, style, and meaningful memories for all attendees."
},
{
  Image: Kulmis,
  Title: "Kulmis",
  Desc: "Kulmis is a construction company that specializes in producing durable, eco-friendly building bricks that support modern infrastructure development and safe housing projects. Through innovative production methods and a focus on quality control, Kulmis aims to reduce construction costs while improving safety and sustainability standards. The company plays a vital role in strengthening Somalia’s construction sector, contributing to community development and long-term growth."
},
{
  Image: BulshoBile,
  Title: "Bulsho Bile",
  Desc: "Bulsho Bile is a youth-driven entrepreneurship platform dedicated to empowering Somali innovators to create impactful businesses. It provides training, mentorship, and startup support to transform ideas into sustainable ventures that generate jobs and economic opportunities. With a focus on community development and innovation, Bulsho Bile promotes collaboration among young entrepreneurs, encouraging them to shape Somalia’s future through creativity, leadership, and technology."
},
{
  Image: Beersamo,
  Title: "Beersamo",
  Desc: "Beersamo is an agricultural enterprise committed to improving food security and promoting sustainable farming practices across Somalia. The company develops innovative solutions in crop production, irrigation, and agricultural technology to help farmers increase yields and adapt to climate challenges. By empowering rural communities with modern techniques and practical knowledge, Beersamo works toward building a resilient agricultural economy that ensures food sustainability for generations to come."
}

  ];

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 py-12">
      {StartUpsInfo.map((data, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mt-16"
        >
          {/* Image */}
          <div className="w-full md:w-[250px] h-[200px] rounded-xl shadow-md overflow-hidden">
            <img
              className="w-full h-full object-cover transition duration-500 hover:scale-110"
              src={data.Image}
              alt={data.Title}
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:flex-1">
            <h1 className="text-2xl md:text-3xl font-semibold">{data.Title}</h1>
            <hr className="border-gray-300 my-4" />
            {/* <h2 className="text-lg md:text-xl text-gray-700 mb-4"> {data.Category} </h2> */}
            <p className="text-gray-600 leading-relaxed">{data.Desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SectionBottom;
