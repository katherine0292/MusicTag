/* The Listening Room — portfolio behaviour. Content is bilingual (zh default, EN toggle). */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const SC = 'assets/screens/';
const GH = 'https://github.com/katherine0292/the-listening-room/blob/main/docs/';
let lang = 'zh';
try { lang = localStorage.getItem('lr-lang') || 'zh'; } catch (e) {}
const i18 = () => (lang === 'zh' ? 0 : 1);
const L = (zh, en) => [zh, en];
const t = (p) => p[i18()];
const S = { ds: 0, j: 0, sim: 'listening', v: 2, flow: 0, path: 'ok', ts: 1, mo: false, tr: 0, play: true, vol: 5 };

/* ---------- static copy ---------- */
const K = {
 'ui.menu': L('菜单', 'Menu'), 'ui.close': L('关闭 ✕', 'Close ✕'), 'ui.prev': L('← 上一步', '← Back'), 'ui.next': L('下一步 →', 'Next →'),
 'ban.1': L('面向 65+ 听众', 'Adults 65+'), 'ban.2': L('iOS + 实体遥控器', 'iOS + tactile remote'), 'ban.3': L('语音搜索交互规格', 'Voice search spec'),
 'nav.overview': L('概览', 'Overview'), 'nav.brief': L('目标', 'Brief'), 'nav.research': L('研究', 'Research'), 'nav.product': L('产品决策', 'Product'),
 'nav.design': L('设计决策', 'Decisions'), 'nav.proto': L('原型', 'Prototype'), 'nav.voice': L('语音搜索', 'Voice search'), 'nav.ease': L('无障碍', 'Accessibility'),
 'nav.tag': L('MusicTag', 'MusicTag'), 'nav.eval': L('评估', 'Evaluation'), 'nav.end': L('总结', 'Wrap-up'),
 'hero.title': L('帮助 65+ 听众回到熟悉的歌', 'Helping listeners 65+ get back to a familiar song'),
 'hero.sub': L('一套音乐体验设计：稳定的导航、可恢复的语音搜索，以及承担高频操作的实体遥控器 MusicTag。', 'A music experience design: stable navigation, recoverable voice search, and MusicTag, a tactile remote for everyday playback.'),
 'cta.proto': L('打开交互原型 ↗', 'Open the prototype ↗'), 'cta.gallery': L('24 屏设计', '24-screen gallery'), 'cta.readme': L('项目文档', 'Project docs'),
 'meta.role.k': L('角色', 'Role'), 'meta.role.v': L('体验设计（独立承接）：研究、交互、原型、语音交互规格、评估方案', 'UX and interaction design (independent commission): research, interaction, prototype, voice interaction spec, evaluation plan'),
 'meta.aud.k': L('目标用户', 'Audience'), 'meta.aud.v': L('65 岁以上；数字信心、视力、灵活度和语言需求各异', 'Adults 65+ with varied digital confidence, vision, dexterity and language needs'),
 'meta.ctx.k': L('场景', 'Context'), 'meta.ctx.v': L('以 Spotify 为交互场景的概念设计（Spotify Ease + MusicTag）', 'Concept designed in the context of Spotify (Spotify Ease + MusicTag)'),
 'meta.out.k': L('交付', 'Deliverables'), 'meta.out.1': L('高保真浏览器原型', 'High-fidelity browser prototype'), 'meta.out.2': L('24 个 iOS 设计状态', '24 iOS design states'), 'meta.out.3': L('研究、设计依据、语音规格、评估方案', 'Research, rationale, voice spec, evaluation plan'),
 'scope.in.h': L('我负责', 'My scope'), 'scope.out.h': L('不在范围内', 'Out of scope'),
 'brief.label': L('目标与范围', 'Brief'), 'brief.title': L('让熟悉的音乐，少一点操作就能到达', 'Make familiar music reachable with less effort'),
 'brief.lede': L('目标是帮助 65+ 听众更独立地找到并播放有个人意义的音乐。概念验证聚焦三项任务，并把“出错后如何恢复”作为一等场景。', 'The goal is to help listeners 65+ find and play personally meaningful music more independently. The proof of concept focuses on three jobs and treats recovery as a first-class scenario.'),
 'rs.label': L('研究与洞察', 'Research'), 'rs.title': L('从被打断的瞬间出发，而不是功能清单', 'Start from the interrupted moment, not the feature list'),
 'rs.lede': L('文献回顾、五款音乐产品对比、两场半结构化访谈；按“日常流程、断点、变通做法、期望的控制”编码，再把每个观察对应到一个设计响应。', 'Literature review, a five-service comparison and two semi-structured interviews, coded for routine, breakdown, workaround and desired control. Each observation maps to one design response.'),
 'rs.map.title': L('观察 → 设计响应', 'Observation → design response'),
 'rs.note.k': L('证据边界', 'Evidence boundary'), 'rs.note.v': L('两场访谈只提供定性方向，不代表问题的普遍程度，也不构成对信心或孤独感影响的结论。人物为虚构合成，仅用于评估流程。', 'Two interviews give qualitative direction only. They do not establish prevalence or any effect on confidence or loneliness. Personas are fictional composites used to evaluate flows.'),
 'pd.label': L('产品决策', 'Product decision'), 'pd.title': L('放弃专用设备，改为手机 + 遥控器', 'From a dedicated device to phone + remote'),
 'pd.lede': L('最初方案是带预设键、屏幕、语音和充电底座的专用 Melody Box。它带来新设备和新的学习路径，因此改为复用听众已有的手机，只把高频播放操作交给硬件。', 'The first proposal was a dedicated Melody Box with presets, display, voice and a charging dock. It added a new device and learning path, so I reused the phone listeners already have and moved only frequent playback actions to hardware.'),
 'pd.v1': L('V1 Melody Box', 'V1 Melody Box'), 'pd.v2': L('V2 手机 + MusicTag', 'V2 Phone + MusicTag'),
 'ds.label': L('关键设计决策', 'Key design decisions'), 'ds.title': L('每个决策都带着取舍', 'Every decision carries a trade-off'),
 'pr.label': L('原型与流程', 'Prototype'), 'pr.title': L('六条旅程，24 个状态，可直接操作', 'Six journeys, 24 states, fully clickable'),
 'pr.lede': L('浏览器原型覆盖开始、歌单、搜索、播放、MusicTag 设置与恢复。曲库为小型固定集合，音频为合成；语音、配对、邀请与输出切换均为本地模拟。', 'The browser prototype covers onboarding, playlists, search, playback, MusicTag setup and recovery. It uses a small fixed catalogue and synthesised audio; voice, pairing, invitations and output switching are simulated locally.'),
 'tag.ai': L('AI 交互', 'AI interaction'),
 'vo.label': L('语音搜索 · AI 功能的体验设计', 'Voice search · experience design for an AI feature'), 'vo.title': L('系统提议，听众决定', 'The system proposes. The listener decides.'),
 'vo.lede': L('语音能降低输入成本，但识别错误的代价很高：听众只想要熟悉的那首歌。我的工作是定义这项 AI 能力的交互边界：何时开始、如何呈现不确定性、失败后怎么走。', 'Voice reduces typing effort, but a wrong match is costly when the listener wants one familiar song. My work defines the interaction boundary of this AI capability: when it starts, how uncertainty is shown, and how the listener recovers.'),
 'vo.pipe.title': L('五个步骤，各自的职责', 'Five steps and who owns each'), 'vo.legend.ai': L('AI：系统能力', 'AI: system capability'), 'vo.legend.ux': L('UX：我定义的交互', 'UX: interaction I defined'),
 'vo.rank.title': L('排序规则', 'Ranking rules'), 'vo.rank.note': L('置信度阈值需用代表性的语音与曲库查询校准；在此之前，规则只规定优先顺序。', 'Confidence thresholds require calibration with representative speech and catalogue queries. Until then the rules define priority order only.'),
 'vo.sim.title': L('状态模拟器', 'State simulator'), 'vo.sim.sub': L('选择一个情境，查看听众看到什么、能做什么，以及系统的行为。覆盖规格中的 8 个状态。', 'Pick a situation to see what the listener sees, what they can do and how the system behaves. Covers the 8 states in the spec.'),
 'vo.lang.title': L('语言与隐私', 'Language and privacy'), 'vo.lang.l1': L('计划覆盖语言', 'Planned languages'), 'vo.lang.l2': L('测试矩阵', 'Test matrix'), 'vo.lang.l3': L('数据与隐私', 'Data and privacy'),
 'vo.lang.p3': L('采用按键说话，只收集评估所需的最少遥测。默认分析只记录状态转换与耗时，不含原始音频或转写；处理位置、音频留存与删除需在发布前明确。', 'Push-to-talk and minimum telemetry. Default analytics record state transitions and elapsed time, without raw audio or transcripts. Processing location, audio retention and deletion must be specified before release.'),
 'vo.kpi.title': L('衡量方式', 'Measures'), 'vo.kpi.l1': L('主要指标', 'Primary'), 'vo.kpi.l2': L('诊断指标', 'Diagnostic'),
 'vo.kpi.p1': L('在限定时间内独立完成“已知歌曲”任务（任一输入路径）。从开始输入计时，到听众选中目标结果为止，并记录是否需要协助。', 'Independent completion of a known-song task by either input path within a set time, from input start to the listener selecting the intended result, with any help recorded.'),
 'vo.roll.title': L('推进节奏', 'Delivery sequence'),
 'vo.note.k': L('范围说明', 'Scope note'), 'vo.note.v': L('本项目定义交互与规格，原型以确定性输入模拟识别。识别服务、曲库匹配与数据管线的实现需单独集成与验证；成功标准在建立基线前均为假设。', 'This project defines the interaction and specification; the prototype simulates recognition with deterministic inputs. The recognition service, catalogue matching and data pipeline need separate integration and validation. Success criteria remain hypotheses until a baseline exists.'),
 'ea.label': L('无障碍与偏好', 'Accessibility'), 'ea.title': L('把舒适度交给听众调整', 'Let the listener tune comfort'),
 'ea.lede': L('Ease Mode 提供字号与动效偏好。默认浅色界面保证列表可读；聚焦播放页使用靛蓝底和高对比文字。右侧可直接调整。', 'Ease Mode offers text size and motion preferences. The default light interface keeps lists readable; the focused player uses an indigo ground with high-contrast text. Try the controls on the right.'),
 'ea.m.h': L('Your library', 'Your library'), 'ea.m.sb': L('Your playlists and favourite songs.', 'Your playlists and favourite songs.'),
 'ea.m.r1': L('12 songs · From Sophie', '12 songs · From Sophie'), 'ea.m.r2': L('18 songs · From Sophie', '18 songs · From Sophie'), 'ea.m.r3': L('14 songs · Made for you', '14 songs · Made for you'),
 'ea.t1': L('文字大小', 'Text size'), 'ea.t1a': L('标准', 'Standard'), 'ea.t1b': L('大', 'Large'), 'ea.t2': L('减少动效', 'Reduce motion'),
 'tg.label': L('MusicTag · 实体交互', 'MusicTag · tactile interaction'), 'tg.title': L('设置分为“找到”与“连接”，失败也有出口', 'Setup split into discovery and connection, with a way out of failure'),
 'tg.lede': L('拆分发现与连接，听众能知道设备是否足够近。成功后用按键指南练习；失败时可重试或稍后设置，并仍可在手机上继续收听。', 'Separating discovery from connection tells the listener when the device is close enough. A button guide lets them practise on success; on failure they can retry or set up later and keep listening on the phone.'),
 'tg.ok': L('连接成功', 'Connected'), 'tg.fail': L('连接失败', 'Failed'),
 'tg.rem.k': L('试用 MusicTag 的 5 个按键', "Try MusicTag's five buttons"), 'tg.rem.v': L('播放/暂停、上一首、下一首、音量 +/−。手机负责选歌与选择输出，遥控器只承担重复的播放动作。', 'Play/pause, previous, next, volume up and down. The phone chooses music and output; the remote handles only repeated playback actions.'), 'tg.vol': L('音量', 'Volume'),
 'ev.label': L('评估', 'Evaluation'), 'ev.title': L('已验证与待验证，分开陈述', 'What is verified, and what is not'),
 'ev.lede': L('原型已通过浏览器检查；对目标听众的可用性与语音识别效果尚未验证，下一轮研究围绕这些问题设计。', 'The prototype has passed browser checks. Usability with intended listeners and recognition performance are not yet validated; the next study is designed around them.'),
 'ev.pilot.k': L('下一轮：招募维度', 'Next round: recruitment dimensions'), 'ev.tasks.title': L('测试任务与衡量', 'Test tasks and measures'),
 'en.label': L('总结', 'Wrap-up'), 'en.title': L('我从这个项目带走的三点', 'Three things I am taking forward'),
 'en.foot': L('封面、唱片封套与设备渲染为生成图像；图标采用 Lucide 许可。', 'Poster, record sleeves and device renders use generated imagery. Icons: Lucide licence.')
};

