import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="">
      <nav className="fixed top-0 h-[6vh] px-5 w-full flex justify-between items-center">
        <div>
          <h1 className="text-lg">Nova Stream</h1>
        </div>
        <p>All Events</p>
        <p>Playlists</p>
        <p>History</p>
        <input type="text" className="rounded-lg py-1 px-2 border" />
        <p>Login</p>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
