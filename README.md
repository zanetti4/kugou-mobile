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
prop-types: 对 props 进行验证。
redux: JavaScript 状态容器，提供可预测化的状态管理。
react-redux: 将 react 绑定到 redux。
classnames: 有条件地添加类名。
js-cookie: 简单、轻量的操作 cookie 的 js 接口。
fetch-jsonp: 一款跨域数据请求的库文件。
es6-promise: 一款轻量的库文件，提供了管理异步代码的工具。
react-document-title: 在单页面应用中，提供了一个声明式的指定页面标题的方法。
```

## 路由设计及功能
- NewSong: 新歌页即首页，焦点图，展示歌曲列表。
- Rank: 排行页，展示各类排行榜，图片懒加载。
    - RankList: 某类排行页，展示类别大图和有序歌曲列表，前3名高亮。
- Plist: 歌单页，展示各类歌单。
    - PlistInfo: 歌单信息页，展示该类歌单大图、歌曲列表，歌单介绍有展开、收起效果。
- Singer: 歌手页，展示各类歌手。
    - SingerList: 歌手列表页，展示该类的歌手列表。
    - SingerInfo: 歌手信息页，展示歌手照片、歌曲列表，歌手介绍有展开、收起效果。
- Search: 搜索页，默认展示“最近热门”关键词，点击即可对其进行搜索。也可以输入歌名、歌手、拼音进行搜索，展示结果数和歌曲列表。
- 点击歌曲列表的歌曲，显示底部播放层进行播放，点击播放层，可以显示播放器。歌曲列表有无限加载功能。
- 在4个顶部导航对应的一级路由页面，可以点击顶部导航进行选项卡切换。
- 在二级路由页面、搜索页和显示大播放器时，顶部导航变为类别名、歌手名或歌名，还有后退按钮，底色为白色。

## 项目结构
``` bash
│  App.js // 组件总入口
│  index.js // 项目的总入口
│  serviceWorker.js // Web离线应用解决方案
│  setupProxy.js // 设置代理、解决跨域
│  tree.txt // 项目结构
│  
├─assets // 静态文件
│  ├─css // 样式文件
│  │      kugou.css // 通用样式
│  │      
│  ├─iconfont // 图标
│  │      iconfont.eot
│  │      iconfont.svg
│  │      iconfont.ttf
│  │      iconfont.woff
│  │      
│  ├─images // 图片
│  │      search-empty.png
│  │      top-logo.png
│  │      
│  └─js // js 文件
│          myFn.js // 封装的通用方法
│          
├─components // 通用组件
│  │  back-top.js // 回顶部
│  │  intro.js // 可展开收起的介绍
│  │  songs-list.js // 歌曲短列表
│  │  songs.js // // 歌曲长列表
│  │  
│  ├─head // 页头
│  │      head.css
│  │      head.js // 页头
│  │      nav.js // 导航或标题
│  │      top.js // 标志和搜索按钮
│  │      
│  └─player // 播放器
│      │  player-bottom.css
│      │  player-bottom.js // 底部播放器
│      │  
│      └─bigPlayer // 大播放器
│              big-player.css
│              big-player.js // 大播放器
│              controller.js // 控制器
│              lyric.js // 歌词
│              
├─reducers // redux
│      reducers.js
│      
├─route // 路由信息
│      config.js // 路由配置
│      routes.js // 切换路由
│      
├─server // 发送请求
│      api.js // 封装发送请求的函数
│      getData.js // 发送请求返回组件
│      
└─views // 视图
    ├─new-song // 新歌（首页）
    │      carousel.js // 焦点图
    │      new-song.css
    │      new-song.js // 新歌（首页）
    │      
    ├─plist // 歌单
    │  │  plist.css
    │  │  plist.js
    │  │  
    │  └─plist-info // 歌单信息
    │          plist-info-getData.js // 使用 getData 获取数据（尚未解决）
    │          plist-info.css
    │          plist-info.js // 歌单信息
    │          
    ├─rank // 排行
    │  │  rank.css
    │  │  rank.js
    │  │  
    │  └─rank-info // 榜单信息
    │          rank-banner.js // 大图
    │          rank-info.css
    │          rank-info.js // 榜单信息
    │          
    ├─search // 搜索
    │      hot-list.js // 热词列表
    │      search.css
    │      search.js // 搜索
    │      
    └─singer // 歌手
        │  singer.css
        │  singer.js
        │  
        ├─singer-info // 歌手信息
        │      singer-info.js
        │      
        └─singer-list // 歌手列表
                singer-list.css
                singer-list.js
