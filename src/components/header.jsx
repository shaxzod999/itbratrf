import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { BiMenuAltRight } from "react-icons/bi";
import { RiCloseLargeLine } from "react-icons/ri";
import { useState, useEffect } from "react";

export default function Header() {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const handleLinkClick = () => {
    setClick(false); // Close the navbar when a link is clicked
  };

  useEffect(() => {
    const handleScroll = () => {
      if (click && window.scrollY > 10) {
        setClick(false); // Close navbar on scroll down
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [click]);

  const content = (
    <div
      className={`absolute left-0 right-0 z-50 w-full h-screen transition-transform transform ${
        click ? "translate-y-0" : "-translate-y-full"
      } md:hidden top-24 bg-main-black`}
    >
      <ul className="p-20 text-xl text-center text-main-white">
        <li className="py-4 my-4 cursor-pointer hover:text-main-red">
          <a href="#home" onClick={handleLinkClick}>
            ГЛАВНАЯ
          </a>
        </li>
        <li className="py-4 my-4 cursor-pointer hover:text-main-red">
          <a href="#about" onClick={handleLinkClick}>
            О НАС
          </a>
        </li>
        <li className="py-4 my-4 cursor-pointer hover:text-main-red">
          <a href="#contacts" onClick={handleLinkClick}>
            КОНТАКТЫ
          </a>
        </li>
        <li className="py-4 my-4 cursor-pointer hover:text-main-red">
          <a href="#faq" onClick={handleLinkClick}>
            FAQ
          </a>
        </li>
        <li className="flex items-center justify-center gap-2 py-4 my-4">
          <Link to="/sign-in" onClick={handleLinkClick}>
            <span className="cursor-pointer hover:text-main-red">Вход</span>
          </Link>
          <div className="w-1 h-5 bg-main-red"></div>
          <Link to="/sign-up" onClick={handleLinkClick}>
            <span className="cursor-pointer hover:text-main-red">
              Регистрация
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="w-full h-[130px] flex justify-center items-start p-1 bg-main-black fixed z-50">
      <div className="w-full max-w-[1196px] p-10 flex justify-between items-center">
        <div className="md:w-[196px] w-[98px] h-[32px]">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div>
          <ul className="md:flex gap-[60px] text-main-white lg:text-base text-xs hidden">
            <li className="cursor-pointer hover:text-main-red">
              <a href="#home">ГЛАВНАЯ</a>
            </li>
            <li className="cursor-pointer hover:text-main-red">
              <a href="#about">О НАС</a>
            </li>
            <li className="cursor-pointer hover:text-main-red">
              <a href="#contacts">КОНТАКТЫ</a>
            </li>
            <li className="cursor-pointer hover:text-main-red">
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        </div>
        <div className="md:flex gap-[10px] items-center text-main-white hidden">
          <Link to="/sign-in">
            <span className="cursor-pointer hover:text-main-red">Вход</span>
          </Link>
          <div className="w-[1px] h-[20px] bg-main-red"></div>
          <Link to="/sign-up">
            <span className="cursor-pointer hover:text-main-red">
              Регистрация
            </span>
          </Link>
        </div>
      </div>

      <div>{click && content}</div>
      <button className="block mt-8 transition md:hidden" onClick={handleClick}>
        {click ? (
          <RiCloseLargeLine color="white" size={30} />
        ) : (
          <BiMenuAltRight color="white" size={30} />
        )}
      </button>
    </div>
  );
}
