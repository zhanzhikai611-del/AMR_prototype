const PAGE_ROOT = document.body.dataset.root || ".";
const PAGE_ID = document.body.dataset.page || "dashboard";

const NAV = [
  { id: "dashboard", label: "首页", file: "dashboard.html", children: [
    ["dashboard", "运行总览", "OV"]
  ]},
  { id: "dispatch", label: "派单管理", file: "task-list.html", children: [
    ["task-list", "实时任务", "RT"],
    ["task-config", "任务配置", "CF"],
    ["dispatch-strategies", "调度策略", "ST"],
    ["dispatch-records", "调度记录", "RC"]
  ]},
  { id: "traffic", label: "交通管制", file: "traffic-overview.html", children: [
    ["traffic-overview", "交通态势", "TF"],
    ["traffic-resources", "管制资源", "RS"],
    ["traffic-records", "管制记录", "RC"]
  ]},
  { id: "behavior", label: "行为树管理", file: "behavior-trees.html", children: [
    ["behavior-trees", "行为树列表", "BT"],
    ["behavior-editor", "基础编辑示意", "ED"]
  ]},
  { id: "map", label: "地图管理", file: "map-editor.html", children: [
    ["map-editor", "地图编辑器", "ED"],
    ["map-list", "地图管理", "MP"]
  ]},
  { id: "resource", label: "资源管理", file: "agv-list.html", children: [
    ["agv-list", "AMR 列表", "AM"],
    ["device-list", "设备列表", "DV"],
    ["agv-models", "型号配置", "MD"],
    ["device-types", "设备类型", "TP"]
  ]},
  { id: "api", label: "API 测试", file: "api-catalog.html", children: [
    ["api-catalog", "接口目录", "AP"],
    ["api-workbench", "测试工作台", "WB"],
    ["api-history", "请求历史", "HS"]
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
  "traffic-overview": ["交通态势", "监控当前地图的路权、占用、等待队列与冲突状态"],
  "traffic-resources": ["管制资源", "管理路口、窄通道、区域及交通设备的运行规则"],
  "traffic-records": ["管制记录", "追踪路权申请、占用释放、冲突与人工干预记录"],
  "map-editor": ["地图编辑器", "编辑全局运行范围中当前选中的地图及其业务图层"],
  "map-list": ["地图管理", "创建地图记录并管理楼层归属、来源、版本与发布状态"],
  "task-list": ["实时任务", "集中掌握设备请求、任务阶段、执行车辆与现场异常"],
  "task-config": ["任务配置", "维护设备请求可匹配的标准任务模板与执行规则"],
  "task-detail": ["任务详情", "查看任务从设备请求到执行完成的实时过程"],
  "task-config-create": ["新建任务配置", "定义设备请求、物流路线、行为树与派单约束"],
  "task-config-edit": ["编辑任务配置", "调整标准任务模板及其请求匹配规则"],
  "dispatch-strategies": ["调度策略", "配置研发提供的调度类型和可调参数"],
  "dispatch-strategy-detail": ["调度策略详情", "维护策略参数并查看受影响的任务配置"],
  "dispatch-records": ["调度记录", "追踪每次任务分配所采用的策略与结果"],
  "dispatch-record-detail": ["调度记录详情", "还原一次任务分配的候选车辆、决策依据与结果"],
  "agv-list": ["AMR 列表", "集中查看单品牌 AMR 的运行与连接状态"],
  "agv-detail": ["AMR-03 详情", "查看单车状态、任务、事件和基础配置"],
  "agv-models": ["型号配置", "维护当前品牌 AMR 的展示参数与基础规格"],
  "device-list": ["设备列表", "管理 CNC 等流水线设备及其地图绑定"],
  "device-detail": ["CNC-07 详情", "查看机台状态、地图位置与关联任务"],
  "device-types": ["设备类型", "配置设备的默认图标、状态和点位要求"],
  "api-catalog": ["接口目录", "按业务模块浏览研发提供的平台接口"],
  "api-workbench": ["API 测试工作台", "配置请求并查看响应、耗时和错误信息"],
  "api-history": ["请求历史", "复用最近请求和已保存的测试用例"],
  "behavior-trees": ["行为树列表", "管理 AMR 执行流程及行为树版本"],
  "behavior-editor": ["基础编辑示意", "查看行为树节点、连线和基础属性布局"],
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
  const parentList = PAGE_ID === "agv-detail" ? "agv-list" : PAGE_ID === "device-detail" ? "device-list" : PAGE_ID === "task-detail" ? "task-list" : ["task-config-create","task-config-edit"].includes(PAGE_ID) ? "task-config" : PAGE_ID === "dispatch-strategy-detail" ? "dispatch-strategies" : PAGE_ID === "dispatch-record-detail" ? "dispatch-records" : "";
  const secondary = module.children.map(child => `<a class="${child[0] === PAGE_ID || child[0] === parentList ? "active" : ""}" href="${pageHref(`${child[0]}.html`)}"><span class="nav-icon">${child[2]}</span>${child[1]}</a>`).join("");
  const dispatchParent = {"task-detail":"实时任务","task-config-create":"任务配置","task-config-edit":"任务配置","dispatch-strategy-detail":"调度策略","dispatch-record-detail":"调度记录"}[PAGE_ID];
  const breadcrumb = PAGE_ID === "agv-detail" ? `${module.label} / AMR 列表 / ${meta[0]}` : PAGE_ID === "device-detail" ? `${module.label} / 设备列表 / ${meta[0]}` : dispatchParent ? `${module.label} / ${dispatchParent} / ${meta[0]}` : `${module.label} / ${meta[0]}`;

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
          <p class="page-description">${meta[1]}</p>
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
  const colgroup = widths.length ? `<colgroup>${widths.map(w => `<col style="width:${w}">`).join("")}</colgroup>` : "";
  return `
    <div class="table-wrap">
      <table class="data-table">${colgroup}
        <thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead>
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
    <rect width="760" height="520" fill="#c9ced2"/>
    <path d="M38 40H718V472H38Z M75 72V445H692V72Z" fill="#70777d" fill-rule="evenodd" opacity=".36"/>
    <rect x="75" y="72" width="617" height="373" fill="#f3f5f6"/>
    <rect x="75" y="72" width="617" height="373" fill="url(#occGrid)" opacity=".7"/>
    <path d="M96 96H237V134H178V318H253V406H96ZM279 112H578V178H528V302H578V406H279V350H246V134H279Z" fill="#171b1e" opacity=".9"/>
    <path d="M117 114H218V122H158V298H236V388H116V374H218V336H158V134H117ZM300 132H558V158H508V322H558V386H300V366H538V342H488V138H300Z" fill="#7c8489" opacity=".55"/>
    <g fill="#121619">${scanPoints.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="2.2"/>`).join("")}</g>
    <g fill="#343a3e" opacity=".4" filter="url(#pointSoft)">${scanPoints.filter((_,i)=>i%3===0).map(p=>`<circle cx="${p[0]+4}" cy="${p[1]-3}" r="4"/>`).join("")}</g>
    <g fill="#52595e" opacity=".65"><circle cx="122" cy="186" r="2"/><circle cx="129" cy="191" r="1.5"/><circle cx="137" cy="188" r="2"/><circle cx="214" cy="238" r="2"/><circle cx="221" cy="244" r="1.6"/><circle cx="590" cy="212" r="2"/><circle cx="598" cy="218" r="1.7"/><circle cx="608" cy="214" r="2"/><circle cx="619" cy="365" r="2"/><circle cx="626" cy="371" r="1.5"/></g>
    <path d="M122 350H226V310H370V236H548V350H610" fill="none" stroke="#1683f5" stroke-width="3" opacity=".82"/>
    <path d="M122 350H226V310H370" fill="none" stroke="#55b7ff" stroke-width="8" opacity=".16"/>
    <g fill="#fff" stroke="#1683f5" stroke-width="3"><circle cx="122" cy="350" r="7"/><circle cx="226" cy="310" r="6"/><circle cx="370" cy="236" r="6"/><circle cx="548" cy="350" r="6"/><circle cx="610" cy="350" r="7"/></g>
    <g transform="translate(371 236)"><circle r="13" fill="#1683f5"/><path d="M0-8L6 7L0 4L-6 7Z" fill="#fff"/></g>
    <g class="occ-meta"><rect x="88" y="84" width="154" height="32" rx="3"/><text x="99" y="97">SLAM OCCUPANCY GRID</text><text x="99" y="108">RES 0.05 m · 760 × 520 px</text></g>
    <g class="occ-scale"><line x1="590" y1="426" x2="670" y2="426"/><line x1="590" y1="421" x2="590" y2="431"/><line x1="670" y1="421" x2="670" y2="431"/><text x="622" y="418">5 m</text></g>
    <g class="occ-origin" transform="translate(108 420)"><line x1="0" y1="0" x2="24" y2="0"/><line x1="0" y1="0" x2="0" y2="-24"/><text x="28" y="4">X</text><text x="-4" y="-29">Y</text><text x="8" y="16">MAP ORIGIN</text></g>
  </svg>`;
}

function renderDashboardCockpit() {
  setActions(`<button class="btn" data-go="traffic-overview.html">交通态势</button>`);
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
          <img src="../assets/images/digital-twin-factory.png" alt="厂内物流AMR三维数字孪生静态效果图">
          <div class="twin-visual-shade"></div>
          <div class="twin-visual-label"><span>DIGITAL TWIN · STATIC PREVIEW</span><strong class="js-current-context">2F / MAP-A</strong></div>
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
  if (PAGE_ID === "traffic-resources") return renderTrafficResources();
  if (PAGE_ID === "traffic-records") return renderTrafficRecords();
  setActions(`<button class="btn js-toast" data-message="当前有 1 台 AMR 等待路权">查看等待队列</button><button class="btn primary js-traffic-block">临时封锁路段</button>`);
  content(`
    <div class="traffic-shell">
      <aside class="work-pane">
        <div class="pane-head"><span class="pane-title">交通资源</span>${badge("LIVE","blue")}</div>
        <div class="tabs"><button class="tab active">区域</button><button class="tab">队列</button><button class="tab">设备</button></div>
        <div class="object-list">
          <div class="object-row active js-object" data-object="ZONE-A3"><span class="object-symbol">A3</span><span class="object-copy"><strong>ZONE-A3 · 窄通道</strong><small>AMR-02 占用</small></span>${badge("占用","blue")}</div>
          <div class="object-row js-object" data-object="INT-01"><span class="object-symbol machine">I1</span><span class="object-copy"><strong>INT-01 · 交叉路口</strong><small>AMR-03 已授权</small></span>${badge("授权","cyan")}</div>
          <div class="object-row js-object" data-object="GATE-02"><span class="object-symbol safe">G2</span><span class="object-copy"><strong>GATE-02 · 自动门</strong><small>空闲 · 可用</small></span></div>
          <div class="object-row js-object" data-object="LIFT-01"><span class="object-symbol warn">L1</span><span class="object-copy"><strong>LIFT-01 · 电梯</strong><small>AMR-05 等待</small></span>${badge("等待","amber")}</div>
          <div class="object-row js-object" data-object="ZONE-B2"><span class="object-symbol danger">B2</span><span class="object-copy"><strong>ZONE-B2 · 会车区</strong><small>人工临时封锁</small></span>${badge("封锁","red")}</div>
        </div>
      </aside>
      <section class="map-pane">
        <div class="map-toolbar">
          <button class="map-tool active js-traffic-layer">车辆</button>
          <button class="map-tool active js-traffic-layer">计划路线</button>
          <button class="map-tool active js-traffic-layer">占用资源</button>
          <button class="map-tool js-traffic-layer">冲突</button>
        </div>
        <div class="map-stage">${factoryMap()}</div>
        <div class="map-footer"><span>MAP-A · 装配物流区</span><span>4 个资源占用 · 1 台等待　|　更新于 <b id="mapClock">--:--:--</b></span></div>
      </section>
      <aside class="work-pane">
        <div class="pane-head"><span class="pane-title">ZONE-A3</span>${badge("已占用","blue")}</div>
        <div class="property-section">
          <h4>资源状态</h4>
          <div class="property-list">
            <div class="property"><span>资源类型</span><strong>单向窄通道</strong></div>
            <div class="property"><span>当前占用</span><strong class="link">AMR-02</strong></div>
            <div class="property"><span>关联任务</span><strong class="link">TSK-260731-018</strong></div>
            <div class="property"><span>等待队列</span><strong style="color:var(--amber)">AMR-05 · 1 台</strong></div>
            <div class="property"><span>最大容量</span><strong>1 台</strong></div>
            <div class="property"><span>预计释放</span><strong>10:45:26</strong></div>
          </div>
        </div>
        <div class="property-section">
          <h4>路权流转</h4>
          <div class="timeline">
            <div class="timeline-item"><i class="time-dot"></i><span class="timeline-copy"><strong>申请进入</strong><small>10:44:08 · AMR-02</small></span></div>
            <div class="timeline-item"><i class="time-dot"></i><span class="timeline-copy"><strong>路权已授予</strong><small>10:44:09 · 无冲突</small></span></div>
            <div class="timeline-item"><i class="time-dot"></i><span class="timeline-copy"><strong>进入资源</strong><small>10:44:12 · 已占用 48 秒</small></span></div>
            <div class="timeline-item"><i class="time-dot" style="background:var(--amber);box-shadow:0 0 0 1px var(--amber)"></i><span class="timeline-copy"><strong>等待释放</strong><small>预计 10:45:26</small></span></div>
          </div>
        </div>
        <div class="property-section">
          <button class="btn small" data-go="task-list.html">查看关联任务</button>
          <button class="btn small js-release-traffic">释放异常占用</button>
        </div>
      </aside>
    </div>`);
}

function renderTrafficResources() {
  setActions(`<button class="btn primary js-toast" data-message="已创建一个空白管制资源">＋ 新建管制资源</button>`);
  const rows = [
    ["ZONE-A3","一号线窄通道","窄通道","MAP-A","占用","AMR-02","1","单向互斥","10:44:38"],
    ["INT-01","中央交叉口","交叉路口","MAP-A","已授权","AMR-03","0","先到先行","10:44:31"],
    ["GATE-02","二号线自动门","自动门","MAP-A","空闲","—","0","联动放行","10:44:20"],
    ["LIFT-01","物流电梯","电梯","MAP-A","等待","—","1","单车优先","10:44:12"],
    ["ZONE-B2","二号线会车区","会车区","MAP-A","封锁","—","0","容量 2 台","10:40:06"]
  ].map(r=>`<tr><td class="id">${r[0]}</td><td><b>${r[1]}</b></td><td>${r[2]}</td><td>${r[3]}</td><td>${badge(r[4],statusTone(r[4]))}</td><td>${r[5]}</td><td>${r[6]}</td><td>${r[7]}</td><td class="mono muted">${r[8]}</td><td><button class="btn small js-detail" data-kind="管制资源" data-id="${r[0]}">配置</button></td></tr>`);
  content(`<div class="stats-row"><div class="stat-card"><div class="stat-label">启用资源</div><div class="stat-value">12<small>个</small></div><span class="stat-foot">当前地图</span></div><div class="stat-card blue"><div class="stat-label">占用中</div><div class="stat-value">4<small>个</small></div><span class="stat-foot">利用率 33%</span></div><div class="stat-card amber"><div class="stat-label">等待车辆</div><div class="stat-value">1<small>台</small></div><span class="stat-foot">最长等待 18 秒</span></div><div class="stat-card red"><div class="stat-label">临时封锁</div><div class="stat-value">1<small>个</small></div><span class="stat-foot">ZONE-B2</span></div></div>${toolbar({search:"搜索资源编号或名称",filters:["全部类型","全部状态"]})}${table(["资源编号","资源名称","类型","地图","状态","当前 AMR","队列","放行规则","更新时间","操作"],rows,["105px","16%","90px","75px","80px","90px","60px","110px","95px","72px"])}`);
}

function renderTrafficRecords() {
  const rows = [
    ["TRF-0186","10:44:12","进入资源","ZONE-A3","AMR-02","TSK-260731-018","成功","1.2 秒","系统"],
    ["TRF-0185","10:44:09","路权授予","ZONE-A3","AMR-02","TSK-260731-018","成功","1.0 秒","系统"],
    ["TRF-0184","10:43:58","路权等待","LIFT-01","AMR-05","TSK-260731-019","等待","18 秒","系统"],
    ["TRF-0183","10:42:46","冲突消解","INT-01","AMR-03","TSK-260731-021","已重规划","4.6 秒","系统"],
    ["TRF-0182","10:40:06","临时封锁","ZONE-B2","—","—","已生效","—","张凯"]
  ].map(r=>`<tr><td class="id">${r[0]}</td><td class="mono">${r[1]}</td><td><b>${r[2]}</b></td><td>${r[3]}</td><td>${r[4]}</td><td class="id">${r[5]}</td><td>${badge(r[6],statusTone(r[6]))}</td><td>${r[7]}</td><td>${r[8]}</td><td><button class="btn small js-detail" data-kind="管制记录" data-id="${r[0]}">详情</button></td></tr>`);
  content(`<div class="stats-row"><div class="stat-card"><div class="stat-label">今日路权申请</div><div class="stat-value">186<small>次</small></div><span class="stat-foot">成功率 98.9%</span></div><div class="stat-card cyan"><div class="stat-label">平均等待</div><div class="stat-value">4.8<small>秒</small></div><span class="stat-foot">较昨日 -0.6 秒</span></div><div class="stat-card amber"><div class="stat-label">冲突消解</div><div class="stat-value">2<small>次</small></div><span class="stat-foot">均已自动处理</span></div><div class="stat-card red"><div class="stat-label">人工干预</div><div class="stat-value">1<small>次</small></div><span class="stat-foot">临时封锁</span></div></div>${toolbar({search:"搜索记录、资源、AMR 或任务",filters:["全部事件","全部结果","今日"]})}${table(["记录编号","时间","事件","资源","AMR","关联任务","结果","等待时长","触发方","操作"],rows,["105px","75px","90px","90px","85px","135px","90px","85px","80px","65px"])}`);
}

function renderMapList() {
  setActions(`<button class="btn primary js-new-map">＋ 创建地图</button>`);
  const maps = [
    ["MAP-A","装配物流区","2F","AMR 扫描","已发布","V1.8","V1.9 草稿","07-31 09:40"],
    ["MAP-B","CNC 二号线测试区","1F","文件导入","草稿","—","V0.4","07-30 16:12"],
    ["MAP-C","空白联调区域","2F","空白创建","空白","—","V0.1","07-29 14:35"]
  ].map((r,i)=>`<tr><td class="id">${r[0]}</td><td><b>${r[1]}</b>${i===0?'<small class="table-sub">当前全局地图</small>':''}</td><td>${r[2]}</td><td>${r[3]}</td><td>${badge(r[4],statusTone(r[4]))}</td><td class="mono">${r[5]}</td><td class="mono">${r[6]}</td><td class="mono muted">${r[7]}</td><td><button class="btn small" data-go="map-editor.html">设为当前并编辑</button></td></tr>`);
  content(`<div class="map-management-note"><span class="note-icon">i</span><div><strong>地图管理只维护地图实体与版本</strong><p>道路、点位、设备映射和管制区域请进入地图编辑器处理；切换当前地图后，顶部全局运行范围会同步更新。</p></div></div>${toolbar({search:"搜索地图编号或名称",filters:["全部楼层","全部来源","全部状态"]})}${table(["编号","地图名称","楼层","创建来源","状态","运行版本","编辑版本","更新时间","操作"],maps,["90px","18%","70px","100px","85px","90px","105px","110px","145px"])}`);
}

function renderMapEditor() {
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
          ${[["基础栅格地图","AMR-03 扫描 · V1.9"],["导航道路与方向","12 条道路"],["站点与停靠点","32 个点位"],["机台设备映射","14 台设备"],["交通管制资源","12 个资源"],["地图校验区域","3 个检测区域"],["禁行与限速区域","5 个区域"],["坐标网格","辅助图层"]].map((x,i)=>`<label class="object-row"><input type="checkbox" ${i<7?"checked":""}><span class="object-copy"><strong>${x[0]}</strong><small>${x[1]}</small></span></label>`).join("")}
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

function renderTaskList() {
  setActions(`<span class="live-indicator"><i></i> 实时更新</span>`);
  const stages = ["前往取料点","等待机台放行","前往交付点","调度异常","等待可用 AMR","任务已完成"];
  const sources = ["CNC-07","CNC-04","CNC-02","ST-03","BUF-01","CNC-08"];
  const elapsed = ["06:18","02:46","等待 01:32","异常 00:48","排队 03:09","完成 10:24"];
  const rows = TASKS.map((t,i)=>`<tr class="drill-row" data-go="task-detail.html"><td class="id">${t[0]}</td><td><strong>${sources[i]}</strong><small class="cell-note">设备请求</small></td><td>${t[1]}<small class="cell-note">${t[2]} → ${t[3]}</small></td><td><span class="task-stage"><i style="--progress:${Math.min(88,18+i*13)}%"></i></span><small class="cell-note">${stages[i]}</small></td><td class="table-link">${t[4]}</td><td>${badge(t[5],statusTone(t[5]))}</td><td class="mono ${i===1?'text-red':'muted'}">${elapsed[i]}</td><td><button class="btn ghost small" data-go="task-detail.html">查看 →</button></td></tr>`);
  content(`
    <div class="stats-row">
      <div class="stat-card"><div class="stat-label">待调度</div><div class="stat-value">2</div></div>
      <div class="stat-card cyan"><div class="stat-label">执行中</div><div class="stat-value">3</div></div>
      <div class="stat-card amber"><div class="stat-label">等待</div><div class="stat-value">1</div></div>
      <div class="stat-card red"><div class="stat-label">异常</div><div class="stat-value">1</div></div>
    </div>
    ${toolbar({search:"搜索任务、请求设备或 AMR",filters:["全部运行状态","全部任务类型","全部来源设备"],right:`<span class="muted">最后更新 14:32:08</span>`})}
    ${table(["任务编号","请求来源","任务与路线","当前执行阶段","执行 AMR","状态","持续时间",""],rows,["145px","105px","160px","150px","90px","90px","100px","65px"])}
  `);
}

function renderTaskConfig() {
  setActions(`<button class="btn primary" data-go="task-config-create.html">＋ 新建任务配置</button>`);
  const configs = [
    ["CFG-001","线边补料","CNC 请求缺料","ST-01 → 请求机台","标准补料流程","最近距离优先","启用","12"],
    ["CFG-002","成品转运","机台加工完成","请求机台 → BUF-02","成品下料流程","电量均衡","启用","8"],
    ["CFG-003","空箱回收","空箱数量达阈值","请求机台 → REC-01","空箱回收流程","最近距离优先","启用","5"],
    ["CFG-004","紧急叫料","MES 紧急请求","WARE-01 → 请求设备","紧急配送流程","高优先级抢占","停用","0"]
  ];
  const rows = configs.map(c=>`<tr class="drill-row" data-go="task-config-edit.html"><td class="id">${c[0]}</td><td><strong>${c[1]}</strong></td><td>${c[2]}</td><td>${c[3]}</td><td class="table-link">${c[4]}</td><td>${c[5]}</td><td>${badge(c[6],c[6]==="启用"?"green":"gray")}</td><td class="mono">${c[7]}</td><td><button class="btn ghost small" data-go="task-config-edit.html">编辑 →</button></td></tr>`);
  content(`${toolbar({search:"搜索配置名称或触发设备",filters:["全部任务类型","全部状态"],right:`<button class="btn small">导出配置</button>`})}${table(["配置编号","任务类型","设备触发条件","默认路线","行为树","调度策略","状态","今日触发",""],rows,["95px","100px","150px","145px","130px","125px","75px","80px","65px"])}`);
}

function renderTaskConfigEditor() {
  const editing = PAGE_ID === "task-config-edit";
  setActions(`<button class="btn" data-go="task-config.html">← 返回任务配置</button>`);
  content(`
    <div class="config-editor-grid">
      <div class="config-editor-main">
        ${configSection("01","基础信息",`<div class="form-grid"><div class="form-row"><label>配置名称 *</label><input value="${editing?'标准线边补料':''}" placeholder="例如：标准线边补料"></div><div class="form-row"><label>任务类型 *</label><select><option>线边补料</option><option>成品转运</option><option>空箱回收</option></select></div><div class="form-row"><label>运行范围 *</label><select><option>2F / MAP-A</option></select></div><div class="form-row"><label>默认优先级</label><select><option>普通</option><option>高</option><option>低</option></select></div></div>`)}
        ${configSection("02","请求触发",`<div class="form-grid"><div class="form-row"><label>请求来源 *</label><select><option>机台设备</option><option>API 请求</option></select></div><div class="form-row"><label>设备范围 *</label><select><option>CNC 设备组</option><option>指定设备</option></select></div><div class="form-row"><label>请求事件 *</label><select><option>物料不足</option><option>加工完成</option></select></div><div class="form-row"><label>重复请求抑制</label><select><option>同设备存在未完成任务时忽略</option><option>进入等待队列</option></select></div></div>`)}
        ${configSection("03","任务路线",`<div class="form-grid"><div class="form-row"><label>取货点 *</label><select><option>ST-01 · 一号上料站</option><option>请求参数指定</option></select></div><div class="form-row"><label>交付点 *</label><select><option>请求设备绑定点</option><option>固定站点</option></select></div><div class="form-row full"><label>中间点</label><input placeholder="可选；按执行顺序添加"></div></div><div class="route-preview"><span>ST-01</span><i></i><span>请求设备绑定点</span></div>`)}
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
  const rows = strategies.map(s=>`<tr class="drill-row" data-go="dispatch-strategy-detail.html"><td class="id">${s[0]}</td><td><strong>${s[1]}</strong><small class="cell-note">${s[3]}</small></td><td class="mono">${s[2]}</td><td>${s[4]}</td><td>${badge(s[5],s[5]==="启用"?"green":"gray")}</td><td class="mono muted">${s[6]}</td><td><button class="btn ghost small" data-go="dispatch-strategy-detail.html">配置 →</button></td></tr>`);
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
            <div class="detail-item"><label>模拟任务</label><strong>ST-01 → CNC-07</strong></div>
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
  const records = TASKS.map((t,i)=>`<tr class="drill-row" data-go="dispatch-record-detail.html"><td class="mono muted">10:${42-i*3}:${18+i}</td><td class="id">${t[0]}</td><td>${i%2?"电量均衡":"最近距离优先"}</td><td>3 台</td><td class="table-link">${t[4]}</td><td>${badge(i===1?"分配后异常":"已分配",i===1?"red":"green")}</td><td>${18+i*4} ms</td><td><button class="btn ghost small" data-go="dispatch-record-detail.html">详情 →</button></td></tr>`);
  setActions(`<button class="btn">导出记录</button>`);
  content(`${toolbar({search:"搜索任务或 AMR",filters:["全部策略","全部结果"]})}${table(["时间","任务编号","调度策略","候选车辆","分配车辆","结果","耗时",""],records,["90px","145px","125px","80px","90px","100px","75px","70px"])}`);
}

