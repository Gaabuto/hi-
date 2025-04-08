function loginAcc(e) {
  e.preventDefault();
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let email = document.getElementById("formGroupExampleInput").value;
  let password = document.getElementById("formGroupExampleInput2").value;
  if (email === "" || password === "") {
    alert("Email và mật khẩu không được để trống");
    return;
  }
  let loginUser = users.findIndex((user) => user.email === email);
  if (loginUser != -1) {
    if (users[loginUser].password == password) {
      alert("Đăng nhập thành công");
      window.location.href = "loggedIn.html";
      localStorage.setItem("loginacc", JSON.stringify(users[loginUser].email));
    } else {
      alert("Mật khẩu sai,vui lòng nhập lại");
    }
  } else {
    alert("Email không tồn tại,vui lòng nhập lại");
    return;
  }
}

function loginPage(e) {
  e.preventDefault();
  window.location.href = "login.html";
}

function registerPage(e) {
  e.preventDefault();
  window.location.href = "register.html";
}
function checklogin() {
  let check = JSON.parse(localStorage.getItem("loginacc")) || [];
  if (check != false) {
    window.location.href = "loggedIn.html";
  }
}
checklogin();
