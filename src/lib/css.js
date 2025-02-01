import fs from 'fs';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '../../dist');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

const cssSourcePath = path.join(__dirname, '../../src/style.css');
const cssDestPath = path.join(distPath, 'style.css');
fs.copyFileSync(cssSourcePath, cssDestPath);

const scriptSourcePath = path.join(__dirname, '../../src/lib/checkCorrect.js'); 
const scriptDestPath = path.join(distPath, 'checkCorrect.js');
fs.copyFileSync(scriptSourcePath, scriptDestPath);


const dataPath = path.join(__dirname, '../../data/css.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

let html = ``;


// aðstoðarfall frá GPT til að varpa spurningum rétt
function transformString(string) {
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

try {
  for (let i = 0; i < data.questions.length; i++) {
    const obj = data.questions[i];
    if (obj.question && obj.answers) {
      html += `
            <h3>${transformString(obj.question)}</h3>
            <ul>
                ${obj.answers.map(answer => `
                <li>
                    <button class="answer" data-correct="${answer.correct}">
                       ${transformString(answer.answer)}
                    </button>
                </li>
                `).join('')}
            </ul>
            `;
    }
  }
} catch {
  console.error('Ekki tókst að sækja allar spurningar');
}

const writeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="Verkefni 1" content="Verkefni 1 í vefforritun, spurningalistasíða um HTML, CSS og Javascript, ${data.title} spurningar">
    <title>${data.title} spurningar</title>
    <link rel="stylesheet" href="style.css">
    <script src="checkCorrect.js" defer></script>
</head>
<body>
  <main>
    <header class="header">
      <h1>Verkefni 1</h1>
    </header>
    <div class="backBtn"><a href="/">Aftur á forsíðu</a></div>
    <section class="content">
        <h1>${data.title}</h1>
        <div class="quiz">
            ${html}
        </div>
    </section>
  </main>
</body>

</html>
`

const outputPath = path.join(distPath, 'css.html');
fs.writeFileSync(outputPath, writeHtml, 'utf-8');

console.log(`Tókst að búa til: ${outputPath}`);