#!/bin/bash
set -e

echo "🔧 Setting up The Nagging Partner development environment..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required. Install it from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node --version) found"

# Install spec-workflow CLI (only global dependency)
echo ""
echo "📦 Installing claude-code-spec-workflow..."
npm i -g @pimzino/claude-code-spec-workflow

echo ""
echo "✅ Setup complete!"
echo ""
echo "Everything else (skills, MCP servers, commands, agents) is already in the repo."
echo ""
echo "Next steps:"
echo "  1. Open this project in Claude Code: claude"
echo "  2. Set up steering docs: /spec-steering-setup"
echo "  3. Create your first spec: /spec-create landing-page \"Waitlist landing page\""
