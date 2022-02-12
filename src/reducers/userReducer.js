export const userReducer = (state, action) => {
  switch (action.type) {
    case "LIKE_VIDEO":
      return {
        ...state,
        liked: [action.payload.id, ...state.liked],
      };

    case "UNLIKE_VIDEO":
      return {
        ...state,
        liked: state.liked.filter((id) => id !== action.payload.id),
      };

    case "INITIALIZE_DATA":
      return {
        playlists: action.payload.playlists,
        history: action.payload.history,
        liked: action.payload.liked,
      };

    case "CREATE_PLAYLIST":
      return {
        ...state,
        playlists: [...state.playlists, { ...action.payload.playlist }],
      };

    case "DELETE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlist) => playlist._id !== action.payload.id
        ),
      };

    case "ADD_TO_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((playlist) => {
          if (playlist._id === action.payload.id) {
            return {
              ...playlist,
              videos: [...playlist.videos, action.payload.video],
            };
          } else {
            return playlist;
          }
        }),
      };

    case "REMOVE_FROM_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((playlist) => {
          if (playlist._id === action.payload.id) {
            return {
              ...playlist,
              videos: playlist.videos.filter(
                (video) => video !== action.payload.video
              ),
            };
          } else {
            return playlist;
          }
        }),
      };

    case "ADD_TO_HISTORY":
      return {
        ...state,
        history: [...state.history, action.payload.id],
      };

    case "CLEAR_HISTORY":
      return {
        ...state,
        history: [],
      };
    case "ERASE":
      return {
        liked: [],
        history: [],
        playlists: [],
      };
  }
};
