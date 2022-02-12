import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { userActions } from "../hooks/userActions";

export const LikeButton = ({ id }) => {
  const {
    isVideoAlreadyLiked,
    addToLikedVideos,
    removeFromLikedVideos,
    loading,
  } = userActions();

  return isVideoAlreadyLiked(id) ? (
    <button
      aria-label="unlike"
      disabled={loading}
      onClick={() => removeFromLikedVideos(id)}
    >
      <AiFillLike className="text-2xl" />
    </button>
  ) : (
    <button
      disabled={loading}
      aria-label="like"
      onClick={() => addToLikedVideos(id)}
    >
      <AiOutlineLike className="text-2xl" />
    </button>
  );
};
