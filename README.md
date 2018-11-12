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
- Search: 搜索页，默认展示“最近热门”关键词，点击即可对其进行搜索。也可以输入歌曲名搜索，展示结果数和歌曲列表。
- 点击歌曲列表的歌曲，显示底部播放层进行播放，点击播放层，可以显示播放器。歌曲列表有无限加载功能。
- 在4个顶部导航对应的一级路由页面，可以点击顶部导航进行选项卡切换。
- 在二级路由页面、搜索页和显示大播放器时，顶部导航变为类别名、歌手名或歌名，还有后退按钮，底色为白色。

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
在卸载组件的时候对所有的异步操作进行清除。比如用 *axios* 发的请求。
```javascript
componentWillUnmount(){
    var CancelToken = axios.CancelToken;
    var source = CancelToken.source();
    
    source.cancel('组件销毁时取消请求。');
}
```

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
