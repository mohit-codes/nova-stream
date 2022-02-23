import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { SearchField } from "./SearchField";

export const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="z-10 fixed top-0 h-[6vh] px-5 w-full flex justify-between items-center bg-transparent text-white border-b border-slate-500">
      <div>
        <Link to="/" className="text-lg font-medium">
          Nova Stream
        </Link>
      </div>
      <Link to="/videos">All Events</Link>
      <Link to="/playlists">Playlists</Link>
      <Link to="/history">History</Link>
      <SearchField />
      {user?._id ? (
        <button onClick={() => logout()}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};
