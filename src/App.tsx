import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Twitter, Facebook, Youtube, Instagram } from 'lucide-react';

// NavItem component for regular nav items
const NavItem = ({ title, href = "#" }) => {
  return (
    <a href={href} className="text-white hover:underline hover:text-gray-200 px-4 py-2">
      {title}
    </a>
  );
};

// DropdownNavItem component for items with dropdown menus
const DropdownNavItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button 
        className="flex items-center text-white hover:underline hover:text-gray-200 px-4 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute mt-1 w-56 bg-white rounded-md shadow-lg z-10">
          <div className="py-2">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};


const DropdownItem = ({ title, href = "#", icon }) => {
  return (
    <a 
      href={href} 
      className="flex items-center hover:underline px-4 py-3 text-gray-700 hover:bg-gray-100"
    >
      {title}
      {icon && <span className="ml-2">{icon}</span>}
    </a>
  );
};

// Social media icon component
const SocialIcon = ({ Icon, href = "#" }) => {
  return (
    <a href={href} className="text-white hover:text-gray-200 mx-2">
      <Icon className="h-5 w-5" />
    </a>
  );
};

// Main Navbar component
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 
      ${scrolled ? 'bg-[#5a3b8b] shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <div className='h-12 w-auto'>
                <img src='/Pi-Network.png' alt='App Logos' className='contain-size'/>
              </div>
            </a>
          </div>
          
          {/* Navigation Items */}
          <div className="hidden md:flex items-center">
            <DropdownNavItem title="Pi Blockchain">
              <DropdownItem title="Pi Node" />
              <DropdownItem title="Pi BlockExplorer" icon="↗" />
              <DropdownItem title="Pi Whitepaper" />
            </DropdownNavItem>
            
            <DropdownNavItem title="Developers">
              <DropdownItem title="Documentation" />
              <DropdownItem title="API Reference" />
              <DropdownItem title="SDK" />
            </DropdownNavItem>
            
            <NavItem title="About Us" />
            <NavItem title="Blog" />
            <NavItem title="Support" />
          </div>
          
          {/* Social Icons and Search */}
          <div className="flex items-center">
            <div className="hidden md:flex">
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Youtube} />
              <SocialIcon Icon={Instagram} />
            </div>
            
            <button className="ml-4 text-white">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function App () {
    return (
        <div className='w-full bg-[#261339] h-[200vh]'>
            <Navbar />
        </div>
    )
}