/* eslint-disable no-unused-vars */
import { useState } from "react";
import { IoClose, IoTrashBin } from "react-icons/io5";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { userActions } from "../../hooks/userActions";
import { CreatePlaylist } from "./CreatePlaylist";

export const PlayListModal = ({ setShowModal, id }) => {
  const { user } = useAuth();
  const {
    playlists,
    addToPlaylist,
    loading,
    isVideoAlreadyInPlaylist,
    removeFromPlaylist,
    deletePlaylist,
  } = userActions();

  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const isUserLoggedIn = user?._id === undefined;

  const deleteHandler = async (id) => {
    await deletePlaylist(id);
  };

  const addHandler = async (e, playlist) => {
    if (e.target.checked) {
      await addToPlaylist(playlist, id);
    } else {
      await removeFromPlaylist(playlist, id);
    }
  };
  return (
    <>
      {isUserLoggedIn && <Navigate to="/login" replace />}
      <div className="absolute h-screen w-full top-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="w-96 bg-black text-white p-4 rounded-md" role="dialog">
          <div className="flex justify-between">
            <p className="text-lg">Save To..</p>
            <button
              onClick={() => setShowModal(false)}
              aria-label="close dialog"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
          <div className="flex flex-col">
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="flex items-center px-5 justify-evenly text-lg"
              >
                <input
                  type="checkbox"
                  onChange={(e) => addHandler(e, playlist)}
                  className="w-4 h-4"
                  disabled={loading}
                  checked={isVideoAlreadyInPlaylist(playlist.name, id)}
                />
                <p className="ml-10">{playlist.name}</p>
                <button
                  className="ml-auto"
                  aria-label="delete playlist"
                  onClick={() => deleteHandler(playlist._id)}
                  disabled={loading}
                >
                  <IoTrashBin />
                </button>
              </div>
            ))}
          </div>
          {!showCreatePlaylist && (
            <button
              onClick={() => setShowCreatePlaylist(true)}
              className="w-full rounded-md py-2 bg-white text-black font-bold my-2"
            >
              Create New Playlist
            </button>
          )}
          {showCreatePlaylist && (
            <CreatePlaylist
              setShowCreatePlaylist={setShowCreatePlaylist}
              showCreatePlaylist={showCreatePlaylist}
              videoId={id}
              setShowModal={setShowModal}
            />
          )}
        </div>
      </div>
    </>
  );
};
