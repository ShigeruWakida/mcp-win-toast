# mcp-win-toast

An MCP (Model Context Protocol) server that lets AI assistants send Windows toast notifications and dialog boxes. Give your AI a voice on your desktop.

## Why mcp-win-toast?

AI assistants are powerful — but they work silently in the background. With mcp-win-toast, your AI can **actively notify you** through native Windows UI, turning it into a true desktop companion.

## Use Cases

### Long Task Completion Alert
Ask the AI to analyze a large codebase, generate a report, or run a complex workflow — and get a toast notification the moment it's done. No need to keep watching the screen.

> "Refactor all the API endpoints, and notify me when you're finished."

### Scheduled Reminders
Combine with other MCP tools to set up reminders that pop up as native Windows notifications.

> "Remind me in 30 minutes to check the deployment status."

### Build & Test Result Notifications
Let the AI run your build pipeline or test suite and push the result as a toast — pass or fail, you'll know right away.

> "Run the tests and show me a toast with the results."

### Important Decision Checkpoints
Use dialog boxes to force a pause and get explicit user confirmation before the AI proceeds with a critical action.

> "Before deleting any files, show me a dialog to confirm."

### System Monitoring Alerts
Have the AI periodically check disk space, CPU usage, or service health, and alert you only when something needs attention.

> "Monitor my disk space and warn me if it drops below 10GB."

## Tools

### show_toast

Displays a Windows toast notification.

| Parameter | Type | Description |
|-----------|------|-------------|
| title | string | Notification title |
| message | string | Notification body text |

### show_dialog

Displays a standard Windows dialog box with an OK button. Execution is blocked until the user clicks OK, making it ideal for confirmations and important alerts.

| Parameter | Type | Description |
|-----------|------|-------------|
| title | string | Dialog title |
| message | string | Dialog body text |

## Setup

```bash
git clone https://github.com/ShigeruWakida/mcp-win-toast.git
cd mcp-win-toast
npm install
npm run build
```

## Claude Desktop Configuration

Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "win-toast": {
      "command": "node",
      "args": ["C:\\path\\to\\mcp-win-toast\\build\\index.js"]
    }
  }
}
```

## Requirements

- Windows 10 / 11
- Node.js 18+

## License

ISC
