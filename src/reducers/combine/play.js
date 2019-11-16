export default function play(state = {}, action) {
  switch (action.type) {
    case 'play':
      return {
        ...state,
        play: {
          isPlay: action.isPlay,
          hash: action.hash,
          songList: action.songList
        }
      };

      break;
    default:
      return state;
  }
};