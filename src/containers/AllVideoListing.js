import { LatestVideoListing } from "./LatestVideoListing";
import { NormalVideoListing } from "./NormalVideoListing";
import { useVideo } from "../hooks/useVideo";

export const AllVideoListing = () => {
  const { videoList } = useVideo();

  const videosFromApple = videoList.filter((video) => video.owner === "Apple");
  const videosFromSamsung = videoList.filter(
    (video) => video.owner === "Samsung"
  );
  const videosFromMicrosoft = videoList.filter(
    (video) => video.owner === "Microsoft"
  );
  const videosFromGoogle = videoList.filter(
    (video) => video.owner === "Google"
  );

  return (
    <div>
      <LatestVideoListing />
      <NormalVideoListing videos={videosFromApple} />
      <NormalVideoListing videos={videosFromSamsung} />
      <NormalVideoListing videos={videosFromMicrosoft} />
      <NormalVideoListing videos={videosFromGoogle} />
    </div>
  );
};
