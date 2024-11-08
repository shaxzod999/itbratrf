// Import Swiper React components
import { Swiper, SwiperSlide,} from "swiper/react";
import { v4 as uuidv4 } from 'uuid';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./css/custom.css";

// import required modules
import { Pagination,EffectCreative } from "swiper/modules";
import { Rezume1Data } from "../constants";
import { GrLinkNext } from "react-icons/gr";
// import { GrLinkNext } from "react-icons/gr";

export default function SwiperRezume() {
  return (
    <div className="w-full max-w-[300px] flex justify-center">
      <Swiper
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        pagination={true}
        modules={[EffectCreative,Pagination]}
      >
       {
        Rezume1Data.map((item)=>(<SwiperSlide key={uuidv4()}>
            <div className="py-3 mb-10 ml-3 h-[457px] w-[277px]  overflow-hidden cursor-pointer">
                <div
                  className="w-full h-full bg-cover bg-center rounded-2xl"
                  style={{
                    backgroundImage: `url(${item.img})`,
                  }}
                />
                <div className=" bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-20 backdrop-saturate-50 backdrop-contrast-100 flex justify-between items-center p-2 py-5 mt-[-95px] rounded-xl">
                <div>
                  <h5 className="text-main-white text-lg">{item.name}</h5>
                  <span className="text-second-color text-xs">{item.job}</span>
                </div>
                <div className="transform hover:translate-x-2 transition-transform ease-in duration-200 cursor-pointercursor-pointer">
                  <GrLinkNext color="white" size={30} />
                </div>
              </div>
                
              </div>
        </SwiperSlide>))
       }
      </Swiper>
    </div>
  );
}
