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

interface StyleProperties {
  padding: number;
  gap: number;
  borderRadius: number;
  shadowBlur: number;
}

export async function generateLayoutElements(
  frame: any,
  params: DesignParams,
  colors: ColorPalette
) {
  const elements: LayoutElement[] = [];

  // Helper function to generate style-specific variations
  const getStyleProperties = (style: string): StyleProperties => {
    switch (style) {
      case 'minimal':
        return {
          padding: 24,
          gap: 16,
          borderRadius: 4,
          shadowBlur: 0
        };
      case 'modern':
        return {
          padding: 32,
          gap: 24,
          borderRadius: 8,
          shadowBlur: 16
        };
      case 'classic':
        return {
          padding: 40,
          gap: 32,
          borderRadius: 0,
          shadowBlur: 8
        };
      default:
        return {
          padding: 24,
          gap: 16,
          borderRadius: 4,
          shadowBlur: 0
        };
    }
  };

  const styleProps: StyleProperties = getStyleProperties(params.style);

  // Convert AI response to layout elements
  const processAIElements = (aiElements: Array<{ type: string; properties: Record<string, any> }>) => {
    aiElements.forEach(element => {
      switch (element.type) {
        case 'container':
          elements.push({
            type: 'rectangle',
            x: element.properties.x || 0,
            y: element.properties.y || 0,
            width: element.properties.width || frame.width,
            height: element.properties.height || 100,
            fill: element.properties.background || colors.background
          });
          break;
        case 'text':
          elements.push({
            type: 'text',
            x: element.properties.x || 0,
            y: element.properties.y || 0,
            width: element.properties.width || 200,
            height: element.properties.height || 40,
            content: element.properties.content || '',
            fontSize: element.properties.fontSize || 16,
            fontWeight: element.properties.fontWeight || 'normal'
          });
          break;
        case 'button':
          // Button background
          elements.push({
            type: 'rectangle',
            x: element.properties.x || 0,
            y: element.properties.y || 0,
            width: element.properties.width || 120,
            height: element.properties.height || 40,
            fill: element.properties.background || colors.accent
          });
          // Button text
          elements.push({
            type: 'text',
            x: (element.properties.x || 0) + styleProps.padding,
            y: (element.properties.y || 0) + styleProps.padding/2,
            width: (element.properties.width || 120) - styleProps.padding * 2,
            height: (element.properties.height || 40) - styleProps.padding,
            content: element.properties.label || 'Button',
            fontSize: element.properties.fontSize || 14,
            fontWeight: 'bold'
          });
          break;
      }
    });
  };

  // Default layout based on type
  switch (params.type) {
    case 'landing-page':
      // Hero section
      elements.push({
        type: 'rectangle',
        x: 0,
        y: 0,
        width: frame.width,
        height: 600,
        fill: colors.background
      });

      // Navigation bar
      elements.push({
        type: 'rectangle',
        x: 0,
        y: 0,
        width: frame.width,
        height: 80,
        fill: colors.primary
      });

      // Logo text
      elements.push({
        type: 'text',
        x: styleProps.padding,
        y: 24,
        width: 120,
        height: 32,
        content: 'LOGO',
        fontSize: 24,
        fontWeight: 'bold'
      });

      // Hero content container
      elements.push({
        type: 'rectangle',
        x: styleProps.padding,
        y: 120,
        width: frame.width - (styleProps.padding * 2),
        height: 400,
        fill: params.style === 'modern' ? colors.accent + '10' : 'transparent'
      });

      // Hero headline
      elements.push({
        type: 'text',
        x: styleProps.padding,
        y: 160,
        width: frame.width * 0.5,
        height: 120,
        content: 'Transform Your Ideas Into Reality',
        fontSize: params.style === 'classic' ? 56 : 48,
        fontWeight: 'bold'
      });

      // Hero subheadline
      elements.push({
        type: 'text',
        x: styleProps.padding,
        y: 300,
        width: frame.width * 0.4,
        height: 80,
        content: 'Create stunning designs with our AI-powered platform',
        fontSize: 24,
        fontWeight: 'normal'
      });

      // CTA Button
      elements.push({
        type: 'rectangle',
        x: styleProps.padding,
        y: 400,
        width: 200,
        height: 56,
        fill: colors.accent
      });

      elements.push({
        type: 'text',
        x: styleProps.padding + 40,
        y: 415,
        width: 120,
        height: 32,
        content: 'Get Started',
        fontSize: 18,
        fontWeight: 'bold'
      });
      break;

    case 'dashboard':
      const sidebarWidth = params.style === 'minimal' ? 200 : 250;
      
      // Sidebar
      elements.push({
        type: 'rectangle',
        x: 0,
        y: 0,
        width: sidebarWidth,
        height: frame.height,
        fill: params.style === 'modern' ? colors.primary : colors.background
      });

      // Top navigation
      elements.push({
        type: 'rectangle',
        x: sidebarWidth,
        y: 0,
        width: frame.width - sidebarWidth,
        height: 64,
        fill: colors.background
      });

      // Content grid
      const gridItems = 6;
      const gridItemWidth = (frame.width - sidebarWidth - (styleProps.padding * 3)) / 2;
      const itemHeight = 200;

      for (let i = 0; i < gridItems; i++) {
        const row = Math.floor(i / 2);
        const col = i % 2;
        elements.push({
          type: 'rectangle',
          x: sidebarWidth + styleProps.padding + (col * (gridItemWidth + styleProps.padding)),
          y: 80 + styleProps.padding + (row * (itemHeight + styleProps.padding)),
          width: gridItemWidth,
          height: itemHeight,
          fill: params.style === 'modern' ? colors.accent + '10' : colors.background
        });
      }
      break;

    case 'mobile-app':
      // Status bar
      elements.push({
        type: 'rectangle',
        x: 0,
        y: 0,
        width: frame.width,
        height: 44,
        fill: colors.background
      });

      // Header
      elements.push({
        type: 'rectangle',
        x: 0,
        y: 44,
        width: frame.width,
        height: 56,
        fill: colors.background
      });

      // Header title
      elements.push({
        type: 'text',
        x: frame.width / 2 - 50,
        y: 58,
        width: 100,
        height: 32,
        content: 'Home',
        fontSize: 18,
        fontWeight: 'bold'
      });

      // Content cards
      const cardHeight = params.style === 'minimal' ? 100 : 140;
      const cards = 4;

      for (let i = 0; i < cards; i++) {
        elements.push({
          type: 'rectangle',
          x: styleProps.padding,
          y: 120 + (i * (cardHeight + styleProps.gap)),
          width: frame.width - (styleProps.padding * 2),
          height: cardHeight,
          fill: params.style === 'modern' ? colors.accent + '10' : colors.background
        });
      }

      // Navigation bar
      elements.push({
        type: 'rectangle',
        x: 0,
        y: frame.height - 83,
        width: frame.width,
        height: 83,
        fill: colors.background
      });

      // Nav items
      const navItems = ['Home', 'Search', 'Profile', 'Settings'];
      const navItemWidth = frame.width / navItems.length;

      navItems.forEach((item, index) => {
        elements.push({
          type: 'text',
          x: index * navItemWidth,
          y: frame.height - 50,
          width: navItemWidth,
          height: 20,
          content: item,
          fontSize: 12,
          fontWeight: 'normal'
        });
      });
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
