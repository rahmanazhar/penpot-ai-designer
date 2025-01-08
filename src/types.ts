export interface DesignParams {
  type: 'landing-page' | 'dashboard' | 'mobile-app';
  style: 'minimal' | 'modern' | 'classic';
  colorScheme: 'light' | 'dark' | 'colorful';
}

export interface PluginMessageEvent {
  type: string;
  content: any;
}

export interface PenpotFrame {
  id: string;
  width: number;
  height: number;
}

export interface PenpotShape {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  content?: string;
  fontSize?: number;
  fontWeight?: string;
}

export interface Penpot {
  pages: {
    create: (params: { name: string }) => Promise<{ id: string }>;
  };
  frames: {
    create: (params: {
      name: string;
      width: number;
      height: number;
    }) => Promise<PenpotFrame>;
  };
  shapes: {
    createRect: (params: {
      frame: string;
      x: number;
      y: number;
      width: number;
      height: number;
      fill?: string;
    }) => Promise<PenpotShape>;
    createText: (params: {
      frame: string;
      x: number;
      y: number;
      width: number;
      height: number;
      content?: string;
      fontSize?: number;
      fontWeight?: string;
      fill?: string;
    }) => Promise<PenpotShape>;
  };
  notify: {
    info: (message: string) => void;
    error: (message: string) => void;
  };
  theme: string;
  ui: {
    open: (title: string, params: string) => void;
    sendMessage: (message: PluginMessageEvent) => void;
  };
  on: (event: string, callback: (data: any) => void) => void;
}

declare global {
  interface Window {
    penpot: Penpot;
  }
}
