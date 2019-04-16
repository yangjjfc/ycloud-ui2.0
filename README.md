<p align="center">
  ycloud-ui
</p>

## LICENSE
[MIT](LICENSE)


目录结构
├── build //打包命令
│   ├── bin 
│   │   ├── build-entry.js //生成组件index.js文件
│   │   ├── build-locale.js //国际化语言打包----暂不去了解
│   │   ├── gen-cssfile.js //生成packages/theme-chalk下的scss文件
│   │   ├── gen-indices.js //解析doc的md文件,生成algoliasearch的搜索
│   │   ├── i18n.js
│   │   ├── iconInit.js
│   │   ├── new.js
│   │   ├── new-lang.js
│   │   ├── template.js
│   │   └── version.js
│   ├── config.js
│   ├── deploy-ci.sh
│   ├── deploy-faas.sh
│   ├── gen-single-config.js
│   ├── git-release.sh
│   ├── md-loader
│   │   ├── config.js
│   │   ├── containers.js
│   │   ├── fence.js
│   │   ├── index.js
│   │   └── util.js
│   ├── release.sh
│   ├── webpack.common.js
│   ├── webpack.component.js
│   ├── webpack.conf.js
│   ├── webpack.demo.js
│   └── webpack.test.js
├── CHANGELOG.zh-CN.md
├── components.json
├── element_logo.svg
├── examples
│   ├── app.vue
│   ├── assets
│   ├── bus.js
│   ├── color.js
│   ├── components
│   ├── demo-styles
│   ├── docs
│   ├── dom
│   ├── entry.js
│   ├── favicon.ico
│   ├── i18n
│   ├── icon.json
│   ├── index.tpl
│   ├── nav.config.json
│   ├── pages
│   ├── play
│   ├── play.js
│   ├── route.config.js
│   ├── util.js
│   └── versions.json
├── FAQ.md
├── LICENSE
├── Makefile
├── package.json
├── packages
│   ├── dialog
│   ├── file-upload
│   ├── icon
│   ├── pagination
│   ├── region-picker
│   ├── table-tree
│   └── theme-chalk
├── README.md
├── src
│   ├── directives
│   ├── index.js
│   ├── locale
│   ├── mixins
│   ├── transitions
│   └── utils
├── test
│   └── unit
├── types
│   ├── component.d.ts
│   ├── dialog.d.ts
│   ├── file-upload.d.ts
│   ├── icon.d.ts
│   ├── pagination.d.ts
│   ├── region-picker.d.ts
│   └── table-tree.d.ts
└── yarn.lock
