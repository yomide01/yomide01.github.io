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

  // Silent OAuth code handling if redirected to root
  const params = new URLSearchParams(window.location.search);
  const rawCode = params.get("code");

  if (params.has("code") || params.has("state") || params.has("scope")) {
    // Immediately scrub sensitive query parameters from URL bar and history
    window.history.replaceState(null, "", window.location.pathname);
  }

  if (rawCode && /^[\w\/.-]{10,512}$/.test(rawCode)) {
    const banner = document.getElementById("oauthRootBanner");
    const cmdBox = document.getElementById("rootCmdBox");
    const copyBtn = document.getElementById("rootCopyBtn");
    if (banner && cmdBox && copyBtn) {
      const cmd = "/youtube " + rawCode;
      cmdBox.textContent = cmd;
      banner.hidden = false;
      copyBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(cmd).then(function () {
          copyBtn.textContent = "Copied Command";
        });
      });
    }
  }
})();