function renderTaskDetail() {
  setActions(`<button class="btn back-btn" data-go="task-list.html">← 返回实时任务</button><button class="btn" data-go="traffic-overview.html">在交通地图中定位</button>`);
  content(`<div class="task-detail-hero"><div><span class="eyebrow">TASK INSTANCE</span><h2>TSK-260731-021</h2><p>CNC-07 发出物料不足请求 · 标准线边补料</p></div>${badge("执行中","blue")}</div><div class="task-flow"><div class="done"><b>1</b><span>接收请求<small>10:42:16</small></span></div><div class="done"><b>2</b><span>完成派单<small>AMR-03</small></span></div><div class="active"><b>3</b><span>行为树执行<small>前往取料点</small></span></div><div><b>4</b><span>任务完成<small>等待</small></span></div></div><div class="split-main"><section class="panel"><div class="panel-head"><span class="panel-title">任务运行信息</span></div><div class="panel-body"><div class="detail-grid"><div class="detail-item"><label>请求设备</label><strong>CNC-07</strong></div><div class="detail-item"><label>任务配置</label><strong>CFG-001 · 标准线边补料</strong></div><div class="detail-item"><label>执行 AMR</label><strong class="table-link">AMR-03</strong></div><div class="detail-item"><label>任务路线</label><strong>ST-01 → CNC-07</strong></div><div class="detail-item"><label>行为树</label><strong>标准补料流程 V2.4</strong></div><div class="detail-item"><label>调度策略</label><strong>最近距离优先</strong></div></div></div></section><aside class="panel"><div class="panel-head"><span class="panel-title">实时事件</span><span class="live-indicator"><i></i> 更新中</span></div><div class="panel-body"><div class="timeline"><div class="timeline-item"><i class="time-dot"></i><span class="timeline-copy"><strong>AMR-03 到达 ST-01</strong><small>10:47:52 · 行为树节点 ARRIVE_PICKUP</small></span></div><div class="timeline-item"><i class="time-dot"></i><span class="timeline-copy"><strong>交通资源 ZONE-A3 已释放</strong><small>10:46:31 · 等待 18 秒</small></span></div><div class="timeline-item"><i class="time-dot"></i><span class="timeline-copy"><strong>调度完成</strong><small>10:42:18 · AMR-03 / 22 ms</small></span></div></div></div></aside></div>`);
}

