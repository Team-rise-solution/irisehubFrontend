// import IntroAboutImage from "../../Images/About-Images/IntroAbout.jpg"
import IntroAboutImage from "../../Images/About-Images/iRiseHup Bg.jpg"
function Introduction (){
    return <div className="">
        <div className="lg:w-full  md:h-[500px] h-[400px] relative lg:rounded-b-[50px] overflow-hidden">
            <img className="w-full h-full object-cover" src={IntroAboutImage} alt="" />
            <div className="w-full h-full absolute top-0 text-white bg-black/80 px-[30px] ">
                <h1 className="md:text-[25px] lg:w-[750px] mt-10 lg:mt-30 "> iRise Hub has over 8 years of experience empowering youth, women, and marginalized communities across Somalia. We’ve managed a $10M fund, provided $720K in grants, and supported startups through programs that drive economic resilience, innovation, and long-term empowerment.</h1>
                <p className="md:w-[700px] mt-5 md:text-[25px] lg:absolute right-10 md:bottom-10 lg:text-[20px]"> Based in Mogadishu with offices across key regions, iRise Hub is a home-grown, entrepreneur-led ecosystem. We work closely with the private sector, multilateral agencies, and government to foster a stable, resilient, and equitable Somalia.</p>
            </div>
        </div>
    </div>
}
export default Introduction