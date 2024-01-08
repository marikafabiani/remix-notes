import stylesNote from "../styles/delete.css";
import { redirect } from "@remix-run/node";
import { deleteNotes } from "../data/notes";
import { Form, Link, useOutletContext } from "@remix-run/react";

export default function DeletePage() {
  const note = useOutletContext();

  return (
    <Form method="post" id="note-form">
      <h2>Delete note</h2>
      <p>
        <label>
          Are you sure you want to delete the note &quot;{note.title}&quot;?
        </label>
      </p>
      <input name="id" type="hidden" value={note.id} />
      <div className="form-actions">
        <Link to={`/notes/${note.id}`}>
          <button id="cancel" type="submit" name="action" value="cancel">
            Cancel
          </button>
        </Link>
        <button id="delete" type="submit" name="action" value="delete">
          Delete
        </button>
      </div>
    </Form>
  );
}

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
