import { Component, createMemo, createResource, createSignal, For, Show } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

let articles = [
  { type: "Biete", title: "Nissan Skyline GTR R-34", img: "angebot.jpg", text: "Dieser wagen der Marke Nissan hat 280PS und kann maximal 180KM/h schnell fahren. Dieses Modell ist erst 75.068KM weit gefahren und wurde 2001 gebaut.\nUrsprünglich hat dieses Auto ca. 100.000 Geld gekostet." },
  { type: "Suche", title:"Fußball", img: "Fussball.webp", text:"Ein Fußball im guten zustand"},
  { type: "Suche", title: "E-Gitarre", img:"hellokitty.png", text:"Ich suche eine Fender Squier Hello Kitty. \n  Sollte in Gutem Zustand sein."},
  { type: "Suche", title: "Computer ITT 3030", img: "index.jpg", text: "Ich suche einen ITT 3030 funktionsbereit."},
  { type: "Biete", title: "Gebrauchte Tastatur", img: "tastatur.jpeg", text: "Eine Schwarze tastatur die Gebraucht wurde"},
  { type:"Suche", title: "Plastik Ente", img: "Plastickente.jpeg", text: "Suche Plastik Ente zum Baden"},
  { type: "Biete", title: "Arabische Cola",img: "coca-colaformflasche-13486650.jpg", text: "Cola aber nur auf Arabisch"},
  { type: "Biete", title: "Gebrauchte Corona Maske", img: "corona-maske-auf-betonflaeche-100-resimage_v-variantBig24x9_w-896.jpg", text:"Eine Corona Maske der zwar gebraucht und dreckig ist aber noch benutzt werden kann"},
  {type: "suche", title:"Roccat Kone Pro", img:"shell.png", text:"Ich suche eine einigermaßen noch benutzbare Roccat Kane Pro, die ich für ein Produkt im wert von 90€-140€ eiuntauschen würde je nachdem ob diese wireless ist oder oder ein Kabel besitzt"},
  { type: "Suche", title:"Roccat Kain 120 aimo",img:"Roccat_Kain.jpg", text:"Ich suche eine Roccat Kain 120 aimo. Die Farbe ist mir dabei egel, mir ist wichtig das die Maus keine Doppelklicks macht."},
  { type: "Biete", title: "Mojang", img: "Download (1).png", text:"Ich der Enwickler von Microsoft würde gerne Mojang verkaufen weil ich gestern Minecraft ausprobiert habe und es war scheiße"},
];
const pagelength = 5;
const loadArticles = (page: number) => new Promise<[typeof articles, number]>((resolve) => {
  const savedArticles = JSON.parse(localStorage.getItem('articles') || '""');
  if (savedArticles && Array.isArray(savedArticles) && savedArticles.length) {
    articles = savedArticles;
  }
  const start = page * pagelength;
  const end = start + pagelength;
  setTimeout(() => resolve([articles.slice(start, end), Math.floor((articles.length - 1) / pagelength)]), 500);
});

const App: Component = () => {
  const [page, setPage] = createSignal(0);
  const [articleData, { refetch }] = createResource(page, loadArticles);
  const articlelist = createMemo(() => articleData()?.[0]);
  const lastPage = createMemo(() => articleData()?.[1] || 0);
  let typeBieteRef!: HTMLInputElement;
  let typeSucheRef!: HTMLInputElement;
  let titleRef!: HTMLInputElement;
  let imgRef!: HTMLInputElement;
  let imgString = '';
  let textRef!: HTMLTextAreaElement;
  
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

        <For each={articlelist()} fallback={"Loading..."}>
          {(article) => (<article>
            <h2>{article.type}: {article.title}</h2>
            <img src={/^data/.test(article.img) ? article.img : `src/assets/${article.img}`} />
            <p>
              {article.text}
            </p> 
          </article>)}
        </For>
        <Show when={page() > 0}>
          <button onClick={() => setPage(page() - 1)}>Zurück</button>
        </Show>
        <Show when={page() < lastPage()}>
          <button onClick={() => setPage(page() + 1)}>Vor</button>
        </Show>
        <section class={styles.form}>
          <input ref={typeBieteRef} type="radio" name="art" value="Biete" id="biete"/>
          <label for="biete">Biete</label>       
          <input ref={typeSucheRef} type="radio" name="art" value="Suche" id="suche"/>
          <label for="suche">Suche</label>
          <br />
          <label for="title">Überschrift</label>
          <input ref={titleRef} type="text" id="title" />
          <br />
          <label for="pic">Bild</label>
          <input ref={imgRef} type="file" id="pic" onChange={() => {
            const reader = new FileReader();
            const file = imgRef.files?.[0];
            reader.addEventListener('load', () => { imgString = reader.result as string; });
            if (file) {
              reader.readAsDataURL(file);
            }
          }}/>
          <br />
          <label for="text">Beschreibung</label>
          <textarea ref={textRef} id="text"></textarea>
          <br />
          <button onClick={async () => {
            const newType = typeBieteRef.checked ? typeBieteRef.value : typeSucheRef.checked ? typeSucheRef.value : '';
            const newTitle = titleRef.value;
            const newText = textRef.value;
            if (newType && newTitle && newText) {
              articles.push({ type: newType, img: imgString, title: newTitle, text: newText });
              localStorage.setItem('articles', JSON.stringify(articles));
              typeBieteRef.checked = true;
              titleRef.value = '';
              imgRef.value = '';
              imgString = '';
              textRef.value = '';
              refetch();
            }
          }}>Angebot absenden</button>
        </section>
      </main>
    </div>
  );
};

export default App;
