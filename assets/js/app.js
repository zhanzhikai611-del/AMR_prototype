const PAGE_ROOT = document.body.dataset.root || ".";
const PAGE_ID = document.body.dataset.page || "dashboard";

const NAV = [
  { id: "dashboard", label: "首页", file: "dashboard.html", children: [
    ["dashboard", "运行概览", "OV"]
  ]},
  { id: "simulation", label: "实时控制", file: "simulation-live.html", children: [
    ["simulation-live", "实时控制", "RT"],
    ["simulation-scenes", "控制场景", "SC"]
  ]},
  { id: "dispatch", label: "派单管理", file: "task-list.html", children: [
    ["task-list", "任务列表", "TK"],
    ["task-create", "创建任务", "＋"],
    ["dispatch-strategies", "调度策略", "ST"],
    ["dispatch-records", "调度记录", "RC"]
  ]},
  { id: "map", label: "地图编辑", file: "map-list.html", children: [
    ["map-list", "地图列表", "MP"],
    ["map-editor", "地图编辑器", "ED"]
  ]},
  { id: "agv", label: "AMR 管理", file: "agv-list.html", children: [
    ["agv-list", "AMR 列表", "AM"],
    ["agv-detail", "AMR 详情", "DT"],
    ["agv-models", "型号配置", "MD"]
  ]},
  { id: "device", label: "设备管理", file: "device-list.html", children: [
    ["device-list", "设备列表", "DV"],
    ["device-detail", "设备详情", "DT"],
    ["device-types", "设备类型", "TP"]
  ]},
  { id: "api", label: "API 测试", file: "api-catalog.html", children: [
    ["api-catalog", "接口目录", "AP"],
    ["api-workbench", "测试工作台", "WB"],
    ["api-history", "请求历史", "HS"]
  ]},
  { id: "behavior", label: "行为树管理", file: "behavior-trees.html", children: [
    ["behavior-trees", "行为树列表", "BT"],
    ["behavior-editor", "基础编辑示意", "ED"]
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
  dashboard: ["运行概览", "查看 AMR、任务、机台与研发服务的当前状态"],
  "simulation-live": ["实时控制", "在同一张地图中观察车辆、任务路线和机台联动"],
  "simulation-scenes": ["控制场景", "管理研发联调与演示使用的可复现场景"],
  "map-list": ["地图列表", "管理实时控制使用的地图版本与发布状态"],
  "map-editor": ["地图编辑器", "编辑道路、点位、区域与机台映射"],
  "task-list": ["任务列表", "查看任务队列、执行状态和失败原因"],
  "task-create": ["创建任务", "选择起终点与 AMR，创建一条厂内物流任务"],
  "dispatch-strategies": ["调度策略", "配置研发提供的调度类型和可调参数"],
  "dispatch-records": ["调度记录", "追踪每次任务分配所采用的策略与结果"],
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
  const primary = NAV.map(item => `<a class="${item.id === module.id ? "active" : ""}" href="${pageHref(item.file)}">${item.label}</a>`).join("");
  const secondary = module.children.map(child => `<a class="${child[0] === PAGE_ID ? "active" : ""}" href="${pageHref(`${child[0]}.html`)}"><span class="nav-icon">${child[2]}</span>${child[1]}</a>`).join("");

  document.body.innerHTML = `
    <header class="topbar">
      <a class="brand" href="${pageHref("dashboard.html")}">
        <span class="brand-mark"><span></span></span>
        <span class="brand-copy"><strong>FXXXXXN</strong><small>AMR CONTROL</small></span>
      </a>
      <nav class="primary-nav" aria-label="一级导航">${primary}</nav>
      <div class="top-actions">
        <span class="connection-pill"><i class="dot"></i>服务正常</span>
        <button class="top-icon" aria-label="通知">${iconBell()}</button>
        <button class="avatar" aria-label="用户菜单">研</button>
      </div>
    </header>
    <aside class="sidebar">
      <div class="side-heading">${module.label}</div>
      <nav class="side-nav" aria-label="二级导航">${secondary}</nav>
      <div class="side-meta">环境版本 <b>SIM 0.8.4</b><br>数据更新 <b id="liveClock">--:--:--</b></div>
    </aside>
    <main class="app-main">
      <section class="page-head">
        <div>
          <div class="breadcrumb">${module.label} / ${meta[0]}</div>
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

function renderDashboard() {
  setActions(`<button class="btn" data-go="operation-logs.html">查看事件</button><button class="btn primary" data-go="task-create.html">＋ 创建任务</button>`);
  content(`
    <div class="status-rail">
      <div class="rail-node"><span class="rail-dot">SYS</span><span class="rail-copy"><small>平台服务</small><strong>8 / 8 正常</strong></span></div>
      <div class="rail-node"><span class="rail-dot">AMR</span><span class="rail-copy"><small>车辆在线</small><strong>6 / 6 在线</strong></span></div>
      <div class="rail-node"><span class="rail-dot">TSK</span><span class="rail-copy"><small>任务队列</small><strong>3 执行中</strong></span></div>
      <div class="rail-node attention"><span class="rail-dot">CNC</span><span class="rail-copy"><small>机台状态</small><strong>1 项待处理</strong></span></div>
      <div class="rail-node"><span class="rail-dot">API</span><span class="rail-copy"><small>接口健康</small><strong>42 ms</strong></span></div>
    </div>
    <div class="stats-row">
      <div class="stat-card"><div class="stat-label">AMR 在线</div><div class="stat-value">6<small>/ 6 台</small></div><span class="stat-foot">在线率 100%</span></div>
      <div class="stat-card cyan"><div class="stat-label">执行中任务</div><div class="stat-value">3<small>条</small></div><span class="stat-foot">待调度 2</span></div>
      <div class="stat-card amber"><div class="stat-label">等待 AMR 的机台</div><div class="stat-value">2<small>台</small></div><span class="stat-foot">最长 04:18</span></div>
      <div class="stat-card red"><div class="stat-label">当前异常</div><div class="stat-value">1<small>项</small></div><span class="stat-foot">AMR-06</span></div>
    </div>
    <section class="panel">
      <div class="panel-head"><span class="panel-title">快捷操作 <span class="panel-subtitle">常用研发与演示入口</span></span></div>
      <div class="panel-body quick-actions">
        <button class="quick-card" data-go="task-create.html"><span class="quick-icon">＋</span><span><strong>创建物流任务</strong><small>选择起终点与执行车辆</small></span></button>
        <button class="quick-card" data-go="simulation-live.html"><span class="quick-icon">RT</span><span><strong>进入实时仿真</strong><small>查看车辆和机台联动</small></span></button>
        <button class="quick-card" data-go="map-editor.html"><span class="quick-icon">ED</span><span><strong>编辑当前地图</strong><small>修改道路、点位和设备</small></span></button>
        <button class="quick-card" data-go="api-workbench.html"><span class="quick-icon">API</span><span><strong>打开 API 测试</strong><small>发送请求并检查响应</small></span></button>
      </div>
    </section>
    <div class="home-layout">
      <section class="panel">
        <div class="panel-head"><span class="panel-title">任务节拍 <span class="panel-subtitle">最近 8 小时</span></span><button class="btn ghost small" data-go="task-list.html">查看全部 →</button></div>
        <div class="panel-body">
          <div class="chart"><div class="chart-grid"><span></span><span></span><span></span><span></span></div><div class="bars">
            ${[44,58,53,72,66,84,77,61].map((h,i)=>`<span class="bar ${i>4?"cyan":""}" style="height:${h}%" data-label="${String(i+3).padStart(2,"0")}:00"></span>`).join("")}
          </div></div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-head"><span class="panel-title">车辆运行构成</span><button class="btn ghost small" data-go="agv-list.html">AMR 管理 →</button></div>
        <div class="donut-wrap">
          <div class="donut"></div>
          <div class="legend">
            <div class="legend-row"><i class="legend-color"></i><span>任务执行</span><b>52%</b></div>
            <div class="legend-row"><i class="legend-color" style="background:var(--cyan)"></i><span>空闲等待</span><b>22%</b></div>
            <div class="legend-row"><i class="legend-color" style="background:var(--amber)"></i><span>充电维护</span><b>15%</b></div>
            <div class="legend-row"><i class="legend-color" style="background:#dfe6eb"></i><span>异常停机</span><b>11%</b></div>
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-head"><span class="panel-title">当前任务</span><button class="btn ghost small" data-go="task-list.html">任务列表 →</button></div>
        <div class="panel-body mini-list">
          ${TASKS.slice(0,4).map(t=>`<div class="mini-row js-detail" data-kind="任务" data-id="${t[0]}"><span><strong>${t[0]} · ${t[1]}</strong><small>${t[2]} → ${t[3]} · ${t[4]}</small></span>${badge(t[5],statusTone(t[5]))}</div>`).join("")}
        </div>
      </section>
      <section class="panel">
        <div class="panel-head"><span class="panel-title">最近事件</span><button class="btn ghost small" data-go="operation-logs.html">操作日志 →</button></div>
        <div class="panel-body timeline">
          <div class="timeline-item"><i class="time-dot"></i><span class="timeline-copy"><strong>AMR-03 到达 CNC-07</strong><small>10:47:28 · TSK-260731-021</small></span></div>
          <div class="timeline-item"><i class="time-dot" style="background:var(--amber);box-shadow:0 0 0 1px var(--amber)"></i><span class="timeline-copy"><strong>CNC-03 开始等待 AMR</strong><small>10:45:12 · 已等待 02:16</small></span></div>
          <div class="timeline-item"><i class="time-dot"></i><span class="timeline-copy"><strong>AMR-02 接收线边补料任务</strong><small>10:42:08 · 自动分配</small></span></div>
        </div>
      </section>
    </div>
  `);
}

function renderSimulation() {
  const scenes = PAGE_ID === "simulation-scenes";
  if (scenes) return renderSceneList();
  setActions(`<button class="btn js-sim-reset">重置仿真</button><button class="btn primary" data-go="task-create.html">＋ 创建任务</button>`);
  content(`
    <div class="sim-shell" id="simShell">
      <aside class="work-pane">
        <div class="pane-head"><span class="pane-title">现场对象</span>${badge("LIVE","blue")}</div>
        <div class="tabs"><button class="tab active">AMR</button><button class="tab">任务</button><button class="tab">设备</button></div>
        <div class="object-list">
          ${AMRS.map((a,i)=>`<div class="object-row ${i===2?"active":""} js-object" data-object="${a[0]}"><span class="object-symbol ${a[5]==="amber"?"warn":""}">${a[0].slice(-2)}</span><span class="object-copy"><strong>${a[0]} · ${a[1]}</strong><small>${a[2]} · ${a[3]}</small></span>${a[5]==="red"?badge("异常","red"):""}</div>`).join("")}
        </div>
      </aside>
      <section class="map-pane">
        <div class="map-toolbar">
          <button class="map-tool active js-sim-toggle">Ⅱ 暂停</button>
          <button class="map-tool js-sim-step">单步</button>
          <button class="map-tool js-speed">1×</button>
          <button class="map-tool">图层</button>
        </div>
        <div class="map-stage">${factoryMap()}</div>
        <div class="map-footer"><span>MAP-A · 装配物流区</span><span>X 4.28 m · Y 12.60 m　|　更新于 <b id="mapClock">--:--:--</b></span></div>
      </section>
      <aside class="work-pane">
        <div class="pane-head"><span class="pane-title">AMR-03</span>${badge("执行中","blue")}</div>
        <div class="property-section">
          <h4>运行状态</h4>
          <div class="property-list">
            <div class="property"><span>连接状态</span><strong style="color:var(--green)">在线 · 28 ms</strong></div>
            <div class="property"><span>当前任务</span><strong class="link">TSK-260731-021</strong></div>
            <div class="property"><span>任务步骤</span><strong>前往 CNC-07</strong></div>
            <div class="property"><span>电量</span><span class="battery"><span style="width:62%"></span></span></div>
            <div class="property"><span>速度</span><strong>1.20 m/s</strong></div>
            <div class="property"><span>坐标</span><strong>X 4.28 / Y 12.60</strong></div>
          </div>
        </div>
        <div class="property-section">
          <h4>任务进度 · 68%</h4>
          <div class="timeline">
            <div class="timeline-item"><i class="time-dot"></i><span class="timeline-copy"><strong>任务已分配</strong><small>10:42:18 · 最近距离策略</small></span></div>
            <div class="timeline-item"><i class="time-dot"></i><span class="timeline-copy"><strong>ST-01 取料完成</strong><small>10:43:36 · 用时 00:42</small></span></div>
            <div class="timeline-item"><i class="time-dot" style="background:var(--amber);box-shadow:0 0 0 1px var(--amber)"></i><span class="timeline-copy"><strong>前往 CNC-07</strong><small>预计 10:48:20 到达</small></span></div>
          </div>
        </div>
        <div class="property-section">
          <button class="btn small" data-go="agv-detail.html">查看 AMR 详情</button>
          <button class="btn small js-sim-fault">模拟故障</button>
        </div>
      </aside>
    </div>`);
}

function renderSceneList() {
  setActions(`<button class="btn primary js-toast" data-message="已创建一个空白仿真场景">＋ 新建场景</button>`);
  const rows = [
    ["SCN-001","流水线正常补料","MAP-A","6 台","正常任务链路","就绪","研发演示","07-31 10:20"],
    ["SCN-002","AMR 中途故障","MAP-A","6 台","AMR-06 故障","就绪","研发测试","07-30 17:12"],
    ["SCN-003","CNC 等待超时","MAP-A","4 台","CNC-03 等待","草稿","调度联调","07-30 15:48"],
    ["SCN-004","充电任务插队","MAP-A","6 台","低电量触发","就绪","策略测试","07-29 11:06"]
  ].map(r=>`<tr><td class="id">${r[0]}</td><td><b>${r[1]}</b></td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${badge(r[5],statusTone(r[5]))}</td><td>${r[6]}</td><td class="mono muted">${r[7]}</td><td><button class="btn small" data-go="simulation-live.html">运行</button></td></tr>`);
  content(`${toolbar({search:"搜索场景名称",filters:["全部状态","全部地图"]})}${table(["场景编号","场景名称","地图","AMR","初始条件","状态","用途","更新时间","操作"],rows,["110px","18%","80px","70px","15%","80px","100px","110px","80px"])}`);
}

function renderMapList() {
  setActions(`<button class="btn primary js-new-map">＋ 新建地图</button>`);
  const maps = [
    ["MAP-A","装配物流区","已发布","760 × 520","32","14","6","V1.8","07-31 09:40"],
    ["MAP-B","CNC 二号线测试区","草稿","680 × 480","18","8","2","V0.4","07-30 16:12"],
    ["MAP-C","空白联调场景","草稿","800 × 600","0","0","0","V0.1","07-29 14:35"]
  ].map(r=>`<tr><td class="id">${r[0]}</td><td><b>${r[1]}</b></td><td>${badge(r[2],statusTone(r[2]))}</td><td class="mono">${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td><td>${r[6]}</td><td class="mono">${r[7]}</td><td class="mono muted">${r[8]}</td><td><button class="btn small" data-go="map-editor.html">编辑</button></td></tr>`);
  content(`${toolbar({search:"搜索地图名称",filters:["全部状态"],right:`<button class="btn small">导入地图</button>`})}${table(["编号","地图名称","状态","画布尺寸","点位","设备","AMR","版本","更新时间","操作"],maps,["90px","19%","90px","105px","65px","65px","65px","70px","110px","76px"])}`);
}

function renderMapEditor() {
  setActions(`<button class="btn js-validate">校验</button><button class="btn js-toast" data-message="地图草稿已保存">保存草稿</button><button class="btn primary js-publish">发布地图</button>`);
  content(`
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
        <div class="pane-head"><span class="pane-title">图层</span></div>
        <div class="object-list">
          ${["底图","道路与方向","点位名称","机台设备","禁行区域","坐标网格"].map((x,i)=>`<label class="object-row"><input type="checkbox" ${i<5?"checked":""}><span class="object-copy"><strong>${x}</strong><small>${i===0?"760 × 520":i===1?"12 条道路":i===2?"32 个点位":"可见"}</small></span></label>`).join("")}
        </div>
      </aside>
      <section class="map-pane" id="editorMap">
        <div class="map-toolbar"><button class="map-tool">−</button><button class="map-tool">100%</button><button class="map-tool">＋</button><button class="map-tool">适应画布</button></div>
        <div class="map-stage">${factoryMap({editor:true})}</div>
        <div class="validation-bar" id="validationBar"><b>地图就绪</b><span class="muted">选择工具后在画布中编辑；点击“校验”检查发布条件</span></div>
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
  setActions(`<button class="btn primary" data-go="task-create.html">＋ 创建任务</button>`);
  const rows = TASKS.map(t=>`<tr class="js-detail" data-kind="任务" data-id="${t[0]}"><td class="id">${t[0]}</td><td>${t[1]}</td><td>${t[2]}</td><td>${t[3]}</td><td class="table-link">${t[4]}</td><td>${badge(t[5],statusTone(t[5]))}</td><td>${badge(t[6],t[6]==="高"?"red":t[6]==="低"?"gray":"blue")}</td><td class="mono muted">${t[7]}</td><td><button class="btn ghost small">详情 →</button></td></tr>`);
  content(`
    <div class="stats-row">
      <div class="stat-card"><div class="stat-label">待调度</div><div class="stat-value">2</div></div>
      <div class="stat-card cyan"><div class="stat-label">执行中</div><div class="stat-value">3</div></div>
      <div class="stat-card amber"><div class="stat-label">等待</div><div class="stat-value">1</div></div>
      <div class="stat-card red"><div class="stat-label">异常</div><div class="stat-value">1</div></div>
    </div>
    ${toolbar({search:"搜索任务编号",filters:["全部状态","全部任务类型","全部 AMR"],right:`<button class="btn small">导出</button>`})}
    ${table(["任务编号","类型","起点","终点","AMR","状态","优先级","创建时间",""],rows,["145px","100px","85px","85px","85px","90px","75px","100px","70px"])}
  `);
}

function renderTaskCreate() {
  setActions(`<button class="btn" data-go="task-list.html">返回列表</button>`);
  content(`
    <div class="stepper">
      <div class="step active"><span>1</span>任务信息</div>
      <div class="step active"><span>2</span>选择路线</div>
      <div class="step"><span>3</span>分配车辆</div>
      <div class="step"><span>4</span>确认创建</div>
    </div>
    <div class="split-main">
      <section class="panel">
        <div class="panel-head"><span class="panel-title">任务配置</span>${badge("仿真任务","blue")}</div>
        <div class="panel-body">
          <div class="form-grid">
            <div class="form-row"><label>任务名称 *</label><input value="CNC-07 线边补料"></div>
            <div class="form-row"><label>任务类型 *</label><select><option>线边补料</option><option>成品转运</option><option>空箱回收</option></select></div>
            <div class="form-row"><label>起点 *</label><select><option>ST-01 · 一号上料站</option><option>ST-02 · 二号上料站</option></select></div>
            <div class="form-row"><label>终点 *</label><select><option>CNC-07 · 上料点</option><option>CNC-06 · 上料点</option></select></div>
            <div class="form-row"><label>调度方式</label><select><option>自动分配</option><option>指定 AMR</option></select></div>
            <div class="form-row"><label>调度策略</label><select><option>最近距离优先（默认）</option><option>电量均衡</option></select></div>
            <div class="form-row"><label>任务优先级</label><select><option>高</option><option>普通</option><option>低</option></select></div>
            <div class="form-row"><label>执行动作</label><select><option>取料 → 运输 → 放料</option></select></div>
            <div class="form-row full"><label>备注</label><textarea placeholder="填写本次任务说明">一号上料站向 CNC-07 配送周转箱。</textarea></div>
          </div>
          <div class="form-footer"><button class="btn" data-go="task-list.html">取消</button><button class="btn primary js-create-task">创建任务</button></div>
        </div>
      </section>
      <aside class="panel">
        <div class="panel-head"><span class="panel-title">路线与候选车辆</span></div>
        <div class="panel-body">
          <div class="device-map-mini">${factoryMap()}</div>
          <div class="mini-list mt-14">
            <div class="mini-row"><span><strong>AMR-01</strong><small>空闲 · 距离起点 4.2 m</small></span>${badge("推荐","green")}</div>
            <div class="mini-row"><span><strong>AMR-04</strong><small>充电中 · 电量 41%</small></span>${badge("可用","cyan")}</div>
            <div class="mini-row"><span><strong>AMR-05</strong><small>等待任务 · 距离 12.8 m</small></span>${badge("备选","gray")}</div>
          </div>
        </div>
      </aside>
    </div>`);
}

function renderStrategies() {
  setActions(`<button class="btn js-toast" data-message="策略副本已创建">另存为</button><button class="btn primary js-toast" data-message="调度策略已保存">保存策略</button>`);
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
          <div class="code-block mt-14" id="strategyResult">等待运行模拟测试…</div>
        </div>
      </aside>
    </div>`);
}

function renderDispatchRecords() {
  const records = TASKS.map((t,i)=>`<tr><td class="mono muted">10:${42-i*3}:${18+i}</td><td class="id">${t[0]}</td><td>${i%2?"电量均衡":"最近距离优先"}</td><td>3 台</td><td class="table-link">${t[4]}</td><td>${badge(i===1?"分配后异常":"已分配",i===1?"red":"green")}</td><td>${18+i*4} ms</td><td><button class="btn ghost small js-detail" data-kind="调度记录" data-id="${t[0]}">详情 →</button></td></tr>`);
  setActions(`<button class="btn">导出记录</button>`);
  content(`${toolbar({search:"搜索任务或 AMR",filters:["全部策略","全部结果"]})}${table(["时间","任务编号","调度策略","候选车辆","分配车辆","结果","耗时",""],records,["90px","145px","125px","80px","90px","100px","75px","70px"])}`);
}

function renderAgvList() {
  setActions(`<button class="btn primary js-toast" data-message="已打开新增 AMR 表单">＋ 新增 AMR</button>`);
  const rows = AMRS.map(a=>`<tr class="js-detail" data-kind="AMR" data-id="${a[0]}"><td class="id">${a[0]}</td><td>LP-200</td><td>${badge("在线",a[5]==="red"?"amber":"green")}</td><td>${badge(a[1],a[5])}</td><td class="mono">${a[2]}</td><td>${a[3]}</td><td class="table-link">${a[4]}</td><td class="mono muted">刚刚</td><td><button class="btn ghost small">详情 →</button></td></tr>`);
  content(`${toolbar({search:"搜索 AMR 名称或编号",filters:["全部运行状态","全部型号","全部电量"]})}${table(["AMR","型号","连接","运行状态","电量","当前位置","当前任务","更新时间",""],rows,["95px","90px","80px","90px","70px","130px","145px","80px","70px"])}`);
}

function renderAgvDetail() {
  setActions(`<button class="btn" data-go="simulation-live.html">地图定位</button><button class="btn primary" data-go="task-create.html">创建指定任务</button>`);
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
      <section class="panel"><div class="panel-head"><span class="panel-title">实时位置</span><button class="btn ghost small" data-go="simulation-live.html">打开地图 →</button></div><div class="device-map-mini">${factoryMap()}</div></section>
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
  const rows = DEVICES.map(d=>`<tr class="js-detail" data-kind="设备" data-id="${d[0]}"><td class="id">${d[0]}</td><td>${d[1]}</td><td>${d[2]}</td><td>${badge(d[3],d[7])}</td><td>${badge(d[4],"green")}</td><td>${d[5]}</td><td class="table-link">${d[6]}</td><td class="mono muted">刚刚</td><td><button class="btn ghost small">详情 →</button></td></tr>`);
  content(`${toolbar({search:"搜索设备名称或编号",filters:["全部设备状态","全部流水线","全部地图"]})}${table(["设备","类型","所属区域","运行状态","连接","地图","绑定点位","更新时间",""],rows,["90px","80px","100px","105px","75px","80px","100px","80px","70px"])}`);
}

function renderDeviceDetail() {
  setActions(`<button class="btn" data-go="simulation-live.html">地图定位</button><button class="btn primary js-toast" data-message="设备映射已保存">编辑映射</button>`);
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
        ${[["管理员","4 名用户","全部模块和高风险操作","blue"],["研发人员","12 名用户","研发功能与实时控制","cyan"],["只读用户","3 名用户","查看状态和列表","gray"]].map(r=>`<section class="panel"><div class="panel-head"><span class="panel-title">${r[0]}</span>${badge("启用",r[3])}</div><div class="panel-body"><div class="stat-value" style="font-size:20px">${r[1]}</div><p class="muted" style="font-size:11px;line-height:1.7">${r[2]}</p><button class="btn small js-detail" data-kind="角色" data-id="${r[0]}">配置权限</button></div></section>`).join("")}
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
  el.innerHTML = `<span class="toast-icon">✓</span><span><strong>${message}</strong><br><small class="muted">操作已记录到当前仿真环境</small></span>`;
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

    if (event.target.closest(".js-modal-confirm")) {
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

  let simSpeed = 1;
  document.addEventListener("click", event => {
    if (event.target.closest(".js-sim-toggle")) {
      const btn = event.target.closest(".js-sim-toggle");
      const shell = document.getElementById("simShell");
      shell.classList.toggle("sim-paused");
      btn.textContent = shell.classList.contains("sim-paused") ? "▶ 继续" : "Ⅱ 暂停";
    }
    if (event.target.closest(".js-speed")) {
      simSpeed = simSpeed === 1 ? 2 : simSpeed === 2 ? 4 : 1;
      document.documentElement.style.setProperty("--sim-duration", `${15/simSpeed}s`);
      const agv = document.querySelector(".agv-moving");
      if (agv) agv.style.animationDuration = `${15/simSpeed}s`;
      event.target.closest(".js-speed").textContent = `${simSpeed}×`;
    }
    if (event.target.closest(".js-sim-reset")) {
      openModal("重置仿真场景", `<p>场景将恢复为初始状态，当前模拟任务和故障状态会被清除。</p><div class="detail-item"><label>当前场景</label><strong>流水线正常补料</strong></div>`, "重置仿真");
    }
    if (event.target.closest(".js-sim-fault")) {
      openModal("模拟 AMR 故障", `<p>AMR-03 将停止移动并生成一条模拟故障事件，仅影响当前仿真场景。</p>`, "模拟故障");
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
      openModal("发布地图 MAP-A V1.9", `<p>地图校验已通过。发布后，实时仿真将使用这个版本。</p><div class="detail-grid" style="grid-template-columns:repeat(2,1fr)"><div class="detail-item"><label>变更</label><strong>道路 1 · 点位 2</strong></div><div class="detail-item"><label>目标环境</label><strong>仿真环境</strong></div></div>`, "发布地图");
    }
    if (event.target.closest(".js-new-map")) {
      openModal("新建地图", `<div class="form-grid"><div class="form-row full"><label>地图名称</label><input value="新建物流地图"></div><div class="form-row"><label>画布宽度</label><input value="800"></div><div class="form-row"><label>画布高度</label><input value="600"></div></div>`, "创建地图");
    }
    if (event.target.closest(".js-create-task")) {
      openModal("确认创建任务", `<p>任务将使用“最近距离优先”策略，由平台自动选择 AMR。</p><div class="detail-grid" style="grid-template-columns:repeat(2,1fr)"><div class="detail-item"><label>路线</label><strong>ST-01 → CNC-07</strong></div><div class="detail-item"><label>推荐车辆</label><strong>AMR-01</strong></div></div>`, "创建任务");
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
  if (PAGE_ID.startsWith("simulation")) return renderSimulation();
  if (PAGE_ID === "map-list") return renderMapList();
  if (PAGE_ID === "map-editor") return renderMapEditor();
  if (PAGE_ID === "task-list") return renderTaskList();
  if (PAGE_ID === "task-create") return renderTaskCreate();
  if (PAGE_ID === "dispatch-strategies") return renderStrategies();
  if (PAGE_ID === "dispatch-records") return renderDispatchRecords();
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

