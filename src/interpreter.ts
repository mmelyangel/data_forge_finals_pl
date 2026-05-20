import type { Program, ASTNode } from "./types.js";

export class DataForgeInterpreter {
  // Map to store simulated database states, variables, or configurations
  private environment: Map<string, any> = new Map();

  /**
   * Main entry point to execute a parsed DataForge Program AST
   */
  public interpret(program: Program): void {
    for (const node of program.body) {
      if (node.type === "Command") {
        this.executeCommand(node);
      } else {
        throw new Error(`DataForge Runtime Error: Unknown AST Node type encountered.`);
      }
    }
  }

  /**
   * Decodes and executes individual pipeline commands
   */
  private executeCommand(node: ASTNode): void {
    const { keyword, arguments: args, line } = node;

    switch (keyword) {
      case "CREATE":
        // Example: CREATE "UserTable";
        if (args.length < 1) {
          throw new Error(`DataForge Runtime Error at line ${line}: CREATE command requires at least 1 argument.`);
        }
        const tableName = args[0];
        if (typeof tableName !== "string") {
          throw new Error(`DataForge Runtime Error at line ${line}: CREATE command requires a string table name.`);
        }
        this.environment.set(tableName, { fields: {}, data: [] });
        console.log(`[DataForge Engine] Successfully initialized schema structure: "${tableName}"`);
        break;

      case "FIELD":
        // Example: FIELD "username" "STRING";
        if (args.length < 2) {
          throw new Error(`DataForge Runtime Error at line ${line}: FIELD command requires a field name and a data type.`);
        }
        console.log(`[DataForge Engine] Added metadata constraint -> Field: '${args[0]}', Type: '${args[1]}'`);
        break;

      case "MOCK":
        // Example: MOCK 100;
        if (args.length < 1) {
          throw new Error(`DataForge Runtime Error at line ${line}: MOCK command requires a target quantity.`);
        }
        console.log(`[DataForge Engine] Mock generation pipeline ready for ${args[0]} records.`);
        break;

      case "QUANTITY":
        // Example: QUANTITY 500;
        if (args.length < 1) {
          throw new Error(`DataForge Runtime Error at line ${line}: QUANTITY command expects a numeric assignment.`);
        }
        console.log(`[DataForge Engine] Stream capacity constraint bound to: ${args[0]}`);
        break;

      case "EXPORT":
        // Example: EXPORT "json" AS "output_file";
        console.log(`[DataForge Engine] Data extraction stream pipeline opened. Exporting target sequence...`);
        break;

      case "AS":
        // Handled contextually alongside EXPORT/MOCK if parsing arrays together,
        // otherwise executed as a binding declaration link.
        console.log(`[DataForge Engine] Alias link bound to parameter context: ${args.join(", ")}`);
        break;

      case "WAIT":
        // Example: WAIT 500ms;
        if (args.length < 1) {
          throw new Error(`DataForge Runtime Error at line ${line}: WAIT command requires a duration parameter.`);
        }
        console.log(`[DataForge Engine] Thread block initiated. Execution throttling active for: ${args[0]}`);
        break;

      case "LOG":
        // Example: LOG "Pipeline execution complete";
        console.log(`[DataForge User Log Line ${line}]:`, ...args);
        break;

      default:
        throw new Error(
          `DataForge Runtime Error at line ${line}: System keyword '${keyword}' is recognized by the lexer rules but lacks a runtime implementation.`
        );
    }
  }
}

/**
 * High-level wrapper function to quickly invoke interpretation sequences
 */
export function interpret(program: Program): void {
  const interpreter = new DataForgeInterpreter();
  interpreter.interpret(program);
}