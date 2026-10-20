/* Menu */
document.addEventListener("DOMContentLoaded", function () {
  var html = document.documentElement;
  var menu = document.getElementById("menu");
  var navMenu = document.querySelector(".nav-menu");
  var menuButton = document.querySelector(".menu-button");
  var navClose = document.querySelector(".nav-close");
  var hiddenClose = document.querySelector(".hidden-close");

  // Function to toggle the menu
  function toggleMenu() {
    html.classList.toggle("menu-active");
  }

  // Event listeners for menu toggle
  if (menu) menu.addEventListener("click", toggleMenu);
  if (navMenu) navMenu.addEventListener("click", toggleMenu);
  if (menuButton) menuButton.addEventListener("click", toggleMenu);
  if (navClose) navClose.addEventListener("click", toggleMenu);
  if (hiddenClose) hiddenClose.addEventListener("click", toggleMenu);

  // Remove menu-active class on window resize or orientation change
  window.addEventListener("resize", function () {
    html.classList.remove("menu-active");
  });

  window.addEventListener("orientationchange", function () {
    html.classList.remove("menu-active");
  });
});

/* Parallax cover */
document.addEventListener("DOMContentLoaded", function () {
  var html = document.documentElement;
  var cover = document.querySelector(".cover");
  var coverPosition = 0;
  var ticking = false;

  // Function to handle the parallax effect
  function prlx() {
    if (cover) {
      var windowPosition = window.scrollY || document.documentElement.scrollTop;
      coverPosition = windowPosition > 0 ? Math.floor(windowPosition * 0.25) : 0;

      cover.style.transform = `translate3d(0, ${coverPosition}px, 0)`;

      if (windowPosition < cover.offsetHeight) {
        html.classList.add("cover-active");
      } else {
        html.classList.remove("cover-active");
      }
    }
  }
  function onScrollOrResize() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        prlx();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Update cached cover height on resize
  window.addEventListener("resize", () => {
    coverHeight = cover ? cover.offsetHeight : 0;
  });

  // Attach scroll and resize listeners
  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);
  window.addEventListener("orientationchange", onScrollOrResize);

  // Initial call
  prlx();
});
  
/* Gallery */
function gallery() {
  'use strict';
  var images = document.querySelectorAll('.kg-gallery-image img');

  images.forEach(function(image) {
    var container = image.closest('.kg-gallery-image');
    if (container && image.hasAttribute('width') && image.hasAttribute('height')) {
      var width = parseFloat(image.getAttribute('width'));
      var height = parseFloat(image.getAttribute('height'));
      var ratio = width / height;
      container.style.flex = ratio + ' 1 0%';
    }
  });
}
  
// Execute the gallery function
gallery();

/* Theme */
document.addEventListener("DOMContentLoaded", function () {
  'use strict';

  var html = document.documentElement;
  var toggle = document.querySelector('.js-theme');
  var toggleText = toggle ? toggle.querySelector('.theme-text') : null;

  function system() {
    html.classList.remove('theme-dark', 'theme-light');
    localStorage.removeItem('attila_theme');
    if (toggleText) {
      toggleText.textContent = toggle.getAttribute('data-system');
    }
  }

  function dark() {
    html.classList.remove('theme-light');
    html.classList.add('theme-dark');
    localStorage.setItem('attila_theme', 'dark');
    if (toggleText) {
      toggleText.textContent = toggle.getAttribute('data-dark');
    }
  }

  function light() {
    html.classList.remove('theme-dark');
    html.classList.add('theme-light');
    localStorage.setItem('attila_theme', 'light');
    if (toggleText) {
      toggleText.textContent = toggle.getAttribute('data-light');
    }
  }

  // Apply the theme based on saved preference
  switch (localStorage.getItem('attila_theme')) {
    case 'dark':
      dark();
      break;
    case 'light':
      light();
      break;
    default:
      system();
      break;
  }

  // Add event listener for toggle click
  if (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();

      if (!html.classList.contains('theme-dark') && !html.classList.contains('theme-light')) {
        dark();
      } else if (html.classList.contains('theme-dark')) {
        light();
      } else {
        system();
      }
    });
  }
});

/* Footnote previews */
document.addEventListener("DOMContentLoaded", function () {
  var refs = document.querySelectorAll(".post-content .footnote-ref a");
  if (!refs.length) return;

  var popover = document.createElement("div");
  popover.className = "footnote-popover";
  popover.setAttribute("role", "tooltip");
  document.body.appendChild(popover);

  var hideTimer = null;
  var openRef = null;

  function noteFor(ref) {
    var target = document.querySelector(ref.getAttribute("href"));
    if (!target) return null;
    var copy = target.cloneNode(true);
    var back = copy.querySelector(".footnote-backref");
    if (back) back.remove();
    return copy.innerHTML;
  }

  function place(ref) {
    var rect = ref.getBoundingClientRect();
    var width = popover.offsetWidth;
    var left = rect.left + rect.width / 2 - width / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - width - 12));
    var below = rect.bottom + 10;
    var above = rect.top - popover.offsetHeight - 10;
    var top = below + popover.offsetHeight < window.innerHeight || above < 0 ? below : above;
    popover.style.left = left + window.scrollX + "px";
    popover.style.top = top + window.scrollY + "px";
  }

  function show(ref) {
    clearTimeout(hideTimer);
    if (openRef === ref) return;
    var html = noteFor(ref);
    if (!html) return;
    popover.innerHTML = html;
    popover.classList.add("is-visible");
    openRef = ref;
    place(ref);
  }

  function hide() {
    popover.classList.remove("is-visible");
    openRef = null;
  }

  function hideSoon() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hide, 150);
  }

  Array.prototype.forEach.call(refs, function (ref) {
    ref.textContent = ref.textContent.replace(/[\[\]]/g, "");
    ref.addEventListener("mouseenter", function () { show(ref); });
    ref.addEventListener("mouseleave", hideSoon);
    // no focus handler: the backref anchors to this element and would pop it open; Enter still fires click
    ref.addEventListener("click", function (event) {
      // the number toggles the preview and never navigates; the list at the bottom still exists for no-JS and print
      event.preventDefault();
      if (openRef === ref) hide();
      else show(ref);
    });
  });

  popover.addEventListener("mouseenter", function () { clearTimeout(hideTimer); });
  popover.addEventListener("mouseleave", hideSoon);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") hide();
  });
  document.addEventListener("click", function (event) {
    if (openRef && !popover.contains(event.target) && !openRef.contains(event.target)) hide();
  });
  window.addEventListener("scroll", function () {
    if (openRef) place(openRef);
  });
});
