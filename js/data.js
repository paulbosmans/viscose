window.PORTFOLIO = {
  person: {
    name: "Paul Bosmans",
    location: "Ollon VD",
    languagesQuick: "French native, English C1",
    availability: "Full-time / Contract",
    email: "paul.bosmans@proton.me",
    phone: "+41 76 366 28 58",
    address: "Route de la distillerie 28, 1867 Ollon",
    linkedin: "https://www.linkedin.com/in/paul-bosmans",
    github: "#",
    cvPdf: "CV_Paul_Bosmans.pdf",
  },

  hero: {
    summary:
      "I develop technical products from concept to industrialization, combining strong mechanical design skills with rapid prototyping and pragmatic validation. Experience spans indoor inspection drones and high-precision metrology systems.",
    chips: ["Creo", "SolidWorks", "Fusion 360", "CATIA", "DFM/DFA", "Rapid Prototyping"],
  },

  summary: {
    text:
      "Mechanical engineer with a Master’s degree in Micro-Engineering and extensive experience in product development, prototyping, and industrialization. I support projects from early concept and system architecture through detailed design, testing, and transition to mass production.\n\nMy expertise includes precision mechanical design, tolerance analysis, DFM/DFA, injection molding, CNC machining, sheet metal, and high-performance polymer parts. I also integrate electronic components into mechanical systems, including PCB integration, enclosure design, thermal considerations, and hands-on soldering and assembly of electronic components.\n\nWith a strong systems-level mindset, I approach each project with a comprehensive understanding of the product as a whole — mechanics, electronics, manufacturability, reliability, and cost optimization. I have led and contributed to projects involving drones, precision measurement instruments, consumer products, and modular systems.\n\nHands-on and solution-oriented, I combine advanced CAD expertise (Creo, Fusion 360), rapid prototyping (SLA/FDM), supplier coordination, electronic integration, and manufacturing optimization to deliver robust, production-ready designs.\n\nI thrive at the intersection of engineering rigor, practical prototyping, and scalable industrial solutions.",
  },

  projects: {
    note:
      "For confidential/internal work, descriptions are intentionally high-level. I can share more details during interviews under NDA if needed.",
    items: [
      // WIP product — no name/branding, but WITH a confidential image slot
      {
        id: "wip-product",
        category: "Personal Product · Work in Progress",
        title: "Modular Training Device (Work in Progress)",
        description:
          "Development of a modular physical training device designed to improve hand dexterity, grip strength, and fine motor control. The project explores new approaches to physical interaction and skill training through a compact and versatile mechanical system. The device is intended for multiple applications including climbing training, rehabilitation exercises, and general hand coordination development. The work focuses on creating a robust and intuitive object capable of supporting repetitive use while remaining adaptable to different training scenarios.",
        bullets: [
          "Scope: concept exploration → mechanical architecture → iterative prototyping → user testing → validation and refinement for manufacturability",
          "Focus: durability, ergonomic interaction, modularity, repeatable assembly, and user-centered design",
          "Validation: prototypes are evaluated through iterative testing with end users to assess usability, ergonomics, and training effectiveness.",
          "Status: ongoing development — technical details remain confidential while the product is being refined.",
        ],
        tags: ["Mechanical Design", "Rapid Prototyping", "Product Development", "DFM/DFA", "User Testing", "Human Interaction"],
        // Confidential image placeholder (add this file when ready)
        media: "assets/projects/confidential.jpg",
        confidentialLabel: "CONFIDENTIAL",
        links: [],
      },

      {
        id: "micro-surgery-room",
        category: "Master in Microengineering · CHUV Collaboration",
        title: "Micro-Surgery Room — Office Surgery Concept Development",
        description:
          "Mechanical concept development of a localized sterile surgical environment designed to enable carpal tunnel surgery outside a traditional operating room. The project was carried out during a Master in Microengineering in collaboration with surgeons from CHUV, within an interdisciplinary medical device development program.",
        bullets: [
          "Concept development: localized sterile environment around the surgical site",
          "Medical device design: mechanical architecture for a compact micro-surgery station",
          "Process optimization: reduction of preparation time, waste, and operational costs",
          "Human-centered design: improving patient comfort while maintaining surgical safety",
          "Objective: support office-based surgery adoption (already established in Canada, still limited in Switzerland)",
        ],
        tags: [
          "Medical Device",
          "Surgical Environment",
          "Concept Development",
          "Healthcare Engineering",
          "ISO 13485",
        ],
        links: [],
      },

      {
        id: "elios3-rad",
        category: "Flyability · Elios 3",
        title: "Elios 3 RAD — Radiation Payload Integration & Validation",
        description:
          "Mechanical integration and productization support for a radiation-sensing payload on an indoor inspection drone. Focus on robust integration, repeatable mounting, and validation aligned with field operations.",
        bullets: [
          "Mechanical integration: packaging, mounting strategy, tolerance stack-up awareness",
          "Design for reliability: ruggedness, serviceability, and repeatable assembly",
          "Validation support: ensuring mechanical performance under operational constraints",
        ],
        tags: ["Integration", "Validation", "Rugged Design", "Field Constraints"],
        media: "assets/projects/elios3-rad.jpg",
        links: [
          { label: "Public: Elios 3", url: "https://www.flyability.com/elios-3" },
          { label: "Public: RAD Payload", url: "https://www.flyability.com/elios-3-rad-payload" },
        ],
      },

      {
        id: "elios3-cleaning",
        category: "Flyability · Elios 3",
        title: "Elios 3 — Cleaning Mechanism / Solution (Specialized Missions)",
        description:
          "Development work around cleaning-related mechanisms/solutions for specialized inspection missions, with emphasis on usability, robustness, and fast handling in the field.",
        bullets: [
          "Concept-to-prototype iterations with practical service constraints in mind",
          "Design choices focused on durability, ease of use, and quick turnaround maintenance",
          "Integration constraints: envelope, assembly, and operational handling",
        ],
        tags: ["Product Design", "Serviceability", "Prototyping", "Field UX"],
        mediaFolder: "elios3-cleaning",
        defaultImage: "1-cleaning.jpg",
        media: "assets/projects/elios3-cleaning/1-cleaning.jpg",
        links: [
          { label: "Public: Cleaning guidance", url: "https://www.flyability.com/knowledge-base/cleaning-elios" },
        ],
      },

      {
        id: "elios2-mfg",
        category: "Flyability · Elios 2",
        title: "Elios 2 — Series Prototypes, Manufacturing Support & Maintenance",
        description:
          "Support across series prototypes and production assistance for an indoor inspection drone: manufacturing readiness, process improvements, and maintainability considerations.",
        bullets: [
          "Production support: resolving manufacturing issues and improving assembly processes",
          "Design for manufacturing & injection molding: weight reduction, durability, assembly simplification",
          "Testing/validation: durability and environmental resistance focus",
        ],
        tags: ["Industrialization", "Manufacturing", "Maintenance", "Continuous Improvement"],
        media: "assets/projects/elios2-mfg.jpg",
        links: [
          { label: "Public: Elios 2", url: "https://www.flyability.com/news/flyability-elios-2-indoor-inspections" },
        ],
      },

      {
        id: "elios3-early",
        category: "Flyability · R&D",
        title: "Early Flying Platform Prototypes — Development & Manufacturing",
        description:
          "Early-stage prototype development and manufacturing for a flying platform initiative in an international R&D context, focusing on fast iteration loops and test-driven improvements.",
        bullets: [
          "Rapid build-test cycles to accelerate learning and de-risk design choices",
          "Prototype manufacturing support: fixtures, assembly practicality, repeatability",
          "Cross-team collaboration with electronics/software for integration realities",
        ],
        tags: ["R&D", "Rapid Iteration", "Prototyping", "Testing"],
        media: "assets/projects/elios3-early.jpg",
        links: [],
      },

      {
        id: "sylvac-p25d",
        category: "Sylvac · Metrology Handtool",
        title: "High-End Measuring Handtool — Development & Industrialization (P25D Smart)",
        description:
          "Development and industrialization contributions for a high-precision metrology handtool, focusing on robust mechanics, tight tolerances, and manufacturing documentation.",
        bullets: [
          "Detailed technical drawings for industrialization (tight tolerances, manufacturing constraints)",
          "Continuous improvement based on field feedback and problem analysis",
          "Design decisions aligned with assembly repeatability and quality requirements",
        ],
        tags: ["Precision Mechanics", "Industrialization", "Quality", "DFM"],
        media: "assets/projects/sylvac-p25d.jpg",
        links: [
          { label: "Public: P25D Smart", url: "https://www.sylvac.ch/product/absolute-digital-measuring-probe-p25d-smart/" },
        ],
      },

      {
        id: "sylvac-s65",
        category: "Sylvac · Optical Measurement System",
        title: "Sylvac SCAN S65 — Industrialization",
        description:
          "Industrialization work on an optical measurement system for cylindrical parts, covering production readiness and system-level assembly robustness.",
        bullets: [
          "Industrialization support: drawings, assembly considerations, manufacturing constraints",
          "Reliability mindset: robustness, maintainability, and repeatable builds",
          "Collaboration with production and quality stakeholders",
        ],
        tags: ["Industrialization", "Systems", "Manufacturing", "Documentation"],
        media: "assets/projects/sylvac-s65.jpg",
        links: [
          { label: "Public: SCAN S65", url: "https://www.sylvac.ch/product/optical-measurement-sylvac-scan-s65/" },
          { label: "Public: Product news", url: "https://www.sylvac.ch/new-product-optical-machine-scan-s65/" },
        ],
      },
    ],
  },

  // Carousel images: list everything that exists in assets/projects/
  // Add/remove files here.
  gallery: {
    images: [
      "assets/projects/elios3-rad.jpg",
      "assets/projects/Elios3 cleaning.mp4",
      "assets/projects/elios3-cleaning.jpg",
      "assets/projects/elios2-mfg.jpg",
      "assets/projects/elios3-early.jpg",
      "assets/projects/sylvac-s65.jpg",
      "assets/projects/confidential.jpg"
    ]
  },

  skills: {
    software: [
      { name: "Creo", level: 80 },
      { name: "SolidWorks", level: 90 },
      { name: "Fusion 360", level: 80 },
      { name: "CATIA", level: 60 },
      { name: "Microsoft Office", level: 90 }
    ],
    programming: [
      { name: "C", level: 60 },
      { name: "C++", level: 40 },
      { name: "Python", level: 60 },
      { name: "MATLAB", level: 70 },
      { name: "LaTeX", level: 80 }
    ],
    strengths: [
      "Rapid prototyping (FDM/SLA), machining, assembly, experimental validation",
      "Design for manufacturing and injection molding optimization",
      "Tight-tolerance drawings and industrialization documentation",
      "Cross-disciplinary integration with electronics/software teams",
    ],
  },

  contact: {
    intro: "For full-time opportunities or contract work, feel free to reach out by email or phone.",
  },
};