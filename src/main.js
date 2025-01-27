import './style.css'
import data from '../data/index.json'

let html = ``

const validData = data.filter(
  (item => item.title && typeof item.title === 'string' && item.file && typeof item.file === 'string')
);

for (let i = 0; i < validData.length; i++) {
  html += `<li><a href="/pages/${data[i].file?.replace('.json', '.html')}">${validData[i].title?.toUpperCase()}</a></li>`
}

document.querySelector('#app').innerHTML = `
  <main>
    <header>
      <h1>Verkefni 1</h1>
      <p>Velkomin/n á spurningalistasíðuna</p>
    </header>
    <section class="questions">
    <ul>
      ${html}
    </ul>
    </section>
  </main>
`

