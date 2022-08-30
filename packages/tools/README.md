# tools

## 1. webpack

从 0 到 1 实践一下 webpack 打包工具, 研究一下其中的原理

### 1.1 webpack 官网

[官网](https://webpack.js.org)

[指引](https://webpack.js.org/guides/)

### 1.2 基础操作

1. 下载依赖项

```shell
# -D 等同于 --save-dev
$ npm i webpack webpack-cli -D
```

2. 写点代码（watchstop）

> [onclick & addEventListener 区别](https://zhuanlan.zhihu.com/p/37268369)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>tools</title>
</head>
<body>
  <div id="app">
    <h2 id="timer">stopwatch</h1>
    <div>
      <span id="secs">00</span>:<span id="tens">00</span>
    </div>
    <button id="start-button">start</button>
    <button id="pause-button">pause</button>
    <button id="reset-button">reset</button>
  </div>
  <script src="./src/index.js"></script>
</body>
</html>
```

```js
const run = () => {
  const appendSeconds = document.getElementById('secs');
  const appendTens = document.getElementById('tens');
  const timeStartBtn = document.getElementById('start-button');
  const timePauseBtn = document.getElementById('pause-button');
  const timeResetBtn = document.getElementById('reset-button');
  let secs = 00;
  let tens = 00;
  let interval;

  const timeStart = () => {
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
  }

  const timePause = () => {
    clearInterval(interval);
  }

  const timeReset = () => {
    clearInterval(interval);
    tens = '00';
    secs = '00';
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = secs;
  }

  const startTimer = () => {
    tens++; 
    
    if(tens <= 9){
      appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
      appendTens.innerHTML = tens;
    } 
    
    if (tens > 99) {
      secs++;
      appendSeconds.innerHTML = "0" + secs;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    
    if (secs > 9){
      appendSeconds.innerHTML = secs;
    }
  }

  timeStartBtn.addEventListener('click', timeStart);
  timePauseBtn.addEventListener('click', timePause);
  timeResetBtn.addEventListener('click', timeReset);
};

run();
```

3. 直接使用 npx 进行打包

```shell
$ npx webpack
```

会生成 dist 文件, 其中有一个 main.js 文件, 文件中的数据如下

> 编译的时候会将变量进行转译

```js
(()=>{const e=document.getElementById("secs"),n=document.getElementById("tens"),t=document.getElementById("start-button"),r=document.getElementById("pause-button"),c=document.getElementById("reset-button");let d,l=0,i=0;const a=()=>{i++,i<=9&&(n.innerHTML="0"+i),i>9&&(n.innerHTML=i),i>99&&(l++,e.innerHTML="0"+l,i=0,n.innerHTML="00"),l>9&&(e.innerHTML=l)};t.addEventListener("click",(()=>{clearInterval(d),d=setInterval(a,10)})),r.addEventListener("click",(()=>{clearInterval(d)})),c.addEventListener("click",(()=>{clearInterval(d),i="00",l="00",n.innerHTML=i,e.innerHTML=l}))})();
```

4. 使用 webpack config

新建 webapck.config.js 文件，内容如下

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    file: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
}
```

这时在执行命令进行构建

```shell
$ npx webapck --config webpack.config.js
```

得到以下打包内容（同上）

```js
(()=>{const e=document.getElementById("secs"),n=document.getElementById("tens"),t=document.getElementById("start-button"),r=document.getElementById("pause-button"),c=document.getElementById("reset-button");let d,l=0,i=0;const a=()=>{i++,i<=9&&(n.innerHTML="0"+i),i>9&&(n.innerHTML=i),i>99&&(l++,e.innerHTML="0"+l,i=0,n.innerHTML="00"),l>9&&(e.innerHTML=l)};t.addEventListener("click",(()=>{clearInterval(d),d=setInterval(a,10)})),r.addEventListener("click",(()=>{clearInterval(d)})),c.addEventListener("click",(()=>{clearInterval(d),i="00",l="00",n.innerHTML=i,e.innerHTML=l}))})();
```

> 注：webapck 4 以后不需要其他的特殊配置，但是因为项目原因，需要复杂配置，使用 webapck config 比手动输入命令的效率要高很多

5. 使用 npm 脚本

在 package.json 中新增命令

```json
"build": "webpack"
```

执行命令

```shell
npm run build

# 自定义参数可以通过 -- 来传递给 webpack, eg: npm run build -- --color
```

### 1.3 资产(assets)管理

1. 修改 webpack.config.js 配置

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
-   filename: 'main.js',
+   filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
}
```

2. 添加一些样式、图片之类的资源, 并在 webpack.config.js 中配置对应的 loader 即可

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.(css|less)$/i, use: ['style-loader', 'css-loader', 'less-loader'] },
    ]
  }
}
```

3. 使用 npm run build 打包

得到以下资源

```js
(()=>{"use strict";var e,t,n,r,o,a,c,i,s,u,l,d,p,f,v={908:(e,t,n)=>{n.d(t,{Z:()=>i});var r=n(601),o=n.n(r),a=n(609),c=n.n(a)()(o());c.push([e.id,"#app {\n  width: 100%;\n  height: 144px;\n  background-color: orange;\n}\n",""]);const i=c},609:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var c={};if(r)for(var i=0;i<this.length;i++){var s=this[i][0];null!=s&&(c[s]=!0)}for(var u=0;u<e.length;u++){var l=[].concat(e[u]);r&&c[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),t.push(l))}},t}},601:e=>{e.exports=function(e){return e[1]}},62:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var a={},c=[],i=0;i<e.length;i++){var s=e[i],u=r.base?s[0]+r.base:s[0],l=a[u]||0,d="".concat(u," ").concat(l);a[u]=l+1;var p=n(d),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==p)t[p].references++,t[p].updater(f);else{var v=o(f,r);r.byIndex=i,t.splice(i,0,{identifier:d,updater:v,references:1})}c.push(d)}return c}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var a=r(e=e||[],o=o||{});return function(e){e=e||[];for(var c=0;c<a.length;c++){var i=n(a[c]);t[i].references--}for(var s=r(e,o),u=0;u<a.length;u++){var l=n(a[u]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}a=s}}},793:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},173:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},892:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},36:e=>{e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},464:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},m={};function h(e){var t=m[e];if(void 0!==t)return t.exports;var n=m[e]={id:e,exports:{}};return v[e](n,n.exports,h),n.exports}h.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return h.d(t,{a:t}),t},h.d=(e,t)=>{for(var n in t)h.o(t,n)&&!h.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},h.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),h.nc=void 0,e=h(62),t=h.n(e),n=h(36),r=h.n(n),o=h(793),a=h.n(o),c=h(892),i=h.n(c),s=h(173),u=h.n(s),l=h(464),d=h.n(l),p=h(908),(f={}).styleTagTransform=d(),f.setAttributes=i(),f.insert=a().bind(null,"head"),f.domAPI=r(),f.insertStyleElement=u(),t()(p.Z,f),p.Z&&p.Z.locals&&p.Z.locals,(()=>{const e=document.getElementById("secs"),t=document.getElementById("tens"),n=document.getElementById("start-button"),r=document.getElementById("pause-button"),o=document.getElementById("reset-button");let a,c="00",i="00";const s=()=>{i++,i<=9&&(t.innerHTML="0"+i),i>9&&(t.innerHTML=i),i>99&&(c++,e.innerHTML="0"+c,i=0,t.innerHTML="00"),c>9&&(e.innerHTML=c)};n.addEventListener("click",(()=>{clearInterval(a),a=setInterval(s,10)})),r.addEventListener("click",(()=>{clearInterval(a)})),o.addEventListener("click",(()=>{clearInterval(a),i="00",c="00",t.innerHTML=i,e.innerHTML=c}))})()})();
```

5. 修改 html 文件中的 script 引入地址, 即可预览

```diff
- <script src="./src/index.js"></script>
+ <script src="./dist/bundle.js"></script>
```

### 1.4 输出管理

1. src 中新增一个 utils.js 文件, 新增方法后, 引入 index.js 中使用

```js
// utils.js
const print = (color) => {
  return console.log('%c look, this is customer console', `color: ${color}; font-size: 20px;`);
}

export { print };

// index.js
import { print } from './utils.js';

print('orange');
```

2. 修改 webpack.config.js 文件

```diff
- entry: './src/index.js',
+ entry: {
+   index: './src/index.js',
+   utils: './src/utils.js',
+ },

output: {
- filename: 'bundle.js',
+ filename: {
+   index: './src/index.js',
+   utils: './src/utils.js'
+ },
- path: path.resolve(__dirname, 'dist'),
+ path: '[name].bundle.js',
},
```

3. 打包

生成了两个 bundle.js 文件, [name] 为变量

```files
index.bundle.js
utils.bundle.js
```

4. 配置 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)，其目的是为了打包自动生成一个新的 html 文件，其中的 bundle 都会自动放到 html 中

```shell
$ npm i html-webpack-plugin -D
```

修改 webpack.config.js 文件

```diff
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

+ plugins: [
+   new HtmlWebpackPlugin({
+     title: 'Output Management',
+   }),
+ ],
```

5. 修改 indx.html 文件

```diff
- <script src="./dist/bundle.js"></script>
+ <script src="./dist/index.bundle.js"></script>
```

### 1.5 环境配置

1. 在 webpack.config.js 中新增 mode 属性, 并使用 source-map 插件

> [devtool里的7种SourceMap模式是什么鬼？](https://juejin.cn/post/6844903450644316174)

```diff
# development 
+ mode: 'development',
+ devtool: 'source-map',
```

2. 使用 webpack watcher 模式

监听文件变化，如果有变化，会自动更新打包

方法一：直接使用 --watch，缺点是需要手动刷新浏览器才能更新

```diff
+ "watch": "webpack --watch"
```

方法二：webpack-dev-server，可以实时 reload

```shell
$ npm i webpack-dev-server -D
```

```diff
# 在 webpack.config.js 中配置
+ devServer: {
+   static: './dist',
+ },

+ optimization: {
+   runtimeChunk: 'single',
+ },
```

```diff
# 在 package.json 中配置
+ "start": "webpack serve --open",
```

> 还可以使用 [webpack-dev-middleware](https://webpack.js.org/guides/development/#using-webpack-dev-middleware) 包装器将 webpack 处理的文件发送到服务器

### 1.6 代码分割 (code splitting)

当我的 index.js 和 utils.js 都引用了 lodash 库时，它会存在于两个包中

```
asset index.bundle.js 554 KiB [emitted] (name: index) 1 related asset
asset utils.bundle.js 533 KiB [emitted] (name: utils) 1 related asset
asset runtime.bundle.js 7.21 KiB [emitted] (name: runtime) 1 related asset
asset index.html 820 bytes [emitted]

./src/index.js 1.41 KiB [built] [code generated]
./src/utils.js 230 bytes [built] [code generated]
```

这时候需要用到 SplitChunks 插件，将公共依赖项提取到现有的条目块或全新的块中

```diff
+ optimization: {
+   // runtimeChunk: 'single',
+   splitChunks: {
+     chunks: 'all',
+   },
+ },
```

这时候就会把公共包提取出来

```
asset vendors-node_modules_lodash_lodash_js.bundle.js 532 KiB [emitted] (id hint: vendors) 1 related asset
asset index.bundle.js 29.7 KiB [emitted] (name: index) 1 related asset
asset utils.bundle.js 8.37 KiB [emitted] (name: utils) 1 related asset
asset index.html 850 bytes [emitted]

./src/index.js 1.41 KiB [built] [code generated]
./src/utils.js 230 bytes [built] [code generated]
```

或者使用动态引入的方式来分割

```js
// 需要注意的是 import() 内部调用的是 Promise
import('lodash')
  .then(res => {})
  .catch(err => {})

// 也可以联合使用 prefetch、preload
// prefetch：将来某些导航可能需要资源
// preload：在当前导航期间也需要资源
import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
import(/* webpackPreload: true */ 'ChartingLibrary');
```

### 1.7 缓存

1. 在 output.filename 中通过 [模版标识符 template strings](https://webpack.docschina.org/configuration/output/#template-strings) 来输出文件的文件名

```js
// webpack.config.js
output: {
  // ...
  filename: '[name].[contenthash].js', // 打包后会生成类似于 index.7e2c49a622975ebd9b7e.js 的文件
}
```

2. 通过 splitTrunkPlugin 和 [optimization.runtimeChunk](https://webpack.docschina.org/configuration/optimization/#optimizationruntimechunk) 将 runtime 拆成一个单独的 chunk 

```js
// webpack.config.js
optimization: {
  runtimeChunk: 'single', // multiple，分割为单个还是多个，或者是 string 模式，来自定义名称
  // runtimeChunk: {
  //  name: (entrypoint) => `runtime-${entrypoint.name}`, // 这个名称和单独使用 single/multiple 相同
  // },
  // 这里代码分割主要是为了将三方库单独抽成 vender trunk 中，来实现缓存机制
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
    },
  },
},
```

3. 到这时候，全部代码都已经拆分且输出文件，但是每次打包的时候 vender 也会随着打包发生变化，即使是在没有改动（引入/删除新的三方包）的情况下，这时候需要 [optimization.moduleIds](https://webpack.docschina.org/configuration/optimization/#optimizationmoduleids) 属性来规定 webpack 打包时选择模块 id 时需要使用哪种算法

```js
// webpack.config.js
optimization: {
  moduleIds: 'deterministic', // 这时候重新打包时，vender 的 hash 值不会发生变化
}
```

### 1.8 创建 library

1. 如果是本地文件想要暴露从入口导出的内容，需要使用到 [outputlibrary](https://webpack.docschina.org/configuration/output/#outputlibrary)

创建一个 js 文件（custom-library），其中有些方法

这是需要在 webpack 中进行配置

```js
// webpack.config.js
// TODO
output: {
  entry: './src/index.js',
  filename: 'custom-library.js', // 当然，这时候 input 不要使用模版标识符 template strings
  library: {
    name: 'webpackNumbers',
    type: 'umd',
  },
}
```

2. 外部化一些体积较大的三方库，有点类似于将这些库当作 peerDependencies 来处理，通过 external 来处理，这时 webpack 打包就不会将制定的库打包进 vender 中去

```js
// webpack.config.js
externals: {
  lodash: {
    commonjs: 'lodash',
    commonjs2: 'lodash',
    amd: 'lodash',
    root: '_',
  },
},
```

```diff
# 使用前
- asset vendors.3d05fe8319b4ff6d7ed8.js 543 KiB [emitted] [immutable] (name: vendors) (id hint: vendor) 1 related asset
asset index.74827e04422135bb5b9a.js 10.4 KiB [emitted] [immutable] (name: index) 1 related asset
asset runtime.767f86f6947115194ca0.js 7.23 KiB [emitted] [immutable] (name: runtime) 1 related asset
asset custom-library.4d01d5364bc8ebbee7c6.js 2.01 KiB [emitted] [immutable] (name: custom-library) 1 related asset
asset utils.d3915a2adef65605c670.js 1.3 KiB [emitted] [immutable] (name: utils) 1 related asset
asset index.html 1000 bytes [emitted]

# 使用后
asset index.898c567e6391ad5240cf.js 21.5 KiB [emitted] [immutable] (name: index) 1 related asset
asset runtime.94748d62436eea73cbf8.js 6.48 KiB [emitted] [immutable] (name: runtime) 1 related asset
asset custom-library.2b22fa8e62132fb5ffac.js 2.27 KiB [emitted] [immutable] (name: custom-library) 1 related asset
asset utils.939a20093c451e88ed6e.js 1.56 KiB [emitted] [immutable] (name: utils) 1 related asset
asset index.html 940 bytes [emitted]
```

### 1.9 环境变量

可以通过命令行 [环境配置](https://webpack.docschina.org/api/cli/#environment-options) 的参数，来传入任意数量的环境变量

```shell
$ npx webpack --env goal=local --env production --progress

# 或者 scripts 中新增一个
"env": "webpack --env goal=local --env production --progress"
```

```diff
# wbepack.config.js
- module.exports = {
-  entry: './src',
-  // ...
- }
# 执行 npm run env 后会得到以下的打印结果
+ module.exports = (env) => {
+   console.log('Goal: ', env.goal); // 'local'
+   console.log('Production: ', env.production); // true
+   return {
+     entry: './src'
+     // ...
+   }
+ }
```