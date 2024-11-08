import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import AddProjects from "./addProjects";
import { useDispatch, useSelector } from "react-redux";
import {
  // deleteLike,
  getProjectById,
  getProjects,
  // postLike,
} from "../app/reducers/projectsSlice.js";
// import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import ProjectInfo from "./projectInfo.jsx";
import { getCurrentUser } from "../app/reducers/authSlice.js";

export default function Projects() {
  const [click, setClick] = useState(false);
  // const [statuslike, setStatuslike] = useState(false);
  const [infoProject, setInfoProject] = useState(false);
  const { showProjects } = useSelector((state) => state.projects);
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  const handleClick = () => {
    setClick(!click);
    setInfoProject(false);
  };

  // const handleLikeClick = async (id) => {
  //   await dispatch(postLike(id));
  //   setStatuslike(!statuslike);
  // };

  // const handleDeleteLike = async (id) => {
  //   await dispatch(deleteLike(id));
  //   setStatuslike(!statuslike);
  // };

  const getProjectInfo = async (id) => {
    await dispatch(getProjectById(id));
    setInfoProject(!infoProject);
    setClick(!click);
  };

  console.log(showProjects.results);

  return (
    <div className="px-5 md:mt-[0] mt-[-80px]">
      <div className="flex gap-2 items-center mt-[20px]">
        <h1 className="text-main-white text-[clamp(20px,3vw,24px)] font-semibold">Проекты</h1>
        {currentUser?.groups?.map((item) => (
          <div key={item.id}>
            {item.id === 2 && (
              <button className="transition mt-2" onClick={handleClick}>
                {click ? (
                  <RiCloseLine color="red" size={20} />
                ) : (
                  <FaPlus color="white" />
                )}
              </button>
            )}
          </div>
        ))}
      </div>
      {!infoProject && !click ? (
        <div className="w-full h-[calc(100vh-100px)] overflow-y-scroll scrollbar-thin grid lg:grid-cols-2 grid-cols-1 gap-5 py-3 px-1">
          {showProjects.results
            ?.filter((item) => item.is_owner)
            ?.map((item) => (
              <div key={item.id} className="w-full h-full ">
                <div
                  className="bg-cover flex items-end  bg-center w-[100%] h-[335px] rounded-lg "
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                >
                  <div className="w-full relative flex flex-col gap-10 p-5  backdrop-blur">
                    {/* <button className="absolute top-[-150px] right-[20px] flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40">
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
                  </button> */}

                    <h1 className="text-xl text-main-white font-semibold lg:text-2xl">
                      {item.name}
                    </h1>
                    <div className="flex items-end justify-between">
                      <p className="lg:text-[18px] text-second-color">
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
      ) : (
        ""
      )}

      {click && !infoProject ? (
        <AddProjects stateValue={click} setStateValue={setClick} />
      ) : (
        ""
      )}
      {click && infoProject ? <ProjectInfo /> : ""}
    </div>
  );
}
