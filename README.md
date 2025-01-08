# Penpot AI Designer

A Penpot plugin that leverages AI to automatically generate professional designs. This plugin uses Claude (via OpenRouter) to create intelligent, context-aware layouts for various design types.

## Features

### AI-Powered Design Generation
- Intelligent layout creation based on design type and requirements
- Dynamic component placement and styling
- Color scheme generation and application
- Typography and spacing recommendations

### Design Types
- **Landing Pages**: Professional hero sections, CTAs, and content layouts
- **Dashboards**: Functional layouts with sidebars, navigation, and content grids
- **Mobile Apps**: Mobile-optimized designs with proper navigation and components

### Style Variations
- **Minimal**: Clean, spacious layouts with essential elements
- **Modern**: Contemporary designs with subtle shadows and rounded corners
- **Classic**: Traditional layouts with formal structure

### Color Schemes
- **Light**: Professional light themes with subtle contrasts
- **Dark**: Modern dark themes for enhanced visibility
- **Colorful**: Vibrant color combinations for engaging designs

## Technical Stack

- TypeScript/JavaScript
- React for UI components
- Penpot Plugin API
- OpenRouter API (Claude AI)
- Vite for building

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/penpot-ai-designer.git
cd penpot-ai-designer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

1. **API Key Setup**
   - Get an API key from [OpenRouter](https://openrouter.ai/keys)
   - Click the Settings button in the plugin
   - Enter your API key

2. **Generate Designs**
   - Select your desired design type (Landing Page, Dashboard, or Mobile App)
   - Choose a style (Minimal, Modern, or Classic)
   - Pick a color scheme (Light, Dark, or Colorful)
   - Click "Generate Design"

3. **Customize Results**
   - The generated design will appear as a new page in Penpot
   - All elements are fully editable
   - Adjust colors, typography, and layout as needed

## Project Structure

```
src/
├── components/         # React components
│   └── Settings.tsx   # Settings panel component
├── services/
│   └── ai.ts          # AI service integration
├── App.tsx            # Main application component
├── plugin.ts          # Penpot plugin initialization
├── layoutGenerator.ts # Layout generation logic
└── types.ts          # TypeScript type definitions
```

## Development

### Building
```bash
npm run build
```

### Linting
```bash
npm run lint
```

### Preview
```bash
npm run preview
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Penpot](https://penpot.app) - The open-source design & prototyping platform
- [OpenRouter](https://openrouter.ai) - AI model API provider
- [Anthropic](https://anthropic.com) - Creators of Claude AI

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
