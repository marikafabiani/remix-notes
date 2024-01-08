import stylesNote from "../styles/delete.css";
import { redirect } from "@remix-run/node";
import { deleteNotes } from "../data/notes";
import { Form, Link, useOutletContext } from "@remix-run/react";

// eslint-disable-next-line react/prop-types
function DeletePage() {
  const note = useOutletContext();

  return (
    <Form method="post" id="note-form">
      <h2>Elimina nota</h2>
      <p>
        <label>
          Sei sicuro di voler eliminare la nota &quot;{note.title}&quot;?
        </label>
      </p>
      <input name="id" type="hidden" value={note.id} />
      <div className="form-actions">
        <Link to={`/notes/${note.id}`}>
          <button id="annulla" type="submit" name="action" value="annulla">
            Annulla
          </button>
        </Link>
        <button id="elimina" type="submit" name="action" value="delete">
          Elimina
        </button>
      </div>
    </Form>
  );
}

export default DeletePage;

export function links() {
  return [{ rel: "stylesheet", href: stylesNote }];
}

export async function action({ request }) {
  const formData = await request.formData();
  const action = formData.get("action");
  const noteIdToDelete = formData.get("id");
  if (action === "delete") {
    await deleteNotes(noteIdToDelete);
  }
  return redirect("/notes");
}