const STATS = [[24, L('个 iOS 设计状态', 'iOS design states')], [5, L('款音乐产品对比', 'music services compared')], [2, L('场一手访谈', 'first-hand interviews')],
 [13, L('篇文献纳入桌面研究', 'sources in the desk review')], [8, L('个语音交互状态', 'voice interaction states')], [3, L('种计划覆盖语言', 'planned voice languages')]];
const SCOPE_IN = [L('用户研究与综合', 'Research and synthesis'), L('信息架构与 iOS 交互设计', 'Information architecture and iOS interaction design'), L('实体遥控器与手机的交互分工', 'Interaction split between phone and physical remote'), L('语音搜索的状态、排序与恢复路径', 'Voice search states, ranking and recovery paths'), L('高保真原型与评估方案', 'High-fidelity prototype and evaluation plan')];
const SCOPE_OUT = [L('识别模型的训练与调优', 'Training or tuning the recognition model'), L('正式曲库、邀请服务与蓝牙固件集成', 'Production catalogue, invitation service, Bluetooth firmware'), L('对原型效果的量化结论（待用户测试）', 'Quantified outcomes (pending user testing)')];
const LOOP = [L('回到熟悉的内容', 'Return'), L('播放', 'Play'), L('控制', 'Control'), L('↻ 出错后恢复', '↻ Recover')];
const JOBS = [
 { n: '01', t: L('回到熟悉的内容', 'Return to something familiar'), p: L('布局变化或推荐内容干扰，难以找回已知的歌。', 'Layout changes and competing recommendations make a known song hard to find.'),
   d: L('Home 展示最近播放；Library 固定收纳喜欢的歌曲与歌单；常驻迷你播放器。', 'Home shows recent listening; Library keeps liked songs and playlists in fixed places; a persistent mini-player.'), a: 'prototype/?scenario=find' },
 { n: '02', t: L('出错后恢复', 'Recover from a mistake'), p: L('口音或记不全的标题会让识别失败。', 'An accent or a half-remembered title can make recognition miss.'),
   d: L('语音可选；显示聆听状态；先确认候选再播放；可重试或改为打字。', 'Voice is optional; listening is visible; candidates are reviewed before playing; retry or type instead.'), a: 'prototype/?scenario=voice' },
 { n: '03', t: L('控制正在播放的音乐', 'Control music already playing'), p: L('小控件和不熟悉的图标让操作缺乏把握。', 'Small targets and unfamiliar icons reduce confidence.'),
   d: L('播放控件带文字标签；MusicTag 把播放、切歌、音量放在独立的物理按键上。', 'Labelled transport controls; MusicTag puts play, skip and volume on distinct physical buttons.'), a: 'prototype/?scenario=tag' }];
