import { useConnectionStore } from '../stores/connectionStore';
import { useMatchStore } from '../stores/matchStore';
import { sendMatchConfig } from '../p2p/connection';

const BO_OPTIONS = [1, 2, 3, 5];

export function SetupScreen() {
  const isHost = useConnectionStore((s) => s.isHost);
  const format = useMatchStore((s) => s.format);
  const setFormat = useMatchStore((s) => s.setFormat);

  return (
    <div className="w-full max-w-md text-center">
      <h2 className="text-2xl font-bold text-white mb-2">比赛设置</h2>
      <p className="text-surface-400 mb-6 text-sm">抢N赛制 · 率先赢得N局者获胜</p>

      {isHost ? (
        <>
          <p className="text-surface-400 mb-6">选择目标胜场</p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {BO_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => setFormat(n)}
                className={`py-4 rounded-xl font-bold text-lg transition-all ${
                  format === n
                    ? 'bg-feedback-green text-white'
                    : 'bg-surface-800 text-surface-300 hover:bg-surface-700 border border-surface-600'
                }`}
              >
                抢{n}
              </button>
            ))}
          </div>
          <button
            onClick={() => sendMatchConfig(format)}
            className="w-full py-4 bg-feedback-green hover:bg-feedback-green/80 text-white font-bold text-lg rounded-xl transition-all active:scale-[0.98]"
          >
            开始比赛
          </button>
        </>
      ) : (
        <div className="space-y-4">
          <div className="bg-surface-800 rounded-xl p-6 border border-surface-600">
            <div className="w-6 h-6 rounded-full border-2 border-feedback-yellow border-t-transparent animate-spin mx-auto mb-3" />
            <p className="text-surface-400">等待房主配置比赛...</p>
          </div>
        </div>
      )}
    </div>
  );
}
