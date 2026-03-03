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

    const mediaBlock = `
      <div class="project-carousel" data-project-id="${escapeHtml(p.id)}" data-project-folder="${escapeHtml(p.mediaFolder || p.id)}">
        <button class="pc-btn pc-prev" aria-label="Previous project media">‹</button>
        <figure class="project-media ${isConfidential ? "confidential" : ""} ${useContainMedia ? "contain-image" : ""}">
          <img class="pc-image" alt="${escapeHtml(p.title)} media" style="display:none;" />
          <video class="pc-video" controls muted playsinline preload="metadata" style="display:none;"></video>
          <div class="media-fallback" style="display:none;"></div>
          ${isConfidential ? `<div class="confidential-badge">${escapeHtml(p.confidentialLabel)}</div>` : ``}
        </figure>
        <button class="pc-btn pc-next" aria-label="Next project media">›</button>
        <div class="pc-dots" aria-label="Project carousel position"></div>
      </div>
    `;

    article.innerHTML = `
      <div class="badge"><span class="dot"></span> ${escapeHtml(p.category)}</div>
      <div class="project-body">
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
    initProjectCarousel(article, p);
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
    <a class="btn primary" href="tel:${escapeHtml(D.person.phone.replace(/\s/g,''))}">${escapeHtml(D.person.phone)}</a>
    <a class="btn primary" href="${escapeHtml(linkedinUrl)}"${linkedinAttrs}>LinkedIn</a>
  `;

  async function initProjectCarousel(article, project){
    const carousel = article.querySelector(".project-carousel");
    if (!carousel) return;

    const imageEl = carousel.querySelector(".pc-image");
    const videoEl = carousel.querySelector(".pc-video");
    const fallbackEl = carousel.querySelector(".media-fallback");
    const prevBtn = carousel.querySelector(".pc-prev");
    const nextBtn = carousel.querySelector(".pc-next");
    const dotsEl = carousel.querySelector(".pc-dots");

    const folderName = (carousel.dataset.projectFolder || project.id || "").trim();
    const discovered = folderName ? await discoverMediaInFolder(`assets/projects/${folderName}/`) : [];

    const fallbackMedia = Array.isArray(project.media)
      ? project.media
      : (project.media ? [project.media] : []);

    const folderCandidates = buildFolderCandidates(folderName, fallbackMedia, project.mediaFiles);
    const candidateMedia = discovered.length ? discovered : [...folderCandidates, ...fallbackMedia];
    const mediaList = await filterExistingMedia(candidateMedia);

    if (!mediaList.length){
      imageEl.style.display = "none";
      videoEl.style.display = "none";
      fallbackEl.style.display = "flex";
      fallbackEl.innerHTML = `No media found.<br><code>assets/projects/${escapeHtml(folderName || project.id)}/</code>`;
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      dotsEl.innerHTML = "";
      return;
    }

    let index = 0;

    const render = () => {
      const path = mediaList[index];

      imageEl.style.display = "none";
      videoEl.style.display = "none";
      videoEl.pause();
      videoEl.removeAttribute("src");
      videoEl.load();
      fallbackEl.style.display = "none";

      if (isVideoPath(path)) {
        videoEl.style.display = "block";
        videoEl.muted = true;
        videoEl.defaultMuted = true;
        videoEl.src = path;
        videoEl.onerror = () => {
          videoEl.style.display = "none";
          fallbackEl.style.display = "flex";
          fallbackEl.innerHTML = `Missing video:<br><code>${escapeHtml(path)}</code>`;
        };
      } else {
        imageEl.style.display = "block";
        imageEl.src = path;
        imageEl.onerror = () => {
          imageEl.style.display = "none";
          fallbackEl.style.display = "flex";
          fallbackEl.innerHTML = `Missing image:<br><code>${escapeHtml(path)}</code>`;
        };
      }

      dotsEl.innerHTML = "";
      mediaList.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "pc-dot" + (i === index ? " active" : "");
        dot.setAttribute("aria-label", `Go to media ${i + 1}`);
        dot.onclick = () => { index = i; render(); };
        dotsEl.appendChild(dot);
      });
    };

    prevBtn.onclick = () => { index = (index - 1 + mediaList.length) % mediaList.length; render(); };
    nextBtn.onclick = () => { index = (index + 1) % mediaList.length; render(); };

    const disabled = mediaList.length <= 1;
    prevBtn.disabled = disabled;
    nextBtn.disabled = disabled;

    render();
  }

  async function discoverMediaInFolder(folderPath){
    try {
      const response = await fetch(folderPath);
      if (!response.ok) return [];

      const html = await response.text();
      const links = [...html.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
      const mediaExt = /\.(png|jpe?g|gif|webp|avif|mp4|webm|ogg)$/i;

      const normalizedFolder = folderPath.endsWith("/") ? folderPath : `${folderPath}/`;

      return links
        .map(link => {
          const clean = String(link).split("?")[0].split("#")[0];
          const fileName = decodeURIComponent(clean).split("/").pop() || "";
          if (!mediaExt.test(fileName)) return null;
          return `${normalizedFolder}${fileName}`;
        })
        .filter(Boolean);
    } catch {
      return [];
    }
  }

  function buildFolderCandidates(folderName, configuredMedia, mediaFiles){
    if (!folderName) return [];

    const normalizedFolder = `assets/projects/${folderName}/`;
    const mediaExt = /\.(png|jpe?g|gif|webp|avif|mp4|webm|ogg)$/i;

    const fromConfigured = (configuredMedia || []).map(path => {
      const raw = String(path || "").split("?")[0].split("#")[0];
      const fileName = raw.split("/").pop() || "";
      return fileName ? `${normalizedFolder}${fileName}` : null;
    });

    const fromMediaFiles = (Array.isArray(mediaFiles) ? mediaFiles : []).map(file => {
      const clean = String(file || "").trim();
      if (!clean) return null;
      return clean.includes("/") ? clean : `${normalizedFolder}${clean}`;
    });

    const merged = [...fromConfigured, ...fromMediaFiles].filter(path => mediaExt.test(String(path || "")));
    return Array.from(new Set(merged));
  }

  async function filterExistingMedia(paths){
    const unique = Array.from(new Set((paths || []).map(p => String(p || "").trim()).filter(Boolean)));
    if (!unique.length) return [];

    const checks = await Promise.all(unique.map(async (path) => ({ path, ok: await checkMediaExists(path) })));
    const existing = checks.filter(item => item.ok).map(item => item.path);

    return existing.length ? existing : unique;
  }

  async function checkMediaExists(path){
    try {
      const head = await fetch(path, { method: "HEAD" });
      if (head.ok) return true;

      if (head.status === 403 || head.status === 405) {
        const get = await fetch(path, { method: "GET", cache: "no-store" });
        return get.ok;
      }

      return false;
    } catch {
      return false;
    }
  }

  function isVideoPath(path){
    return /\.(mp4|webm|ogg)$/i.test(String(path));
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, s => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[s]));
  }
})();