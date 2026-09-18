# Product Promo Video Director

一个面向 Codex、Claude Code、Cursor 等 AI 编程助手的产品宣传片导演 Skill。

它把“我想做一个产品宣传视频”从模糊想法拆成可执行的逐镜头脚本：受众、核心信息、旁白、画面、字幕、节奏、转场、配乐和交付规格，最后输出可交给 HyperFrames 等渲染工具的 `video-spec.md`。

> **重要：** 本仓库不包含任何 API Key。配音或媒体生成服务需要的密钥只能通过本地环境变量或密钥管理器注入。

[English overview](README.en.md) · [安全说明](SECURITY.md) · [贡献指南](CONTRIBUTING.md)

## 它解决什么问题

很多产品视频失败，不是因为没有渲染工具，而是因为一开始没有想清楚：

- 观众是谁，视频要让谁采取行动？
- 观众最后只记住哪一句话？
- 每个镜头具体显示什么，而不是泛泛地说“高级”“有冲击力”？
- 旁白说什么时，画面如何同步证明它？
- 50 秒是否真的装得下所有卖点？

这个 Skill 会像导演一样追问，并在信息足够后生成结构化分镜脚本。它不会凭空替你发明产品事实，也不会把未经证实的“碾压人工”“100% 准确”等绝对承诺写进宣传片。

## 演示视频

下面是近期制作的公开演示片。它们用于展示输出效果，不影响 Skill 的安装，也不包含任何 API 密钥。

| Demo | 内容 | 时长 | 下载 |
| --- | --- | ---: | --- |
| GoodTrans 五万字小说宣传片 | 一次提交整本小说、术语一致、异步交付 | 50 秒 | [`demos/goodtrans-50k-novel-promo.mp4`](demos/goodtrans-50k-novel-promo.mp4) |
| GoodTrans 质量交付宣传片 | 长文翻译质量、术语和结构保持 | 41 秒 | [`demos/goodtrans-master-grade-translation.mp4`](demos/goodtrans-master-grade-translation.mp4) |
| GoodTrans 交付包演示 | 邮件交付、译文、双语审阅和质量报告 | 23 秒 | [`demos/goodtrans-delivery-proof.mp4`](demos/goodtrans-delivery-proof.mp4) |

这些 Demo 使用了 GoodTrans 的品牌和产品内容，作为能力演示发布；如果你要制作自己的视频，请替换为自己的品牌、素材和经过核验的产品事实。

## 新手安装教程

### 1. 准备基础环境

建议使用：

- Node.js 18 或更高版本
- Git
- Codex CLI、Claude Code 或其他兼容 `skills` 的 AI 编程助手
- 如果要真正预览和渲染视频：HyperFrames

先确认 Node 与 Git：

```bash
node --version
git --version
```

Windows、macOS、Linux 都可以使用。Node.js 版本过低时，先升级 Node，再继续下面步骤。

### 2. 安装本 Skill

在你的项目目录执行：

```bash
npx skills add shaomingchan/product-promo-video-director
```

如果希望所有项目都可以使用，加上 `-g`：

```bash
npx skills add shaomingchan/product-promo-video-director -g
```

安装后重新打开 AI 编程助手，或者让它重新扫描可用 Skills。

### 3. 安装 HyperFrames 渲染端

本 Skill 负责导演式需求收集和 `video-spec.md`，HyperFrames 负责把脚本变成可预览、可渲染的 HTML 视频项目。需要完整制作流程时，再安装：

```bash
npx skills add heygen-com/hyperframes -g
```

如果只想先生成分镜脚本，不安装 HyperFrames 也可以。

### 4. 第一次使用

在一个空项目中打开 Codex 或 Claude Code，直接说：

```text
我想做一条产品宣传片。
产品是一个帮助独立开发者生成客服回复的 SaaS。
视频横屏 1920×1080，约 45 秒，中文配音，面向第一次听说它的创业者。
请先像导演一样追问，再生成 video-spec.md。
```

Skill 会先检查项目里有没有已有的 `video-spec.md`：

- 没有：进入从零策划模式。
- 有一个：进入迭代模式，可以修改某个镜头、节奏、字幕、配乐或视觉方向。
- 有多个：先让你明确要修改哪一个，不会误改文件。

信息收集完成后，项目根目录会出现：

```text
your-project/
├── video-spec.md       # 逐镜头视频脚本
├── design.md           # 可选，自定义 HyperFrames 主题
└── ...
```

### 5. 让 HyperFrames 生成预览

当 `video-spec.md` 完成后，在助手中输入：

```text
/hyperframes
```

或者在已经初始化的 HyperFrames 项目目录中运行：

```bash
npx hyperframes preview
```

