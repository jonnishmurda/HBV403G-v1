import './style.css'
import './lib/html.js'
import data from '../data/index.json'

let html = ``;

/**
 * validData siktar út ógild gögn
 * leyfir ekki bókstafinn "ó" og því siktar það út gögnin
 * aðstoð hjá GPT
 */

try {
  const validData = data.filter(
    (item) =>
      item.title &&
      typeof item.title === 'string' &&
      item.file &&
      typeof item.file === 'string' &&
      /\.json$/.test(item.file) &&
      /^[a-zA-Z0-9]+$/.test(item.title)
  );

  for (let i = 0; i < validData.length; i++) {
    html += `<li><a href="/pages/${validData[i].file.replace('.json', '.html')}">${validData[i].title.toUpperCase()}</a></li>`;
  }
} catch {
  console.error('Ekki tókst að sækja gögn');
  html += `Gögn birtust ekki`;
}

let ld = ``

document.querySelector('#app').innerHTML = `
  <main>
    <header class="header">
      <h1>Verkefni 1</h1>
      </header>
      <section class="indexContent">
      <div class="text">
        <p>Velkomin/n á spurningalistasíðuna</p>
        <p>Smelltu á flokk til að svara spurningum</p>
      </div>
    <ul>
      ${html}
    </ul>
    </section>
  </main>
`;
