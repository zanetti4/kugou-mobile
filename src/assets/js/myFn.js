//获取非行间样式
export const getStyle = (obj, name) => {
    if (obj.currentStyle){ //ie
        return obj.currentStyle[name];
    }
    else {
        return getComputedStyle(obj, false)[name]; //firefox
    }
};

//补零
export const addZero = (num) => {
    return num = num < 10 ? ('0'+num) : num;
};

//秒转时间
export const convertSecond = (seconds) => {
    let minute = parseInt(seconds/60);
    let second = Math.floor(seconds%60);

    return `${addZero(minute)}:${addZero(second)}`;
};

export default {getStyle, convertSecond};