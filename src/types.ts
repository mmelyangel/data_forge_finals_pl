export type TokenType = 'KEYWORD' | 'IDENTIFIER' | 'NUMBER' | 'TIME_LITERAL' | 'STRING' | 'OPERATOR' | 'SYMBOL' | 'EOF';

export interface Token {
  type: string;
  value: string;
  line: number;
}
export interface ASTNode {
  type: "Command";
  keyword: string;
  arguments: (string | number)[];
  line: number;
}

export interface Program {
  type: "Program";
  body: ASTNode[];
}