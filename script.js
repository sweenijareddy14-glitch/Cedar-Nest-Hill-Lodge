// ===== Cedar Nest Hill Lodge — script.js =====

document.addEventListener("DOMContentLoaded", function () {
  /* Mobile menu toggle */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      var expanded = nav.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded);
    });
  }

  /* FAQ accordion toggle */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      faqItems.forEach(function (other) { other.classList.remove("open"); });
      if (!isOpen) item.classList.add("open");
    });
  });

  /* Booking / Contact form validation */
  var form = document.getElementById("bookingForm");
  if (form) {
    var successBox = document.getElementById("formSuccess");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      var fields = form.querySelectorAll("[data-validate]");
      fields.forEach(function (field) {
        var wrapper = field.closest(".field");
        var rule = field.getAttribute("data-validate");
        var value = field.value.trim();
        var fieldValid = true;

        if (rule.indexOf("required") !== -1 && value === "") {
          fieldValid = false;
        }
        if (rule.indexOf("email") !== -1 && value !== "") {
          var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) fieldValid = false;
        }
        if (rule.indexOf("phone") !== -1 && value !== "") {
          var phonePattern = /^[0-9+\-\s()]{7,15}$/;
          if (!phonePattern.test(value)) fieldValid = false;
        }

        if (wrapper) {
          if (fieldValid) {
            wrapper.classList.remove("invalid");
          } else {
            wrapper.classList.add("invalid");
            valid = false;
          }
        }
      });

      if (valid) {
        form.reset();
        if (successBox) successBox.classList.add("show");
        window.scrollTo({ top: form.offsetTop - 120, behavior: "smooth" });
      } else {
        if (successBox) successBox.classList.remove("show");
      }
    });
  }

  /* Set active nav link based on current page */
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === path) link.setAttribute("aria-current", "page");
  });
});
