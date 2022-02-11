import { Link } from "react-router-dom";
import { truncate } from "../../utils/utility";

export const LatestVideoCard = ({
  videoId,
  description,
  title,
  owner,
  _id,
}) => {
  return (
    <Link to={`/videos/${_id}`}>
      <div className="flex justify-between m-4 shadow-md">
        <img
          src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
          alt="thumbnail"
          className="h-[120px] w-[350px] object-cover rounded-xl mr-8"
        />
        <div className="flex flex-col items-start w-3/4">
          <p className="text-gray-300">{owner}</p>{" "}
          <p className="text-lg font-medium">{truncate(title, 15)}</p>{" "}
          <p className="text-xs text-gray-300">{truncate(description, 80)}</p>{" "}
        </div>
      </div>
    </Link>
  );
};
