import { Link, Route, Routes } from "react-router-dom";
import { AllEvents } from "./pages/AllEvents";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { VideoPage } from "./pages/VideoPage";

function App() {
  return (
    <div className="min-h-screen m-0 p-0 bg-[#2d2d2d] text-white">
      <nav className="z-10 fixed top-0 h-[6vh] px-5 w-full flex justify-between items-center bg-transparent text-white border-b border-slate-500">
        <div>
          <p className="text-lg font-medium">Nova Stream</p>
        </div>
        <Link to="/videos">All Events</Link>
        <p>Playlists</p>
        <p>History</p>
        <input
          type="text"
          className="rounded-full py-1 px-2 border bg-transparent border-slate-500"
        />
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<AllEvents />} />
        <Route path="/videos/:id" element={<VideoPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
