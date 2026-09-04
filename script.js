document.addEventListener("DOMContentLoaded", function () {
  /*
    VISHaka PAARK
    Main website interactions
  */


  // -----------------------------------------
  // BRAND LOGO
  // -----------------------------------------
  // Keeps the same real logo on every page.
  // The logo file is stored at:
  // assets/branding/logo.png
  // -----------------------------------------

  const logoPath = "assets/branding/logo.png";

  document.querySelectorAll(".logo").forEach(function (logoElement) {

    // If the logo container already contains an image,
    // simply correct its source.
    const existingImage =
      logoElement.querySelector("img");

    if (existingImage) {

      existingImage.src = logoPath;
      existingImage.alt = "Vishaka Paark";

      return;
    }


    // For pages where the logo is currently text,
    // replace the text logo with the actual image.
    const logoImage =
      document.createElement("img");

    logoImage.src = logoPath;
    logoImage.alt = "Vishaka Paark";

    logoElement.innerHTML = "";
    logoElement.appendChild(logoImage);

  });


  // -----------------------------------------
  // MOBILE NAVIGATION
  // -----------------------------------------

  const mobileButton = document.querySelector(".mobile-nav");
  const nav = document.querySelector(".nav");

  if (mobileButton && nav) {

    mobileButton.addEventListener("click", function () {

      nav.classList.toggle("show");

      const isOpen =
        nav.classList.contains("show");

      mobileButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });


    nav.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {

        nav.classList.remove("show");

        mobileButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  // -----------------------------------------
  // SET MINIMUM CHECK-IN DATE
  // -----------------------------------------

  const checkIn =
    document.getElementById("checkin");

  const checkOut =
    document.getElementById("checkout");


  const today =
    new Date();


  const todayString =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");


  if (checkIn) {
    checkIn.min = todayString;
  }


  if (checkOut) {
    checkOut.min = todayString;
  }


  // -----------------------------------------
  // CHECK-IN / CHECK-OUT LOGIC
  // -----------------------------------------

  if (checkIn && checkOut) {

    checkIn.addEventListener("change", function () {

      if (!checkIn.value) {
        return;
      }


      checkOut.min =
        checkIn.value;


      if (
        checkOut.value &&
        checkOut.value <= checkIn.value
      ) {

        checkOut.value = "";

      }

    });

  }


  // -----------------------------------------
  // AVAILABILITY BUTTON
  // -----------------------------------------

  const availabilityButton =
    document.querySelector(".booking button");


  if (availabilityButton) {

    availabilityButton.addEventListener(
      "click",
      function () {

        const guests =
          document.getElementById("guests");


        const checkInValue =
          checkIn ? checkIn.value : "";


        const checkOutValue =
          checkOut ? checkOut.value : "";


        const guestsValue =
          guests
            ? guests.value
            : "1 Room · 2 Adults";


        if (!checkInValue || !checkOutValue) {

          showNotice(
            "Please select your check-in and check-out dates."
          );

          return;
        }


        if (checkOutValue <= checkInValue) {

          showNotice(
            "Check-out date must be after the check-in date."
          );

          return;
        }


        const bookingUrl =
          "booking.html" +
          "?checkin=" +
          encodeURIComponent(checkInValue) +
          "&checkout=" +
          encodeURIComponent(checkOutValue) +
          "&guests=" +
          encodeURIComponent(guestsValue);


        window.location.href =
          bookingUrl;

      }
    );

  }


  // -----------------------------------------
  // BOOKING PAGE URL PARAMETERS
  // -----------------------------------------

  const params =
    new URLSearchParams(
      window.location.search
    );


  const bookingCheckIn =
    params.get("checkin");


  const bookingCheckOut =
    params.get("checkout");


  const bookingGuests =
    params.get("guests");


  const bookingPageCheckIn =
    document.querySelector(
      "#booking-checkin"
    );


  const bookingPageCheckOut =
    document.querySelector(
      "#booking-checkout"
    );


  const bookingPageGuests =
    document.querySelector(
      "#booking-guests"
    );


  if (
    bookingPageCheckIn &&
    bookingCheckIn
  ) {

    bookingPageCheckIn.value =
      bookingCheckIn;

  }


  if (
    bookingPageCheckOut &&
    bookingCheckOut
  ) {

    bookingPageCheckOut.value =
      bookingCheckOut;

  }


  if (
    bookingPageGuests &&
    bookingGuests
  ) {

    const matchingOption =
      Array.from(
        bookingPageGuests.options
      ).find(function (option) {

        return (
          option.value === bookingGuests ||
          option.textContent.trim() === bookingGuests
        );

      });


    if (matchingOption) {

      bookingPageGuests.value =
        matchingOption.value;

    }

  }


  // -----------------------------------------
  // SMOOTH SCROLL FOR INTERNAL ANCHORS
  // -----------------------------------------

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (anchor) {

      anchor.addEventListener(
        "click",
        function (event) {

          const targetId =
            anchor.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {

            return;

          }


          const target =
            document.querySelector(targetId);


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  // -----------------------------------------
  // HEADER SCROLL EFFECT
  // -----------------------------------------

  const header =
    document.querySelector(".header");


  if (header) {

    function updateHeader() {

      if (window.scrollY > 40) {

        header.classList.add(
          "header-scrolled"
        );

      } else {

        header.classList.remove(
          "header-scrolled"
        );

      }

    }


    updateHeader();


    window.addEventListener(
      "scroll",
      updateHeader,
      {
        passive: true
      }
    );

  }


  // -----------------------------------------
  // SIMPLE REVEAL ANIMATION
  // -----------------------------------------

  const revealElements =
    document.querySelectorAll(
      ".card, .facility, .offer, .testimonial-card, .location-card"
    );


  if (
    "IntersectionObserver" in window &&
    revealElements.length
  ) {

    const observer =
      new IntersectionObserver(
        function (
          entries,
          observerInstance
        ) {

          entries.forEach(function (entry) {

            if (!entry.isIntersecting) {
              return;
            }


            entry.target.classList.add(
              "is-visible"
            );


            observerInstance.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(
      function (element) {

        element.classList.add(
          "reveal"
        );


        observer.observe(element);

      }
    );

  }


  // -----------------------------------------
  // PHONE NUMBER CLICK TRACKING
  // -----------------------------------------

  document
    .querySelectorAll('a[href^="tel:"]')
    .forEach(function (phoneLink) {

      phoneLink.addEventListener(
        "click",
        function () {

          /*
            Intentionally no external analytics.
            The phone link simply opens the
            visitor's device dialer.
          */

        }
      );

    });


  // -----------------------------------------
  // EMAIL LINKS
  // -----------------------------------------

  document
    .querySelectorAll('a[href^="mailto:"]')
    .forEach(function (emailLink) {

      emailLink.addEventListener(
        "click",
        function () {

          /*
            Browser handles the mail client.
          */

        }
      );

    });

});


// =========================================
// DEMO BOOKING FUNCTION
// =========================================

function demoBook() {

  const checkIn =
    document.getElementById("checkin");


  const checkOut =
    document.getElementById("checkout");


  const guests =
    document.getElementById("guests");


  if (!checkIn || !checkOut) {
    return;
  }


  if (
    !checkIn.value ||
    !checkOut.value
  ) {

    showNotice(
      "Please select your check-in and check-out dates."
    );

    return;
  }


  if (checkOut.value <= checkIn.value) {

    showNotice(
      "Check-out date must be after the check-in date."
    );

    return;
  }


  const guestsValue =
    guests
      ? guests.value
      : "1 Room · 2 Adults";


  const url =
    "booking.html" +
    "?checkin=" +
    encodeURIComponent(checkIn.value) +
    "&checkout=" +
    encodeURIComponent(checkOut.value) +
    "&guests=" +
    encodeURIComponent(guestsValue);


  window.location.href =
    url;
}


// =========================================
// NOTICE / TOAST
// =========================================

function showNotice(message) {

  const existing =
    document.querySelector(
      ".site-notice"
    );


  if (existing) {
    existing.remove();
  }


  const notice =
    document.createElement("div");


  notice.className =
    "site-notice";


  notice.innerHTML = `
    <div class="site-notice-inner">
      <span>${escapeHtml(message)}</span>
      <button type="button" aria-label="Close notification">×</button>
    </div>
  `;


  document.body.appendChild(
    notice
  );


  const closeButton =
    notice.querySelector(
      "button"
    );


  closeButton.addEventListener(
    "click",
    function () {

      notice.remove();

    }
  );


  window.setTimeout(
    function () {

      if (notice.parentNode) {
        notice.remove();
      }

    },
    4500
  );

}


// =========================================
// HTML ESCAPE
// =========================================

function escapeHtml(value) {

  return String(value)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


// =========================================
// CURRENT YEAR
// =========================================

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const yearElements =
      document.querySelectorAll(
        "[data-current-year]"
      );


    yearElements.forEach(
      function (element) {

        element.textContent =
          new Date().getFullYear();

      }
    );

  }
);
