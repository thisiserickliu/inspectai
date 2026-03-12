const ja = {
  appName: 'InspectAI',
  appTagline: 'AI点検システム',

  nav: {
    dashboard: 'ダッシュボード',
    inspectionTasks: '点検タスク',
    assets: '設備資産',
    findings: '指摘事項',
    reports: 'レポート',
    aiInsights: 'AIインサイト',
    settings: '設定',
    mobileInspection: 'モバイル点検',
  },

  language: '言語',
  languages: { en: 'EN', zhTW: '繁中', ja: '日本語' },

  search: '検索', filter: '絞り込み', export: 'エクスポート', save: '保存',
  submit: '提出', cancel: 'キャンセル', edit: '編集', delete: '削除',
  view: '表示', add: '追加', close: '閉じる', back: '戻る',
  next: '次へ', previous: '前へ', confirm: '確認', reset: 'リセット',
  apply: '適用', clear: 'クリア', download: 'ダウンロード', print: '印刷',
  share: '共有', refresh: '更新', loading: '読み込み中...',
  noData: 'データがありません', viewAll: 'すべて表示', viewDetails: '詳細を見る',
  saveDraft: '下書き保存', exportPDF: 'PDF出力', exportExcel: 'Excel出力',
  newTask: '新規タスク',

  status: {
    scheduled: '予定', inProgress: '進行中', submitted: '提出済み',
    overdue: '期限超過', closed: '完了', open: '未対応',
    resolved: '解決済み', pending: '保留中', operating: '稼働中',
    maintenance: 'メンテナンス中', offline: 'オフライン', all: 'すべての状態',
    final: '最終版', draft: '下書き', approved: '承認済み',
  },

  severity: {
    low: '低', medium: '中', high: '高', critical: '重大', all: 'すべての深刻度',
  },

  plant: '工場', plants: '工場', zone: 'ゾーン', zones: 'ゾーン',
  asset: '設備', assets: '設備資産', component: '構成部品', components: '構成部品',
  inspection: '点検', inspections: '点検', checklist: 'チェックリスト',
  finding: '指摘', findings: '指摘事項', defect: '不具合',
  riskLevel: 'リスクレベル', riskScore: 'リスクスコア',
  correctiveAction: '是正対応', correctiveActions: '是正対応',
  reInspection: '再点検', inspector: '点検担当者', inspectors: '点検担当者',
  aiSummary: 'AI要約', owner: '担当者', team: 'チーム',
  location: '場所', type: '種別', criticality: '重要度',
  dueDate: '期限日', assignedTo: '担当者',
  createdAt: '作成日時', updatedAt: '更新日時', discoveryDate: '発見日',

  kpi: {
    totalInspectionsWeek: '今週の点検件数', openFindings: '未対応指摘',
    highRiskAssets: '高リスク設備', overdueActions: '期限超過対応',
    totalAIFlags: 'AIフラグ総数', anomaliesDetected: '検出された異常',
    highPriorityRecs: '高優先推奨事項', avgConfidence: '平均信頼度',
  },

  dashboard: {
    title: '経営ダッシュボード', recentInspections: '最近の点検',
    highRiskAssets: '高リスク設備', aiInsightsPanel: 'AIインサイト',
    aiInsightSubtitle: 'AIによる異常検知と推奨事項',
    inspectionTrend: '点検トレンド', findingsBySeverity: '深刻度別指摘',
    last6Months: '過去6ヶ月', viewAllTasks: 'すべてのタスクを見る',
    viewAllAssets: 'すべての設備を見る', thisWeek: '今週', vsLastWeek: '先週比',
    trend: { up: '増加', down: '減少' },
  },

  tasks: {
    title: '点検タスク', taskId: 'タスクID', inspectionType: '点検種別',
    scheduledDate: '予定日', completedDate: '完了日', progress: '進捗',
    allPlants: 'すべての工場', allZones: 'すべてのゾーン',
    allInspectors: 'すべての担当者', allRiskLevels: 'すべてのリスクレベル',
    searchPlaceholder: 'タスクを検索...', resultCount: '件のタスク',
    startInspection: '点検開始', editTask: 'タスク編集',
    statusHeader: '状態', actionsHeader: '操作', showingOf: '表示中', of: '件中',
    types: {
      routine: '定期点検', safety: '安全点検', preventive: '予防保全',
      followUp: 'フォローアップ', emergency: '緊急点検', annual: '年次点検',
    },
  },

  assetDetail: {
    title: '設備詳細', assetInfo: '設備情報', lastInspection: '最終点検',
    nextInspection: '次回点検', installDate: '設置日', manufacturer: 'メーカー',
    model: '型番', serialNumber: 'シリアル番号',
    idLabel: 'ID', trendUp30: '+30（30日間）',
    tabs: {
      overview: '概要', components: '構成部品', inspectionHistory: '点検履歴',
      findings: '指摘事項', documents: '文書',
    },
    aiHealthSummary: 'AI健全性サマリー', riskTrend: 'リスクスコア推移',
    componentStatus: '部品状態', componentName: '部品名',
    componentType: '部品種別', condition: '状態', lastChecked: '最終確認',
    latestInspectionSummary: '最新点検サマリー', outOf100: '100点満点',
    date: '日付', findingsTally: '指摘件数',
    uploadDocument: '文書をアップロード', noDocuments: 'この設備には添付文書がありません。',
    dateHeader: '日付', typeHeader: '種別', statusHeader: '状態',
    idHeader: 'ID', titleHeader: 'タイトル', severityHeader: '深刻度', categoryHeader: 'カテゴリ',
  },

  execution: {
    title: '点検実施', generalInfo: '基本情報', checklistSection: 'チェックリスト',
    componentInspection: '部品点検', findingsSection: '指摘事項',
    addFinding: '指摘を追加', checklistItem: 'チェック項目', result: '結果',
    notes: 'メモ', hideNotes: 'メモを閉じる', photoEvidence: '写真証拠',
    uploadPhoto: '写真をアップロード', tapToUpload: 'タップしてアップロードまたはドラッグ＆ドロップ',
    photoHint: 'PNG、JPG、最大10MB',
    pass: '合格', fail: '不合格', attention: '要注意', notInspected: '未点検',
    completedOf: '完了 /', items: '項目',
    findingTitle: '指摘タイトル', findingCategory: 'カテゴリ',
    findingDescription: '説明', probableCause: '推定原因',
    recommendedAction: '推奨対応', inspectionSummary: '点検サマリー',
    findingsSummary: '指摘サマリー', quickActions: 'クイック操作',
    passCount: '合格', failCount: '不合格', taskIdLabel: 'タスクID',
    assetCriticality: '設備重要度', scheduledLabel: '予定日',
    inspectorLabel: '点検担当者', breadcrumbTasks: 'タスク一覧',
    findingTitlePlaceholder: '例：シール漏れを確認',
    causePlaceholder: '例：経年劣化および冷却水の異物混入',
    actionPlaceholder: '例：メカニカルシール組立品を即時交換する。',
    notesPlaceholder: '点検メモを追加...',
    severityLabel: '深刻度',
  },

  findingCategory: {
    leakage: '漏れ', corrosion: '腐食', overheating: '過熱',
    vibration: '振動異常', surfaceCrack: '表面亀裂', misalignment: 'ミスアライメント',
    looseConnection: '緩み', abnormalNoise: '異常音',
    contamination: '汚染', wear: '摩耗', other: 'その他',
  },

  findingDetail: {
    title: '指摘詳細', findingId: '指摘ID', findingCategory: 'カテゴリ',
    impact: '影響', riskDescription: 'リスク説明', description: '説明',
    photoEvidence: '写真証拠', activityTimeline: '活動履歴',
    addComment: 'コメントを追加', relatedAsset: '関連設備', relatedFindings: '関連指摘',
    statusUpdate: '状態を更新', changeStatus: '状態変更', aiAnalysis: 'AI分析',
    confidence: '信頼度', recommendedSteps: '推奨する次のステップ',
    noPhotos: '写真なし', photoCaption: '写真', riskScoreLabel: 'リスクスコア',
  },

  reportDetail: {
    title: '点検レポート', reportId: 'レポートID', generatedDate: '生成日',
    period: '点検期間', executiveSummary: 'エグゼクティブサマリー', scope: '点検範囲',
    findingsSummary: '指摘サマリー', severityBreakdown: '深刻度内訳',
    correctiveActions: '是正対応表', aiConclusion: 'AI生成結論',
    nextInspection: '次回推奨点検', totalAssetsInspected: '点検済み設備数',
    totalFindings: '指摘件数合計', reportStatus: 'レポート状態',
    preparedBy: '作成者', approvedBy: '承認者', action: '対応内容',
    priority: '優先度', deadline: '期限', responsible: '責任部署',
    actionStatus: '状態', reportInfo: 'レポート情報',
    assetsInspected: '点検済み設備数', inspectionTypes: '点検種別',
    findingsCount: '指摘件数', idHeader: 'ID', titleHeader: 'タイトル',
    severityHeader: '深刻度', categoryHeader: 'カテゴリ', statusHeader: '状態',
    recommendedDate: '推奨日', typeHeader: '種別', priorityHeader: '優先度',
    generatedByLabel: '生成日', confidentialNotice: '機密 — 社内使用のみ',
    generatedBy: 'InspectAI プラットフォームにて生成', aiPlatformTagline: 'AI点検システム',
  },

  mobile: {
    title: 'モバイル点検', mobileView: 'モバイルビュー', syncStatus: '同期済み',
    syncing: '同期中...', offline: 'オフライン', taskSummary: 'タスクサマリー',
    addPhoto: '写真を追加', addFinding: '指摘を追加', submitInspection: '点検を提出',
    expandNotes: 'タップしてメモを追加', hideNotes: 'メモを閉じる',
    offlineNotice: 'オフラインで作業中です。接続時に自動的に同期されます。',
    progressLabel: '進捗', moreItems: '件の項目',
    tapToAddPhoto: 'タップして写真を追加', findingTitlePlaceholder: '指摘のタイトル...',
    notesPlaceholder: 'メモ...', attention: '要注意', due: '期限：', inspectorShort: '担当者：',
  },

  aiInsights: {
    title: 'AIインサイト', description: 'AIによる異常検知、パターン認識、推奨事項',
    anomalyDetection: '異常検知', recurringIssues: '繰り返し問題',
    recommendations: '推奨事項', explainability: '説明可能性パネル',
    anomalyType: '異常タイプ', detectionDate: '検出日', confidence: '信頼度',
    affectedAssets: '影響設備', occurrences: '件',
    firstDetected: '初回検出', lastDetected: '最終検出', trend: '傾向',
    increasing: '増加', decreasing: '減少', stable: '安定',
    whyFlagged: 'フラグ理由', confidenceBreakdown: '信頼度内訳',
    relatedHistoricalFindings: '関連過去指摘', supportingDataPoints: '支持データポイント',
    recommendedReInspectionDate: '推奨再点検日', suggestedAction: '推奨アクション',
    patternTitle: 'パターン', viewAsset: '設備を見る', viewFinding: '指摘を見る',
    explainFlagLabel: 'AIフラグの説明：',
  },

  timeline: {
    commented: 'コメントしました', statusChanged: '状態を変更しました：',
    assigned: '担当を割り当てました：', photoAdded: '写真証拠を追加しました',
    findingCreated: 'この指摘を作成しました', actionTaken: '是正対応を記録しました',
    activityComment1: '重大と確認。メンテナンス管理者へエスカレーション。ポンプを即時停止すべき。',
    activityStatus1: '機械チームに割り当て済み。期限は2024-03-15に設定。',
  },

  empty: {
    noTasks: '点検タスクが見つかりません', noFindings: '指摘事項はありません',
    noAssets: '設備が見つかりません', noReports: 'レポートがありません',
    noInsights: 'AIインサイトがありません', tryAdjusting: '絞り込み条件または検索語を変更してください',
  },

  notifications: '通知', noNotifications: '新しい通知はありません',
  profile: 'プロフィール', logout: 'ログアウト',

  charts: {
    count: '件数', month: '月', score: 'スコア', date: '日付',
    riskScoreTrend: 'リスクスコア推移', inspectionsByMonth: '月別点検件数',
    findingsDistribution: '指摘分布',
  },

  condition: { poor: '不良', fair: '普通', good: '良好' },
  user: { role: '工場長' },

  assetTypes: {
    pump: 'ポンプ', compressor: 'コンプレッサー', conveyor: 'コンベア',
    electrical: '電気設備', tank: 'タンク', boiler: 'ボイラー', coolingTower: '冷却塔',
  },

  teams: {
    mechanical: '機械チーム', electrical: '電気チーム', engineering: 'エンジニアリングチーム',
    chemical: '化学チーム', utility: 'ユーティリティチーム', production: '生産チーム',
  },

  notif: {
    n1: 'CP-104 に重大な指摘事項があり、即時対応が必要です',
    n2: '点検タスク IT-2024-0311 が進行中です（65%）',
    n3: 'レポート RPT-2024-Q1-001 が承認されました',
    minAgo: '分前', hrAgo: '時間前', hrsAgo: '時間前',
  },

  dashboardAI: {
    insight1: 'ポンプ CP-104 は直近4回の点検で繰り返しメカニカルシール漏れが確認されており、リスクスコアは30日間で58から88に上昇しています。',
    insight2: '電気盤 EP-011 のバスバー CB-7 で熱異常を検出：ΔT 61°C。アーク閃絡事故防止のため即時対応が必要です。',
    insight3: 'ボイラー BL-101 の燃焼異常パターンが過去の故障前兆と一致しています。7日以内にバーナー点検を推奨します。',
    insight4: '冷却塔 CT-301 の水質悪化を検出。生物的汚染によるレジオネラリスク評価を推奨します。',
  },

  assetHealthAI: {
    insight1: 'この設備はメカニカルシール漏れが繰り返し発生しており、直近5回の点検のうち4回で漏れが確認され、深刻度は増加傾向にあります。',
    insight2: 'リスクスコアは過去30日間で58から88に上昇（52%増）。即時メンテナンスを推奨します。',
    insight3: '2023年12月以降、振動レベルが上昇傾向にあり、パターンはベアリングの進行性摩耗と一致しています。',
    insight4: '故障履歴に基づき、計画外停止を防ぐため14日以内の完全オーバーホール計画を推奨します。',
  },

  findingAI: {
    analysis: 'CP-104 で4回連続して封漏れが確認されています。漏れ速度の進行（微量滲み→活発な滴下）は、典型的なメカニカルシールの寿命末期故障パターンと一致します。7日以内の完全封破損確率：<strong>87%</strong>。',
    step1: '48時間以内に緊急メンテナンスを手配する。',
    step2: 'シールキットを事前発注：Grundfos CM10-4 #S-4421。',
    step3: 'シール交換時にベアリング状態を点検する。',
    step4: '修理後に振動分析を実施する。',
    relatedFinding1: '異常振動 - ベアリング組立品',
    relatedFinding2: '入口配管フランジボルト緩み',
  },

  reportAI: {
    p1: '2024年Q1点検データのAI分析によれば、<strong>桃園工場のユーティリティ室がリスク集中度が最も高い</strong>。2台の設備（CP-104およびEP-011）に重大な指摘があり、計画外停止と安全事故を防ぐため48〜72時間以内の即時対応が必要です。',
    p2: 'CP-104の繰り返す封故障パターン（4回連続点検）は、設備のメカニカルシールとベアリング組立品が寿命末期に達していることを示しています。封のみの交換ではなく、総合的なオーバーホールを推奨します。',
    p3: 'Q1を通じて工場全体のリスクスコアが<strong>+18%</strong>上昇しており、点検頻度の増加と予防保全プログラムの見直しが必要なトレンドを示しています。AIモデルは2024年Q2を通じてユーティリティ室の全設備に<strong>隔週点検頻度への引き上げ</strong>を推奨します。',
  },

  reportContent: {
    zoneAssemblyA: '組立ラインA', zoneUtilityRoom: 'ユーティリティ室', zoneChemicalStorage: '化学品倉庫',
    typesAssemblyA: '定期, 緊急', typesUtilityRoom: '定期, フォローアップ, 安全', typesChemical: '定期',
    photo1Caption: 'CP-104 シール漏れ', photo2Caption: 'EP-011 熱点',
    photo3Caption: 'CP-104 振動測定', photo4Caption: 'AC-201 フィルター状態',
    nextType1: '保守後点検', nextType2: 'フォローアップ', nextType3: '定期点検', nextType4: '定期点検',
    resolvedLabel: '解決済み', openLabel: '未対応',
    taoyuanPlant: '桃園工場',
    reportTitle: '2024年 Q1 桃園工場点検レポート',
    summary1: '桃園工場の3ゾーンで合計12台の設備を点検しました。',
    summary2: '即時対応が必要な重大指摘2件：CP-104のシール漏れとEP-011の熱点。',
    summary3: 'リスクスコアのトレンドは、四半期を通じた工場全体リスクの18%上昇を示しています。',
    summary4: 'AI分析により冷却ポンプCP-104の予防的交換計画を推奨としてフラグ。',
    ca1Action: 'CP-104のメカニカルシール組立品を交換する',
    ca2Action: 'EP-011のバスバーCB-7接続を点検・増締めする',
    ca3Action: 'CP-104のベアリング組立品を交換する',
    ca4Action: 'AC-201のエアフィルターを交換する',
    ca5Action: 'AC-201の精密レーザーアライメントを実施する',
    ca6Action: 'MT-220の防錆処理を施工する',
  },

  explainData: {
    flagTitle: '軸受内輪欠陥（BPFI）',
    reason1: '振動シグネチャが軸回転速度の4.7倍でBPFI周波数特性と一致する軸受内輪欠陥を示しています。',
    reason2: '振幅トレンドは過去6週間の監測で340%上昇しています。',
    reason3: '波形分析が内輪の表面剥離と一致するインパクトパターンを示しています。',
    reason4: '現在の読み値12.4 mm/s RMSは警報レベル（7.1 mm/s）を74%超過しています。',
    factor1: '振動シグネチャ一致度', factor2: 'トレンド分析',
    factor3: '過去パターン一致度', factor4: '運転コンテキスト',
    histDesc1: '異常振動 - ベアリング組立品', histDesc2: '振動レベル異常上昇', histDesc3: '軽微な振動上昇',
    dp1: '振動：12.4 mm/s RMS（警報：7.1、トリップ：11.2）',
    dp2: 'ベアリング温度（DE側）：68°C（最大：70°C）',
    dp3: '油汚染度：NASレベル4（正常）',
    dp4: '最終シール交換：2018-06-22（約5.8年前）',
    dp5: 'このシールタイプのMTBF：4〜6年',
  },
} as const

export default ja
