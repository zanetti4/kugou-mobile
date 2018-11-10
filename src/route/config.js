import NewSong from '../views/new-song/new-song';
import Rank from '../views/rank/rank';
import RankInfo from '../views/rank/rank-info/rank-info';

export let topNav = [
    {
        path: '/',
        title: '新歌',
        component: NewSong,
        info: {order: 0}
    },
    {
        path: '/rank',
        title: '排行',
        component: Rank,
        info: {order: 1}
    },
    {
        path: '/plist',
        title: '歌单',
        info: {order: 2}
    },
    {
        path: '/singer',
        title: '歌手',
        info: {order: 3}
    }
];

export let search = {
    path: '/search',
    title: '搜索'
};

export let second = [
    {
        path: '/rank/list/:id',
        title: '榜单',
        component: RankInfo,
    },
    {
        path: '/plist/list/:id',
        title: '歌单信息'
    },
    {
        path: '/singer/list/:id',
        title: '歌手列表'
    },
    {
        path: '/singer/info/:id',
        title: '歌手信息'
    }
];

export default [...topNav, search, ...second];