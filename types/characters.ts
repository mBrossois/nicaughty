export const characters = [
    'baller', 
    'candela', 
    'cane', 
    'hattie', 
    'jingley', 
    'snowflaker', 
    'socku', 
    'treet'
] as const;

export type Characters = typeof characters[number];
