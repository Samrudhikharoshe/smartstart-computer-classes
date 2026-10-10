// Update this to the WhatsApp number that will receive enquiries.
// Use country code + number, digits only. India example: 91XXXXXXXXXX.
// Do not publish a personal number unless you are comfortable receiving enquiries.
const WHATSAPP_NUMBER = "918485887466";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-plan]").forEach((link) => {
  link.addEventListener("click", () => {
    const courseSelect = document.getElementById("course");
    const plan = link.dataset.plan.toLowerCase();
    if (plan.includes("starter")) courseSelect.value = "Computer Basics";
    else if (plan.includes("practical")) courseSelect.value = "Basics + Word & Excel";
    else if (plan.includes("digital")) courseSelect.value = "Internet & Email";
  });
});

document.getElementById("enquiryForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const course = document.getElementById("course").value;
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("formStatus");

  if (!name || !phone || !course) {
    status.textContent = "Please fill in your name, phone number and course.";
    return;
  }

  if (!/^[0-9+\-\s]{10,16}$/.test(phone)) {
    status.textContent = "Please enter a valid phone number.";
    return;
  }

  const text = [
    "Hello! I am interested in your online computer classes.",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Course: ${course}`,
    message ? `Question: ${message}` : ""
  ].filter(Boolean).join("\n");

  // WhatsApp opens with a draft; the student chooses whether to send it.
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  status.textContent = "Opening WhatsApp with your enquiry. Please review it before sending.";
  window.open(url, "_blank", "noopener,noreferrer");
});

document.getElementById("year").textContent = new Date().getFullYear();
