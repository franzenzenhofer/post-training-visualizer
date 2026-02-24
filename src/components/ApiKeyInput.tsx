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
    <div className="rounded border border-[#a2a9b1] bg-[#f8f9fa] p-3">
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
          className="flex-1 rounded border border-[#a2a9b1] bg-white px-3 py-1.5 font-mono text-sm text-[#202122] placeholder-[#72777d] outline-none focus:border-[#3366cc]"
        />
        <button
          onClick={handleSave}
          className={`rounded px-4 py-1.5 text-sm font-bold transition-all ${
            saved
              ? 'border border-[#14866d] bg-[#d5fdf4] text-[#14866d]'
              : 'border border-[#3366cc] bg-[#3366cc] text-white hover:bg-[#2a4b8d]'
          }`}
        >
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
      <p className="mt-2 text-xs text-[#72777d]">
        Hyperbolic API key — stored in localStorage only, never sent anywhere except api.hyperbolic.xyz
      </p>
    </div>
  )
}
