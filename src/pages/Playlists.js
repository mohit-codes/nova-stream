import { useEffect, useState } from "react";
import { userActions } from "../hooks/userActions";
import { NormalVideoListing } from "../containers/NormalVideoListing";
import { Loading } from "../components/Loading";

export const Playlists = () => {
  const { fetchPlaylists, loading, fetchLikedVideos } = userActions();
  const [playlists, setPlaylists] = useState([]);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    (async () => {
      const responsePlaylists = await fetchPlaylists();
      const responseLiked = await fetchLikedVideos();
      setPlaylists(responsePlaylists);
      setLiked(responseLiked);
    })();
  }, []);

  const noPlaylist = playlists.length < 1;
  const likedVideoCount = liked.length < 1;

  return (
    <div className="pt-[10vh]">
      {loading ? (
        <Loading />
      ) : (
        <div>
          {noPlaylist && <p className="text-center w-full">No Playlists</p>}
          {!noPlaylist &&
            playlists.map((playlist) => {
              return (
                playlist.videos.length > 0 && (
                  <div key={playlist._id}>
                    <p className="font-semibold text-2xl ml-4">
                      {playlist.name}
                    </p>
                    <NormalVideoListing
                      videos={playlist.videos}
                      dontShowTitle={true}
                    />
                  </div>
                )
              );
            })}
          {!likedVideoCount && (
            <>
              <p className="font-semibold text-2xl ml-4">Liked Videos</p>
              <NormalVideoListing videos={liked} dontShowTitle={true} />
            </>
          )}
        </div>
      )}
    </div>
  );
};
