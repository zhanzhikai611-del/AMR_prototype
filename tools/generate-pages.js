const fs = require("fs");
const path = require("path");

const pages = {
  "dashboard": "运行总览",
  "traffic-overview": "实时交通",
  "traffic-records": "交通记录",
  "traffic-record-detail": "交通记录详情",
  "map-editor": "地图编辑器",
  "map-list": "地图管理",
  "task-list": "任务中心",
  "task-config": "任务配置",
  "task-detail": "任务单详情",
  "task-config-create": "新建任务配置",
  "task-config-edit": "编辑任务配置",
  "dispatch-strategies": "调度策略",
  "dispatch-strategy-detail": "调度策略详情",
  "dispatch-records": "任务日志",
  "dispatch-record-detail": "任务日志详情",
  "agv-list": "AMR 列表",
  "agv-detail": "AMR 详情",
  "agv-models": "AMR 型号",
  "device-list": "设备列表",
  "device-detail": "设备详情",
  "device-types": "设备类型",
  "api-catalog": "接口目录",
  "api-workbench": "API 调试",
  "api-history": "请求历史",
  "amr-debug": "AMR 调试",
  "debug-records": "调试记录",
  "behavior-trees": "行为树列表",
  "behavior-monitor": "行为树监控",
  "behavior-editor": "行为树编辑器",
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

