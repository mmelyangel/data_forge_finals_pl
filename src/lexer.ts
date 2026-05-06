type TokenType = 'KEYWORD' | 'IDENTIFIER' | 'NUMBER' | 'TIME_LITERAL' | 'STRING' | 'OPERATOR' | 'PUNCTUATION' | 'UNKNOWN';

interface Token {
  type: TokenType;
  value: string;
  line: number;
}

const RULES: { regex: RegExp; type: TokenType | null }[] = [
  { regex: /^\s+/,                                                    type: null },           
  { regex: /^\/\/.*/,                                                 type: null },           
  { regex: /^(CREATE|FIELD|MOCK|QUANTITY|EXPORT|AS|WAIT|LOG)\b/,     type: 'KEYWORD' },
  { regex: /^[0-9]+ms/,                                               type: 'TIME_LITERAL' }, 
  { regex: /^[0-9]+(\.[0-9]+)?/,                                      type: 'NUMBER' },
  { regex: /^"[^"]*"/,                                                type: 'STRING' },
  { regex: /^[a-zA-Z_]\w*/,                                           type: 'IDENTIFIER' },
  { regex: /^[=+\-*/]/,                                               type: 'OPERATOR' },
  { regex: /^[;,]/,                                                   type: 'PUNCTUATION' },  
];