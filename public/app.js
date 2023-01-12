function logSubmit(event) {
    log.textContent = `Form Submitted! Timestamp: ${event.timeStamp}`;
    event.preventDefault();
}

const form = document.querySelector(".form");
const log = document.querySelector(".log");
if (form) {
  form.addEventListener('submit', logSubmit);
}