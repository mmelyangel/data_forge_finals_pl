const RULES = [
    { regex: /^\s+/, type: null },
    { regex: /^\/\/.*/, type: null },
    { regex: /^(CREATE|FIELD|MOCK|QUANTITY|EXPORT|AS|WAIT|LOG)\b/, type: 'KEYWORD' },
    { regex: /^[0-9]+ms/, type: 'TIME_LITERAL' },
    { regex: /^[0-9]+(\.[0-9]+)?/, type: 'NUMBER' },
    { regex: /^"[^"]*"/, type: 'STRING' },
    { regex: /^[a-zA-Z_]\w*/, type: 'IDENTIFIER' },
    { regex: /^[=+\-*/]/, type: 'OPERATOR' },
    { regex: /^[;,]/, type: 'SYMBOL' }, // Changed from PUNCTUATION to SYMBOL
];
export function tokenize(rawCode) {
    const tokens = [];
    let currentCode = rawCode;
    let line = 1;
    while (currentCode.length > 0) {
        let matched = false;
        for (const { type, regex } of RULES) {
            const match = currentCode.match(regex);
            if (match) {
                const matchedText = match[0];
                const newlineCount = (matchedText.match(/\n/g) || []).length;
                if (type !== null) {
                    tokens.push({ type: type, value: matchedText, line });
                }
                line += newlineCount;
                currentCode = currentCode.slice(matchedText.length);
                matched = true;
                break;
            }
        }
        if (!matched) {
            throw new Error(`Lexical Error: Unrecognized tsismis format at line ${line}`);
        }
    }
    tokens.push({ type: "EOF", value: "EOF", line });
    return tokens;
}
