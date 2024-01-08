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
            <Link to="/notes">Back to notes</Link>
          </nav>
          <h1>{note?.title}</h1>
        </header>
        <p id="note-details-content">{note?.content}</p>
        <div id="note-buttons">
          <Link to={"delete"}>
            <button>Delete</button>
          </Link>
        </div>
      </main>
      <Outlet context={note} />
    </>
  );
}

export const meta = ({ data }) => {
  return [{ title: data.title, description: "Manage the note" }];
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
        message: "Could not find the note " + noteId,
      },
      {
        status: 404,
      }
    );
  }
  return selectedNote;
}