function renderDispatchRecordDetail() {
  setActions(`<button class="btn back-btn" data-go="dispatch-records.html">← 返回调度记录</button>`);
  content(`<div class="decision-banner"><span>DECISION / DSP-260731-1042</span><strong>最近距离优先 → AMR-03</strong><small>任务 TSK-260731-021 · 计算耗时 22 ms · 已分配</small></div><div class="split-main"><section class="panel"><div class="panel-head"><span class="panel-title">候选车辆评分</span></div><div class="panel-body">${table(["候选 AMR","距离","电量","任务负载","综合评分","结果"],[['AMR-03','6.4 m','62%','0','92.6',badge('已选择','green')],['AMR-01','9.8 m','86%','0','81.2',badge('未选择','gray')],['AMR-05','12.8 m','55%','1','63.5',badge('未选择','gray')]].map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`))}</div></section><aside class="panel"><div class="panel-head"><span class="panel-title">决策上下文</span></div><div class="panel-body"><div class="property-list"><div class="property"><span>任务配置</span><strong>CFG-001</strong></div><div class="property"><span>策略版本</span><strong>STR-001 / V1.6</strong></div><div class="property"><span>候选车辆</span><strong>3 台</strong></div><div class="property"><span>过滤车辆</span><strong>3 台</strong></div><div class="property"><span>运行范围</span><strong>2F / MAP-A</strong></div></div></div></aside></div>`);
}

function renderAgvList() {
  setActions(`<button class="btn primary js-toast" data-message="已打开新增 AMR 表单">＋ 新增 AMR</button>`);
  const rows = AMRS.map(a=>`<tr class="drill-row" data-go="agv-detail.html"><td class="id">${a[0]}</td><td>LP-200</td><td>${badge("在线",a[5]==="red"?"amber":"green")}</td><td>${badge(a[1],a[5])}</td><td class="mono">${a[2]}</td><td>${a[3]}</td><td class="table-link">${a[4]}</td><td class="mono muted">刚刚</td><td><button class="btn ghost small" data-go="agv-detail.html">查看详情 →</button></td></tr>`);
  content(`${toolbar({search:"搜索 AMR 名称或编号",filters:["全部运行状态","全部型号","全部电量"]})}${table(["AMR","型号","连接","运行状态","电量","当前位置","当前任务","更新时间",""],rows,["95px","90px","80px","90px","70px","130px","145px","80px","70px"])}`);
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
      <div class="panel-head"><span class="panel-title">实时状态</span>${badge("执行中","blue")}</div>
      <div class="panel-body detail-grid">
        ${[["AMR 编号","AMR-03"],["型号","LP-200"],["当前任务","TSK-260731-021"],["任务步骤","前往 CNC-07"],["当前位置","通道 A3"],["坐标","X 4.28 / Y 12.60"],["速度","1.20 m/s"],["更新时间","刚刚"]].map(x=>`<div class="detail-item"><label>${x[0]}</label><strong>${x[1]}</strong></div>`).join("")}
      </div>
    </section>
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
  setActions(`<button class="btn primary js-toast" data-message="已打开新增型号表单">＋ 新增型号</button>`);
  const rows = [
    ["LP-200","潜伏顶升","200 kg","1.5 m/s","30%","570 × 830 × 280 mm","6 台","启用"],
    ["LP-600","潜伏顶升","600 kg","1.2 m/s","35%","780 × 1050 × 320 mm","0 台","预留"]
  ].map(r=>`<tr><td class="id">${r[0]}</td><td>${r[1]}</td><td class="mono">${r[2]}</td><td class="mono">${r[3]}</td><td class="mono">${r[4]}</td><td class="mono">${r[5]}</td><td>${r[6]}</td><td>${badge(r[7],r[7]==="启用"?"green":"gray")}</td><td><button class="btn small js-toast" data-message="型号配置已打开">编辑</button></td></tr>`);
  content(`${toolbar({search:"搜索型号",filters:["全部状态"]})}${table(["型号","类型","额定载重","额定速度","低电阈值","外形尺寸","车辆数量","状态","操作"],rows,["100px","110px","100px","100px","90px","180px","80px","80px","70px"])}`);
}

function renderDeviceList() {
  setActions(`<button class="btn primary js-toast" data-message="已打开新增设备表单">＋ 新增设备</button>`);
  const rows = DEVICES.map(d=>`<tr class="drill-row" data-go="device-detail.html"><td class="id">${d[0]}</td><td>${d[1]}</td><td>${d[2]}</td><td>${badge(d[3],d[7])}</td><td>${badge(d[4],"green")}</td><td>${d[5]}</td><td class="table-link">${d[6]}</td><td class="mono muted">刚刚</td><td><button class="btn ghost small" data-go="device-detail.html">查看详情 →</button></td></tr>`);
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

function renderBehaviorTree() {
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
        ${[["管理员","4 名用户","全部模块和高风险操作","blue"],["研发人员","12 名用户","研发功能与交通管制","cyan"],["只读用户","3 名用户","查看状态和列表","gray"]].map(r=>`<section class="panel"><div class="panel-head"><span class="panel-title">${r[0]}</span>${badge("启用",r[3])}</div><div class="panel-body"><div class="stat-value" style="font-size:20px">${r[1]}</div><p class="muted" style="font-size:11px;line-height:1.7">${r[2]}</p><button class="btn small js-detail" data-kind="角色" data-id="${r[0]}">配置权限</button></div></section>`).join("")}
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
    ["10:31:11","demo.viewer","AMR 管理","查看详情","AMR-03","成功","只读访问"]
  ];
  const sysRows = [
    ["10:52:16.042","INFO","task-service","AMR-03","TSK-260731-022","trc_f82a196e","Task created and queued"],
    ["10:48:03.128","INFO","amr-gateway","AMR-03","TSK-260731-021","trc_4c8e123f","Position state updated"],
    ["10:43:58.315","ERROR","task-service","—","—","trc_15ac40c2","Invalid endPoint: P-C09"],
    ["10:39:26.084","WARN","device-gateway","—","TSK-260731-020","trc_79de03b8","CNC-08 entered fault state"],
    ["10:31:11.492","INFO","dispatch-service","AMR-02","TSK-260731-018","trc_3ef1429a","Vehicle assigned in 22ms"]
  ];
  const rows = (system?sysRows:opRows).map(r=>`<tr class="js-detail" data-kind="${system?"系统日志":"操作日志"}" data-id="${r[system?5:4]}">${r.map((v,i)=>`<td class="${i===0||i===(system?5:1)?"mono muted":""}">${system&&i===1?badge(v,v==="ERROR"?"red":v==="WARN"?"amber":"blue"):v}</td>`).join("")}<td><button class="btn ghost small">详情 →</button></td></tr>`);
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
    <div class="drawer-foot"><button class="btn js-close-drawer">关闭</button><button class="btn primary js-toast" data-message="已打开完整详情">查看完整详情</button></div>`;
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

