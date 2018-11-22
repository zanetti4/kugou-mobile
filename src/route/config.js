import NewSong from '../views/new-song/new-song';
import Rank from '../views/rank/rank';
import RankInfo from '../views/rank/rank-info/rank-info';
import Plist from '../views/plist/plist';
import PlistInfo from '../views/plist/plist-info/plist-info';
import Singer from '../views/singer/singer';
import SingerList from '../views/singer/singer-list/singer-list';

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
        component: Plist,
        info: {order: 2}
    },
    {
        path: '/singer',
        title: '歌手',
        component: Singer,
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
        title: '榜单信息',
        component: RankInfo
    },
    {
        path: '/plist/list/:id',
        title: '歌单信息',
        component: PlistInfo
    },
    {
        path: '/singer/list/:id',
        title: '歌手列表',
        component: SingerList
    },
    {
        path: '/singer/info/:id',
        title: '歌手信息'
    }
];

export default [...topNav, search, ...second];