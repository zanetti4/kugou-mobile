# kugou-mobile

## 前言
这是我第一次用 *react* 框架做项目，之前用 *vue* 做了 cnode，对于模块化开发稍微熟悉了一点儿，希望这次能更高效地完成。

## 技术栈
``` bash
react16.6.0: 构建项目，属于底层框架。
react-dom: 这个软件包提供了针对DOM的方法。
antd-mobile: 一个基于 Preact / React / React Native 的 UI 组件库。
react-router-dom: 声明的 React 路由。
Axios: http请求模块。
http-proxy-middleware: node.js 设置代理的中间件。
```

## 路由设计及功能
- NewSong: 新歌页即首页，焦点图，展示歌曲列表。
- Rank: 排行页，展示各类排行榜。
    - RankList: 某类排行页，展示类别大图和有序歌曲列表，前3名高亮。
- Plist: 歌单页，展示各类歌单。
    - PlistInfo: 歌单信息页，展示该类歌单大图、歌曲列表，歌单介绍有展开、收起效果。
- Singer: 歌手页，展示各类歌手。
    - SingerList: 歌手列表页，展示该类的歌手列表。
    - SingerInfo: 歌手信息页，展示歌手照片、歌曲列表，歌手介绍有展开、收起效果。
- Search: 搜索页，默认展示“最近热门”关键词，点击即可对其进行搜索。也可以输入歌曲名搜索，展示结果数和歌曲列表。
- 点击歌曲列表的歌曲，显示底部播放层进行播放，点击播放层，可以显示播放器。如果不想听歌了，还可以将播放层隐藏。还能下载。歌曲列表有无限加载功能。
- 在4个顶部导航对应的一级路由页面，可以点击顶部导航进行选项卡切换。
- 在二级路由页面和搜索页，顶部导航变为类别名或歌手名，还有后退按钮。只有歌手类别和搜索是白底色，其余为透明。

## 心得体会&技术难点
1. 本地图片在页面中不显示。  
**解决办法：**  
用 *require* 的方式引入图片。
```javascript
<img alt="logo" src={require("../../assets/images/top-logo.png")} />
```
2. 为了解决跨域问题，在 *package.json* 设置代理时，*proxy* 不能是对象。  
**解决办法：**  
设置代理不写在 *package.json*，先安装模块 *http-proxy-middleware*，在 *src* 同级目录新建文件 *setupProxy.js*，代理写在这里。

## 安装

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
