import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ignoredDirectories = new Set(['.git', 'node_modules', 'demos']);
const textExtensions = new Set(['.md', '.mdx', '.json', '.js', '.mjs', '.ts', '.tsx', '.jsx', '.css', '.html', '.yml', '.yaml', '.toml', '.env', '.txt']);
const secretPatterns = [
  /sk-[A-Za-z0-9]{20,}/g,
  /(?:AI_302_API_KEY|OPENAI_API_KEY|ANTHROPIC_API_KEY|ELEVENLABS_API_KEY)\s*[:=]\s*['"]?sk-[A-Za-z0-9]{20,}/gi,
  /Bearer\s+sk-[A-Za-z0-9]{20,}/gi,
];

const findings = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(filePath);
      continue;
    }
    if (!textExtensions.has(path.extname(entry.name).toLowerCase()) && entry.name !== '.env.example') continue;
    const text = fs.readFileSync(filePath, 'utf8');
    for (const pattern of secretPatterns) {
      // Global regexes keep lastIndex between files, so reset before each test.
      pattern.lastIndex = 0;
      if (pattern.test(text)) {
        findings.push(path.relative(root, filePath));
        break;
      }
    }
  }
}

walk(root);

if (findings.length > 0) {
  console.error('Potential credentials found in:');
  for (const file of findings) console.error(`- ${file}`);
  process.exit(1);
}

console.log('No obvious provider credentials found in tracked text files.');
