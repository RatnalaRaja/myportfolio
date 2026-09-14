import { portfolioData } from './data.js';

class PortfolioApp {
  constructor() {
    this.data = portfolioData;
    this.audioEnabled = false;
    this.audioCtx = null;
    this.commandHistory = [];
    this.historyIndex = -1;

    this.initTypewriter();
    this.renderStats();
    this.renderSkills('cloudDevops');
    this.renderExperience();
    this.renderProjects('all');
    this.renderCertifications();
    this.renderAchievements();
    this.bindEvents();
    this.initHoloTilt();
    this.initGlassCursor();
  }

  // Ultra-Fast Zero-Lag Cursor Spotlight
  initGlassCursor() {
    const lens = document.getElementById('glass-cursor-lens');
    let mouseX = -500;
    let mouseY = -500;
    let ticking = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!ticking) {
        requestAnimationFrame(() => {
          if (lens) {
            lens.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate3d(-50%, -50%, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // Web Audio API Synthesizer for Cyber SFX
  playSfx(type = 'click') {
    if (!this.audioEnabled) return;
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      const now = this.audioCtx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'terminal') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.setValueAtTime(650, now + 0.02);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) {
      console.warn('Audio Context error', e);
    }
  }

  // Dynamic Typewriter Effect
  initTypewriter() {
    const textEl = document.getElementById('typewriter-text');
    if (!textEl) return;

    const words = [
      "Associate Software Engineer @ Tricon Infotech",
      "AWS Cloud & Infrastructure Specialist",
      "Generative AI & LLM Systems Builder",
      "FastAPI & Microservices Backend Developer",
      "HackerRank 5★ C++ & Python Problem Solver"
    ];

    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    const type = () => {
      const currentWord = words[wordIdx];

      if (isDeleting) {
        textEl.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 35;
      } else {
        textEl.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 65;
      }

      if (!isDeleting && charIdx === currentWord.length) {
        typingSpeed = 2200; // Pause at end of sentence
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        typingSpeed = 400; // Pause before new sentence
      }

      setTimeout(type, typingSpeed);
    };

    type();
  }

  // Render Stats
  renderStats() {
    const container = document.getElementById('hero-stats-container');
    if (!container) return;

    container.innerHTML = this.data.personal.stats.map(stat => `
      <div class="stat-item">
        <span class="stat-val">${stat.value}</span>
        <span class="stat-lbl">${stat.label}</span>
      </div>
    `).join('');
  }

  // 3D Card Hover / Tilt with Magnification & Glow
  initHoloTilt() {
    const card = document.getElementById('holo-card');
    if (!card) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `perspective(1000px) rotateY(${x * 0.06}deg) rotateX(${-y * 0.06}deg) scale(1.04) translateY(-8px)`;
      card.style.borderColor = 'rgba(37, 99, 235, 0.85)';
      card.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 45px rgba(37, 99, 235, 0.45)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1) translateY(0)';
      card.style.borderColor = '';
      card.style.boxShadow = '';
    });
  }

  // Render Skills
  renderSkills(categoryKey) {
    const container = document.getElementById('skills-grid-container');
    if (!container) return;

    const skills = this.data.skills[categoryKey] || [];
    container.innerHTML = skills.map(skill => `
      <div class="skill-card">
        <div class="skill-header">
          <div class="skill-identity">
            <img src="${skill.icon}" alt="${skill.name}" class="skill-icon" onerror="this.style.display='none'">
            <div class="skill-name">${skill.name}</div>
          </div>
          <span class="skill-level-pct">${skill.level}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" style="width: ${skill.level}%;"></div>
        </div>
        <div class="skill-desc">${skill.desc}</div>
      </div>
    `).join('');
  }

