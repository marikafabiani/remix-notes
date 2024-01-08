import { Form, useNavigation } from "@remix-run/react";
import stylesNote from "./NewNote.css";

export default function NewNote() {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" id="note-form">
      <h2>Add a note</h2>
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button>{isSubmitting ? "Submitting..." : "Add a note"}</button>
      </div>
    </Form>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: stylesNote }];
}
