import { useDispatch, useSelector } from "react-redux";

import { GrLinkNext, GrFormPreviousLink } from "react-icons/gr";
import { useEffect, useState } from "react";
import {
  getAllResume,
  getResumeById,
  resumeDeleteLike,
  resumePostLike,
  searchAllResume,
} from "../app/reducers/resumeSlice";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

export default function Rezume() {
  const dispatch = useDispatch();
  const { allResume, selectedResume } = useSelector((state) => state.resumes);
  const [statuslike, setStatuslike] = useState(false);
  const [isSelectedResume, setIsSelectedResume] = useState(false);
  const hard_skills = selectedResume?.hard_skills?.[0];
  const text = hard_skills ? hard_skills.split(",") : [];

  useEffect(() => {
    dispatch(getAllResume());

     return () => {
      setIsSelectedResume(false);
      dispatch({ type: "resumes/clearSelectedResume" });
    };
  }, [statuslike]);

  const handleLikeClick = async (id) => {
    await dispatch(resumePostLike(id));
    setStatuslike(!statuslike);
  };

  const handleDeleteLike = async (id) => {
    await dispatch(resumeDeleteLike(id));
    setStatuslike(!statuslike);
  };
  const handleGetResume = async (id) => {
    await dispatch(getResumeById(id));
    setIsSelectedResume(!isSelectedResume);
  };

  const handleBackToList = () => {
    setIsSelectedResume(false);
    dispatch({ type: "resumes/clearSelectedResume" });
  };
  const [iconSize, setIconSize] = useState(40);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIconSize(30); // Kichik ekranlar uchun o'lcham
      } else {
        setIconSize(40); // Katta ekranlar uchun o'lcham
      }
    };

    // Boshida bir marta chaqiramiz
    handleResize();

    // Resize event uchun listener qo'shamiz
    window.addEventListener("resize", handleResize);

    // Component o'chirilganda listenerni olib tashlaymiz
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // console.log(selectedResume);
  // console.log(allResume);

  return (
    <div className="px-0 md:px-5 md:mt-[-20px]  mt-[-80px]">
      <div className="">
        <div className="p-1 relative">
          <IoSearch color="white" className="absolute top-12 left-12" />
          <input
            className="w-[85%] m-8 p-2 px-10 rounded-xl bg-[#101010] text-main-white"
            type="text"
            placeholder="Поиск"
            onChange={(e) => dispatch(searchAllResume(e.target.value))}
          />
        </div>
        <h1 className="text-main-white text-[clamp(20px,3vw,24px)] font-semibold px-3">
          Резюме
        </h1>

        {isSelectedResume ? (
          <div className="w-full relative min-h-[233px] bg-[#8D8D8D] rounded-lg p-5">
            <GrFormPreviousLink
              onClick={handleBackToList}
              className="absolute top-0 left-0 hover:text-main-red hover:scale-110 cursor-pointer"
              size={30}
            />
            {selectedResume ? (
              <div>
                <div className="w-full flex flex-col xl:flex-row xl:gap-[80px] gap-[10px]">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-[85px] h-[85px] border-4 border-[#680202] rounded-full">
                      <img
                        className="w-[75px] h-[75px] rounded-full object-cover"
                        src={selectedResume?.image}
                        alt="profile"
                      />
                    </div>
                    <div>
                      <h2 className="text-[#5B0303] text-[clamp(16px,3vw,24px)] font-semibold">
                        {selectedResume?.owner.first_name}
                      </h2>
                      <span className="text-main-black text-[clamp(12px,3vw,20px)] font-semibold">
                        {selectedResume?.heading.name}
                      </span>
                    </div>
                  </div>
                  <div>
                    <ul>
                      <li>
                        <span className="text-main-black text-[clamp(13px,3vw,20px)] font-semibold">
                          Контактная информация: {selectedResume?.contact}
                        </span>
                      </li>
                      <li>
                        <span className="text-main-black text-[clamp(13px,3vw,20px)] font-semibold">
                          Опыт работы: {selectedResume?.experience} лет
                        </span>
                      </li>
                      <li>
                        <span className="text-main-black text-[clamp(13px,3vw,20px)] font-semibold">
                          Личные данные: {selectedResume?.description}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-full flex xl:flex-row flex-col justify-between ">
                  <div>
                    <h1 className="text-main-black text-[clamp(16px,3vw,24px)] font-bold">
                      Навыки
                    </h1>
                    <span className="text-main-black text-[clamp(14px,3vw,16px)] font-light">
                      Hard skills
                      <div className="grid  grid-cols-2 gap-2 text-center">
                        {text.map((item, idx) => (
                          <div
                            key={idx}
                            className={`${idx % 2 === 0 && "bg-main-black"} ${
                              idx % 2 === 1 && "bg-[#4A2020]"
                            } p-1 px-3 rounded-xl font-semibold`}
                          >
                            <span className="text-main-white">{item}</span>
                          </div>
                        ))}
                      </div>
                    </span>
                  </div>
                  <div className="w-[63%] flex justify-start mt-6 md:mt-10">
                    <span className="text-main-black text-[clamp(14px,3vw,16px)] font-light">
                      Soft skills
                      <div className="p-1 px-3 bg-[#4A2020] text-main-white rounded-xl font-semibold">
                        {selectedResume?.soft_skills}
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-3xl text-center my-10 font-bold">
                На данный момент резюме нет
              </p>
            )}
          </div>
        ) : (
          <div className="w-full h-[80vh] overflow-y-scroll scrollbar-thin  grid lg:grid-cols-2 grid-cols-1 gap-5 py-3 px-3">
            {allResume.results?.map((item) => (
              <div key={item.id} className="w-full h-full relative">
                <div
                  className="flex items-end bg-cover bg-center w-[100%] md:h-[435px] h-[295px] rounded-xl"
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                >
                  <button className="absolute top-4 right-[20px] flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40">
                    {item.favorite ? (
                      <IoMdHeart
                        onClick={() => handleDeleteLike(item.id)}
                        className=" cursor-pointer hover:scale-110"
                        color="red"
                        size={30}
                      />
                    ) : (
                      <IoMdHeartEmpty
                        onClick={() => handleLikeClick(item.id)}
                        className="cursor-pointer hover:scale-110"
                        color="white"
                        size={30}
                      />
                    )}
                  </button>
                  <div onClick={() => handleGetResume(item.id)} className=" h-[55px] w-full bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-20 backdrop-saturate-50 backdrop-contrast-100 flex justify-between items-center p-6">
                    <div>
                      <h5 className="text-main-white text-[22px] md:text-[20px]">
                        {item.owner.first_name}
                      </h5>
                      <p className="text-second-color md:text-[15px] text-[18px]">
                        {item.heading.name}
                      </p>
                    </div>
                    <GrLinkNext
                      onClick={() => handleGetResume(item.id)}
                      className="transform hover:translate-x-2 transition-transform ease-in duration-200 cursor-pointer"
                      size={iconSize}
                      color="white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
