import React from "react";
import Navigation from "../components/mainCompo/Navigation";
import Footer from "../components/mainCompo/Footer";
import AboutHero from "../components/AboutHero";
import Timeline from "../components/Timeline";
import TeamSection from "../components/TeamSection";
import PartnersPress from "../components/PartnersPress";
import { useDarkMode } from "../contexts/DarkModeContext";

const About: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [scrollY, setScrollY] = React.useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const timelineEvents = [
    {
      year: "2020",
      title: "Born from Climate Hackathon",
      description:
        "Founded by a passionate team of environmental engineers and developers during a 48-hour climate hackathon.",
    },
    {
      year: "2022",
      title: "Beta Launch",
      description:
        "Released our beta version with core features for carbon footprint tracking and personalized recommendations.",
    },
    {
      year: "2023",
      title: "50,000 Users Milestone",
      description:
        "Reached 50,000 active users and prevented over 100,000 tons of CO2 emissions collectively.",
    },
  ];

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-founder",
      avatar: "/images/team/sarah.jpg",
      funFact: "Plants a tree every time we hit a milestone!",
      linkedIn: "https://linkedin.com/in/sarahchen",
    },
    {
      name: "Alex Rivera",
      role: "CTO & Co-founder",
      avatar: "/images/team/alex.jpg",
      funFact: "Bikes 20 miles to work every day!",
      linkedIn: "https://linkedin.com/in/alexrivera",
    },
    {
      name: "Emma Wilson",
      role: "Head of Sustainability",
      avatar: "/images/team/emma.jpg",
      funFact: "Maintains a zero-waste lifestyle since 2019!",
      linkedIn: "https://linkedin.com/in/emmawilson",
    },
  ];

  const partners = [
    {
      name: "Green Energy Co",
      logo: "/images/partners/green-energy.png",
      link: "https://green-energy.com",
    },
    {
      name: "EcoTech Solutions",
      logo: "/images/partners/ecotech.png",
      link: "https://ecotech.com",
    },
    {
      name: "Sustainable Future",
      logo: "/images/partners/sustainable.png",
      link: "https://sustainable.com",
    },
    {
      name: "Climate Action Now",
      logo: "/images/partners/climate-action.png",
      link: "https://climate-action.org",
    },
  ];

  const pressFeatures = [
    {
      name: "TechCrunch",
      logo: "/images/press/techcrunch.png",
      link: "https://techcrunch.com",
      quote:
        "GreenFootprint is revolutionizing how we track and reduce our carbon footprint.",
    },
    {
      name: "National Geographic",
      logo: "/images/press/natgeo.png",
      link: "https://nationalgeographic.com",
      quote:
        "A game-changing app that makes climate action accessible to everyone.",
    },
    {
      name: "The Guardian",
      logo: "/images/press/guardian.png",
      link: "https://theguardian.com",
      quote: "Setting new standards for environmental impact tracking.",
    },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ): void => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Navigation
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        handleLinkClick={handleLinkClick}
      />

      <AboutHero isDarkMode={isDarkMode} />

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Our Journey
            </h2>
            <p
              className={`max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              From a hackathon project to a global movement for climate action
            </p>
          </div>

          <Timeline events={timelineEvents} isDarkMode={isDarkMode} />
        </div>
      </div>

      <TeamSection members={teamMembers} isDarkMode={isDarkMode} />

      <PartnersPress
        partners={partners}
        pressFeatures={pressFeatures}
        isDarkMode={isDarkMode}
      />

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default About;
