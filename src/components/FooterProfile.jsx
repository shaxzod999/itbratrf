import logo from "../assets/logo.png";

import { BiLogoTelegram } from "react-icons/bi";
import { SlSocialVkontakte } from "react-icons/sl";
import { PiInstagramLogoFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

export default function FooterProfile() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[1196px] flex flex-col-reverse items-center gap-[77px]  justify-between md:flex-row  md:mt-[200px] mt-10 pb-12">
        <div className="flex items-center justify-between w-full md:w-1/2">
          <div>
            <ul className="flex flex-col gap-2 p-5 text-[clamp(8px,3vw,14px)]">
              <li className="text-main-white">
                <h3>МЕНЮ</h3>
              </li>
              <li
                onClick={() => navigate("/")}
                className="text-second-color hover:text-main-red"
              >
                <a href="#home">Главная</a>
              </li>
              <li className="text-second-color hover:text-main-red">
                <a href="#about">О нас</a>
              </li>
              <li className="text-second-color hover:text-main-red">
                <a href="#contacts">Контакты</a>
              </li>
              <li className="text-second-color hover:text-main-red">
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-col gap-2 p-5 text-[clamp(8px,3vw,14px)]">
              <li className="text-main-white">
                <h3>О ПРОЕКТЕ</h3>
              </li>
              <li className="text-second-color hover:text-main-red">
                <a href="/user-agreement">Пользовательское соглашение</a>
              </li>
              <li className="text-second-color hover:text-main-red">
                <a href="/rules-of-the-site">Правила</a>
              </li>
              <li className="text-second-color hover:text-main-red">Помощь</li>
              <li
                onClick={() => navigate("/")}
                className="text-second-color hover:text-main-red"
              >
                <a href="#services">Услуги</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-[90%] md:w-[20%] flex justify-start">
          <ul className="flex flex-col items-start text-[clamp(8px,3vw,14px)]">
            <li className="md:w-[196px] w-[98px] md:h-[32px] h-[16px]">
              <Link to={"/"}>
                <img
                  onClick={() => window.scrollTo(0, 0)}
                  src={logo}
                  alt="logo"
                />
              </Link>
            </li>
            <li className="text-second-color mt-[29px]">
              Следи за нами в соц. сетях:
            </li>
            <li className="flex gap-6 mt-[12px]">
              <BiLogoTelegram size={30} color="white" />
              <SlSocialVkontakte
                size={30}
                color="white"
                style={{ fill: "white" }}
              />
              <PiInstagramLogoFill size={30} color="white" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
