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
  `;

  // Summary
  const summaryEl = document.getElementById("summaryText");
  const summaryParts = String(D.summary.text || "")
    .split(/\n\s*\n/)
    .map(s => s.trim())
    .filter(Boolean);

  if (summaryParts.length > 1) {
    summaryEl.innerHTML = summaryParts
      .map(s => `<p class="summary-paragraph">${escapeHtml(s)}</p>`)
      .join("");
  } else {
    summaryEl.textContent = D.summary.text;
  }

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
      <div class="skill-level-list">
        ${D.skills.software.map(s => {
          const skill = typeof s === "string" ? { name: s, level: 0 } : s;
          const level = Math.max(0, Math.min(100, Number(skill.level) || 0));
          return `
            <div class="skill-level-item">
              <div class="skill-level-head">
                <span class="skill-name">${escapeHtml(skill.name || "")}</span>
                <span class="skill-level-value">${level}%</span>
              </div>
              <div class="skill-bar" role="progressbar" aria-valuenow="${level}" aria-valuemin="0" aria-valuemax="100" aria-label="${escapeHtml(skill.name || "Software skill")} level">
                <span style="width:${level}%"></span>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
    <div class="box">
      <h3>Programming</h3>
      <div class="skill-level-list">
        ${D.skills.programming.map(s => {
          const skill = typeof s === "string" ? { name: s, level: 0 } : s;
          const level = Math.max(0, Math.min(100, Number(skill.level) || 0));
          return `
            <div class="skill-level-item">
              <div class="skill-level-head">
                <span class="skill-name">${escapeHtml(skill.name || "")}</span>
                <span class="skill-level-value">${level}%</span>
              </div>
              <div class="skill-bar" role="progressbar" aria-valuenow="${level}" aria-valuemin="0" aria-valuemax="100" aria-label="${escapeHtml(skill.name || "Programming skill")} level">
                <span style="width:${level}%"></span>
              </div>
            </div>
          `;
        }).join("")}
      </div>
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
  const linkedinUrl = D.person.linkedin || "#";
  const linkedinAttrs = linkedinUrl !== "#" ? ' target="_blank" rel="noopener"' : "";
  contactActions.innerHTML = `
    <a class="btn primary" href="mailto:${encodeURIComponent(D.person.email)}?subject=Portfolio%20contact%20-%20${encodeURIComponent(D.person.name)}">
      ${escapeHtml(D.person.email)}
    </a>
    <a class="btn" href="tel:${escapeHtml(D.person.phone.replace(/\s/g,''))}">${escapeHtml(D.person.phone)}</a>
    <a class="btn" href="${escapeHtml(linkedinUrl)}"${linkedinAttrs}>LinkedIn</a>
  `;

  // Carousel
  initCarousel(D.gallery?.images || []);

  function initCarousel(paths){
    const imgEl = document.getElementById("cImage");
    const videoEl = document.getElementById("cVideo");
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

    const isVideoPath = (path) => /\.(mp4|webm|ogg)$/i.test(String(path));

    const render = () => {
      const p = paths[idx];

      imgEl.style.display = "none";
      if (videoEl) {
        videoEl.style.display = "none";
        videoEl.pause();
        videoEl.removeAttribute("src");
        videoEl.load();
      }
      fallbackEl.style.display = "none";

      if (isVideoPath(p) && videoEl) {
        videoEl.style.display = "block";
        videoEl.muted = true;
        videoEl.defaultMuted = true;
        videoEl.src = p;
        videoEl.onerror = () => {
          videoEl.style.display = "none";
          fallbackEl.style.display = "flex";
          fallbackEl.innerHTML = `Missing video:<br><code>${escapeHtml(p)}</code>`;
        };
      } else {
        imgEl.style.display = "block";
        imgEl.src = p;
        imgEl.onerror = () => {
          imgEl.style.display = "none";
          fallbackEl.style.display = "flex";
          fallbackEl.innerHTML = `Missing image:<br><code>${escapeHtml(p)}</code>`;
        };
      }

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
        if (isVideoPath(pp)) {
          b.innerHTML = `<span class="c-thumb-fallback" style="display:flex;">Video</span>`;
        } else {
          b.innerHTML = `
            <img src="${pp}" alt="${escapeHtml(prettyName(pp))}"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <span class="c-thumb-fallback" style="display:none;">${escapeHtml(prettyName(pp))}</span>
          `;
        }
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