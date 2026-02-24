import { useCallback, useState } from 'react'
import { getApiKey, setApiKey } from '../api'

interface ApiKeyInputProps {
  onKeySet: () => void
}

export function ApiKeyInput({ onKeySet }: ApiKeyInputProps) {
  const [key, setKey] = useState(getApiKey() ?? '')
  const [saved, setSaved] = useState(!!getApiKey())

  const handleSave = useCallback(() => {
    if (!key.trim()) return
    setApiKey(key.trim())
    setSaved(true)
    onKeySet()
  }, [key, onKeySet])

  return (
    <div className="rounded-xl border border-zinc-700/50 bg-zinc-900/50 p-4">
      <div className="flex items-center gap-3">
        <input
          type="password"
          value={key}
          onChange={(e) => {
            setKey(e.target.value)
            setSaved(false)
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          placeholder="sk_live_..."
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 font-mono text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-indigo-500"
        />
        <button
          onClick={handleSave}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
            saved
              ? 'bg-emerald-600/20 text-emerald-400'
              : 'bg-indigo-600 text-white hover:bg-indigo-500'
          }`}
        >
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
      <p className="mt-2 text-xs text-zinc-600">
        Hyperbolic API key - stored in localStorage only, never sent to any
        server except api.hyperbolic.xyz
      </p>
    </div>
  )
}
