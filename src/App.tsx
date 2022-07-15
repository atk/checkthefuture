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
          Herzlich Willkommen zum Tauschportal der Carl Benz Gesamtschule Wörth
          Dieses nicht kommerzielle Angebot richtet sich nur an die Schüller/innen der Carl Benz Gesamtschule 
        </p>
        <article>
        <h2>Suche: Fußball</h2>
        <img src="src/assets/Fussball.webp" />
        <p>
          Ein Fußball im guten zustand
        </p>
        </article>
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
