import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlayListModal } from "../components/PlaylistModal/PlayListModal";
import { AllVideoListing } from "../containers/AllVideoListing";
import { useAuth } from "../hooks/useAuth";
import { useVideo } from "../hooks/useVideo";

export const Home = () => {
  const { videoList } = useVideo();
  const { fetchUserData } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);

  useEffect(() => {
    (async () => await fetchUserData())();
  }, []);

  return (
    <div className="bg-[#2d2d2d] text-white">
      <header
        className="h-[75vh] text-white bg-cover relative"
        style={{
          backgroundImage: `url("https://img.youtube.com/vi/${videoList[27]?.videoId}/maxresdefault.jpg")`,
        }}
      >
        <div className="ml-8 pt-[25vh]">
          <h1 className="text-4xl font-bold my-4">{videoList[27]?.title}</h1>
          <div className="">
            <Link to={`/videos/62062f5de27764e2f739a29a`}>
              <button className="py-2 px-8 bg-slate-700 bg-opacity-75 mr-4 font-semibold rounded-md">
                Play
              </button>
            </Link>
            <button
              className="py-2 px-8 bg-slate-700 bg-opacity-75 font-semibold rounded-md"
              onClick={openModal}
            >
              Add To Playlist
            </button>
          </div>
          <div className="w-96 pt-4">
            <h3>{videoList[27]?.description}</h3>
          </div>
        </div>
        <div
          className="h-32 absolute bottom-0 w-full"
          style={{
            backgroundImage:
              "linear-gradient(180deg,transparent,rgba(37,37,37,.61),#2d2d2d)",
          }}
        />
      </header>
      <AllVideoListing />
      {showModal && (
        <PlayListModal setShowModal={setShowModal} id={videoList[27]?._id} />
      )}
    </div>
  );
};
