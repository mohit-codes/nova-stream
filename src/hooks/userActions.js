import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../contexts";
import { BASE_URL } from "../utils/utility";
import { useAuth } from "./useAuth";

export const userActions = () => {
  const { user } = useAuth();
  const {
    userData: { liked, history, playlists },
    userDispatch,
  } = useContext(UserDataContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPlaylists = async () => {
    if (user?._id) {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/playlist`);
      setLoading(false);
      return data.playlists;
    }
    navigate("/login", { replace: true });
  };

  const fetchHistory = async () => {
    if (user?._id) {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/user/history`);
      setLoading(false);
      return data.history;
    }
    navigate("/login", { replace: true });
  };

  const fetchLikedVideos = async () => {
    if (user?._id) {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/user/liked`);
      setLoading(false);
      return data.videos;
    }
    navigate("/login", { replace: true });
  };

  const isVideoAlreadyLiked = (_id) => liked.some((item) => item === _id);

  const isVideoAlreadyInHistory = (_id) => history.some((item) => item === _id);

  const isVideoAlreadyInPlaylist = (name, _id) =>
    playlists.some((playlist) => {
      if (playlist.name === name) {
        return playlist.videos.some((id) => id === _id);
      }
    });

  const addToLikedVideos = async (id) => {
    if (user?._id && !isVideoAlreadyLiked(id)) {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/user/liked/add/${id}`);
      if (data.success) {
        userDispatch({
          type: "LIKE_VIDEO",
          payload: { id },
        });
      }
      setLoading(false);
      return;
    }
    navigate("/login", { replace: true });
  };

  const removeFromLikedVideos = async (id) => {
    if (user?._id && isVideoAlreadyLiked(id)) {
      setLoading(true);
      const { data } = await axios.put(`${BASE_URL}/user/liked/remove/${id}`);
      if (data.success) {
        userDispatch({
          type: "UNLIKE_VIDEO",
          payload: { id },
        });
      }
      setLoading(false);
      return;
    }
    navigate("/login", { replace: true });
  };

  const addToHistory = async (id) => {
    if (user?._id && !isVideoAlreadyInHistory(id)) {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/user/history/add/${id}`);
      if (data.success) {
        userDispatch({
          type: "ADD_TO_HISTORY",
          payload: { id },
        });
      }
      setLoading(false);
      return;
    }
    navigate("/login", { replace: true });
  };

  const resetHistory = async () => {
    if (user?._id) {
      setLoading(true);
      const { data } = await axios.delete(`${BASE_URL}/user/history/delete`);
      if (data.success) {
        userDispatch({
          type: "CLEAR_HISTORY",
        });
      }
      setLoading(false);
      return;
    }
    navigate("/login", { replace: true });
  };

  const addToPlaylist = async (playlist, videoId) => {
    if (user?._id) {
      if (!isVideoAlreadyInPlaylist(playlist.name, videoId)) {
        setLoading(true);
        const { data } = await axios.post(
          `${BASE_URL}/playlist/${playlist._id}/add/${videoId}`
        );
        if (data.success) {
          userDispatch({
            type: "ADD_TO_PLAYLIST",
            payload: { id: playlist._id, video: videoId },
          });
        }
        setLoading(false);
        return;
      }
    } else {
      navigate("/login", { replace: true });
    }
  };
  const removeFromPlaylist = async (playlist, videoId) => {
    if (user?._id) {
      if (isVideoAlreadyInPlaylist(playlist.name, videoId)) {
        setLoading(true);
        const { data } = await axios.post(
          `${BASE_URL}/playlist/${playlist._id}/remove/${videoId}`
        );
        if (data.success) {
          userDispatch({
            type: "REMOVE_FROM_PLAYLIST",
            payload: { id: playlist._id, video: videoId },
          });
        }
        setLoading(false);
        return;
      }
    } else {
      navigate("/login", { replace: true });
    }
  };

  const createPlaylist = async (name, id) => {
    if (user?._id) {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/playlist/new`, { name });
      if (data.success) {
        userDispatch({
          type: "CREATE_PLAYLIST",
          payload: { playlist: data.playlist },
        });
      }
      if (id) {
        await addToPlaylist(data.playlist._id, id);
      }
      setLoading(false);
      return;
    }
    navigate("/login", { replace: true });
  };

  const deletePlaylist = async (id) => {
    if (user?._id) {
      setLoading(true);
      const { data } = await axios.delete(`${BASE_URL}/playlist/delete/${id}`);
      if (data.success) {
        userDispatch({
          type: "DELETE_PLAYLIST",
          payload: { id },
        });
      }
      setLoading(false);
      return;
    }
    navigate("/login", { replace: true });
  };

  return {
    fetchPlaylists,
    fetchHistory,
    loading,
    isVideoAlreadyInHistory,
    isVideoAlreadyLiked,
    fetchLikedVideos,
    addToLikedVideos,
    addToHistory,
    removeFromLikedVideos,
    resetHistory,
    isVideoAlreadyInPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    createPlaylist,
    deletePlaylist,
    playlists,
  };
};
