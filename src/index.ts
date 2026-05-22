import { tokenize } from "./lexer.js";
import { parse } from "./parser.js";
import { interpret } from "./interpreter.js";
import * as fs from "fs/promises";

const wait = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};  

async function runEngine() {
  try {
  
    const rawCode = await fs.readFile("./scripts/dataforge.script", "utf-8");

    console.log("[DataForge Engine] Initializing schema structure...");
    await wait(1500); // 1.5 second pause
    
    console.log("[DataForge Engine] Stream capacity constraint bound to: 500");
    await wait(1500); // 1.5 second pause
    
    console.log("[DataForge Engine] Thread block initiated. Execution throttling active...");
    await wait(2000); // 2 second pause 
    
    console.log("[DataForge Engine] Data extraction stream pipeline opened. Exporting target sequence...\n");

  
    const tokens = tokenize(rawCode);
    const ast = parse(tokens);
    await interpret(ast);

  } catch (error: any) {
    console.error(`\n❌ DATA FORGE ENGINE CRASHED:\n${error.message}\n`);
  }
}

runEngine();