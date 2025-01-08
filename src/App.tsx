import { useState } from 'react';
import './App.css';
import { DesignParams } from './types';
import { generateLayoutElements, ColorPalette } from './layoutGenerator';

function App() {
  const url = new URL(window.location.href);
  const initialTheme = url.searchParams.get('theme');

  const [theme, setTheme] = useState(initialTheme || null);
  const [isGenerating, setIsGenerating] = useState(false);
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
    setIsGenerating(true);
    const penpot = window.penpot;
    try {
      // Create a new page in Penpot
      const page = await penpot.pages.create({
        name: `AI Generated ${designParams.type}`
      });

      // Add basic layout based on design type
      const frame = await penpot.frames.create({
        name: 'Main Frame',
        width: designParams.type === 'mobile-app' ? 375 : 1440,
        height: designParams.type === 'mobile-app' ? 812 : 900,
      });

      // Generate color palette based on color scheme
      const colors = getColorPalette(designParams.colorScheme);

      // Create design elements based on type and style
      await generateLayoutElements(frame, designParams, colors);

      setIsGenerating(false);
      penpot.notify.info('Design generated successfully!');
    } catch (error) {
      console.error('Error generating design:', error);
      penpot.notify.error('Failed to generate design');
      setIsGenerating(false);
    }
  };

  const getColorPalette = (scheme: string): ColorPalette => {
    switch (scheme) {
      default:
      case 'light':
        return {
          primary: '#2563eb',
          background: '#ffffff',
          text: '#1f2937',
          accent: '#3b82f6'
        };
      case 'dark':
        return {
          primary: '#3b82f6',
          background: '#111827',
          text: '#f3f4f6',
          accent: '#60a5fa'
        };
      case 'colorful':
        return {
          primary: '#8b5cf6',
          background: '#ffffff',
          text: '#1f2937',
          accent: '#ec4899'
        };
    }
  };

  return (
    <div data-theme={theme} className="p-4">
      <h1 className="text-xl font-bold mb-4">AI Design Generator</h1>
      
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

        <button
          onClick={generateDesign}
          disabled={isGenerating}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isGenerating ? 'Generating...' : 'Generate Design'}
        </button>
      </div>
    </div>
  );
}

export default App;
