import { useEffect, useState, useRef } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";
import editPhoto from "../assets/editPhoto.png";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../app/reducers/authSlice";
import { useForm } from "react-hook-form";
import {
  addResume,
  deleteResume,
  getCurrentUserResume,
  getHeadingResume,
  updateResume,
} from "../app/reducers/resumeSlice";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Account() {
  const [editClick, setEditClick] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { headingResume, currentResume } = useSelector(
    (state) => state.resumes
  );
  const hard_skills = currentResume?.[0]?.hard_skills?.[0];
  const text = hard_skills ? hard_skills.split(",") : [];

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getHeadingResume());
    dispatch(getCurrentUserResume());
  }, [dispatch]);

  const handleEditClick = () => {
    if (currentResume && currentResume.length > 0) {
      reset({
        contact: currentResume[0].contact,
        experience: currentResume[0].experience,
        hard_skills: currentResume[0].hard_skills,
        soft_skills: currentResume[0].soft_skills,
        description: currentResume[0].description,
        heading: currentResume[0].heading.id,
      });
    }
    setEditClick(!editClick);
  };

  const handleOpenForm = () => {
    setEditClick(true);
    reset();
  };

  const closeForm = () => {
    setEditClick(false);
  };

  const onSubmit = (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("contact", data.contact);
    formData.append("experience", data.experience);
    formData.append("hard_skills", data.hard_skills);
    formData.append("soft_skills", data.soft_skills);
    formData.append("description", data.description);
    formData.append("heading", data.heading);

    if (fileInputRef.current && fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    if (currentResume && currentResume.length > 0) {
      const id = currentResume[0].id;
      dispatch(updateResume({ id, resumeData: formData }))
        .unwrap()
        .then(() => {
          reset();
          toast.success("Resume updated successfully");
          setEditClick(false);
        })
        .catch((error) => console.error(error));
    } else {
      dispatch(addResume(formData))
        .unwrap()
        .then(() => {
          reset();
          setEditClick(false);
        })
        .catch((error) => console.error(error));
    }
    dispatch(getCurrentUserResume());
  };

  const handleDelete = (id) => {
    dispatch(deleteResume(id))
      .then(() => {
        toast.success("Resume successfully deleted");
      })
      .catch((error) => {
        console.error("Error deleting resume:", error);
        toast.error("An error occurred while deleting the resume");
      });
  };

  return (
    <div className="w-full h-full bg-main-black rounded-lg py-5 md:mt-[0] mt-[-80px]">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-main-white text-[clamp(12px,3vw,24px)] py-2">
          Профиль
        </h2>
        <div className="flex gap-2">
          {currentResume && currentResume.length > 0 ? (
            <button onClick={handleEditClick}>
              <LiaEditSolid color="white" size={20} />
            </button>
          ) : (
            <button onClick={handleOpenForm}>
              <FaPlus color="white" />
            </button>
          )}
          <button onClick={() => handleDelete(currentResume?.[0]?.id)}>
            <RiDeleteBinLine color="white" size={20} />
          </button>
        </div>
      </div>
      {editClick ? (
        <div className="w-full min-h-[300px] bg-[#8D8D8D] rounded-lg p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full border-b border-[#680202] py-3">
              <div className="w-full relative">
                <div className="w-full max-w-[100px] h-[100px] bg-[#919191] flex items-center justify-center rounded-full border-8 border-[#680202]">
                  <label
                    htmlFor="fileInput"
                    className="flex justify-center items-center rounded-full w-full max-w-[75px] h-[75px] bg-[#CCCCCC] cursor-pointer"
                  >
                    <img src={editPhoto} alt="add" />
                  </label>
                </div>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  {...register("image")}
                  ref={fileInputRef}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 ">
              <label
                htmlFor=""
                className="flex flex-col text-[clamp(8px,3vw,16px)]"
              >
                Контактная информация:
                <input
                  required
                  type="text"
                  className="w-full max-w-[84%] min-h-[30px] px-2 bg-[#CCCCCC] rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#680202]"
                  {...register("contact")}
                />
              </label>
              <label
                htmlFor=""
                className="flex flex-col text-[clamp(8px,3vw,16px)]"
              >
                Опыт работы:
                <input
                  required
                  type="number"
                  className="w-full max-w-[84%] min-h-[30px] px-2 bg-[#CCCCCC] rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#680202]"
                  {...register("experience")}
                />
              </label>
              <label
                htmlFor=""
                className="flex flex-col text-[clamp(8px,3vw,16px)]"
              >
                Hard skills:
                <input
                  required
                  type="text"
                  className="w-full max-w-[84%] min-h-[30px] px-2 bg-[#CCCCCC] rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#680202]"
                  {...register("hard_skills")}
                />
              </label>
              <label
                htmlFor=""
                className="flex flex-col text-[clamp(8px,3vw,16px)]"
              >
                Soft skills:
                <input
                  required
                  type="text"
                  className="w-full max-w-[84%] min-h-[30px] px-2 bg-[#CCCCCC] rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#680202]"
                  {...register("soft_skills")}
                />
              </label>
            </div>
            <label htmlFor="">
              профессия:
              <select
                required
                className="w-[92%] px-2 py-1 bg-transparent border-b border-gray-500 outline-none text-md text-gray-800 cursor-pointer"
                {...register("heading")}
              >
                <option value="" className="text-md">
                  выберите профессию
                </option>
                {headingResume?.map((item) => (
                  <option key={item.id} value={item.id} className="text-xs">
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label
              htmlFor=""
              className="flex flex-col text-[clamp(8px,3vw,16px)]"
            >
              Личные данные:
              <textarea
                required
                name=""
                id=""
                className="w-[92%] min-h-[161px] bg-[#CCCCCC] px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#680202]"
                {...register("description")}
              ></textarea>
            </label>
            <div className="flex justify-center gap-3 py-2">
              <button
                type="submit"
                className="text-main-white text-[clamp(8px,3vw,18px)] rounded-md font-bold hover:scale-105 duration-150 bg-[#680202] w-[25%] min-h-[30px]"
              >
                Сохранить
              </button>
              <button
                onClick={closeForm}
                type="button"
                className="text-main-white text-[clamp(8px,3vw,18px)] rounded-md font-bold hover:scale-105 duration-150 bg-main-black w-[20%] min-h-[30px]"
              >
                Oтмена
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full min-h-[233px] bg-[#8D8D8D] rounded-lg p-5">
          {currentResume && currentResume.length > 0 ? (
            <div>
              <div className="w-full flex flex-col xl:flex-row xl:gap-[80px] gap-[10px]">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center md:w-[85px] w-[70px] md:h-[85px] h-[70px] border-4 border-[#680202] rounded-full">
                    <img
                      className="md:w-[75px] w-[60px] md:h-[75px] h-[60px] rounded-full object-cover"
                      src={currentResume[0]?.image}
                      alt="profile"
                    />
                  </div>
                  <div>
                    <h2 className="text-[#5B0303] text-[clamp(16px,3vw,24px)] font-semibold]">
                      {currentResume[0]?.owner.first_name}
                    </h2>
                    <span className="text-main-black text-[clamp(12px,3vw,20px) font-semibold]">
                      {currentResume[0]?.heading.name}
                    </span>
                  </div>
                </div>
                <div>
                  <ul>
                    <li>
                      <span className="text-main-black text-[clamp(13px,3vw,20px)] font-semibold">
                        Контактная информация: {currentResume[0]?.contact}
                      </span>
                    </li>
                    <li>
                      <span className="text-main-black text-[clamp(13px,3vw,20px)] font-semibold">
                        Опыт работы: {currentResume[0]?.experience} лет
                      </span>
                    </li>
                    <li>
                      <span className="text-main-black text-[clamp(13px,3vw,20px)] font-semibold">
                        Личные данные: {currentResume[0]?.description}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full flex xl:flex-row flex-col justify-between">
                <div>
                  <h1 className="text-main-black text-[clamp(16px,3vw,24px)] font-bold">
                    Навыки
                  </h1>
                  <span className="text-main-black text-[clamp(14px,3vw,16px)] font-light">
                    Hard skills
                    <div className="grid  grid-cols-2 gap-2 text-center">
                      {text.map((item, idx) => (
                        <div
                          key={idx}
                          className={`${idx % 2 === 0 && "bg-main-black"} ${
                            idx % 2 === 1 && "bg-[#4A2020]"
                          } p-1 px-3 rounded-xl font-semibold`}
                        >
                          <span className="text-main-white">{item}</span>
                        </div>
                      ))}
                    </div>
                  </span>
                </div>
                <div className="w-[52%] flex justify-start mt-6 md:mt-10">
                  <span className="text-main-black text-[clamp(14px,3vw,16px)] font-light">
                    Soft skills
                    <div className="p-1 px-3 bg-[#4A2020] text-main-white rounded-xl font-semibold">
                      {currentResume[0]?.soft_skills}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-3xl text-center my-10 font-bold">
              На данный момент профиль не заполнен
            </p>
          )}
        </div>
      )}
    </div>
  );
}