const OBS = [
 [L('熟悉的音乐伴随日常活动，找不到会打断流程', 'Familiar music accompanies routines; losing access interrupts them'), L('Home 与 Library 固定入口，迷你播放器保持会话', 'Fixed Home and Library entry points; mini-player preserves the session'), 'prototype/?scenario=find'],
 [L('误触和控件变化带来不确定感', 'Mis-taps and changed controls create uncertainty'), L('固定标签页，播放控件带标签，保存与移除可撤销', 'Stable tabs, labelled transport, undo after save or remove'), 'prototype/'],
 [L('口音与整句标题匹配，让语音反而成为障碍', 'Accent sensitivity and exact-title matching make voice a barrier'), L('取消、重试、候选确认、打字回退均为一等路径', 'Cancel, retry, match review and typed fallback are first-class routes'), 'prototype/?scenario=voice'],
 [L('日常控制需要稳定、标识清晰', 'Daily control needs to be stable and clearly marked'), L('MusicTag 只保留播放/暂停、上下首、音量，并在设置中说明分工', 'MusicTag keeps play/pause, skip and volume, and setup explains its role'), 'prototype/?scenario=tag'],
 [L('分享能引发交流，但链接会增加步骤', 'Sharing prompts conversation, but links add steps'), L('家庭歌单固定在 Library，并明确接收者权限', 'Family playlists live in Library with explicit recipient permissions'), 'prototype/?scenario=family']];
const PERSONA = [[L('Mary', 'Mary'), L('常规听众', 'routine listener')], [L('Bill', 'Bill'), L('触感优先', 'tactile-first')], [L('传承音乐听众', 'Heritage-music listener'), L('语音发现视角', 'voice discovery lens')]];
const V1 = [L('预设键', 'Presets'), L('设备端信息', 'On-device information'), L('语音入口', 'Voice access'), L('充电底座', 'Charging dock'), L('＋ 新设备 · 新学习路径', '+ New device, new learning path')];
const V2 = [L('手机：选歌与搜索', 'Phone: choose music, search'), L('手机：选择输出', 'Phone: audio output'), L('MusicTag：播放 / 暂停', 'MusicTag: play / pause'), L('MusicTag：上一首 / 下一首', 'MusicTag: previous / next'), L('MusicTag：音量 + / −', 'MusicTag: volume + / −')];
const VERDICT = [L('能力完整，但学习成本和设备成本都落在听众身上。', 'Capable, but the learning and device cost lands on the listener.'), L('复用已有设备；遥控器只保留 5 个物理按键。', 'Reuses a device they already own; the remote keeps five physical buttons.')];
const MATRIX_H = [L('任务', 'Task'), L('手机', 'Phone'), L('MusicTag', 'MusicTag'), L('音箱', 'Speaker')];
const MATRIX = [[L('选择歌曲与歌单', 'Choose music and playlists'), [1, 0, 0]], [L('选择输出设备', 'Choose audio output'), [1, 0, 0]], [L('播放 / 暂停 / 切歌', 'Play / pause / skip'), [2, 1, 0]], [L('调节音量', 'Adjust volume'), [0, 1, 0]], [L('发出声音', 'Produce sound'), [0, 0, 1]]];
const ARCH = [['controller-sketch', L('草图', 'Sketch'), L('钥匙环与指示灯的初始形态', 'Key ring and indicator light')], ['paper-controller', L('纸质原型', 'Paper prototype'), L('与手机并置，走查任务流程', 'Placed beside the phone for task walkthroughs')],
 ['physical-controller', L('设备渲染', 'Device render'), L('MusicTag 与手机底座', 'MusicTag with a phone dock')], ['original-interface', L('早期界面', 'Early interface'), L('最初的三屏流程', 'The original three-screen flow')]];
const DS = [
 ['02-home', L('固定入口 + 最近播放', 'Fixed entry points + last played'), L('Home 显示上次播放，Library 固定收纳；首版不放浏览式推荐。', 'Home shows last playback and Library keeps saved music; browse recommendations stay out of the first release.'), L('取舍：减少发现，换取可预测。', 'Trade-off: less discovery, more predictability.')],
 ['03-your-library', L('常驻迷你播放器', 'Persistent mini-player'), L('搜索或查看歌单时播放不中断；曲目、状态与输出保持可见。', 'Playback survives search and browsing; track, state and output stay visible.'), L('取舍：占用底部空间，换取播放连续性。', 'Trade-off: bottom space for continuity.')],
 ['13-now-playing', L('带标签的播放控件', 'Labelled transport controls'), L('Previous / Pause / Next 配文字标签；播放页用靛蓝底与高对比文字。', 'Previous, Pause and Next carry text labels; the player uses an indigo ground with high-contrast text.'), L('取舍：控件更大更多字，换取识别度。', 'Trade-off: larger, wordier controls for recognition.')],
 ['10-voice-listening', L('语音可选，打字一步可达', 'Voice is optional; typing is one step away'), L('麦克风需主动点击，显示聆听状态，随时停止或改为打字。', 'The mic starts on tap, listening is visible, and stop or type is always available.'), L('取舍：多一个入口，换取失败时的控制感。', 'Trade-off: one more entry point for control in failure.')],
 ['12-search-results', L('先确认候选，再播放', 'Review candidates, then play'), L('展示标题与艺人，选择后才开始播放，避免相近的识别错误直接播出。', 'Title and artist are shown and playback starts only on selection, so a plausible error is not played.'), L('取舍：多一次点击，换取不误播。', 'Trade-off: one extra tap to avoid wrong playback.')],
 ['08-invite-family', L('家庭歌单是固定目的地', 'Family playlist is a named destination'), L('歌单带家人留言；邀请前显示对方是“可收听”还是“可添加”。', 'The playlist carries a family note; the invitation shows whether the guest can listen or add songs.'), L('取舍：多一步权限选择，换取发送前的可见性。', 'Trade-off: a permission step for visibility before sending.')],
 ['19-musictag-connect', L('MusicTag 设置：发现与连接分步', 'MusicTag setup: discovery, then connection'), L('靠近时显示“已找到”，再连接；提供重试与按键指南。', 'A found state appears when the remote is near; then connect, with retry and a button guide.'), L('取舍：多一屏，换取进度可理解。', 'Trade-off: one more screen for legible progress.')],
 ['23-musictag-try-again', L('失败是主流程的一部分', 'Failure is part of the main flow'), L('语音未识别、离线、配对失败都有明确的恢复动作，评审者无需依赖随机事件即可体验。', 'Voice miss, offline and pairing failure each have a clear recovery action that reviewers can trigger on demand.'), L('取舍：需要为每个失败设计内容，换取可用的兜底。', 'Trade-off: designing every failure, for a usable fallback.')]];
