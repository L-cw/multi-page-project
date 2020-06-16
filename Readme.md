# bubi.cn-fe
采用 jq 开发的官网

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```
### 打包配置
使用 html-webpack-plugin 插件， /src/view/*.html 都是入口文件，common 里是公共模版，不会作为入口，
入口 html 对应的 js 文件的名字要保持一致，例：index.html index.js
在 js 中引入 scss，
