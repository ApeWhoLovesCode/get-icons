export interface AbstractNode {
  tag: string;
  attrs: {
    [key: string]: string;
  };
  children?: AbstractNode[];
}

export interface IconDefinition {
  name: string; // kebab-case-style
  theme: ThemeType;
  icon:
    | ((primaryColor: string, secondaryColor: string) => AbstractNode)
    | AbstractNode;
}

export type ThemeType = 'linear' | 'surface'  | 'twotone';
export type ThemeTypeUpperCase = 'Linear' | 'Surface' | 'TwoTone';
