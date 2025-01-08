import { useState } from 'react';
import './App.css';
import { DesignParams } from './types';
import { generateLayoutElements } from './layoutGenerator';
import { Settings } from './components/Settings';
import { aiService } from './services/ai';

function App() {
  const url = new URL(window.location.href);
  const initialTheme = url.searchParams.get('theme');

  const [theme, setTheme] = useState(initialTheme || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(!aiService.getApiKey());
  const [error, setError] = useState<string | null>(null);
  const [designParams, setDesignParams] = useState<DesignParams>({
    type: 'landing-page',
    style: 'modern',
    colorScheme: 'light'
  });

  window.addEventListener('message', (event) => {
    if (event.data.type === 'theme') {
      setTheme(event.data.content);
    }
  });

  const generateDesign = async () => {
    if (!aiService.getApiKey()) {
      setShowSettings(true);
      return;
    }

    setIsGenerating(true);
    setError(null);
    const penpot = window.penpot;

    try {
      // Generate design using AI
      const aiResponse = await aiService.generateDesign({
        type: designParams.type,
        style: designParams.style,
        colorScheme: designParams.colorScheme
      });

      // Create a new page in Penpot
      const _page = await penpot.pages.create({
        name: `AI Generated ${designParams.type}`
      });

      // Add basic layout based on design type
      const frame = await penpot.frames.create({
        name: 'Main Frame',
        width: designParams.type === 'mobile-app' ? 375 : 1440,
        height: designParams.type === 'mobile-app' ? 812 : 900,
      });

      // Apply AI-generated design
      await generateLayoutElements(frame, designParams, {
        primary: aiResponse.design.style.colors[0],
        background: aiResponse.design.style.colors[1],
        text: aiResponse.design.style.colors[2],
        accent: aiResponse.design.style.colors[3]
      });

      setIsGenerating(false);
      penpot.notify.info('Design generated successfully!');
    } catch (error) {
      console.error('Error generating design:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate design');
      setIsGenerating(false);
    }
  };

  return (
    <div data-theme={theme} className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Penpot AI Designer</h1>
        <button
          onClick={() => setShowSettings(true)}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
        >
          Settings
        </button>
      </div>
      
      {showSettings ? (
        <Settings onClose={() => setShowSettings(false)} />
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Design Type</label>
            <select
              value={designParams.type}
              onChange={(e) => setDesignParams({
                ...designParams,
                type: e.target.value as DesignParams['type']
              })}
              className="w-full p-2 border rounded"
            >
              <option value="landing-page">Landing Page</option>
              <option value="dashboard">Dashboard</option>
              <option value="mobile-app">Mobile App</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Style</label>
            <select
              value={designParams.style}
              onChange={(e) => setDesignParams({
                ...designParams,
                style: e.target.value as DesignParams['style']
              })}
              className="w-full p-2 border rounded"
            >
              <option value="minimal">Minimal</option>
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Color Scheme</label>
            <select
              value={designParams.colorScheme}
              onChange={(e) => setDesignParams({
                ...designParams,
                colorScheme: e.target.value as DesignParams['colorScheme']
              })}
              className="w-full p-2 border rounded"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="colorful">Colorful</option>
            </select>
          </div>

          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
              {error}
            </div>
          )}

          <button
            onClick={generateDesign}
            disabled={isGenerating}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate Design'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
