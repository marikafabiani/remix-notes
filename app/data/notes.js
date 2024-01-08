import fs from "fs/promises";

export async function getStoredNotes() {
  const rawFileContent = await fs.readFile("notes.json", { encoding: "utf-8" });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data?.notes ?? [];
  return storedNotes;
}

export function storeNotes(notes) {
  return fs.writeFile("notes.json", JSON.stringify({ notes: notes || [] }));
}

export async function deleteNotes(id) {
  const rawFileContent = await fs.readFile("notes.json", {
    encoding: "utf-8",
  });
  const array = JSON.parse(rawFileContent);
  const notesArray = array?.notes;
  const filteredArray = notesArray.filter((obj) => obj.id !== id);

  const objNotes = {
    notes: filteredArray,
  };

  const jsonString = JSON.stringify(objNotes);
  return fs.writeFile("notes.json", jsonString, { encoding: "utf-8" });
}
