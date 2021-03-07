// get elements
const profileName = document.querySelector("#name");
const email = document.querySelector("#email");
const github = document.querySelector("#github");
const linkedin = document.querySelector("#linkedin");
const file = document.querySelector("#file");
const submit = document.querySelector("#submit-form");
const aboutYou = document.querySelector("#about-me-text");
const templateSelect = document.querySelector("#template");

submit.addEventListener("click", async (e) => {
  console.log("button pressed");
  await submitForm();
});

function submitForm() {
  return new Promise((resolve, reject) => {
    let fileUpload = file.files[0];

    if (fileUpload) {
      let formData = new FormData();

      formData.append("img", fileUpload);
      fetch("/api/v1/files/upload/profileIMG", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          let headers = new Headers();

          headers.append("Content-Type", "application/json");
          let body = JSON.stringify({
            name: profileName.value.trim(),
            email: email.value.trim(),
            github: github.value.trim(),
            linkedin: linkedin.value.trim(),
            template_id: templateSelect.value.trim(),
            portfolio_aboutme: aboutYou.value.trim(),
          });

          let requestOptions = {
            method: "POST",
            headers: headers,
            body: body,
          };

          fetch("/api/v1/files/upload/data", requestOptions)
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              resolve(document.location.replace("/portfolios"));
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        });
    } else {
      let headers = new Headers();

      headers.append("Content-Type", "application/json");
      let body = JSON.stringify({
        name: profileName.value.trim(),
        email: email.value.trim(),
        github: github.value.trim(),
        linkedin: linkedin.value.trim(),
        template_id: templateSelect.value,
        portfolio_aboutme: aboutYou.value,
      });

      let requestOptions = {
        method: "POST",
        headers: headers,
        body: body,
      };

      fetch("/api/v1/files/upload/data", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          resolve(document.location.replace("/portfolios"));
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    }
  });
}
