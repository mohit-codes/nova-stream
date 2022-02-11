import { createContext, useState } from "react";

export const VideoDataContext = createContext();

export const VideoDataProvider = ({ children }) => {
  const [videoList, setVideoList] = useState([]);

  return (
    <VideoDataContext.Provider value={{ videoList, setVideoList }}>
      {children}
    </VideoDataContext.Provider>
  );
};
