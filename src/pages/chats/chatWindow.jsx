import { FiPaperclip } from "react-icons/fi";
import "../../components/css/custom.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseURL } from "../../app/api/baseUrl";
import { useParams } from "react-router-dom";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { Link } from "react-router-dom";

const ChatWindow = (changer) => {
  console.log(changer);
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [memberDetail, setMemberDetail] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };
  console.log(memberDetail);
  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const { data } = await axios.get(
          `${baseURL}/chat/conversation/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setMemberDetail(data);
        setMessages(data.messages);
      } catch (error) {
        console.error("Error fetching member details:", error);
      }
    };

    fetchMemberDetails();
  }, [id]);

  useEffect(() => {
    const messageSocket = new WebSocket(
      `wss://api.itbratrf.ru/ws/message/${id}/?token=${localStorage.getItem(
        "accessToken"
      )}`
    );

    messageSocket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log("Received message:", receivedMessage);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    return () => messageSocket.close();
  }, [id]);
  console.log(messages);

  const sendMessage = () => {
    console.log("Sending message:", newMessage);
    if (newMessage.trim() === "") return;
    const chatSocket = new WebSocket(
      `wss://api.itbratrf.ru/ws/chat/${id}/?token=${localStorage.getItem(
        "accessToken"
      )}`
    );
    console.log("Chat socket:", chatSocket);

    chatSocket.onopen = () => {
      chatSocket.send(JSON.stringify({ message: newMessage, info: "" }));
      setNewMessage("");
    };
  };

  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  // Scroll to bottom on initial load and when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatLocalTime = (utcTimeStr) => {
    const utcDate = new Date(utcTimeStr);
    return utcDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const hard_skills =
    Array.isArray(memberDetail) && memberDetail.length > 0
      ? memberDetail[0]?.initiator?.resume?.[0]?.hard_skills?.[0]
      : undefined;

  console.log("memberDetail");
  console.log(memberDetail);
  console.log("memberDetail");

  const text = hard_skills ? hard_skills.split(",") : [];

  return (
    <div className="w-full bg-[#111111] px-4 pb-4 flex flex-col rounded-md h-[calc(100vh-60px)]">
      <Rodal
        visible={visible}
        onClose={hideModal}
        animation="zoom"
        duration={500}
        customStyles={{
          width: "95%",
          maxWidth: "700px",
          height: "auto",
          maxHeight: "50vh",
          padding: "20px",
          overflowY: "auto",
          borderRadius: "10px",
        }}
      >
        <div className="w-[95%] min-h-[230px] rounded-lg p-5">
          {memberDetail ? (
            <div>
              <div className="w-full flex flex-col xl:flex-row md:gap-[80px]">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-[100px] h-[100px] border-4 border-[#680202] rounded-full">
                    <img
                      className="w-[90px] h-[90px] rounded-full object-cover"
                      src={memberDetail?.receiver?.resume[0]?.image}
                      alt="profile"
                    />
                  </div>
                  <div>
                    <h2 className="text-[#5B0303] text-[clamp(16px,3vw,24px)] font-semibold]">
                      {memberDetail?.receiver?.first_name}
                    </h2>
                    <span className="text-main-black text-[clamp(12px,3vw,20px) font-semibold]">
                      {memberDetail?.receiver?.resume[0]?.heading.name}
                    </span>
                  </div>
                </div>
                <div>
                  <ul>
                    <li>
                      <span className="text-main-black text-[clamp(13px,3vw,20px)] font-semibold">
                        Контактная информация:{" "}
                        {memberDetail?.receiver?.resume[0]?.contact}
                      </span>
                    </li>
                    <li>
                      <span className="text-main-black text-[clamp(13px,3vw,20px)] font-semibold">
                        Опыт работы:{" "}
                        {memberDetail?.receiver?.resume[0]?.experience} лет
                      </span>
                    </li>
                    <li>
                      <span className="text-main-black text-[clamp(13px,3vw,20px)] font-semibold">
                        Личные данные:{" "}
                        {memberDetail?.receiver?.resume[0]?.description}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-[100px] md:gap-[215px]">
                <div>
                  <h1 className="text-main-black text-[clamp(16px,3vw,24px)] font-bold">
                    Навыки
                  </h1>
                  <span className="text-main-black text-[clamp(14px,3vw,16px)] font-light">
                    Hard skills
                    <div className="flex items-center gap-3">
                      {text.map((item, idx) => (
                        <div
                          key={idx}
                          className={`${idx % 2 === 0 && "bg-main-black"} ${
                            idx % 2 === 1 && "bg-[#4A2020]"
                          } p-1 rounded-md`}
                        >
                          <span className="text-main-white">{item}</span>
                        </div>
                      ))}
                    </div>
                  </span>
                </div>
                <div className="mt-6 md:mt-10">
                  <span className="text-main-black text-[clamp(14px,3vw,16px)] font-light">
                    Soft skills
                    <div className="p-1 bg-[#4A2020] text-main-white rounded-md">
                      {memberDetail?.initiator?.resume[0]?.soft_skills}
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
      </Rodal>
      <div className="flex items-center border-b border-gray-700 pb-4 mb-4 flex-shrink-0 pt-3 relative">
        <div className="flex items-center">
          <Link to={"/profile/chat/"} className="p-2 absolute top-4 left-[-20px]">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0408 15.1186C10.4527 14.5305 10.4527 13.5695 11.0408 12.9814L15.4979 8.5243C16.086 7.93619 17.047 7.93619 17.6351 8.5243C18.2232 9.11241 18.2232 10.0734 17.6351 10.6615L15.2967 13H23.7487C24.5564 13 25.2487 13.6923 25.2487 14.5C25.2487 15.3077 24.5564 16 23.7487 16H15.1625L17.5481 18.3856C18.1362 18.9737 18.1362 19.9347 17.5481 20.5228C16.96 21.1109 15.999 21.1109 15.4109 20.5228L11.0408 16.1527C10.7467 15.8586 10.5997 15.4293 10.5997 15C10.5997 14.5707 10.7467 14.1414 11.0408 13.8473V15.1186Z"
                fill="#A3A3A3"
              />
            </svg>
          </Link>
          <div className="h-[58px] w-[58px] rounded-full ml-[20px]">
            <img
              className="w-full h-full rounded-full object-cover"
              src={`https://api.itbratrf.ru${memberDetail?.sender_type?.resume[0]?.image}`}
              alt=""
            />
          </div>
          <div className="ml-2">
            <h2 className="font-bold text-lg text-[#fff]">
              {memberDetail?.sender_type?.first_name}{" "}
              {memberDetail?.sender_type?.last_name}
            </h2>
            {/* <span className="text-sm text-gray-400">Online</span> */}
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <button
            onClick={showModal}
            className="p-2 rounded bg-gray-800 hover:bg-gray-700"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.98303 22.4237C4.98303 21.1021 5.50803 19.8347 6.44253 18.9002C7.37704 17.9657 8.6445 17.4407 9.96608 17.4407H19.9322C21.2538 17.4407 22.5212 17.9657 23.4557 18.9002C24.3902 19.8347 24.9152 21.1021 24.9152 22.4237C24.9152 23.0845 24.6527 23.7182 24.1855 24.1855C23.7182 24.6528 23.0845 24.9153 22.4237 24.9153H7.47456C6.81376 24.9153 6.18003 24.6528 5.71278 24.1855C5.24553 23.7182 4.98303 23.0845 4.98303 22.4237Z"
                stroke="#A3A3A3"
              />
              <path
                d="M14.9491 12.4576C17.0131 12.4576 18.6864 10.7844 18.6864 8.72032C18.6864 6.65627 17.0131 4.98303 14.9491 4.98303C12.885 4.98303 11.2118 6.65627 11.2118 8.72032C11.2118 10.7844 12.885 12.4576 14.9491 12.4576Z"
                stroke="#A3A3A3"
              />
            </svg>
          </button>
          {/* <button className="p-2 rounded bg-gray-800 hover:bg-gray-700">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.3348 9.28717L18.7946 2.74692C18.6644 2.6166 18.5099 2.51322 18.3397 2.44268C18.1696 2.37214 17.9872 2.33582 17.803 2.33582H6.59118C5.97168 2.33582 5.37756 2.58191 4.93951 3.01996C4.50146 3.45801 4.25537 4.05213 4.25537 4.67162V25.2267C4.25537 25.8462 4.50146 26.4403 4.93951 26.8784C5.37756 27.3164 5.97168 27.5625 6.59118 27.5625H23.409C24.0285 27.5625 24.6226 27.3164 25.0606 26.8784C25.4987 26.4403 25.7448 25.8462 25.7448 25.2267V10.2776C25.7448 9.90615 25.5973 9.54994 25.3348 9.28717ZM18.7374 6.65705L21.4235 9.34323H18.7374V6.65705ZM7.05834 24.7595V5.13878H15.9344V10.7447C15.9344 11.1164 16.0821 11.4729 16.3449 11.7357C16.6077 11.9985 16.9642 12.1462 17.3359 12.1462H22.9418V24.7595H7.05834Z"
                fill="#A3A3A3"
              />
            </svg>
          </button> */}
          {/* <button className="p-2 rounded bg-gray-800 hover:bg-gray-700">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.0509 21.178C15.7116 21.178 16.3454 21.4405 16.8126 21.9077C17.2799 22.375 17.5424 23.0087 17.5424 23.6695C17.5424 24.3303 17.2799 24.964 16.8126 25.4313C16.3454 25.8985 15.7116 26.161 15.0509 26.161C14.3901 26.161 13.7563 25.8985 13.2891 25.4313C12.8218 24.964 12.5593 24.3303 12.5593 23.6695C12.5593 23.0087 12.8218 22.375 13.2891 21.9077C13.7563 21.4405 14.3901 21.178 15.0509 21.178ZM15.0509 12.4576C15.7116 12.4576 16.3454 12.7201 16.8126 13.1874C17.2799 13.6546 17.5424 14.2884 17.5424 14.9491C17.5424 15.6099 17.2799 16.2437 16.8126 16.7109C16.3454 17.1782 15.7116 17.4407 15.0509 17.4407C14.3901 17.4407 13.7563 17.1782 13.2891 16.7109C12.8218 16.2437 12.5593 15.6099 12.5593 14.9491C12.5593 14.2884 12.8218 13.6546 13.2891 13.1874C13.7563 12.7201 14.3901 12.4576 15.0509 12.4576ZM15.0509 3.73728C15.7116 3.73728 16.3454 3.99978 16.8126 4.46703C17.2799 4.93428 17.5424 5.56801 17.5424 6.22881C17.5424 6.8896 17.2799 7.52333 16.8126 7.99058C16.3454 8.45783 15.7116 8.72033 15.0509 8.72033C14.3901 8.72033 13.7563 8.45783 13.2891 7.99058C12.8218 7.52333 12.5593 6.8896 12.5593 6.22881C12.5593 5.56801 12.8218 4.93428 13.2891 4.46703C13.7563 3.99978 14.3901 3.73728 15.0509 3.73728Z"
                fill="#A3A3A3"
              />
            </svg>
          </button> */}
        </div>
      </div>
      <div className="flex-1 overflow-auto  scrollbar-thin px-2">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <div
              className={`flex ${
                message.sender_type === "initiator"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-4 w-[70%] rounded-lg break-words whitespace-pre-wrap font-mono ${
                  message.sender_type === "initiator"
                    ? "bg-[#202020] text-white"
                    : "bg-[#686868] text-white"
                }`}
              >
                <p className="mb-2">{message?.text}</p>
                <div className="text-xs text-gray-400 flex justify-end">
                  <span>{formatLocalTime(message?.timestamp)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="relative flex items-center border-t border-gray-700 pt-4 mt-4">
        <div className="absolute left-2 text-[#fff]">
          <label htmlFor="file-upload" className="cursor-pointer">
            <FiPaperclip className="cursor-pointer" />
          </label>
          <input id="file-upload" type="file" className="hidden" />
        </div>
        <input
          type="text"
          placeholder="Написать сообщение..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 px-8 rounded bg-gray-700 placeholder-gray-400 text-white"
        />
        <button
          onClick={sendMessage}
          className="ml-2 p-2 rounded bg-gray-700 hover:bg-blue-500"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7M12 3v18"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
