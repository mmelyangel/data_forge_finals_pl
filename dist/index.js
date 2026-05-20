// index.ts
import { tokenize } from "./lexer.js";
import { parse } from "./parser.js";
import { interpret } from "./interpreter.js";
import * as fs from "fs/promises";
async function runEngine() {
    try {
        const rawCode = await fs.readFile("./scripts/dataforge.script", "utf-8");
        const tokens = tokenize(rawCode);
        const ast = parse(tokens);
        await interpret(ast);
    }
    catch (error) {
        console.error(`\n❌ DATA FORGE ENGINE CRASHED:\n${error.message}\n`);
    }
}
runEngine();
