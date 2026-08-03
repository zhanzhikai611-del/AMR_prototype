const fs = require("fs");
const path = require("path");

const pages = {
  "dashboard": "运行概览",
  "digital-twin": "数字孪生",
  "alert-center": "告警中心",
  "traffic-overview": "交通态势",
  "traffic-resources": "管制资源",
  "traffic-records": "管制记录",
  "map-editor": "地图编辑器",
  "map-list": "地图管理",
  "task-list": "任务列表",
  "task-create": "创建任务",
  "dispatch-strategies": "调度策略",
  "dispatch-records": "调度记录",
  "agv-list": "AMR 列表",
  "agv-detail": "AMR 详情",
  "agv-models": "型号配置",
  "device-list": "设备列表",
  "device-detail": "设备详情",
  "device-types": "设备类型",
  "api-catalog": "接口目录",
  "api-workbench": "API 测试工作台",
  "api-history": "请求历史",
  "behavior-trees": "行为树列表",
  "behavior-editor": "行为树基础编辑示意",
  "users": "用户管理",
  "roles": "角色权限",
  "configurations": "配置管理",
  "dictionaries": "数据字典",
  "operation-logs": "操作日志",
  "system-logs": "系统日志"
};

const outDir = path.join(__dirname, "..", "pages");
fs.mkdirSync(outDir, { recursive: true });

for (const [id, title] of Object.entries(pages)) {
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="FXXXXXN AMR CONTROL - ${title}">
  <title>${title} · FXXXXXN AMR CONTROL</title>
  <link rel="stylesheet" href="../assets/css/app.css">
</head>
<body data-page="${id}" data-root=".">
  <noscript>此演示需要启用 JavaScript。</noscript>
  <script src="../assets/js/app.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(outDir, `${id}.html`), html, "utf8");
}

console.log(`Generated ${Object.keys(pages).length} independent HTML pages.`);

