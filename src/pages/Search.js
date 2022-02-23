/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { VideoCard } from "../components/VideoCards/VideoCard";
import { useVideo } from "../hooks/useVideo";

export const Search = () => {
  const location = useLocation();
  const searchText = location?.state?.searchText?.toLowerCase();
  const { videoList } = useVideo();
  const [filteredVideos, setFilteredVideos] = useState(videoList);

  useEffect(() => {
    setFilteredVideos(
      videoList.filter(
        (video) =>
          video?.title?.toLowerCase()?.includes(searchText) ||
          video?.owner?.toLowerCase()?.includes(searchText) ||
          video?.description?.toLowerCase()?.includes(searchText)
      )
    );
  }, [searchText]);

  return (
    <div className="pt-[7vh]">
      <h1 className="text-2xl ml-16 my-2 font-semibold">{`Search Results for ${searchText}`}</h1>
      <div className="pt-5 ml-10 grid grid-cols-4">
        {filteredVideos?.length === 0 && (
          <h2 className="font-medium ml-6">Nothing to show</h2>
        )}
        {filteredVideos?.length > 0 &&
          filteredVideos?.map((video) => (
            <VideoCard {...video} key={video._id} />
          ))}
      </div>
    </div>
  );
};
