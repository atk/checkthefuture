import { Component, createResource, For } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

const articles = [
  { type: "Biete", title: "Nissan Skyline GTR R-34", img: "angebot.jpg", text: "Dieser wagen der Marke Nissan hat 280PS und kann maximal 180KM/h schnell fahren. Dieses Modell ist erst 75.068KM weit gefahren und wurde 2001 gebaut.\nUrsprünglich hat dieses Auto ca. 100.000 Geld gekostet." },
  { type: "Suche", title:"Fußball", img: "Fussball.webp", text:"Ein Fußball im guten zustand"}
];
const loadArticles = () => new Promise<typeof articles>((resolve) => {
  setTimeout(() => resolve(articles), 500);
});

const App: Component = () => {
  const [articleData] = createResource(loadArticles);
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="Carl-Benz Gesamtschule" />
        <h1>Tauschportal</h1>
      </header>
      <main class={styles.main}>
        <p>
          Herzlich Willkommen zum Tauschportal der CBG-Wörth!
          Dieses nicht kommerzielles Angebot richtet sich alleine an die Schülerinnen und Schüler der CBG-Wörth.
        </p>

        <For each={articleData()} fallback={"Loading..."}>
          {(article) => (<article>
            <h2>{article.type}: {article.title}</h2>
            <img src={`src/assets/${article.img}`} />
            <p>
              {article.text}
            </p> 
          </article>)}
        </For>
        
        <section class={styles.form}>
          <input type="radio" name="art" value="Biete" id="biete" checked />
          <label for="biete">Biete</label>
          <input type="radio" name="art" value="Suche" id="suche" />
          <label for="suche">Suche</label>
          <br />
          <label for="title">Überschrift</label>
          <input type="text" id="title" />
          <br />
          <label for="pic">Bild (optional)</label>
          <input type="file" id="pic" />
          <br />
          <label for="desc">Beschreibung</label>
          <textarea id="desc"></textarea>
          <br />
          <button>Angebot erstellen</button>
        </section>
      </main>
    </div>
  );
};

export default App;
