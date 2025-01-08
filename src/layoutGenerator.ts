import { DesignParams } from './types';

export interface ColorPalette {
  primary: string;
  background: string;
  text: string;
  accent: string;
}

interface LayoutElement {
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

export async function generateLayoutElements(
  frame: any,
  params: DesignParams,
  colors: ColorPalette
) {
  const elements: LayoutElement[] = [];

  switch (params.type) {
    case 'landing-page':
      elements.push(
        // Hero section
        {
          type: 'rectangle',
          x: 0,
          y: 0,
          width: frame.width,
          height: 600,
          fill: colors.background
        },
        // Hero text
        {
          type: 'text',
          x: frame.width * 0.1,
          y: 100,
          width: frame.width * 0.5,
          height: 120,
          content: 'Welcome to Our Platform',
          fontSize: 48,
          fontWeight: 'bold'
        }
      );
      break;

    case 'dashboard':
      elements.push(
        // Sidebar
        {
          type: 'rectangle',
          x: 0,
          y: 0,
          width: 250,
          height: frame.height,
          fill: colors.primary
        },
        // Main content area
        {
          type: 'rectangle',
          x: 250,
          y: 0,
          width: frame.width - 250,
          height: frame.height,
          fill: colors.background
        }
      );
      break;

    case 'mobile-app':
      elements.push(
        // Status bar
        {
          type: 'rectangle',
          x: 0,
          y: 0,
          width: frame.width,
          height: 44,
          fill: colors.background
        },
        // Navigation bar
        {
          type: 'rectangle',
          x: 0,
          y: frame.height - 83,
          width: frame.width,
          height: 83,
          fill: colors.background
        }
      );
      break;
  }

  const penpot = window.penpot;

  // Create elements in Penpot
  for (const element of elements) {
    if (element.type === 'rectangle') {
      await penpot.shapes.createRect({
        frame: frame.id,
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
        fill: element.fill
      });
    } else if (element.type === 'text') {
      await penpot.shapes.createText({
        frame: frame.id,
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
        content: element.content,
        fontSize: element.fontSize,
        fontWeight: element.fontWeight,
        fill: colors.text
      });
    }
  }
}
