function login(e) {
  e.preventDefault();
  window.location.href = "login.html";
}
function register(e) {
  e.preventDefault();
  window.location.href = "register.html";
}
function unlogin(e) {
  e.preventDefault();
  window.location.href = "unLogin.html";
  localStorage.removeItem("loginacc");
}

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
checklogin();
