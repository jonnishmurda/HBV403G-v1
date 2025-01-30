import data from '../../data/js.json'
import '../style.css'

let html = ``;



function checkCorrect(e, isCorrect) {
  const parent = e.target.closest('ul');
  const buttons = parent.querySelectorAll('button');
  buttons.forEach(button => button.disabled = true);

  if (isCorrect) {
    e.target.style.backgroundColor = 'green';
    e.target.style.color = 'white'
    e.target.style.boxShadow = '#000 5px 5px'
  } else {
    e.target.style.backgroundColor = 'red';
    e.target.style.color = 'white'
    e.target.style.boxShadow = '#000 5px 5px'
  }
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
            onclick="checkCorrect(event, ${answer.correct})">${transform(answer.answer)}</button>
          </li>
        `).join('')}
      </ul>
      `
    } else {
      console.log(obj[i] + 'birtist ekki')
    }
  }
} catch {
  console.error('ekki tókst að birta allar spurningar');
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
    <section class="content">
        <h1>${data.title}</h1>
        <div class="quiz">
            ${html}
        </div>
    </section>
  </main>
`;

window.checkCorrect = checkCorrect;