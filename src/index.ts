import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import notifier from "node-notifier";
import { execSync } from "child_process";

const server = new McpServer({
  name: "mcp-win-toast",
  version: "1.0.0",
});

// show_toast: Windows トースト通知を表示する
server.registerTool(
  "show_toast",
  {
    description: "Windowsのトースト通知を表示します",
    inputSchema: {
      title: z.string().describe("通知のタイトル"),
      message: z.string().describe("通知のメッセージ本文"),
    },
  },
  async ({ title, message }) => {
    return new Promise((resolve) => {
      notifier.notify(
        {
          title,
          message,
          sound: true,
        },
        (err) => {
          if (err) {
            resolve({
              content: [{ type: "text" as const, text: `エラー: ${err.message}` }],
              isError: true,
            });
          } else {
            resolve({
              content: [{ type: "text" as const, text: `トースト通知を表示しました: ${title}` }],
            });
          }
        }
      );
    });
  }
);

// show_dialog: Windows 標準の OK ボタン付きダイアログを表示する
server.registerTool(
  "show_dialog",
  {
    description: "Windows標準のOKボタン付きダイアログボックスを表示します",
    inputSchema: {
      title: z.string().describe("ダイアログのタイトル"),
      message: z.string().describe("ダイアログのメッセージ本文"),
    },
  },
  async ({ title, message }) => {
    try {
      const escapedTitle = title.replace(/'/g, "''");
      const escapedMessage = message.replace(/'/g, "''");
      const psCommand = `Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show('${escapedMessage}', '${escapedTitle}', 'OK', 'Information')`;
      execSync(`powershell -Command "${psCommand}"`, { timeout: 60000 });
      return {
        content: [{ type: "text" as const, text: `ダイアログを表示しました: ${title}` }],
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text" as const, text: `エラー: ${errorMessage}` }],
        isError: true,
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("mcp-win-toast server is running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
