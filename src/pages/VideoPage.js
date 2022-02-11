import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Loading } from "../components/Loading";
import { useVideo } from "../hooks/useVideo";
import { VideoSection } from "../containers/VideoSection";
import { NormalVideoListing } from "../containers/NormalVideoListing";

export const VideoPage = () => {
  const { id } = useParams();
  const { fetchSingleVideo, loading, videoList } = useVideo();
  const [video, setVideo] = useState();
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
          <div className="flex ">
            <div className="w-1/2">
              <h2 className="m-4 text-xl font-semibold">{video?.title}</h2>
              <p className="m-4">{video?.description}</p>
            </div>
          </div>
          <NormalVideoListing
            videos={filteredByOrg}
            title={video?.owner}
            showTitle={false}
          />
        </div>
      )}
    </div>
  );
};
