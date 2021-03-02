console.log("script loaded");
const loginButton = document.querySelector("#login-button");

loginButton.addEventListener("click", async (e) => {
  //e.preventDefault();
  console.log("button pressed");
  e.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  console.log(email);
  console.log(password);

  if (email && password) {
    const response = await fetch("http://localhost:3030/api/v1/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
      console.log("logged in");
    } else {
      alert(response.statusText);
    }
  }
});
