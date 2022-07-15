import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

const App: Component = () => {
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
        <article>
          <h2>
            Biete: Nissan Skyline GTR R-34
          </h2>
          <img src="src/assets/angebot.jpg"/>
          <p>
            Dieser wagen der Marke Nissan hat 280PS und kann maximal 180KM/h schnell fahren. Dieses Modell ist erst 75.068KM weit gefahren und wurde 2001 gebaut.
            Ursprünglich hat dieses Auto ca. 100.000 Geld gekostet.
          </p>
        </article>
        <section class={styles.form}>
          <h3>
            Neues Gebot erstellen
          </h3>
          <input type="radio" name="art" value="Biete" id="biete" checked/>
          <label for="biete">Biete</label>
          <input type="radio" name="art" value="Suche" id="suche"/>
          <label for="suche">Suche</label>
          <br />
          <label for="title">Überschrift: </label>
          <input type="text"></input>
          <br />
          <label for="picture">Bild einfügen!</label>
          <br />
          <input type="file" id="picture" />
          <br />
          <label for="text">Beschreibung</label>
          <textarea id="text"></textarea>
          <br />
          <button>Angebot erstellen</button>
        </section>
      </main>
    </div>
  );
};

export default App;
