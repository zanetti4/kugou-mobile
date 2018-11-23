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

        // console.log(data);

        let o = {};

        if(data.__Tpl === 'plist/list.html'){
            //歌单信息页
            o.data = data.list.list.info;
            o.info = data.info.list;
            o.origin = 'plist-info';
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
            //歌手列表
            o.data = data.singers.list.info;
            o.total = data.singers.total;
            o.classname = data.classname;
            o.origin = 'singers-list';
        } else if (data.songs) {
            o.data = data.songs.list;
            o.info = data.info;
            o.origin = 'singers-info'
        } else if(data.__Tpl === 'singer/class.html'){
            //歌手
            o.data = data.list;
            o.origin = 'singer';
        }

        return o;
    }
});

let requestMp3 = axios.create({baseURL: baseUrl});
//发送 get 请求
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
export const getPlist = (page = 1) => {
    return request(`/plist/index?json=true&page=${page}`);
};

// 获取歌手分类数据
export const getSingers = () => {
    return request('/singer/class?json=true');
};

// 根据歌手分类id，获取歌手分类歌手
export const getSingerList = (params = { 
    classid: '',
    page: 1
 }) => {
    return request(`/singer/list/${params.classid}?json=true&page=${params.page}`);
};

// 根据歌手id，获取歌手信息
export const getSingerInfo = (params = { 
    singerId: '',
    page: 1
}) => {
    return request(`/singer/info/${params.singerId}?json=true&page=${params.page}`);
};

//根据榜单 id，获取榜单信息
export const getRankInfo = (rankId = '', page = 1) => {
    return request(`/rank/info/${rankId}?json=true&page=${page}`);
};

//根据歌单 id，获取歌单信息
export const getPlistInfo = (params = {
    plistId: '', 
    page: 1
}) => {
    return request(`/plist/list/${params.plistId}?json=true&page=${params.page}`);
};

//获取歌曲详细信息
export const getSongInfo = (hash = '') => {
    return requestMp3('/app/i/getSongInfo.php', {
        responseType: 'json',
        params: {
            cmd: 'playInfo',
            hash,
            from: 'mkugou'
        }
    });
};

//获取歌词
export const getLyric = (params = {
    hash: '',
    keyword: '',
    timelength: 0
}) => {
    return requestMp3('/app/i/krc.php', {
        params: {
            cmd: 100,
            hash: params.hash,
            keyword: params.keyword,
            timelength: params.timelength
        }
    });
};

var CancelToken = axios.CancelToken;
var source = CancelToken.source();

export const cancelRequest = () => {
    source.cancel('组件销毁时取消请求。');
};

export default {
    getNewSongData,
    getRankList,
    getPlist,
    getSingers,
    getSingerList,
    getSingerInfo,
    getSongInfo,
    getLyric,
    getRankInfo,
    getPlistInfo,
    cancelRequest
};