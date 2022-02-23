import { useVideo } from "../hooks/useVideo";
import { Loading } from "../components/Loading";
import { LatestVideoCard } from "../components/VideoCards/LatestVideoCard";
import ScrollContainer from "react-indiana-drag-scroll";

export const LatestVideoListing = () => {
  const { videoList, loading } = useVideo();
  const latestVideos = videoList.filter((video) => video.isLatest);

  return (
    <div className="border-b border-gray-500">
      <p className="font-semibold text-2xl ml-4">Latest on Nova Stream</p>
      <ScrollContainer className="flex justify-start ">
        {loading ? (
          <Loading />
        ) : (
          latestVideos.map((video) => (
            <LatestVideoCard key={video._id} {...video} />
          ))
        )}
      </ScrollContainer>
    </div>
  );
};
