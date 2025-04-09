function login(e) {
  e.preventDefault();
  window.location.href = "login.html";
}
//button sang trang login
function register(e) {
  e.preventDefault();
  window.location.href = "register.html";
}
//btn sang reg
function unlogin(e) {
  e.preventDefault();
  window.location.href = "unLogin.html";
  localStorage.removeItem("loginacc");
}
//
function checklogin() {
  let check = JSON.parse(localStorage.getItem("loginacc")) || [];
  console.log(check);
  if (check.length === 0) {
    window.location.href = "unLogin.html";
  } else {
    let welcome = document.getElementById("welcomeback");
    let hello = document.getElementById("hi");
    let loginacc = JSON.parse(localStorage.getItem("loginacc")) || [];

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let acc = users.findIndex((user) => user.email == loginacc);
    let statusAcc = users[acc];
    hello.innerHTML = `hi, ${statusAcc["lastName"]} ${statusAcc["firstName"]}`;
    welcome.innerHTML = `Chào mừng bạn đã quay lại học, ${statusAcc["lastName"]} ${statusAcc["firstName"]}!`;
  }
}
//check xem da login chua, neu chua thi ve trang unlogin, neu roi thi vao la chao
checklogin();

function connectQuiz(e) {
  e.preventDefault();
  window.location.href = "quiz.html";
}
// btn vao quiz
