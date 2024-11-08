import { useState } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, EffectCoverflow } from "swiper/modules";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { ServiceData } from "../constants";
import { v4 as uuidv4 } from "uuid";
import { FaEye } from "react-icons/fa";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";

SwiperCore.use([Navigation]);

const MobileSwiper = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

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

  return (
    <div className="w-full">
      <div className="flex items-center justify-center flex-col h-[350px] text-main-white">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1.5} // Center slide focus
          initialSlide={1} // Start with the second slide centered
          coverflowEffect={{
            rotate: 0,
            stretch: 100,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          onSwiper={handleSwiper}
          breakpoints={{
            340: {
              slidesPerView: 1.5,
              spaceBetween: 15,
            },
            700: {
              slidesPerView: 1.5,
              spaceBetween: 15,
            },
          }}
          freeMode={true}
          modules={[FreeMode, EffectCoverflow]}
          className="max-w-[90%]"
        >
          {ServiceData.map((item, index) => (
            <SwiperSlide key={uuidv4()}>
              <div
                className={`flex flex-col justify-end gap-6 mb-20 relative shadow-lg  px-6 py-8 w-full max-w-[225px] min-h-[254px] rounded-lg overflow-hidden cursor-pointer ${
                  index === 1 ? "z-10" : "z-0"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 blur-sm"
                  style={{
                    backgroundImage: `url(${item.backgroundImage})`,
                  }}
                />
                <div className="relative z-10 flex flex-col gap-10">
                  <div className="absolute top-[-100px] right-[0px] flex items-center gap-4">
                    <div>
                      <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40">
                        <FaEye
                          size={15}
                          className=" cursor-pointer hover:scale-110"
                        />
                      </button>
                      <span className="text-second-color text-[13px]">
                        {item.view}к
                      </span>
                    </div>
                    <div>
                      <button className=" flex items-center justify-center w-8 h-8 rounded-full bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40">
                        {item.favorite ? (
                          <IoMdHeart
                            className=" cursor-pointer hover:scale-110"
                            color="red"
                            size={15}
                          />
                        ) : (
                          <IoMdHeartEmpty
                            className="cursor-pointer hover:scale-110"
                            color="white"
                            size={15}
                          />
                        )}
                      </button>
                      <span className="text-second-color text-[13px]">
                        {item.likes}
                      </span>
                    </div>
                  </div>
                  <h1 className="text-[clamp(10px,3vw,16px)] font-semibold text-start">
                    {item.title}
                  </h1>
                  <div className="flex items-end justify-between">
                    <p className="text-xs text-second-color text-start">
                      от <br />
                      {item.price} р.
                    </p>
                    <Link to={"/sign-up"}>
                      <span className="text-main-red underline text-xs">
                        Подробнее
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex gap-5">
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

export default MobileSwiper;
