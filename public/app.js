const envelopeForm = document.querySelector('form');

envelopeForm.addEventListener('submit', envelopeFormSubmitted);

async function envelopeFormSubmitted(event) {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(envelopeForm).entries());
    console.log(formData);
}