import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { baseURL } from "../../app/api/baseUrl";

const ChatList = ({ onMemberClick }) => {
  const [chatMemberList, setChatMemberList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getMembersList = () => {
    axios
      .get(`${baseURL}/chat/rooms/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setChatMemberList(response.data);
      });
  };

  const searchChat = async (name) => {
    if (name === "") {
      getMembersList();
      return;
    }

    await axios
      .get(`${baseURL}/chat/rooms/?full_name=${name}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setChatMemberList(response.data);
      });
  };

  useEffect(() => {
    getMembersList();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchChat(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="xl:w-[50%] w-full bg-[#111111] h-[calc(100vh-60px)] rounded-md p-4 overflow-y-scroll scrollbar-thin">
      <input
        type="text"
        placeholder="Поиск по чатам"
        className="w-full p-2 rounded mb-4 bg-gray-700 placeholder-gray-400 text-white"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      {chatMemberList?.map((member) => (
        <NavLink
          to={`${member?.id}`}
          key={member?.sender_type?.id}
          onClick={() => {
            onMemberClick(member.sender_type.id); // Trigger the callback
          }}
          className={`p-2 mb-2 rounded cursor-pointer hover:bg-sky-700 flex gap-2 items-start ${
            member?.active ? "bg-gray-400" : "bg-gray-800"
          }`}
        >
          <div className="">
            <div className="flex items-center justify-center w-12 h-12 rounded-full ">
              <img
                className="w-full h-full rounded-full object-cover"
                src={`https://api.itbratrf.ru${member?.sender_type?.resume[0]?.image}`}
                alt="Avatar"
              />
            </div>
          </div>
          <div>
            <div className="">
              <span className="font-bold">
                {member?.sender_type?.first_name}
              </span>
            </div>
            <p className="text-gray-400">{member?.message}</p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default ChatList;
