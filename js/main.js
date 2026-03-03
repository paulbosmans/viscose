(() => {
  const D = window.PORTFOLIO;
  if (!D) return;

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Quick info
  const quick = document.getElementById("quickInfo");
  quick.innerHTML = `
    <div class="quick-line"><b>Location</b> · ${escapeHtml(D.person.location)}</div>
    <div class="quick-line"><b>Languages</b> · ${escapeHtml(D.person.languagesQuick)}</div>
    <div class="quick-line"><b>Availability</b> · ${escapeHtml(D.person.availability)}</div>
  `;

  // Summary
  document.getElementById("summaryText").textContent = D.summary.text;

  // Projects
  document.getElementById("projectsNote").textContent = D.projects.note;

  const grid = document.getElementById("projectsGrid");
  D.projects.items.forEach(p => {
    const article = document.createElement("article");
    article.className = "project";
    article.id = `p-${p.id}`;

    const bullets = (p.bullets || []).map(b => `<li>${escapeHtml(b)}</li>`).join("");
    const tags = (p.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("");
    const links = (p.links || [])
      .map(l => `<a class="link" href="${l.url}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a>`)
      .join("");

    const isConfidential = Boolean(p.confidentialLabel);
    const useContainMedia = p.id === "sylvac-p25d";

    const mediaBlock = p.media ? `
      <figure class="project-media ${isConfidential ? "confidential" : ""} ${useContainMedia ? "contain-image" : ""}">
        <img src="${p.media}" alt="${escapeHtml(p.title)} image"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <div class="media-fallback" style="display:none;">
          Add image:<br><b>${escapeHtml(p.media)}</b>
        </div>
        ${isConfidential ? `<div class="confidential-badge">${escapeHtml(p.confidentialLabel)}</div>` : ``}
      </figure>
    ` : "";

    const bodyColumns = p.media ? "project-body" : "project-body no-media";

    article.innerHTML = `
      <div class="badge"><span class="dot"></span> ${escapeHtml(p.category)}</div>
      <div class="${bodyColumns}">
        <div class="project-text">
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.description)}</p>

          ${bullets ? `<ul class="bullets">${bullets}</ul>` : ""}

          <div class="tags">${tags}</div>

          ${links ? `<div class="links">${links}</div>` : ""}
        </div>
        ${mediaBlock}
      </div>
    `;

    grid.appendChild(article);
  });

  // Skills
  const skillsGrid = document.getElementById("skillsGrid");
  skillsGrid.innerHTML = `
    <div class="box">
      <h3>CAD & Tools</h3>
      <div class="pillrow">${D.skills.software.map(s => `<span class="pill">${escapeHtml(s)}</span>`).join("")}</div>
    </div>
    <div class="box">
      <h3>Programming</h3>
      <div class="pillrow">${D.skills.programming.map(s => `<span class="pill">${escapeHtml(s)}</span>`).join("")}</div>
    </div>
    <div class="box" style="grid-column: 1 / -1;">
      <h3>Core Strengths</h3>
      <ul>
        ${D.skills.strengths.map(s => `<li>${escapeHtml(s)}</li>`).join("")}
      </ul>
    </div>
  `;

  // Contact
  document.getElementById("contactIntro").textContent = D.contact.intro;

  const contactActions = document.getElementById("contactActions");
  contactActions.innerHTML = `
    <a class="btn primary" href="mailto:${encodeURIComponent(D.person.email)}?subject=Portfolio%20contact%20-%20${encodeURIComponent(D.person.name)}">
      ${escapeHtml(D.person.email)}
    </a>
    <a class="btn" href="tel:${escapeHtml(D.person.phone.replace(/\s/g,''))}">${escapeHtml(D.person.phone)}</a>
  `;

  // Right-nav active link based on scroll
  const nav = document.getElementById("rightNav");
  const navLinks = Array.from(nav.querySelectorAll("a"));
  const targets = navLinks.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);

  const setActive = () => {
    const y = window.scrollY + 140;
    let idx = 0;
    for (let i = 0; i < targets.length; i++) {
      if (targets[i].offsetTop <= y) idx = i;
    }
    navLinks.forEach(a => a.classList.remove("active"));
    if (navLinks[idx]) navLinks[idx].classList.add("active");
  };

  window.addEventListener("scroll", setActive, { passive: true });
  window.addEventListener("load", setActive);

  // Carousel
  initCarousel(D.gallery?.images || []);

  function initCarousel(paths){
    const imgEl = document.getElementById("cImage");
    const fallbackEl = document.getElementById("cFallback");
    const dotsEl = document.getElementById("cDots");
    const thumbsEl = document.getElementById("cThumbs");
    const prevBtn = document.getElementById("cPrev");
    const nextBtn = document.getElementById("cNext");

    if (!paths.length){
      imgEl.style.display = "none";
      fallbackEl.style.display = "flex";
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    let idx = 0;

    const prettyName = (p) => {
      const base = String(p).split("/").pop() || p;
      return base.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
    };

    const render = () => {
      const p = paths[idx];

      imgEl.style.display = "block";
      fallbackEl.style.display = "none";

      imgEl.src = p;
      imgEl.onerror = () => {
        imgEl.style.display = "none";
        fallbackEl.style.display = "flex";
        fallbackEl.innerHTML = `Missing image:<br><code>${escapeHtml(p)}</code>`;
      };

      // dots
      dotsEl.innerHTML = "";
      paths.forEach((_, i) => {
        const d = document.createElement("button");
        d.className = "c-dot" + (i === idx ? " active" : "");
        d.setAttribute("aria-label", `Go to image ${i+1}`);
        d.onclick = () => { idx = i; render(); };
        dotsEl.appendChild(d);
      });

      // thumbs
      thumbsEl.innerHTML = "";
      paths.forEach((pp, i) => {
        const b = document.createElement("button");
        b.className = "c-thumb" + (i === idx ? " active" : "");
        b.setAttribute("aria-label", `Select ${prettyName(pp)}`);
        b.innerHTML = `
          <img src="${pp}" alt="${escapeHtml(prettyName(pp))}"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <span class="c-thumb-fallback" style="display:none;">${escapeHtml(prettyName(pp))}</span>
        `;
        b.onclick = () => { idx = i; render(); };
        thumbsEl.appendChild(b);
      });
    };

    prevBtn.onclick = () => { idx = (idx - 1 + paths.length) % paths.length; render(); };
    nextBtn.onclick = () => { idx = (idx + 1) % paths.length; render(); };

    // keyboard support when gallery is focused
    const gallery = document.getElementById("gallery");
    gallery.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") prevBtn.click();
      if (e.key === "ArrowRight") nextBtn.click();
    });
    gallery.tabIndex = 0;

    render();
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, s => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[s]));
  }
})();