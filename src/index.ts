import { tokenize } from "./lexer.js";
import { parse } from "./parser.js";
import { interpret } from "./interpreter.js";
import * as fs from "fs/promises";

// 1. The progress bar animation utility function
const progressBar = async (message: string, durationMS: number) => {
  const totalSteps = 20;
  const stepTime = durationMS / totalSteps;
  
  for (let i = 0; i <= totalSteps; i++) {
    const percentage = Math.round((i / totalSteps) * 100);
    const filled = "█".repeat(i);
    const empty = "░".repeat(totalSteps - i);
    
    // '\r' moves the cursor back to the start of the line to overwrite it
    process.stdout.write(`\r[DataForge Engine] ${message} [${filled}${empty}] ${percentage}%`);
    
    await new Promise(resolve => setTimeout(resolve, stepTime));
  }
  process.stdout.write('\n'); // Moves to a clean newline when this specific bar finishes
};

async function runEngine() {
  try {
    const rawCode = await fs.readFile("./scripts/dataforge.script", "utf-8");

    // 2. Your logs updated with active loading animations!
    console.log("[DataForge Engine] Initializing schema structure...");
    await progressBar("Loading pipeline modules      ", 1500); // 1.5s progress bar
    
    console.log("[DataForge Engine] Stream capacity constraint bound to: 500");
    await progressBar("Throttling thread blocks       ", 1500); // 1.5s progress bar
    
    console.log("[DataForge Engine] Thread block initiated. Execution throttling active...");
    await progressBar("Opening data extraction stream ", 2000); // 2.0s progress bar
    
    console.log("[DataForge Engine] Data extraction stream pipeline opened. Exporting target sequence...\n");

    // 3. Run the actual interpreter pipeline
    const tokens = tokenize(rawCode);
    const ast = parse(tokens);
    await interpret(ast);

  } catch (error: any) {
    console.error(`\n❌ DATA FORGE ENGINE CRASHED:\n${error.message}\n`);
  }
}

runEngine();