export interface DesignParams {
  type: 'landing-page' | 'dashboard' | 'mobile-app';
  style: 'minimal' | 'modern' | 'classic';
  colorScheme: 'light' | 'dark' | 'colorful';
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
      }) => Promise<{
        id: string;
        width: number;
        height: number;
      }>;
    };
    shapes: {
      createRect: (params: {
        frame: string;
        x: number;
        y: number;
        width: number;
        height: number;
        fill?: string;
      }) => Promise<{ id: string }>;
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
      }) => Promise<{ id: string }>;
    };
    notify: {
      info: (message: string) => void;
      error: (message: string) => void;
    };
    theme: string;
    ui: {
      open: (title: string, params: string) => void;
      sendMessage: (message: any) => void;
    };
    on: (event: string, callback: (data: any) => void) => void;
  };

declare global {
  interface Window {
    penpot: Penpot;
  }
}
