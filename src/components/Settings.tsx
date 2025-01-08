import { useState, useEffect } from 'react';
import { aiService } from '../services/ai';

export function Settings({ onClose }: { onClose: () => void }) {
  const [apiKey, setApiKey] = useState(aiService.getApiKey() || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      aiService.setApiKey(apiKey);
      onClose();
    } catch (err) {
      setError('Failed to save API key');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="settings-panel">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-2">OpenRouter API Key</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your OpenRouter API key"
          />
          <p className="text-sm mt-1 text-gray-600">
            Get your API key from{' '}
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              OpenRouter
            </a>
          </p>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !apiKey}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
