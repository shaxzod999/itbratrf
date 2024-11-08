import { GrNext } from "react-icons/gr";
import "./css/custom.css";
import { useEffect, useState } from "react";
import {
  deleteLike,
  getProjectByCategoryId,
  getProjectById,
  getProjects,
  getProjectsCategory,
  postLike,
  searchWithProjectName,
} from "../app/reducers/projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../app/reducers/authSlice";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import ProjectInfo from "./projectInfo";
export default function Search() {
  const dispatch = useDispatch();
  const { projectsCategory } = useSelector((state) => state.projects);
  const { showProjects } = useSelector((state) => state.projects);
  // const { currentUser } = useSelector((state) => state.auth);
  const [statuslike, setStatuslike] = useState(false);
  const [infoProject, setInfoProject] = useState(false);

  useEffect(() => {
    dispatch(getProjectsCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProjects());
  }, [statuslike]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  const handleLikeClick = async (id) => {
    await dispatch(postLike(id));
    setStatuslike(!statuslike);
  };

  const handleDeleteLike = async (id) => {
    await dispatch(deleteLike(id));
    setStatuslike(!statuslike);
  };

  const getProjectInfo = async (id) => {
    await dispatch(getProjectById(id));
    setInfoProject(!infoProject);
    window.scrollY = 0;
  };

  return (
    <div className="md:mt-[0] mt-[-80px]">
      {infoProject ? (
        <ProjectInfo setInfoProject={setInfoProject} />
      ) : (
        <div className="md:h-[calc(100vh-60px)] md:overflow-y-scroll scrollbar-thin overflow-x-hidden">
          <div className="p-1 relative">
            <IoSearch color="white" className="absolute top-12 left-12" />
            <input
              className="w-[85%] m-8 p-2 px-10 rounded-xl bg-[#101010] text-main-white"
              type="text"
              placeholder="Поиск"
              onChange={(e) => dispatch(searchWithProjectName(e.target.value))}
            />
          </div>
          <div className="p-1 md:p-5 flex flex-col">
            <div className="h-1/2 overflow-x-auto scrollbar-thin">
              <div className="flex items-center gap-3">
                <h2 className="text-main-white text-2xl">Категории</h2>
                <GrNext size={16} color="white" />
              </div>
              <div className="flex gap-5 py-5 overflow-x-auto w-full scrollbar-x-thin">
                {projectsCategory.map((item) => (
                  <div
                    key={item.id}
                    className="cursor-pointer md:min-w-[366px] min-w-[118px] md:h-[195px] h-[87px]"
                    onClick={() => dispatch(getProjectByCategoryId(item.id))}
                  >
                    <div
                      className="w-full h-full  bg-cover bg-center rounded-xl"
                      style={{
                        backgroundImage: `url(${item.logo})`,
                      }}
                    >
                      <div className="h-full w-full flex justify-center items-center bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-[2px] bg-opacity-20">
                        <h4 className="text-main-white text-sm md:text-2xl w-[170px] h-[62px] font-bold text-center flex items-center justify-center">
                          {item.name}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-1/2 py-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <h2 className="text-main-white text-2xl">Проекты</h2>
                  <GrNext size={16} color="white" />
                </div>
                <div className="flex gap-5 py-5 overflow-x-auto w-full scrollbar-x-thin">
                  {showProjects.results?.map((item) => (
                    <div
                      key={item.id}
                      className="w-full md:min-w-[298px] min-w-[225px] max-w-[298px] md:min-h-[335px] min-h-[224px]   "
                    >
                      <div
                        className="relative bg-cover flex items-end  bg-center w-full h-full  rounded-lg"
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-[2px] bg-opacity-10" />

                        <div className="w-full relative flex flex-col gap-10 p-5 ">
                          <button className="absolute md:top-[-160px] top-[-60px] right-[10px] flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40">
                            {item.favorite ? (
                              <IoMdHeart
                                onClick={() => handleDeleteLike(item.id)}
                                className=" cursor-pointer hover:scale-110"
                                color="red"
                                size={30}
                              />
                            ) : (
                              <IoMdHeartEmpty
                                onClick={() => handleLikeClick(item.id)}
                                className="cursor-pointer hover:scale-110"
                                color="white"
                                size={30}
                              />
                            )}
                          </button>

                          <h1 className="text-xl text-main-white font-semibold lg:text-2xl">
                            {item.name}
                          </h1>
                          <div className="flex items-end justify-between">
                            <p className="lg:text-[18px] text-[#878787]">
                              от <br />
                              {item.price} {item.valuta}
                            </p>
                            <span
                              onClick={() => getProjectInfo(item.id)}
                              className="text-main-red underline cursor-pointer"
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
