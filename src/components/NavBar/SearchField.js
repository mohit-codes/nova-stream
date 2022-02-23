import { Link, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";

export const SearchField = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearchText("");
      navigate("/search", { state: { searchText } });
    }
  };

  return (
    <div className="rounded-2xl bg-white bg-opacity-10 w-72 flex items-center px-3">
      <input
        type="text"
        className="py-1 bg-transparent focus:outline-none w-full"
        onKeyPress={handleSearchKeyPress}
        value={searchText}
        onChange={({ target }) => setSearchText(target.value)}
      />
      <Link
        to="/search"
        state={{ searchText }}
        onClick={() => setSearchText("")}
      >
        <BiSearch />
      </Link>
    </div>
  );
};
