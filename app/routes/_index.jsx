import stylesHome from "../styles/index.css";
import { links as newNoteLinks } from "../components/NewNote";
import { Link } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "Notes App" },
    { name: "description", content: "Welcome in Notes App" },
  ];
};

export default function HomePage() {
  return (
    <main id="content">
      <h1>Notes App</h1>
      <p>Do you want to add a note?</p>
      <p id="cta">
        <Link to="/notes">Start!</Link>
      </p>
    </main>
  );
}

export const links = () => {
  return [...newNoteLinks(), { rel: "stylesheet", href: stylesHome }];
};
