const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const getItems = () => {
  return request(`${baseUrl}/items`);
};

export const addItem = (item) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
};

export const deleteItem = (_id) => {
  return request(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
  });
};
