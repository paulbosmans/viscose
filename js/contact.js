(() => {
  const D = window.PORTFOLIO;
  if (!D) return;

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const intro = document.getElementById("contactPageIntro");
  if (intro) intro.textContent = String(D.contact?.intro || "");

  const actions = document.getElementById("contactPageActions");
  if (actions) {
    const linkedinUrl = D.person?.linkedin || "#";
    const linkedinAttrs = linkedinUrl !== "#" ? ' target="_blank" rel="noopener"' : "";
    actions.innerHTML = `
      <a class="btn primary" href="mailto:${encodeURIComponent(D.person?.email || "")}?subject=Portfolio%20contact%20-%20${encodeURIComponent(D.person?.name || "")}">${escapeHtml(D.person?.email || "")}</a>
      <a class="btn primary" href="tel:${escapeHtml(String(D.person?.phone || "").replace(/\s/g, ""))}">${escapeHtml(D.person?.phone || "")}</a>
      <a class="btn primary" href="${escapeHtml(linkedinUrl)}"${linkedinAttrs}>LinkedIn</a>
    `;
  }

  const rows = document.getElementById("contactRows");
  if (rows) {
    rows.innerHTML = `
      <div class="contact-row"><span class="contact-label">Name</span><span class="contact-value">${escapeHtml(D.person?.name || "")}</span></div>
      <div class="contact-row"><span class="contact-label">City</span><span class="contact-value">${escapeHtml(D.person?.location || D.person?.address || "")}</span></div>
      <div class="contact-row"><span class="contact-label">Languages</span><span class="contact-value">${escapeHtml(D.person?.languagesQuick || "")}</span></div>
      <div class="contact-row"><span class="contact-label">Availability</span><span class="contact-value">${escapeHtml(D.person?.availability || "")}</span></div>
    `;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (s) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[s]));
  }
})();
