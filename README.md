# Mark5 插件

一个为草榴社区网站特定用户添加自定义标签的 Chrome 扩展。

![图片描述](https://images4.imagebam.com/91/7a/09/ME10M058_o.JPG)

## 功能
- 为用户添加可自定义的标签。
- 支持本地用户清单、GitHub 远程清单，或两者同时使用。
- 默认 CSS：12px 红色文字，2px 红色边框，绝对定位。

## 安装
1. 克隆或下载仓库：`git clone https://github.com/yptd-1024/mark5.git`
2. 打开 `chrome://extensions/`，启用开发者模式，加载解压后的文件夹。

## 使用方法
1. 打开“选项”页面。
2. 设置本地用户清单（例如：`张三,李四`），或留空。
3. 选择清单模式：“仅本地”、“仅远程”或“本地和远程同时”。
4. 设置 GitHub 仓库地址（例如：`https://github.com/yourusername/mark5-plugin`）。
5. 保存设置并访问支持的网站。

## 远程用户清单
- 存储在仓库的 `userlist.txt` 文件中。
- 示例：`王五,赵六,孙七`
