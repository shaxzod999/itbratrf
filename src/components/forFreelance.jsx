import { FaCheck } from "react-icons/fa";

import bratgirl from "../assets/bratgirl.png";

export default function ForFreelance() {
  return (
    <div className="flex flex-col items-center py-5">
      <ul className="w-full flex flex-col whitespace-nowrap gap-3 px-12">
        <li className="flex gap-2">
          <FaCheck size={20} color="red" />
          <span className=" text-main-white text-xs font-light">
            регулярно обновляющаяся база <br /> проектов
          </span>
        </li>
        <li className="flex gap-2">
          <FaCheck size={20} color="red" />
          <span className="text-main-white text-xs font-light">
           возможность создавать команду
          </span>
        </li>
        <li className="flex gap-2">
          <FaCheck size={20} color="red" />
          <span className="text-main-white text-xs font-light">
            удобная платформа для ведения <br /> проектов
          </span>
        </li>
      </ul>
      <div className="px-10 w-full md:w-[355px] max-h-[577px]">
        <img src={bratgirl} alt="" />
      </div>
    </div>
  )
}
