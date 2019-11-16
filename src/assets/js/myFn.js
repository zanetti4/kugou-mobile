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

var mo = function(e){e.preventDefault()};
//禁止页面滚动
export const stop = () => {
    document.body.style.overflow='hidden';
    document.addEventListener("touchmove",mo, {passive: false});
};

//取消禁止页面滚动
export const move = () => {
    document.body.style.overflow='';//出现滚动条
    document.removeEventListener("touchmove",mo, {passive: false});
};

//判断元素是否在可视区
export const isView = (el) => {
    var viewT = el.getBoundingClientRect().top; // 到可视区上边的距离
    var h = document.documentElement.clientHeight;

    viewT = viewT < 0 ? el.offsetHeight + viewT : viewT;
    return viewT < 0 ? false : viewT < h;
};

export default {getStyle, convertSecond, stop, move, isView};