import { useEffect, useState } from "react";
import addPhoto from "../assets/addPhoto.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectsCategory,
  addProjects,
} from "../app/reducers/projectsSlice"; // Import the createProject action
import { useForm } from "react-hook-form";

export default function AddProjects({ stateValue, setStateValue }) {
  const [currency, setCurrency] = useState("1");
  const { register, handleSubmit, reset } = useForm();
  const { projectsCategory } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getProjectsCategory());
  }, [dispatch]);

  const handleCancel = () => {
    setStateValue(!stateValue);
  };

  const onSubmit = (data) => {
    console.log(data);
    if (data.image && data.image[0]) {
      dispatch(
        addProjects({ ...data, valuta: currency, image: data.image[0] })
      );
      reset();
      setStateValue(!stateValue) // Reset form after submission
    }
  };

  return (
    <div className="w-full md:h-[calc(100vh-100px)] overflow-y-scroll xl:overflow-hidden scrollbar-thin bg-[#1E1E1E] rounded-lg mt-2 p-3">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
        <div className="w-full flex xl:flex-row flex-col ">
          <div className="w-1/2">
            <h3 className="text-main-white text-[clamp(10px,3vw,24px)] font-bold">
              Новый проект
            </h3>
            <div className="w-full relative">
              <div className="md:w-full w-[200%] md:max-w-[298px]  md:h-[255px] h-[150px] bg-[#2E2E2E] flex items-center justify-center rounded-xl">
                <label htmlFor="fileInput" className="cursor-pointer">
                  <img className="w-[60%] h-[60%] mx-auto" src={addPhoto} alt="add" />
                </label>
              </div>
              <input
                required
                type="file"
                id="fileInput"
                className="hidden"
                {...register("image")}
              />
            </div>
          </div>
          <div className="">
            <div className="py-6 rounded-xl w-full max-w-[400px] text-white">
              <div className="mb-4 flex items-center">
                <label className="block mt-3 text-[clamp(8px,3vw,14px)]">
                  Название:
                </label>
                <input
                  required
                  type="text"
                  placeholder="Введите название проекта"
                  className="w-full px-2 py-1 bg-transparent border-b border-gray-500 outline-none text-[clamp(8px,3vw,14px)]"
                  {...register("name")}
                />
              </div>

              <div className="mb-4 flex items-center">
                <label className="w-full block mt-3 text-[clamp(8px,3vw,14px)]">
                  Контактные данные:
                </label>
                <input
                  required
                  type="text"
                  placeholder=""
                  className="w-full px-2 py-1 bg-transparent border-b border-gray-500 outline-none text-[clamp(8px,3vw,14px)]"
                  {...register("contact")}
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="block mt-3 text-[clamp(8px,3vw,14px)]">
                  Плата:
                </label>
                <div className="flex items-center">
                  <input
                    required
                    type="number"
                    placeholder="Введите сумму"
                    className="w-full px-2 py-1 bg-transparent border-b border-gray-500 outline-none text-[clamp(8px,3vw,14px)]"
                    {...register("price")}
                  />
                  <button
                    type="button"
                    onClick={() => setCurrency("1")}
                    className={`ml-2 px-2 py-1 rounded-lg text-[clamp(8px,3vw,14px)] ${
                      currency === "1"
                        ? "bg-red-600"
                        : "bg-transparent border border-red-600"
                    }`}
                  >
                    руб.
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency("2")}
                    className={`ml-2 px-2 py-1 rounded-lg text-[clamp(8px,3vw,14px)] ${
                      currency === "2"
                        ? "bg-red-600"
                        : "bg-transparent border border-red-600"
                    }`}
                  >
                    долл.
                  </button>
                </div>
              </div>

              <div className="mb-4 flex items-center">
                <label className="w-full block mt-3 text-[clamp(8px,3vw,14px)]">
                  Требуемые навыки:
                </label>
                <input
                  required
                  type="text"
                  placeholder="js,python"
                  className="w-full px-2 py-1 bg-transparent border-b border-gray-500 outline-none text-[clamp(8px,3vw,14px)]"
                  {...register("skils")}
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="block mt-3 text-[clamp(8px,3vw,14px)]">
                  Kатегория:
                </label>
                <select
                  required
                  className="w-full px-2 py-1 bg-transparent border-b border-gray-500 outline-none text-[clamp(8px,3vw,14px)] text-md text-gray-400"
                  {...register("category")}
                >
                  <option value="" className="text-md">
                    выберите категорию
                  </option>
                  {projectsCategory?.map((item) => (
                    <option key={item.id} value={item.id} className="text-xs">
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-main-white text-[clamp(12px,3vw,20px) font-medium]">
            Описание
          </h3>

          <textarea
            required
            className="bg-[#2E2E2E] w-full min-h-[205px] text-main-white mt-2 rounded-lg"
            {...register("description")}
          ></textarea>
        </div>

        <div className="flex gap-8 justify-center mt-[30px]">
          <button
            
            type="submit"
            className="w-full max-w-[124px] h-[35px] bg-[#680202] rounded-lg text-main-white text-[clamp(12px,3vw,16px)] font-medium"
          >
            Сохранить
          </button>
          <button
            onClick={handleCancel}
            type="button"
            className="w-full max-w-[124px] h-[35px] bg-[#2E2E2E] rounded-lg text-main-white text-[clamp(12px,3vw,16px)] font-medium"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}
