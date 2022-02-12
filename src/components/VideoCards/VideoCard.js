import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillPlayCircle } from "react-icons/ai";

export const VideoCard = ({ owner, _id, videoId, title }) => {
  const [isCardHover, setIsCardHover] = useState(false);
  return (
    <div
      className="video-card rounded-xl relative"
      onMouseEnter={() => setIsCardHover(true)}
      onMouseLeave={() => setIsCardHover(false)}
    >
      <Link to={`/videos/${_id}`} className="normalVideoCard__link">
        <img
          src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
          alt="video-cover"
          className="m-4 object-cover h-36 w-64 rounded-xl shadow-md"
          style={{ opacity: isCardHover ? "0.5" : "1" }}
        />
        <div
          className="absolute top-6 left-8 text-sm bg-black rounded-lg bg-opacity-50 py-1 px-2"
          style={{ opacity: isCardHover ? "1" : "0" }}
        >
          {owner}
        </div>
        <AiFillPlayCircle
          className="absolute top-14 left-28"
          size="50"
          style={{ opacity: isCardHover ? "1" : "0" }}
        />
        <div
          className="absolute bottom-6 left-8 text-sm bg-black rounded-lg bg-opacity-50 py-1 px-2"
          style={{ opacity: isCardHover ? "1" : "0" }}
        >
          {title}
        </div>
      </Link>
    </div>
  );
};
