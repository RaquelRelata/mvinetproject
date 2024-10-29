import { useState,  } from "react";
import { Link } from "react-scroll";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import logo from '../assets/Logo.png';
import { useNavigate } from "react-router-dom"; 



const Nav = () => {
  const [click, setClick] = useState(false);
  const navigate =  useNavigate();

  const handleClick = () => setClick(!click);

  const content = (
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition">
      <ul className="text-center text-xl p-20">
        <Link spy={true} smooth={true} to="Mvinet">
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 rounded">
            MVINET
          </li>
        </Link>

        <Link spy={true} smooth={true} to="Startups">
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 rounded">
            STARTUPS
          </li>
        </Link>

        <Link spy={true} smooth={true} to="Events">
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 rounded">
            EVENTS
          </li>
        </Link>
      </ul>
    </div>
  );

  return (
    <nav className="sticky top-0 bg-white border-b border-gray-300z-50">
      <div className="h-10vh flex justify-between items-center z-50 text-white lg:py-5 px-20 py-4">
        {/* Logo on the left */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </div>

        
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex gap-8 text-[18px]">
            <Link spy={true} smooth={true} to="Mvinet">
              <li className=" text-black hover:text-sky-500 transition border-slate-900 cursor-pointer">
                MVINET
              </li>
            </Link>

            <Link spy={true} smooth={true} to="Startups">
              <li className=" text-black hover:text-sky-500 transition border-slate-900 cursor-pointer">
                STARTUPS
              </li>
            </Link>

            <Link spy={true} smooth={true} to="Events">
              <li className=" text-black hover:text-sky-500 transition border-slate-900 cursor-pointer">
                EVENTS
              </li>
            </Link>
          </ul>
        </div>

        
        <div className="hidden lg:flex gap-4 ml-auto">
          <button
            className="bg-blue-300 text-black px-4 py-2 rounded hover:bg-gray-100 transition"
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>

          <button
            className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition"
            onClick={() => navigate('/Signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Menu */}
        <div>{click && content}</div>

    
        <button className="block lg:hidden transition" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
