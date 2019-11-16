export default function others(state = {}, action) {
  switch (action.type) {
    case 'updateMainPt':
      return {
        ...state,
        others: {
          mainPt: action.mainPt
        }
      };

      break;
    case 'showPlayer':
      return {
        ...state,
        others: {
          isShowPlayer: action.isShowPlayer
        }
      };

      break;
    case 'saveSongName':
      return {
        ...state,
        others: {
          songName: action.songName
        }
      };

      break;
    case 'saveTitleName':
      return {
        ...state,
        others: {
          titleName: action.titleName
        }
      };

      break;
    case 'changeLoading':
      return {
        ...state,
        others: {
          isLoading: action.isLoading
        }
      };

      break;
    case 'judgeResult':
      return {
        ...state,
        others: {
          hasResult: action.hasResult
        }
      };

      break;
    case 'saveTitlePlay':
      return {
        ...state,
        others: {
          pageTitlePlay: action.pageTitlePlay
        }
      };

      break;
    default:
      return state;
  }
};