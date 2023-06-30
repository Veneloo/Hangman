/*
Axel Cazorla & Jaydin Freeman
06/26/2023
*/

function saveNameAndRedirect() {
  var name = document.getElementById("username").value;
  if (name) {
    sessionStorage.setItem("username", name);
    window.location.href = "index.html";
  } else {
    alert("Please enter your name");
  }
}
