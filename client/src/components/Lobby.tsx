import { useState } from 'react';
import { useConnectionStore } from '../stores/connectionStore';
import { useGameStore } from '../stores/gameStore';
import { cleanup } from '../p2p/connection';

export function Lobby() {
  const roomCode = useConnectionStore((s) => s.roomCode);
  const isHost = useConnectionStore((s) => s.isHost);
  const signalingUrl = useConnectionStore((s) => s.signalingUrl);
  const remotePeers = useConnectionStore((s) => s.remotePeers);
  const [copied, setCopied] = useState<'code' | 'url' | null>(null);

  const connected = remotePeers.filter((p) => p.connected);
  const connecting = remotePeers.filter((p) => !p.connected);
  const allConnected = remotePeers.length > 0 && connecting.length === 0;

  async function copy(text: string, what: 'code' | 'url') {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(what);
      setTimeout(() => setCopied(null), 2000);
    } catch { /* fallback */ }
  }

  return (
    <div className="w-full max-w-md text-center">
      <h2 className="text-xl font-bold text-white mb-6">
        {allConnected ? '全部已连接！' : '等待玩家加入...'}
      </h2>

      {/* Room Code */}
      <div className="mb-5">
        <p className="text-surface-400 text-xs mb-1">房间码</p>
        <button
          onClick={() => copy(roomCode!, 'code')}
          className="bg-surface-800 hover:bg-surface-700 border border-surface-600 rounded-2xl py-4 px-6 inline-block transition-all active:scale-95 cursor-pointer"
        >
          <span className="text-4xl font-mono font-bold text-white tracking-[0.4em]">
            {roomCode}
          </span>
        </button>
        <p className="text-surface-500 text-[10px] mt-1">
          {copied === 'code' ? '✓ 已复制！' : '点击复制，分享房间码'}
        </p>
      </div>

      {/* Player List */}
      <div className="mb-5">
        <p className="text-surface-400 text-xs mb-2">
          玩家 ({1 + remotePeers.length})
        </p>
        <div className="space-y-1.5">
          {/* You */}
          <div className="flex items-center justify-between bg-feedback-green/10 border border-feedback-green/30 rounded-lg px-3 py-2">
            <span className="text-sm text-feedback-green font-medium">
              {useConnectionStore.getState().nickname || '你'} (你)
            </span>
            <div className="w-2 h-2 rounded-full bg-feedback-green" />
          </div>
          {/* Remote peers */}
          {remotePeers.map((p) => (
            <div
              key={p.peerId}
              className={`flex items-center justify-between rounded-lg px-3 py-2 border ${
                p.connected
                  ? 'bg-surface-800 border-surface-600'
                  : 'bg-surface-800/50 border-surface-700'
              }`}
            >
              <span className="text-sm text-surface-300">{p.nickname}</span>
              <div className={`w-2 h-2 rounded-full ${
                p.connected ? 'bg-feedback-green' : 'bg-feedback-yellow animate-pulse'
              }`} />
            </div>
          ))}
          {/* Empty state */}
          {remotePeers.length === 0 && (
            <div className="text-[10px] text-surface-600 py-2">
              {isHost ? '将房间码发送给其他玩家...' : '正在连接...'}
            </div>
          )}
        </div>
      </div>

      {/* Server URL */}
      <div className="mb-5 px-4">
        <div className="bg-surface-800/50 border border-surface-700 rounded-xl p-3 text-left">
          <p className="text-[10px] text-surface-500 mb-1 uppercase tracking-wider">Signaling Server</p>
          <div className="flex items-center gap-2">
            <code className="text-[10px] text-surface-300 font-mono truncate flex-1">{signalingUrl}</code>
            <button
              onClick={() => copy(signalingUrl, 'url')}
              className="shrink-0 text-[10px] px-2 py-1 rounded bg-surface-700 text-surface-400 hover:text-white transition-colors"
            >
              {copied === 'url' ? '✓' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Host: proceed to match setup */}
      {isHost && connected.length > 0 && (
        <div className="mb-3">
          <button
            onClick={() => useGameStore.getState().setPhase('setup')}
            className="w-full py-3 bg-feedback-green hover:bg-feedback-green/80 text-white font-bold rounded-xl transition-all active:scale-[0.98]"
          >
            开始配置比赛 ({connected.length}人已连接)
          </button>
        </div>
      )}

      {/* Cancel */}
      <button
        onClick={() => cleanup()}
        className="px-6 py-2 text-surface-400 hover:text-red-400 text-xs border border-surface-700 hover:border-red-700 rounded-xl transition-all"
      >
        取消
      </button>
    </div>
  );
}
