import { useEffect, useState } from "react";
import { baseURL } from "../app/api/baseUrl";
import { Link } from "react-router-dom";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [chatNotifications, setChatNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  // Set to exclude certain users, you can add more users to exclude here
  const excludedUsers = new Set(["anashu"]);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const [generalRes, chatRes] = await Promise.all([
          fetch(`${baseURL}/resume/notification/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${baseURL}/chat/notification`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // Check if responses are ok, throw an error if not
        if (!generalRes.ok || !chatRes.ok) {
          throw new Error("Network response was not ok");
        }

        // Parse the response data
        const generalData = await generalRes.json();
        const chatData = await chatRes.json();

        // Set the notifications state with valid data
        if (generalData.notification) {
          setNotifications(generalData.notification);
        } else {
          console.error("General notifications data is not valid:", generalData);
        }

        if (chatData.notification) {
          setChatNotifications(chatData.notification);
        } else {
          console.error("Chat notifications data is not valid:", chatData);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        alert("Failed to load notifications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token]);

  // Filter out excluded users from the notifications list
  const filteredNotifications = notifications.filter(
    (notification) => !excludedUsers.has(notification.favorite.owner.first_name)
  );

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  // Group chat notifications by sender
  const groupedChatNotifications = chatNotifications.reduce((acc, notification) => {
    const senderId = notification.favorite.sender.id;
    if (!acc[senderId]) {
      acc[senderId] = {
        sender: notification.favorite.sender,
        messages: [],
      };
    }
    acc[senderId].messages.push(notification);
    return acc;
  }, {});

  const chatEntries = Object.entries(groupedChatNotifications);

  

  return (
    <div className="text-main-white px-0 md:px-10 h-full">
      <h1 className="text-main-white text-3xl mt-[30px]">Уведомления</h1>

      {/* General Notifications */}
      <div className="w-full flex flex-col gap-[10px] mt-[30px]">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              className="flex gap-[10px] items-center p-4 bg-[#0D0D0D] rounded-lg shadow-md"
            >
              <img
                src={item.favorite.owner.resume[0]?.image || "default-avatar.png"}
                alt="Avatar"
                className="w-[64px] h-[64px] rounded-full mr-2"
              />
              <div>
                <h2 className="text-[14px] md:text-[20px]">Новый отклик</h2>
                <h2 className="text-[10px] md:text-[15px]">
                  На ваш проект {item.favorite.owner.resume[0]?.heading?.name} откликнулись.{" "}
                  <Link className="text-[#760000]" to={"/profile/resume"}>
                    Нажмите<span className="text-[#fff]">,</span>
                  </Link>{" "}
                  чтобы посмотреть.
                </h2>
              </div>
            </div>
          ))
        ) : (
          <p>Нет общих уведомлений</p>
        )}
      </div>

      {/* Chat Notifications */}
      <div className="w-full mt-[10px] flex flex-col gap-[10px]">
        {chatEntries.length > 0 ? (
          chatEntries.map(([senderId, { sender, messages }]) => (
            <Link key={senderId} to={`/profile/chat/${messages[0].favorite.conversation.id}`}>
              <div className="flex items-center p-4 bg-[#0D0D0D] rounded-lg shadow-md relative">
                <img
                  src={sender.resume[0]?.image || "default-avatar.png"}
                  alt="Avatar"
                  className="w-[64px] h-[64px] rounded-full mr-2"
                />
                <div>
                  <h2 className="text-[14px] md:text-[20px]">{sender.first_name}</h2>
                  <p className="text-[10px] md:text-[15px]">Новое сообщение</p>
                  <p>{messages[messages.length - 1].text}</p>{" "}
                  {messages.length > 1 && (
                    <div className="absolute top-0 right-0 w-[24px] h-[24px] bg-[#760000] text-white rounded-full flex items-center justify-center">
                      {messages.length}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>Нет уведомлений по чатам</p>
        )}
      </div>
    </div>
  );
}
