import { useState } from "react";
import { AiFillApple } from "react-icons/ai";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaMicrosoft } from "react-icons/fa";
import { SiSamsung } from "react-icons/si";
import { FaServicestack } from "react-icons/fa";
import { MdVideoLabel } from "react-icons/md";
import { useVideo } from "../hooks/useVideo";
import { VideoCard } from "../components/VideoCards/VideoCard";

export const AllEvents = () => {
  const { videoList } = useVideo();
  const [filterBy, setFilterBy] = useState("All");

  const [videosToBeMapped, setVideosToBeMapped] = useState(videoList);

  const filters = [
    {
      title: "All",
      icon: <MdVideoLabel className="organizers-logo" />,
    },
    {
      title: "Apple",
      icon: <AiFillApple className="organizers-logo" />,
    },
    {
      title: "Google",
      icon: <AiFillGoogleCircle className="organizers-logo" />,
    },
    {
      title: "Microsoft",
      icon: <FaMicrosoft className="organizers-logo" />,
    },
    {
      title: "Samsung",
      icon: <SiSamsung className="organizers-logo" />,
    },
    {
      title: "CES",
      icon: <FaServicestack className="organizers-logo" />,
    },
  ];

  const filterVideos = (filter) => {
    setFilterBy(filter);
    if (filter !== "All") {
      setVideosToBeMapped(videoList.filter((video) => video.owner === filter));
    } else {
      setVideosToBeMapped(videoList);
    }
  };

  return (
    <div className="pt-20">
      <div className="flex w-2/3 mx-auto justify-between">
        {filters.map(({ title, icon }, index) => (
          <div
            key={index}
            onClick={() => filterVideos(title)}
            style={
              filterBy === title
                ? { backgroundColor: "white", color: "black" }
                : { backgroundColor: "transparent", color: "white" }
            }
            className="flex items-center space-x-2 rounded-full py-1 px-3 border-2 border-white cursor-pointer"
          >
            {icon} <span>{title}</span>
          </div>
        ))}
      </div>
      <div className="pt-16 ml-10 grid grid-cols-4">
        {videosToBeMapped.map((video) => (
          <VideoCard {...video} key={video._id} />
        ))}
      </div>
    </div>
  );
};
