import { useEffect, useState } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import { ServiceData } from "../constants";
import { v4 as uuidv4 } from "uuid";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";

SwiperCore.use([Navigation]);

const DesktopSwiper = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const initialFavorites = ServiceData.reduce((acc, item) => {
      acc[item.id] = item.favorite || false;
      return acc;
    }, {});
    setFavorites(initialFavorites);
  }, []);

  const handleSwiper = (swiper) => {
    setSwiperInstance(swiper);
    updateButtonStates(swiper);
  };

  const updateButtonStates = (swiper) => {
    if (!swiper) return;
    setIsPrevDisabled(swiper.isBeginning);
    setIsNextDisabled(swiper.isEnd);
  };

  const goNext = () => {
    if (swiperInstance && !swiperInstance.isEnd) {
      swiperInstance.slideNext();
      updateButtonStates(swiperInstance);
    }
  };

  const goPrev = () => {
    if (swiperInstance && !swiperInstance.isBeginning) {
      swiperInstance.slidePrev();
      updateButtonStates(swiperInstance);
    }
  };

  const toggleFavorite = (itemId) => {
    setFavorites((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <div className="w-full h-[580px]">
      <div className="flex items-center justify-center flex-col h-[600px] text-main-white">
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          onSwiper={handleSwiper}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="w-full"
        >
          {ServiceData.map((item) => (
            <SwiperSlide key={item.id || uuidv4()}>
              <div className="w-full max-w-[298px] min-h-[335px] rounded-lg flex flex-col justify-end gap-6 mb-20 group relative shadow-lg text-white px-6 py-8 h-full overflow-hidden cursor-pointer">
                <div
                  className="absolute inset-0 bg-center bg-cover "
                  style={{
                    backgroundImage: `url(${item.backgroundImage})`,
                  }}
                />
                <div className="absolute inset-0 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10" />
                <div className="relative flex flex-col gap-10">
                  <div className="absolute top-[-230px] right-[5px] flex items-center gap-4">
                    <div>
                      <button className="flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40">
                        <FaEye className="cursor-pointer hover:scale-110" />
                      </button>
                      <span className="text-second-color text-[13px]">
                        {item.view}к
                      </span>
                    </div>
                    <div>
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className="flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40"
                      >
                        {favorites[item.id] ? (
                          <IoMdHeart
                            className="cursor-pointer hover:scale-110"
                            color="red"
                            size={30}
                          />
                        ) : (
                          <IoMdHeartEmpty
                            className="cursor-pointer hover:scale-110"
                            color="white"
                            size={30}
                          />
                        )}
                      </button>
                      <span className="text-second-color text-[13px]">
                        {item.likes}
                      </span>
                    </div>
                  </div>
                  <h1 className="flex justify-start h-10 font-semibold text-start text-[20px]">
                    {item.title}
                  </h1>
                  <div className="flex items-end justify-between w-full">
                    <p className=" text-second-color text-start text-[14px]">
                      от <br />
                      {item.price} р.
                    </p>
                    <Link
                      to={"/sign-up"}
                      className="underline text-main-red text-[14px]"
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex gap-5 mt-5">
          <button
            className={`w-[53px] h-[53px] ${
              isPrevDisabled ? "bg-red-900" : "bg-main-red"
            } rounded-full flex justify-center items-center`}
            onClick={goPrev}
            disabled={isPrevDisabled}
          >
            <GrLinkPrevious
              color={isPrevDisabled ? "black" : "black"}
              size={40}
            />
          </button>
          <button
            className={`w-[53px] h-[53px] ${
              isNextDisabled ? "bg-red-900" : "bg-main-red"
            } rounded-full flex justify-center items-center`}
            onClick={goNext}
            disabled={isNextDisabled}
          >
            <GrLinkNext color={isNextDisabled ? "black" : "black"} size={40} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopSwiper;
