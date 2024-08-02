const formsSwitcher = document.querySelector(".forms__switcher");
const registrationForm = document.querySelector(".form-reg");
const forms = document.querySelector(".forms");
const loginForm = document.querySelector(".form-login");
const registeredUsersList = document.querySelector(".registered__users_list");
let users = [];
const usersLocalStorage = JSON.parse(localStorage.getItem("users"));
console.log(usersLocalStorage);

if (localStorage.getItem("userlogged")) {
  window.location.href = "./cabinet/index.html";
}
if (usersLocalStorage) {
  users = usersLocalStorage;
}

// Очистка активных классов
function clearActiveClasses() {
  const currentActives = document.querySelectorAll(".active");

  if (currentActives) {
    currentActives.forEach((el) => el.classList.remove("active"));
  }
}

function isUserExists(email) {
  const usersFilter = users.filter((user) => user.email === email);
  if (usersFilter.length === 0) {
    return null;
  }
  return usersFilter[0];
}

function renderUsers() {
  registeredUsersList.innerHTML = "";
  users.forEach((user) => {
    const userElement = document.createElement("div");
    userElement.classList.add("user");
    userElement.innerHTML = `<div class = "email">${user.email} </div>`;
    registeredUsersList.append(userElement);
  });
}

// Рендерим юзеров
renderUsers();

// Переключение форм
formsSwitcher.addEventListener("click", (event) => {
  const { id } = event.target;
  if (event.target.matches(".btn")) {
    clearActiveClasses();
    event.target.classList.add("active");
    if (id === "form-reg") {
      registrationForm.classList.add("active");
    } else {
      loginForm.classList.add("active");
    }
  }
});
// Регистрация пользователя
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const { email, password } = event.target.elements;

  // Проверяем пустые не пустые поля
  if (email.value === "" && password.value === "") {
    alert("Поля не заполнены!");
    return;
  }
  // Проверяем существует ли пользователь
  if (isUserExists(email.value)) {
    alert(`Внимание! Пользователь ${email.value} уже существует`);
  } else {
    users.push({
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("users", JSON.stringify(users));
  }
  // Сброс формы
  event.target.reset();

  // Выводим пользователей
  renderUsers(users);
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const { email, password } = event.target.elements;
  if (email.value === "" && password.value === "") {
    alert("Поля не заполнены!");
    return;
  }

  const userExistance = isUserExists(email.value);
  if (userExistance) {
    if (userExistance.password === password.value) {
      alert(`Вы успешно прошли авторизацию! Добро пожаловать`);
      localStorage.setItem("userlogged", email.value); //записываем id пользователя
      window.location.href = "./cabinet/index.html";
    } else {
      alert("Вы указали неверный пароль");
    }
  } else {
    alert("Такого пользователя не существует!");
  }
});
