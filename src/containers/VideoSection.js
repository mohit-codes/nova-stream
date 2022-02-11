import { useState } from "react";
import { BiPlayCircle } from "react-icons/bi";
import YouTube from "react-youtube";

export const VideoSection = ({ video }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return isVideoPlaying ? (
    <YouTube
      id={video?.videoId}
      opts={{
        playerVars: {
          autoplay: 1,
        },
      }}
      className="w-full h-[75vh]"
    />
  ) : (
    <div
      className="w-full h-[75vh] opacity-100 hover:opacity-60 bg-cover relative"
      style={{
        backgroundImage: `url("https://img.youtube.com/vi/${video?.videoId}/maxresdefault.jpg")`,
      }}
      onClick={() => setIsVideoPlaying(true)}
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
