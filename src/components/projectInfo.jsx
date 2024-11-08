import axios from "axios";
import { useSelector } from "react-redux";
import { baseURL } from "../app/api/baseUrl";
import { FaTelegramPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RiCloseLargeLine } from "react-icons/ri";

export default function ProjectInfo({setShowProjectInfo,setInfoProject}) {
  const { projectInfo } = useSelector((state) => state.projects);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  const createWebSocket = (id, dataToSend) => {
    const socket = new WebSocket(
      `wss://api.itbratrf.ru/ws/chat/${id}/?token=${token}`
    );
    socket.onopen = () => socket.send(JSON.stringify(dataToSend));
    socket.onmessage = (event) => console.log("Received message:", event.data);
    socket.onerror = (error) => console.error("WebSocket error:", error);
    socket.onclose = () => console.log("WebSocket closed");
  };

  // let chatId;
  const handleCreateChat = async () => {
    try {
      const { data } = await axios.post(
        `${baseURL}/chat/create_room/`,
        { email: projectInfo.owner.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      createWebSocket(data?.id, { message: "", info: projectInfo });
      navigate(`/profile/chat/${data?.id}`);
    } catch (error) {
      const id = error.response?.data?.id;
      if (id) {
        createWebSocket(id, { message: "", info: projectInfo });
        navigate(`/profile/chat/${id}`);
      }
    }
  };

  console.log(projectInfo);

  return (
    <div className="w-full relative md:h-[calc(100vh-100px)] overflow-y-scroll xl:overflow-hidden scrollbar-thin bg-[#1E1E1E] rounded-lg mt-2 p-5">
      {
        location.pathname === "/profile/favorite-projects" ? (<RiCloseLargeLine
        onClick={() => setShowProjectInfo(false)}
          className="absolute top-3 right-3 cursor-pointer"
          color="red"
          size={25}
        />):(<></>)
      }
      {
        location.pathname === "/profile/search" ? (<RiCloseLargeLine
        onClick={() => setInfoProject(false)}
          className="absolute top-3 right-3 cursor-pointer"
          color="red"
          size={25}
        />):(<></>)
      }

      <div className="w-full flex justify-between xl:flex-row flex-col ">
        <div className="">
          <h3 className="text-main-white text-[clamp(16px,3vw,24px)] font-bold mb-4">
            Подробнее
          </h3>
          <div className="w-full">
            <div className="w-full  h-full bg-[#2E2E2E] flex items-center justify-center rounded-xl">
              <img className="object-cover w-full  h-[200px] rounded-xl" src={projectInfo.image} alt="project" />
            </div>
            {
             projectInfo?.is_owner ? (<></>) :(<button
              onClick={handleCreateChat}
              className="bg-red-700 text-main-white font-light px-10 py-2 rounded-md flex items-center gap-2 my-2"
            >
              Написать сообщение
              <FaTelegramPlane color="white" size={25} />
            </button>)
            }
            
          </div>
        </div>
        <div className="md:w-[60%]">
          <div className="p-6 rounded-xl w-full text-white">
            <div className="mb-4 flex">
              <label className="block mt-3 text-[clamp(8px,3vw,14px)]">
                Название:
              </label>
              <span className="w-full px-2 py-1 bg-transparent border-b border-gray-500 outline-none text-[clamp(8px,3vw,14px)]">
                {projectInfo.name}
              </span>
            </div>

            <div className="mb-4 flex items-center">
              <label className="w-full block mt-3 text-[clamp(8px,3vw,14px)]">
                Контактные данные:
              </label>
              <span className="w-full px-2  bg-transparent border-b border-gray-500 outline-none text-[clamp(8px,3vw,14px)]">
                {projectInfo.contact}
              </span>
            </div>

            <div className="mb-4 flex items-center">
              <label className="block mt-3 text-[clamp(8px,3vw,14px)]">
                Плата:
              </label>
              <span className="w-full px-2 py-1 bg-transparent border-b border-gray-500 outline-none text-[clamp(8px,3vw,14px)]">
                {projectInfo.price} {projectInfo.valuta}
              </span>
            </div>

            <div className="mb-4 flex items-center">
              <label className="block mt-3 text-[clamp(8px,3vw,14px)]">
                Требуемые навыки:
              </label>
              <span className="w-full px-2 py-1 bg-transparent border-b border-gray-500 outline-none text-[clamp(8px,3vw,14px)]">
                {projectInfo.skils}
              </span>
            </div>

            <div className="mb-4 flex">
              <label className="block mt-3 text-[clamp(8px,3vw,14px)]">
                Категория:
              </label>
              <span className="w-full px-2 py-1 bg-transparent border-b border-gray-500 outline-none text-[clamp(8px,3vw,14px)]">
                {projectInfo.category.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-main-white text-[clamp(12px,3vw,20px) font-medium]">
          Описание:
        </h3>
        <div className="flex p-3 bg-[#2E2E2E] w-full max-w-[95%]  max-h-[365px] text-main-white mt-2 rounded-lg">
          <span className="w-full max-w-[90%] break-words whitespace-pre-wrap">
            {projectInfo.description}
          </span>
        </div>
      </div>
    </div>
  );
}