const JOURNEYS = [
 [L('开始与资料库', 'Start and Library'), ['01-welcome', '02-home', '03-your-library', '04-liked-songs'], ['Welcome', 'Home', 'Your library', 'Liked songs'], L('在浏览器中：继续播放、切换标签页、打开收藏、保持迷你播放器状态。', 'In the browser: resume a track, switch tabs, open saved music, keep mini-player state.'), 'prototype/?scenario=find'],
 [L('歌单与邀请', 'Playlists and invites'), ['05-family-playlist', '06-cantopop-favourites', '07-morning-walk', '08-invite-family'], ['Family playlist', 'Cantopop favourites', 'Morning Walk', 'Invite family'], L('在浏览器中：顺序播放、添加示例歌曲、选择访客权限、复制示例邀请链接。', 'In the browser: play a sequence, add a demo song, choose guest permissions, copy a demo invitation link.'), 'prototype/?scenario=family'],
 [L('搜索与语音', 'Search and voice'), ['09-search', '10-voice-listening', '11-voice-try-again', '12-search-results'], ['Search', 'Listening', 'Voice retry', 'Search results'], L('在浏览器中：输入、最近搜索、筛选结果、模拟语音查询、重试或改为打字。', 'In the browser: type, recent searches, filter results, simulate a spoken query, retry or type instead.'), 'prototype/?scenario=voice'],
 [L('播放与偏好', 'Playback and preferences'), ['13-now-playing', '14-playback-paused', '15-audio-output', '16-listening-preferences'], ['Now playing', 'Paused', 'Audio output', 'Listening preferences'], L('在浏览器中：暂停、拖动、切歌、撤销保存、选择输出、调整字号 / 动效 / 语音语言。', 'In the browser: pause, seek, skip, undo save, pick an output, adjust text size, motion and speech language.'), 'prototype/'],
 [L('MusicTag 设置', 'MusicTag setup'), ['17-musictag-overview', '18-musictag-get-ready', '19-musictag-connect', '20-musictag-button-guide'], ['MusicTag overview', 'Get ready', 'Connect', 'Button guide'], L('在浏览器中：发现并配对模拟遥控器，练习播放、暂停、切歌与音量。', 'In the browser: discover and pair a simulated remote; practise play, pause, skip and volume.'), 'prototype/?scenario=tag'],
 [L('完成与恢复', 'Completion and recovery'), ['21-musictag-connected', '22-musictag-paired-overview', '23-musictag-try-again', '24-search-offline'], ['Connected', 'Paired overview', 'Pairing retry', 'Search offline'], L('在浏览器中：查看状态、断开、重试、离线时回到可用内容。', 'In the browser: review status, disconnect, retry and return to available content when offline.'), 'prototype/?scenario=tag']];
const LAYERS = [
 [L('捕获', 'Capture'), L('听众主动点击麦克风；界面显示“正在聆听”，随时可停止或改为打字。', 'The listener taps the mic; the UI shows listening, with stop and type always available.'), 'UX'],
 [L('识别', 'Recognise'), L('识别器返回转写与备选，按所选语言或支持的多语言配置运行。', 'The recogniser returns a transcript and alternatives under the selected language.'), 'AI'],
 [L('匹配', 'Match'), L('规范化空格与标点，匹配曲目、艺人、歌单与别名。', 'Normalise spacing and punctuation; match titles, artists, playlists and aliases.'), 'AI'],
 [L('排序', 'Rank'), L('精确的标题与艺人优先，明确说出的歌单名是强信号。', 'Exact title and artist first; a named playlist is a strong signal.'), 'AI'],
 [L('确认', 'Review'), L('展示标题与艺人；听众选择后才开始播放。', 'Show title and artist; playback starts only when the listener selects.'), 'UX']];
const RANK = [[L('标题与艺人精确匹配', 'Exact title and artist match'), '100%'], [L('明确说出的歌单名（强信号）', 'Explicitly named playlist (strong signal)'), '78%'], [L('用户资料库：仅在允许时用于平局裁决', 'User library: tie-breaker only where permitted'), '56%'], [L('同时显示标题与艺人，区分不同版本', 'Show title and artist to tell versions apart'), '38%']];
const STATES = [
 ['idle', L('待机', 'Idle'), '09-search', L('搜索框、麦克风与最近搜索', 'Search field, mic and recent searches'), L('输入、选择最近搜索，或开始聆听', 'Type, pick a recent query or start listening'), L('听众操作前不采集音频', 'No audio is captured until the listener acts')],
 ['listening', L('聆听中', 'Listening'), '10-voice-listening', L('麦克风状态、示例说法与停止按钮', 'Mic state, example query and stop action'), L('说话、停止，或改为打字', 'Speak, stop or switch to typing'), L('按键说话：只采集当前请求', 'Push-to-talk: captures the current request only')],
 ['match', L('可能命中', 'Likely match'), '12-search-results', L('识别文本与排序后的候选', 'Recognised text and ranked choices'), L('播放所选结果、修改查询或重试', 'Play the chosen result, edit the query or retry'), L('排序后展示；不自动播放', 'Ranks and shows candidates; does not autoplay')],
 ['multi', L('多个相近', 'Several matches'), '12-search-results', L('可区分标题与艺人的候选', 'Distinguishable title and artist choices'), L('选择结果，或细化查询', 'Choose a result or refine the query'), L('用标题 + 艺人区分，而不是替听众猜一个', 'Disambiguates by title and artist instead of guessing')],
 ['unclear', L('未识别', 'Not understood'), '11-voice-try-again', L('平实的说明：没听清', 'A plain-language explanation'), L('重试，或立即打字', 'Retry or type immediately'), L('不播放任何内容', 'Nothing plays')],
 ['perm', L('无麦克风权限', 'No mic permission'), '09-search', L('说明与搜索框', 'Clear explanation and search field'), L('打字，或按系统权限设置操作', 'Type, or follow system permission controls'), L('语音降级为打字，其余功能不受影响', 'Voice degrades to typing; everything else is unaffected')],
 ['offline', L('离线', 'Offline'), '24-search-offline', L('离线提示与资料库入口', 'Offline message and library route'), L('联网后重试，或打开资料库', 'Retry after reconnecting, or open the library'), L('资料库保持可用', 'Library stays available')],
 ['cancel', L('已取消', 'Cancelled'), '09-search', L('恢复之前的搜索与输入', 'Prior search and input restored'), L('继续输入或浏览', 'Continue typing or browse'), L('还原上一次的状态', 'Restores the previous state')]];
const STATE_ROWS = [L('状态', 'State'), L('听众看到', 'Listener sees'), L('听众可以', 'Listener can'), L('系统行为', 'System')];
const PRIN = [[L('主动触发', 'Opt-in'), L('仅在听众点击麦克风后开始，采用按键说话。', 'Starts only when the listener taps the mic; push-to-talk.')], [L('状态可见', 'Visible state'), L('聆听、关闭、离线都有明确标识。', 'Listening, off and offline are each clearly marked.')], [L('先确认，后播放', 'Confirm, then play'), L('识别结果不直接播放，由听众选择。', 'A recognised result is never played directly; the listener chooses.')], [L('每个失败都有出口', 'Every failure has an exit'), L('重试、打字，或回到资料库。', 'Retry, type, or return to the library.')]];
const LANGS = [L('澳式英语', 'Australian English'), L('粤语', 'Cantonese'), L('普通话', 'Mandarin')];
const MATRIXC = [L('中英混说', 'Code-switching'), L('异体拼写', 'Alternate spellings'), L('译名', 'Translated titles'), L('同名歌曲', 'Same-title songs')];
const KPIC = [L('前 3 个候选命中', 'Correct in top 3'), L('首个有用结果耗时', 'Time to first useful result'), L('重试次数', 'Retry count'), L('打字回退成功', 'Typed fallback success'), L('拒绝权限', 'Permission refusal'), L('放弃', 'Abandonment'), L('误播', 'Accidental playback')];
const ROLL = [['M1', L('交互验证', 'Interaction validation'), L('浏览器原型中的确定性流程。出口证据：参与者能识别麦克风状态，并在少量提示下从失败中恢复。（原型已完成，出口证据待收集）', 'Deterministic flows in the browser prototype. Exit: participants recognise mic state and recover from a miss with minimal prompting. (Prototype done; exit evidence pending.)')],
 ['M2', L('识别与曲库试点', 'Recognition and catalogue pilot'), L('有限语言的曲库匹配，需明确同意。出口证据：关键语言条件下的完成、纠正与恢复基线。', 'Limited-language catalogue matching under explicit consent. Exit: baseline completion, correction and recovery across key language conditions.')],
 ['M3', L('受控发布', 'Controlled release'), L('语音与打字双路径，带可观测性。出口证据：回退可靠、延迟可接受、不同评估人群的恢复表现可比。', 'Voice and typed pathways with observability. Exit: reliable fallback, acceptable latency, comparable recovery across evaluated groups.')]];
