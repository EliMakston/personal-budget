const envelopeForm = document.querySelector('form');

envelopeForm.addEventListener('submit', (e) => {
    e.preventDefault;
    new FormData(envelopeForm);
});

async function envelopeFormSubmitted(event) {
    event.preventDefault;
    const formData = new FormData(envelopeForm);
    console.log(formData);
}