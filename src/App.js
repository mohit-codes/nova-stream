import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import {
  AllEvents,
  History,
  Home,
  Login,
  Playlists,
  Signup,
  VideoPage,
  Search,
} from "./pages";

function App() {
  return (
    <div className="min-h-screen m-0 p-0 bg-[#2d2d2d] text-white">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<AllEvents />} />
        <Route path="/videos/:id" element={<VideoPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/playlists" element={<PrivateRoute />}>
          <Route path="/playlists" element={<Playlists />} />
        </Route>
        <Route path="/history" element={<PrivateRoute />}>
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