const EASE = [[L('自主', 'Autonomy'), L('浏览时保持播放；选择可见、可撤销。', 'Playback continues while navigating; choices are visible and reversible.')], [L('识别', 'Recognition'), L('清晰的标题、封面与带标签的控件；用大字号复测。', 'Clear titles, artwork and labelled controls; re-test at larger text sizes.')], [L('意义', 'Meaning'), L('歌单、收藏与家人留言是通向日常或记忆的线索。', 'Playlists, saved songs and family notes cue a routine or memory.')], [L('清晰', 'Clarity'), L('说明发生了什么、下一步能做什么；手机、输出设备、MusicTag 角色分明。', 'State what happened and what to do next; keep phone, output and MusicTag roles distinct.')]];
const TAGSTEPS = {
 ok: [['17-musictag-overview', L('概览', 'Overview'), L('显示“未连接”，并说明遥控器的用途。', 'Shows “Not connected” and explains what the remote is for.')], ['18-musictag-get-ready', L('准备', 'Get ready'), L('提示把遥控器靠近 iPhone，并开启蓝牙。', 'Asks the listener to keep the remote near the iPhone and turn Bluetooth on.')], ['19-musictag-connect', L('连接', 'Connect'), L('先显示“附近的 MusicTag”，再连接；取消始终可用。', 'Shows “MusicTag nearby” before connecting; cancel stays available.')], ['20-musictag-button-guide', L('按键指南', 'Button guide'), L('在示意图上标出三类主要操作：播放/暂停、切歌、音量。', 'Marks the three main actions on the device: play/pause, skip, volume.')], ['21-musictag-connected', L('已连接', 'Connected'), L('明确“已连接”，并说明歌单与输出仍在手机上选择。', 'Confirms “Connected” and states that playlists and output are still chosen on the phone.')], ['22-musictag-paired-overview', L('配对后概览', 'Paired overview'), L('显示电量与连接状态；按键指南随时可回看。', 'Shows battery and connection state; the button guide stays reachable.')]],
 fail: [['17-musictag-overview', L('概览', 'Overview'), L('显示“未连接”，并说明遥控器的用途。', 'Shows “Not connected” and explains what the remote is for.')], ['18-musictag-get-ready', L('准备', 'Get ready'), L('提示把遥控器靠近 iPhone，并开启蓝牙。', 'Asks the listener to keep the remote near the iPhone and turn Bluetooth on.')], ['19-musictag-connect', L('连接', 'Connect'), L('先显示“附近的 MusicTag”，再连接；取消始终可用。', 'Shows “MusicTag nearby” before connecting; cancel stays available.')], ['23-musictag-try-again', L('无法连接', 'Could not connect'), L('说明失败，并告知仍可在手机上收听；提供重试与稍后设置。', 'Explains the failure, confirms the phone still works, and offers retry or set up later.')]] };
const TRACKS = [['Fly Me to the Moon', 'Frank Sinatra'], ['The Moon Represents My Heart', 'Teresa Teng'], ['What a Wonderful World', 'Louis Armstrong']];
const LADDER = [['L1', L('设计依据', 'Design evidence'), L('桌面研究、2 场访谈、早期概念走查', 'Desk research, two interviews, early concept walkthrough'), 1], ['L2', L('浏览器验证', 'Browser verification'), L('主流程与恢复路径；桌面与 320 px 宽度', 'Primary flows and recovery paths; desktop and 320 px width'), 1], ['L3', L('目标用户可用性测试', 'Usability test with intended listeners'), L('65+，数字信心、语言、视力、灵活度各异', '65+, varied digital confidence, language, vision and dexterity'), 0], ['L4', L('语音识别与曲库试点', 'Recognition and catalogue pilot'), L('在同意前提下，覆盖关键语言条件', 'Under consent, across key language conditions'), 0], ['L5', L('受控发布', 'Controlled release'), L('语音与打字双路径并带可观测性', 'Voice and typed pathways with observability'), 0]];
const PILOT = [L('数字熟练度', 'Digital confidence'), L('语言与口音', 'Language and accent'), L('视力', 'Vision'), L('灵活度', 'Dexterity')];
const EVLIST = [[L('方法', 'Method'), L('自选歌曲 + 统一任务曲目', 'Self-selected music plus a consistent task title')], [L('自评', 'Self-rating'), L('每项任务前后询问独立完成的信心', 'Ask confidence before and after each task')], [L('观察', 'Observe'), L('记录“说的”与“做的”之间的差异', 'Note differences between what participants say and do')], [L('汇报', 'Reporting'), L('小样本按形成性结果汇报，注明场次与条件', 'Report small samples as formative, with sessions and conditions')]];
const TASKS_H = [L('任务', 'Task'), L('观察', 'Observe'), L('衡量', 'Measure')];
const TASKS = [[L('找到并播放已收藏的歌', 'Find and play a saved song'), L('Home 与 Library 的入口是否被识别', 'Whether Home and Library affordances are recognised'), L('独立完成、耗时、走错步数', 'Independent completion, time, wrong turns')], [L('语音说出标题并从失败中恢复', 'Speak a title and recover from a miss'), L('麦克风状态、重试与打字是否被理解', 'Whether mic state, retry and typing are understood'), L('尝试次数、路径选择、得到正确结果的耗时、所需协助', 'Attempts, path choice, time to correct result, help required')], [L('分享家庭歌单', 'Share a family playlist'), L('对邀请角色的理解', 'Understanding of invitation roles'), L('权限选择与参与者的口头解释', 'Permission choice and participant explanation')], [L('配对 MusicTag 并切歌', 'Pair MusicTag and skip a track'), L('设置步骤与按键位置是否被理解', 'Whether setup steps and button positions are understood'), L('设置成功、错误、是否不看手机完成', 'Setup success, errors, completion without looking at the phone')], [L('更换音箱并选择其他歌单', 'Change speaker and choose another playlist'), L('对手机、音箱、遥控器关系的理解', 'Understanding of the phone, speaker and remote relationship'), L('使用了正确的控件，能说明各自作用', 'Correct control used; can explain what each does')]];
const REFL = [[L('从被打断的时刻问起', 'Ask about the interrupted moment'), L('“更大的按钮有帮助吗？”容易引来附和。询问最近一次令人沮丧的收听经历，才能引出障碍、变通做法和它的重要程度。', '“Would bigger buttons help?” invites agreement. Asking about the last frustrating listening experience surfaces the obstacle, the workaround and how much it mattered.')], [L('决策要追溯到具体断点', 'Trace each decision to a breakdown'), L('撰写设计依据时，我把每个决策对回一个具体的失败场景，并写明取舍。', 'Writing the rationale, I traced each decision back to a concrete failure and stated the trade-off.')], [L('时序有情绪后果', 'Timing has emotional weight'), L('修改早期叙述时，我开始关注交互的时序，以及等待对听众造成的影响。', 'Editing the early narrative made me attend to the timing of an interaction and the emotional consequences of delay.')]];
const NEXT = [L('下一轮', 'Next round'), L('使用中性提问；尽早检查阅读与触控条件；在相同任务上对比语音恢复与打字搜索。', 'Use neutral prompts, check reading and touch conditions early, and compare voice recovery with typed search on the same tasks.')];
const LINKS = [
 [L('交互原型', 'Interactive prototype'), L('端到端：开始、资料库、搜索、播放、分享、偏好、MusicTag 设置与恢复', 'End to end: onboarding, Library, search, playback, sharing, preferences, MusicTag setup and recovery'), 'prototype/'],
 [L('屏幕库', 'Screen gallery'), L('24 个 iOS 状态，按六条旅程组织', '24 iOS states in six journeys'), 'gallery/'],
 [L('早期概念', 'Early concept'), L('最初的三屏流程与遥控器模拟', 'The original three-screen flow and a remote simulation'), 'early-concept/'],
 [L('iOS 设计板（PDF）', 'iOS design boards (PDF)'), L('演示用设计板', 'Presentation boards'), 'assets/archive/listening-room-ios-design.pdf'],
 [L('研究综合', 'Research synthesis'), L('方法、主题与人物', 'Method, themes and personas'), GH + 'research.md'],
 [L('设计依据', 'Design rationale'), L('决策、取舍与流程覆盖', 'Decisions, trade-offs and flow coverage'), GH + 'design-rationale.md'],
 [L('语音搜索规格', 'Voice search spec'), L('AI 交互范围、状态、语言、隐私与指标', 'AI interaction scope, states, language, privacy and measures'), GH + 'voice-product-spec.md'],
 [L('评估方案', 'Evaluation plan'), L('已有证据与下一轮验证', 'Evidence to date and the next round'), GH + 'evaluation.md']];

