# tabby-trim-selection

一个临时修复 Tabby 终端选区复制行尾空格问题的本地插件。

插件仅在复制期间删除每一行末尾的空格和 Tab，不会修改终端显示、选区内容或 Shell 输出。适用于 Tabby 尚未修复 [#10732](https://github.com/Eugeny/tabby/issues/10732) 的版本。

## 手动 ZIP 安装（推荐）

Tabby 当前不能从 UI 直接导入本地 ZIP，但可以通过 UI 打开正确的插件目录：

1. 打开 `Settings -> Plugins`，点击 `Plugins folder`。
2. 将 `tabby-trim-selection-0.1.0.zip` 的内容直接解压到打开的目录中。
3. 确认文件最终位于 `node_modules/tabby-trim-selection/package.json`，不要额外套一层 ZIP 文件名目录。
4. 完全退出并重新启动 Tabby。

插件重新加载后会出现在 `Settings -> Plugins -> Installed` 中。分享给其他人时只需要发送 ZIP，不需要发送源码或安装构建依赖。

## 构建

```bash
npm install
npm run check
npm pack
```

`npm run check` 会运行测试、编译插件并生成可手动解压安装的 `tabby-trim-selection-0.1.0.zip`。

## 在 WSL 中安装到 Windows Tabby

在 WSL 中执行：

```bash
npm install --prefix /mnt/c/Users/<Windows用户名>/AppData/Roaming/tabby/plugins ./tabby-trim-selection-0.1.0.tgz
```

安装完成后完全退出并重新启动 Tabby。插件会出现在 `Settings -> Plugins` 的已安装插件列表中。

## 卸载

通过 ZIP 手动安装时，完全退出 Tabby 后删除插件目录：

```text
<Tabby Plugins folder>/node_modules/tabby-trim-selection
```

通过 npm 安装时执行：

```bash
npm uninstall --prefix /mnt/c/Users/<Windows用户名>/AppData/Roaming/tabby/plugins tabby-trim-selection
```

Tabby 官方修复该问题后应卸载本插件，以恢复对有意保留的行尾空白的复制。
