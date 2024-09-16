function contactDivElement() {
    return document.querySelector(".contact-box");
}
function contactFormElement() {
    return document.querySelector(".contact-box > form");
}
function createElementFromHTML(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.firstChild;
}
function errorMessageHtml() {
    const msg = `
    <div class="contact-details">
    <h3 class="editable">Bummer!</h3>
    <p>This is embarrassing: Message delivery failed for technical reasons!</p><br/>
    <p>Please contact us directly through <a href="mailto:support@securesubstrates.com">email</a></em>, and we will get back to you as soon as possible.</p>
    </div>`;
    return msg;
}
function successMessageHtml() {
    const msg = `<div class="contact-details">
  <h3 class="editable">Success</h3>
  <p>We got your request for the pre-release demo. We'll be in touch soon.</p>
  </div>`;
    return msg;
}
function updateContactAfterSubmit(message) {
    const contact_div = contactDivElement();
    const contact_form = contactFormElement();
    if (contact_div) {
        const node = createElementFromHTML(message);
        contact_div.removeChild(contact_form);
        contact_div.prepend(node);
    }
}
function contactSendFailed(error) {
    console.error(`Error sending form: ${error}`);
    updateContactAfterSubmit(errorMessageHtml());
}
function contactSendSuccess() {
    updateContactAfterSubmit(successMessageHtml());
}
function sendForm(form) {
    const formData = new FormData(form);
    const url = form.action;
    fetch(url, {
        method: "POST",
        body: formData,
        mode: "cors",
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error("Bad Network!");
        }
        return response.text();
    })
        .then((data) => {
        console.log("Success:", data);
        contactSendSuccess();
    })
        .catch((error) => {
        contactSendFailed(error);
    });
}
const onSubmit = (event) => {
    event.preventDefault();
    if (event.currentTarget) {
        sendForm(event.currentTarget);
    }
};
const init = () => {
    const contact_div = contactDivElement();
    const contact_form = contactFormElement();
    if (contact_div && contact_form) {
        contact_form.addEventListener("submit", onSubmit);
    }
    else {
        console.error(`Either contact div element or contact form element is not present on the page`);
    }
};
init();