function bindCommonEvents() {
  document.addEventListener("click", event => {
    const go = event.target.closest("[data-go]");
    if (go) location.href = pageHref(go.dataset.go);

    const detail = event.target.closest(".js-detail");
    if (detail) openDrawer(detail.dataset.kind || "对象", detail.dataset.id || "—");

    if (event.target.closest(".js-close-drawer")) closeDrawer();
    if (event.target.closest(".js-close-modal")) closeModal();
    if (event.target === document.getElementById("drawerBackdrop")) closeDrawer();
    if (event.target === document.getElementById("modalBackdrop")) closeModal();

    const toastButton = event.target.closest(".js-toast");
    if (toastButton) toast(toastButton.dataset.message || "操作已完成");

    if (event.target.closest(".js-global-context")) {
      openModal("切换全局运行范围", `
        <p>切换后，运行概览、数字孪生、派单、交通管制、AMR 和设备页面将使用同一空间范围。</p>
        <div class="form-grid">
          <div class="form-row"><label>楼层</label><select class="js-context-floor"><option>1F</option><option selected>2F</option><option>3F</option></select></div>
          <div class="form-row"><label>地图</label><select class="js-context-map"><option value="MAP-A">MAP-A · 装配物流区</option><option value="MAP-B">MAP-B · CNC 二号线</option><option value="MAP-C">MAP-C · 联调区</option></select></div>
        </div>`, "应用范围");
    }

    if (event.target.closest(".js-modal-confirm")) {
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
    }
    if (event.target.classList.contains("js-range")) {
      const out = event.target.nextElementSibling;
      out.textContent = `${event.target.value}${out.textContent.includes("%") ? "%" : ""}`;
    }
  });

  document.addEventListener("click", event => {
    const trafficLayer = event.target.closest(".js-traffic-layer");
    if (trafficLayer) {
      trafficLayer.classList.toggle("active");
      toast(`${trafficLayer.textContent.trim()}图层已${trafficLayer.classList.contains("active") ? "显示" : "隐藏"}`);
    }
    if (event.target.closest(".js-traffic-block")) {
      openModal("临时封锁交通资源", `<div class="form-grid"><div class="form-row full"><label>管制资源</label><select><option>ZONE-B2 · 二号线会车区</option><option>ZONE-A3 · 一号线窄通道</option><option>INT-01 · 中央交叉口</option></select></div><div class="form-row full"><label>封锁原因</label><input value="现场临时作业"></div><div class="form-row"><label>预计结束</label><input value="30 分钟后"></div><div class="form-row"><label>影响任务</label><input value="预计 2 个"></div></div>`, "确认封锁");
    }
    if (event.target.closest(".js-release-traffic")) {
      openModal("释放异常占用", `<p>仅在车辆已离开但资源状态未释放时使用。操作将写入管制记录。</p><div class="detail-item"><label>当前资源</label><strong>ZONE-A3 · AMR-02</strong></div>`, "确认释放");
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
    if (event.target.closest(".js-validate")) {
      const bar = document.getElementById("validationBar");
      if (bar) bar.innerHTML = `<b style="color:var(--green)">校验通过</b><span>0 个错误</span><span style="color:var(--amber)">2 个警告</span><span class="link">查看警告</span>`;
      toast("地图校验完成");
    }
    if (event.target.closest(".js-publish")) {
      openModal("发布地图 MAP-A V1.9", `<p>地图校验已通过。发布后，交通管制与任务执行将使用这个版本。</p><div class="detail-grid" style="grid-template-columns:repeat(2,1fr)"><div class="detail-item"><label>变更</label><strong>道路 1 · 点位 2</strong></div><div class="detail-item"><label>目标范围</label><strong>当前专案</strong></div></div>`, "发布地图");
    }
    if (event.target.closest(".js-new-map") || event.target.closest(".js-map-import")) {
      openModal("选择地图创建方式", `<div class="map-source-grid"><button class="map-source-card js-map-source" data-source="scan"><span>AMR</span><strong>从 AMR 扫描创建</strong><small>选择在线车辆扫描现场，生成新的基础栅格地图</small></button><button class="map-source-card js-map-source" data-source="blank"><span>＋</span><strong>创建空白地图</strong><small>先建立地图记录，再手动编辑全部图层</small></button><button class="map-source-card js-map-source" data-source="file"><span>UP</span><strong>导入地图文件</strong><small>上传已有地图作为新的基础地图版本</small></button></div>`, "取消");
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
  if (PAGE_ID.startsWith("behavior-")) return renderBehaviorTree();
  return renderSettings();
}

renderShell();
renderPage();
bindCommonEvents();
updateClock();
setInterval(updateClock, 1000);

