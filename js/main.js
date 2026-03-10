(() => {
  const D = window.PORTFOLIO;
  if (!D) return;
  const lightbox = setupLightbox();
  let activeCarouselControls = null;

  document.addEventListener("keydown", (event) => {
    const lightboxRoot = document.getElementById("mediaLightbox");
    if (lightboxRoot && lightboxRoot.classList.contains("open")) return;
    if (!activeCarouselControls) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      activeCarouselControls.prev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      activeCarouselControls.next();
    }
  });

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
    const categoryParts = String(p.category || "")
      .split("·")
      .map(part => part.trim())
      .filter(Boolean);
    const company = categoryParts[0] || "";
    const companySlug = company
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const companyLogoPath = companySlug ? `assets/logos/${companySlug}.png` : "";
    const companyLogo = companyLogoPath
      ? `<img class="project-company-logo" src="${escapeHtml(companyLogoPath)}" alt="${escapeHtml(company)} logo" onerror="this.style.display='none';" />`
      : "";

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
      ${companyLogo ? `<div class="project-logo-line">${companyLogo}</div>` : ""}
      <h3 class="project-card-title">${escapeHtml(p.title)}</h3>
      <div class="project-body">
        <div class="project-text">
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

  // Prototyping capacity
  const prototypingGrid = document.getElementById("prototypingGrid");
  const prototypingNote = document.getElementById("prototypingNote");
  if (prototypingGrid && D.prototyping && Array.isArray(D.prototyping.items)) {
    prototypingGrid.innerHTML = D.prototyping.items.map(item => {
      const sourceList = Array.isArray(item.sources)
        ? item.sources
        : (item.source ? [item.source] : []);

      const sourceLinks = sourceList
        .filter(src => src && src.url)
        .map(src => `<a class="link" href="${escapeHtml(src.url)}" target="_blank" rel="noopener">${escapeHtml(src.label || "Source")}</a>`)
        .join("");

      return `
        <article class="proto-card" id="proto-${escapeHtml(item.id || "item")}">
          <div class="badge"><span class="dot"></span> ${escapeHtml(item.title || "Capability")}</div>
          <h3>${escapeHtml(item.tool || "")}</h3>
          <p>${escapeHtml(item.description || "")}</p>
          ${sourceLinks ? `<div class="links">${sourceLinks}</div>` : ""}
        </article>
      `;
    }).join("");

    if (prototypingNote) {
      prototypingNote.textContent = String(D.prototyping.note || "");
    }
  }

  // Contact (optional on pages that include contact placeholders)
  const contactIntro = document.getElementById("contactIntro");
  const contactActions = document.getElementById("contactActions");
  if (contactIntro) contactIntro.textContent = D.contact.intro;

  if (contactActions) {
    const linkedinUrl = D.person.linkedin || "#";
    const linkedinAttrs = linkedinUrl !== "#" ? ' target="_blank" rel="noopener"' : "";
    contactActions.innerHTML = `
      <a class="btn primary" href="mailto:${encodeURIComponent(D.person.email)}?subject=Portfolio%20contact%20-%20${encodeURIComponent(D.person.name)}">
        ${escapeHtml(D.person.email)}
      </a>
      <a class="btn primary" href="tel:${escapeHtml(D.person.phone.replace(/\s/g,''))}">${escapeHtml(D.person.phone)}</a>
      <a class="btn primary" href="${escapeHtml(linkedinUrl)}"${linkedinAttrs}>LinkedIn</a>
    `;
  }

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

    let index = resolveInitialMediaIndex(mediaList, project, folderName);

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
        imageEl.onclick = null;
        videoEl.onerror = () => {
          videoEl.style.display = "none";
          fallbackEl.style.display = "flex";
          fallbackEl.innerHTML = `Missing video:<br><code>${escapeHtml(path)}</code>`;
        };
      } else {
        imageEl.style.display = "block";
        imageEl.src = path;
        imageEl.onclick = () => {
          lightbox.openMediaList(mediaList, index, (selectedIndex) => {
            if (selectedIndex >= 0 && selectedIndex < mediaList.length) {
              index = selectedIndex;
              render();
            }
          });
        };
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

    const goPrev = () => { index = (index - 1 + mediaList.length) % mediaList.length; render(); };
    const goNext = () => { index = (index + 1) % mediaList.length; render(); };

    prevBtn.onclick = goPrev;
    nextBtn.onclick = goNext;

    carousel.addEventListener("mouseenter", () => {
      if (mediaList.length > 1) {
        activeCarouselControls = { prev: goPrev, next: goNext };
      }
    });

    carousel.addEventListener("mouseleave", () => {
      if (activeCarouselControls && activeCarouselControls.prev === goPrev) {
        activeCarouselControls = null;
      }
    });

    const disabled = mediaList.length <= 1;
    if (disabled) {
      carousel.classList.add("single-media");
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
      dotsEl.style.display = "none";
    } else {
      carousel.classList.remove("single-media");
      prevBtn.style.display = "";
      nextBtn.style.display = "";
      dotsEl.style.display = "";
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    }

    render();
  }

  async function discoverMediaInFolder(folderPath){
    const normalizedFolder = folderPath.endsWith("/") ? folderPath : `${folderPath}/`;
    const mediaExt = /\.(png|jpe?g|gif|webp|avif|mp4|webm|ogg)$/i;

    const manifestMedia = await discoverMediaFromManifest(normalizedFolder, mediaExt);
    if (manifestMedia.length) return manifestMedia;

    try {
      const response = await fetch(normalizedFolder);
      if (!response.ok) return [];

      const html = await response.text();
      const links = [...html.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);

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

  async function discoverMediaFromManifest(folderPath, mediaExt){
    try {
      const response = await fetch(`${folderPath}media.json`, { cache: "no-store" });
      if (!response.ok) return [];

      const payload = await response.json();
      const files = Array.isArray(payload)
        ? payload
        : (Array.isArray(payload?.files) ? payload.files : []);

      return files
        .map(file => String(file || "").trim())
        .filter(file => mediaExt.test(file))
        .map(file => file.includes("/") ? file : `${folderPath}${file}`);
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

  function resolveInitialMediaIndex(mediaList, project, folderName){
    if (!Array.isArray(mediaList) || !mediaList.length) return 0;

    const configuredDefault = String(project?.defaultImage || "").trim();
    if (configuredDefault) {
      const defaultCandidates = buildDefaultImageCandidates(configuredDefault, folderName);
      for (const candidate of defaultCandidates) {
        const idx = mediaList.findIndex(path => sameMediaPath(path, candidate));
        if (idx >= 0 && !isVideoPath(mediaList[idx])) return idx;
      }
    }

    const firstImageIndex = mediaList.findIndex(path => !isVideoPath(path));
    return firstImageIndex >= 0 ? firstImageIndex : 0;
  }

  function buildDefaultImageCandidates(defaultImage, folderName){
    const clean = String(defaultImage).trim();
    if (!clean) return [];

    const normalizedFolder = folderName ? `assets/projects/${folderName}/` : "";
    const fileName = clean.split("/").pop() || "";

    const candidates = [clean];
    if (normalizedFolder && fileName) candidates.push(`${normalizedFolder}${fileName}`);

    return Array.from(new Set(candidates));
  }

  function sameMediaPath(a, b){
    const normalize = (value) => decodeURIComponent(String(value || ""))
      .split("?")[0]
      .split("#")[0]
      .replace(/^\.\//, "")
      .replace(/\\/g, "/")
      .toLowerCase();

    return normalize(a) === normalize(b);
  }

  function setupLightbox(){
    const root = document.getElementById("mediaLightbox");
    const backdrop = document.getElementById("lightboxBackdrop");
    const closeBtn = document.getElementById("lightboxClose");
    const prevBtn = document.getElementById("lightboxPrev");
    const nextBtn = document.getElementById("lightboxNext");
    const image = document.getElementById("lightboxImage");

    let galleryItems = [];
    let galleryOriginalIndexes = [];
    let galleryIndex = 0;
    let onChange = null;

    if (!root || !backdrop || !closeBtn || !prevBtn || !nextBtn || !image) {
      return { open: () => {}, openGallery: () => {}, openMediaList: () => {}, close: () => {} };
    }

    const findNextImageIndex = (fromIndex, step) => {
      const len = galleryItems.length;
      if (!len) return -1;
      return (fromIndex + step + len) % len;
    };

    const renderGallery = () => {
      if (!galleryItems.length) return;
      image.src = galleryItems[galleryIndex];
      const single = galleryItems.length <= 1;
      prevBtn.classList.toggle("hidden", single);
      nextBtn.classList.toggle("hidden", single);
      image.style.cursor = single ? "default" : "ew-resize";
      if (typeof onChange === "function") {
        onChange(galleryOriginalIndexes[galleryIndex] ?? galleryIndex, galleryItems[galleryIndex]);
      }
    };

    const goPrev = () => {
      if (galleryItems.length <= 1) return;
      galleryIndex = findNextImageIndex(galleryIndex, -1);
      renderGallery();
    };

    const goNext = () => {
      if (galleryItems.length <= 1) return;
      galleryIndex = findNextImageIndex(galleryIndex, 1);
      renderGallery();
    };

    const close = () => {
      root.classList.remove("open");
      root.setAttribute("aria-hidden", "true");
      image.removeAttribute("src");
      galleryItems = [];
      galleryOriginalIndexes = [];
      galleryIndex = 0;
      onChange = null;
    };

    const open = (src) => {
      galleryItems = [src];
      galleryOriginalIndexes = [0];
      galleryIndex = 0;
      onChange = null;
      renderGallery();
      root.classList.add("open");
      root.setAttribute("aria-hidden", "false");
    };

    const openMediaList = (items, startIndex = 0, onMediaChange = null) => {
      const normalized = Array.isArray(items) ? items.filter(Boolean) : [];
      if (!normalized.length) return;

      // Keep only images in lightbox gallery, but preserve index mapping to the original carousel list.
      const imageEntries = normalized
        .map((item, originalIndex) => ({ item, originalIndex }))
        .filter(entry => !isVideoPath(entry.item));

      if (!imageEntries.length) return;

      galleryItems = imageEntries.map(entry => entry.item);
      galleryOriginalIndexes = imageEntries.map(entry => entry.originalIndex);

      const requestedOriginalIndex = Math.max(0, Math.min(Number(startIndex) || 0, normalized.length - 1));
      const mappedIndex = galleryOriginalIndexes.indexOf(requestedOriginalIndex);
      galleryIndex = mappedIndex >= 0 ? mappedIndex : 0;
      onChange = onMediaChange;

      renderGallery();
      root.classList.add("open");
      root.setAttribute("aria-hidden", "false");
    };

    const openGallery = (items, startIndex = 0, onGalleryChange = null) => {
      openMediaList(items, startIndex, (_index, path) => {
        if (typeof onGalleryChange === "function") onGalleryChange(path);
      });
    };

    backdrop.addEventListener("click", close);
    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", goPrev);
    nextBtn.addEventListener("click", goNext);
    image.addEventListener("click", (e) => {
      if (galleryItems.length <= 1) return;
      const rect = image.getBoundingClientRect();
      const x = e.clientX - rect.left;
      if (x < rect.width * 0.5) goPrev();
      else goNext();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && root.classList.contains("open")) close();
      if (e.key === "ArrowLeft" && root.classList.contains("open")) goPrev();
      if (e.key === "ArrowRight" && root.classList.contains("open")) goNext();
    });

    return { open, openGallery, openMediaList, close };
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, s => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[s]));
  }
})();