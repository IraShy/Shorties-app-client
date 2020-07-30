class Client {
  createNote = async (note, categories) => {
    const category_response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ categories }),
      }
    );

    const category_json = await category_response.json();

    // stringify to send "[]" to backend
    note.category_ids = JSON.stringify(category_json.map((c) => c.id));

    const data = new FormData();
    for (let key in note) {
      data.append(`note[${key}]`, note[key]);
    }

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: data,
    });

    const noteData = await response.json();
    const newNote = { ...noteData.note, picture: noteData.picture };

    return newNote;
  };
}

export default Client;
