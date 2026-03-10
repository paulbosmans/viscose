(() => {
  const D = window.PORTFOLIO;
  if (!D || !D.prototyping || !Array.isArray(D.prototyping.items)) return;

  const grid = document.getElementById("prototypingGrid");
  const note = document.getElementById("prototypingNote");
  if (!grid) return;

  grid.innerHTML = D.prototyping.items
    .map((item) => {
      const sourceList = Array.isArray(item.sources)
        ? item.sources
        : item.source
          ? [item.source]
          : [];

      const sourceLinks = sourceList
        .filter((src) => src && src.url)
        .map(
          (src) =>
            `<a class="link" href="${escapeHtml(src.url)}" target="_blank" rel="noopener">${escapeHtml(src.label || "Source")}</a>`
        )
        .join("");

      const imagePath = String(item.image || "").trim();
      const mediaBlock = imagePath
        ? `
          <figure class="proto-tool-media">
            <img src="${escapeHtml(imagePath)}" alt="${escapeHtml(item.tool || item.title || "Tool image")}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <div class="proto-tool-media-fallback" style="display:none;">Add image at<br><code>${escapeHtml(imagePath)}</code></div>
          </figure>
        `
        : `
          <figure class="proto-tool-media">
            <div class="proto-tool-media-fallback" style="display:flex;">Add tool image path in <code>js/data.js</code></div>
          </figure>
        `;

      return `
        <article class="proto-line" id="proto-${escapeHtml(item.id || "item")}">
          <div class="proto-line-left">
            <div class="badge"><span class="dot"></span> ${escapeHtml(item.title || "Capability")}</div>
            <h3>${escapeHtml(item.tool || "")}</h3>
            <p>${escapeHtml(item.description || "")}</p>
            ${sourceLinks ? `<div class="links">${sourceLinks}</div>` : ""}
          </div>
          <div class="proto-line-right">
            ${mediaBlock}
          </div>
        </article>
      `;
    })
    .join("");

  if (note) note.textContent = String(D.prototyping.note || "");

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
