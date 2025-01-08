import type { PluginMessageEvent } from './types';

const penpot = window.penpot;

// Initialize plugin UI
penpot.ui.open('Penpot AI Designer', `?theme=${penpot.theme}`);

// Handle theme changes
penpot.on('themechange', (theme) => {
  sendMessage({ type: 'theme', content: theme });
});

// Handle messages from UI
penpot.on('message', (message) => {
  if (message.type === 'ready') {
    // UI is ready to receive messages
    console.log('Plugin UI ready');
  }
});

function sendMessage(message: PluginMessageEvent) {
  penpot.ui.sendMessage(message);
}

export {};
