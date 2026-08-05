# FXXXXXN AMR CONTROL UI Prototype

面向厂内CNC物流场景的AMR调度平台前端原型。当前版本围绕“CNC加工完成，请求AMR将成品搬运至缓冲区”建立业务闭环，覆盖任务派单、行为树执行、交通监控、地图管理、资源管理和研发调试。

## 当前范围

- 首期仅接入单一AMR品牌，但信息模型保留型号与能力扩展空间。
- 平台直接调度单台AMR，服务厂内流水线物流。
- 本仓库仅实现前端UI与演示交互，不包含协议、调度算法、SLAM或后端服务。
- 所有车辆、任务、设备、地图、日志和接口响应均为演示数据。

## 运行方式

项目无第三方运行依赖，可以直接打开 `index.html`。若浏览器限制本地文件访问，建议在项目根目录启动静态服务器：

```powershell
python -m http.server 8080
```

然后访问 `http://localhost:8080/`。

## 一级模块

1. 首页
2. 派单管理
3. 行为树管理
4. 交通监控
5. 地图管理
6. 资源管理
7. 调试平台
8. 平台设置

## 技术与目录

- HTML5：每个页面都是可独立访问的HTML文件。
- CSS Variables：共享浅色工业SaaS设计系统。
- Vanilla JavaScript：页面生成、演示数据和交互逻辑。
- SVG：逻辑地图、路径、节点、AMR和状态图形。
- PNG：AMR雷达扫描点云底图。

```text
index.html                  入口页
pages/                      36个独立页面
assets/css/app.css          全局设计系统与组件样式
assets/js/app.js            页面结构、演示数据与交互
assets/images/              点云和数字孪生图片
tools/generate-pages.js     独立HTML页面生成器
系统架构.md                 模块边界、对象关系与协作约定
前端UI需求文档.md           页面字段、交互与验收标准
AMR系统设计文档.md          产品范围、业务闭环与模块总览
```

## 开发约定

- 一级模块通过顶部导航切换，二级页面通过侧边栏切换，详情和编辑器作为三级页面。
- 楼层与地图由顶部全局运行范围统一选择，各业务页面不得重复增加筛选入口。
- 地图编辑器维护点云底图和逻辑图层；交通监控及AMR调试只使用发布后的逻辑地图。
- AMR型号维护运动学参数，AMR实例只维护身份、型号引用、地图归属和启用状态。
- 列表操作统一使用带外框的按钮，最后一列标题统一为“操作”。

## 验证

修改后至少执行：

```powershell
node --check assets/js/app.js
node --check tools/generate-pages.js
git diff --check
```

还应检查所有 `data-go` 页面链接存在，并在常见桌面分辨率下确认页面没有关键内容遮挡。

## GitHub Pages

仓库可以直接通过GitHub Pages发布，不需要构建步骤。Pages来源选择默认分支根目录即可。
