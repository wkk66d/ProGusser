@echo off
:: ProGusser Client — one-click startup (Windows)
:: First build the client, then serve it

cd /d "%~dp0"

echo Installing client dependencies...
cd client
call npm install
call npm run build

echo.
echo Starting ProGusser Client...
echo Open http://localhost:5173 in your browser
echo Press Ctrl+C to stop
echo.

npx serve dist -p 5173 --no-clipboard
