import { FaCheck } from "react-icons/fa";
import bratman from "../assets/bratman.png";


export default function ForCompony() {
  return (
    <div className="flex flex-col items-center py-5">
      <ul className="flex flex-col whitespace-nowrap  gap-3 ">
        <li className="flex gap-2 items-center flex-nowrap">
          <FaCheck size={20} color="red" />
          <span className="w-[247px] text-main-white text-[clamp(8px,3vw,12px)] font-light">
            быстрый поиск профессианальной <br /> команды или специалиста
          </span>
        </li>

        <li className="flex gap-2">
          <FaCheck size={20} color="red" />
          <span className="text-main-white text-xs font-light">
            удобный формат связи и работы
          </span>
        </li>
        <li className="flex gap-2">
          <FaCheck size={20} color="red" />
          <span className="text-main-white text-xs font-light">
            гарантия результата
          </span>
        </li>
      </ul>
      <div className="px-10 w-full md:w-[355px] max-h-[577px]">
        <img src={bratman} alt="" />
      </div>
    </div>
  );
}
