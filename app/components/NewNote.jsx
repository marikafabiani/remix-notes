import { Form, useNavigation } from "@remix-run/react";
import stylesNote from "./NewNote.css";

function NewNote() {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" id="note-form">
      <h2>Aggiungi una nota</h2>
      <p>
        <label htmlFor="title">Titolo</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Contenuto</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button>{isSubmitting ? "Caricamento..." : "Aggiungi una nota"}</button>
      </div>
    </Form>
  );
}

export default NewNote;

export function links() {
  return [{ rel: "stylesheet", href: stylesNote }];
}
