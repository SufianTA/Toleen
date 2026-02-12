document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal");

  requestAnimationFrame(() => {
    revealItems.forEach((item) => item.classList.add("visible"));
  });

  const form = document.querySelector(".waitlist-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const button = form.querySelector("button[type='submit']");
    if (button) {
      button.textContent = "Requested";
      button.setAttribute("disabled", "true");
      button.style.opacity = "0.75";
    }

    const note = document.createElement("p");
    note.textContent = "Thank you. Your place on the waiting list has been reserved.";
    note.style.marginTop = "0.8rem";
    note.style.color = "#6a4d27";
    note.style.fontSize = "0.92rem";
    form.appendChild(note);
  }, { once: true });
});