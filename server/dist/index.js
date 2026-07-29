// ============================================================
// ProGusser Signaling Server — Multi-peer room mesh relay
// ============================================================
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
const PORT = parseInt(process.env.PORT || '3001', 10);
const httpServer = createServer((_req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ProGusser Signaling Server OK');
});
// Room management: roomCode → Map<peerId, PeerInfo>
const rooms = new Map();
// Connection → { roomCode, peerId }
const connMap = new Map();
let nextPeerId = 1;
function genRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}
function genPeerId() {
    return `p${nextPeerId++}`;
}
const wss = new WebSocketServer({ server: httpServer });
httpServer.listen(PORT, () => {
    console.log(`ProGusser server ws://0.0.0.0:${PORT}`);
});
wss.on('connection', (ws) => {
    ws.on('message', (raw) => {
        let msg;
        try {
            msg = JSON.parse(raw.toString());
        }
        catch {
            sendErr(ws, 'Invalid JSON');
            return;
        }
        switch (msg.type) {
            // --- Room management ---
            case 'create': {
                const code = genRoomCode();
                const peerId = genPeerId();
                const info = { ws, peerId, nickname: msg.nickname || 'Anonymous' };
                rooms.set(code, new Map([[peerId, info]]));
                connMap.set(ws, { roomCode: code, peerId });
                send(ws, { type: 'room_created', room: code, peerId, peers: [] });
                console.log(`Room ${code} created by ${info.nickname} (${peerId})`);
                break;
            }
            case 'join': {
                const code = msg.room?.toUpperCase();
                if (!code) {
                    sendErr(ws, 'Room code required');
                    return;
                }
                const room = rooms.get(code);
                if (!room) {
                    sendErr(ws, 'Room not found');
                    return;
                }
                const peerId = genPeerId();
                const nickname = msg.nickname || 'Anonymous';
                const info = { ws, peerId, nickname };
                // Send existing peers list to joiner
                const existingPeers = Array.from(room.entries()).map(([id, p]) => ({
                    peerId: id, nickname: p.nickname,
                }));
                send(ws, { type: 'room_joined', room: code, peerId, peers: existingPeers });
                // Notify existing peers about the newcomer
                for (const [id, p] of room) {
                    send(p.ws, { type: 'peer_joined', peerId, nickname });
                }
                room.set(peerId, info);
                connMap.set(ws, { roomCode: code, peerId });
                console.log(`${nickname} (${peerId}) joined room ${code} (${room.size} players)`);
                break;
            }
            // --- Signaling relay (mesh) ---
            case 'signal': {
                const conn = connMap.get(ws);
                if (!conn) {
                    sendErr(ws, 'Not in a room');
                    return;
                }
                const room = rooms.get(conn.roomCode);
                if (!room) {
                    sendErr(ws, 'Room vanished');
                    return;
                }
                const data = msg.data;
                const targetId = data?.targetPeerId;
                if (targetId) {
                    // Route to specific peer
                    const target = room.get(targetId);
                    if (target && target.ws.readyState === WebSocket.OPEN) {
                        send(target.ws, {
                            type: 'signal',
                            data: { ...data, sourcePeerId: conn.peerId },
                        });
                    }
                }
                else {
                    // Broadcast to all peers except sender
                    for (const [id, p] of room) {
                        if (id !== conn.peerId && p.ws.readyState === WebSocket.OPEN) {
                            send(p.ws, {
                                type: 'signal',
                                data: { ...data, sourcePeerId: conn.peerId },
                            });
                        }
                    }
                }
                break;
            }
            // --- Nickname broadcast ---
            case 'update_nickname': {
                const conn = connMap.get(ws);
                if (!conn)
                    return;
                const room = rooms.get(conn.roomCode);
                if (!room)
                    return;
                const info = room.get(conn.peerId);
                if (info)
                    info.nickname = msg.nickname || info.nickname;
                break;
            }
            default:
                sendErr(ws, `Unknown: ${msg.type}`);
        }
    });
    ws.on('close', () => {
        const conn = connMap.get(ws);
        if (!conn)
            return;
        const room = rooms.get(conn.roomCode);
        if (room) {
            room.delete(conn.peerId);
            if (room.size === 0) {
                rooms.delete(conn.roomCode);
                console.log(`Room ${conn.roomCode} deleted (empty)`);
            }
            else {
                for (const [, p] of room) {
                    send(p.ws, { type: 'peer_left', peerId: conn.peerId });
                }
            }
        }
        connMap.delete(ws);
        console.log(`Peer ${conn.peerId} disconnected`);
    });
    ws.on('error', (e) => console.error('WS error:', e.message));
});
function send(ws, data) {
    if (ws.readyState === WebSocket.OPEN)
        ws.send(JSON.stringify(data));
}
function sendErr(ws, msg) {
    send(ws, { type: 'error', message: msg });
}
