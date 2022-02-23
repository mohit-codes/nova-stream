import { useState } from "react";
import { BiPlayCircle } from "react-icons/bi";
import { userActions } from "../hooks/userActions";

export const VideoSection = ({ video }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { addToHistory, isVideoAlreadyInHistory } = userActions();

  const markAsViwed = async () => {
    if (!isVideoAlreadyInHistory(video?._id)) {
      await addToHistory(video?._id);
    }
    setIsVideoPlaying(true);
  };

  return isVideoPlaying ? (
    <iframe
      className="w-full h-[75vh]"
      title="Video"
      src={`https://www.youtube.com/embed/${video?.videoId}`}
    ></iframe>
  ) : (
    <div
      className="w-full h-[75vh] opacity-100 hover:opacity-60 bg-cover relative"
      style={{
        backgroundImage: `url("https://img.youtube.com/vi/${video?.videoId}/maxresdefault.jpg")`,
      }}
      onClick={() => markAsViwed()}
    >
      <button aria-label="play video">
        <BiPlayCircle className="play-icon" />
      </button>
      <div
        className="h-32 absolute bottom-0 w-full"
        style={{
          backgroundImage:
            "linear-gradient(180deg,transparent,rgba(37,37,37,.61),#2d2d2d)",
        }}
      />
    </div>
  );
};
