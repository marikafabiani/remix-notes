import type { LinksFunction, MetaFunction } from "@remix-run/node";
import stylesHome from "../styles/index.css";
import { links as newNoteLinks } from "../components/NewNote";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Notes App" },
    { name: "description", content: "Benvenuto in Notes App" },
  ];
};

export default function HomePage() {
  return (
    <main id="content">
      <h1>Notes App</h1>
      <p>Vuoi aggiungere una nota?</p>
      <p id="cta">
        <Link to="/notes">Inizia!</Link>
      </p>
    </main>
  );
}

export const links: LinksFunction = () => {
  return [...newNoteLinks(), { rel: "stylesheet", href: stylesHome }];
};
