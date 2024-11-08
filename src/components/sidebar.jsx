import logo from "../assets/logo.png";

import {
  IoSearch,
  // IoSettingsOutline,
  IoDocumentTextOutline,
  IoExitOutline,
} from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { BsChatLeftDots } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, logout } from "../app/reducers/authSlice";

export default function Sidebar() {
  const [accardionOpen, setAccardionOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const logOutProfile = () => {
    dispatch(logout());
    navigate("/");
  };

  const clickFavorite = () => {
    setAccardionOpen(!accardionOpen);
    dispatch({ type: "resumes/clearSelectedResume" });
  };

  return (
    <div>
      <div className="min-h-screen flex flex-row bg-main-black p-5">
        <div className="flex flex-col w-full max-w-[393px]  bg-[#101010] text-main-white rounded-3xl overflow-hidden">
          <div className="flex items-center justify-center h-20 shadow-md">
            <div className="p-10">
              <Link
                to={"/"}
                onClick={() => {
                  dispatch({ type: "resumes/clearSelectedResume" });
                }}
              >
                <img src={logo} alt="logo" />
              </Link>
            </div>
          </div>
          <ul className="flex flex-col py-4 px-10">
            <li className="">
              {currentUser?.groups?.map((item) => (
                <div className="px-5" key={item.id}>
                  {item.id === 2 && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-700 rounded-full"></div>{" "}
                      <span className="text-green-700">Работодатель</span>
                    </div>
                  )}
                  {item.id === 3 && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-700 rounded-full"></div>{" "}
                      <span className="text-red-700">Соискатель</span>
                    </div>
                  )}
                </div>
              ))}
            </li>
            <li>
              <div
                onClick={clickFavorite}
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 hover:text-main-red cursor-pointer"
              >
                <span className="inline-flex  items-center justify-center h-12 w-12 text-lg">
                  <AiOutlineHeart color="red" />
                </span>
                <span className="text-sm font-medium">Избранное</span>
              </div>

              <div
                className={`px-12 grid overflow-hidden transition-all duration-300 ease-in-out ${
                  accardionOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="flex flex-col overflow-hidden">
                  <Link
                    to={"/profile/favorite-projects"}
                    onClick={() => {
                      dispatch({ type: "resumes/clearSelectedResume" });
                    }}
                  >
                    <span className="text-sm font-medium text-second-color hover:text-main-red">
                      Проекты
                    </span>
                  </Link>
                  {currentUser?.groups?.map((item) => (
                    <Link
                      key={item.id}
                      to={"/profile/favorite-resume"}
                      onClick={() => {
                        dispatch({ type: "resumes/clearSelectedResume" });
                      }}
                    >
                      <span
                        className={`${
                          item.id === 3 ? "hidden" : "block"
                        } text-sm font-medium text-second-color hover:text-main-red`}
                      >
                        Резюме
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <Link
              to={"/profile/search"}
              onClick={() => {
                dispatch({ type: "resumes/clearSelectedResume" });
              }}
            >
              <li className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 hover:text-main-red cursor-pointer">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                  <IoSearch />
                </span>
                <span className="text-sm font-medium">Поиск</span>
              </li>
            </Link>

            {currentUser?.groups?.map((item) => (
              <li
                key={item.id}
                className={`${
                  item.id === 3 ? "hidden" : "flex"
                }  flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 hover:text-main-red cursor-pointer`}
              >
                <Link
                  to={"/profile/projects"}
                  onClick={() => {
                    dispatch({ type: "resumes/clearSelectedResume" });
                  }}
                >
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                      <TiDocumentText />
                    </span>
                    <span className="text-sm font-medium">Проекты</span>
                  </div>
                </Link>
              </li>
            ))}
            <Link
              to={"/profile/account"}
              onClick={() => {
                dispatch({ type: "resumes/clearSelectedResume" });
              }}
            >
              <li className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 hover:text-main-red cursor-pointer">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                  <CgProfile />
                </span>

                <span className="text-sm font-medium">Профиль</span>
              </li>
            </Link>

            {currentUser?.groups?.map((item) => (
              <Link
                key={item.id}
                to={"/profile/resume"}
                onClick={() => {
                  dispatch({ type: "resumes/clearSelectedResume" });
                }}
              >
                <li
                  className={`${
                    item.id === 3 ? "hidden" : "flex"
                  }  flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 hover:text-main-red cursor-pointer`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                    <IoDocumentTextOutline />
                  </span>
                  <span className="text-sm font-medium">Резюме</span>
                </li>
              </Link>
            ))}

            <Link
              to={"/profile/chat"}
              onClick={() => {
                dispatch({ type: "resumes/clearSelectedResume" });
              }}
            >
              <li className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 hover:text-main-red cursor-pointer">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                  <BsChatLeftDots />
                </span>
                <span className="text-sm font-medium">Чат</span>
              </li>
            </Link>
          </ul>

          <div className="px-12 py-20">
            <ul>
              {/* <li className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 hover:text-main-red cursor-pointer">
                <Link to={"/profile/settings"}>
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                    <IoSettingsOutline />
                  </span>
                  <span className="text-sm font-medium">Настройки</span>
                </Link>
              </li> */}

              <li
                onClick={logOutProfile}
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 hover:text-main-red cursor-pointer"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                  <IoExitOutline color="red" />
                </span>
                <span className="text-sm font-medium text-main-red">Выход</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
