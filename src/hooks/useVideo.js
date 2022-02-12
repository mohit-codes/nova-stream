import { useContext, useState, useEffect } from "react";
import { VideoDataContext } from "../contexts/videoContext";
import { BASE_URL } from "../utils/utility";
import axios from "axios";

export const useVideo = () => {
  const { videoList, setVideoList } = useContext(VideoDataContext);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    setLoading(true);
    const { data } = await axios.get(`${BASE_URL}/video/all`);
    setVideoList(data.videos);
    setLoading(false);
  };

  const fetchSingleVideo = async (id) => {
    setLoading(true);
    const { data } = await axios.get(`${BASE_URL}/video/${id}`);
    setLoading(false);
    return data;
  };

  useEffect(() => {
    (async () => await fetchVideos())();
  }, []);

  return { videoList, loading, fetchSingleVideo };
};
