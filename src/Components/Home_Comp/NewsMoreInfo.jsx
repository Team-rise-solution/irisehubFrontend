import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { FaLinkedinIn, FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { useEffect, useState } from "react";
import { newsAPI } from "../../services/api";

function NewsMoreInfo({ data, onClose }) {
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    if (data?._id) {
      newsAPI.getById(data._id)
        .then((res) => setEventData(res.data.data))
        .catch((err) => console.error("Error fetching single event:", err));
    }
  }, [data]);

  if (!eventData) return null;

  return (
    <div className="w-[80%] bg-black h-full overflow-hidden absolute px-10 right-0">
      <div className="overflow-y-auto px-[30px] w-full pb-[100px] h-full">
        {/* Top Head */}
        <div className="w-full flex justify-between items-center mt-5">
          <div className="flex gap-10">
            <div className="w-[30px] h-[30px] flex items-center justify-center bg-gray-400 hover:bg-white rounded-full group transition-all">
              <FaArrowLeftLong className="text-[17px]" />
            </div>
            <div className="w-[30px] h-[30px] flex items-center justify-center bg-gray-400 hover:bg-white rounded-full group transition-all">
              <FaArrowRightLong className="text-[17px]" />
            </div>
          </div>
          <div
            onClick={onClose}
            className="w-[30px] h-[30px] flex items-center justify-center bg-gray-400 hover:bg-white rounded-full group transition-all cursor-pointer"
          >
            <AiOutlineClose className="text-[17px]" />
          </div>
        </div>

        {/* Bottom Head */}
        <div className="flex justify-between items-center mt-10 border-b border-b-gray-200 pb-5">
          <div className="flex gap-3 items-center">
            <button className="px-8 py-[4px] text-[14px] bg-white rounded-full">
              {eventData.type}
            </button>
            <div className="flex gap-1">
              <MdDateRange className="text-white text-[19px]" />
              <span className="text-[14px] text-white">{eventData.eventDate ? new Date(eventData.eventDate).toLocaleDateString() : new Date(eventData.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="md:hidden lg:flex gap-5 items-center">
            <div className="w-[30px] h-[30px] flex items-center justify-center bg-gray-400 hover:bg-white rounded-full group">
              <FaLinkedinIn className="text-[17px]" />
            </div>
            <div className="w-[30px] h-[30px] flex items-center justify-center bg-gray-400 hover:bg-white rounded-full group">
              <FaXTwitter className="text-[17px]" />
            </div>
            <div className="w-[30px] h-[30px] flex items-center justify-center bg-gray-400 hover:bg-white rounded-full group">
              <IoLogoInstagram className="text-[17px]" />
            </div>
            <div className="w-[30px] h-[30px] flex items-center justify-center bg-gray-400 hover:bg-white rounded-full group">
              <FaFacebookF className="text-[17px]" />
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div>
          <h1 className="text-white text-[45px] leading-[55px] mt-12 font-semibold">
            {eventData.title}
          </h1>
          {eventData.image && (
            <div className="w-full bg-gray-100 overflow-hidden mt-10" style={{ height: '500px' }}>
              <img
                className="w-full h-full object-cover"
                src={eventData.image}
                alt={eventData.title}
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
            </div>
          )}
          <div className="px-[50px] mt-10">
            <p className="text-white text-[18px]">
              {eventData.content}
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default NewsMoreInfo;
