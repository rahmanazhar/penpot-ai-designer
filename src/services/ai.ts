interface AIResponse {
  design: {
    layout: string;
    elements: Array<{
      type: string;
      properties: Record<string, any>;
    }>;
    style: {
      colors: string[];
      typography: {
        headings: string;
        body: string;
      };
      spacing: {
        padding: number;
        gap: number;
      };
    };
  };
}

export class AIService {
  private apiKey: string | null = null;
  private static instance: AIService;

  private constructor() {}

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('openrouter_api_key', key);
  }

  getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem('openrouter_api_key');
    }
    return this.apiKey;
  }

  async generateDesign(params: {
    type: string;
    style: string;
    colorScheme: string;
    description?: string;
  }): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('API key not set');
    }

    const prompt = `Generate a detailed design specification for a ${params.type} with a ${params.style} style and ${params.colorScheme} color scheme.
    ${params.description ? `Additional requirements: ${params.description}` : ''}
    
    The design should include:
    1. Layout structure and hierarchy
    2. Color palette
    3. Typography choices
    4. Component specifications
    5. Spacing and alignment rules
    
    Format the response as a JSON object with the following structure:
    {
      "design": {
        "layout": "description of the overall layout",
        "elements": [
          {
            "type": "component type",
            "properties": {
              // component-specific properties
            }
          }
        ],
        "style": {
          "colors": ["list of hex colors"],
          "typography": {
            "headings": "font family",
            "body": "font family"
          },
          "spacing": {
            "padding": number,
            "gap": number
          }
        }
      }
    }`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
        },
        body: JSON.stringify({
          model: 'anthropic/claude-2',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1500,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate design');
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      try {
        // Extract JSON from the response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON found in response');
        }
        return JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.error('Failed to parse AI response:', e);
        throw new Error('Invalid AI response format');
      }
    } catch (error) {
      console.error('AI generation error:', error);
      throw error;
    }
  }
}

export const aiService = AIService.getInstance();
