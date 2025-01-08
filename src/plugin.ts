import type { PluginMessageEvent } from './model';
import type { Penpot } from './types';

declare global {
  interface Window {
    penpot: Penpot;
  }
}

const penpot = window.penpot;

penpot.ui.open('AI Design Generator', `?theme=${penpot.theme}`);

penpot.on('themechange', (theme) => {
  sendMessage({ type: 'theme', content: theme });
});

function sendMessage(message: PluginMessageEvent) {
  penpot.ui.sendMessage(message);
}

export {};
