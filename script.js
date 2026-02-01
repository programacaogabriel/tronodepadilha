// ================= HEADER BLUR AO SCROLL =================
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ================= AUDIO RITUAL COM ECO =================
let audioContext;

function playRitualBeat() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const delay = audioContext.createDelay();
  const feedback = audioContext.createGain();

  // Frequência mais encorpada
  osc.frequency.setValueAtTime(80, audioContext.currentTime);
  osc.type = "sine";

  // Envelope (impacto + sustain mais longo)
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.45, audioContext.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.1);

  // Delay (eco ritual)
  delay.delayTime.value = 0.28;      // tempo do eco
  feedback.gain.value = 0.35;        // intensidade do eco

  // Conexões
  osc.connect(gain);
  gain.connect(audioContext.destination);

  gain.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(audioContext.destination);

  osc.start();
  osc.stop(audioContext.currentTime + 1.2);
}

// ================= EASING NATURAL =================
function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ================= SCROLL SUAVE =================
function smoothScrollTo(targetPosition, duration = 1400) {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easing = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * easing);

    if (elapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// ================= MENU COM SOM + SCROLL =================
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    // Batida ritual com eco
    playRitualBeat();

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;

    const headerOffset = 110;
    const targetPosition =
      targetSection.offsetTop - headerOffset;

    smoothScrollTo(targetPosition);
  });
});

// ================= MENU ATIVO =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 160;
    const height = section.offsetHeight;

    if (scrollY >= top && scrollY < top + height) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
// ================= IDENTIFICA PÁGINA HOME =================
document.addEventListener("DOMContentLoaded", () => {
  const homeSection = document.querySelector(".hero");

  if (homeSection) {
    document.body.setAttribute("data-page", "home");
  }
});

// ================= SCROLL SUAVE MAIS ORGÂNICO =================
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    const y = target.getBoundingClientRect().top + window.pageYOffset - 80;

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });
  });
});

