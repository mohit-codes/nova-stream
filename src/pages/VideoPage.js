import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Loading } from "../components/Loading";
import { useVideo } from "../hooks/useVideo";
import { VideoSection } from "../containers/VideoSection";
import { NormalVideoListing } from "../containers/NormalVideoListing";
import { LikeButton } from "../components/LikeButton";
import { MdPlaylistAdd } from "react-icons/md";
import { PlayListModal } from "../components/PlaylistModal/PlayListModal";

export const VideoPage = () => {
  const { id } = useParams();
  const { fetchSingleVideo, loading, videoList } = useVideo();
  const [video, setVideo] = useState();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const filteredByOrg = videoList.filter((v) => v?.owner === video?.owner);

  useEffect(() => {
    (async () => {
      const data = await fetchSingleVideo(id);
      if (data.success) {
        setVideo(data.video);
      }
    })();
  }, [id]);

  return (
    <div className="pt-[6vh]">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <VideoSection video={video} />
          <div className="flex justify-between pr-10">
            <div className="w-1/2">
              <h2 className="m-4 text-xl font-semibold">{video?.title}</h2>
              <p className="m-4">{video?.description}</p>
            </div>
            <div className="flex justify-between w-40 items-start">
              <LikeButton id={video?._id} />
              <button aria-label="add to playlist" onClick={openModal}>
                <MdPlaylistAdd className="text-2xl" />
              </button>
            </div>
          </div>
          <NormalVideoListing
            videos={filteredByOrg}
            title={video?.owner}
            showTitle={false}
          />
        </div>
      )}
      {showModal && (
        <PlayListModal setShowModal={setShowModal} id={video?._id} />
      )}
    </div>
  );
};