然后先打开预览检查：

- 中文字体是否正常加载
- 关键卖点有没有被字幕或卡片遮挡
- 旁白与镜头边界是否同步
- 画面是否真的证明旁白，而不是只有装饰
- 片尾是否留出品牌和行动号召的停顿

确认预览后再检查和渲染：

```bash
npx hyperframes check
npx hyperframes render --quality high --output renders/final.mp4
```

不要跳过预览直接导出最终视频。脚本正确不代表实际画面一定可读。

## 配音与 API Key 配置

### Skill 本身不需要 Key

只使用本 Skill 生成脚本时，不需要任何 API Key。它不会自动把内容上传到第三方，也不会要求你把 Key 粘贴到对话或 `SKILL.md`。

### 使用 302.ai / MiniMax 配音时

如果你的渲染流程使用 302.ai 或 MiniMax，请先在服务商控制台创建自己的 Key，然后只放到本机环境变量里。

PowerShell 当前窗口临时设置：

```powershell
$env:AI_302_API_KEY = "sk-your-key-here"
```

macOS / Linux 当前终端临时设置：

```bash
export AI_302_API_KEY="sk-your-key-here"
```

也可以复制模板：

```bash
cp .env.example .env
```

然后由你自己的渲染脚本或媒体工具读取 `.env`。`.env` 已在 `.gitignore` 中排除，绝不要执行：

```bash
git add .env
```

不要把 Key 写进以下位置：

- `README.md`、`SKILL.md` 或示例 Prompt
- GitHub Issue、Pull Request 或截图
- 视频字幕、旁白文本或演示视频
- `package.json`、shell 脚本参数、浏览器书签
- 任何会被提交到 Git 的配置文件

提交前运行仓库自带的扫描：

```bash
node scripts/check-secrets.mjs
```

如果 Key 曾经进入 Git 历史，即使现在删除文件也不够；请立即在服务商后台撤销并重新生成。

## 推荐的产品宣传片工作流

1. **先定一句话：** 观众看完后必须能复述什么？
2. **明确受众和场景：** 谁在什么时刻需要这个产品？
3. **把抽象卖点变成画面：** “更快”要用进度、等待减少或交付结果证明。
4. **只保留 3–5 个信息块：** 50 秒不是产品手册。
5. **让旁白和画面互相证明：** 旁白说术语一致，画面就展示术语表或跨章节映射。
6. **先生成预览，再导出 MP4：** 先修断行、对比度、节奏和字幕，再花时间渲染。
7. **避免不可证实的绝对承诺：** 用“减少等待”“尽可能保留”“更适合审阅”等准确表述。

## 常见问题

### 为什么只生成了 `video-spec.md`，没有 MP4？

这是正常的分层设计。这个 Skill 负责创意澄清和脚本；HyperFrames 或你的其他渲染工具负责实现和导出。先安装渲染端，再运行预览和渲染命令。

### 我没有素材，可以做吗？

可以。Skill 会区分真实产品素材、程序化 UI、抽象图形、AI 生成图片和必须由你提供的品牌素材。不要把虚构的界面当成真实产品截图发布。

### 中文字体乱码怎么办？

在渲染环境安装或随项目提供支持中文的字体，并在 `design.md` 或组成文件中指定。先用预览确认，不能只看脚本。

### 想修改已有视频怎么办？

把已有 `video-spec.md` 放在项目根目录，然后直接说：

```text
把第 3 镜头的停留时间延长 1 秒，字幕改成更短的一句，其他镜头不要动。
```

Skill 会进入迭代模式，检查时间、字幕和后续镜头是否需要连带调整。

## 目录结构

```text
product-promo-video-director/
├── SKILL.md                         # AI 助手加载的入口
├── README.md                        # 本新手教程
├── README.en.md                     # English overview
├── SECURITY.md                      # 密钥与漏洞处理
├── NOTICE.md                        # 上游工作流与 Demo 说明
├── references/                      # 提问、分镜、节奏、质量规则与实测基线
├── templates/video-spec-template.md # 可手工参考的脚本模板
├── examples/                        # 完整分镜示例
├── demos/                           # 公开演示视频
└── scripts/check-secrets.mjs        # 提交前的简单密钥扫描
```

## 贡献

欢迎提交更好的分镜规则、无品牌示例、渲染适配和安全修复。请先阅读 `SECURITY.md`，不要提交真实 API Key、私有客户素材或未获授权的商业视频。

## License

核心工作流按 MIT License 发布，原始版权声明见 [`LICENSE`](LICENSE)。仓库中的 GoodTrans Demo 仅用于产品宣传视频能力展示，不代表本 Skill 依赖 GoodTrans。
