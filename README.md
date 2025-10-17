# GitPro - Advanced Git Terminal

A modern desktop Git terminal with an interactive GUI built with Next.js, Electron, and Framer Motion.

## Features

- **Interactive Git Operations**: Commit, Push, and Pull with a modern UI
- **Commit History Graph**: Visual representation of recent commits
- **Terminal Log**: Real-time feedback for all git operations
- **Dark Theme**: Professional VS Code-style dark interface
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Desktop App**: Built with Electron for native desktop experience

## Tech Stack

- **Frontend**: Next.js 13+ with App Router, Tailwind CSS, Framer Motion
- **Backend**: Node.js with Express.js (via Next.js API routes)
- **Desktop**: Electron.js
- **Styling**: Tailwind CSS with custom dark theme

## Installation

### Prerequisites

- Node.js 16+ and npm
- Git installed on your system

### Setup

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd gitpro
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

## Running the App

### Development Mode (Web)

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development Mode (Desktop with Electron)

\`\`\`bash
npm run electron-dev
\`\`\`

This will start the Next.js dev server and open the Electron app.

### Production Build

\`\`\`bash
npm run build
npm start
\`\`\`

### Build Desktop App

\`\`\`bash
npm run electron-build
\`\`\`

This creates a distributable Electron app for your platform.

## Usage

1. **Commit**: Click the "Commit" button, enter your commit message, and submit
2. **Push**: Click "Push" to push commits to the remote repository
3. **Pull**: Click "Pull" to fetch and merge changes from the remote
4. **View History**: Recent commits are displayed in the commit graph panel
5. **Monitor Operations**: All git commands and their outputs are logged in the terminal

## Project Structure

\`\`\`
gitpro/
├── app/
│   ├── api/
│   │   └── git/
│   │       ├── commit/route.ts
│   │       ├── push/route.ts
│   │       ├── pull/route.ts
│   │       └── history/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── git-buttons.tsx
│   ├── commit-modal.tsx
│   ├── terminal-log.tsx
│   └── commit-graph.tsx
├── main.js
├── preload.js
└── package.json
\`\`\`

## API Endpoints

- `POST /api/git/commit` - Create a new commit
- `POST /api/git/push` - Push commits to remote
- `POST /api/git/pull` - Pull changes from remote
- `GET /api/git/history` - Get commit history

## Customization

### Colors

Edit the color variables in `app/globals.css`:
- `--background`: #1e1e2f (dark background)
- `--primary`: #00d1b2 (teal accent)
- `--secondary`: #ff6b6b (red accent)
- `--card`: #2c2c3e (panel background)

### Styling

All components use Tailwind CSS. Modify component files in `components/` to customize the UI.

## Troubleshooting

### Git commands fail
- Ensure you're in a git repository
- Check that your remote is properly configured
- Verify git is installed and accessible from the command line

### Electron app won't start
- Make sure the dev server is running on port 3000
- Check that Electron is properly installed
- Try clearing node_modules and reinstalling

## Future Enhancements

- Branch management UI
- Merge conflict resolution
- Stash management
- Repository initialization
- Dark/light mode toggle
- Keyboard shortcuts
- Git diff viewer

## License

MIT
