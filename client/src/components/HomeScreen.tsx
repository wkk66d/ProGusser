import { useState } from 'react';
import { createRoom, joinRoom } from '../p2p/connection';
import { useConnectionStore } from '../stores/connectionStore';

export function HomeScreen() {
  const [roomInput, setRoomInput] = useState('');
  const [mode, setMode] = useState<'menu' | 'join'>('menu');
  const [showSettings, setShowSettings] = useState(false);
  const error = useConnectionStore((s) => s.error);
  const signalingUrl = useConnectionStore((s) => s.signalingUrl);
  const setSignalingUrl = useConnectionStore((s) => s.setSignalingUrl);
  const nickname = useConnectionStore((s) => s.nickname);
  const setNickname = useConnectionStore((s) => s.setNickname);

  const canJoin = roomInput.length === 4 && nickname.trim().length > 0;

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
          Pro<span className="text-feedback-green">Gusser</span>
        </h1>
        <p className="text-surface-400 text-lg">CS2 Player Guessing Game</p>
      </div>

      {/* Nickname */}
      <div className="mb-5">
        <label className="text-xs text-surface-400 block mb-1">昵称</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="输入你的昵称"
          maxLength={12}
          className="w-full py-3 px-4 bg-surface-800 border border-surface-600 rounded-xl text-white text-sm placeholder:text-surface-600 focus:outline-none focus:border-feedback-green transition-colors"
        />
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      {mode === 'menu' ? (
        <div className="space-y-3">
          <button
            onClick={() => createRoom()}
            disabled={!nickname.trim()}
            className="w-full py-4 bg-feedback-green hover:bg-feedback-green/80 disabled:bg-surface-700 disabled:text-surface-500 text-white font-bold text-lg rounded-xl transition-all duration-200 active:scale-[0.98]"
          >
            创建房间
          </button>
          <button
            onClick={() => setMode('join')}
            className="w-full py-4 bg-surface-800 hover:bg-surface-700 text-white font-bold text-lg rounded-xl border border-surface-600 transition-all duration-200 active:scale-[0.98]"
          >
            加入房间
          </button>

          {/* Settings toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-full py-2 text-surface-500 hover:text-surface-300 text-xs transition-colors"
          >
            {showSettings ? '▲ Hide Settings' : '▼ Settings'}
          </button>

          {showSettings && (
            <div className="bg-surface-800 rounded-xl p-4 border border-surface-700 space-y-3">
              <div>
                <label className="text-xs text-surface-400 block mb-1">Signaling Server 地址</label>
                <input
                  type="text"
                  value={signalingUrl}
                  onChange={(e) => setSignalingUrl(e.target.value)}
                  placeholder="ws://localhost:3001"
                  className="w-full py-2 px-3 bg-surface-900 border border-surface-600 rounded-lg text-white text-sm font-mono placeholder:text-surface-600 focus:outline-none focus:border-feedback-green transition-colors"
                />
              </div>
              <div className="text-[10px] text-surface-500 leading-relaxed space-y-1 bg-surface-900/50 rounded-lg p-2">
                <p><span className="text-feedback-yellow">● 同局域网</span>：一人开启服务器后，另一人输入 <code className="text-feedback-green">ws://对方IP:3001</code></p>
                <p><span className="text-feedback-yellow">● 互联网</span>：先部署服务器到公网，双方输入同一地址</p>
                <p className="text-surface-600">两台机器必须使用相同的服务器地址</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value.toUpperCase())}
            placeholder="输入房间码 (如 A3K9)"
            maxLength={4}
            className="w-full py-4 px-5 bg-surface-800 border border-surface-600 rounded-xl text-white text-center text-2xl font-mono tracking-[0.3em] placeholder:text-surface-600 focus:outline-none focus:border-feedback-green transition-colors"
          />
          <button
            onClick={() => canJoin && joinRoom(roomInput)}
            disabled={!canJoin}
            className="w-full py-4 bg-feedback-green hover:bg-feedback-green/80 disabled:bg-surface-700 disabled:text-surface-500 text-white font-bold text-lg rounded-xl transition-all duration-200 active:scale-[0.98]"
          >
            加入
          </button>
          <button
            onClick={() => { setMode('menu'); setRoomInput(''); }}
            className="w-full py-3 text-surface-400 hover:text-white text-sm transition-colors"
          >
            ← 返回
          </button>
        </div>
      )}
    </div>
  );
}
