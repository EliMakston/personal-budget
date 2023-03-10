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
  getAllEnvelopes(event);
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
    const responseObject = await response.json();
    let string = '';
    for (let i = 0; i < responseObject.length; i++) {
      string += `<p>Envelope ${responseObject[i].id}: Category - ${responseObject[i].category}, Budget - ${responseObject[i].budget}</p>\n<br>`;
    }
    log.innerHTML = string;
  }
}

get_button.addEventListener("click", getAllEnvelopes);

const id_form = document.getElementById('id_form');

async function getIdEnvelope (event){
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.target).entries());
  const thisId = formData.id;
  const response = await fetch(`/envelope/${thisId}`);
  if (response.ok) {
    const responseObject = await response.json();
    let string = '';
    string += `<p>Envelope ${responseObject.id}: Category - ${responseObject.category}, Budget - ${responseObject.budget}</p>\n<br>`;
    log.innerHTML = string;
  }
}

id_form.addEventListener('submit', getIdEnvelope);