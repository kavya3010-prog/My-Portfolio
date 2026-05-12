// Dark Mode Toggle

const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});


// Contact Form Validation

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function(e){

  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const response = await fetch("http://localhost:5000/contact", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      name,
      email,
      message
    })

  });

  const data = await response.json();

  document.getElementById("successMessage").innerText =
    data.message;

  contactForm.reset();

});