/* ---------- helpers ---------- */
function screens(el) {
  return {
    show(f) {
      let im = el.querySelector('img[data-f="' + f + '"]');
      if (!im) { im = document.createElement('img'); im.dataset.f = f; im.src = SC + f + '.webp'; im.alt = f.replace(/^\d+-/, '').replace(/-/g, ' '); im.className = 'out'; im.decoding = 'async'; el.appendChild(im); }
      $$('img', el).forEach(x => x.classList.toggle('out', x !== im));
    }
  };
}
function phoneHTML(f, alt) { return '<div class="phone"><div class="scr"><img src="' + SC + f + '.webp" alt="' + alt + '" loading="lazy" width="699" height="1520"></div></div>'; }

/* ---------- static copy + lists ---------- */
function applyCopy() {
  $$('[data-k]').forEach(el => { const v = K[el.dataset.k]; if (v) el.textContent = v[i18()]; });
  $('#l-zh').setAttribute('aria-pressed', lang === 'zh'); $('#l-en').setAttribute('aria-pressed', lang === 'en');
  document.documentElement.classList.toggle('zh', lang === 'zh'); document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}
function renderLists() {
  $('#mq').innerHTML = ['Accessible', 'Voice search', 'MusicTag', 'Recovery', '24 screens', 'Familiar music'].concat(['Accessible', 'Voice search', 'MusicTag', 'Recovery', '24 screens', 'Familiar music']).map(x => '<span>' + x + '</span>').join('');
  $('#stats').innerHTML = STATS.map(s => '<div><b class="num" data-c="' + s[0] + '">' + s[0] + '</b><p>' + t(s[1]) + '</p></div>').join('');
  $('#scope-in').innerHTML = SCOPE_IN.map(x => '<li>' + t(x) + '</li>').join('');
  $('#scope-out').innerHTML = SCOPE_OUT.map(x => '<li>' + t(x) + '</li>').join('');
  $('#loop').innerHTML = LOOP.map((x, i) => (i ? '<i></i>' : '') + '<span class="' + (i === 3 ? 'rec2' : '') + '">' + t(x) + '</span>').join('');
  $('#jobs').innerHTML = JOBS.map(j => '<div class="job"><span class="n">' + j.n + '</span><h3>' + t(j.t) + '</h3><p><b style="font-weight:500;color:var(--ink)">' + (lang === 'zh' ? '断点 ' : 'Breakdown ') + '</b>' + t(j.p) + '</p><p><b style="font-weight:500;color:var(--ink)">' + (lang === 'zh' ? '设计 ' : 'Design ') + '</b>' + t(j.d) + '</p><a class="try" href="' + j.a + '">' + (lang === 'zh' ? '试用这个流程 ↗' : 'Try this flow ↗') + '</a></div>').join('');
  const ev = [[13, L('文献', 'Sources'), 13], [5, L('产品对比', 'Services'), 13], [2, L('一手访谈', 'Interviews'), 13]];
  $('#funnel').innerHTML = ev.map(e => '<div class="fun"><span class="nm">' + t(e[1]) + '</span><div class="tk"><i style="--w:' + (e[0] / 13 * 84) + '%"></i><span class="val num" style="--w:' + (e[0] / 13 * 84) + '%">' + e[0] + '</span></div></div>').join('')
    + '<div class="fun"><span class="nm">' + (lang === 'zh' ? '→ 观察主题' : '→ Themes') + '</span><div class="tk"><i style="--w:32%"></i><span class="val num" style="--w:32%">5</span></div></div>'
    + '<div class="fun"><span class="nm">' + (lang === 'zh' ? '→ 设计响应' : '→ Design responses') + '</span><div class="tk"><i style="--w:32%"></i><span class="val num" style="--w:32%">5</span></div></div>';
  $('#chain-r').innerHTML = OBS.map(o => '<div class="cr"><div class="ob">' + t(o[0]) + '</div><div class="ar"></div><div class="rs">' + t(o[1]) + '</div><a href="' + o[2] + '">' + (lang === 'zh' ? '查看 ↗' : 'View ↗') + '</a></div>').join('');
  $('#persona').innerHTML = PERSONA.map(p => '<div><b>' + t(p[0]) + '</b>' + t(p[1]) + '</div>').join('');
  $('#matrix').innerHTML = MATRIX_H.map(h => '<div class="h' + (h === MATRIX_H[0] ? '' : ' c') + '">' + t(h) + '</div>').join('')
    + MATRIX.map(r => '<div>' + t(r[0]) + '</div>' + r[1].map(v => '<div class="c">' + (v === 1 ? '<span class="d"></span>' : v === 2 ? '<span class="d o"></span>' : '') + '</div>').join('')).join('');
  $('#arch').innerHTML = ARCH.map(a => '<figure><div class="im"><img src="assets/archive/' + a[0] + '.webp" alt="' + t(a[1]) + '" loading="lazy"></div><figcaption><b>' + t(a[1]) + '</b>' + t(a[2]) + '</figcaption></figure>').join('');
  renderIA();
  $('#prin').innerHTML = PRIN.map((p, i) => '<div><span class="n">0' + (i + 1) + '</span><h4>' + t(p[0]) + '</h4><p>' + t(p[1]) + '</p></div>').join('');
  $('#langs-c').innerHTML = LANGS.map(x => '<span class="chip">' + t(x) + '</span>').join('');
  $('#matrix-c').innerHTML = MATRIXC.map(x => '<span class="chip">' + t(x) + '</span>').join('');
  $('#kpi-c').innerHTML = KPIC.map(x => '<span class="chip">' + t(x) + '</span>').join('');
  $('#roll').innerHTML = ROLL.map(r => '<div><small>' + r[0] + '</small><b>' + t(r[1]) + '</b><p>' + t(r[2]) + '</p></div>').join('');
  $('#rank').innerHTML = RANK.map(r => '<li style="--w:' + r[1] + '">' + t(r[0]) + '</li>').join('');
  $('#ea-list').innerHTML = EASE.map(e => '<li><b>' + t(e[0]) + '</b><span>' + t(e[1]) + '</span></li>').join('');
  $('#ladder').innerHTML = LADDER.map(l => '<div class="lad ' + (l[3] ? 'ok' : '') + '"><span class="mk">' + l[0] + '</span><div><h4>' + t(l[1]) + '</h4><p>' + t(l[2]) + '</p></div><span class="res ' + (l[3] ? 'pass' : 'gap') + '">' + (l[3] ? (lang === 'zh' ? '已完成' : 'Done') : (lang === 'zh' ? '待进行' : 'Planned')) + '</span></div>').join('');
  $('#pilot').innerHTML = PILOT.map(x => '<span class="chip">' + t(x) + '</span>').join('');
  $('#ev-list').innerHTML = EVLIST.map(e => '<li><b>' + t(e[0]) + '</b><span>' + t(e[1]) + '</span></li>').join('');
  $('#ev-th').innerHTML = TASKS_H.map(h => '<th>' + t(h) + '</th>').join('');
  $('#ev-tb').innerHTML = TASKS.map(r => '<tr>' + r.map(c => '<td>' + t(c) + '</td>').join('') + '</tr>').join('');
  $('#refl').innerHTML = REFL.map((r, i) => '<div class="card"><span class="n">0' + (i + 1) + '</span><h3>' + t(r[0]) + '</h3><p>' + t(r[1]) + '</p></div>').join('')
    + '<div class="card wide"><span class="n">→ ' + t(NEXT[0]) + '</span><p style="margin-top:10px">' + t(NEXT[1]) + '</p></div>';
  $('#links').innerHTML = LINKS.map(l => '<a href="' + l[2] + '"' + (l[2].startsWith('http') ? ' target="_blank" rel="noopener"' : '') + '><strong>' + t(l[0]) + '</strong><span>' + t(l[1]) + '</span><i aria-hidden="true">↗</i></a>').join('');
}

