# ProGusser — CS2 猜选手游戏

A **Wordle-style CS2 player guessing game** with P2P multiplayer. Two players connect via WebRTC, guess the same hidden target player, and compete in a 抢N (first-to-N) match format.

---

## Features

- **P2P Multiplayer** — Direct WebRTC connection, no central game server
- **Cross-LAN / Internet** — STUN + free TURN relay handles all NAT types
- **200+ Player Pool** — CS2 tier-1 pros, CSGO Major champions, Chinese players, casters (including Banks)
- **6 Attribute Feedback** — Country, Team, Age, Major Count, Position, Top Ranking
- **Color-Coded Hints** — 🟢 exact match, 🟡 close, ⚪ not close
- **Arrow Indicators** — ↑↓ on all numerical attributes (gray also shows direction)
- **抢N Format** — First to N wins, unlimited rounds (抢1 / 抢2 / 抢3 / 抢5)
- **2-Minute Timer + 8 Guesses** — Per round, per player
- **Opponent Color-Only Display** — See their guess patterns without seeing which player they guessed
- **Modern Dark UI** — React 19 + Tailwind CSS v4 + Zustand

---

## How to Play

1. **Create a room** — get a 4-character room code
2. **Share the code** — opponent joins with the code
3. **Host picks 抢N format** — 抢1, 抢2, 抢3, or 抢5
4. **Random target** selected via shared-seed RNG (both get the same)
5. **Each round**: type a player name and submit (autocomplete search)
6. **Feedback** appears after each guess — green/yellow/gray + ↑↓ arrows
7. **Opponent panel** shows color-only blocks per guess — pattern visible, player hidden
8. **Round ends** when someone guesses correctly, time runs out, or both exhaust 8 guesses
9. **Match ends** when one player reaches N wins

### Feedback Rules

| Attribute | 🟢 Green | 🟡 Yellow | Gray Arrow |
|---|---|---|---|
| **Country** | Same country | Same continent (CIS separate from Europe/Asia) | — |
| **Team** | Same team | Team nationality same continent | — |
| **Age** | Exact match | ±3 years | ↑ target older, ↓ target younger |
| **Major Count** | Exact match | ±1 | ↑ target has more, ↓ target has fewer |
| **Position** | Exact match | *(no yellow)* | — |
| **Top Ranking** | Exact match | ±3 ranks | ↑ better, ↓ worse |

**Special cases**:
- **CIS** (Russia, Belarus, Kazakhstan, etc.) is its own region. Ukraine is **Europe**.
- **Team nationality**: 3+ same-nationality players → team adopts that nationality. Otherwise "international".
- **Top Ranking ">20"**: stored as 21 internally, displayed as ">20". Gray with ↓ when target is ranked.
- **Draws**: both time out or both exhaust guesses → 0:0, no score change.

---

## Project Structure

```
ProGusser/
├── client/                         # React 19 + Vite + Tailwind CSS v4
│   └── src/
│       ├── types/game.ts           # TypeScript type definitions
│       ├── data/players.ts         # ~200 player database
│       ├── engine/
│       │   ├── feedback.ts         # Attribute feedback (green/yellow/gray + arrows)
│       │   ├── target.ts           # Seeded PRNG target selection (Alea)
│       │   └── regions.ts          # Country → continent mapping + Chinese names
│       ├── stores/
│       │   ├── gameStore.ts        # Round state (guesses, timer, phase, timeout flags)
│       │   ├── matchStore.ts       # Match state (抢N format, scores, rounds)
│       │   └── connectionStore.ts  # P2P connection + signaling URL
│       ├── p2p/connection.ts       # WebRTC + DataChannel + signaling client
│       └── components/
│           ├── HomeScreen.tsx       # Create/Join room + signaling URL settings
│           ├── Lobby.tsx            # Waiting for opponent
│           ├── SetupScreen.tsx      # 抢N format picker
│           ├── GameScreen.tsx       # Main game with round-end overlay
│           ├── GuessInput.tsx       # Player search autocomplete
│           ├── GuessTable.tsx       # Your guess rows
│           ├── GuessRow.tsx         # Single guess row
│           ├── AttributeCell.tsx    # Colored cell + arrow + ColorDot
│           ├── OpponentGuessTable.tsx  # Color-only opponent guesses
│           ├── Timer.tsx            # 2:00 countdown
│           └── MatchEnd.tsx         # Final results + rematch
│
├── server/                         # WebSocket signaling server
│   ├── src/index.ts                # Room mgmt, SDP/ICE relay, health check
│   ├── Procfile                    # Deploy config
│   └── railway.json                # Railway deploy config
│
└── prompt.txt                      # Original requirements (Chinese)
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm

### Install

```bash
cd client && npm install
cd ../server && npm install
cd ..
```

### Run Locally

Two terminals:

**Terminal 1 — Server:**
```bash
cd server && npm run dev
# → ws://localhost:3001
```

**Terminal 2 — Client:**
```bash
cd client && npm run dev
# → http://localhost:5173
```

Open in **two browser tabs** to test P2P gameplay.

### Cross-LAN / Internet Play

**1. Deploy the signaling server:**

```bash
# Railway (free tier):
cd server && railway up

# Or any VPS:
cd server && npm start
# Ensure port 3001 is open
```

**2. Both players**: open client → click **▼ Settings** → enter server URL:
```
ws://your-server.com:3001
```

**3. Create/Join** as usual. Free TURN server handles all NAT types.

> **How it works**: WebRTC uses STUN for IP discovery. TURN relays for symmetric NAT (~15% of users). The signaling server only brokers the initial handshake — all game data flows P2P through the DataChannel.

### Production Build

```bash
cd server && npm start         # compiles TS → JS, runs on :3001
cd ../client && npm run build  # outputs to dist/
npx serve client/dist          # or deploy to Vercel/Netlify
```

### Environment

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3001` | Signaling server port |
| `VITE_SIGNALING_URL` | `ws://localhost:3001` | Default signaling URL |

---

## Game Messages (DataChannel)

| Message | Description |
|---|---|
| `MATCH_CONFIG` | Host sends 抢N format |
| `ROUND_START` / `ROUND_START_ACK` | Exchange nonces for shared seed (either peer initiates) |
| `GUESS` | `{guessIndex, colors[]}` — **colors only, no player name** |
| `CORRECT_GUESS` | I found the target |
| `GUESSES_EXHAUSTED` / `TIME_UP` | Round end conditions |
| `ROUND_OVER` | Reveal nonce for post-round verification |

### Anti-Cheat

Both peers generate random nonces, exchange via `ROUND_START`/`ROUND_START_ACK`, and sort alphabetically to produce a deterministic seed. The Alea PRNG shuffles the player pool — same seed = same target. Neither player can control or predict the target. Nonces revealed at round end for verification.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4 (dark theme) |
| State | Zustand (3 stores) |
| P2P | `RTCPeerConnection` + `RTCDataChannel` |
| NAT Traversal | Google STUN + Metered.ca TURN |
| Signaling | Node.js + `ws` (WebSocket + HTTP health check) |
| PRNG | Alea (seeded via cyrb53 hash of combined nonces) |

---

## License

MIT
