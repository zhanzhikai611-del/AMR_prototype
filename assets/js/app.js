const PAGE_ROOT = document.body.dataset.root || ".";
const PAGE_ID = document.body.dataset.page || "dashboard";

const NAV = [
  { id: "dashboard", label: "首页", file: "dashboard.html", children: [
    ["dashboard", "运行总览", "OV"]
  ]},
  { id: "dispatch", label: "派单管理", file: "task-list.html", children: [
    ["task-list", "任务中心", "TC"],
    ["task-config", "任务配置", "CF"],
    ["dispatch-strategies", "调度策略", "ST"],
    ["dispatch-records", "任务日志", "LG"]
  ]},
  { id: "behavior", label: "行为树管理", file: "behavior-monitor.html", children: [
    ["behavior-monitor", "行为树监控", "MN"],
    ["behavior-trees", "行为树列表", "BT"]
  ]},
  { id: "traffic", label: "交通监控", file: "traffic-overview.html", children: [
    ["traffic-overview", "实时交通", "RT"],
    ["traffic-records", "交通记录", "TR"]
  ]},
  { id: "map", label: "地图管理", file: "map-list.html", children: [
    ["map-list", "地图管理", "MP"],
    ["map-logs", "地图日志", "LG"]
  ]},
  { id: "resource", label: "资源管理", file: "agv-list.html", children: [
    ["agv-list", "AMR 列表", "AM"],
    ["device-list", "设备列表", "DV"],
    ["agv-models", "AMR 型号", "MD"],
    ["device-types", "设备类型", "TP"]
  ]},
  { id: "debug", label: "调试平台", file: "amr-debug.html", children: [
    ["amr-debug", "AMR 调试", "AM"],
    ["api-workbench", "API 调试", "AP"],
    ["debug-records", "调试记录", "DR"]
  ]},
  { id: "settings", label: "平台设置", file: "users.html", children: [
    ["users", "用户管理", "US"],
    ["roles", "角色权限", "RL"],
    ["configurations", "配置管理", "CF"],
    ["dictionaries", "数据字典", "DC"],
    ["operation-logs", "操作日志", "OP"],
    ["system-logs", "系统日志", "LG"]
  ]}
];

const PAGE_META = {
  dashboard: ["运行总览", "当前阶段用于说明厂内物流数字孪生的展示范围与规划能力"],
  "traffic-overview": ["实时交通", "对比任务规划路径、AMR 当前路径与实际行驶轨迹"],
  "traffic-records": ["交通记录", "按路径执行过程追踪距离偏差、重规划、等待与到达结果"],
  "traffic-record-detail": ["交通记录详情", "回放规划路径、实际轨迹、重规划与交通资源事件"],
  "map-editor": ["地图编辑器", "编辑指定地图的扫描底图、逻辑图层与空间资源"],
  "map-list": ["地图管理", "创建地图记录并管理楼层归属、来源、版本与发布状态"],
  "map-logs": ["地图日志", "追踪地图创建、资料修改、逻辑编辑、发布与下发操作"],
  "task-list": ["任务中心", "从设备请求进入平台开始，统一追踪任务匹配、调度、执行与最终关闭"],
  "task-config": ["任务配置", "维护设备请求可匹配的标准任务模板与执行规则"],
  "task-detail": ["任务单详情", "查看 CNC 请求、车辆调度、行为树执行和交付闭环"],
  "task-config-create": ["新建任务配置", "定义设备请求、物流路线、行为树与派单约束"],
  "task-config-edit": ["编辑任务配置", "调整标准任务模板及其请求匹配规则"],
  "dispatch-strategies": ["调度策略", "配置研发提供的调度类型和可调参数"],
  "dispatch-strategy-detail": ["调度策略详情", "维护策略参数并查看受影响的任务配置"],
  "dispatch-records": ["任务日志", "查询任务从请求进入、调度、执行到关闭的完整事件记录"],
  "dispatch-record-detail": ["任务日志详情", "查看单条任务事件的上下文、输入输出和关联对象"],
  "agv-list": ["AMR 列表", "集中查看单品牌 AMR 的运行与连接状态"],
  "agv-detail": ["AMR-03 详情", "查看单车状态、任务、事件和基础配置"],
  "agv-models": ["AMR 型号", ""],
  "device-list": ["设备列表", "管理 CNC 等流水线设备及其地图绑定"],
  "device-detail": ["CNC-07 详情", "查看机台状态、地图位置与关联任务"],
  "device-types": ["设备类型", "配置设备的默认图标、状态和点位要求"],
  "api-catalog": ["接口目录", "按业务模块浏览研发提供的平台接口"],
  "api-workbench": ["API 调试", ""],
  "api-history": ["请求历史", "复用最近请求和已保存的测试用例"],
  "amr-debug": ["AMR 调试", ""],
  "debug-records": ["调试记录", ""],
  "behavior-trees": ["行为树列表", "管理 AMR 执行流程及行为树版本"],
  "behavior-monitor": ["行为树监控", "集中查看 AMR 当前执行的行为树实例与节点状态"],
  "behavior-editor": ["行为树编辑器", "编辑行为树节点、连线和节点属性"],
  users: ["用户管理", "管理平台用户、状态和角色"],
  roles: ["角色权限", "配置模块权限和高风险操作权限"],
  configurations: ["配置管理", "维护前端可见的系统参数与环境设置"],
  dictionaries: ["数据字典", "统一管理 AMR、任务和设备的状态显示"],
  "operation-logs": ["操作日志", "查询用户在平台中的重要操作记录"],
  "system-logs": ["系统日志", "按模块、对象和 Trace ID 定位研发问题"]
};

const AMRS = [
  ["AMR-01", "空闲", "86%", "P-01 等待区", "—", "green"],
  ["AMR-02", "执行中", "74%", "通道 A3", "TSK-260731-018", "blue"],
  ["AMR-03", "执行中", "62%", "CNC-07 前", "TSK-260731-021", "blue"],
  ["AMR-04", "充电中", "41%", "CHG-01", "—", "cyan"],
  ["AMR-05", "等待", "55%", "P-08 缓冲区", "TSK-260731-019", "amber"],
  ["AMR-06", "故障", "37%", "通道 B2", "TSK-260731-020", "red"]
];

const TASKS = [
  ["TSK-260731-021", "线边补料", "ST-01", "CNC-07", "AMR-03", "执行中", "高", "10:42:16"],
  ["TSK-260731-020", "成品转运", "CNC-04", "BUF-02", "AMR-06", "异常", "高", "10:39:52"],
  ["TSK-260731-019", "空箱回收", "CNC-02", "REC-01", "AMR-05", "等待", "普通", "10:36:08"],
  ["TSK-260731-018", "线边补料", "ST-02", "CNC-03", "AMR-02", "执行中", "普通", "10:32:44"],
  ["TSK-260731-017", "物料转运", "BUF-01", "CNC-06", "AMR-01", "已完成", "普通", "10:25:31"],
  ["TSK-260731-016", "空箱回收", "CNC-08", "REC-01", "AMR-04", "已完成", "低", "10:18:09"]
];

const DEVICES = [
  ["CNC-01", "CNC", "一号线", "加工中", "在线", "MAP-A", "P-C01", "blue"],
  ["CNC-02", "CNC", "一号线", "等待下料", "在线", "MAP-A", "P-C02", "amber"],
  ["CNC-03", "CNC", "一号线", "等待 AMR", "在线", "MAP-A", "P-C03", "amber"],
  ["CNC-04", "CNC", "二号线", "空闲", "在线", "MAP-A", "P-C04", "green"],
  ["CNC-05", "CNC", "二号线", "加工中", "在线", "MAP-A", "P-C05", "blue"],
  ["CNC-06", "CNC", "二号线", "空闲", "在线", "MAP-A", "P-C06", "green"],
  ["CNC-07", "CNC", "二号线", "等待 AMR", "在线", "MAP-A", "P-C07", "amber"],
  ["CNC-08", "CNC", "二号线", "故障", "在线", "MAP-A", "P-C08", "red"]
];

function moduleForPage(pageId) {
  if (pageId === "agv-detail" || pageId === "device-detail") return NAV.find(item => item.id === "resource");
  if (pageId === "behavior-editor") return NAV.find(item => item.id === "behavior");
  if (pageId === "traffic-record-detail") return NAV.find(item => item.id === "traffic");
  if (pageId === "map-editor") return NAV.find(item => item.id === "map");
  if (["task-detail","task-config-create","task-config-edit","dispatch-strategy-detail","dispatch-record-detail"].includes(pageId)) return NAV.find(item => item.id === "dispatch");
  return NAV.find(item => item.children.some(child => child[0] === pageId)) || NAV[0];
}

function pageHref(file) {
  return `${PAGE_ROOT}/${file}`;
}

