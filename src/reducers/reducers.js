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
        default:
            return state;
    }
};