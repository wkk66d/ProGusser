#!/bin/bash
# ProGusser Client — one-click startup
# Serves the static client on port 5173

cd "$(dirname "$0")/client/dist"

# Check if a static server is available
if command -v python3 &>/dev/null; then
    echo "ProGusser Client → http://localhost:5173"
    python3 -m http.server 5173
elif command -v npx &>/dev/null; then
    echo "ProGusser Client → http://localhost:5173"
    npx serve . -p 5173 --no-clipboard
else
    echo "Need Python3 or Node.js to serve. Install one and retry."
    exit 1
fi
