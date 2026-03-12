const zhTW = {
  appName: 'InspectAI',
  appTagline: 'AI 智慧巡檢系統',

  nav: {
    dashboard: '儀表板',
    inspectionTasks: '巡檢任務',
    assets: '設備資產',
    findings: '異常項目',
    reports: '報告',
    aiInsights: 'AI 洞察',
    settings: '設定',
    mobileInspection: '行動巡檢',
  },

  language: '語言',
  languages: { en: 'EN', zhTW: '繁中', ja: '日本語' },

  search: '搜尋', filter: '篩選', export: '匯出', save: '儲存',
  submit: '提交', cancel: '取消', edit: '編輯', delete: '刪除',
  view: '檢視', add: '新增', close: '關閉', back: '返回',
  next: '下一步', previous: '上一步', confirm: '確認', reset: '重置',
  apply: '套用', clear: '清除', download: '下載', print: '列印',
  share: '分享', refresh: '重新整理', loading: '載入中...',
  noData: '無可用資料', viewAll: '查看全部', viewDetails: '查看詳情',
  saveDraft: '儲存草稿', exportPDF: '匯出 PDF', exportExcel: '匯出 Excel',
  newTask: '新增任務',

  status: {
    scheduled: '已排程', inProgress: '進行中', submitted: '已提交',
    overdue: '已逾期', closed: '已關閉', open: '待處理',
    resolved: '已解決', pending: '擱置中', operating: '運行中',
    maintenance: '維修中', offline: '離線', all: '全部狀態',
    final: '最終版', draft: '草稿', approved: '已核准',
  },

  severity: {
    low: '低', medium: '中', high: '高', critical: '嚴重', all: '全部等級',
  },

  plant: '廠區', plants: '廠區', zone: '區域', zones: '區域',
  asset: '設備', assets: '設備資產', component: '零件', components: '零件',
  inspection: '巡檢', inspections: '巡檢', checklist: '檢查清單',
  finding: '異常', findings: '異常項目', defect: '缺陷',
  riskLevel: '風險等級', riskScore: '風險評分',
  correctiveAction: '改善措施', correctiveActions: '改善措施',
  reInspection: '複檢', inspector: '巡檢員', inspectors: '巡檢員',
  aiSummary: 'AI 摘要', owner: '負責人', team: '團隊',
  location: '位置', type: '類型', criticality: '重要程度',
  dueDate: '截止日期', assignedTo: '指派對象',
  createdAt: '建立時間', updatedAt: '更新時間', discoveryDate: '發現日期',

  kpi: {
    totalInspectionsWeek: '本週巡檢次數', openFindings: '待處理異常',
    highRiskAssets: '高風險設備', overdueActions: '逾期改善措施',
    totalAIFlags: 'AI 標記總數', anomaliesDetected: '偵測到的異常',
    highPriorityRecs: '高優先建議', avgConfidence: '平均信心度',
  },

  dashboard: {
    title: '管理儀表板', recentInspections: '最新巡檢',
    highRiskAssets: '高風險設備', aiInsightsPanel: 'AI 洞察',
    aiInsightSubtitle: 'AI 驅動異常偵測與建議',
    inspectionTrend: '巡檢趨勢', findingsBySeverity: '異常嚴重程度分布',
    last6Months: '近 6 個月', viewAllTasks: '查看全部任務',
    viewAllAssets: '查看全部設備', thisWeek: '本週', vsLastWeek: '相較上週',
    trend: { up: '上升', down: '下降' },
  },

  tasks: {
    title: '巡檢任務', taskId: '任務編號', inspectionType: '巡檢類型',
    scheduledDate: '排程日期', completedDate: '完成日期', progress: '進度',
    allPlants: '全部廠區', allZones: '全部區域', allInspectors: '全部巡檢員',
    allRiskLevels: '全部風險等級', searchPlaceholder: '搜尋任務...',
    resultCount: '筆任務', startInspection: '開始巡檢', editTask: '編輯任務',
    statusHeader: '狀態', actionsHeader: '操作', showingOf: '顯示', of: '共',
    types: {
      routine: '例行巡檢', safety: '安全巡檢', preventive: '預防性維護',
      followUp: '追蹤複查', emergency: '緊急巡檢', annual: '年度巡檢',
    },
  },

  assetDetail: {
    title: '設備詳情', assetInfo: '設備資訊', lastInspection: '最後巡檢',
    nextInspection: '下次巡檢', installDate: '安裝日期', manufacturer: '製造商',
    model: '型號', serialNumber: '序號',
    idLabel: 'ID', trendUp30: '+30（30天）',
    tabs: {
      overview: '總覽', components: '零件', inspectionHistory: '巡檢歷史',
      findings: '異常項目', documents: '文件',
    },
    aiHealthSummary: 'AI 健康摘要', riskTrend: '風險評分趨勢',
    componentStatus: '零件狀態', componentName: '零件名稱',
    componentType: '零件類型', condition: '狀況', lastChecked: '最後檢查',
    latestInspectionSummary: '最新巡檢摘要', outOf100: '滿分 100',
    date: '日期', findingsTally: '異常數量',
    uploadDocument: '上傳文件', noDocuments: '此設備尚無附件文件。',
    dateHeader: '日期', typeHeader: '類型', statusHeader: '狀態',
    idHeader: 'ID', titleHeader: '標題', severityHeader: '嚴重程度', categoryHeader: '類別',
  },

  execution: {
    title: '執行巡檢', generalInfo: '基本資訊', checklistSection: '檢查清單',
    componentInspection: '零件巡檢', findingsSection: '異常項目',
    addFinding: '新增異常', checklistItem: '檢查項目', result: '結果',
    notes: '備註', hideNotes: '收起備註', photoEvidence: '照片證據',
    uploadPhoto: '上傳照片', tapToUpload: '點擊上傳或拖放檔案',
    photoHint: 'PNG、JPG，最大 10MB',
    pass: '通過', fail: '未通過', attention: '需注意', notInspected: '未檢查',
    completedOf: '已完成，共', items: '項',
    findingTitle: '異常標題', findingCategory: '異常類別',
    findingDescription: '描述', probableCause: '可能原因',
    recommendedAction: '建議措施', inspectionSummary: '巡檢摘要',
    findingsSummary: '異常摘要', quickActions: '快速操作',
    passCount: '通過', failCount: '未通過', taskIdLabel: '任務編號',
    assetCriticality: '設備重要程度', scheduledLabel: '排程日期',
    inspectorLabel: '巡檢員', breadcrumbTasks: '任務列表',
    findingTitlePlaceholder: '例：機封洩漏', causePlaceholder: '例：機封老化及冷卻水含磨粒',
    actionPlaceholder: '例：立即更換機封組件', notesPlaceholder: '新增巡檢備註...',
    severityLabel: '嚴重程度',
  },

  findingCategory: {
    leakage: '洩漏', corrosion: '腐蝕', overheating: '過熱',
    vibration: '振動異常', surfaceCrack: '表面裂紋', misalignment: '對齊偏差',
    looseConnection: '連接鬆動', abnormalNoise: '異常噪音',
    contamination: '污染', wear: '磨損', other: '其他',
  },

  findingDetail: {
    title: '異常詳情', findingId: '異常編號', findingCategory: '異常類別',
    impact: '影響', riskDescription: '風險描述', description: '描述',
    photoEvidence: '照片證據', activityTimeline: '活動紀錄',
    addComment: '新增評論', relatedAsset: '相關設備', relatedFindings: '相關異常',
    statusUpdate: '更新狀態', changeStatus: '變更狀態', aiAnalysis: 'AI 分析',
    confidence: '信心度', recommendedSteps: '建議後續步驟',
    noPhotos: '無附加照片', photoCaption: '照片', riskScoreLabel: '風險評分',
  },

  reportDetail: {
    title: '巡檢報告', reportId: '報告編號', generatedDate: '生成日期',
    period: '巡檢期間', executiveSummary: '執行摘要', scope: '巡檢範圍',
    findingsSummary: '異常摘要', severityBreakdown: '嚴重程度分布',
    correctiveActions: '改善措施表', aiConclusion: 'AI 生成結論',
    nextInspection: '建議下次巡檢', totalAssetsInspected: '已巡檢設備數',
    totalFindings: '異常總數', reportStatus: '報告狀態',
    preparedBy: '編製人', approvedBy: '核准人', action: '措施內容',
    priority: '優先級', deadline: '截止日期', responsible: '負責單位',
    actionStatus: '狀態', reportInfo: '報告資訊',
    assetsInspected: '已巡檢設備數', inspectionTypes: '巡檢類型',
    findingsCount: '異常數量', idHeader: 'ID', titleHeader: '標題',
    severityHeader: '嚴重程度', categoryHeader: '類別', statusHeader: '狀態',
    recommendedDate: '建議日期', typeHeader: '類型', priorityHeader: '優先級',
    generatedByLabel: '生成於', confidentialNotice: '機密文件 — 內部使用',
    generatedBy: '由 InspectAI 平台生成', aiPlatformTagline: 'AI 智慧巡檢系統',
  },

  mobile: {
    title: '行動巡檢', mobileView: '行動裝置視圖', syncStatus: '已同步',
    syncing: '同步中...', offline: '離線', taskSummary: '任務摘要',
    addPhoto: '拍照上傳', addFinding: '新增異常', submitInspection: '提交巡檢',
    expandNotes: '點擊新增備註', hideNotes: '收起備註',
    offlineNotice: '目前處於離線狀態，連線後將自動同步資料。',
    progressLabel: '進度', moreItems: '個項目',
    tapToAddPhoto: '點擊以新增照片', findingTitlePlaceholder: '輸入異常標題...',
    notesPlaceholder: '備註...', attention: '注意', due: '截止：', inspectorShort: '巡檢員：',
  },

  aiInsights: {
    title: 'AI 洞察', description: 'AI 驅動的異常偵測、模式識別與改善建議',
    anomalyDetection: '異常偵測', recurringIssues: '反覆問題',
    recommendations: '建議措施', explainability: 'AI 說明面板',
    anomalyType: '異常類型', detectionDate: '偵測日期', confidence: '信心度',
    affectedAssets: '受影響設備', occurrences: '次',
    firstDetected: '首次偵測', lastDetected: '最近偵測', trend: '趨勢',
    increasing: '上升', decreasing: '下降', stable: '穩定',
    whyFlagged: '標記原因', confidenceBreakdown: '信心度分析',
    relatedHistoricalFindings: '相關歷史異常', supportingDataPoints: '支持數據',
    recommendedReInspectionDate: '建議複檢日期', suggestedAction: '建議行動',
    patternTitle: '模式', viewAsset: '查看設備', viewFinding: '查看異常',
    explainFlagLabel: 'AI 標記說明：',
  },

  timeline: {
    commented: '留言', statusChanged: '變更狀態為', assigned: '指派給',
    photoAdded: '新增照片證據', findingCreated: '建立此異常', actionTaken: '記錄改善措施',
    activityComment1: '確認為嚴重異常，正在上報維修主管。幫浦應立即停機。',
    activityStatus1: '已指派給機械維修組，截止日期設定為 2024-03-15。',
  },

  empty: {
    noTasks: '找不到巡檢任務', noFindings: '尚未記錄任何異常',
    noAssets: '找不到設備', noReports: '無可用報告',
    noInsights: '無可用 AI 洞察', tryAdjusting: '請嘗試調整篩選條件或搜尋關鍵字',
  },

  notifications: '通知', noNotifications: '無新通知', profile: '個人資料', logout: '登出',

  charts: {
    count: '數量', month: '月份', score: '分數', date: '日期',
    riskScoreTrend: '風險評分趨勢', inspectionsByMonth: '每月巡檢次數',
    findingsDistribution: '異常分布',
  },

  condition: { poor: '差', fair: '普通', good: '良好' },
  user: { role: '廠長' },

  assetTypes: {
    pump: '幫浦', compressor: '壓縮機', conveyor: '輸送機',
    electrical: '電氣設備', tank: '儲槽', boiler: '鍋爐', coolingTower: '冷卻塔',
  },

  teams: {
    mechanical: '機械維修組', electrical: '電氣維修組', engineering: '工程組',
    chemical: '化學組', utility: '公用設施組', production: '生產組',
  },

  notif: {
    n1: 'CP-104 發現嚴重異常，需立即處理',
    n2: '巡檢任務 IT-2024-0311 進行中（65%）',
    n3: '報告 RPT-2024-Q1-001 已審核通過',
    minAgo: '分鐘前', hrAgo: '小時前', hrsAgo: '小時前',
  },

  dashboardAI: {
    insight1: '幫浦 CP-104 在最近 4 次巡檢中反覆出現機械封洩漏問題，風險評分在 30 天內從 58 上升至 88。',
    insight2: '電氣盤 EP-011 母線排 CB-7 偵測到熱異常：溫差 61°C，需立即採取行動以防止電弧閃絡事故。',
    insight3: '鍋爐 BL-101 的燃燒異常模式與歷史故障前兆吻合，建議在 7 天內進行燃燒器檢查。',
    insight4: '冷卻塔 CT-301 水質劣化，因生物性積垢建議進行退伍軍人菌風險評估。',
  },

  assetHealthAI: {
    insight1: '此設備反覆出現機械封洩漏問題，最近 5 次巡檢中有 4 次發現封洩漏，且嚴重程度持續上升。',
    insight2: '風險評分在最近 30 天內從 58 上升至 88，增幅達 52%，建議立即進行維護。',
    insight3: '自 2023 年 12 月以來振動水平持續上升，模式與軸承磨損惡化相符。',
    insight4: '根據故障歷史，建議在 14 天內規劃完整大修，以防止非計畫停機。',
  },

  findingAI: {
    analysis: '此為 CP-104 第 4 次連續巡檢中發現的機封洩漏問題。洩漏速率進展（輕微滲漏 → 明顯滴漏）與典型機械封壽命終止的故障模式相符。封完全失效的機率（7天內）：<strong>87%</strong>。',
    step1: '48 小時內安排緊急維護。',
    step2: '預購密封套件：Grundfos CM10-4 #S-4421。',
    step3: '換封時檢查軸承狀況。',
    step4: '維修後進行振動分析。',
    relatedFinding1: '軸承組件振動異常',
    relatedFinding2: '進水口管道法蘭螺栓鬆動',
  },

  reportAI: {
    p1: '根據 AI 對 2024 年 Q1 巡檢數據的分析，<strong>桃園廠機房的風險集中度最高</strong>。兩台設備（CP-104 及 EP-011）存在嚴重異常，需在 48-72 小時內立即介入，以防止非計畫停機及安全事故。',
    p2: 'CP-104 反覆發生的封失效模式（連續 4 次巡檢）表明，該設備的機械封及軸承組件已達到使用壽命終點。建議進行全面大修，而非再次僅更換機封。',
    p3: 'Q1 期間廠區整體風險評分上升 <strong>+18%</strong>，反映出一個需要提高巡檢頻率並主動審查預防性維護計畫的趨勢。AI 模型建議針對 2024 年 Q2 的<strong>所有機房設備提高至每兩週一次的巡檢頻率</strong>。',
  },

  reportContent: {
    zoneAssemblyA: '組裝線 A', zoneUtilityRoom: '機房', zoneChemicalStorage: '化學品倉庫',
    typesAssemblyA: '例行, 緊急', typesUtilityRoom: '例行, 追蹤複查, 安全', typesChemical: '例行',
    photo1Caption: 'CP-104 機封洩漏', photo2Caption: 'EP-011 熱點異常',
    photo3Caption: 'CP-104 振動測試', photo4Caption: 'AC-201 過濾器狀況',
    nextType1: '維修後複查', nextType2: '追蹤複查', nextType3: '例行巡檢', nextType4: '例行巡檢',
    resolvedLabel: '已解決', openLabel: '待處理',
    taoyuanPlant: '桃園廠',
    reportTitle: '2024年 Q1 桃園廠巡檢報告',
    summary1: '桃園廠 3 個區域共完成 12 台設備巡檢。',
    summary2: '2 項嚴重異常需立即處理：CP-104 機封洩漏及 EP-011 熱點。',
    summary3: '風險評分趨勢顯示本季廠區整體風險上升 18%。',
    summary4: 'AI 分析標記冷卻幫浦 CP-104，建議規劃預防性更換。',
    ca1Action: '更換 CP-104 機械封組件',
    ca2Action: '檢查並鎖緊 EP-011 母線排 CB-7 連接',
    ca3Action: '更換 CP-104 軸承組件',
    ca4Action: '更換 AC-201 空氣過濾器',
    ca5Action: '對 AC-201 進行精密雷射對心',
    ca6Action: '對 MT-220 進行防腐蝕處理',
  },

  explainData: {
    flagTitle: '軸承內圈缺陷（BPFI）',
    reason1: '振動特徵在 4.7 倍軸轉速處與軸承內圈缺陷頻率（BPFI）吻合。',
    reason2: '振幅趨勢在過去 6 週監測中上升了 340%。',
    reason3: '波形分析顯示衝擊模式與內圈表面剝落一致。',
    reason4: '當前讀值 12.4 mm/s RMS 超出警報水平（7.1 mm/s）74%。',
    factor1: '振動特徵吻合度', factor2: '趨勢分析',
    factor3: '歷史模式吻合度', factor4: '運行環境因素',
    histDesc1: '軸承組件振動異常', histDesc2: '振動水平異常升高', histDesc3: '輕微振動升高',
    dp1: '振動：12.4 mm/s RMS（警報：7.1，跳機：11.2）',
    dp2: '軸承溫度（驅動端）：68°C（最大：70°C）',
    dp3: '油液污染度：NAS 4 級（正常）',
    dp4: '最後一次更換密封：2018-06-22（距今約 5.8 年）',
    dp5: '此型密封平均無故障時間（MTBF）：4-6 年',
  },
} as const

export default zhTW
