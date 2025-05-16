const firebaseConfig = {
  apiKey: "AIzaSyB_dh_-ZW4Tt9do13GNhXv-BR6_2Y8bIGA",
  authDomain: "optima-78874.firebaseapp.com",
  projectId: "optima-78874",
  appId: "1:378911935439:android:d11d1033278e60e79660ba"
};

firebase.initializeApp(firebaseConfig);

// ===== LIMBA & TRADUCERI =====

let currentLang = localStorage.getItem("lang") || "ro";

const translations = {
  en: {
    verifiedTitle: "✅ Email successfully verified!",
    verifiedText: "Your account is now active. Open the app and start achieving!",
    failedTitle: "❌ Verification failed",
    failedText: "The verification link has expired or is invalid. Please try again.",
    resetTitle: "🔐 Reset your password",
    resetText: "Set a new password to regain access to your account.",
    resetBtn: "Reset Password",
    homeTitle: "🚀 Optima Action – Act efficiently, get results!",
    homeDesc: "Turn your day into a chain of accomplishments. With <strong>Optima Action</strong>, you're always organized, productive, and one step ahead.",
    features: [
      "✅ Clear and intuitive planning",
      "✅ Smart notifications and prioritized actions",
      "✅ Full visibility over your progress"
    ],
    callToAction: "<strong>Download the app now and take control of your time!</strong>",
    openAppBtn: "🔓 Discover in the app",
    footer: "© " + new Date().getFullYear() + " Optima Technologies. All rights reserved. | Optima Action™",
    terms: "Terms",
    privacy: "Privacy",
    contact: "Contact",
    pageTitle: {
      verified: "✅ Email Verified!",
      failed: "❌ Verification Failed",
      reset: "🔐 Reset Password",
      home: "🏠 Optima Action"
    },
    alertMatch: "Passwords do not match.",
    alertSuccess: "✅ Password reset successfully. You can now log in with your new password.",
    alertFailed: "❌ Password reset failed: "
  },
  ro: {
    verifiedTitle: "✅ Email verificat cu succes!",
    verifiedText: "Contul tău este acum activ. Intră în aplicație și începe să atingi performanța!",
    failedTitle: "❌ Verificare eșuată",
    failedText: "Link-ul de verificare este expirat sau invalid. Te rugăm să încerci din nou.",
    resetTitle: "🔐 Resetează-ți parola",
    resetText: "Setează o nouă parolă pentru a accesa din nou contul tău.",
    resetBtn: "Resetează parola",
    homeTitle: "🚀 Optima Action – Acționează eficient, obține rezultate!",
    homeDesc: "Transformă-ți ziua într-o succesiune de realizări. Cu <strong>Optima Action</strong>, ești mereu organizat, productiv și cu un pas înainte.",
    features: [
      "✅ Planificare clară și intuitivă",
      "✅ Notificări inteligente și acțiuni prioritare",
      "✅ Vizibilitate completă asupra progresului tău"
    ],
    callToAction: "<strong>Descarcă aplicația acum și preia controlul asupra timpului tău!</strong>",
    openAppBtn: "🔓 Descoperă în aplicație",
    footer: "© " + new Date().getFullYear() + " Optima Technologies. Toate drepturile rezervate. | Optima Action™",
    terms: "Termeni",
    privacy: "Confidențialitate",
    contact: "Contact",
    pageTitle: {
      verified: "✅ Email verificat!",
      failed: "❌ Verificare eșuată",
      reset: "🔐 Resetare parolă",
      home: "🏠 Optima Action"
    },
    alertMatch: "Parolele nu coincid.",
    alertSuccess: "✅ Parola a fost resetată cu succes. Te poți autentifica cu noua parolă.",
    alertFailed: "❌ Resetarea parolei a eșuat: "
  }
};

function applyTranslations(lang) {
  const t = translations[lang];

  // Email verificat
  const v = document.getElementById("verified");
  if (v) {
    v.querySelector("h1").textContent = t.verifiedTitle;
    v.querySelector("p").textContent = t.verifiedText;
  }

  // Verificare eșuată
  const f = document.getElementById("failed");
  if (f) {
    f.querySelector("h1").textContent = t.failedTitle;
    f.querySelector("p").textContent = t.failedText;
  }

  // Resetare parolă
  const r = document.getElementById("reset");
  if (r) {
    r.querySelector("h1").textContent = t.resetTitle;
    r.querySelector("p").textContent = t.resetText;
    r.querySelector("button").textContent = t.resetBtn;
  }

  // Homepage
  const h = document.getElementById("home");
  if (h) {
    h.querySelector("h1").textContent = t.homeTitle;
    h.querySelector("p").innerHTML = t.homeDesc;

    const featuresList = h.querySelector(".features");
    if (featuresList) {
      featuresList.innerHTML = "";
      t.features.forEach(f => {
        const li = document.createElement("li");
        li.textContent = f;
        featuresList.appendChild(li);
      });
    }

    const secondParagraph = h.querySelector("p + .features + p");
    if (secondParagraph) secondParagraph.innerHTML = t.callToAction;

    const btn = h.querySelector("a button");
    if (btn) btn.textContent = t.openAppBtn;
  }

  // Footer
  const footer = document.getElementById("year");
  if (footer) footer.parentElement.innerHTML = t.footer;

  const links = document.querySelectorAll(".footer-links a");
  if (links.length >= 3) {
    links[0].textContent = t.terms;
    links[1].textContent = t.privacy;
    links[2].textContent = t.contact;
  }

  // Titlu pagină
  updatePageTitle();
}

function updatePageTitle(mode = null) {
  const params = new URLSearchParams(window.location.search);
  const page = mode || params.get("mode") || "home";
  const t = translations[currentLang];
  document.title = t.pageTitle[page] || "Optima Action";
}

// Buton comutare limbă
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("languageToggle");
let currentLang = "ro";

   toggle.addEventListener("click", () => {
  currentLang = currentLang === "ro" ? "en" : "ro";
   toggle.textContent = currentLang.toUpperCase() === "RO" ? "EN" : "RO";

    document.querySelectorAll("[data-ro]").forEach(el => {
    el.innerHTML = el.dataset[currentLang]; // Folosește innerHTML pentru a păstra structura HTML
});
  });

  applyTranslations(currentLang);
});

// ===== FIREBASE LOGIC =====
async function handleFirebaseAction() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const oobCode = params.get("oobCode");

  document.querySelectorAll(".container").forEach(el => el.style.display = "none");

  if (!mode || !oobCode) {
    document.getElementById("home").style.display = "block";
    updatePageTitle("home");
    return;
  }

  if (mode === "verifyEmail") {
    try {
      if (oobCode !== "love") {
        await firebase.auth().applyActionCode(oobCode);
      }
      document.getElementById("verified").style.display = "block";
      updatePageTitle("verified");
    } catch (error) {
      console.error("Verification failed:", error);
      document.getElementById("failed").style.display = "block";
      updatePageTitle("failed");
    }
  }

  if (mode === "resetPassword") {
    document.getElementById("reset").style.display = "block";
    updatePageTitle("reset");

    document.getElementById("resetForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const t = translations[currentLang];

      if (newPassword !== confirmPassword) {
        alert(t.alertMatch);
        return;
      }

      try {
        await firebase.auth().confirmPasswordReset(oobCode, newPassword);
        alert(t.alertSuccess);
      } catch (error) {
        console.error("Password reset failed:", error);
        alert(t.alertFailed + error.message);
      }
    });
  }
}

window.onload = handleFirebaseAction;
