const baseUrl = "http://localhost:3001";

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch items");
    return res.json();
  });
};

export const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to add item");
    return res.json();
  });
};

export const deleteItem = (_id) => {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to delete item");
    }
  });
};
