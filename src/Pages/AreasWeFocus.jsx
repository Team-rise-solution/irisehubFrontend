import React, { useEffect, useRef } from 'react'
import { HiArrowSmRight } from "react-icons/hi";
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Home_Comp/Header';
import PublicHeroSection from '../Components/PublicHeroSection';
import Intro from '../Components/Areas_We_Focus_Comp/Intro';
import AreasSection from '../Components/Areas_We_Focus_Comp/AreasSection';
import BottomPage from '../Components/Home_Comp/BottomPage';

function AreasWeFocus() {
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Handle text animations
          if (entry.target.classList.contains('animate-on-scroll') && !entry.target.classList.contains('image-container')) {
            entry.target.classList.add('animate-in');
          }
          
          // Handle image overlay animation
          if (entry.target.classList.contains('image-container')) {
            const overlay = entry.target.querySelector('.image-overlay');
            if (overlay) {
              overlay.classList.add('overlay-animate');
            }
          }
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }
        
        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Special handling for image containers */
        .image-container.animate-on-scroll {
          opacity: 1;
          transform: none;
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: black;
          transform: translateX(0);
          transition: transform 1.2s ease-out;
          z-index: 10;
        }
        
        .image-overlay.overlay-animate {
          transform: translateX(-100%);
        }
      `}</style>
        <PublicHeroSection />
        {/* <Intro /> */}
        <AreasSection />
        <Footer />
        {/* <BottomPage /> */}
    </div>
  )
}

export default AreasWeFocus


// # 🌍 Our Areas of Focus

// ## 1. **Innovation & Digital Economy**

// We believe technology and innovation are powerful drivers of economic growth and social change. Our focus is on creating an enabling environment for digital transformation and supporting innovators to solve local challenges.

// * Incubating and accelerating tech-based startups.
// * Promoting access to digital platforms, tools, and services.
// * Strengthening Somalia’s digital economy through ICT and fintech.
// * Creating pathways for young innovators to launch scalable solutions.
// * Building partnerships with government, private sector, and global tech ecosystems.

// ---

// ## 2. **Agritech and Agribusiness**

// Agriculture is the backbone of Somalia’s economy, and we are committed to modernizing it through technology and entrepreneurship.

// * Supporting farmers with climate-smart solutions like drip irrigation and greenhouses.
// * Introducing affordable agricultural technologies for smallholder farmers.
// * Facilitating agro-processing industries to create value-added products.
// * Providing training in sustainable farming and agribusiness practices.
// * Strengthening food systems and improving food security at community level.

// ---

// ## 3. **Learning & Coding**

// We empower youth and women with practical skills to thrive in the digital era. Our learning programs are designed to be hands-on, engaging, and aligned with the needs of the market.

// * Coding bootcamps that teach web, mobile, and software development.
// * Training in digital literacy, ICT, and emerging technologies.
// * Mentorship programs to guide learners into tech careers.
// * Partnerships with universities and global tech organizations for curriculum development.
// * Providing inclusive opportunities for women and marginalized groups in tech.

// ---

// ## 4. **Economic Resilience**

// We focus on strengthening communities and businesses so they can withstand challenges and build long-term prosperity.

// * Business incubation and acceleration programs (like **Kobciye**).
// * Tailored support for SMEs and women-led enterprises to grow.
// * Access to finance through grants, investors, and development agencies.
// * Building strong market linkages for startups and entrepreneurs.
// * Enhancing business competitiveness through training and mentoring.
// * Promoting inclusive economic participation across all regions.

// ---

// ## 5. **Governance and Civic Engagement**

// Strong governance and active citizen participation are vital for a peaceful and inclusive society. We foster civic spaces where citizens and leaders can engage openly and constructively.

// * Promoting transparency, accountability, and democratic participation.
// * Encouraging youth and women to take leadership roles.
// * Organizing civic forums and platforms for dialogue between government and citizens.
// * Supporting community-driven initiatives for better service delivery.
// * Empowering marginalized groups to have a voice in decision-making.

// ---

// ## 6. **Climate Resilience**

// We address the urgent need to adapt to climate change while promoting sustainable development and green growth.

// * Introducing renewable energy and low-carbon solutions.
// * Promoting sustainable farming practices to cope with droughts and floods.
// * Facilitating access to climate finance for local businesses and communities.
// * Building awareness on climate adaptation and environmental protection.
// * Supporting green entrepreneurship and eco-friendly startups.
// * Strengthening ecosystems and community livelihoods against climate shocks.

