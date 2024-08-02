const id = localStorage.getItem("userlogged");
console.log(id);
if (!id) {
  window.location.href = "../index.html";
}
const list = JSON.parse(localStorage.getItem("users"));
console.log(list);

function isUserExists(id) {
  const usersFilter = list.find((user) => user.email === id);
  console.log(usersFilter);
  return usersFilter;
}
const user = isUserExists(id);
if (user) {
  const div = document.getElementById("logged_user");
  const userElement = document.createElement("div");
  userElement.innerHTML = `<h2>Добро пожаловать, ${user.email}, твой пароль ${user.password}</h2>`;
  div.append(userElement);
}