  // Render Experience & Education Timeline
  renderExperience() {
    const container = document.getElementById('experience-timeline');
    if (!container) return;

    const experiences = this.data.experience.map(exp => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-meta">
            <h3 class="timeline-role">${exp.role}</h3>
            <span class="timeline-period">${exp.period}</span>
          </div>
          <div class="timeline-company">
            <i class="fa-solid fa-building"></i>
            <strong>${exp.company}</strong>
            <span>• ${exp.location} (${exp.type})</span>
          </div>
          <ul class="timeline-highlights">
            ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
          <div class="timeline-tags">
            ${exp.skillsUsed.map(tag => `<span class="tag-badge">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    const education = `
      <div class="timeline-item">
        <div class="timeline-dot" style="border-color: var(--purple); box-shadow: 0 0 15px var(--purple);"></div>
        <div class="timeline-content">
          <div class="timeline-meta">
            <h3 class="timeline-role">B.Tech in Computer Science & Engineering (IoT)</h3>
            <span class="timeline-period">2021 – 2025</span>
          </div>
          <div class="timeline-company">
            <i class="fa-solid fa-graduation-cap"></i>
            <strong>Aditya College of Engineering and Technology (ACET)</strong>
            <span>• GPA: 7.9 / 10</span>
          </div>
          <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; margin-bottom: 1rem;">
            Core foundation in Distributed Systems, Computer Networks, Operating Systems, IoT Architectures, and Object-Oriented Software Design.
          </p>
          <div class="timeline-tags">
            <span class="tag-badge">Data Structures</span>
            <span class="tag-badge">Cloud Computing</span>
            <span class="tag-badge">Internet of Things</span>
            <span class="tag-badge">Database Management</span>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = experiences + education;
  }

  // Render Projects
  renderProjects(filterKey = 'all') {
    const container = document.getElementById('projects-grid-container');
    if (!container) return;

    const filtered = filterKey === 'all'
      ? this.data.projects
      : this.data.projects.filter(p => p.category === filterKey);

    container.innerHTML = filtered.map(proj => `
      <div class="project-card" data-id="${proj.id}">
        <div class="project-image-wrap">
          <img src="${proj.image}" alt="${proj.title}" onerror="this.src='https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60'">
          <span class="project-category-badge">${proj.categoryLabel}</span>
        </div>
        <div class="project-body">
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">${proj.description}</p>
          <div class="project-metrics">
            ${proj.metrics.map(m => `<span class="metric-pill">${m}</span>`).join('')}
          </div>
          <div class="timeline-tags">
            ${proj.tags.slice(0, 4).map(t => `<span class="tag-badge">${t}</span>`).join('')}
          </div>
          <div class="project-footer">
            <div class="project-links">
              <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="project-link-btn" title="GitHub Code">
                <i class="fa-brands fa-github"></i>
                <span>Source</span>
              </a>
            </div>
            <button type="button" class="btn-primary view-project-btn" data-id="${proj.id}" style="padding: 0.4rem 1rem; font-size: 0.8rem;">
              <span>Details</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render Certifications
  renderCertifications() {
    const container = document.getElementById('certs-grid-container');
    if (!container) return;

    container.innerHTML = this.data.certifications.map(cert => `
      <div class="cert-card">
        <div class="cert-icon-wrap">
          <img src="${cert.icon}" alt="${cert.badge}">
        </div>
        <div class="cert-body">
          <span class="cert-badge-tag">${cert.badge}</span>
          <h4 class="cert-title">${cert.title}</h4>
          <span class="cert-issuer">${cert.issuer}</span>
          <p class="cert-desc">${cert.description}</p>
        </div>
      </div>
    `).join('');
  }

  // Render Achievements
  renderAchievements() {
    const container = document.getElementById('achievements-grid-container');
    if (!container) return;

    container.innerHTML = this.data.achievements.map(ach => `
      <div class="achievement-card">
        <div class="achieve-stars">${ach.rating}</div>
        <div class="achieve-plat">${ach.platform}</div>
        <h4 class="achieve-title">${ach.title}</h4>
        <div class="achieve-desc">${ach.desc}</div>
      </div>
    `).join('');
  }

  // Open Project Modal
  openModal(projectId) {
    const proj = this.data.projects.find(p => p.id === projectId);
    if (!proj) return;

    document.getElementById('modal-img').src = proj.image;
    document.getElementById('modal-category').textContent = proj.categoryLabel;
    document.getElementById('modal-title').textContent = proj.title;
    document.getElementById('modal-desc').textContent = proj.longDescription;
    document.getElementById('modal-github-link').href = proj.github;

    const metricsContainer = document.getElementById('modal-metrics');
    metricsContainer.innerHTML = proj.metrics.map(m => `<span class="metric-pill" style="font-size: 0.82rem;">${m}</span>`).join('');

    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = proj.tags.map(t => `<span class="tag-badge" style="font-size: 0.85rem;">${t}</span>`).join('');

    const modal = document.getElementById('project-modal');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    this.playSfx('click');
  }

  closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    this.playSfx('click');
  }

  // Terminal CLI Logic
  executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    this.playSfx('terminal');
    const body = document.getElementById('terminal-body');

    // Add user command line
    const userLine = document.createElement('div');
    userLine.className = 'terminal-line';
    userLine.innerHTML = `<span class="t-prompt">raja@cloud:~$</span> <span class="t-cmd">${rawCmd}</span>`;
    body.appendChild(userLine);

    const outLine = document.createElement('div');
    outLine.className = 'terminal-line t-output';

    switch (cmd) {
      case 'help':
        outLine.innerHTML = `
Available System Commands:
  • <span class="t-success">whoami</span>        - Display operator profile & current role
  • <span class="t-success">skills</span>        - Matrix of technical competencies
  • <span class="t-success">projects</span>      - List core production projects & links
  • <span class="t-success">experience</span>    - Professional career timeline
  • <span class="t-success">certs</span>         - Industry cloud & Linux certifications
  • <span class="t-success">contact</span>       - Communication endpoints & channels
  • <span class="t-success">cat resume</span>    - Read summary of CV
  • <span class="t-success">sudo hire raja</span>  - Execute expedited hiring protocol
  • <span class="t-success">clear</span>         - Flush terminal output buffer
        `;
        break;

      case 'whoami':
      case 'bio':
        outLine.innerHTML = `
<span class="t-accent">User:</span> Ratnala Raja
<span class="t-accent">Designation:</span> Associate Software Engineer @ Tricon Infotech (Bangalore)
<span class="t-accent">Focus:</span> Cloud Architecture (AWS/Azure), Generative AI / LLMs, Microservices
<span class="t-accent">Education:</span> B.Tech CSE (IoT) - Aditya College of Engg & Tech (7.9 GPA)
<span class="t-accent">Mission:</span> Building robust, highly scalable, and intelligent cloud systems.
        `;
        break;

      case 'skills':
        outLine.innerHTML = `
<span class="t-accent">☁️ Cloud & DevOps:</span> AWS (Lambda, S3, EC2, VPC, DynamoDB), Azure, Docker, Kubernetes, Terraform, CI/CD
<span class="t-accent">🧠 GenAI & ML:</span> LLMs, RAG, LangChain, Embeddings, AI Agents, PyTorch, OpenCV, DeepFake Detection
<span class="t-accent">⚡ Backend:</span> Python, FastAPI, Django, Node.js, PostgreSQL, Redis, Microservices
<span class="t-accent">💻 Languages:</span> C++, Java, Python, JavaScript, Linux Bash, SQL
        `;
        break;

      case 'projects':
        outLine.innerHTML = `
1. <span class="t-success">AWS Lambda Email Outreach</span> - Serverless marketing platform (+150% capacity)
2. <span class="t-success">SonarQube CI/CD Engine</span> - Automated code security & static inspection
3. <span class="t-success">DeepFake AI Detection</span> - Real-time facial manipulation video scanner
4. <span class="t-success">Terraform Multi-Cloud</span> - Reusable Infrastructure-as-Code modules
5. <span class="t-success">FastAPI Enterprise Stack</span> - Ultra low-latency microservice architecture
Type 'open <project-number>' or click the portfolio cards to inspect details.
        `;
        break;

      case 'experience':
      case 'exp':
        outLine.innerHTML = `
[2025 - Present] <span class="t-accent">Tricon Infotech:</span> Associate Software Engineer (Bangalore)
[2023 - 2023]    <span class="t-accent">Technical Hub:</span> AWS Cloud Computing Intern (Surampalem)
[2023 - 2023]    <span class="t-accent">Technical Hub:</span> Java Developer Intern
        `;
        break;

      case 'certs':
      case 'certifications':
        outLine.innerHTML = `
✔ <span class="t-success">AWS Certified Cloud Practitioner</span> (Amazon Web Services)
✔ <span class="t-success">AWS AI Certified</span> (Amazon Web Services)
✔ <span class="t-success">Microsoft Certified: Azure Fundamentals (AZ-900)</span>
✔ <span class="t-success">RedHat Certified System Administrator (RHCSA)</span>
✔ <span class="t-success">IT Specialist Python Certification</span> (Certiport)
        `;
        break;

      case 'contact':
        outLine.innerHTML = `
Email:    <a href="mailto:rk635238@gmail.com" class="t-accent">rk635238@gmail.com</a>
Phone:    <span class="t-accent">+91 7903899968</span>
LinkedIn: <a href="https://www.linkedin.com/in/rajaratnala/" target="_blank" class="t-accent">linkedin.com/in/rajaratnala/</a>
GitHub:   <a href="https://github.com/RatnalaRaja" target="_blank" class="t-accent">github.com/RatnalaRaja</a>
Location: Bangalore, Karnataka, India
        `;
        break;

      case 'cat resume':
      case 'cat resume.txt':
      case 'cat cv':
        outLine.innerHTML = `
<span class="t-accent">RATNALA RAJA - SUMMARY</span>
• Associate Software Engineer specializing in AWS Cloud, GenAI & Microservices.
• 39+ Repositories on GitHub; 5 Industry Certifications (AWS, Azure, RedHat).
• 5-Star in C++ and Python on HackerRank; 2-Star on CodeChef.
• Download the official document via: <a href="Ratnala_Raja_CV.pdf" download class="t-success">[Click to Download PDF]</a>
        `;
        break;

      case 'sudo hire raja':
      case 'hire':
        outLine.innerHTML = `
<span class="t-success" style="font-weight: bold;">[ACCESS GRANTED]</span> 🎉 Exceptional choice! Initializing offer pipeline...
Redirecting to direct transmission: Send email to <a href="mailto:rk635238@gmail.com?subject=Offer%20Discussion" class="t-accent">rk635238@gmail.com</a> or call <span class="t-accent">+91 7903899968</span>!
        `;
        this.playSfx('success');
        break;

      case 'clear':
        body.innerHTML = '';
        return;

      default:
        outLine.innerHTML = `<span class="t-error">command not found:</span> ${rawCmd}. Type <span class="t-success">'help'</span> for list of available commands.`;
        break;
    }

    body.appendChild(outLine);
    body.scrollTop = body.scrollHeight;
  }

  showToast(text) {
    const toast = document.getElementById('toast-msg');
    const toastText = document.getElementById('toast-text');
    if (!toast || !toastText) return;

    toastText.textContent = text;
    toast.classList.add('show');
    this.playSfx('success');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Bind All UI Events
  bindEvents() {
    // Audio Toggle
    const audioBtn = document.getElementById('audio-toggle');
    const audioIndicator = document.getElementById('audio-indicator');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        this.audioEnabled = !this.audioEnabled;
        if (this.audioEnabled) {
          audioIndicator.classList.remove('muted');
          this.playSfx('success');
          this.showToast('Audio SFX Activated');
        } else {
          audioIndicator.classList.add('muted');
          this.showToast('Audio Muted');
        }
      });
    }

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        this.playSfx('click');
      });

      // Close menu on link click
      navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => navLinks.classList.remove('open'));
      });
    }

    // Skills Category Tabs
    const skillTabs = document.querySelectorAll('.skill-tab-btn');
    skillTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        skillTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        this.renderSkills(cat);
        this.playSfx('click');
      });
    });

    // Projects Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        this.renderProjects(filter);
        this.playSfx('click');
      });
    });

    // Project Details Click (Event Delegation)
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.view-project-btn');
      if (btn) {
        const id = btn.getAttribute('data-id');
        this.openModal(id);
      }
    });

    // Modal Close Events
    const closeBtn = document.getElementById('modal-close-btn');
    const modal = document.getElementById('project-modal');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal();
      });
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });

    // Terminal Input
    const termInput = document.getElementById('terminal-input');
    if (termInput) {
      termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = termInput.value;
          if (val.trim()) {
            this.commandHistory.push(val);
            this.historyIndex = this.commandHistory.length;
            this.executeCommand(val);
            termInput.value = '';
          }
        } else if (e.key === 'ArrowUp') {
          if (this.historyIndex > 0) {
            this.historyIndex--;
            termInput.value = this.commandHistory[this.historyIndex];
          }
        } else if (e.key === 'ArrowDown') {
          if (this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
            termInput.value = this.commandHistory[this.historyIndex];
          } else {
            this.historyIndex = this.commandHistory.length;
            termInput.value = '';
          }
        }
      });
    }

    // Terminal Chips Click
    const chips = document.querySelectorAll('.prompt-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        this.executeCommand(cmd);
      });
    });

    // Copy Email Action
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText('rk635238@gmail.com').then(() => {
          this.showToast('Email copied to clipboard: rk635238@gmail.com');
        }).catch(() => {
          this.showToast('Email: rk635238@gmail.com');
        });
      });
    }

    // Contact Form Submission
    const form = document.getElementById('portfolio-contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('form-name').value;
        this.showToast(`Thank you, ${name}! Your transmission has been logged.`);
        form.reset();
      });
    }

    // Scroll spy for Navbar active link
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section');
      const scrollPos = window.scrollY + 200;

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    });
  }
}

// Instantiate on load
window.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
});
