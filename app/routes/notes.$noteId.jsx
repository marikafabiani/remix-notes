import { Link, Outlet, useLoaderData } from "@remix-run/react";
import styles from "~/styles/note-details.css";
import { getStoredNotes } from "../data/notes";
import { json } from "@remix-run/node";

export default function NoteDetailsPage() {
  const note = useLoaderData();

  return (
    <>
      <main id="note-details">
        <header>
          <nav>
            <Link to="/notes">Torna alle note</Link>
          </nav>
          <h1>{note?.title}</h1>
        </header>
        <p id="note-details-content">{note?.content}</p>
        <div id="note-buttons">
          <Link to={"delete"}>
            <button>Elimina</button>
          </Link>
        </div>
      </main>
      <Outlet context={note} />
    </>
  );
}

export const meta = ({ data }) => {
  return [{ title: data.title, description: "Gestisci la nota" }];
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader({ params }) {
  const noteId = params.noteId;
  const notes = await getStoredNotes();
  const selectedNote = notes.find((note) => note.id === noteId);
  if (!selectedNote) {
    throw json(
      {
        message: "Non è stato possibile trovare la nota " + noteId,
      },
      {
        status: 404,
      }
    );
  }
  return selectedNote;
}
