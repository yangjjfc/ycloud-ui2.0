## 更新日志

### 2.0.1

*2019-03-21*

#### 修复

- 修复 Cascader 文档页的样式 (#14789 by @ziyoung)
- 移除 Cascader 中多余的 DOM 操作 (#14788 by @ziyoung)
- DateRange 支持夏令时 (#14562 by @wacky6)


##
<i><sup>*</sup> 在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。因此请在 `dangerouslyUseHTMLString` 打开的情况下，确保 `message` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `message` 属性。</i>
