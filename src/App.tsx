import { Component, createResource, For } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

const articles = [
  { type: "Biete", title: "Nissan Skyline GTR R-34", img: "angebot.jpg", text: "Dieser wagen der Marke Nissan hat 280PS und kann maximal 180KM/h schnell fahren. Dieses Modell ist erst 75.068KM weit gefahren und wurde 2001 gebaut.\nUrsprünglich hat dieses Auto ca. 100.000 Geld gekostet." },
  { type: "Suche", title:"Fußball", img: "Fussball.webp", text:"Ein Fußball im guten zustand"},
  { type: "Suche", title: "E-Gitarre", img:"hellokitty.png", text:"Ich suche eine Fender Squier Hello Kitty. \n  Sollte in Gutem Zustand sein."},
  { type: "Suche", title: "Computer ITT 3030", img: "index.jpg", text: "Ich suche einen ITT 3030 funktionsbereit."},
  {type: "Biete", title: "Gebrauchte Tastatur", img: "tastatur.jpeg", text: "Eine Schwarze tastatur die Gebraucht wurde"},
  {type:"Suche", title: "Plastik Ente", img: "Plastickente.jpeg", text: "Suche Plastik Ente zum Baden"},
  { type: "Suche", title: "Fußball", img: "Fussball.webp", text:"Ein Fußball im guten zustand"},
  { type: "Biete", title: "Arabische Cola",img: "coca-colaformflasche-13486650.jpg", text: "Cola aber nur auf Arabisch"},
  { type: "Biete", title: "Gebrauchte Corona Maske", img: "corona-maske-auf-betonflaeche-100-resimage_v-variantBig24x9_w-896.jpg", text:"Eine Corona Maske der zwar gebraucht und dreckig ist aber noch benutzt werden kann"}
];
const loadArticles = () => new Promise<typeof articles>((resolve) => {
  setTimeout(() => resolve(articles), 500);
});

const App: Component = () => {
  const [articleData] = createResource(loadArticles);
  return (
    <div>
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
          <input type="radio" name="art" value="Biete" id="biete" />
          <label for="biete">Biete</label>       
          <input type="radio" name="art" value="Suche" id="suche" />
          <label for="suche">Suche</label>
          <br />
          <label for="title">Überschrift</label>
          <input type="text" id="title" />
          <br />
          <label for="pic">Bild</label>
          <input type="file" id="pic" />
          <br />
          <label for="text">Beschreibung</label>
          <textarea id="text"></textarea>
          <br />
          <button>Angebot absenden</button>
        </section>
      </main>
    </div>
  );
};

export default App;
