export default function(state = {}, action){
    switch(action.type){
        case 'updateMainPt':
            return {
                ...state,
                mainPt: action.mainPt
            };

            break;
        default:
            return state;
    }
};