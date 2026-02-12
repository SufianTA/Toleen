document.addEventListener("DOMContentLoaded", () => {
  const intro = document.querySelector(".intro");
  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));

  window.setTimeout(() => {
    if (intro) {
      intro.classList.add("hide");
    }
    revealItems.forEach((item) => item.classList.add("visible"));
  }, 1100);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealItems.forEach((item) => observer.observe(item));

  const tiltCard = document.getElementById("tilt-card");
  if (tiltCard) {
    const maxTilt = 6;

    tiltCard.addEventListener("mousemove", (event) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * maxTilt * 2;
      const rotateX = (((y / rect.height) - 0.5) * maxTilt * -2);

      tiltCard.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    tiltCard.addEventListener("mouseleave", () => {
      tiltCard.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  }

  const form = document.querySelector(".waitlist-form");
  if (!form) return;

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      const button = form.querySelector("button[type='submit']");
      if (button) {
        button.disabled = true;
        button.textContent = "Requested";
      }

      const message = document.createElement("p");
      message.textContent = "Merci. Your reservation request has been received.";
      message.style.margin = "0.7rem 0 0";
      message.style.color = "#5b442c";
      message.style.fontSize = "0.92rem";
      form.appendChild(message);
    },
    { once: true }
  );
});