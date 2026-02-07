# Telepathic Browser

AI-powered browser automation extension for Chrome. Chat with your browser to navigate, click, fill forms, and perform multi-step actions using natural language.

## Install

### Chrome Web Store

Coming soon.

### Manual Install (Sideload)

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked**
5. Select the folder containing this repository

## Setup

1. Click the Telepathic Browser icon in your Chrome toolbar
2. Open **Settings** (gear icon)
3. Enter your API key
4. Start chatting with your browser

## Permissions

| Permission | Why |
|---|---|
| `activeTab` | Read and interact with the current tab when you ask |
| `scripting` | Execute actions (clicks, form fills, scrolling) on pages |
| `storage` | Save your API key and settings locally |
| `sidePanel` | Display the chat interface as a side panel |
| `tabs` | Navigate between tabs and read page URLs |

## Privacy

- Your API key is stored locally in your browser and never sent to any server other than the AI provider
- Page content is only sent to the AI provider when you actively use the extension
- No analytics, tracking, or telemetry

## License

MIT
