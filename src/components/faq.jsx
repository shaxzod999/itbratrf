import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFaq } from "../app/reducers/statusSlice";

export default function Faq() {
  const dispatch = useDispatch();
  const { faq } = useSelector((state) => state.status);
  useEffect(() => {
    dispatch(getFaq());
  }, []);
  console.log(faq);

  const [activeIndex, setActiveIndex] = useState(null);

  const onItemClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <div className="w-full md:w-[130%] md:min-h-[40vh] flex items-center justify-center flex-col">
      <span className="text-main-white text-[clamp(12px,2vw,16px)] font-extralight text-start w-[100%]">
        Остались вопросы? Посмотрите часто задаваемые вопросы или задайте свой
      </span>
      <div className="mt-5">
        {faq.map((item, index) => (
          <div
            key={index}
            className={`border-b border-gray-700 ${
              index === faq.length - 1 ? "border-b-0" : ""
            }`}
          >
            <button
              className={`w-full text-left p-4 bg-[#101010] rounded-md ${
                activeIndex === index ? "bg-[#101010]" : "bg-[#101010]"
              }`}
              onClick={() => onItemClick(index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0 gap-2">
                  <span
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      activeIndex === index ? "bg-main-red" : "bg-[#560303]"
                    }`}
                  ></span>
                  <span className="text-[clamp(12px,2vw,16px)] font-extralight text-main-white ">
                    {item.title}
                  </span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-5 h-5 transition-transform duration-200 transform flex-shrink-0 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill={`${activeIndex === index ? "red" : "#560303"}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
            <div
              className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                activeIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="p-4 text-second-color">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-[20px] w-full md:max-w-[271px] max-w-[184px] md:h-[62px] h-[41px] py-[10px] rounded-md bg-main-red text-[#000] text-[clamp(12px,3vw,24px)] font-bold box-shadow text-[20px]"
      >
        ЗАДАТЬ ВОПРОС
      </button>
    </div>
  );
}
