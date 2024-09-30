document.addEventListener("DOMContentLoaded", function () {
  var dropdown = document.querySelector(".dropdown");
  var dropdownContent = document.querySelector(".dd");
  dropdown.addEventListener("mouseover", function () {
    dropdownContent.style.display = "block";
  });
  dropdown.addEventListener("mouseout", function () {
    dropdownContent.style.display = "none";
  });
});

//登陆验证
function loginValidate() {
  var username = document.getElementById("username"); //获取用户名
  var password = document.getElementById("password"); //获取密码

  var error_username = document.getElementById('error_username')
  var error_password = document.getElementById('error_password')

  if (password.value.length != 6) {
    error_password.innerHTML = "请输入6位数字";
    password.value = "";
    return;
  }

  for (let i = 0; i < password.value.length; i++) {
    if (
      password.value.charCodeAt(i) < 48 ||
      password.value.charCodeAt(i) > 57
    ) {
      error_password.innerHTML = "请输入数字";
      password.value = "";
      return;
    }
  }

  if (username.value != "") {
    location.href = "index.html";
  } else {
    error_username.innerHTML = "用户名不为空";
    return;
  }
}

