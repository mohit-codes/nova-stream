import { useState } from "react";
import { InputBox } from "../FromComponents";
import { userActions } from "../../hooks/userActions";
import { ImSpinner } from "react-icons/im";

export const CreatePlaylist = ({
  setShowCreatePlaylist,
  showCreatePlaylist,
  videoId,
  setShowModal,
}) => {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const { createPlaylist, loading } = userActions();

  const createPlaylistAndAddVideo = async (e) => {
    e.preventDefault();
    await createPlaylist(newPlaylistName, videoId);
    setShowCreatePlaylist(false);
    setShowModal(false);
  };
  return (
    <div>
      <form onSubmit={createPlaylistAndAddVideo}>
        <InputBox
          id="name"
          showLabel={false}
          placeholder="Enter playlist name"
          value={newPlaylistName}
          callback={({ target }) => setNewPlaylistName(target.value)}
        />
        <button
          disabled={loading || newPlaylistName === ""}
          className="w-full flex justify-center rounded-md py-2 bg-white text-black font-bold my-2"
        >
          {loading ? <ImSpinner className="text-2xl animate-spin" /> : "Save"}
        </button>
      </form>
      {showCreatePlaylist && (
        <button
          disabled={loading}
          onClick={() => {
            setShowCreatePlaylist(false);
            setNewPlaylistName("");
          }}
          className="w-full rounded-md py-2 text-red-500 border border-red-500 font-bold my-2"
        >
          Cancel
        </button>
      )}
    </div>
  );
};
