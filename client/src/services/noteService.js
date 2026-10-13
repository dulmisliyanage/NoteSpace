const API_URL = "/api/notes";

async function apiRequest(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export function getNotes() {
  return apiRequest(API_URL);
}

export function createNote(noteData) {
  return apiRequest(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });
}

export function updateNote(id, noteData) {
  return apiRequest(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });
}

export function deleteNote(id) {
  return apiRequest(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
