import { json, redirect } from "@remix-run/node";
import NewNote, { links as newNoteLinks } from "../components/NewNote";
import NoteList, { links as noteListLinks } from "../components/NoteList";
import { getStoredNotes, storeNotes } from "../data/notes";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

export const meta = () => {
  return [{ title: "Add a note" }];
};

export default function Notes() {
  const notes = useLoaderData();

  return (
    <>
      <NewNote />
      <NoteList notes={notes} />
    </>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect("/notes");
}

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw json(
      {
        message: "There are no notes",
      },
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }
  return notes;
}

export function ErrorBoundary() {
  const routeError = useRouteError();
  console.log(routeError);
  const message = routeError.message || "Oops! Something went wrong";

  if (isRouteErrorResponse(routeError)) {
    return (
      <>
        <NewNote />
        <main className="info-message">
          <h1>Oops</h1>
          <p>Status: {routeError.status}</p>
          <p>{routeError.data?.message}</p>
        </main>
      </>
    );
  }

  return (
    <main className="error">
      <h1>An error related to your notes occurred!</h1>
      <p>{message}</p>
      <p>
        Back to <Link to="/">home</Link>!
      </p>
    </main>
  );
}

export const links = () => {
  return [...newNoteLinks(), ...noteListLinks()];
};
