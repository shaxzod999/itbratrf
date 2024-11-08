import { useState } from "react";
import { FaBriefcase, FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  updateCurrentUser,
} from "../../app/reducers/authSlice";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    dispatch(getCurrentUser());
    console.log(currentUser);
  };

  const putRoleUser = async (role) => {
    await dispatch(updateCurrentUser({ ...currentUser, role }));
    navigate("/profile/account")
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-5">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
        <h2 className="text-center text-[clamp(16px,3vw,24px)] font-semibold mb-6 text-black">
          Пожалуйста, выберите свою роль
        </h2>
        <div className="flex justify-around mb-6">
          <button
            onClick={() => handleRoleSelect("2")}
            className={`flex flex-col items-center md:p-4 p-2 rounded-lg transition ${
              selectedRole === "2"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-black"
            }`}
          >
            <FaBriefcase size={30} />
            <span className="mt-2 text-[clamp(12px,2vw,16px)]">Работодатель</span>
          </button>
          <button
            onClick={() => handleRoleSelect("3")}
            className={`flex flex-col items-center md:p-4 p-2 rounded-lg transition ${
              selectedRole === "3"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-black"
            }`}
          >
            <FaPen size={30} />
            <span className="mt-2 text-[clamp(12px,2vw,16px)]">Соискатель</span>
          </button>
        </div>
        <button
          onClick={() => putRoleUser(selectedRole)}
          className={`w-full py-2 rounded-lg text-white transition ${
            selectedRole ? "bg-red-600" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!selectedRole}
        >
          Продолжать
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
