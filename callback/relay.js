(function () {
  "use strict";

  // Frame-busting protection against clickjacking
  if (window.top !== window.self) {
    try {
      window.top.location = window.self.location.href;
    } catch (_) {
      document.documentElement.style.display = "none";
    }
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const rawCode = params.get("code");

  // Immediately wipe sensitive query parameters from browser URL bar and history
  if (window.location.search) {
    window.history.replaceState(null, "", window.location.pathname);
  }

  // Stealth background protection: if anyone visits /callback without a valid OAuth code,
  // silently redirect them to the public homepage so the gateway remains invisible.
  if (!rawCode || !/^[\w\/.-]{10,512}$/.test(rawCode)) {
    window.location.replace("/");
    return;
  }

  const cmd = "/youtube " + rawCode;
  const cmdBox = document.getElementById("cmdBox");
  const copyCmdBtn = document.getElementById("copyCmdBtn");
  const copyRawBtn = document.getElementById("copyRawBtn");

  if (cmdBox) {
    cmdBox.textContent = cmd;
  }

  document.body.setAttribute("data-ready", "true");

  if (copyCmdBtn) {
    copyCmdBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(cmd).then(function () {
        copyCmdBtn.textContent = "Copied Command";
        setTimeout(function () {
          copyCmdBtn.textContent = "Copy Command";
        }, 2500);
      });
    });
  }

  if (copyRawBtn) {
    copyRawBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(rawCode).then(function () {
        copyRawBtn.textContent = "Copied Code";
        setTimeout(function () {
          copyRawBtn.textContent = "Copy Raw Code";
        }, 2500);
      });
    });
  }
})();
