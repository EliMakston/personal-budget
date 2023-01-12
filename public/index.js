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
    log.textContent = `Form submitted and envelope made!`;
  }
}

const form = document.querySelector("form");
const log = document.querySelector(".log");
if (form) {
  form.addEventListener('submit', sendFormData);
}