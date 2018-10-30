import axios from 'axios';

let baseUrl = '/kugou';

let instance = axios.create({
    baseURL: baseUrl,
    transformResponse(data){
        if(!data){
            //数据没拿到
            return;
        }

        if(typeof data === 'string'){
            //数据是字符串
            data = JSON.parse(data);
        }

        let o = {};

        if(data.list){
            o.data = data.list;
            o.origin = 'singer';
        } else if (data.banner) {
            o.data = data.data;
            o.banner = data.banner
            o.origin = 'home'
        } else if (data.rank) {
            o.data = data.rank.list;
            o.origin = 'rank'
        } else if (data.plist) {
            o.data = data.plist.list.info;
            o.origin = 'plist'
        } else if (data.singers) {
            o.data = data.singers.list.info;
            o.origin = 'singers-list'
        } else if (data.songs) {
            o.data = data.songs.list;
            o.info = data.info;
            o.origin = 'singers-info'
        }

        return o;
    }
});

let request = (path) => {
    return instance(path).catch(error => {
        if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }

        console.log(error.config);      
    });
};

//获取新歌页数据
export const getNewSongData = () => {
    return request('/?json=true');
};

// 获取排行数据
export const getRankList = () => {
    return request('/rank/list?json=true');
};

// 获取歌单数据
export const getPlist = () => {
    return request('/plist/index?json=true');
};

// 获取歌手分类数据
export const getSingers = () => {
    return request('/singer/class?json=true');
};

// 根据歌手分类id，获取歌手分类歌手
export const getSingerList = (params = { classid: '' }) => {
    return request(`/singer/list/${params.classid}?json=true`);
};

// 根据歌手id，获取歌手歌曲
export const getSingerInfo = (params = { singerid: '' }) => {
    return request(`/singer/info/${params.singerid}?json=true`);
};

export default {
    getNewSongData,
    getRankList,
    getPlist,
    getSingers,
    getSingerList,
    getSingerInfo
};