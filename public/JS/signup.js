const loginButton = document.querySelector("#submit-button");

loginButton.addEventListener("click", async (e) => {
  //e.preventDefault();
  console.log("button pressed");
  e.preventDefault();
  const username = document.querySelector("#username").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (email && password && username) {
    const response = await fetch("/api/v1/users", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
        username,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
      console.log("account Created");
    } else {
      alert(response.statusText);
    }
  }
});
