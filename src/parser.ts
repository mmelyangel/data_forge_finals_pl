import type { Token, Program, ASTNode } from "./types.js";

export function parse(tokens: Token[]): Program {
  let current = 0;
  const program: Program = { type: "Program", body: [] };

  function advance() {
    current++;
  }

  function peek(): Token {
    // Prevent "Cannot read properties of undefined" crash if tokens run out
    return tokens[current] || { type: "EOF", value: "EOF", line: tokens[tokens.length - 1]?.line || 1 };
  }

  function parseCommand(): ASTNode {
    const token = peek();

    if (token.type !== "KEYWORD") {
      throw new Error(
        `Syntax Error: Expected a Marites Action at line ${token.line}, but got '${token.value}'`,
      );
    }

    const node: ASTNode = {
      type: "Command",
      keyword: token.value,
      arguments: [],
      line: token.line,
    };

    advance(); 

    // Loop until we find a SYMBOL (like ';') or hit EOF
    while (peek().type !== "SYMBOL" && peek().type !== "EOF") {
      const argToken = peek();
      
      if (argToken.type === "NUMBER") {
        node.arguments.push(Number(argToken.value));
      } else if (argToken.type === "STRING") {
        node.arguments.push(argToken.value.replace(/"/g, ""));
      } else if (
        argToken.type === "IDENTIFIER" || 
        argToken.type === "TIME_LITERAL" || 
        argToken.type === "OPERATOR"
      ) {
        // Safe inclusion of alternative arguments produced by the lexer
        node.arguments.push(argToken.value);
      } else {
        throw new Error(
          `Syntax Error: Invalid argument '${argToken.value}' at line ${argToken.line}`,
        );
      }
      advance();
    }

    // Checking for 'SYMBOL' now aligns perfectly with your updated lexer
    if (peek().type !== "SYMBOL" || peek().value !== ";") {
      throw new Error(
        `Syntax Error: Missing semicolon ';' at line ${node.line}. Wag kalimutan ang tuldok!`,
      );
    }

    advance(); // Consume the semicolon ';'
    return node;
  }

  while (current < tokens.length && peek().type !== "EOF") {
    program.body.push(parseCommand());
  }

  return program;
}