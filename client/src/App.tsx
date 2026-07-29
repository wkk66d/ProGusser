import { useGameStore } from './stores/gameStore';
import { useConnectionStore } from './stores/connectionStore';
import { HomeScreen } from './components/HomeScreen';
import { Lobby } from './components/Lobby';
import { SetupScreen } from './components/SetupScreen';
import { GameScreen } from './components/GameScreen';
import { MatchEnd } from './components/MatchEnd';

export default function App() {
  const phase = useGameStore((s) => s.phase);
  const status = useConnectionStore((s) => s.status);
  const roomCode = useConnectionStore((s) => s.roomCode);
  const remotePeers = useConnectionStore((s) => s.remotePeers);
  const allConnected = remotePeers.length > 0 && remotePeers.every((p) => p.connected);

  if (phase === 'match_end') {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4">
        <MatchEnd />
      </div>
    );
  }

  if (phase === 'playing' || phase === 'round_end') {
    return <GameScreen />;
  }

  if (phase === 'setup') {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4">
        <SetupScreen />
      </div>
    );
  }

  if (status === 'connected' && allConnected && roomCode) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4">
        <SetupScreen />
      </div>
    );
  }

  if (status === 'connected' && roomCode || status === 'connecting' && roomCode) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4">
        <Lobby />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4">
      <HomeScreen />
    </div>
  );
}
