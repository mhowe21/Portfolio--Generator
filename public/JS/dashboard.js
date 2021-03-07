// get elements
const profileName = document.querySelector("#name");
const email = document.querySelector("#email");
const github = document.querySelector("#github");
const linkedin = document.querySelector("#linkedin");
const file = document.querySelector("#file");
const submit = document.querySelector("#submit-form");
const aboutYou = document.querySelector("#about-me-text");
const templateSelect = document.querySelector("#template");
const project1Link = document.querySelector("#project-1");
const project2Link = document.querySelector("#project-2");
const project3Link = document.querySelector("#project-3");
const project4Link = document.querySelector("#project-4");
const project5Link = document.querySelector("#project-5");

submit.addEventListener("click", async (e) => {
  //console.log("button pressed");
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
            project_1_link: project1Link.value.trim(),
            project_2_link: project2Link.value.trim(),
            project_3_link: project3Link.value.trim(),
            project_4_link: project4Link.value.trim(),
            project_5_link: project5Link.value.trim(),
          });
          console.log(`the body is ${body}`);
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
        template_id: templateSelect.value.trim(),
        portfolio_aboutme: aboutYou.value.trim(),
        project_1_link: project1Link.value.trim(),
        project_2_link: project2Link.value.trim(),
        project_3_link: project3Link.value.trim(),
        project_4_link: project4Link.value.trim(),
        project_5_link: project5Link.value.trim(),
      });
      console.log(`the body is ${body}`);
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
