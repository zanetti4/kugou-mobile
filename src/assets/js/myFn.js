//获取非行间样式
export const getStyle = (obj, name) => {
    if (obj.currentStyle){ //ie
        return obj.currentStyle[name];
    }
    else {
        return getComputedStyle(obj, false)[name]; //firefox
    }
};

export default {getStyle};