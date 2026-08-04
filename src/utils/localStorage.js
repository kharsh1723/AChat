export function saveUsername(name) {
  localStorage.setItem("achat_username", name);
}

export function getUsername() {
  return localStorage.getItem("achat_username") || "";
}