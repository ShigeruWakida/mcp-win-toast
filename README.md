# mcp-win-toast

An MCP server for displaying Windows toast notifications and dialog boxes.

## Tools

### show_toast

Displays a Windows toast notification.

| Parameter | Type | Description |
|-----------|------|-------------|
| title | string | Notification title |
| message | string | Notification body text |

### show_dialog

Displays a standard Windows dialog box with an OK button.

| Parameter | Type | Description |
|-----------|------|-------------|
| title | string | Dialog title |
| message | string | Dialog body text |

## Setup

```bash
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

## License

ISC
