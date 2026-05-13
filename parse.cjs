const fs = require('fs');

const data = fs.readFileSync('./11번가 마케터 매칭.txt', 'utf-8');
const lines = data.split('\n').filter(l => l.trim().length > 0);
// skip header
lines.shift();

const mapping = {};
for (const line of lines) {
  const [id, name, team] = line.split(',');
  if (id && name && team) {
    mapping[id.trim()] = {
      name: name.trim(),
      team: team.trim(),
    };
  }
}

const fileContent = `export interface MarketerInfo {
  name: string;
  team: string;
}

export const MARKETER_MAPPING: Record<string, MarketerInfo> = ${JSON.stringify(mapping, null, 2)};
`;

fs.writeFileSync('./src/data/marketerMapping.ts', fileContent);
console.log('Done');