function iconBell() {
  return `<svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
}

function renderShell() {
  const module = moduleForPage(PAGE_ID);
  const meta = PAGE_META[PAGE_ID] || PAGE_META.dashboard;
  const isHome = PAGE_ID === "dashboard";
  const primary = NAV.map(item => `<a class="${item.id === module.id ? "active" : ""}" href="${pageHref(item.file)}">${item.label}</a>`).join("");
  const parentList = PAGE_ID === "agv-detail" ? "agv-list" : PAGE_ID === "device-detail" ? "device-list" : PAGE_ID === "task-detail" ? "task-list" : ["task-config-create","task-config-edit"].includes(PAGE_ID) ? "task-config" : PAGE_ID === "dispatch-strategy-detail" ? "dispatch-strategies" : PAGE_ID === "dispatch-record-detail" ? "dispatch-records" : PAGE_ID === "behavior-editor" ? "behavior-trees" : PAGE_ID === "traffic-record-detail" ? "traffic-records" : PAGE_ID === "map-editor" ? "map-list" : "";
  const secondary = module.children.map(child => `<a class="${child[0] === PAGE_ID || child[0] === parentList ? "active" : ""}" href="${pageHref(`${child[0]}.html`)}"><span class="nav-icon">${child[2]}</span>${child[1]}</a>`).join("");
  const dispatchParent = {"task-detail":"任务中心","task-config-create":"任务配置","task-config-edit":"任务配置","dispatch-strategy-detail":"调度策略","dispatch-record-detail":"任务日志"}[PAGE_ID];
  const breadcrumb = PAGE_ID === "agv-detail" ? `${module.label} / AMR 列表 / ${meta[0]}` : PAGE_ID === "device-detail" ? `${module.label} / 设备列表 / ${meta[0]}` : PAGE_ID === "behavior-editor" ? `${module.label} / 行为树列表 / ${meta[0]}` : PAGE_ID === "traffic-record-detail" ? `${module.label} / 交通记录 / ${meta[0]}` : PAGE_ID === "map-editor" ? `${module.label} / 装配物流区 / ${meta[0]}` : dispatchParent ? `${module.label} / ${dispatchParent} / ${meta[0]}` : `${module.label} / ${meta[0]}`;

  document.body.innerHTML = `
    <header class="topbar">
      <a class="brand" href="${pageHref("dashboard.html")}">
        <span class="brand-mark"><span></span></span>
        <span class="brand-copy"><strong>FXXXXXN</strong><small>AMR CONTROL</small></span>
      </a>
      <nav class="primary-nav" aria-label="一级导航">${primary}</nav>
      <div class="top-actions">
        <button class="global-context js-global-context" aria-label="切换全局运行范围">
          <span>运行范围</span><strong class="js-current-context">2F / MAP-A</strong><i>⌄</i>
        </button>
        <span class="connection-pill"><i class="dot"></i>服务正常</span>
        <button class="top-icon" aria-label="通知">${iconBell()}</button>
        <button class="avatar" aria-label="用户菜单">研</button>
      </div>
    </header>
    <aside class="sidebar ${isHome ? "home-hidden" : ""}">
      <div class="side-heading">${module.label}</div>
      <nav class="side-nav" aria-label="二级导航">${secondary}</nav>
      <div class="side-meta">平台版本 <b>UI 0.9.0</b><br>数据更新 <b id="liveClock">--:--:--</b></div>
    </aside>
    <main class="app-main ${isHome ? "home-main" : ""}">
      <section class="page-head">
        <div>
          <div class="breadcrumb">${breadcrumb}</div>
          <h1 class="page-title">${meta[0]}</h1>
        </div>
        <div class="page-actions" id="pageActions"></div>
      </section>
      <section id="pageContent"></section>
    </main>
    <div class="drawer-backdrop" id="drawerBackdrop"><aside class="drawer" id="drawer"></aside></div>
    <div class="modal-backdrop" id="modalBackdrop"><section class="modal" id="modal"></section></div>
    <div class="toast-stack" id="toastStack"></div>
  `;
}

function setActions(html) {
  document.getElementById("pageActions").innerHTML = html;
}

function content(html) {
  document.getElementById("pageContent").innerHTML = html;
}

function badge(label, tone = "gray") {
  return `<span class="badge ${tone}">${label}</span>`;
}

function statusTone(value) {
  if (/完成|在线|空闲|正常|成功|启用/.test(value)) return "green";
  if (/执行|加工|运行|已分配/.test(value)) return "blue";
  if (/充电/.test(value)) return "cyan";
  if (/等待|低|警告|草稿/.test(value)) return "amber";
  if (/故障|失败|异常|离线/.test(value)) return "red";
  return "gray";
}

function table(headers, rows, widths = []) {
  const normalizedHeaders = headers.map((header, index) => index === headers.length - 1 && !header ? "操作" : header);
  const normalizedWidths = widths.map((width, index) => {
    if (index !== widths.length - 1 || !/^[0-9]+px$/.test(width)) return width;
    return `${Math.max(Number.parseInt(width, 10), 82)}px`;
  });
  const colgroup = normalizedWidths.length ? `<colgroup>${normalizedWidths.map(w => `<col style="width:${w}">`).join("")}</colgroup>` : "";
  return `
    <div class="table-wrap">
      <table class="data-table">${colgroup}
        <thead><tr>${normalizedHeaders.map((h,index) => `<th class="${index === normalizedHeaders.length - 1 ? "action-column" : ""}">${h}</th>`).join("")}</tr></thead>
        <tbody>${rows.join("")}</tbody>
      </table>
      <div class="pagination"><span>共 24 条 · 每页 10 条</span><div class="pager"><button>‹</button><button class="active">1</button><button>2</button><button>3</button><button>›</button></div></div>
    </div>`;
}

function toolbar({ search = "搜索名称或编号", filters = [], right = "" } = {}) {
  return `<div class="toolbar">
    <div class="toolbar-group">
      <input class="search js-search" aria-label="搜索" placeholder="${search}">
      ${filters.map(f => `<select class="select"><option>${f}</option><option>全部</option></select>`).join("")}
    </div>
    <div class="toolbar-group">${right}</div>
  </div>`;
}

function factoryMap({ editor = false } = {}) {
  return `
  <svg class="factory-map" viewBox="0 0 760 520" role="img" aria-label="AMR 厂内物流仿真地图">
    <rect class="wall" x="45" y="55" width="670" height="405" rx="4"/>
    <text x="58" y="78">A01 · 装配物流区</text>
    <path class="lane" d="M110 350 H238 V258 H430 V160 H635 V350 H520 V405 H305 V350 Z"/>
    <path class="lane-center" d="M110 350 H238 V258 H430 V160 H635 V350 H520 V405 H305 V350 Z"/>
    <path class="active-route" d="M112 348 H238 V258 H430 V160 H625"/>
    <g>
      <rect class="machine" x="88" y="98" width="94" height="58" rx="5"/><text x="112" y="128">CNC-01</text>
      <rect class="machine" x="204" y="98" width="94" height="58" rx="5"/><text x="228" y="128">CNC-02</text>
      <rect class="machine waiting" x="320" y="98" width="94" height="58" rx="5"/><text x="344" y="128">CNC-03</text>
      <rect class="machine" x="88" y="405" width="94" height="38" rx="5"/><text x="112" y="429">CNC-04</text>
      <rect class="machine" x="550" y="98" width="94" height="58" rx="5"/><text x="574" y="128">CNC-07</text>
      <rect class="machine waiting" x="550" y="385" width="94" height="58" rx="5"/><text x="574" y="418">CNC-08</text>
    </g>
    <g>
      <circle class="station" cx="110" cy="350" r="9"/><text x="91" y="376">ST-01</text>
      <circle class="station" cx="430" cy="258" r="9"/><text x="440" y="248">P-06</text>
      <circle class="station" cx="635" cy="350" r="9"/><text x="645" y="374">BUF-02</text>
      <circle class="station" cx="305" cy="405" r="9"/><text x="286" y="432">CHG-01</text>
    </g>
    <g class="agv agv-moving js-agv" data-name="AMR-03">
      <rect class="agv-body" x="-17" y="-12" width="34" height="24" rx="6"/>
      <path d="M12 -4 L20 0 L12 4Z" fill="#fff"/>
      <text class="agv-label" x="0" y="3">03</text>
    </g>
    <g class="agv js-agv" data-name="AMR-02" transform="translate(430 258)">
      <rect class="agv-body" x="-17" y="-12" width="34" height="24" rx="6"/>
      <path d="M12 -4 L20 0 L12 4Z" fill="#fff"/>
      <text class="agv-label" x="0" y="3">02</text>
    </g>
    <g class="agv js-agv" data-name="AMR-05" transform="translate(520 405)">
      <rect class="agv-body" x="-17" y="-12" width="34" height="24" rx="6" style="fill:#f59e0b"/>
      <path d="M12 -4 L20 0 L12 4Z" fill="#fff"/>
      <text class="agv-label" x="0" y="3">05</text>
    </g>
    ${editor ? `<g id="editorNodes"></g>` : ""}
  </svg>`;
}

function trafficNetworkMap() {
  const nodes = [
    ...[150,242,334,426,518,610].flatMap((x,col)=>[92,158,224,290,356,422].map((y,row)=>[x,y,`A${String(col*6+row+1).padStart(2,"0")}`]))
  ];
  return `<svg class="factory-map traffic-network-map" viewBox="0 0 760 500" preserveAspectRatio="xMidYMin meet" role="img" aria-label="厂内 AMR 实时交通路网">
    <rect class="traffic-floor" x="35" y="38" width="690" height="424" rx="5"/><text class="traffic-zone-label" x="52" y="62">A01 · CNC 加工物流区 / LOGIC MAP</text>
    <g class="traffic-machines">
      ${[104,196,288,380,472,564].flatMap((x,c)=>[118,184,316,382].map((y,r)=>[x,y,`C${String(c*4+r+1).padStart(2,"0")}`])).map(([x,y,id],i) => `<g><rect class="${i===8 ? "waiting" : ""}" x="${x}" y="${y}" width="40" height="28" rx="3"/><text x="${x+20}" y="${y+17}">${id}</text></g>`).join("")}
    </g>
    <g class="traffic-lane-network"><path d="M150 92V422 M242 92V422 M334 92V422 M426 92V422 M518 92V422 M610 92V422"/><path d="M72 257H688 M72 422H688 M150 92H242 M334 92H426 M518 92H610"/><path d="M150 224L242 290 M334 224L426 290 M518 224L610 290"/></g>
    <g class="traffic-resource-zones"><rect x="310" y="236" width="140" height="42" rx="9"/><text x="380" y="261">INT-A3 · 容量 1</text><rect class="mutex" x="496" y="401" width="138" height="42" rx="9"/><text x="565" y="426">MUTEX-B1</text></g>
    <g class="traffic-network-nodes">${nodes.map(([x,y,id]) => `<g transform="translate(${x} ${y})"><circle r="5"/><text y="-10">${id}</text></g>`).join("")}</g>
    <g class="traffic-static-amr" transform="translate(242 224)"><rect x="-12" y="-8" width="24" height="16" rx="4"/><text y="3">03</text></g><g class="traffic-static-amr waiting" transform="translate(610 422)"><rect x="-12" y="-8" width="24" height="16" rx="4"/><text y="3">05</text></g>
  </svg>`;
}

function occupancyGridMap() {
  const scanPoints = [
    [92,92],[104,94],[118,91],[132,95],[146,92],[160,94],[174,91],[188,95],[202,92],[216,94],[230,91],
    [92,112],[91,132],[94,152],[92,172],[95,192],[92,212],[93,232],[91,252],[94,272],[92,292],[95,312],[92,332],[94,352],[92,372],[95,392],[92,412],
    [244,93],[264,91],[284,94],[304,92],[324,95],[344,92],[364,94],[384,91],[404,95],[424,92],[444,94],[464,91],[484,95],[504,92],[524,94],[544,91],[564,95],[584,92],[604,94],[624,92],[644,95],[665,92],
    [665,112],[668,132],[665,152],[667,172],[664,192],[668,212],[665,232],[667,252],[664,272],[668,292],[665,312],[667,332],[665,352],[668,372],[665,392],[667,412],
    [112,430],[132,427],[152,431],[172,428],[192,430],[212,427],[232,431],[252,428],[272,430],[292,427],[312,431],[332,428],[352,430],[372,427],[392,431],[412,428],[432,430],[452,427],[472,431],[492,428],[512,430],[532,427],[552,431],[572,428],[592,430],[612,427],[632,431],[652,428],
    [176,156],[181,174],[178,192],[182,210],[179,228],[181,246],[178,264],[181,282],[179,300],[181,318],
    [286,146],[304,148],[322,145],[340,149],[358,146],[376,148],[394,145],[412,149],[430,146],[448,148],[466,145],[484,149],[502,146],[520,148],[538,145],[556,149],
    [286,332],[304,334],[322,331],[340,335],[358,332],[376,334],[394,331],[412,335],[430,332],[448,334],[466,331],[484,335],[502,332],[520,334],[538,331],[556,335]
  ];
  return `<svg class="occupancy-map" viewBox="0 0 760 520" role="img" aria-label="AMR 激光雷达静态栅格点阵地图">
    <defs>
      <pattern id="occGrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#d9dee2" stroke-width=".6"/></pattern>
      <filter id="pointSoft"><feGaussianBlur stdDeviation="1.2"/></filter>
    </defs>
    <g class="scan-map-layer"><rect width="760" height="520" fill="#c9ced2"/><image class="pointcloud-base" href="../assets/images/cnc-pointcloud-map.png" x="38" y="40" width="680" height="432" preserveAspectRatio="none"/>
    <path d="M38 40H718V472H38Z M75 72V445H692V72Z" fill="#70777d" fill-rule="evenodd" opacity=".36"/>
    <rect x="75" y="72" width="617" height="373" fill="#f3f5f6"/>
    <rect x="75" y="72" width="617" height="373" fill="url(#occGrid)" opacity=".7"/>
    <path d="M96 96H237V134H178V318H253V406H96ZM279 112H578V178H528V302H578V406H279V350H246V134H279Z" fill="#171b1e" opacity=".9"/>
    <path d="M117 114H218V122H158V298H236V388H116V374H218V336H158V134H117ZM300 132H558V158H508V322H558V386H300V366H538V342H488V138H300Z" fill="#7c8489" opacity=".55"/>
    <g fill="#121619">${scanPoints.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="2.2"/>`).join("")}</g>
    <g fill="#343a3e" opacity=".4" filter="url(#pointSoft)">${scanPoints.filter((_,i)=>i%3===0).map(p=>`<circle cx="${p[0]+4}" cy="${p[1]-3}" r="4"/>`).join("")}</g>
    <g fill="#52595e" opacity=".65"><circle cx="122" cy="186" r="2"/><circle cx="129" cy="191" r="1.5"/><circle cx="137" cy="188" r="2"/><circle cx="214" cy="238" r="2"/><circle cx="221" cy="244" r="1.6"/><circle cx="590" cy="212" r="2"/><circle cx="598" cy="218" r="1.7"/><circle cx="608" cy="214" r="2"/><circle cx="619" cy="365" r="2"/><circle cx="626" cy="371" r="1.5"/></g></g>
    <g class="logic-map-layer"><path d="M150 92V422 M242 92V422 M334 92V422 M426 92V422 M518 92V422 M610 92V422 M72 257H688 M72 422H688" fill="none" stroke="#1683f5" stroke-width="3" opacity=".82"/>
    <path d="M334 92V257H518V422H610" fill="none" stroke="#55b7ff" stroke-width="8" opacity=".18"/>
    <g class="logic-device" transform="translate(334 158)"><rect x="-28" y="-22" width="56" height="18" rx="3"/><text y="-10">CNC-01</text></g>
    <g class="logic-device" transform="translate(610 422)"><rect x="-28" y="10" width="56" height="18" rx="3"/><text y="23">BUF-01</text></g>
    <g class="traffic-zone"><rect x="310" y="236" width="140" height="42" rx="8"/><text x="320" y="252">INT-A3</text></g>
    <g transform="translate(426 257)"><circle r="13" fill="#1683f5"/><path d="M0-8L6 7L0 4L-6 7Z" fill="#fff"/></g></g>
    <g class="dense-logic-layer">
      <path class="dense-lanes" d="M150 92V422 M242 92V422 M334 92V422 M426 92V422 M518 92V422 M610 92V422 M72 257H688 M72 422H688 M150 92H242 M334 92H426 M518 92H610 M150 224L242 290 M334 224L426 290 M518 224L610 290"/>
      <g class="dense-nodes">${[150,242,334,426,518,610].flatMap((x,col)=>[92,158,224,290,356,422].map((y,row)=>[x,y,`A${String(col*6+row+1).padStart(2,"0")}`])).map(([x,y,id])=>`<g transform="translate(${x} ${y})"><circle r="4"/><text y="-8">${id}</text></g>`).join("")}</g>
    </g>
    <g class="occ-meta"><rect x="88" y="84" width="154" height="32" rx="3"/><text x="99" y="97">SLAM OCCUPANCY GRID</text><text x="99" y="108">RES 0.05 m · 760 × 520 px</text></g>
    <g class="occ-scale"><line x1="590" y1="426" x2="670" y2="426"/><line x1="590" y1="421" x2="590" y2="431"/><line x1="670" y1="421" x2="670" y2="431"/><text x="622" y="418">5 m</text></g>
    <g class="occ-origin" transform="translate(108 420)"><line x1="0" y1="0" x2="24" y2="0"/><line x1="0" y1="0" x2="0" y2="-24"/><text x="28" y="4">X</text><text x="-4" y="-29">Y</text><text x="8" y="16">MAP ORIGIN</text></g>
  </svg>`;
}

function renderDashboardCockpit() {
  setActions(`<button class="btn" data-go="traffic-overview.html">实时交通</button>`);
  content(`
    <div class="overview-cockpit">
      <aside class="overview-side">
        <section class="overview-health">
          <div class="overview-section-head"><span>运行状态</span>${badge("LIVE","blue")}</div>
          <div class="overview-metric"><span>AMR 在线</span><strong>6 <small>/ 6</small></strong><i class="health-ok">100%</i></div>
          <div class="overview-metric"><span>执行中任务</span><strong>3</strong><i>待调度 2</i></div>
          <div class="overview-metric"><span>等待机台</span><strong>2</strong><i class="health-warn">最长 04:18</i></div>
          <div class="overview-metric"><span>交通占用</span><strong>4</strong><i>1 台等待</i></div>
        </section>
        <section class="overview-panel compact-list">
          <div class="overview-section-head"><span>AMR 状态</span><button data-go="agv-list.html">全部 →</button></div>
          ${AMRS.slice(0,5).map(a=>`<div class="overview-row" data-go="agv-detail.html"><span class="unit-dot ${a[5]}"></span><span><b>${a[0]}</b><small>${a[3]}</small></span><em>${a[1]}</em></div>`).join("")}
        </section>
      </aside>
      <section class="overview-map">
        <div class="overview-map-head">
          <div><span class="scope-kicker">数字孪生 · 当前运行范围</span><strong>2F / MAP-A · 装配物流区</strong></div>
          <div class="map-legend"><span><i class="blue"></i>执行中</span><span><i class="amber"></i>等待</span><span><i class="red"></i>异常</span></div>
        </div>
        <div class="overview-map-stage">${factoryMap()}</div>
        <div class="overview-map-foot"><span>AMR 6 · 设备 14 · 任务 5</span><span>最后更新 <b id="mapClock">--:--:--</b></span></div>
      </section>
      <aside class="overview-side right">
        <section class="overview-panel task-feed">
          <div class="overview-section-head"><span>当前任务</span><button data-go="task-list.html">全部 →</button></div>
          ${TASKS.slice(0,3).map(t=>`<div class="overview-task"><div><b>${t[0]}</b>${badge(t[5],statusTone(t[5]))}</div><strong>${t[2]} → ${t[3]}</strong><small>${t[1]} · ${t[4]}</small></div>`).join("")}
        </section>
        <section class="overview-panel alert-feed">
          <div class="overview-section-head"><span>运行异常</span><button data-go="operation-logs.html">记录 →</button></div>
          <div class="overview-alert critical"><span>严重</span><div><b>AMR-06 驱动器温度异常</b><small>10:46:02 · 已安全停车</small></div></div>
          <div class="overview-alert warning"><span>警告</span><div><b>CNC-03 等待 AMR 超时</b><small>10:45:12 · 已等待 02:16</small></div></div>
          <div class="overview-alert warning"><span>警告</span><div><b>ZONE-A3 路权等待偏长</b><small>10:43:48 · AMR-05</small></div></div>
        </section>
        <div class="overview-actions"><button data-go="map-editor.html">编辑地图</button><button data-go="api-workbench.html">API 测试</button></div>
      </aside>
    </div>
  `);
}

function renderDashboard() {
  setActions("");
  content(`
    <section class="twin-hud">
      <div class="hud-body">
        <aside class="hud-side left">
          <div class="hud-block utilization">
            <div class="hud-title">AMR运行概览</div>
            <div class="util-ring"><strong>81.5%</strong><span>任务利用率</span></div>
            <div class="hud-state-grid"><span><b>3</b>执行中</span><span><b>1</b>等待</span><span><b>1</b>充电</span><span class="danger"><b>1</b>异常</span></div>
          </div>
          <div class="hud-block battery-block">
            <div class="hud-title">电池电量分布</div>
            <div class="battery-band"><span><i style="height:24%"></i><b>0</b><small>0–20%</small></span><span><i style="height:42%"></i><b>1</b><small>20–50%</small></span><span><i style="height:64%"></i><b>2</b><small>50–80%</small></span><span><i style="height:88%"></i><b>3</b><small>80–100%</small></span></div>
          </div>
          <div class="hud-block hud-amr-list">
            <div class="hud-title">AMR状态</div>
            ${AMRS.slice(0,4).map(a=>`<div><span class="unit-dot ${a[5]}"></span><b>${a[0]}</b><em>${a[2]}</em><small>${a[1]}</small></div>`).join("")}
          </div>
        </aside>
        <div class="twin-stage-visual">
          <img src="../assets/images/digital-twin-factory-selected.png" alt="CNC车间AMR数字孪生背景">
          <div class="twin-visual-shade"></div>
        </div>
        <aside class="hud-side right">
          <div class="hud-block hud-task-list">
            <div class="hud-title">当前任务 <span>3 条执行中</span></div>
            ${TASKS.slice(0,3).map(t=>`<div><span><b>${t[0]}</b><small>${t[2]} → ${t[3]}</small></span>${badge(t[5],statusTone(t[5]))}</div>`).join("")}
          </div>
          <div class="hud-block traffic-mini">
            <div class="hud-title">交通资源</div>
            <div><span>已占用<strong>4</strong></span><span>等待路权<strong>1</strong></span><span>临时封锁<strong>1</strong></span></div>
          </div>
          <div class="hud-block hud-alert-list">
            <div class="hud-title">运行异常 <span>最近更新</span></div>
            <div class="critical"><i>严重</i><span><b>AMR-06 驱动器温度异常</b><small>14:06:02 · 已安全停车</small></span></div>
            <div><i>警告</i><span><b>CNC-03 等待AMR超时</b><small>14:05:12 · 已等待 02:16</small></span></div>
            <div><i>警告</i><span><b>ZONE-A3 路权等待偏长</b><small>14:03:48 · AMR-05</small></span></div>
          </div>
        </aside>
      </div>
    </section>
  `);
}

function renderAlertCenter() {
  setActions(`<button class="btn js-toast" data-message="告警列表已导出">导出记录</button><button class="btn primary js-toast" data-message="已批量确认所选告警">批量确认</button>`);
  const alerts = [
    ["ALT-260803-031", "严重", "AMR", "AMR-06", "驱动器温度超过安全阈值", "未确认", "2F / MAP-A", "10:46:02"],
    ["ALT-260803-030", "警告", "设备", "CNC-03", "等待 AMR 时间超过 2 分钟", "处理中", "2F / MAP-A", "10:45:12"],
    ["ALT-260803-029", "警告", "交通", "ZONE-A3", "路段资源等待时间偏长", "未确认", "2F / MAP-A", "10:43:48"],
    ["ALT-260803-028", "提示", "任务", "TSK-260803-018", "任务已自动重试一次", "已恢复", "2F / MAP-A", "10:39:26"],
    ["ALT-260803-027", "警告", "设备", "CNC-08", "设备心跳延迟 6.4 秒", "已确认", "1F / MAP-B", "10:32:15"],
    ["ALT-260803-026", "提示", "AMR", "AMR-04", "电量低于 45%，已生成充电任务", "已恢复", "2F / MAP-A", "10:28:44"]
  ].map(row => {
    const levelTone = row[1] === "严重" ? "red" : row[1] === "警告" ? "amber" : "blue";
    const stateTone = row[5] === "已恢复" ? "green" : row[5] === "处理中" ? "blue" : row[5] === "已确认" ? "gray" : "red";
    return `<tr class="js-detail" data-kind="告警" data-id="${row[0]}"><td><input type="checkbox" aria-label="选择 ${row[0]}"></td><td class="id">${row[0]}</td><td>${badge(row[1], levelTone)}</td><td>${row[2]}</td><td><b>${row[3]}</b></td><td>${row[4]}</td><td>${badge(row[5], stateTone)}</td><td class="mono muted">${row[6]}</td><td class="mono muted">${row[7]}</td><td><button class="btn small">处理</button></td></tr>`;
  });
  content(`
    <div class="stats-row alert-stats">
      <div class="stat-card red"><div class="stat-label">当前未恢复</div><div class="stat-value">3<small>条</small></div><span class="stat-foot">较昨日 -2</span></div>
      <div class="stat-card amber"><div class="stat-label">严重告警</div><div class="stat-value">1<small>条</small></div><span class="stat-foot">AMR-06</span></div>
      <div class="stat-card cyan"><div class="stat-label">处理中</div><div class="stat-value">1<small>条</small></div><span class="stat-foot">平均响应 46 秒</span></div>
      <div class="stat-card"><div class="stat-label">今日累计</div><div class="stat-value">12<small>条</small></div><span class="stat-foot">恢复率 75%</span></div>
    </div>
    ${toolbar({search:"搜索告警编号、对象或内容", filters:["全部级别", "全部来源", "全部状态"], right:`<select class="select"><option>2F / MAP-A</option><option>全部楼层和地图</option></select>`})}
    ${table(["", "告警编号", "级别", "来源", "告警对象", "告警内容", "状态", "楼层 / 地图", "发生时间", "操作"], alerts, ["38px", "130px", "72px", "68px", "105px", "24%", "82px", "120px", "86px", "72px"])}
  `);
}

function renderTraffic() {
  if (PAGE_ID === "traffic-records") return renderTrafficRecords();
  if (PAGE_ID === "traffic-record-detail") return renderTrafficRecordDetail();
  setActions(`<span class="live-indicator"><i></i> 实时更新</span><button class="btn js-traffic-block">临时封锁</button>`);
  content(`
    <div class="traffic-monitor-shell">
      <aside class="work-pane traffic-amr-pane">
        <div class="pane-head"><span class="pane-title">运行 AMR</span><span class="muted">4 台</span></div>
        <div class="traffic-amr-list">
          <button class="traffic-amr-row active"><span class="unit-dot blue"></span><span><b>AMR-01</b><small>TSK-260804-001 · CNC-01 → BUF-01</small><em>NAVIGATE_TO_BUFFER</em></span>${badge("一致","green")}</button>
          <button class="traffic-amr-row"><span class="unit-dot blue"></span><span><b>AMR-03</b><small>TSK-260804-004 · CNC-07 → BUF-02</small><em>等待 ZONE-A3</em></span>${badge("等待","amber")}</button>
          <button class="traffic-amr-row alert"><span class="unit-dot red"></span><span><b>AMR-04</b><small>TSK-260804-005 · CNC-03 → BUF-01</small><em>局部避障后重新规划</em></span>${badge("偏离","red")}</button>
          <button class="traffic-amr-row"><span class="unit-dot cyan"></span><span><b>AMR-05</b><small>TSK-260804-006 · BUF-02 → CHG-01</small><em>交通资源等待</em></span>${badge("等待","amber")}</button>
        </div>
      </aside>
      <section class="map-pane">
        <div class="traffic-map-toolbar"><div class="traffic-route-legend"><span><i class="planned"></i>任务最优路径</span><span><i class="current"></i>AMR当前路径</span><span><i class="actual"></i>实际轨迹</span><span><i class="event"></i>重规划点</span></div><div><button class="map-tool active js-traffic-layer">路径</button><button class="map-tool active js-traffic-layer">资源</button><button class="map-tool js-traffic-layer">障碍</button></div></div>
        <div class="map-stage traffic-live-stage">${trafficNetworkMap()}<svg class="traffic-route-overlay" viewBox="0 0 760 500" preserveAspectRatio="xMidYMin meet" aria-label="路径对比"><path class="route-planned" d="M150 92V257H426V422H610"/><path class="route-actual" d="M150 92V224L242 290V257H334V224L426 290V422H610"/><path class="route-current" d="M334 224L426 290V422H610"/><circle class="route-replan" cx="334" cy="224" r="7"/><g class="route-amr" transform="translate(426 338)"><rect x="-13" y="-9" width="26" height="18" rx="5"/><text y="3">01</text></g></svg></div>
        <div class="map-footer"><span>实际坐标 <b>X 24.860 · Y 13.420 · θ 90°</b></span><span>目标坐标 <b>X 42.600 · Y 8.350 · θ 180°</b></span></div>
      </section>
      <aside class="work-pane traffic-path-pane">
        <div class="pane-head"><span class="pane-title">路径对比</span>${badge("路径一致","green")}</div>
        <div class="traffic-path-summary"><span><small>任务路线</small><strong>CNC-01 → BUF-01</strong></span><span><small>当前位置</small><strong>ZONE-B1 / P-18</strong></span></div>
        <div class="property-section"><h4>路径指标</h4><div class="property-list"><div class="property"><span>当前朝向</span><strong>90°</strong></div><div class="property"><span>规划距离</span><strong>48.6 m</strong></div><div class="property"><span>当前路径</span><strong>51.2 m</strong></div><div class="property"><span>已行驶</span><strong>32.4 m</strong></div><div class="property"><span>距离偏差</span><strong class="text-amber">+5.3%</strong></div><div class="property"><span>预计到达</span><strong>01:36</strong></div><div class="property"><span>重规划次数</span><strong>1 次</strong></div></div></div>
        <div class="property-section"><h4>最近路径事件</h4><div class="traffic-event-list"><div><i class="green"></i><span><b>通过 ZONE-A3</b><small>15:06:42 · 无等待</small></span></div><div><i class="blue"></i><span><b>局部路径重新规划</b><small>15:07:08 · 临时障碍</small></span></div><div><i></i><span><b>前往 BUF-01</b><small>当前执行</small></span></div></div></div>
        <div class="traffic-pane-actions"><button class="btn small" data-go="task-detail.html">查看任务</button><button class="btn small" data-go="traffic-records.html">历史记录</button></div>
      </aside>
    </div>`);
}

function renderTrafficRecords() {
  const rows = [
    ["TRF-260805-018","AMR-01","TSK-260804-001","CNC-01 → BUF-01","48.6 m","51.2 m","+5.3%","1","6s","执行中","blue"],
    ["TRF-260805-017","AMR-03","TSK-260804-004","CNC-07 → BUF-02","36.4 m","42.8 m","+17.6%","2","18s","已到达","green"],
    ["TRF-260805-016","AMR-04","TSK-260804-005","CNC-03 → BUF-01","31.8 m","44.1 m","+38.7%","3","0s","异常终止","red"],
    ["TRF-260805-015","AMR-02","TSK-260804-006","BUF-03 → CHG-01","28.2 m","28.5 m","+1.1%","0","4s","已到达","green"],
    ["TRF-260805-014","AMR-05","TSK-260804-003","ST-01 → CNC-02","52.6 m","57.9 m","+10.1%","1","26s","已到达","green"]
  ].map(r=>`<tr class="drill-row" data-go="traffic-record-detail.html"><td class="id">${r[0]}</td><td><b>${r[1]}</b></td><td class="id">${r[2]}</td><td>${r[3]}</td><td class="mono">${r[4]}</td><td class="mono">${r[5]}</td><td class="mono ${Number.parseFloat(r[6])>20?'text-red':'muted'}">${r[6]}</td><td>${r[7]}</td><td>${r[8]}</td><td>${badge(r[9],r[10])}</td><td><button class="btn small" data-go="traffic-record-detail.html">查看</button></td></tr>`);
  content(`<div class="stats-row"><div class="stat-card"><div class="stat-label">今日路径执行</div><div class="stat-value">42<small>次</small></div><span class="stat-foot">已完成 37</span></div><div class="stat-card cyan"><div class="stat-label">平均路径偏差</div><div class="stat-value">6.8<small>%</small></div><span class="stat-foot">目标 ≤ 10%</span></div><div class="stat-card amber"><div class="stat-label">重规划</div><div class="stat-value">7<small>次</small></div><span class="stat-foot">避障 5 · 交通 2</span></div><div class="stat-card red"><div class="stat-label">异常终止</div><div class="stat-value">1<small>次</small></div><span class="stat-foot">AMR-04</span></div></div>${toolbar({search:"搜索交通记录、AMR 或任务单",filters:["全部执行结果","全部偏差范围","今日"]})}${table(["记录编号","AMR","任务单","起点 / 终点","规划距离","实际距离","路径偏差","重规划","交通等待","结果","操作"],rows,["125px","80px","130px","160px","90px","90px","85px","70px","85px","85px","82px"])}`);
}

function renderTrafficRecordDetail() {
  setActions(`<button class="btn back-btn" data-go="traffic-records.html">← 返回交通记录</button><button class="btn" data-go="task-detail.html">查看关联任务</button>`);
  content(`<div class="decision-banner"><span>TRAFFIC TRACE / TRF-260805-018</span><strong>AMR-01 · CNC-01 → BUF-01</strong><small>TSK-260804-001 · 执行中 · 规划 48.6 m / 当前 51.2 m</small></div><div class="traffic-replay-layout"><section class="panel"><div class="panel-head"><span class="panel-title">路径回放</span><div class="traffic-route-legend"><span><i class="planned"></i>任务最优路径</span><span><i class="current"></i>最终路径</span><span><i class="actual"></i>实际轨迹</span></div></div><div class="map-stage traffic-live-stage replay">${factoryMap()}<svg class="traffic-route-overlay" viewBox="0 0 760 480"><path class="route-planned" d="M118 350H226V310H370V236H548V350H640"/><path class="route-actual" d="M118 350H226V310H340Q365 310 365 282V253Q365 236 382 236H548V350H640"/><path class="route-current" d="M365 282V253Q365 236 382 236H548V350H640"/><circle class="route-replan" cx="365" cy="282" r="7"/></svg></div></section><aside class="panel"><div class="panel-head"><span class="panel-title">执行摘要</span>${badge("执行中","blue")}</div><div class="panel-body property-list"><div class="property"><span>规划距离</span><strong>48.6 m</strong></div><div class="property"><span>当前路径</span><strong>51.2 m</strong></div><div class="property"><span>路径偏差</span><strong>+5.3%</strong></div><div class="property"><span>重规划</span><strong>1 次</strong></div><div class="property"><span>交通等待</span><strong>6 秒</strong></div><div class="property"><span>最高速度</span><strong>1.2 m/s</strong></div></div></aside></div><section class="panel mt-14"><div class="panel-head"><span class="panel-title">路径事件</span><span class="muted">按时间顺序</span></div><div class="adjacent-events traffic-events-wide"><div class="done"><i>01</i><span><small>15:04:18</small><strong>PATH_PLANNED</strong><em>生成任务最优路径 48.6 m</em></span></div><div class="done"><i>02</i><span><small>15:06:42</small><strong>ZONE_RELEASED</strong><em>释放 ZONE-A3</em></span></div><div class="active"><i>03</i><span><small>15:07:08</small><strong>PATH_REPLANNED</strong><em>临时障碍触发局部重规划</em></span></div><div><i>04</i><span><small>等待</small><strong>ARRIVE_TARGET</strong><em>到达 BUF-01</em></span></div></div></section>`);
}

function legacyRenderMapList() {
  setActions(`<button class="btn primary js-new-map">＋ 创建地图</button>`);
  const maps = [
    ["MAP-A","装配物流区","2F","AMR 扫描","已发布","V1.8","V1.9 草稿","07-31 09:40"],
    ["MAP-B","CNC 二号线测试区","1F","文件导入","草稿","—","V0.4","07-30 16:12"],
    ["MAP-C","空白联调区域","2F","空白创建","空白","—","V0.1","07-29 14:35"]
  ].map((r,i)=>`<tr><td class="id">${r[0]}</td><td><b>${r[1]}</b>${i===0?'<small class="table-sub">当前全局地图</small>':''}</td><td>${r[2]}</td><td>${r[3]}</td><td>${badge(r[4],statusTone(r[4]))}</td><td class="mono">${r[5]}</td><td class="mono">${r[6]}</td><td class="mono muted">${r[7]}</td><td><button class="btn small" data-go="map-editor.html">设为当前并编辑</button></td></tr>`);
  content(`<div class="map-management-note"><span class="note-icon">i</span><div><strong>地图管理只维护地图实体与版本</strong><p>道路、点位、设备映射和管制区域请进入地图编辑器处理；切换当前地图后，顶部全局运行范围会同步更新。</p></div></div>${toolbar({search:"搜索地图编号或名称",filters:["全部楼层","全部来源","全部状态"]})}${table(["编号","地图名称","楼层","创建来源","状态","运行版本","编辑版本","更新时间","操作"],maps,["90px","18%","70px","100px","85px","90px","105px","110px","145px"])}`);
}

function legacyRenderMapEditor() {
  setActions(`<button class="btn js-map-import">导入地图 ▾</button><button class="btn js-validate">校验</button><button class="btn js-toast" data-message="V1.9 地图草稿已保存">保存草稿</button><button class="btn primary js-publish">发布 V1.9</button>`);
  content(`
    <div class="map-version-strip">
      <div><span class="scope-kicker">当前全局地图</span><strong>2F / MAP-A · 装配物流区</strong></div>
      <div class="version-pair"><span>运行版本 <b>V1.8</b>${badge("在线使用","green")}</span><i>→</i><span>编辑版本 <b>V1.9</b>${badge("未发布","amber")}</span></div>
      <div class="version-save"><span class="dot"></span>已保存 · 张凯 · 10:46</div>
    </div>
    <div class="editor-shell">
      <aside class="work-pane">
        <div class="pane-head"><span class="pane-title">编辑工具</span><span class="mono muted">V1.9 草稿</span></div>
        <div class="tool-list">
          <button class="editor-tool active" data-tool="select"><b>↖</b>选择</button>
          <button class="editor-tool" data-tool="lane"><b>╱</b>道路</button>
          <button class="editor-tool" data-tool="point"><b>●</b>点位</button>
          <button class="editor-tool" data-tool="area"><b>□</b>区域</button>
          <button class="editor-tool" data-tool="device"><b>▣</b>设备</button>
          <button class="editor-tool" data-tool="measure"><b>↔</b>测距</button>
        </div>
        <div class="pane-head"><span class="pane-title">业务图层</span></div>
        <div class="object-list">
          ${[["基础栅格地图","AMR-03 扫描 · V1.9"],["导航道路与方向","12 条道路"],["站点与停靠点","32 个点位"],["机台设备映射","14 台设备"],["交通资源","12 个资源"],["地图校验区域","3 个检测区域"],["禁行与限速区域","5 个区域"],["坐标网格","辅助图层"]].map((x,i)=>`<label class="object-row"><input type="checkbox" ${i<7?"checked":""}><span class="object-copy"><strong>${x[0]}</strong><small>${x[1]}</small></span></label>`).join("")}
        </div>
      </aside>
      <section class="map-pane" id="editorMap">
        <div class="map-toolbar"><button class="map-tool">−</button><button class="map-tool">100%</button><button class="map-tool">＋</button><button class="map-tool">适应画布</button></div>
        <div class="map-stage editor-occupancy-stage">${occupancyGridMap()}</div>
        <div class="validation-bar" id="validationBar"><b>V1.9 草稿就绪</b><span class="muted">扫描底图不会直接覆盖运行版本；完成业务图层配置、校验并发布后生效</span></div>
      </section>
      <aside class="work-pane">
        <div class="pane-head"><span class="pane-title">对象属性</span>${badge("道路","blue")}</div>
        <div class="property-section">
          <div class="form-row"><label>对象名称</label><input value="LANE-A03"></div>
          <div class="form-row mt-14"><label>道路方向</label><select><option>双向通行</option><option>单向通行</option></select></div>
          <div class="form-row mt-14"><label>显示限速</label><div style="display:grid;grid-template-columns:1fr 50px;gap:8px"><input type="range" min="0" max="2" step=".1" value="1.2"><input value="1.2"></div></div>
        </div>
        <div class="property-section">
          <h4>几何信息</h4>
          <div class="property-list">
            <div class="property"><span>起点</span><strong>P-05</strong></div>
            <div class="property"><span>终点</span><strong>P-06</strong></div>
            <div class="property"><span>长度</span><strong>8.42 m</strong></div>
            <div class="property"><span>状态</span><strong>允许通行</strong></div>
          </div>
        </div>
        <div class="property-section"><button class="btn danger small">删除对象</button></div>
      </aside>
    </div>`);
}

function legacyRenderMapListV2() {
  setActions(`<button class="btn js-map-resource-manager">关联资源</button><button class="btn primary js-new-map">＋ 创建地图</button>`);
  const maps = [
    {id:"MAP-A",name:"装配物流区",floor:"2F",source:"AMR-03 扫描",state:"运行中",tone:"green",run:"V1.8",draft:"V1.9",amr:"6 / 6",device:"14 / 14",traffic:"12",readiness:92,time:"今日 14:36"},
    {id:"MAP-B",name:"CNC 二号线测试区",floor:"1F",source:"文件导入",state:"待校验",tone:"amber",run:"—",draft:"V0.4",amr:"2 / 2",device:"7 / 9",traffic:"4",readiness:76,time:"昨日 16:12"},
    {id:"MAP-C",name:"联调与仿真区",floor:"2F",source:"未添加底图",state:"待导入底图",tone:"gray",run:"—",draft:"V0.1",amr:"0 / 2",device:"0 / 4",traffic:"0",readiness:28,time:"07-29 14:35"}
  ];
  content(`
    <section class="map-portfolio-head">
      <div><span class="scope-kicker">MAP WORKSPACE</span><h2>地图项目</h2><p>先完成底图、AMR 与现场设备关联，再进入编辑器建立可运行的逻辑地图。</p></div>
      <div class="map-portfolio-summary"><span><b>3</b>地图项目</span><span><b>1</b>运行中</span><span class="warning"><b>2</b>待完成配置</span></div>
    </section>
    ${toolbar({search:"搜索地图编号、名称或资源",filters:["全部楼层","全部状态"],right:`<span class="muted">运行地图由顶部范围统一切换</span>`})}
    <div class="map-project-list">
      ${maps.map((map,index)=>`<article class="map-project-card ${index===0?"active":""}">
        <div class="map-project-identity"><span class="map-project-code">${map.id}</span><div><h3>${map.name}</h3><p>${map.floor} · ${map.source}</p></div>${badge(map.state,map.tone)}</div>
        <div class="map-project-preview"><div class="mini-map-scan"><i></i><i></i><i></i><span></span></div><div class="map-preview-caption"><b>${map.run==="—"?"尚无运行版本":`${map.run} 正在运行`}</b><small>编辑草稿 ${map.draft}</small></div></div>
        <div class="map-resource-readiness"><div><span>适用 AMR</span><strong>${map.amr}</strong></div><div><span>设备已定位</span><strong>${map.device}</strong></div><div><span>交通资源</span><strong>${map.traffic}</strong></div></div>
        <div class="map-completion"><span><b>配置完成度</b><em>${map.readiness}%</em></span><i><b style="width:${map.readiness}%"></b></i><small>最后更新 ${map.time}</small></div>
        <div class="map-project-actions"><button class="btn small js-map-overview" data-id="${map.id}">查看配置</button><button class="btn small js-map-resource-manager" data-id="${map.id}">资源关联</button><button class="btn primary small" data-go="map-editor.html">打开编辑器 →</button></div>
      </article>`).join("")}
    </div>`);
}

function legacyRenderMapEditorV2() {
  setActions(`<button class="btn" data-go="map-list.html">← 返回地图管理</button><span class="action-divider"></span><button class="btn js-validate">运行校验</button><button class="btn js-toast" data-message="V1.9 草稿已保存">保存草稿</button><button class="btn primary js-publish">发布与下发</button>`);
  content(`
    <div class="map-version-strip">
      <div><span class="scope-kicker">地图工程工作台</span><strong>MAP-A · 2F 装配物流区</strong></div>
      <div class="version-pair"><span>运行版本 <b>V1.8</b>${badge("只读","green")}</span><i>基于</i><span>编辑草稿 <b>V1.9</b>${badge("未发布","amber")}</span></div>
      <div class="version-save"><span class="dot"></span>自动保存完成 · 14:36</div>
    </div>
    <div class="editor-shell map-engineering-shell">
      <aside class="work-pane">
        <div class="editor-side-tabs"><button class="active" data-editor-tab="layers">图层</button><button data-editor-tab="resources">资源库 <b>3</b></button></div>
        <div class="editor-side-panel" data-editor-panel="layers">
          <div class="layer-group"><span>物理底图</span><label class="layer-row"><input class="js-layer-toggle" data-layer="scan" type="checkbox" checked><i class="layer-glyph scan"></i><b>AMR 扫描底图</b><small>锁定</small></label></div>
          <div class="layer-group"><span>逻辑地图</span>${[["lane","导航拓扑","12 条"],["point","站点与端点","32 个"],["device","现场设备","14 台"],["traffic","交通资源","12 个"],["safety","禁行与限速","5 个"]].map((x,i)=>`<label class="layer-row ${i===0?"selected":""}"><input type="checkbox" checked><i class="layer-glyph ${x[0]}"></i><b>${x[1]}</b><small>${x[2]}</small></label>`).join("")}</div>
        </div>
        <div class="editor-side-panel hidden" data-editor-panel="resources">
          <div class="resource-library-head"><span>已关联、尚未定位</span><b>3</b></div>
          ${[["CNC-09","CNC 设备","DV"],["BUF-03","成品缓冲区","BF"],["GATE-03","自动门","GT"]].map(x=>`<button class="resource-library-item js-place-resource" data-resource="${x[0]}"><i>${x[2]}</i><span><b>${x[0]}</b><small>${x[1]}</small></span><em>拖入画布</em></button>`).join("")}
        </div>
      </aside>
      <section class="map-pane" id="editorMap">
        <div class="map-editor-commandbar">
          <div class="command-tools"><button class="editor-command active" data-tool="select" title="选择 (V)">↖<small>选择</small></button><button class="editor-command" data-tool="lane">╱<small>道路</small></button><button class="editor-command" data-tool="point">●<small>站点</small></button><button class="editor-command" data-tool="area">□<small>管制区</small></button><button class="editor-command" data-tool="measure">↔<small>测距</small></button></div>
          <div class="map-view-switch"><button data-map-view="scan">底图</button><button data-map-view="logic">逻辑图</button><button class="active" data-map-view="overlay">叠加</button></div>
          <div class="zoom-tools"><button>−</button><span>100%</span><button>＋</button><button>适应</button></div>
        </div>
        <div class="map-stage editor-occupancy-stage">${occupancyGridMap()}</div>
        <div class="map-canvas-legend"><span><i class="scan"></i>扫描底图</span><span><i class="route"></i>导航道路</span><span><i class="zone"></i>管制区域</span></div>
        <div class="validation-bar" id="validationBar"><b>V1.9 草稿可编辑</b><span>已连接 12 条道路</span><span>3 个资源待定位</span><span class="muted">扫描底图为只读参照</span></div>
      </section>
      <aside class="work-pane">
        <div class="pane-head"><span class="pane-title">对象属性</span>${badge("导航道路","blue")}</div>
        <div class="selection-identity"><span class="selection-symbol">╱</span><div><strong>LANE-A03</strong><small>连接 P-05 → P-06</small></div></div>
        <div class="property-section"><h4>通行规则</h4><div class="form-row"><label>通行方向</label><select><option>双向通行</option><option>P-05 → P-06</option><option>P-06 → P-05</option></select></div><div class="form-row mt-14"><label>最高速度</label><div class="input-unit"><input value="1.2"><span>m/s</span></div></div><div class="form-row mt-14"><label>适用 AMR 组</label><select><option>全部 AMR</option><option>LP-200 轻载组</option><option>潜伏顶升组</option></select></div></div>
        <div class="property-section"><h4>几何信息</h4><div class="property-list"><div class="property"><span>起点</span><strong>P-05</strong></div><div class="property"><span>终点</span><strong>P-06</strong></div><div class="property"><span>长度</span><strong>8.42 m</strong></div><div class="property"><span>道路宽度</span><strong>1.80 m</strong></div></div></div>
        <div class="property-section"><label class="property-toggle"><span><b>允许路径规划</b><small>关闭后任务不会使用该道路</small></span><input type="checkbox" checked></label></div>
        <div class="property-section property-danger"><button class="btn danger small">删除道路</button></div>
      </aside>
    </div>`);
}

function mapCardPreview(mapId) {
  const variants = {
    "MAP-A": `<path d="M52 45h96v34h54v-22h94v67h-45v48H128v-28H52zM166 89h61v45h-61z"/><path class="map-wall-soft" d="M72 64h54v18H72zm12 58h62v18H84zm151-47h42v24h-42z"/><path class="map-route-line" d="M46 158h72v-35h88V96h76v54h48"/><circle cx="46" cy="158" r="5"/><circle cx="118" cy="123" r="5"/><circle cx="206" cy="96" r="5"/><circle cx="282" cy="150" r="5"/>`,
    "MAP-B": `<path d="M45 49h84v30h35V48h138v41h-38v37h52v46H181v-31h-52v31H45v-48h39V91H45z"/><path class="map-wall-soft" d="M62 62h51v12H62zm121 2h95v13h-95zm16 86h93v13h-93z"/><path class="map-route-line" d="M38 112h74l31-24h82l28 38h70"/><circle cx="38" cy="112" r="5"/><circle cx="143" cy="88" r="5"/><circle cx="253" cy="126" r="5"/><circle cx="323" cy="126" r="5"/>`,
    "MAP-C": `<path class="map-empty-outline" d="M46 48h112v45h58V58h105v111H210v-34h-64v34H46z"/><path class="map-wall-soft" d="M66 66h72v13H66zm170 11h64v14h-64z"/><path class="map-route-line muted-route" d="M55 145h82l42-31h78l54 27"/><circle cx="55" cy="145" r="5"/><circle cx="179" cy="114" r="5"/><circle cx="311" cy="141" r="5"/>`
  };
  const previewNodes = [72,116,160,204,248,292].flatMap(x=>[42,76,110,144,178].map(y=>[x,y]));
  const logic = `<g class="map-preview-plan"><path class="map-route-line" d="M72 42V178 M116 42V178 M160 42V178 M204 42V178 M248 42V178 M292 42V178 M34 110H326 M34 178H326"/>${previewNodes.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.8"/>`).join("")}</g>`;
  return `<svg viewBox="0 0 360 210" role="img" aria-label="${mapId} 地图缩略图">${mapId === "MAP-C" ? "" : `<image class="map-card-pointcloud" href="../assets/images/cnc-pointcloud-map.png" width="360" height="210" preserveAspectRatio="none"/>${logic}`}</svg>`;
}

function renderMapList() {
  setActions(`<button class="btn primary js-new-map">＋ 创建地图</button>`);
  const maps = [
    {id:"MAP-A",name:"装配物流区",project:"CNC 物流一期",floor:"2F",source:"AMR-03 扫描",resources:"6 AMR · 14 设备",run:"V1.8",draft:"V1.9",state:"运行中",tone:"green",owner:"张凯",time:"今日 14:36",objects:"12 道路 · 32 端点"},
    {id:"MAP-B",name:"CNC 二号线测试区",project:"CNC 物流一期",floor:"1F",source:"文件导入",resources:"2 AMR · 9 设备",run:"—",draft:"V0.4",state:"待发布",tone:"amber",owner:"林工",time:"昨日 16:12",objects:"8 道路 · 21 端点"},
    {id:"MAP-C",name:"联调与仿真区",project:"联调专案",floor:"2F",source:"未添加底图",resources:"2 AMR · 4 设备",run:"—",draft:"V0.1",state:"初始化",tone:"gray",owner:"陈工",time:"07-29 14:35",objects:"草稿尚未绘制"}
  ];
  const cards = maps.map(map=>`<article class="map-library-card" data-go="map-editor.html" data-map-id="${map.id}" tabindex="0" role="link" aria-label="打开 ${map.name} 地图编辑器">
    <div class="map-card-preview ${map.id === "MAP-C" ? "is-empty" : ""}">${mapCardPreview(map.id)}<span class="map-card-code">${map.id} / ${map.floor}</span><span class="map-card-state">${badge(map.state,map.tone)}</span><span class="map-card-open">打开地图编辑器 <i>↗</i></span></div>
    <div class="map-card-body"><div class="map-card-title"><span><h3>${map.name}</h3><small>${map.project}</small></span><button class="map-card-settings js-map-manage" data-map-id="${map.id}" aria-label="编辑 ${map.name} 地图资料">•••</button></div>
      <div class="map-card-facts"><span><small>扫描底图</small><strong>${map.source}</strong></span><span><small>资源范围</small><strong>${map.resources}</strong></span><span><small>逻辑对象</small><strong>${map.objects}</strong></span></div>
      <footer><span>运行 <b>${map.run}</b> · 草稿 <b>${map.draft}</b></span><span>${map.owner} · ${map.time}</span></footer>
    </div>
  </article>`).join("");
  content(`${toolbar({search:"搜索地图名称、编号或专案",filters:["全部楼层","全部状态","全部底图来源"],right:`<span class="muted">点击卡片进入地图编辑器</span>`})}<div class="map-library-grid">${cards}</div>`);
}

function renderMapLogs() {
  setActions(`<button class="btn">导出日志</button>`);
  const logs = [
    ["今日 14:36","逻辑地图编辑","MAP-A","V1.9","张凯","调整 LANE-A03 通行方向与最高速度","变更已保存","blue"],
    ["今日 14:21","资料修改","MAP-A","—","张凯","新增关联设备 BUF-03、GATE-03","3 个资源待定位","amber"],
    ["今日 13:58","地图发布","MAP-A","V1.8","系统管理员","校验通过并下发至 AMR-01 — AMR-06","下发完成","green"],
    ["昨日 16:12","逻辑地图编辑","MAP-B","V0.4","林工","新增 2 条导航道路与 4 个业务端点","变更已保存","blue"],
    ["07-29 14:35","创建地图","MAP-C","V0.1","陈工","创建联调与仿真区，尚未添加扫描底图","初始化完成","gray"],
    ["07-28 10:06","资料修改","MAP-B","—","林工","更换扫描底图文件 cnc_line2_v3.pgm","底图已更新","amber"]
  ];
  const rows = logs.map(log=>`<tr><td class="mono muted">${log[0]}</td><td><span class="map-log-type ${log[7]}">${log[1]}</span></td><td><strong class="id">${log[2]}</strong></td><td class="mono">${log[3]}</td><td>${log[4]}</td><td><strong>${log[5]}</strong><small class="cell-note">${log[6]}</small></td><td><button class="btn ghost small js-toast" data-message="已打开该操作的变更详情">查看</button></td></tr>`);
  content(`${toolbar({search:"搜索地图、操作人或变更内容",filters:["全部地图","全部操作类型","全部操作人"],right:`<span class="muted">日志保留创建、编辑、修改、发布与下发记录</span>`})}${table(["操作时间","操作类型","地图","版本","操作人","变更内容",""],rows,["120px","105px","80px","75px","90px","auto","70px"])}`);
}

function renderMapEditor() {
  setActions("");
  content(`<div class="map-editor-workbench">
    <header class="map-editor-topline">
      <div class="editor-map-context"><button class="editor-exit" data-go="map-list.html" aria-label="返回地图管理">←</button><nav class="editor-path" aria-label="页面层级"><span>地图管理</span><i>/</i><span>装配物流区</span><i>/</i><strong>地图编辑器</strong></nav><span class="editor-map-id">MAP-A</span><span class="editor-version">V1.9 草稿</span><small>基于 V1.8</small><span class="editor-save-state"><i></i>已自动保存</span></div>
      <div class="editor-history"><button class="icon-command" title="撤销">↶</button><button class="icon-command" title="重做">↷</button></div>
      <div class="editor-primary-actions"><button class="btn small js-validate">校验</button><button class="btn small js-toast" data-message="V1.9 草稿已保存">保存</button><button class="btn primary small js-publish">发布与下发</button></div>
    </header>
    <div class="editor-shell map-canvas-shell">
      <aside class="work-pane editor-object-pane" data-editor-pane="objects">
        <div class="editor-panel-head"><strong>对象</strong><button class="panel-collapse" data-collapse-pane="objects" aria-label="折叠对象面板">‹</button></div>
        <div class="editor-tree-search"><input placeholder="搜索对象"><button>＋</button></div>
        <div class="map-object-tree">
          <section><button class="tree-group"><i>⌄</i><b>扫描底图</b><small>1</small></button><div class="tree-node locked"><span class="tree-eye">◉</span><i class="layer-glyph scan"></i><b>SCN-260804-018</b><small>锁定</small></div></section>
          <section><button class="tree-group"><i>⌄</i><b>导航道路</b><small>12</small></button>${["LANE-A01","LANE-A02","LANE-A03","LANE-B01"].map((x,i)=>`<button class="tree-node ${i===2?"selected":""}"><span class="tree-eye">◉</span><i class="layer-glyph lane"></i><b>${x}</b></button>`).join("")}</section>
          <section><button class="tree-group"><i>⌄</i><b>业务端点</b><small>32</small></button>${[["CNC-01","取货"],["BUF-01","放货"],["CHG-01","充电"]].map(x=>`<button class="tree-node"><span class="tree-eye">◉</span><i class="layer-glyph point"></i><b>${x[0]}</b><small>${x[1]}</small></button>`).join("")}</section>
          <section><button class="tree-group"><i>⌄</i><b>交通资源</b><small>12</small></button>${[["ZONE-A3","窄通道","traffic"],["INT-01","交叉路口","traffic"],["MUTEX-B1","互斥区","traffic"],["SPD-A1","限速区","safety"]].map((x,i)=>`<button class="tree-node ${i===0?"selected":""}"><span class="tree-eye">◉</span><i class="layer-glyph ${x[2]}"></i><b>${x[0]}</b><small>${x[1]}</small></button>`).join("")}</section><section><button class="tree-group"><i>›</i><b>禁行区域</b><small>2</small></button></section>
        </div>
        <button class="unplaced-resources js-unplaced-resources"><span><b>3</b>个资源待定位</span><i>›</i></button>
      </aside>
      <section class="map-pane editor-main-canvas" id="editorMap">
        <div class="map-editor-commandbar compact">
          <div class="command-tools"><button class="editor-command active" data-tool="select" title="选择 (V)">↖<small>选择</small></button><button class="editor-command" data-tool="pan">✋<small>平移</small></button><button class="editor-command" data-tool="lane">╱<small>道路</small></button><button class="editor-command" data-tool="point">●<small>端点</small></button><button class="editor-command" data-tool="device">▣<small>设备</small></button><button class="editor-command traffic-command" data-tool="traffic">◇<small>交通资源</small></button><button class="editor-command" data-tool="area">□<small>区域</small></button><button class="editor-command" data-tool="measure">↔<small>测距</small></button></div>
          <div class="map-view-switch"><button data-map-view="scan">底图</button><button data-map-view="logic">逻辑图</button><button class="active" data-map-view="overlay">叠加</button></div>
          <div class="zoom-tools"><button>−</button><span>100%</span><button>＋</button><button>适应</button></div>
        </div>
        <div class="map-stage editor-occupancy-stage">${occupancyGridMap()}</div>
        <div class="map-canvas-legend compact"><span><i class="scan"></i>底图</span><span><i class="route"></i>导航道路</span><span><i class="zone"></i>交通资源</span></div>
      </section>
      <aside class="work-pane editor-property-pane" data-editor-pane="properties">
        <div class="editor-panel-head"><strong>对象属性</strong><button class="panel-collapse" data-collapse-pane="properties" aria-label="折叠属性面板">›</button></div>
        <div class="selection-identity traffic-selection"><span class="selection-symbol">◇</span><div><strong>ZONE-A3</strong><small>交通资源 · 一号线窄通道</small></div></div>
        <div class="traffic-create-hint"><b>基于地图对象创建</b><span>先选择道路或绘制区域，再使用“交通资源”工具建立管制语义。</span></div>
        <div class="property-section"><h4>资源定义</h4><div class="form-row"><label>资源名称</label><input value="一号线窄通道"></div><div class="form-row mt-14"><label>资源类型</label><select><option>窄通道</option><option>交叉路口</option><option>互斥区域</option><option>会车区</option><option>限速区</option></select></div><div class="form-row mt-14"><label>关联道路</label><div class="resource-reference"><span>LANE-A03</span><span>LANE-A04</span><button>＋</button></div></div></div>
        <div class="property-section"><h4>通行规则</h4><div class="form-grid single"><div class="form-row"><label>最大占用</label><div class="input-unit"><input value="1"><span>台</span></div></div><div class="form-row"><label>通行方向</label><select><option>P-05 → P-06</option><option>双向通行</option></select></div><div class="form-row"><label>进入等待点</label><select><option>WAIT-A3-IN</option></select></div><div class="form-row"><label>退出等待点</label><select><option>WAIT-A3-OUT</option></select></div><div class="form-row"><label>占用超时</label><div class="input-unit"><input value="60"><span>秒</span></div></div><div class="form-row"><label>释放条件</label><select><option>AMR 离开区域</option><option>通过退出点</option></select></div></div></div>
        <div class="property-section"><h4>适用范围</h4><div class="form-row"><label>适用 AMR 组</label><select><option>全部 AMR</option><option>LP-200 轻载组</option><option>潜伏顶升组</option></select></div><div class="form-row mt-14"><label>关联设备</label><select><option>无</option><option>GATE-03 · 自动门</option></select></div></div>
        <div class="property-section"><label class="property-toggle"><span><b>启用交通资源</b><small>随地图版本校验、发布和下发</small></span><input type="checkbox" checked></label></div>
      </aside>
    </div>
    <footer class="editor-statusbar" id="validationBar"><span>X 12.42 m</span><span>Y 7.36 m</span><span>缩放 100%</span><span>已选 ZONE-A3</span><b>✓ 已保存</b><button class="js-validate">错误 0</button><button class="js-validate">警告 2</button></footer>
  </div>`);
}

function renderMapSettingsDrawer(mapId) {
  return `<div class="drawer-head"><h3>${mapId} · 地图资料</h3><button class="btn icon js-close-drawer">×</button></div><div class="drawer-body map-settings-drawer">
    <div class="settings-tabs"><button class="active">基础信息</button><button>扫描底图</button><button>适用 AMR</button><button>现场设备</button><button>版本</button></div>
    <section class="settings-section"><h4>基础信息</h4><div class="form-grid"><div class="form-row"><label>地图名称</label><input value="装配物流区"></div><div class="form-row"><label>所属楼层</label><select><option>2F</option></select></div><div class="form-row full"><label>所属专案</label><select><option>CNC 物流一期</option></select></div></div></section>
    <section class="settings-section"><div class="settings-section-head"><h4>扫描底图</h4><button class="btn ghost small js-toast" data-message="已打开底图更换流程">更换</button></div><div class="map-source-summary"><i>SLAM</i><span><b>SCN-260804-018</b><small>AMR-03 · 0.05 m/px · 今日 13:42</small></span></div></section>
    <section class="settings-section"><div class="settings-section-head"><h4>适用 AMR</h4><button class="btn ghost small js-edit-map-resources" data-resource-kind="AMR">编辑选择</button></div><div class="resource-chip-list"><span>AMR-01</span><span>AMR-02</span><span>AMR-03</span><span>AMR-04</span><span>AMR-05</span><span>AMR-06</span></div></section>
    <section class="settings-section"><div class="settings-section-head"><h4>现场设备</h4><button class="btn ghost small js-edit-map-resources" data-resource-kind="设备">编辑选择</button></div><p class="muted">9 台 CNC · 3 个缓冲区 · 2 个自动门</p></section>
  </div><div class="drawer-foot"><button class="btn js-close-drawer">取消</button><button class="btn primary js-toast" data-message="${mapId} 地图资料已保存">保存修改</button></div>`;
}

function renderTaskList() {
  setActions(`<span class="live-indicator"><i></i> 实时更新</span>`);
  const orders = [
    ["TSK-260804-001","REQ-260804-001","CNC-01","加工完成","CNC-01 → BUF-01","前往缓冲区","AMR-01","执行中","08:42","blue",78],
    ["TSK-260804-002","REQ-260804-002","CNC-04","加工完成","待匹配","匹配任务配置","—","待处理","00:18","amber",18],
    ["TSK-260804-003","REQ-260804-003","CNC-02","物料不足","ST-01 → CNC-02","等待可用车辆","—","待调度","01:26","amber",30],
    ["TSK-260804-004","REQ-260804-004","CNC-07","加工完成","CNC-07 → BUF-02","等待 ZONE-A3","AMR-03","等待中","02:12","amber",62],
    ["TSK-260804-005","REQ-260804-005","CNC-03","加工完成","CNC-03 → BUF-01","CNC 握手超时","AMR-04","异常","05:39","red",48],
    ["TSK-260804-006","REQ-260804-006","CNC-08","加工完成","CNC-08 → BUF-03","业务已关闭","AMR-02","已完成","12:05","green",100]
  ];
  const rows = orders.map(o=>`<tr class="drill-row" data-go="task-detail.html"><td><strong class="id">${o[0]}</strong><small class="cell-note">${o[1]}</small></td><td><strong>${o[2]}</strong><small class="cell-note">${o[3]}</small></td><td>${o[4]}</td><td><span class="task-stage ${o[9]}"><i style="--progress:${o[10]}%"></i></span><small class="cell-note">${o[5]}</small></td><td class="table-link">${o[6]}</td><td>${badge(o[7],o[9])}</td><td class="mono ${o[9]==='red'?'text-red':'muted'}">${o[8]}</td><td><button class="btn ghost small" data-go="task-detail.html">查看</button></td></tr>`);
  content(`
    <div class="task-kpi-strip">
      <div><span>今日任务单</span><strong>36</strong><small>设备请求 36</small></div>
      <div><span>待处理 / 待调度</span><strong>3</strong><small>最长等待 01:26</small></div>
      <div><span>执行中 / 等待中</span><strong>8</strong><small>AMR 在线 6 台</small></div>
      <div class="warning"><span>异常待处理</span><strong>1</strong><small>CNC 握手超时</small></div>
      <div><span>今日完成率</span><strong>96.4%</strong><small>已闭环 27 单</small></div>
    </div>
    ${toolbar({search:"搜索任务单、请求编号、设备或 AMR",filters:["全部任务类型","全部来源设备"],right:`<span class="muted">最后更新 11:28:42</span>`})}
    ${table(["任务单 / 请求","请求来源","任务路线","当前阶段","执行 AMR","状态","持续时间",""],rows,["160px","110px","155px","155px","90px","85px","90px","72px"])}
  `);
}

function renderTaskConfig() {
  setActions(`<button class="btn primary" data-go="task-config-create.html">＋ 新建任务配置</button>`);
  const configs = [
    ["CFG-001","线边补料","CNC 请求缺料","ST-01 → 请求机台","标准补料流程","最近距离优先","启用","12"],
    ["CFG-002","成品转运","机台加工完成","请求机台 → BUF-01","成品下料流程","最近距离优先","启用","8"],
    ["CFG-003","空箱回收","空箱数量达阈值","请求机台 → REC-01","空箱回收流程","最近距离优先","启用","5"],
    ["CFG-004","紧急叫料","MES 紧急请求","WARE-01 → 请求设备","紧急配送流程","高优先级抢占","停用","0"]
  ];
  const rows = configs.map(c=>`<tr class="drill-row" data-go="task-config-edit.html"><td class="id">${c[0]}</td><td><strong>${c[1]}</strong></td><td>${c[2]}</td><td>${c[3]}</td><td class="table-link">${c[4]}</td><td>${c[5]}</td><td>${badge(c[6],c[6]==="启用"?"green":"gray")}</td><td class="mono">${c[7]}</td><td><button class="btn ghost small" data-go="task-config-edit.html">编辑</button></td></tr>`);
  content(`${toolbar({search:"搜索配置名称或触发设备",filters:["全部任务类型","全部状态"],right:`<button class="btn small">导出配置</button>`})}${table(["配置编号","任务类型","设备触发条件","默认路线","行为树","调度策略","状态","今日触发",""],rows,["95px","100px","150px","145px","130px","125px","75px","80px","72px"])}`);
}

function renderTaskConfigEditor() {
  const editing = PAGE_ID === "task-config-edit";
  setActions(`<button class="btn" data-go="task-config.html">← 返回任务配置</button>`);
  content(`
    <div class="config-editor-grid">
      <div class="config-editor-main">
        ${configSection("01","基础信息",`<div class="form-grid"><div class="form-row"><label>配置名称 *</label><input value="${editing?'CNC 成品转运':''}" placeholder="例如：CNC 成品转运"></div><div class="form-row"><label>任务类型 *</label><select><option>成品转运</option><option>线边补料</option><option>空箱回收</option></select></div><div class="form-row"><label>运行范围 *</label><select><option>2F / MAP-A</option></select></div><div class="form-row"><label>默认优先级</label><select><option>普通</option><option>高</option><option>低</option></select></div></div>`)}
        ${configSection("02","请求触发",`<div class="form-grid"><div class="form-row"><label>请求来源 *</label><select><option>机台设备</option><option>API 请求</option></select></div><div class="form-row"><label>设备范围 *</label><select><option>CNC 设备组</option><option>指定设备 CNC-01</option></select></div><div class="form-row"><label>请求事件 *</label><select><option>加工完成</option><option>物料不足</option></select></div><div class="form-row"><label>重复请求抑制</label><select><option>同设备存在未完成任务时忽略</option><option>进入等待队列</option></select></div></div>`)}
        ${configSection("03","任务路线",`<div class="form-grid"><div class="form-row"><label>取货点 *</label><select><option>请求设备绑定点</option><option>固定站点</option></select></div><div class="form-row"><label>交付点 *</label><select><option>BUF-01 · 成品缓冲区</option><option>请求参数指定</option></select></div><div class="form-row full"><label>中间点</label><input placeholder="可选；按执行顺序添加"></div></div><div class="route-preview"><span>请求设备绑定点</span><i></i><span>BUF-01</span></div>`)}
        ${configSection("04","执行与派单",`<div class="form-grid"><div class="form-row"><label>行为树 *</label><select><option>标准补料流程 · V2.4</option><option>成品下料流程 · V1.8</option></select></div><div class="form-row"><label>调度策略 *</label><select><option>最近距离优先</option><option>电量均衡</option></select><span class="form-help">策略参数在“调度策略”中统一维护</span></div><div class="form-row"><label>AMR 能力要求</label><select><option>潜伏顶升 / 载重 ≥ 500 kg</option></select></div><div class="form-row"><label>无可用车辆</label><select><option>进入等待队列并告警</option><option>仅进入等待队列</option></select></div><div class="form-row"><label>最低接单电量</label><input value="30%"></div><div class="form-row"><label>执行超时</label><input value="30 分钟"></div></div>`)}
      </div>
      <aside class="config-editor-side">
        <section class="panel sticky-panel"><div class="panel-head"><span class="panel-title">配置检查</span>${badge(editing?"已启用":"草稿",editing?"green":"gray")}</div><div class="panel-body"><div class="check-list"><div class="pass">✓ 请求设备已绑定地图</div><div class="pass">✓ 行为树版本已发布</div><div class="pass">✓ 调度策略当前启用</div><div class="warn">! 保存后检查重复匹配规则</div></div><div class="context-summary"><small>当前运行范围</small><strong>2F / MAP-A</strong><span>配置只对该地图内的设备请求生效</span></div><div class="form-footer vertical"><button class="btn primary js-save-task-config">${editing?'保存更改':'保存并启用'}</button><button class="btn js-save-draft">保存草稿</button><button class="btn ghost" data-go="task-config.html">取消</button></div></div></section>
      </aside>
    </div>`);
}

function configSection(index,title,body) {
  return `<section class="panel config-section"><div class="panel-head"><span class="section-index">${index}</span><span class="panel-title">${title}</span></div><div class="panel-body">${body}</div></section>`;
}

function renderStrategies() {
  setActions(`<button class="btn primary js-toast" data-message="已打开新增策略表单">＋ 新增策略</button>`);
  const strategies = [
    ["STR-001","最近距离优先","NearestVehicleStrategy","默认策略","3 个","启用","14:18"],
    ["STR-002","电量均衡","BatteryBalanceStrategy","常规策略","1 个","启用","昨天"],
    ["STR-003","高优先级抢占","PriorityPreemptStrategy","紧急任务","1 个","停用","07-29"]
  ];
  const rows = strategies.map(s=>`<tr class="drill-row" data-go="dispatch-strategy-detail.html"><td class="id">${s[0]}</td><td><strong>${s[1]}</strong><small class="cell-note">${s[3]}</small></td><td class="mono">${s[2]}</td><td>${s[4]}</td><td>${badge(s[5],s[5]==="启用"?"green":"gray")}</td><td class="mono muted">${s[6]}</td><td><button class="btn ghost small" data-go="dispatch-strategy-detail.html">配置</button></td></tr>`);
  content(`${toolbar({search:"搜索策略名称或算法类型",filters:["全部状态","全部用途"]})}${table(["策略编号","策略名称","算法类型","关联任务配置","状态","更新时间",""],rows,["95px","145px","200px","120px","80px","100px","70px"])}`);
}

function renderStrategyDetail() {
  setActions(`<button class="btn back-btn" data-go="dispatch-strategies.html">← 返回策略列表</button><span class="action-divider"></span><button class="btn js-toast" data-message="策略副本已创建">另存为</button><button class="btn primary js-toast" data-message="调度策略已保存">保存策略</button>`);
  content(`
    <div class="strategy-layout">
      <section class="panel">
        <div class="panel-head"><span class="panel-title">最近距离优先</span>${badge("默认策略","green")}</div>
        <div class="panel-body">
          <div class="form-grid mb-14">
            <div class="form-row"><label>策略名称</label><input value="最近距离优先"></div>
            <div class="form-row"><label>算法类型</label><select><option>NearestVehicleStrategy</option></select><span class="form-help">算法类型由调度研发提供</span></div>
          </div>
          <div class="range-row"><label>车辆距离权重</label><input class="js-range" type="range" min="0" max="100" value="75"><span class="range-value">75</span></div>
          <div class="range-row"><label>任务优先级权重</label><input class="js-range" type="range" min="0" max="100" value="60"><span class="range-value">60</span></div>
          <div class="range-row"><label>车辆电量权重</label><input class="js-range" type="range" min="0" max="100" value="35"><span class="range-value">35</span></div>
          <div class="range-row"><label>最低接单电量</label><input class="js-range" type="range" min="10" max="80" value="30"><span class="range-value">30%</span></div>
          <div class="form-footer"><button class="btn js-strategy-test">使用模拟数据测试</button></div>
        </div>
      </section>
      <aside class="panel">
        <div class="panel-head"><span class="panel-title">参数说明与测试结果</span></div>
        <div class="panel-body">
          <p class="muted" style="font-size:11px;line-height:1.8">前端只呈现研发提供的参数。权重越高，代表该条件在分配结果中的影响越明显。</p>
          <div class="detail-grid" style="grid-template-columns:repeat(2,1fr)">
            <div class="detail-item"><label>模拟任务</label><strong>CNC-01 → BUF-01</strong></div>
            <div class="detail-item"><label>候选车辆</label><strong>3 台</strong></div>
            <div class="detail-item"><label>分配结果</label><strong style="color:var(--blue)">AMR-01</strong></div>
            <div class="detail-item"><label>计算耗时</label><strong>18 ms</strong></div>
          </div>
          <div class="mini-list mt-14"><div class="mini-row"><span><strong>CFG-001 · 标准线边补料</strong><small>启用 · 普通优先级</small></span>${badge("引用中","blue")}</div><div class="mini-row"><span><strong>CFG-003 · 空箱回收</strong><small>启用 · 普通优先级</small></span>${badge("引用中","blue")}</div><div class="mini-row"><span><strong>CFG-005 · 物料跨区转运</strong><small>草稿</small></span>${badge("未启用","gray")}</div></div>
          <div class="code-block mt-14" id="strategyResult">等待运行模拟测试…</div>
        </div>
      </aside>
    </div>`);
}

function renderDispatchRecords() {
  const logs = [
    ["11:27:56.418","LOG-001","TSK-260804-001","行为树","AMR-01","NAVIGATE_TO_BUFFER","开始导航至 BUF-01","运行中","blue"],
    ["11:26:41.205","LOG-002","TSK-260804-001","交通资源","ZONE-B1","RESOURCE_ACQUIRED","获得交通资源通行权","成功","green"],
    ["11:25:38.794","LOG-003","TSK-260804-001","设备握手","CNC-01","PICKUP_CONFIRMED","CNC 确认成品已取走","成功","green"],
    ["11:24:52.116","LOG-004","TSK-260804-001","行为树","AMR-01","PICK_PRODUCT","执行顶升取货动作","成功","green"],
    ["11:23:16.640","LOG-005","TSK-260804-001","导航","AMR-01","ARRIVE_CNC","AMR 到达 CNC-01 取货位","成功","green"],
    ["11:20:03.022","LOG-006","TSK-260804-001","任务调度","DSP-260804-001","AMR_ASSIGNED","最近距离优先选择 AMR-01","成功","green"],
    ["11:20:02.481","LOG-007","TSK-260804-001","任务匹配","CFG-002","CONFIG_MATCHED","匹配成品转运配置 V1.3","成功","green"],
    ["11:20:01.248","LOG-008","TSK-260804-001","设备请求","CNC-01","REQUEST_RECEIVED","接收 CNC 加工完成请求","成功","green"],
    ["11:15:44.086","LOG-009","TSK-260804-003","任务调度","STR-001","NO_AVAILABLE_AMR","没有符合条件的可用车辆","失败","red"]
  ];
  const rows = logs.map(r=>`<tr class="drill-row" data-go="dispatch-record-detail.html"><td class="mono muted">${r[0]}</td><td class="id">${r[1]}</td><td class="id">${r[2]}</td><td>${r[3]}</td><td class="table-link">${r[4]}</td><td class="mono">${r[5]}</td><td>${r[6]}</td><td>${badge(r[7],r[8])}</td><td><button class="btn ghost small" data-go="dispatch-record-detail.html">查看</button></td></tr>`);
  setActions(`<button class="btn">导出日志</button>`);
  content(`${toolbar({search:"搜索任务单、日志编号、对象或 Trace ID",filters:["全部日志类型","全部结果"]})}${table(["时间","日志编号","任务单","日志类型","关联对象","行为节点 / 事件","事件说明","结果",""],rows,["110px","90px","130px","90px","100px","160px","190px","80px","65px"])}`);
}

function renderTaskDetail() {
  setActions(`<button class="btn back-btn" data-go="task-list.html">← 返回任务中心</button><button class="btn" data-go="traffic-overview.html">在地图中定位</button><button class="btn danger">暂停任务</button>`);
  content(`
    <div class="task-detail-hero"><div><span class="eyebrow">TASK ORDER · TRACE-260804-001</span><h2>TSK-260804-001</h2><p>CNC-01 加工完成，请求 AMR 将成品搬运至 BUF-01</p></div><div class="hero-status">${badge("执行中","blue")}<small>已运行 08:42</small></div></div>
    <div class="runtime-summary-grid"><div><small>执行车辆</small><strong data-go="agv-detail.html">AMR-01</strong><span>电量 82% · 已载货</span></div><div><small>当前位置</small><strong>ZONE-B1</strong><span>速度 1.1 m/s</span></div><div><small>目标站点</small><strong>BUF-01</strong><span>预计 01:36 后到达</span></div><div><small>当前节点</small><strong>NAVIGATE_TO_BUFFER</strong><span>已运行 00:45</span></div><div><small>执行进度</small><strong>9 / 14</strong><span>行为树实例 BTI-260804-001</span></div></div>
    <section class="panel behavior-runtime-panel">
      <div class="panel-head"><div><span class="panel-title">行为树执行工作流</span><small class="panel-subtitle">成品下料流程 V1.8 · BTI-260804-001</small></div><span class="live-indicator"><i></i> 实时更新</span></div>
      <div class="panel-body behavior-runtime-body">
        <div class="workflow-phase"><div class="phase-label"><b>01</b><span>请求与派单</span></div><div class="behavior-node-row"><div class="behavior-runtime-node done"><i>✓</i><span><strong>接收设备请求</strong><small>RECEIVE_REQUEST · 11:20:01</small></span></div><div class="behavior-connector done"></div><div class="behavior-runtime-node done"><i>✓</i><span><strong>匹配任务配置</strong><small>MATCH_CONFIG · CFG-002</small></span></div><div class="behavior-connector done"></div><div class="behavior-runtime-node done"><i>✓</i><span><strong>调度执行车辆</strong><small>DISPATCH_AMR · AMR-01</small></span></div></div></div>
        <div class="workflow-phase"><div class="phase-label"><b>02</b><span>CNC 取货</span></div><div class="behavior-node-row"><div class="behavior-runtime-node done"><i>✓</i><span><strong>导航至 CNC-01</strong><small>NAVIGATE_TO_CNC · 02:51</small></span></div><div class="behavior-connector done"></div><div class="behavior-runtime-node done"><i>✓</i><span><strong>申请取货区路权</strong><small>ACQUIRE_ZONE_A3 · 18s</small></span></div><div class="behavior-connector done"></div><div class="behavior-runtime-node done"><i>✓</i><span><strong>等待 CNC 放行</strong><small>WAIT_CNC_READY · 36s</small></span></div><div class="behavior-connector done"></div><div class="behavior-runtime-node done"><i>✓</i><span><strong>执行顶升取货</strong><small>PICK_PRODUCT · 46s</small></span></div><div class="behavior-connector done"></div><div class="behavior-runtime-node done"><i>✓</i><span><strong>确认载货状态</strong><small>VERIFY_LOAD · 已载货</small></span></div></div></div>
        <div class="workflow-phase current"><div class="phase-label"><b>03</b><span>缓冲区交付</span></div><div class="behavior-node-row"><div class="behavior-runtime-node active"><i><span></span></i><span><strong>导航至 BUF-01</strong><small>NAVIGATE_TO_BUFFER · 运行 00:45</small></span><em>当前</em></div><div class="behavior-connector"></div><div class="behavior-runtime-node pending"><i>10</i><span><strong>申请缓冲区路权</strong><small>ACQUIRE_BUFFER_ZONE</small></span></div><div class="behavior-connector"></div><div class="behavior-runtime-node pending"><i>11</i><span><strong>等待 BUF 放行</strong><small>WAIT_BUFFER_READY</small></span></div><div class="behavior-connector"></div><div class="behavior-runtime-node pending"><i>12</i><span><strong>执行放货</strong><small>UNLOAD_PRODUCT</small></span></div></div></div>
        <div class="workflow-phase"><div class="phase-label"><b>04</b><span>确认与关闭</span></div><div class="behavior-node-row"><div class="behavior-runtime-node pending"><i>13</i><span><strong>确认交付完成</strong><small>VERIFY_DELIVERY</small></span></div><div class="behavior-connector"></div><div class="behavior-runtime-node pending"><i>14</i><span><strong>释放资源并关闭</strong><small>RELEASE_AND_CLOSE</small></span></div></div></div>
      </div>
    </section>
    <section class="panel mt-14"><div class="panel-head"><span class="panel-title">实时信号</span><button class="btn ghost small" data-go="dispatch-records.html">查看任务日志 →</button></div><div class="live-signal-grid"><div><span class="signal-dot green"></span><small>AMR连接</small><strong>在线 · 28 ms</strong></div><div><span class="signal-dot green"></span><small>载货传感器</small><strong>已触发</strong></div><div><span class="signal-dot blue"></span><small>交通资源</small><strong>ZONE-B1 已占用</strong></div><div><span class="signal-dot gray"></span><small>BUF-01握手</small><strong>等待到达</strong></div></div></section>`);
}

function renderDispatchRecordDetail() {
  setActions(`<button class="btn back-btn" data-go="dispatch-records.html">← 返回任务日志</button><button class="btn" data-go="task-detail.html">查看实时任务</button>`);
  content(`
    <div class="decision-banner"><span>TASK LOG / LOG-001</span><strong>NAVIGATE_TO_BUFFER · 开始导航至 BUF-01</strong><small>任务单 TSK-260804-001 · 2026-08-04 11:27:56.418 · 行为树事件</small></div>
    <div class="log-context-grid">
      <div><small>事件结果</small><strong>${badge("运行中","blue")}</strong></div><div><small>关联对象</small><strong>AMR-01</strong></div><div><small>行为树实例</small><strong>BTI-260804-001</strong></div><div><small>当前节点</small><strong>NAVIGATE_TO_BUFFER</strong></div><div><small>Trace ID</small><strong>TRACE-260804-001</strong></div>
    </div>
    <div class="split-main log-detail-layout">
      <section class="panel"><div class="panel-head"><span class="panel-title">事件内容</span><span class="mono muted">SEQ 009 / 014</span></div><div class="panel-body">
        <div class="detail-grid">
          ${[["事件来源","BehaviorTreeEngine"],["事件类型","NODE_STARTED"],["执行 AMR","AMR-01"],["起始位置","ZONE-B1"],["目标站点","BUF-01"],["交通资源","ZONE-B1 · 已占用"],["任务配置","CFG-002 / V1.3"],["调度策略","STR-001 / V1.6"]].map(x=>`<div class="detail-item"><label>${x[0]}</label><strong>${x[1]}</strong></div>`).join("")}
        </div>
        <div class="log-message"><small>事件说明</small><strong>取货确认完成后，行为树进入缓冲区导航节点；AMR-01 已取得 ZONE-B1 路权并开始前往 BUF-01。</strong></div>
      </div></section>
      <aside class="panel"><div class="panel-head"><span class="panel-title">上下文快照</span></div><div class="panel-body"><div class="property-list"><div class="property"><span>原始请求</span><strong>REQ-260804-001</strong></div><div class="property"><span>请求设备</span><strong>CNC-01</strong></div><div class="property"><span>调度决策</span><strong>DSP-260804-001</strong></div><div class="property"><span>地图范围</span><strong>2F / MAP-A</strong></div><div class="property"><span>载货状态</span><strong>已载货</strong></div><div class="property"><span>预计到达</span><strong>01:36 后</strong></div></div></div></aside>
    </div>
    <section class="panel mt-14"><div class="panel-head"><span class="panel-title">相邻事件</span><button class="btn ghost small" data-go="dispatch-records.html">查看完整任务日志 →</button></div><div class="adjacent-events"><div class="done"><i>08</i><span><small>11:25:38.794</small><strong>PICKUP_CONFIRMED</strong><em>CNC-01 确认成品已取走</em></span></div><div class="active"><i>09</i><span><small>11:27:56.418</small><strong>NAVIGATE_TO_BUFFER</strong><em>当前事件</em></span></div><div><i>10</i><span><small>等待触发</small><strong>ACQUIRE_BUFFER_ZONE</strong><em>申请缓冲区路权</em></span></div></div></section>`);
}

function renderAgvList() {
  setActions(`<button class="btn primary js-agv-edit" data-mode="create">＋ 新增 AMR</button>`);
  const instances = [
    ["AMR-01","一号线搬运车 01","LP-200","2F / MAP-A","P-01","启用","空闲","86%","green"],
    ["AMR-02","一号线搬运车 02","LP-200","2F / MAP-A","P-02","启用","执行中","74%","blue"],
    ["AMR-03","一号线搬运车 03","OMNI-300","2F / MAP-A","P-03","启用","执行中","62%","blue"],
    ["AMR-04","二号线搬运车 01","LP-200","1F / MAP-B","CHG-01","启用","充电中","41%","cyan"],
    ["AMR-05","缓冲区转运车 01","SW-500","2F / MAP-A","P-08","启用","等待","55%","amber"],
    ["AMR-06","备用搬运车 01","LP-200","2F / MAP-A","P-12","停用","故障","37%","red"]
  ];
  const rows = instances.map(a=>`<tr class="drill-row" data-go="agv-detail.html"><td class="id">${a[0]}</td><td><b>${a[1]}</b></td><td>${a[2]}</td><td class="mono">${a[3]}</td><td>${a[4]}</td><td>${badge(a[5],a[5]==="启用"?"green":"gray")}</td><td>${badge(a[6],a[8])}</td><td class="mono">${a[7]}</td><td><button class="btn small" data-go="agv-detail.html">查看</button></td></tr>`);
  content(`${toolbar({search:"搜索 AMR 名称或编号",filters:["全部型号","全部地图","全部启用状态","全部运行状态"]})}${table(["AMR编号","名称","所属型号","当前地图","初始点位","启用状态","运行状态","电量","操作"],rows,["95px","150px","95px","110px","85px","80px","90px","65px","70px"])}`);
}

function renderAgvDetail() {
  setActions(`<button class="btn back-btn" data-go="agv-list.html">← 返回 AMR 列表</button><span class="action-divider"></span><button class="btn" data-go="traffic-overview.html">地图定位</button>`);
  content(`
    <div class="stats-row">
      <div class="stat-card"><div class="stat-label">连接延迟</div><div class="stat-value">28<small>ms</small></div></div>
      <div class="stat-card cyan"><div class="stat-label">当前电量</div><div class="stat-value">62<small>%</small></div></div>
      <div class="stat-card"><div class="stat-label">今日任务</div><div class="stat-value">18<small>条</small></div></div>
      <div class="stat-card amber"><div class="stat-label">今日运行</div><div class="stat-value">6.4<small>h</small></div></div>
    </div>
    <section class="panel mb-14">
      <div class="panel-head"><span class="panel-title">基础信息</span><button class="btn small js-agv-edit" data-mode="edit">编辑</button></div>
      <div class="panel-body detail-grid">
        ${[["AMR 编号","AMR-03"],["名称","一号线搬运车 03"],["所属型号","OMNI-300"],["当前地图","2F / MAP-A"],["初始点位","P-03"],["启用状态","启用"]].map(x=>`<div class="detail-item"><label>${x[0]}</label><strong>${x[1]}</strong></div>`).join("")}
      </div>
    </section>
    <section class="panel mb-14"><div class="panel-head"><span class="panel-title">实时状态</span>${badge("执行中","blue")}</div><div class="panel-body detail-grid">${[["运行状态","执行中"],["当前电量","62%"],["当前位置","CNC-07 前"],["当前任务","TSK-260731-021"],["坐标","X 4.28 / Y 12.60 / θ 90°"],["当前速度","1.20 m/s"],["连接状态","在线 · 28 ms"],["更新时间","刚刚"]].map(x=>`<div class="detail-item"><label>${x[0]}</label><strong>${x[1]}</strong></div>`).join("")}</div></section>
    <div class="grid two">
      <section class="panel"><div class="panel-head"><span class="panel-title">任务进度</span></div><div class="panel-body timeline">
        <div class="timeline-item"><i class="time-dot"></i><span class="timeline-copy"><strong>任务已分配</strong><small>10:42:18 · 最近距离策略</small></span></div>
        <div class="timeline-item"><i class="time-dot"></i><span class="timeline-copy"><strong>ST-01 取料完成</strong><small>10:43:36 · 动作反馈正常</small></span></div>
        <div class="timeline-item"><i class="time-dot" style="background:var(--amber);box-shadow:0 0 0 1px var(--amber)"></i><span class="timeline-copy"><strong>前往 CNC-07</strong><small>预计 10:48:20 到达</small></span></div>
      </div></section>
      <section class="panel"><div class="panel-head"><span class="panel-title">实时位置</span><button class="btn ghost small" data-go="traffic-overview.html">打开地图 →</button></div><div class="device-map-mini">${factoryMap()}</div></section>
    </div>`);
}

function renderAgvModels() {
  setActions(`<button class="btn primary js-agv-model-edit" data-mode="create">＋ 新增型号</button>`);
  const rows = [
    ["LP-200","差速驱动","1.50 m/s","1.20 rad/s","0.60 m/s²","0.10 m","1.80 m","4 台","启用"],
    ["OMNI-300","全向驱动","1.20 m/s","1.50 rad/s","0.50 m/s²","0.08 m","1.50 m","1 台","启用"],
    ["SW-500","舵轮","2.00 m/s","0.80 rad/s","0.70 m/s²","0.15 m","2.20 m","1 台","启用"]
  ].map(r=>`<tr><td class="id">${r[0]}</td><td>${r[1]}</td><td class="mono">${r[2]}</td><td class="mono">${r[3]}</td><td class="mono">${r[4]}</td><td class="mono">${r[5]}</td><td class="mono">${r[6]}</td><td>${r[7]}</td><td>${badge(r[8],"green")}</td><td><button class="btn small js-agv-model-edit" data-mode="edit" data-model="${r[0]}">编辑</button></td></tr>`);
  content(`${toolbar({search:"搜索型号",filters:["全部底盘类型","全部状态"]})}${table(["型号","底盘类型","最大线速度","最大角速度","加速度","到达阈值","前视距离","车辆数量","状态","操作"],rows,["95px","90px","100px","105px","95px","90px","90px","75px","70px","70px"])}`);
}

function renderDeviceList() {
  setActions(`<button class="btn primary js-toast" data-message="已打开新增设备表单">＋ 新增设备</button>`);
  const rows = DEVICES.map(d=>`<tr class="drill-row" data-go="device-detail.html"><td class="id">${d[0]}</td><td>${d[1]}</td><td>${d[2]}</td><td>${badge(d[3],d[7])}</td><td>${badge(d[4],"green")}</td><td>${d[5]}</td><td class="table-link">${d[6]}</td><td class="mono muted">刚刚</td><td><button class="btn ghost small" data-go="device-detail.html">查看</button></td></tr>`);
  content(`${toolbar({search:"搜索设备名称或编号",filters:["全部设备状态","全部流水线","全部地图"]})}${table(["设备","类型","所属区域","运行状态","连接","地图","绑定点位","更新时间",""],rows,["90px","80px","100px","105px","75px","80px","100px","80px","70px"])}`);
}

function renderDeviceDetail() {
  setActions(`<button class="btn back-btn" data-go="device-list.html">← 返回设备列表</button><span class="action-divider"></span><button class="btn" data-go="traffic-overview.html">地图定位</button><button class="btn primary js-toast" data-message="设备映射已保存">编辑映射</button>`);
  content(`
    <div class="split-main">
      <div>
        <section class="panel mb-14">
          <div class="panel-head"><span class="panel-title">设备状态</span>${badge("等待 AMR","amber")}</div>
          <div class="panel-body detail-grid">
            ${[["设备编号","CNC-07"],["设备类型","CNC"],["所属区域","二号线"],["连接状态","在线 · 16 ms"],["当前状态","等待 AMR"],["绑定地图","MAP-A"],["上料点","P-C07-IN"],["下料点","P-C07-OUT"]].map(x=>`<div class="detail-item"><label>${x[0]}</label><strong>${x[1]}</strong></div>`).join("")}
          </div>
        </section>
        <section class="panel"><div class="panel-head"><span class="panel-title">关联任务</span></div><div class="panel-body mini-list">
          <div class="mini-row"><span><strong>TSK-260731-021 · 线边补料</strong><small>AMR-03 · 预计 10:48:20 到达</small></span>${badge("执行中","blue")}</div>
          <div class="mini-row"><span><strong>TSK-260731-012 · 空箱回收</strong><small>AMR-02 · 09:52:18 完成</small></span>${badge("已完成","green")}</div>
        </div></section>
      </div>
      <aside class="panel"><div class="panel-head"><span class="panel-title">地图映射</span><button class="btn ghost small" data-go="map-editor.html">打开编辑器 →</button></div><div class="panel-body"><div class="device-map-mini">${factoryMap()}</div>
        <div class="property-list mt-14"><div class="property"><span>地图位置</span><strong>X 18.60 / Y 6.40</strong></div><div class="property"><span>旋转角度</span><strong>90°</strong></div><div class="property"><span>对接方向</span><strong>由西向东</strong></div></div>
      </div></aside>
    </div>`);
}

function renderDeviceTypes() {
  setActions(`<button class="btn primary js-toast" data-message="已打开新增设备类型表单">＋ 新增类型</button>`);
  const rows = [
    ["CNC","CNC 机台","▣","8 台","上料点、下料点","8 个状态","启用"],
    ["GENERAL","通用机台","□","4 台","可选","5 个状态","启用"],
    ["CHARGER","充电桩","CH","2 台","充电点","4 个状态","启用"],
    ["OTHER","其他设备","◇","0 台","可选","3 个状态","停用"]
  ].map(r=>`<tr><td class="id">${r[0]}</td><td>${r[1]}</td><td><span class="object-symbol machine">${r[2]}</span></td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td><td>${badge(r[6],r[6]==="启用"?"green":"gray")}</td><td><button class="btn small js-toast" data-message="设备类型配置已打开">编辑</button></td></tr>`);
  content(`${toolbar({search:"搜索设备类型",filters:["全部状态"]})}${table(["类型编码","显示名称","图标","设备数量","点位要求","状态集合","状态","操作"],rows,["110px","150px","70px","90px","160px","110px","90px","70px"])}`);
}

function apiLayout() {
  return `
    <div class="api-shell">
      <aside class="work-pane">
        <div class="pane-head"><span class="pane-title">API 目录</span><span class="mono muted">18 APIs</span></div>
        <div class="api-list">
          ${[
            ["AMR", [["GET","/api/amrs"],["GET","/api/amrs/{id}"],["PUT","/api/amrs/{id}/state"]]],
            ["任务", [["GET","/api/tasks"],["POST","/api/tasks"],["GET","/api/tasks/{id}"],["DELETE","/api/tasks/{id}"]]],
            ["地图", [["GET","/api/maps"],["POST","/api/maps/validate"]]],
            ["设备", [["GET","/api/devices"],["PUT","/api/devices/{id}"]]]
          ].map((g,gi)=>`<div class="api-group"><div class="api-group-title">${g[0]}</div>${g[1].map((a,i)=>`<div class="api-item ${gi===1&&i===1?"active":""}"><span class="method ${a[0].toLowerCase()}">${a[0]}</span><span class="api-path">${a[1]}</span></div>`).join("")}</div>`).join("")}
        </div>
      </aside>
      <section class="work-pane">
        <div class="pane-head"><span class="pane-title">请求配置</span>${badge("TEST","blue")}</div>
        <div class="api-editor">
          <div class="request-line"><select class="select"><option>POST</option><option>GET</option></select><input class="field mono" value="/api/tasks"><button class="btn primary js-send-api">发送</button></div>
          <div class="tabs"><button class="tab active">Params</button><button class="tab">Headers <b>2</b></button><button class="tab">Body</button><button class="tab">Auth</button></div>
          <div class="key-value-table">
            <div class="key-value-row"><input type="checkbox" checked><input value="mapId"><input value="MAP-A"><button class="btn ghost small">×</button></div>
            <div class="key-value-row"><input type="checkbox"><input placeholder="参数名"><input placeholder="参数值"><button class="btn ghost small">×</button></div>
          </div>
          <div class="form-row mt-14"><label>JSON Body</label><div class="code-block" contenteditable="true">{
  "name": "CNC-07 线边补料",
  "type": "LINE_FEED",
  "startPoint": "ST-01",
  "endPoint": "P-C07-IN",
  "priority": "HIGH",
  "dispatchStrategy": "NEAREST"
}</div></div>
        </div>
      </section>
      <section class="work-pane">
        <div class="pane-head"><span class="pane-title">响应</span><button class="btn ghost small js-toast" data-message="响应内容已复制">复制</button></div>
        <div class="response-meta"><span>状态 <b id="apiStatus">200 OK</b></span><span>耗时 <strong id="apiTime">42 ms</strong></span><span>大小 1.24 KB</span></div>
        <pre class="response-body" id="apiResponse">{
  "success": true,
  "data": {
    "taskId": "TSK-260731-022",
    "status": "PENDING",
    "assignedAgv": null,
    "createdAt": "2026-07-31T10:52:16+08:00"
  },
  "traceId": "trc_f82a196e"
}</pre>
      </section>
    </div>`;
}

function renderApi() {
  if (PAGE_ID === "api-workbench") {
    setActions(`<select class="select"><option>测试环境 · 10.20.4.18</option><option>仿真环境 · localhost</option></select><button class="btn js-toast" data-message="测试用例已保存">保存用例</button>`);
    content(apiLayout());
    return;
  }
  if (PAGE_ID === "api-catalog") {
    setActions(`<button class="btn primary" data-go="api-workbench.html">打开测试工作台</button>`);
    const rows = [
      ["GET","/api/amrs","查询 AMR 列表","AMR","Bearer Token","已联调"],
      ["GET","/api/amrs/{id}","查询 AMR 详情","AMR","Bearer Token","已联调"],
      ["POST","/api/tasks","创建物流任务","任务","Bearer Token","已联调"],
      ["GET","/api/tasks/{id}","查询任务详情","任务","Bearer Token","已联调"],
      ["DELETE","/api/tasks/{id}","取消执行任务","任务","Bearer Token","待验证"],
      ["POST","/api/maps/validate","校验地图草稿","地图","Bearer Token","开发中"],
      ["GET","/api/devices","查询设备列表","设备","Bearer Token","已联调"]
    ].map(r=>`<tr><td><span class="method ${r[0].toLowerCase()}">${r[0]}</span></td><td class="mono table-link">${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${badge(r[5],r[5]==="已联调"?"green":r[5]==="待验证"?"amber":"gray")}</td><td><button class="btn small" data-go="api-workbench.html">测试</button></td></tr>`);
    content(`${toolbar({search:"搜索接口名称或路径",filters:["全部模块","全部状态"]})}${table(["Method","Path","接口名称","模块","鉴权","联调状态",""],rows,["75px","230px","170px","90px","120px","90px","70px"])}`);
    return;
  }
  const rows = [
    ["10:52:16","POST","/api/tasks","200","42 ms","研发人员","trc_f82a196e"],
    ["10:48:03","GET","/api/amrs/AMR-03","200","28 ms","研发人员","trc_4c8e123f"],
    ["10:43:58","POST","/api/tasks","400","35 ms","研发人员","trc_15ac40c2"],
    ["10:39:26","GET","/api/devices","200","31 ms","管理员","trc_79de03b8"],
    ["10:31:11","DELETE","/api/tasks/TSK-017","204","49 ms","研发人员","trc_3ef1429a"]
  ].map(r=>`<tr><td class="mono muted">${r[0]}</td><td><span class="method ${r[1].toLowerCase()}">${r[1]}</span></td><td class="mono table-link">${r[2]}</td><td>${badge(r[3],r[3].startsWith("2")?"green":"red")}</td><td class="mono">${r[4]}</td><td>${r[5]}</td><td class="mono muted">${r[6]}</td><td><button class="btn small" data-go="api-workbench.html">复用</button></td></tr>`);
  setActions(`<button class="btn">清理历史</button><button class="btn primary" data-go="api-workbench.html">新建请求</button>`);
  content(`${toolbar({search:"搜索路径或 Trace ID",filters:["全部状态码","全部 Method"]})}${table(["时间","Method","Path","状态","耗时","用户","Trace ID",""],rows,["90px","80px","250px","75px","75px","100px","140px","70px"])}`);
}

function renderDebugPlatform() {
  if (PAGE_ID === "debug-records") {
    const rows = [
      ["DBG-260805-018","AMR导航","AMR-01","P-18 → BUF-01","张凯","成功","02:36","15:08:42"],
      ["DBG-260805-017","动作测试","AMR-03","顶升机构上升","林工","成功","00:18","14:52:11"],
      ["DBG-260805-016","连接诊断","AMR-04","10.20.8.34:8080","张凯","失败","00:06","14:31:28"],
      ["DBG-260805-015","API调试","任务接口","POST /api/tasks","研发人员","成功","42 ms","13:46:03"]
    ].map(r=>`<tr><td class="id">${r[0]}</td><td>${r[1]}</td><td><b>${r[2]}</b></td><td class="mono">${r[3]}</td><td>${r[4]}</td><td>${badge(r[5],r[5]==="成功"?"green":"red")}</td><td class="mono">${r[6]}</td><td class="mono muted">${r[7]}</td><td><button class="btn small js-detail" data-kind="调试记录" data-id="${r[0]}">查看</button></td></tr>`);
    setActions(`<button class="btn">导出记录</button>`);
    content(`${toolbar({search:"搜索记录编号、AMR或操作对象",filters:["全部调试类型","全部结果"]})}${table(["记录编号","类型","目标对象","调试内容","操作者","结果","耗时","开始时间","操作"],rows,["130px","90px","100px","220px","90px","75px","75px","95px","70px"])}`);
    return;
  }
  setActions(`<span class="live-indicator"><i></i> AMR 状态实时更新</span>`);
  content(`<div class="amr-debug-shell">
    <aside class="work-pane debug-amr-pane"><div class="pane-head"><span class="pane-title">当前地图 AMR</span><span class="muted">3 台可调试</span></div><div class="traffic-amr-list">
      <button class="traffic-amr-row active"><span class="unit-dot blue"></span><span><b>AMR-01</b><small>空闲 · 电量 86% · 差速驱动</small><em>X 24.860 · Y 13.420</em></span>${badge("已连接","green")}</button>
      <button class="traffic-amr-row"><span class="unit-dot blue"></span><span><b>AMR-03</b><small>空闲 · 电量 74% · 全向驱动</small><em>X 18.240 · Y 21.680</em></span>${badge("可调试","blue")}</button>
      <button class="traffic-amr-row is-disabled"><span class="unit-dot cyan"></span><span><b>AMR-05</b><small>充电中 · 电量 41% · 舵轮</small><em>CHG-01</em></span>${badge("不可用","gray")}</button>
    </div></aside>
    <section class="map-pane debug-map-pane"><div class="traffic-map-toolbar"><div class="traffic-route-legend"><span><i class="planned"></i>任务最优路径</span><span><i class="current"></i>AMR当前路径</span><span><i class="actual"></i>实际轨迹</span><span><i class="event"></i>重规划点</span></div></div><div class="map-stage traffic-live-stage debug-map-stage">${trafficNetworkMap()}<svg class="traffic-route-overlay" viewBox="0 0 760 500" preserveAspectRatio="xMidYMin meet"><path class="route-planned" d="M150 92V257H426V422H610"/><path class="route-actual" d="M150 92V224L242 290V257H334V224L426 290V422H610"/><path class="route-current" d="M334 224L426 290V422H610"/><circle class="route-replan" cx="334" cy="224" r="7"/><g class="route-amr" transform="translate(426 338)"><rect x="-13" y="-9" width="26" height="18" rx="5"/><text y="3">01</text></g></svg></div><div class="map-footer"><span>当前坐标 <b>X 24.860 · Y 13.420 · θ 90°</b></span><span>目标坐标 <b>X 42.600 · Y 8.350 · θ 180°</b></span></div></section>
    <aside class="work-pane debug-config-pane"><div class="pane-head"><span class="pane-title">调试配置</span>${badge("未启动","gray")}</div><div class="debug-mode-tabs"><button class="active" data-debug-mode="task">任务</button><button data-debug-mode="behavior">行为树</button><button data-debug-mode="coordinate">指定坐标</button></div>
      <div class="debug-config-panel" data-debug-panel="task"><div class="property-section"><h4>任务配置</h4><div class="form-row"><label>任务模板</label><select><option>CFG-002 · CNC成品转运</option><option>CFG-004 · 空托盘回收</option></select></div><div class="form-row mt-14"><label>起点设备</label><select><option>CNC-01 · 成品取货位</option></select></div><div class="form-row mt-14"><label>目标设备</label><select><option>BUF-01 · 成品缓冲区</option><option>BUF-02 · 二号缓冲区</option></select></div></div></div>
      <div class="debug-config-panel hidden" data-debug-panel="behavior"><div class="property-section"><h4>行为树配置</h4><div class="form-row"><label>行为树</label><select><option>BT-001 · 标准搬运流程 V1.4</option><option>BT-003 · 低电量回充 V1.1</option></select></div><div class="form-row mt-14"><label>入口节点</label><select><option>ROOT · 从根节点执行</option><option>NAVIGATE_TO_TARGET</option></select></div><div class="form-row mt-14"><label>失败处理</label><select><option>失败后停止并记录</option><option>允许重试 1 次</option></select></div></div></div>
      <div class="debug-config-panel hidden" data-debug-panel="coordinate"><div class="property-section"><h4>目标坐标</h4><div class="form-row"><label>参考点位</label><select><option>BUF-01 · 成品缓冲区</option><option>P-18 · 主通道路口</option><option>不使用参考点位</option></select></div><div class="debug-coordinate-grid"><label>X 坐标<input value="42.600"></label><label>Y 坐标<input value="8.350"></label><label>朝向<input value="180°"></label></div><button class="btn small wide js-toast" data-message="路径预览已更新">重新生成路径</button></div></div>
      <div class="property-section debug-common-settings"><h4>运行限制</h4><div class="form-row"><label>最高速度</label><select><option>0.3 m/s · 调试限速</option><option>0.5 m/s</option></select></div><label class="property-toggle mt-14"><span><b>接入交通管制</b><small>申请道路和互斥资源</small></span><input type="checkbox" checked></label></div>
      <div class="debug-start"><button class="btn primary wide js-toast" data-message="调试任务已下发至 AMR-01">确认并开始调试</button><small>操作将写入调试记录</small></div>
    </aside></div>`);
}

function renderBehaviorTree() {
  if (PAGE_ID === "behavior-monitor") {
    setActions(`<span class="live-indicator"><i></i> 实时更新</span>`);
    const cards = [
      {id:"AMR-01",tone:"active",state:"执行中",source:"CNC-01",target:"BUF-01",task:"TSK-260804-001",tree:"成品下料 V1.8",node:"导航至缓冲区",code:"NAVIGATE_TO_BUFFER",progress:64,time:"00:45",step:"9 / 14"},
      {id:"AMR-03",tone:"waiting",state:"等待",source:"CNC-07",target:"BUF-02",task:"TSK-260804-004",tree:"成品下料 V1.8",node:"等待 CNC 放行",code:"WAIT_CNC_READY",progress:43,time:"01:12",step:"6 / 14"},
      {id:"AMR-04",tone:"error",state:"异常",source:"CNC-03",target:"BUF-01",task:"TSK-260804-005",tree:"成品下料 V1.8",node:"顶升取货失败",code:"PICK_PRODUCT",progress:50,time:"00:18",step:"7 / 14"},
      {id:"AMR-05",tone:"queued",state:"等待执行",source:"CNC-08",target:"BUF-02",task:"TSK-260804-006",tree:"成品下料 V1.8",node:"等待调度完成",code:"DISPATCH_AMR",progress:14,time:"00:26",step:"2 / 14"}
    ];
    const cardHtml = cards.map((c,i)=>`<button class="bt-monitor-card ${c.tone} ${i===0?"selected":""}" data-bt-card data-amr="${c.id}" data-source="${c.source}" data-target="${c.target}" data-task="${c.task}" data-tree="${c.tree}" data-node="${c.node}" data-code="${c.code}" data-progress="${c.progress}" data-time="${c.time}" data-step="${c.step}" data-state="${c.state}"><span class="bt-card-head"><strong>${c.id}</strong>${badge(c.state,c.tone==="error"?"red":c.tone==="waiting"?"amber":c.tone==="queued"?"gray":"blue")}</span><span class="bt-card-route"><b>${c.source}</b><i></i><b>${c.target}</b></span><span class="bt-card-task">${c.task} · ${c.tree}</span><span class="bt-card-node"><small>当前节点</small><strong>${c.node}</strong><em>${c.code}</em></span><span class="bt-card-progress"><i style="width:${c.progress}%"></i></span><span class="bt-card-foot"><small>${c.step} 节点</small><small>运行 ${c.time}</small></span></button>`).join("");
    content(`
      <div class="bt-monitor-stats"><div><span class="bt-stat-mark blue"></span><small>执行中</small><strong>1</strong></div><div><span class="bt-stat-mark amber"></span><small>等待</small><strong>2</strong></div><div><span class="bt-stat-mark red"></span><small>异常</small><strong>1</strong></div><div><span class="bt-stat-mark green"></span><small>今日完成</small><strong>27</strong></div><div class="bt-monitor-note"><small>监控范围</small><strong>当前全局楼层与地图</strong></div></div>
      <section class="panel"><div class="panel-head"><span class="panel-title">AMR 执行实例</span><span class="muted">选择卡片查看完整节点工作流</span></div><div class="bt-monitor-grid">${cardHtml}</div></section>
      <section class="panel mt-14 bt-instance-panel">
        <div class="panel-head"><div><span class="panel-title"><b id="btSelectedAmr">AMR-01</b> · <span id="btSelectedTask">TSK-260804-001</span></span><small class="panel-subtitle" id="btSelectedTree">成品下料 V1.8</small></div><div class="bt-instance-actions"><span class="mono muted" id="btSelectedStep">9 / 14</span><button class="btn ghost small" data-go="task-detail.html">查看任务</button></div></div>
        <div class="bt-instance-layout"><div class="bt-runtime-track">
          <div class="bt-track-node done"><i>✓</i><span>接收请求<small>RECEIVE_REQUEST</small></span></div><b></b><div class="bt-track-node done"><i>✓</i><span>匹配配置<small>MATCH_CONFIG</small></span></div><b></b><div class="bt-track-node done"><i>✓</i><span>调度 AMR<small>DISPATCH_AMR</small></span></div><b></b><div class="bt-track-node done"><i>✓</i><span>CNC 取货<small>PICK_PRODUCT</small></span></div><b></b><div class="bt-track-node current"><i><span></span></i><span id="btSelectedNode">导航至缓冲区<small id="btSelectedCode">NAVIGATE_TO_BUFFER</small></span></div><b></b><div class="bt-track-node"><i>10</i><span>申请路权<small>ACQUIRE_ZONE</small></span></div><b></b><div class="bt-track-node"><i>12</i><span>缓冲区放货<small>UNLOAD_PRODUCT</small></span></div><b></b><div class="bt-track-node"><i>14</i><span>关闭任务<small>CLOSE_TASK</small></span></div>
        </div><aside class="bt-node-context"><div class="context-head"><span>当前节点上下文</span><strong id="btSelectedState">执行中</strong></div><div class="property-list"><div class="property"><span>来源设备</span><strong id="btSelectedSource">CNC-01</strong></div><div class="property"><span>目标设备</span><strong id="btSelectedTarget">BUF-01</strong></div><div class="property"><span>节点耗时</span><strong id="btSelectedTime">00:45</strong></div><div class="property"><span>交通资源</span><strong>ZONE-B1 · 已占用</strong></div><div class="property"><span>重试次数</span><strong>0 / 2</strong></div></div><button class="btn ghost small full mt-14" data-go="dispatch-records.html">查看相关任务日志</button></aside></div>
      </section>`);
    return;
  }
  if (PAGE_ID === "behavior-trees") {
    setActions(`<button class="btn primary" data-go="behavior-editor.html">＋ 新建行为树</button>`);
    const rows = [
      ["BT-001","标准搬运流程","导航 → 取料 → 运输 → 放料","V1.4","已发布","4 个任务模板","07-31 11:20"],
      ["BT-002","CNC 线边补料","检查机台 → 取料 → 对接 → 完成","V0.8","草稿","2 个任务模板","07-31 09:46"],
      ["BT-003","低电量回充","电量判断 → 取消接单 → 前往充电","V1.1","已发布","系统流程","07-30 17:08"],
      ["BT-004","异常恢复示意","检测故障 → 等待确认 → 恢复任务","V0.2","草稿","未引用","07-30 14:32"]
    ].map(r=>`<tr><td class="id">${r[0]}</td><td><b>${r[1]}</b></td><td>${r[2]}</td><td class="mono">${r[3]}</td><td>${badge(r[4],r[4]==="已发布"?"green":"amber")}</td><td>${r[5]}</td><td class="mono muted">${r[6]}</td><td><button class="btn small" data-go="behavior-editor.html">编辑</button></td></tr>`);
    content(`
      <div class="stats-row">
        <div class="stat-card"><div class="stat-label">行为树总数</div><div class="stat-value">4<small>棵</small></div></div>
        <div class="stat-card cyan"><div class="stat-label">已发布</div><div class="stat-value">2</div></div>
        <div class="stat-card amber"><div class="stat-label">草稿</div><div class="stat-value">2</div></div>
        <div class="stat-card"><div class="stat-label">节点模板</div><div class="stat-value">12<small>个</small></div></div>
      </div>
      ${toolbar({search:"搜索行为树名称或编号",filters:["全部状态","全部引用范围"]})}
      ${table(["编号","行为树名称","流程摘要","版本","状态","引用范围","更新时间","操作"],rows,["95px","150px","28%","70px","90px","120px","110px","75px"])}
    `);
    return;
  }

  setActions(`<button class="btn js-toast" data-message="行为树草稿已保存">保存草稿</button><button class="btn primary js-toast" data-message="行为树基础校验通过">校验流程</button>`);
  content(`
    <div class="behavior-shell">
      <aside class="behavior-library">
        <div class="pane-head"><span class="pane-title">节点库</span><span class="mono muted">12</span></div>
        <div class="behavior-group">
          <strong>控制节点</strong>
          <button class="behavior-palette"><span class="bt-symbol sequence">→</span><span>顺序执行<small>Sequence</small></span></button>
          <button class="behavior-palette"><span class="bt-symbol selector">?</span><span>选择执行<small>Selector</small></span></button>
          <button class="behavior-palette"><span class="bt-symbol parallel">∥</span><span>并行执行<small>Parallel</small></span></button>
        </div>
        <div class="behavior-group">
          <strong>AMR 动作</strong>
          <button class="behavior-palette"><span class="bt-symbol action">N</span><span>导航至点位<small>Navigate</small></span></button>
          <button class="behavior-palette"><span class="bt-symbol action">P</span><span>执行取料<small>Pickup</small></span></button>
          <button class="behavior-palette"><span class="bt-symbol action">D</span><span>执行放料<small>Dropoff</small></span></button>
        </div>
        <div class="behavior-group">
          <strong>条件判断</strong>
          <button class="behavior-palette"><span class="bt-symbol condition">C</span><span>检查机台状态<small>Check device</small></span></button>
          <button class="behavior-palette"><span class="bt-symbol condition">B</span><span>检查剩余电量<small>Check battery</small></span></button>
        </div>
      </aside>
      <section class="behavior-canvas">
        <div class="map-toolbar"><button class="map-tool active">选择</button><button class="map-tool">连线</button><button class="map-tool">−</button><button class="map-tool">100%</button><button class="map-tool">＋</button></div>
        <div class="bt-flow">
          <div class="bt-node root"><span class="bt-node-icon">R</span><span><b>CNC 线边补料</b><small>Root</small></span></div>
          <div class="bt-line vertical l1"></div>
          <div class="bt-node control"><span class="bt-node-icon">→</span><span><b>顺序执行</b><small>Sequence</small></span></div>
          <div class="bt-line vertical l2"></div>
          <div class="bt-branch"></div>
          <div class="bt-children">
            <div class="bt-node condition"><span class="bt-node-icon">C</span><span><b>机台可接收</b><small>CNC-07 = READY</small></span></div>
            <div class="bt-node action active"><span class="bt-node-icon">N</span><span><b>前往上料点</b><small>Target: ST-01</small></span></div>
            <div class="bt-node action"><span class="bt-node-icon">P</span><span><b>执行取料</b><small>Timeout: 30s</small></span></div>
            <div class="bt-node action"><span class="bt-node-icon">D</span><span><b>机台放料</b><small>Target: P-C07-IN</small></span></div>
          </div>
        </div>
        <div class="validation-bar"><b style="color:var(--green)">基础结构完整</b><span>8 个节点</span><span>7 条连接</span><span class="muted">当前为前端模块示意</span></div>
      </section>
      <aside class="work-pane">
        <div class="pane-head"><span class="pane-title">节点属性</span>${badge("动作节点","blue")}</div>
        <div class="property-section">
          <div class="form-row"><label>节点名称</label><input value="前往上料点"></div>
          <div class="form-row mt-14"><label>动作类型</label><select><option>导航至点位</option></select></div>
          <div class="form-row mt-14"><label>目标点位</label><select><option>ST-01 · 一号上料站</option></select></div>
          <div class="form-row mt-14"><label>超时时间</label><input value="60 秒"></div>
        </div>
        <div class="property-section">
          <h4>运行策略</h4>
          <div class="property-list">
            <div class="property"><span>失败处理</span><strong>重试 2 次</strong></div>
            <div class="property"><span>超时处理</span><strong>返回失败</strong></div>
            <div class="property"><span>日志级别</span><strong>INFO</strong></div>
          </div>
        </div>
        <div class="property-section"><button class="btn danger small">删除节点</button></div>
      </aside>
    </div>
  `);
}

function renderSettings() {
  const page = PAGE_ID;
  if (page === "users") {
    setActions(`<button class="btn primary js-toast" data-message="已打开新增用户表单">＋ 新增用户</button>`);
    const rows = [
      ["admin","系统管理员","管理员","启用","2026-07-31 10:40","2026-07-20"],
      ["dev.dispatch","调度研发","研发人员","启用","2026-07-31 10:32","2026-07-22"],
      ["dev.frontend","前端研发","研发人员","启用","2026-07-31 09:18","2026-07-22"],
      ["demo.viewer","演示账号","只读用户","启用","2026-07-30 16:42","2026-07-25"],
      ["temp.test","临时测试","研发人员","停用","2026-07-28 11:08","2026-07-26"]
    ].map(r=>`<tr><td class="id">${r[0]}</td><td>${r[1]}</td><td>${badge(r[2],r[2]==="管理员"?"blue":r[2]==="研发人员"?"cyan":"gray")}</td><td>${badge(r[3],r[3]==="启用"?"green":"gray")}</td><td class="mono muted">${r[4]}</td><td class="mono muted">${r[5]}</td><td><button class="btn small js-toast" data-message="用户编辑表单已打开">编辑</button></td></tr>`);
    content(`${toolbar({search:"搜索用户名或姓名",filters:["全部角色","全部状态"]})}${table(["用户名","姓名","角色","状态","最近登录","创建日期","操作"],rows,["150px","120px","110px","90px","170px","120px","80px"])}`);
    return;
  }
  if (page === "roles") {
    setActions(`<button class="btn primary js-toast" data-message="已打开新增角色表单">＋ 新增角色</button>`);
    content(`
      <div class="grid three">
        ${[["管理员","4 名用户","全部模块和高风险操作","blue"],["研发人员","12 名用户","研发功能与交通监控","cyan"],["只读用户","3 名用户","查看状态和列表","gray"]].map(r=>`<section class="panel"><div class="panel-head"><span class="panel-title">${r[0]}</span>${badge("启用",r[3])}</div><div class="panel-body"><div class="stat-value" style="font-size:20px">${r[1]}</div><p class="muted" style="font-size:11px;line-height:1.7">${r[2]}</p><button class="btn small js-detail" data-kind="角色" data-id="${r[0]}">配置权限</button></div></section>`).join("")}
      </div>
      <section class="panel mt-14"><div class="panel-head"><span class="panel-title">高风险权限</span><span class="panel-subtitle">独立控制，默认关闭</span></div><div class="panel-body">
        ${[["任务控制","创建、取消和重试执行任务"],["地图发布","将草稿地图发布到仿真环境"],["仿真重置","清空当前场景并恢复初始状态"],["AMR 停用","阻止指定车辆继续接收任务"],["API 请求","从平台测试台发送接口请求"]].map((x,i)=>`<div class="mini-row"><span><strong>${x[0]}</strong><small>${x[1]}</small></span><label><input type="checkbox" ${i<2?"checked":""}> 研发人员</label></div>`).join("")}
      </div></section>`);
    return;
  }
  if (page === "configurations") {
    setActions(`<button class="btn js-toast" data-message="配置已恢复为默认值">恢复默认</button><button class="btn primary js-toast" data-message="系统配置已保存">保存更改</button>`);
    content(`
      <div class="grid two">
        ${[
          ["运行显示",[["首页刷新频率","2 秒"],["数据延迟阈值","5 秒"],["默认地图","MAP-A"],["坐标小数位","2 位"]]],
          ["仿真设置",[["默认仿真速度","1×"],["循环运行","启用"],["显示移动轨迹","启用"],["故障自动暂停","停用"]]],
          ["任务设置",[["默认优先级","普通"],["默认调度策略","最近距离优先"],["任务编号前缀","TSK"],["完成记录保留","30 天"]]],
          ["界面设置",[["主题","生产线脉冲 · 浅色"],["语言","简体中文"],["时间格式","24 小时"],["减少动态效果","跟随系统"]]]
        ].map(g=>`<section class="panel"><div class="panel-head"><span class="panel-title">${g[0]}</span></div><div class="panel-body">${g[1].map(x=>`<div class="mini-row"><span><strong>${x[0]}</strong><small>修改后记录操作日志</small></span><input class="field" style="width:150px" value="${x[1]}"></div>`).join("")}</div></section>`).join("")}
      </div>`);
    return;
  }
  if (page === "dictionaries") {
    setActions(`<button class="btn primary js-toast" data-message="已打开新增字典项表单">＋ 新增字典项</button>`);
    const rows = [
      ["AMR_STATUS","IDLE","空闲","#20A66A","10","启用"],
      ["AMR_STATUS","RUNNING","执行中","#1677FF","20","启用"],
      ["AMR_STATUS","CHARGING","充电中","#00A6A6","30","启用"],
      ["AMR_STATUS","FAULT","故障","#D92D20","40","启用"],
      ["TASK_STATUS","PENDING","待调度","#8A98A8","10","启用"],
      ["TASK_STATUS","RUNNING","执行中","#1677FF","20","启用"],
      ["DEVICE_STATUS","WAIT_AMR","等待 AMR","#F59E0B","30","启用"]
    ].map(r=>`<tr><td class="id">${r[0]}</td><td class="mono">${r[1]}</td><td>${r[2]}</td><td><span style="display:inline-flex;align-items:center;gap:8px"><i style="width:14px;height:14px;border-radius:3px;background:${r[3]}"></i><span class="mono">${r[3]}</span></span></td><td>${r[4]}</td><td>${badge(r[5],"green")}</td><td><button class="btn small js-toast" data-message="字典项编辑表单已打开">编辑</button></td></tr>`);
    content(`${toolbar({search:"搜索字典编码或名称",filters:["全部字典","全部状态"]})}${table(["字典分类","编码","显示名称","颜色","排序","状态","操作"],rows,["150px","150px","120px","150px","70px","90px","70px"])}`);
    return;
  }
  if (page === "operation-logs") return renderLogs(false);
  renderLogs(true);
}

function renderLogs(system) {
  setActions(`<button class="btn">下载筛选结果</button>`);
  const opRows = [
    ["10:52:16","dev.dispatch","派单管理","创建任务","TSK-260731-022","成功","CNC-07 线边补料"],
    ["10:48:03","dev.frontend","API 测试","发送请求","POST /api/tasks","成功","200 · 42 ms"],
    ["10:43:58","admin","地图编辑","保存草稿","MAP-A V1.9","成功","修改 LANE-A03"],
    ["10:39:26","dev.dispatch","调度策略","修改参数","最近距离优先","成功","距离权重 70 → 75"],
    ["10:31:11","demo.viewer","AMR 管理","查看","AMR-03","成功","只读访问"]
  ];
  const sysRows = [
    ["10:52:16.042","INFO","task-service","AMR-03","TSK-260731-022","trc_f82a196e","Task created and queued"],
    ["10:48:03.128","INFO","amr-gateway","AMR-03","TSK-260731-021","trc_4c8e123f","Position state updated"],
    ["10:43:58.315","ERROR","task-service","—","—","trc_15ac40c2","Invalid endPoint: P-C09"],
    ["10:39:26.084","WARN","device-gateway","—","TSK-260731-020","trc_79de03b8","CNC-08 entered fault state"],
    ["10:31:11.492","INFO","dispatch-service","AMR-02","TSK-260731-018","trc_3ef1429a","Vehicle assigned in 22ms"]
  ];
  const rows = (system?sysRows:opRows).map(r=>`<tr class="js-detail" data-kind="${system?"系统日志":"操作日志"}" data-id="${r[system?5:4]}">${r.map((v,i)=>`<td class="${i===0||i===(system?5:1)?"mono muted":""}">${system&&i===1?badge(v,v==="ERROR"?"red":v==="WARN"?"amber":"blue"):v}</td>`).join("")}<td><button class="btn ghost small">查看</button></td></tr>`);
  const headers = system?["时间","级别","服务","AMR","任务","Trace ID","日志摘要",""]:["时间","用户","模块","操作","对象","结果","说明",""];
  content(`${toolbar({search:system?"搜索日志或 Trace ID":"搜索用户、对象或操作",filters:[system?"全部级别":"全部模块","最近 1 小时"]})}${table(headers,rows,system?["115px","80px","130px","90px","145px","140px","auto","70px"]:["100px","120px","110px","110px","170px","75px","auto","70px"])}`);
}

function renderGenericDetail(kind, id) {
  return `
    <div class="drawer-head"><h3>${kind}详情</h3><button class="btn icon js-close-drawer">×</button></div>
    <div class="drawer-body">
      <div class="detail-item"><label>对象</label><strong>${id}</strong></div>
      <div class="detail-grid mt-14" style="grid-template-columns:repeat(2,1fr)">
        <div class="detail-item"><label>当前状态</label><strong style="color:var(--blue)">运行正常</strong></div>
        <div class="detail-item"><label>更新时间</label><strong>刚刚</strong></div>
        <div class="detail-item"><label>所属地图</label><strong>MAP-A</strong></div>
        <div class="detail-item"><label>关联对象</label><strong>AMR-03</strong></div>
      </div>
      <section class="mt-14"><h4>最近事件</h4>
        <div class="timeline">
          <div class="timeline-item"><i class="time-dot"></i><span class="timeline-copy"><strong>状态已更新</strong><small>10:48:20 · 仿真环境</small></span></div>
          <div class="timeline-item"><i class="time-dot"></i><span class="timeline-copy"><strong>关联任务已创建</strong><small>10:42:18 · dev.dispatch</small></span></div>
        </div>
      </section>
    </div>
    <div class="drawer-foot"><button class="btn js-close-drawer">关闭</button><button class="btn primary js-toast" data-message="已打开完整详情">查看</button></div>`;
}

function openDrawer(kind, id) {
  document.getElementById("drawer").innerHTML = renderGenericDetail(kind, id);
  document.getElementById("drawerBackdrop").classList.add("open");
}

function closeDrawer() {
  document.getElementById("drawerBackdrop").classList.remove("open");
}

function openModal(title, body, action = "确认") {
  document.getElementById("modal").innerHTML = `
    <div class="modal-head"><h3>${title}</h3><button class="btn icon js-close-modal">×</button></div>
    <div class="modal-body">${body}</div>
    <div class="modal-foot"><button class="btn js-close-modal">取消</button><button class="btn primary js-modal-confirm">${action}</button></div>`;
  document.getElementById("modalBackdrop").classList.add("open");
}

function closeModal() {
  document.getElementById("modalBackdrop").classList.remove("open");
}

function toast(message) {
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<span class="toast-icon">✓</span><span><strong>${message}</strong><br><small class="muted">操作已记录到当前演示环境</small></span>`;
  document.getElementById("toastStack").appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

function mapCreateSteps(step) {
  return `<div class="map-create-steps">${["基础信息","扫描底图","关联资源","创建草稿"].map((label,index)=>`<span class="${index + 1 <= step ? "active" : ""}"><b>${index + 1}</b>${label}</span>`).join("")}</div>`;
}

function openMapCreateWizard(step = 1) {
  const bodies = {
    1: `<div class="form-grid"><div class="form-row"><label>地图编号 *</label><input value="MAP-D"></div><div class="form-row"><label>地图名称 *</label><input value="三楼装配物流区"></div><div class="form-row"><label>所属专案 *</label><select><option>FXXXXXN CNC 物流一期</option></select></div><div class="form-row"><label>所属楼层 *</label><select><option>2F</option><option>1F</option><option>3F</option></select></div><div class="form-row"><label>坐标单位</label><select><option>米 (m)</option></select></div><div class="form-row"><label>地图用途</label><select><option>生产运行</option><option>测试联调</option><option>仿真</option></select></div></div>`,
    2: `<div class="map-source-choice"><label class="selected"><input type="radio" name="mapSource" checked><i>AMR</i><span><b>从 AMR 获取扫描地图</b><small>选择已完成扫描的在线车辆和地图记录</small></span></label><label><input type="radio" name="mapSource"><i>UP</i><span><b>上传地图文件</b><small>导入研发支持的栅格或点云地图</small></span></label></div><div class="form-grid mt-14"><div class="form-row"><label>地图来源 AMR *</label><select><option>AMR-03 · LP-200 · 在线</option><option>AMR-01 · LP-200 · 在线</option></select></div><div class="form-row"><label>扫描记录 *</label><select><option>SCN-260804-018 · 今日 13:42</option></select></div><div class="form-row"><label>分辨率</label><input value="0.05 m / px" readonly></div><div class="form-row"><label>地图尺寸</label><input value="38.0 × 26.0 m" readonly></div></div>`,
    3: `<div class="resource-association-summary"><span><b>6</b>可选 AMR</span><span><b>16</b>可选设备</span><span><b>0</b>已定位</span></div><div class="resource-association-list"><label><input type="checkbox" checked><i>AM</i><span><b>LP-200 车队</b><small>AMR-01 — AMR-06 · 允许加载该地图</small></span><em>6 台</em></label><label><input type="checkbox" checked><i>DV</i><span><b>CNC 三号线设备组</b><small>CNC-09 — CNC-14 · 进入编辑器后定位</small></span><em>6 台</em></label><label><input type="checkbox" checked><i>BF</i><span><b>成品缓冲区</b><small>BUF-03 / BUF-04 · 进入编辑器后定位</small></span><em>2 个</em></label><label><input type="checkbox" checked><i>GT</i><span><b>交通设备</b><small>GATE-03 / LIFT-02 · 进入编辑器后定位</small></span><em>2 个</em></label></div><p class="form-help mt-14">路口、窄通道和会车区将在逻辑地图中绘制创建。</p>`,
    4: `<div class="map-create-result"><span class="result-map-code">MAP-D</span><div><h3>三楼装配物流区</h3><p>2F · 生产运行 · 草稿 V0.1</p></div></div><div class="check-list mt-14"><div class="pass">✓ 已选择 AMR-03 扫描底图</div><div class="pass">✓ 已关联 6 台适用 AMR</div><div class="pass">✓ 已关联 10 个现场设备</div><div class="warn">! 设备、站点和交通资源将在编辑器中定位</div></div><div class="map-create-next"><b>创建后将发生什么？</b><span>建立地图项目 → 生成逻辑地图草稿 → 进入编辑器完成资源定位</span></div>`
  };
  const actions = ["", "下一步：添加底图", "下一步：关联资源", "下一步：确认", "创建并打开编辑器"];
  openModal("创建地图项目", `${mapCreateSteps(step)}${bodies[step]}`, actions[step]);
  const modal = document.getElementById("modal");
  modal.dataset.workflow = "map-create";
  modal.dataset.step = String(step);
}

function bindCommonEvents() {
  document.addEventListener("click", event => {
    const go = event.target.closest("[data-go]");
    if (go && !event.target.closest(".js-map-manage")) location.href = pageHref(go.dataset.go);

    const detail = event.target.closest(".js-detail");
    if (detail) openDrawer(detail.dataset.kind || "对象", detail.dataset.id || "—");

    const btCard = event.target.closest("[data-bt-card]");
    if (btCard) {
      document.querySelectorAll("[data-bt-card]").forEach(el => el.classList.toggle("selected", el === btCard));
      const bind = {btSelectedAmr:"amr",btSelectedTask:"task",btSelectedTree:"tree",btSelectedNode:"node",btSelectedCode:"code",btSelectedStep:"step",btSelectedSource:"source",btSelectedTarget:"target",btSelectedTime:"time",btSelectedState:"state"};
      Object.entries(bind).forEach(([id,key]) => { const el=document.getElementById(id); if(el) el.textContent=btCard.dataset[key]; });
    }

    if (event.target.closest(".js-close-drawer")) closeDrawer();
    if (event.target.closest(".js-close-modal")) closeModal();
    if (event.target === document.getElementById("drawerBackdrop")) closeDrawer();
    if (event.target === document.getElementById("modalBackdrop")) closeModal();

    const toastButton = event.target.closest(".js-toast");
    if (toastButton) toast(toastButton.dataset.message || "操作已完成");

    if (event.target.closest(".js-global-context")) {
      openModal("切换全局运行范围", `
        <p>切换后，运行概览、数字孪生、派单、交通监控、AMR 和设备页面将使用同一空间范围。</p>
        <div class="form-grid">
          <div class="form-row"><label>楼层</label><select class="js-context-floor"><option>1F</option><option selected>2F</option><option>3F</option></select></div>
          <div class="form-row"><label>地图</label><select class="js-context-map"><option value="MAP-A">MAP-A · 装配物流区</option><option value="MAP-B">MAP-B · CNC 二号线</option><option value="MAP-C">MAP-C · 联调区</option></select></div>
        </div>`, "应用范围");
    }

    if (event.target.closest(".js-modal-confirm")) {
      const workflowModal = document.getElementById("modal");
      if (workflowModal.dataset.workflow === "map-create") {
        const step = Number(workflowModal.dataset.step || 1);
        if (step < 4) openMapCreateWizard(step + 1);
        else {
          closeModal();
          toast("地图项目 MAP-D 已创建，逻辑地图草稿 V0.1 已生成");
        }
        return;
      }
      const floor = document.querySelector(".js-context-floor");
      const map = document.querySelector(".js-context-map");
      if (floor && map) {
        const value = `${floor.value} / ${map.value}`;
        document.querySelectorAll(".js-current-context").forEach(el => { el.textContent = value; });
        closeModal();
        toast(`全局运行范围已切换为 ${value}`);
        return;
      }
      closeModal();
      toast("操作已确认");
    }
  });

  document.addEventListener("input", event => {
    if (event.target.classList.contains("js-search")) {
      const term = event.target.value.trim().toLowerCase();
      document.querySelectorAll(".data-table tbody tr").forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(term) ? "" : "none";
      });
      document.querySelectorAll(".map-library-card").forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(term) ? "" : "none";
      });
    }
    if (event.target.classList.contains("js-range")) {
      const out = event.target.nextElementSibling;
      out.textContent = `${event.target.value}${out.textContent.includes("%") ? "%" : ""}`;
    }
  });

  document.addEventListener("keydown", event => {
    const mapCard = event.target.closest(".map-library-card[data-go]");
    if (mapCard && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      location.href = pageHref(mapCard.dataset.go);
    }
  });

  document.addEventListener("click", event => {
    const trafficLayer = event.target.closest(".js-traffic-layer");
    if (trafficLayer) {
      trafficLayer.classList.toggle("active");
      toast(`${trafficLayer.textContent.trim()}图层已${trafficLayer.classList.contains("active") ? "显示" : "隐藏"}`);
    }
    if (event.target.closest(".js-traffic-block")) {
      openModal("临时封锁交通资源", `<div class="form-grid"><div class="form-row full"><label>交通资源</label><select><option>ZONE-B2 · 二号线会车区</option><option>ZONE-A3 · 一号线窄通道</option><option>INT-01 · 中央交叉口</option></select></div><div class="form-row full"><label>封锁原因</label><input value="现场临时作业"></div><div class="form-row"><label>预计结束</label><input value="30 分钟后"></div><div class="form-row"><label>影响任务</label><input value="预计 2 个"></div></div>`, "确认封锁");
    }
    if (event.target.closest(".js-release-traffic")) {
      openModal("释放异常占用", `<p>仅在车辆已离开但资源状态未释放时使用。操作将写入交通记录。</p><div class="detail-item"><label>当前资源</label><strong>ZONE-A3 · AMR-02</strong></div>`, "确认释放");
    }
    const object = event.target.closest(".js-object");
    if (object) {
      document.querySelectorAll(".js-object").forEach(x => x.classList.remove("active"));
      object.classList.add("active");
      toast(`${object.dataset.object} 已在地图中定位`);
    }
    const agv = event.target.closest(".js-agv");
    if (agv) {
      document.querySelectorAll(".js-agv").forEach(x => x.classList.remove("selected"));
      agv.classList.add("selected");
      toast(`${agv.dataset.name} 已选中`);
    }
    const tool = event.target.closest(".editor-tool");
    if (tool) {
      document.querySelectorAll(".editor-tool").forEach(x => x.classList.remove("active"));
      tool.classList.add("active");
      toast(`已切换到${tool.textContent.trim()}工具`);
    }
    const command = event.target.closest(".editor-command");
    if (command) {
      document.querySelectorAll(".editor-command").forEach(x => x.classList.remove("active"));
      command.classList.add("active");
      toast(`已切换到${command.querySelector("small")?.textContent || "编辑"}工具`);
    }
    const editorTab = event.target.closest("[data-editor-tab]");
    if (editorTab) {
      document.querySelectorAll("[data-editor-tab]").forEach(x => x.classList.toggle("active", x === editorTab));
      document.querySelectorAll("[data-editor-panel]").forEach(x => x.classList.toggle("hidden", x.dataset.editorPanel !== editorTab.dataset.editorTab));
    }
    const debugMode = event.target.closest("[data-debug-mode]");
    if (debugMode) {
      document.querySelectorAll("[data-debug-mode]").forEach(x => x.classList.toggle("active", x === debugMode));
      document.querySelectorAll("[data-debug-panel]").forEach(x => x.classList.toggle("hidden", x.dataset.debugPanel !== debugMode.dataset.debugMode));
    }
    const mapView = event.target.closest("[data-map-view]");
    if (mapView) {
      document.querySelectorAll("[data-map-view]").forEach(x => x.classList.toggle("active", x === mapView));
      const stage = document.querySelector(".editor-occupancy-stage");
      if (stage) stage.dataset.view = mapView.dataset.mapView;
      toast(`已切换为${mapView.textContent.trim()}视图`);
    }
    const placeResource = event.target.closest(".js-place-resource");
    if (placeResource) {
      toast(`${placeResource.dataset.resource} 已进入定位模式，请在画布中选择位置`);
    }
    const mapManage = event.target.closest(".js-map-manage, .map-more");
    if (mapManage) {
      const mapId = mapManage.dataset.mapId || mapManage.closest("[data-map-id]")?.dataset.mapId || "MAP-A";
      document.getElementById("drawer").innerHTML = renderMapSettingsDrawer(mapId);
      document.getElementById("drawerBackdrop").classList.add("open");
    }
    const collapsePane = event.target.closest("[data-collapse-pane]");
    if (collapsePane) {
      const shell = document.querySelector(".map-canvas-shell");
      if (shell) {
        const pane = collapsePane.dataset.collapsePane;
        const collapsed = shell.classList.toggle(`${pane}-collapsed`);
        collapsePane.textContent = pane === "objects" ? (collapsed ? "›" : "‹") : (collapsed ? "‹" : "›");
        collapsePane.setAttribute("aria-label", `${collapsed ? "展开" : "折叠"}${pane === "objects" ? "对象" : "属性"}面板`);
      }
    }
    if (event.target.closest(".js-unplaced-resources")) {
      openModal("待定位资源", `<div class="resource-association-list"><label><input type="checkbox"><i>DV</i><span><b>CNC-09</b><small>CNC 设备 · 尚未设置本体位置与停靠点</small></span><em>待定位</em></label><label><input type="checkbox"><i>BF</i><span><b>BUF-03</b><small>成品缓冲区 · 尚未设置停靠点</small></span><em>待定位</em></label><label><input type="checkbox"><i>GT</i><span><b>GATE-03</b><small>自动门 · 尚未定位</small></span><em>待定位</em></label></div>`, "进入放置模式");
    }
    const agvEdit = event.target.closest(".js-agv-edit");
    if (agvEdit) {
      const editing = agvEdit.dataset.mode === "edit";
      openModal(editing ? "编辑 AMR · AMR-03" : "新增 AMR", `<div class="form-grid"><div class="form-row"><label>AMR 编号 *</label><input value="${editing ? "AMR-03" : ""}" placeholder="例如 AMR-07"></div><div class="form-row"><label>名称 *</label><input value="${editing ? "一号线搬运车 03" : ""}" placeholder="输入现场识别名称"></div><div class="form-row"><label>所属型号 *</label><select><option${editing?"":" selected"}>LP-200 · 差速驱动</option><option${editing?" selected":""}>OMNI-300 · 全向驱动</option><option>SW-500 · 舵轮</option></select><span class="form-help">速度和导航参数继承所选型号。</span></div><div class="form-row"><label>当前地图 *</label><select><option selected>2F / MAP-A · 装配物流区</option><option>1F / MAP-B · CNC二号线</option></select></div><div class="form-row"><label>初始点位 *</label><select><option${editing?" selected":""}>P-03</option><option>P-01</option><option>CHG-01</option></select></div><div class="form-row"><label>启用状态</label><select><option>启用</option><option>停用</option></select></div></div><p class="form-help mt-14">运行状态、电量、位置和当前任务由车辆实时上报，不在基础信息中手工维护。</p>`, editing ? "保存 AMR" : "创建 AMR");
    }
    const modelEdit = event.target.closest(".js-agv-model-edit");
    if (modelEdit) {
      const editing = modelEdit.dataset.mode === "edit";
      const model = modelEdit.dataset.model || "";
      openModal(editing ? `编辑 AMR 型号 · ${model}` : "新增 AMR 型号", `<div class="form-grid"><div class="form-row"><label>型号编号 *</label><input value="${editing ? model : ""}" placeholder="例如 LP-200"></div><div class="form-row"><label>底盘类型 *</label><select><option${model==="LP-200"?" selected":""}>差速驱动</option><option${model==="OMNI-300"?" selected":""}>全向驱动</option><option${model==="SW-500"?" selected":""}>舵轮</option></select></div><div class="form-row"><label>最大线速度 *</label><div class="input-unit"><input value="${model==="SW-500"?"2.00":model==="OMNI-300"?"1.20":"1.50"}"><span>m/s</span></div></div><div class="form-row"><label>最大角速度 *</label><div class="input-unit"><input value="${model==="OMNI-300"?"1.50":model==="SW-500"?"0.80":"1.20"}"><span>rad/s</span></div></div><div class="form-row"><label>加速度 *</label><div class="input-unit"><input value="${model==="SW-500"?"0.70":model==="OMNI-300"?"0.50":"0.60"}"><span>m/s²</span></div></div><div class="form-row"><label>到达阈值 *</label><div class="input-unit"><input value="${model==="OMNI-300"?"0.08":model==="SW-500"?"0.15":"0.10"}"><span>m</span></div></div><div class="form-row"><label>前视距离 *</label><div class="input-unit"><input value="${model==="SW-500"?"2.20":model==="OMNI-300"?"1.50":"1.80"}"><span>m</span></div></div><div class="form-row"><label>状态</label><select><option>启用</option><option>停用</option></select></div></div><p class="form-help mt-14">型号参数会被所属 AMR 实例继承；调试限速不能超过最大线速度。</p>`, editing ? "保存型号" : "创建型号");
    }
    const editMapResources = event.target.closest(".js-edit-map-resources");
    if (editMapResources) {
      openModal(`编辑${editMapResources.dataset.resourceKind || "地图资源"}`, `<div class="resource-association-list"><label><input type="checkbox" checked><i>01</i><span><b>已选资源组</b><small>保存后新增资源会进入地图编辑器的待定位列表</small></span><em>已选</em></label><label><input type="checkbox"><i>02</i><span><b>三号线扩展资源</b><small>未关联</small></span><em>可选</em></label></div>`, "保存选择");
    }
    if (event.target.closest(".js-validate")) {
      const bar = document.getElementById("validationBar");
      if (bar) bar.innerHTML = `<b style="color:var(--green)">校验通过</b><span>0 个错误</span><span style="color:var(--amber)">2 个警告</span><span class="link">查看警告</span>`;
      toast("地图校验完成");
    }
    if (event.target.closest(".js-publish")) {
      openModal("发布并下发 MAP-A V1.9", `<div class="publish-readiness"><span class="pass">✓ 导航拓扑连通</span><span class="pass">✓ 14 台设备已定位</span><span class="pass">✓ 12 个交通资源配置完整</span></div><div class="form-grid mt-14"><div class="form-row"><label>版本说明</label><input value="调整 LANE-A03 并新增 BUF-03"></div><div class="form-row"><label>激活方式</label><select><option>AMR 空闲后自动激活</option><option>仅发布，稍后手动下发</option></select></div><div class="form-row full"><label>目标 AMR</label><div class="target-amr-list"><label><input type="checkbox" checked> AMR-01</label><label><input type="checkbox" checked> AMR-02</label><label><input type="checkbox" checked> AMR-03</label><label><input type="checkbox" checked> AMR-04</label></div><span class="form-help">运行中车辆会等待任务结束，不会在行驶中切换地图。</span></div></div>`, "发布并下发");
    }
    if (event.target.closest(".js-new-map")) {
      openMapCreateWizard(1);
    }
    if (event.target.closest(".js-map-import")) {
      openModal("选择地图创建方式", `<div class="map-source-grid"><button class="map-source-card js-map-source" data-source="scan"><span>AMR</span><strong>从 AMR 扫描创建</strong><small>选择在线车辆扫描现场，生成新的基础栅格地图</small></button><button class="map-source-card js-map-source" data-source="blank"><span>＋</span><strong>创建空白地图</strong><small>先建立地图记录，再手动编辑全部图层</small></button><button class="map-source-card js-map-source" data-source="file"><span>UP</span><strong>导入地图文件</strong><small>上传已有地图作为新的基础地图版本</small></button></div>`, "取消");
    }
    if (event.target.closest(".js-map-resource-manager")) {
      openModal("关联地图资源 · MAP-A", `<div class="resource-association-summary"><span><b>6</b>适用 AMR</span><span><b>14</b>现场设备</span><span><b>3</b>待定位</span></div><div class="resource-association-list"><label><input type="checkbox" checked><i>AM</i><span><b>AMR-01 — AMR-06</b><small>LP-200 · 允许加载该地图</small></span><em>已关联</em></label><label><input type="checkbox" checked><i>DV</i><span><b>CNC-01 — CNC-09</b><small>CNC 设备组 · 8 台已定位</small></span><em>1 台待定位</em></label><label><input type="checkbox" checked><i>BF</i><span><b>BUF-01 — BUF-03</b><small>成品缓冲区 · 2 个已定位</small></span><em>1 个待定位</em></label><label><input type="checkbox" checked><i>GT</i><span><b>GATE-01 — GATE-03</b><small>自动门 · 2 个已定位</small></span><em>1 个待定位</em></label></div><p class="form-help mt-14">路口、窄通道和会车区属于交通资源，请在地图编辑器中创建。</p>`, "保存关联");
    }
    const mapOverview = event.target.closest(".js-map-overview");
    if (mapOverview) {
      openModal(`地图配置 · ${mapOverview.dataset.id}`, `<div class="detail-grid"><div class="detail-item"><label>扫描底图</label><strong>AMR-03 / 0.05 m</strong></div><div class="detail-item"><label>坐标原点</label><strong>X 0.00 / Y 0.00</strong></div><div class="detail-item"><label>运行版本</label><strong>V1.8</strong></div><div class="detail-item"><label>编辑草稿</label><strong>V1.9</strong></div><div class="detail-item"><label>适用 AMR</label><strong>6 台</strong></div><div class="detail-item"><label>资源完整度</label><strong>92%</strong></div></div>`, "打开编辑器");
    }
    const mapSource = event.target.closest(".js-map-source");
    if (mapSource?.dataset.source === "scan") {
      openModal("从 AMR 扫描创建地图", `<div class="scan-flow"><div class="scan-step active"><b>1</b><span>选择车辆</span></div><div class="scan-step"><b>2</b><span>现场扫描</span></div><div class="scan-step"><b>3</b><span>预览处理</span></div><div class="scan-step"><b>4</b><span>保存草稿</span></div></div><div class="form-grid"><div class="form-row"><label>执行扫描的 AMR</label><select><option>AMR-01 · 在线 / 空闲</option><option>AMR-04 · 在线 / 充电中</option></select></div><div class="form-row"><label>保存方式</label><select><option>创建当前地图的新版本</option><option>创建一张新地图</option></select></div><div class="form-row"><label>目标楼层</label><select><option>2F</option><option>1F</option></select></div><div class="form-row"><label>地图名称</label><input value="MAP-A · 装配物流区"></div><div class="form-row full"><label>扫描范围</label><select><option>当前地图全部区域</option><option>指定局部区域</option></select><span class="form-help">扫描结果只生成基础栅格层，不会直接覆盖正在运行的 V1.8。</span></div></div>`, "开始扫描");
    }
    if (mapSource?.dataset.source === "blank") {
      openModal("创建空白地图", `<div class="form-grid"><div class="form-row"><label>地图名称</label><input value="新建物流地图"></div><div class="form-row"><label>所属楼层</label><select><option>2F</option><option>1F</option><option>新建楼层</option></select></div><div class="form-row"><label>画布宽度</label><input value="800"></div><div class="form-row"><label>画布高度</label><input value="600"></div><div class="form-row full"><label>地图编号</label><input value="MAP-D"></div></div>`, "创建并打开编辑器");
    }
    if (mapSource?.dataset.source === "file") {
      openModal("导入地图文件", `<div class="upload-zone"><b>选择地图文件</b><span>支持研发配置的栅格地图格式，导入后先保存为草稿</span><button class="btn small">选择文件</button></div><div class="form-grid mt-14"><div class="form-row"><label>保存方式</label><select><option>创建当前地图的新版本</option><option>创建一张新地图</option></select></div><div class="form-row"><label>目标楼层</label><select><option>2F</option><option>1F</option></select></div></div>`, "开始导入");
    }
    if (event.target.closest(".js-save-task-config")) {
      openModal("启用任务配置", `<p>启用后，符合条件的设备请求将自动生成任务，并交由所选调度策略分配 AMR。</p><div class="detail-grid" style="grid-template-columns:repeat(2,1fr)"><div class="detail-item"><label>请求匹配</label><strong>CNC 设备组 / 物料不足</strong></div><div class="detail-item"><label>执行链路</label><strong>标准补料流程 V2.4</strong></div></div>`, "确认启用");
    }
    if (event.target.closest(".js-save-draft")) {
      toast("任务配置草稿已保存");
    }
    if (event.target.closest(".js-strategy-test")) {
      const target = document.getElementById("strategyResult");
      target.textContent = `测试完成

候选车辆  AMR-01 / AMR-04 / AMR-05
分配结果  AMR-01
计算耗时  18 ms
返回说明  距离起点 4.2m，电量 86%，当前空闲`;
      toast("策略模拟测试完成");
    }
    if (event.target.closest(".js-send-api")) {
      const response = document.getElementById("apiResponse");
      const status = document.getElementById("apiStatus");
      const time = document.getElementById("apiTime");
      status.textContent = "请求中…";
      time.textContent = "—";
      response.textContent = "正在发送请求…";
      setTimeout(() => {
        status.textContent = "201 Created";
        time.textContent = "38 ms";
        response.textContent = `{
  "success": true,
  "data": {
    "taskId": "TSK-260731-023",
    "status": "PENDING",
    "assignedAgv": null,
    "createdAt": "2026-07-31T11:08:42+08:00"
  },
  "traceId": "trc_9b7e18ca"
}`;
        toast("接口请求成功");
      }, 650);
    }
  });
}