/* ---------- product V1 / V2 ---------- */
function renderIA() {
  const ia = $('#ia'); ia.className = 'ia v' + S.v;
  const arr = S.v === 1 ? V1 : V2;
  ia.innerHTML = arr.map((x, i) => '<span class="' + (S.v === 1 && i === arr.length - 1 ? 'x' : '') + '" style="animation-delay:' + i * 70 + 'ms">' + t(x) + '</span>').join('');
  $('#verdict').textContent = t(VERDICT[S.v - 1]);
  $('#v1').setAttribute('aria-pressed', S.v === 1); $('#v2').setAttribute('aria-pressed', S.v === 2);
}

/* ---------- scene (accordion + phone) ---------- */
let sceneTimer = null, sceneView = false, sceneHold = false;
function mountScene() {
  const list = $('#ds-steps'), scr = screens($('#ds-scr')), n = DS.length;
  list.innerHTML = DS.map((d, i) => '<li data-i="' + i + '"><button aria-expanded="false"><span class="i">0' + (i + 1) + '</span><span class="t">' + t(d[1]) + '</span><span class="d">' + t(d[2]) + '</span><span class="tr">' + t(d[3]) + '</span></button><span class="bar2"></span></li>').join('');
  $('#ds-scr').innerHTML = '';
  let anim = null;
  function go(i) {
    S.ds = i;
    $$('li', list).forEach((li, k) => { li.classList.toggle('on', k === i); $('button', li).setAttribute('aria-expanded', k === i); });
    scr.show(DS[i][0]); run();
  }
  function run() {
    if (anim) anim.cancel();
    if (!sceneView || sceneHold || reduced) return;
    const bar = $('li.on .bar2', list);
    anim = bar.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 6000, easing: 'linear' });
    anim.onfinish = () => go((S.ds + 1) % n);
  }
  list.onclick = e => { const li = e.target.closest('li'); if (li) go(+li.dataset.i); };
  const box = list.closest('.scene');
  box.onmouseenter = () => { sceneHold = true; run(); }; box.onmouseleave = () => { sceneHold = false; run(); };
  new IntersectionObserver(es => { sceneView = es[0].isIntersecting; run(); }, { threshold: .35 }).observe(box);
  go(S.ds);
}

/* ---------- journeys ---------- */
function mountJourneys() {
  const tabs = $('#j-tabs');
  tabs.innerHTML = JOURNEYS.map((j, i) => '<button data-i="' + i + '" aria-pressed="' + (i === S.j) + '">' + t(j[0]) + '</button>').join('');
  tabs.onclick = e => { const b = e.target.closest('button'); if (b) { S.j = +b.dataset.i; mountJourneys(); } };
  const j = JOURNEYS[S.j];
  $('#j-shots').innerHTML = j[1].map((f, i) => '<figure>' + phoneHTML(f, j[2][i]) + '<figcaption>' + String(S.j * 4 + i + 1).padStart(2, '0') + ' · ' + j[2][i] + '</figcaption></figure>').join('');
  $('#j-desc').innerHTML = '<b>' + t(j[0]) + '</b> — ' + t(j[3]);
  $('#j-btns').innerHTML = '<a class="btn dk" href="' + j[4] + '">' + (lang === 'zh' ? '试用此流程 ↗' : 'Try this flow ↗') + '</a><a class="btn" href="gallery/">' + (lang === 'zh' ? '屏幕库' : 'Gallery') + '</a>';
}

/* ---------- voice: pipeline + simulator ---------- */
let chainTimer = null, chainView = false, chainHold = false, chainI = 0;
function mountVoice() {
  const ch = $('#chain');
  ch.innerHTML = LAYERS.map((l, i) => '<button class="layer" data-i="' + i + '"><span class="lv">0' + (i + 1) + '</span><span><h4>' + t(l[0]) + '</h4><p>' + t(l[1]) + '</p></span><span class="s ' + (l[2] === 'AI' ? 'ai' : '') + '">' + l[2] + '</span></button>').join('');
  const mark = i => { chainI = i; $$('.layer', ch).forEach((x, k) => x.classList.toggle('on', k === i)); };
  ch.onclick = e => { const b = e.target.closest('.layer'); if (b) { mark(+b.dataset.i); } };
  ch.onmouseenter = () => chainHold = true; ch.onmouseleave = () => chainHold = false;
  mark(chainI);
  clearInterval(chainTimer);
  new IntersectionObserver(es => chainView = es[0].isIntersecting, { threshold: .3 }).observe(ch);
  if (!reduced) chainTimer = setInterval(() => { if (chainView && !chainHold) mark((chainI + 1) % LAYERS.length); }, 2400);

  const opts = $('#sim-opts'), out = $('#sim-out'), scr = screens($('#sim-scr'));
  $('#sim-scr').innerHTML = '';
  opts.innerHTML = STATES.map(s => '<button data-id="' + s[0] + '" aria-pressed="' + (s[0] === S.sim) + '">' + t(s[1]) + '</button>').join('');
  function show(id) {
    S.sim = id; const s = STATES.find(x => x[0] === id);
    $$('button', opts).forEach(b => b.setAttribute('aria-pressed', b.dataset.id === id));
    out.innerHTML = '<div class="row pop"><span>' + t(STATE_ROWS[0]) + '</span><div class="st">' + t(s[1]) + '</div></div>'
      + '<div class="row pop"><span>' + t(STATE_ROWS[1]) + '</span><div>' + t(s[3]) + '</div></div>'
      + '<div class="row pop"><span>' + t(STATE_ROWS[2]) + '</span><div>' + t(s[4]) + '</div></div>'
      + '<div class="row pop"><span>' + t(STATE_ROWS[3]) + '</span><div>' + t(s[5]) + '</div></div>';
    scr.show(s[2]);
  }
  opts.onclick = e => { const b = e.target.closest('button'); if (b) show(b.dataset.id); };
  show(S.sim);
}

