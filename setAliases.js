const fs = require("fs");

const isProduction = process.env.NODE_ENV === "production";
const aliases = isProduction ? { "@": "dist" } : { "@": "src" };

// Read package.json
const packageJsonPath = "./package.json";
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());

// Set aliases
packageJson._moduleAliases = aliases;

// Write back to package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Aliases set for ${isProduction ? "production" : "development"}`);
