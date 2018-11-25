export default function(state = {}, action){
    switch(action.type){
        case 'updateMainPt':
            return {
                ...state,
                mainPt: action.mainPt
            };

            break;
        case 'play':
            return {
                ...state,
                isPlay: action.isPlay,
                hash: action.hash,
                songList: action.songList
            };

            break;
        case 'showPlayer':
            return {
                ...state,
                isShowPlayer: action.isShowPlayer
            };

            break;
        case 'saveSongName':
            return {
                ...state,
                songName: action.songName
            };

            break;
        case 'saveTitleName':
            return {
                ...state,
                titleName: action.titleName
            };

            break;
        case 'changeLoading':
            return {
                ...state,
                isLoading: action.isLoading
            };

            break;
        case 'judgeResult':
            return {
                ...state,
                hasResult: action.hasResult
            };

            break;
        default:
            return state;
    }
};