function updateClock() {
  const now = new Date();
  const text = now.toLocaleTimeString("zh-CN", { hour12: false });
  const side = document.getElementById("liveClock");
  const map = document.getElementById("mapClock");
  if (side) side.textContent = text;
  if (map) map.textContent = text;
}

function renderPage() {
  if (PAGE_ID === "dashboard") return renderDashboard();
  if (PAGE_ID.startsWith("traffic-")) return renderTraffic();
  if (PAGE_ID === "map-list") return renderMapList();
  if (PAGE_ID === "map-logs") return renderMapLogs();
  if (PAGE_ID === "map-editor") return renderMapEditor();
  if (PAGE_ID === "task-list") return renderTaskList();
  if (PAGE_ID === "task-detail") return renderTaskDetail();
  if (PAGE_ID === "task-config") return renderTaskConfig();
  if (PAGE_ID === "task-config-create" || PAGE_ID === "task-config-edit") return renderTaskConfigEditor();
  if (PAGE_ID === "dispatch-strategies") return renderStrategies();
  if (PAGE_ID === "dispatch-strategy-detail") return renderStrategyDetail();
  if (PAGE_ID === "dispatch-records") return renderDispatchRecords();
  if (PAGE_ID === "dispatch-record-detail") return renderDispatchRecordDetail();
  if (PAGE_ID === "agv-list") return renderAgvList();
  if (PAGE_ID === "agv-detail") return renderAgvDetail();
  if (PAGE_ID === "agv-models") return renderAgvModels();
  if (PAGE_ID === "device-list") return renderDeviceList();
  if (PAGE_ID === "device-detail") return renderDeviceDetail();
  if (PAGE_ID === "device-types") return renderDeviceTypes();
  if (PAGE_ID.startsWith("api-")) return renderApi();
  if (["amr-debug","debug-records"].includes(PAGE_ID)) return renderDebugPlatform();
  if (PAGE_ID.startsWith("behavior-")) return renderBehaviorTree();
  return renderSettings();
}

renderShell();
renderPage();
bindCommonEvents();
updateClock();
setInterval(updateClock, 1000);
