import { Form, useLoaderData } from "@remix-run/react";
import stylesNote from "./DeleteNote.css";
// import { deleteNotes } from "../data/notes";
// import { redirect } from "@remix-run/node";

// eslint-disable-next-line react/prop-types
function DeleteNote({ setOpenDelete }) {
  const note = useLoaderData();

  return (
    <Form method="post" id="note-form">
      <h2>Elimina nota</h2>
      <p>
        <label htmlFor="title">
          Sei sicuro di voler eliminare la nota &quot;{note.title}&quot;?
        </label>
      </p>
      <input name="id" type="hidden" value={note.id} />
      <div className="form-actions">
        <button
          id="annulla"
          onClick={() => setOpenDelete(false)}
          type="submit"
          name="action"
          value="annulla"
        >
          Annulla
        </button>
        <button id="elimina" type="submit" name="action" value="delete">
          Elimina
        </button>
      </div>
    </Form>
  );
}

export default DeleteNote;

export function links() {
  return [{ rel: "stylesheet", href: stylesNote }];
}
