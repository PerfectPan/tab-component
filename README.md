# Tab-component

## Tab组件默认配置

```js
const OPTIONS = {
    tabContainer: 'tab-container', // 最外层的容器class名
    tabNavbar: 'tab-navbar', // 标签页class名 
    tabNavbarActive: 'tab-navbar-active', // 标签激活页class名
    tabContent: 'tab-content', // 标签内容class名
    tabContentActive: 'tab-content-active', // 标签激活内容class名
    activeIndex: 0 // 初始激活下标
};
```

### 使用指南

- html结构搭好，对应的标签写上对应的class名，具体可见tab.html里的内容

- 导入Tab组件`import Tab from 'tab.js的地址'`

- `new Tab()`，可以传入你想修改的配置对象，因为样式写的不是很好，所以支持自己写出样式后传入自己的class名，key要与配置保持一致

- 支持添加active的自定义事件和移除自定义事件，handler函数接受一个对象，里面的参数为type(类型)、targetIndex(激活下标)、targetElement(激活标签)、targetContent(激活的内容)

  ```js
  let tab = new Tab();
  tab.addHandler(type, handler); 
  tab.removeHandler(type, handler);
  ```

### Tips
- 由于因为奇怪的原因，chrome或是火狐浏览器用import的时候会有跨域的问题，所以请本地搭一个环境运行，最简单的就是使用live-server
- 安装：
	- 请先确保安装了npm
	- 输入`npm install -g live-server`
	- 进入到目标文件夹输入`live-server`即可
