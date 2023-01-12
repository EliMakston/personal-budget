async function sendFormData(event) {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.target).entries());
  const response = await fetch("/envelope", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    console.log(`Everything worked`);
  }
}

const post_form = document.getElementById("post_envelope");
if (post_form) {
  post_form.addEventListener('submit', sendFormData);
}

const get_button = document.getElementById("get_envelope");
const log = document.getElementById("log");

async function getAllEnvelopes (event){
  const response = await fetch ("/envelope");
  if (response.ok) {
    log.textContent = JSON.parse(response);
  }
}

get_button.addEventListener("click", getAllEnvelopes);