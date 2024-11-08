import { useEffect, useState } from "react";
import { IoMdHeart } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLikeFavoriteProject,
  getProjectById,
  searchWithFavoriteProjectName,
  setFavoriteProjects,
} from "../app/reducers/projectsSlice";
import { IoSearch } from "react-icons/io5";
import ProjectInfo from "./projectInfo";

export default function FavoriteProject() {
  // const [click, setClick] = useState(false);
  const [statuslike, setStatuslike] = useState(false);
  const [showProjectInfo, setShowProjectInfo] = useState(false);
  const { getFavoriteProjects } = useSelector((state) => state.projects);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFavoriteProjects());
  }, [statuslike]);

  const handleDeleteLike = async (id) => {
    await dispatch(deleteLikeFavoriteProject(id));
    setStatuslike(!statuslike);
  };

  const getProjectInfo = async (id) => {
    await dispatch(getProjectById(id));
    setShowProjectInfo(!showProjectInfo);
  };

  const handleChangeInput = async (value) => {
    await dispatch(searchWithFavoriteProjectName(value));
  };

  return (
    <div>
      {showProjectInfo ? (
        <ProjectInfo setShowProjectInfo={setShowProjectInfo} />
      ) : (
        <div className="md:mt-[0] mt-[-80px]">
          <div className="p-1 relative">
            <IoSearch color="white" className="absolute top-12 left-12" />
            <input
              className="w-[85%] m-8 p-2 px-10 rounded-xl bg-[#101010] text-main-white"
              type="text"
              placeholder="Поиск"
              onChange={(e) => handleChangeInput(e.target.value)}
            />
          </div>
          <div className="w-full h-[calc(100vh-180px)]  overflow-y-scroll scrollbar-thin grid lg:grid-cols-2 grid-cols-1 gap-5 py-1 px-5">
            {getFavoriteProjects.results?.map((item) => (
              <div key={item.id} className="w-full h-full ">
                <div
                  className="bg-cover flex items-end  bg-center w-[100%] md:min-h-[335px] min-h-[254px]  rounded-lg"
                  style={{
                    backgroundImage: `url(${item.project.image})`,
                  }}
                >
                  <div className="w-full relative flex flex-col gap-10 p-5">
                    <button className="absolute md:top-[-170px] top-[-100px] right-[20px]  flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40">
                      <IoMdHeart
                        onClick={() => handleDeleteLike(item.project.id)}
                        className=" cursor-pointer hover:scale-110"
                        color="red"
                        size={30}
                      />
                    </button>

                    <h1 className=" text-main-white font-semibold text-[clamp(16px,3vw,20px)]">
                      {item.project.name}
                    </h1>
                    <div className="flex items-end justify-between">
                      <p className="text-[clamp(12px,3vw,14px)] text-[#505050] font-medium">
                        от <br />
                        {item.project.price} {item.project.valuta}
                      </p>
                      <span
                        onClick={() => getProjectInfo(item.project.id)}
                        className="text-main-red underline cursor-pointer text-[clamp(12px,3vw,14px)]"
                      >
                        Подробнее
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