```

## 心得体会&技术难点
> 这是我的第一个 *react* 项目，也是第一次专门做移动端网页，以前只是做响应式页面。有了之前 *vue* 项目的经验，这次稍微容易一点儿，用时也短了一些。个人感觉 react 比 vue 更好掌握，内容少一点儿，没有导航守卫，而且数据是单向传递的。至于 UI 组件库，与之前用到的 *iView* 相比，感觉 *antd-mobile* 还存在一些缺陷，比如：官网的说明有的不够详细，缺少一些常用的组件，组件有一些 bug。不过还是给开发带来了很多便利~
1. 本地图片在页面中不显示。  
**解决办法：**  
用 *require* 的方式引入图片。
```javascript
<img alt="logo" src={require("../../assets/images/top-logo.png")} />
```
2. 为了解决跨域问题，在 *package.json* 设置代理时，*proxy* 不能是对象。  
**解决办法：**  
设置代理不写在 *package.json*，先安装模块 *http-proxy-middleware*，在 *src* 目录下新建文件 *setupProxy.js*，代理写在这里。
3. 非组件的 js 文件如何使用 redux 中的数据？  
**解决办法：**  
可以把 store export 出来，让其它模块可以直接引用。
```javascript
export let store = createStore(reducers, data);
```
4. 以 *unicode* 方式使用 *iconfont* 图标，用状态进行判断时该怎么写？  
**解决办法：**  
给 *unicode* 包一个标签。
```javascript
//判断播放、暂停图标
let iconPlayPause = () => {
    return isPlaying ? <span>&#xe783;</span> : <span>&#xe781;</span>;
};
```
5. 如何让 *iconfont* 图标实现旋转动画？  
**解决办法：**  
利用 css 中的 *animation, keyframes* 进行设置。所需动画的元素应显示为 *block 或 inline-block*。
```css
.playerb-right-load {
    animation: load 2s infinite;
    -webkit-animation: load 2s infinite;
}
@keyframes load {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}
@-webkit-keyframes load {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}
```
6. 如何给元素动态设置样式？  
**解决办法：**  
用 *style* 设置内联样式，而不是 *ref* 获取 dom 元素，再进行设置。操作 dom 耗费性能且容易出错。
7. 如何精确获取 dom 尺寸？  
**解决办法：**  
在用 *clientHeight* 获取元素高度时，取到的值为整数。用 *getComputedStyle()* 方法获取到的值能精确到小数。
8. *render* 应该为一个纯函数，不能写 *setState* 和执行组件的方法，因为组件的方法和外界联系的唯一方式也是 *setState*。
9. *setState* 后无法立刻获取到更新的状态，怎么处理？  
**解决办法：**  
利用回调函数。
```javascript
setState(updater, [callback])
```
10. 组件挂载后执行了异步操作（发了 ajax 请求），切换路由时会报错。*Can't call setState (or forceUpdate) on an unmounted component...*  
**错误原因：**  
因为在组件挂载（mounted）之后进行了异步操作，比如ajax请求或者设置了定时器等，而在callback中进行了setState操作。当切换路由时，组件已经被卸载（unmounted）了，此时异步操作中callback还在执行，因此setState没有得到值。  
**解决办法：**  
    1. 在卸载组件的时候对所有的异步操作进行清除。比如用 *axios* 发的请求。
    ```javascript
    componentWillUnmount(){
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();

        source.cancel('组件销毁时取消请求。');
    }
    ```
    2. 更简单的方式。
    ```javascript
    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        };  
    }
    ```
11. *antd-mobile ListView* 如何处理无限加载？  
**解决办法：**  
在使用长列表的组件中发请求获取数据。如果把请求写在父组件中，通过 *setState* 再把数据传给长列表组件，会导致重新渲染。
12. 如何显示顶部标题？  
**解决办法：**  
在相应页面通过 *match* 或者 *location* 进行显示，不要在点击链接跳转时保存数据，因为到达一个视图的方式有很多（点击链接、地址栏输入）。
13. 如何设置页面标题？  
**解决办法：**  
使用 *react-document-title* 组件，引入方法：
```javascript
import DocumentTitle from 'react-document-title';
```
14. 使用 *combineReducers* 后，*redux* 中的初始数据和 *mapStateToProps* 的参数 *state* 格式变成了什么样？  
**解决办法：**  
格式都变成与 *combineReducers* 参数一样的格式。
```javascript
{
  play: {
    isPlay: 0,
    hash: '',
    songList: [],
  },
  others: {
    mainPt: 0,
    isShowPlayer: false,
    songName: '',
    titleName: '',
    isLoading: true,
    hasResult: true,
    pageTitlePlay: ''
  }
}
```
---
**遗留问题：**  
1. 怎么解决播放音乐时来电的问题？
2. *getData.js* 用来请求数据，在 *export default* 里使用时，怎么将 *match* 信息写在实参里？

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
