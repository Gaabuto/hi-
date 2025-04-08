let users = JSON.parse(localStorage.getItem("users")) || [];
function CreatAcc(e) {
  e.preventDefault();
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  if (firstName === "" || lastName === "") {
    alert("First Name và Last Name không được để trống.");
    return;
  }
  let emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    alert("Email không đúng định dạng.");
    return;
  }
  let userIndex = users.findIndex((user) => user.email === email);
  if (userIndex != -1) {
    alert("Email đã tồn tại. Vui lòng chọn email khác.");
    return;
  }
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    alert("Mật khẩu phải có ít nhất 8 ký tự, chứa chữ hoa, chữ thường và số.");
    return;
  }
  if (password != confirmPassword) {
    alert("Mật khẩu xác nhận không khớp.");
    return;
  }

  users.push({
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Đăng ký thành công");
  window.location.href = "login.html";
}

function loginPage(e) {
  e.preventDefault();
  window.location.href = "login.html";
}

function registerPage(e) {
  e.preventDefault();
  Window.location.href = "register.html";
}
