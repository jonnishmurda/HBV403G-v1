import data from '../../data/html.json'
import '../style.css'

let html = ``;

let answerCheck = ``;

function checkCorrect (e, isCorrect){

}

try {
  for (let i = 0; i < data.questions.length; i++) {
    const obj = data.questions[i]
    if (obj.question && obj.answers) {
      html += `
      <h3>${transform(obj.question)}</h3>
      <ul>
        ${obj.answers.map(answer => `
          <li>
            <button class="answer"
            onClick="checkCorrect(e, ${answer.correct})">${transform(answer.answer)}</button>
          </li>
        `).join('')}
      </ul>
      `
    }
  }

} catch {
  console.error('Ekki tókst að sækja spurningar');
}

// aðstoð frá GPT
function transform(string) {
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


document.querySelector('#app').innerHTML = `
  <main>
    <header class="header">
      <h1>Verkefni 1</h1>
    </header>
    <div class="backBtn"><a href="/">Aftur á forsíðu</a></div>
    <section class="htmlContent">
        <h1>${data.title}</h1>
        <div class"quiz">
            ${html}
        </div>
    </section>
  </main>
`;
