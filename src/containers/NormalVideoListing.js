import { useVideo } from "../hooks/useVideo";
import { Loading } from "../components/Loading";
import ScrollContainer from "react-indiana-drag-scroll";
import { VideoCard } from "../components/VideoCards/VideoCard";

export const NormalVideoListing = ({ title, showTitle = true, videos }) => {
  const { loading } = useVideo();

  return (
    <div className="border-b border-gray-400 py-4">
      {showTitle ? (
        <p className="font-semibold text-2xl ml-4">{`From ${videos[0]?.owner}`}</p>
      ) : (
        <p className="font-semibold text-2xl ml-4">{`More from ${title}`}</p>
      )}
      <ScrollContainer className="flex justify-start items-start">
        {loading ? (
          <Loading />
        ) : (
          videos.map((video) => <VideoCard key={video._id} {...video} />)
        )}
      </ScrollContainer>
    </div>
  );
};