/* ---------- ease demo ---------- */
function mountEase() {
  const mini = $('#mini');
  const apply = () => { mini.classList.toggle('lg', S.ts === 2); mini.classList.toggle('calm', S.mo); $('#ts-1').setAttribute('aria-pressed', S.ts === 1); $('#ts-2').setAttribute('aria-pressed', S.ts === 2); $('#mo').setAttribute('aria-pressed', S.mo); };
  $('#ts-1').onclick = () => { S.ts = 1; apply(); }; $('#ts-2').onclick = () => { S.ts = 2; apply(); }; $('#mo').onclick = () => { S.mo = !S.mo; apply(); };
  apply();
}

/* ---------- MusicTag stepper + remote ---------- */
function mountTag() {
  const scr = screens($('#tg-scr')); $('#tg-scr').innerHTML = '';
  function render() {
    const steps = TAGSTEPS[S.path]; S.flow = Math.min(S.flow, steps.length - 1);
    $('#p-ok').setAttribute('aria-pressed', S.path === 'ok'); $('#p-fail').setAttribute('aria-pressed', S.path === 'fail');
    $('#flow').innerHTML = steps.map((s, i) => (i ? '<i></i>' : '') + '<button data-i="' + i + '" class="' + (i < S.flow ? 'done ' : '') + (i === S.flow ? 'on ' : '') + (S.path === 'fail' && i === steps.length - 1 ? 'fail' : '') + '">' + t(s[1]) + '</button>').join('');
    $('#flow-note').textContent = t(steps[S.flow][2]);
    $('#f-cnt').textContent = (S.flow + 1) + ' / ' + steps.length;
    $('#f-prev').disabled = S.flow === 0; $('#f-next').disabled = S.flow === steps.length - 1;
    $('#f-prev').style.opacity = S.flow === 0 ? .35 : 1; $('#f-next').style.opacity = S.flow === steps.length - 1 ? .35 : 1;
    scr.show(steps[S.flow][0]);
  }
  $('#flow').onclick = e => { const b = e.target.closest('button'); if (b) { S.flow = +b.dataset.i; render(); } };
  $('#f-prev').onclick = () => { if (S.flow > 0) { S.flow--; render(); } };
  $('#f-next').onclick = () => { if (S.flow < TAGSTEPS[S.path].length - 1) { S.flow++; render(); } };
  $('#p-ok').onclick = () => { S.path = 'ok'; render(); }; $('#p-fail').onclick = () => { S.path = 'fail'; render(); };
  render();
  const rd = () => {
    $('#rd-t').textContent = TRACKS[S.tr][0]; $('#rd-a').textContent = TRACKS[S.tr][1];
    $('#rd').classList.toggle('paused', !S.play); $('#rd-v').style.setProperty('--v', S.vol * 10 + '%'); $('#rd-v').style.width = S.vol * 10 + '%'; $('#rd-vp').textContent = S.vol * 10 + '%';
  };
  $('#remote').onclick = e => {
    const b = e.target.closest('button'); if (!b) return; const a = b.dataset.a;
    if (a === 'toggle') S.play = !S.play; else if (a === 'next') { S.tr = (S.tr + 1) % TRACKS.length; S.play = true; } else if (a === 'prev') { S.tr = (S.tr + TRACKS.length - 1) % TRACKS.length; S.play = true; }
    else if (a === 'up') S.vol = Math.min(10, S.vol + 1); else if (a === 'down') S.vol = Math.max(0, S.vol - 1);
    rd();
  };
  rd();
}

/* ---------- chapters: rail, menu, reveal, counters ---------- */
let io = null, sectionIO = null;
function mountChrome() {
  const secs = $$('section[data-nav]');
  const rail = $('#rail'), dot = $('#rail-dot');
  rail.innerHTML = ''; rail.appendChild(dot);
  secs.forEach((s, i) => { const li = document.createElement('li'); li.innerHTML = '<button>' + t(K[s.dataset.nav]) + '</button>'; li.onclick = () => s.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); rail.appendChild(li); });
  $('#menu-list').innerHTML = secs.map((s, i) => '<li><button data-i="' + i + '"><small>' + String(i + 1).padStart(2, '0') + '</small>' + t(K[s.dataset.nav]) + '</button></li>').join('');
  $$('#menu-list button').forEach((b, i) => b.style.transitionDelay = (i * 40) + 'ms');
  $('#menu-list').onclick = e => { const b = e.target.closest('button'); if (!b) return; closeMenu(); secs[+b.dataset.i].scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); };
  const lis = $$('li', rail);
  const setActive = i => { lis.forEach((l, k) => l.classList.toggle('on', k === i)); if (lis[i]) dot.style.transform = 'translateY(' + (lis[i].offsetTop + lis[i].offsetHeight / 2 - 5) + 'px)'; document.documentElement.classList.toggle('tone-dark', secs[i] && secs[i].dataset.tone === 'dark'); };
  if (sectionIO) sectionIO.disconnect();
  sectionIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActive(secs.indexOf(e.target)); }), { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach(s => sectionIO.observe(s)); setActive(0);
}
function openMenu() { $('#menu').classList.add('open'); }
function closeMenu() { $('#menu').classList.remove('open'); }
function mountReveal() {
  if (io) io.disconnect();
  io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; const el = e.target; el.classList.add('revealed'); io.unobserve(el);
    $$('[data-c]', el).forEach(b => count(b));
  }), { threshold: .12 });
  $$('.rv, .head').forEach(el => io.observe(el));
  if (reduced) $$('.rv, .head').forEach(el => el.classList.add('revealed'));
}
function count(b) {
  const to = +b.dataset.c; if (reduced) { b.textContent = to; return; }
  const t0 = performance.now(), d = 1100;
  (function f(n) { const p = Math.min(1, (n - t0) / d); b.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
}
function onScroll() {
  document.documentElement.classList.toggle('at-hero', scrollY < $('#hero').offsetHeight * .6);
  const h = document.documentElement; const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
  $('#prog').style.setProperty('--p', p.toFixed(4));
}

/* ---------- boot ---------- */
function renderAll() {
  applyCopy(); renderLists(); mountScene(); mountJourneys(); mountVoice(); mountEase(); mountTag(); mountChrome(); mountReveal();
}
function setLang(l) {
  lang = l; try { localStorage.setItem('lr-lang', l); } catch (e) {}
  if (sceneTimer) clearTimeout(sceneTimer);
  renderAll();
}
document.addEventListener('DOMContentLoaded', () => {
  $('#l-zh').onclick = () => setLang('zh'); $('#l-en').onclick = () => setLang('en');
  $('#menu-open').onclick = openMenu; $('#menu-close').onclick = closeMenu;
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  $('#v1').onclick = () => { S.v = 1; renderIA(); }; $('#v2').onclick = () => { S.v = 2; renderIA(); };
  addEventListener('scroll', onScroll, { passive: true });
  renderAll(); onScroll();
});
})();
