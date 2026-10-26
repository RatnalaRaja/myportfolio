/**
 * Ratnala Raja Portfolio — app.js
 * Inspired by Ajay Bobbili's portfolio design
 */

class PortfolioApp {
  constructor() {
    this.data = window.portfolioData;
    this.activeSkillCategory = 'all';
    this.activeSkillElement = null;
    this.expandedWorkCard = 0;
    this.allSkills = [];

    this.init();
  }

  init() {
    this.buildAllSkillsList();
    this.renderSkillFilters();
    this.renderSkillsGrid('all');
    this.renderWorkCards();
    this.renderCertifications();
    this.renderTimeline();
    this.renderAchievements();
    this.bindMobileMenu();
    this.bindEmailCopy();
    this.bindBackToTop();
    this.bindContactForm();
    this.bindScrollReveal();
    this.bindHeroAvatarParallax();
    this.bindHeroSoundAndVideo();
    this.bindIdCard();
    this.bindNavIndicator();
    this.bindNavScroll();
    this.bindResumeDownload();
  }

  /* ─── Skills ─── */
  buildAllSkillsList() {
    const categories = Object.keys(this.data.skills);
    this.allSkills = [];
    let globalIdx = 1;

    const categoryLabels = {
      cloudDevops: 'Cloud & DevOps',
      aiGenAI: 'AI & GenAI',
      backend: 'Backend',
      observability: 'Observability Tools',
      languagesDsa: 'Languages & DSA'
    };

    categories.forEach(cat => {
      this.data.skills[cat].forEach(skill => {
        // Generate a 2-letter periodic table symbol from the skill name
        const words = skill.name.replace(/[^a-zA-Z ]/g, '').trim().split(/\s+/);
        let symbol;
        if (words.length >= 2) {
          symbol = (words[0][0] + words[1][0]).slice(0, 2);
        } else {
          symbol = words[0].slice(0, 2);
        }
        symbol = symbol.charAt(0).toUpperCase() + symbol.charAt(1).toLowerCase();

        // Extract usage bullets from desc
        const bullets = skill.desc ? skill.desc.split(',').map(s => s.trim()).filter(Boolean) : [];

        this.allSkills.push({
          idx: globalIdx++,
          category: cat,
          categoryLabel: categoryLabels[cat],
          name: skill.name,
          symbol,
          icon: skill.icon,
          desc: skill.desc,
          level: skill.level,
          bullets
        });
      });
    });
  }

  renderSkillFilters() {
    const bar = document.getElementById('skills-filter-bar');
    if (!bar) return;

    const categoryLabels = {
      all: 'All',
      cloudDevops: 'Cloud & DevOps',
      aiGenAI: 'AI & GenAI',
      backend: 'Backend',
      observability: 'Observability Tools',
      languagesDsa: 'Languages & DSA'
    };

    const categories = ['all', 'cloudDevops', 'aiGenAI', 'backend', 'observability', 'languagesDsa'];

    categories.forEach(cat => {
      const count = cat === 'all'
        ? this.allSkills.length
        : this.data.skills[cat]?.length || 0;

      const btn = document.createElement('button');
      btn.className = `skill-filter-btn ${cat === 'all' ? 'active' : ''}`;
      btn.dataset.cat = cat;
      btn.innerHTML = `${categoryLabels[cat]} <span class="skill-filter-count">${count}</span>`;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.skill-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeSkillCategory = cat;
        this.activeSkillElement = null;
        this.renderSkillsGrid(cat);
        this.clearSkillDetail();
      });
      bar.appendChild(btn);
    });
  }

  renderSkillsGrid(category) {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const skills = category === 'all'
      ? this.allSkills
      : this.allSkills.filter(s => s.category === category);

    skills.forEach((skill, i) => {
      const el = document.createElement('div');
      el.className = 'skill-element reveal';
      el.dataset.name = skill.name;
      el.dataset.idx = i;
      el.innerHTML = `
        <span class="skill-element-num">${skill.idx}</span>
        <span class="skill-element-symbol">${skill.symbol}</span>
        <span class="skill-element-name">${skill.name}</span>
      `;
      el.addEventListener('click', () => {
        document.querySelectorAll('.skill-element').forEach(e => e.classList.remove('active'));
        el.classList.add('active');
        this.activeSkillElement = skill;
        this.renderSkillDetail(skill, i + 1);
      });
      grid.appendChild(el);
    });

    // Re-trigger reveal animations
    setTimeout(() => {
      document.querySelectorAll('.skill-element.reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 25);
      });
    }, 50);
  }

  renderSkillDetail(skill, num) {
    const card = document.getElementById('skill-detail-card');
    if (!card) return;

    const bulletsList = skill.bullets.map(b =>
      `<div class="skill-detail-bullet">${b}</div>`
    ).join('');

    card.innerHTML = `
      <div class="skill-detail-num-cat">${String(num).padStart(2, '0')} · ${skill.categoryLabel.toUpperCase()}</div>
      <div class="skill-detail-icon-wrap">
        <img src="${skill.icon || 'logos/aws.svg'}" alt="${skill.name}" onerror="if (!this.dataset.triedFallback && ('${skill.name}'.toLowerCase().includes('aws'))) { this.dataset.triedFallback = 'true'; this.src = 'logos/aws.svg'; } else { this.style.display = 'none'; }">
      </div>
      <div class="skill-detail-name">${skill.name}</div>
      <div class="skill-detail-used-in">ABOUT</div>
      <div class="skill-detail-bullets">${bulletsList}</div>
    `;
    card.style.opacity = '0';
    card.style.transform = 'translateY(8px)';
    requestAnimationFrame(() => {
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  }

  clearSkillDetail() {
    const card = document.getElementById('skill-detail-card');
    card.innerHTML = `
      <div class="skill-detail-placeholder">
        <i class="fa-solid fa-hand-pointer" style="font-size:2rem;opacity:0.3;margin-bottom:1rem;"></i>
        <p>Click any skill to see details</p>
      </div>
    `;
  }

  /* ─── Work / Projects (Horizontal Accordion) ─── */
  renderWorkCards() {
    const container = document.getElementById('work-cards');
    if (!container) return;

    if (this.activeWorkIndex === undefined) {
      this.activeWorkIndex = 0;
    }

    // Top 3 primary showcase projects matching Ajay's 3-card horizontal accordion
    const projects = this.data.projects.slice(0, 3);
    if (!projects.length) return;

    container.innerHTML = '';

    const iconMap = {
      'Fastlane': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/fastlane/fastlane-original.svg',
      'GitHub Actions': 'logos/github-actions.svg',
      'CI/CD': 'logos/github-actions.svg',
      'iOS': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/apple/apple-original.svg',
      'Android': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/android/android-original.svg',
      'AWS Lambda': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      'Python': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
      'Docker': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
      'Terraform': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/terraform/terraform-original.svg',
      'FastAPI': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg',
      'Jenkins': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg',
      'OpenCV': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg',
      'TensorFlow': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg',
      'Amazon SES': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      'CloudWatch': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      'EventBridge': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      'SonarQube': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sonarqube/sonarqube-original.svg',
    };

    const dates = ['JUN 2025', 'JAN 2024', 'NOV 2023'];

    const detailedFeatures = [
      [
        'Automated Fastlane release lanes for iOS & Android',
        'GitHub Actions automated build & test runners',
        'Automated App Store Connect & Play Console upload',
        'Encrypted credentials and keystore secrets management',
        'Automated Match certificates & provisioning profiles',
        '-70% reduction in production release turnaround',
        'Slack & Microsoft Teams deployment status alerts',
        'Multi-environment staging & production promotion'
      ],
      [
        'Event-driven serverless architecture',
        'Auto-scaling AWS Lambda triggers',
        'Amazon SES transactional delivery',
        'EventBridge automated cron jobs',
        'CloudWatch deliverability telemetry',
        '+150% outreach capacity boost',
        '-40% processing latency',
        'IAM least-privilege security roles'
      ],
      [
        'Continuous automated code inspection',
        'Dockerized SonarQube on AWS EC2',
        'Jenkins CI/CD pipeline triggers',
        'Automated quality gate verification',
        'Static security vulnerability scanning',
        'Zero-defect deployment gates',
        'Code smell and technical debt tracking',
        'Automated scan reports on git commit'
      ]
    ];

    const mockupTemplates = [
      // Mockup 0: Mobile CI/CD Deployment (Fastlane & GitHub Actions)
      `
        <div class="work-mockup-frame">
          <div class="mockup-header-dots">
            <div class="mockup-dots">
              <span class="mockup-dot"></span>
              <span class="mockup-dot"></span>
              <span class="mockup-dot"></span>
            </div>
            <span class="mockup-badge" style="background:#eff6ff;color:#1d4ed8;">Fastlane CI/CD</span>
          </div>
          <div class="mockup-search-bar">
            <div class="mockup-search-input" style="font-family:var(--font-mono);font-size:0.68rem;display:flex;align-items:center;padding-left:10px;color:#1d4ed8;">bundle exec fastlane release</div>
            <button class="mockup-search-btn" style="background:#1d4ed8;">Deploy</button>
          </div>
          <div class="mockup-tiles">
            <div class="mockup-tile">
              <div class="mockup-tile-val" style="color:#1d4ed8;">-70%</div>
              <div class="mockup-tile-lbl">Cycle Drop</div>
            </div>
            <div class="mockup-tile">
              <div class="mockup-tile-val" style="color:#16a34a;">100%</div>
              <div class="mockup-tile-lbl">Automated</div>
            </div>
            <div class="mockup-tile">
              <div class="mockup-tile-val">v2.4.0</div>
              <div class="mockup-tile-lbl">Store Build</div>
            </div>
          </div>
          <div class="mockup-rows">
            <div class="mockup-row">
              <div class="mockup-avatar" style="background:#0284c7;"><i class="fa-brands fa-apple" style="font-size:0.65rem;"></i></div>
              <div class="mockup-lines">
                <div class="mockup-line-primary" style="width:72%;"></div>
                <div class="mockup-line-secondary" style="width:48%;"></div>
              </div>
              <span class="mockup-status-tag" style="background:#dbeafe;color:#1e40af;">App Store</span>
            </div>
            <div class="mockup-row">
              <div class="mockup-avatar" style="background:#16a34a;"><i class="fa-brands fa-android" style="font-size:0.65rem;"></i></div>
              <div class="mockup-lines">
                <div class="mockup-line-primary" style="width:82%;"></div>
                <div class="mockup-line-secondary" style="width:52%;"></div>
              </div>
              <span class="mockup-status-tag" style="background:#dcfce7;color:#166534;">Google Play</span>
            </div>
          </div>
        </div>
      `,
      // Mockup 1: Serverless Outreach / Lambda Console
      `
        <div class="work-mockup-frame">
          <div class="mockup-header-dots">
            <div class="mockup-dots">
              <span class="mockup-dot"></span>
              <span class="mockup-dot"></span>
              <span class="mockup-dot"></span>
            </div>
            <span class="mockup-badge">Serverless Pipeline</span>
          </div>
          <div class="mockup-search-bar">
            <div class="mockup-search-input"></div>
            <button class="mockup-search-btn">Broadcast</button>
          </div>
          <div class="mockup-tiles">
            <div class="mockup-tile">
              <div class="mockup-tile-val">150%</div>
              <div class="mockup-tile-lbl">Capacity</div>
            </div>
            <div class="mockup-tile">
              <div class="mockup-tile-val">42ms</div>
              <div class="mockup-tile-lbl">Latency</div>
            </div>
            <div class="mockup-tile">
              <div class="mockup-tile-val">99.8%</div>
              <div class="mockup-tile-lbl">Delivery</div>
            </div>
          </div>
          <div class="mockup-rows">
            <div class="mockup-row">
              <div class="mockup-avatar"><i class="fa-solid fa-bolt" style="font-size:0.6rem;"></i></div>
              <div class="mockup-lines">
                <div class="mockup-line-primary"></div>
                <div class="mockup-line-secondary"></div>
              </div>
              <span class="mockup-status-tag">Sent</span>
            </div>
            <div class="mockup-row">
              <div class="mockup-avatar alt-1"><i class="fa-solid fa-clock" style="font-size:0.6rem;"></i></div>
              <div class="mockup-lines">
                <div class="mockup-line-primary" style="width:58%;"></div>
                <div class="mockup-line-secondary" style="width:38%;"></div>
              </div>
              <span class="mockup-status-tag">Dispatched</span>
            </div>
          </div>
        </div>
      `,
      // Mockup 2: SonarQube Code Quality Engine
      `
        <div class="work-mockup-frame">
          <div class="mockup-header-dots">
            <div class="mockup-dots">
              <span class="mockup-dot"></span>
              <span class="mockup-dot"></span>
              <span class="mockup-dot"></span>
            </div>
            <span class="mockup-badge" style="background:#e8f5e9;color:#2e7d32;">Gate: Passed</span>
          </div>
          <div class="mockup-search-bar">
            <div class="mockup-search-input" style="width:65%;"></div>
            <button class="mockup-search-btn" style="background:#2e7d32;">Run Scan</button>
          </div>
          <div class="mockup-tiles">
            <div class="mockup-tile">
              <div class="mockup-tile-val" style="color:#2e7d32;">0</div>
              <div class="mockup-tile-lbl">Bugs (A)</div>
            </div>
            <div class="mockup-tile">
              <div class="mockup-tile-val" style="color:#2e7d32;">0</div>
              <div class="mockup-tile-lbl">Vulns (A)</div>
            </div>
            <div class="mockup-tile">
              <div class="mockup-tile-val">94.2%</div>
              <div class="mockup-tile-lbl">Coverage</div>
            </div>
          </div>
          <div class="mockup-rows">
            <div class="mockup-row">
              <div class="mockup-avatar" style="background:#0284c7;"><i class="fa-solid fa-shield-halved" style="font-size:0.6rem;"></i></div>
              <div class="mockup-lines">
                <div class="mockup-line-primary" style="width:68%;"></div>
                <div class="mockup-line-secondary" style="width:42%;"></div>
              </div>
              <span class="mockup-status-tag" style="background:#e0f2fe;color:#0369a1;">Verified</span>
            </div>
            <div class="mockup-row">
              <div class="mockup-avatar alt-2"><i class="fa-solid fa-code-commit" style="font-size:0.6rem;"></i></div>
              <div class="mockup-lines">
                <div class="mockup-line-primary" style="width:80%;"></div>
                <div class="mockup-line-secondary" style="width:50%;"></div>
              </div>
              <span class="mockup-status-tag">Clean</span>
            </div>
          </div>
        </div>
      `
    ];

    projects.forEach((project, i) => {
      const card = document.createElement('div');
      const isExpanded = i === this.activeWorkIndex;
      card.className = isExpanded ? 'work-card active' : 'work-card collapsed';
      card.dataset.index = i;

      const dateStr = dates[i] || '2024';

      if (isExpanded) {
        const features = detailedFeatures[i] || project.metrics || [];
        const featuresHtml = features.map(f => `<div class="work-feature-item">${f}</div>`).join('');

        const tagsHtml = project.tags.map(tag => {
          const icon = iconMap[tag] ? `<img src="${iconMap[tag]}" alt="" onerror="this.remove()">` : '';
          return `<span class="work-tag">${icon}${tag}</span>`;
        }).join('');

        card.innerHTML = `
          <div class="work-card-info">
            <div class="work-card-meta">
              <span>${String(i + 1).padStart(2, '0')}</span>
              <span class="work-card-meta-sep">·</span>
              <span>${project.categoryLabel.toUpperCase()}</span>
              <span class="work-card-meta-sep">·</span>
              <span>${dateStr}</span>
            </div>
            <h3 class="work-card-title">${project.title}</h3>
            <p class="work-card-desc">${project.description || project.longDescription}</p>
            <div class="work-card-features">${featuresHtml}</div>
            <div class="work-card-tags">${tagsHtml}</div>
            <div class="work-card-actions">
              <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="work-btn-primary">
                View on GitHub <i class="fa-solid fa-arrow-up-right"></i>
              </a>
            </div>
          </div>
          <div class="work-card-visual">
            ${mockupTemplates[i] || ''}
            <div class="work-card-visual-label">ILLUSTRATIVE UI</div>
          </div>
        `;
      } else {
        card.innerHTML = `
          <span class="work-spine-num">${String(i + 1).padStart(2, '0')}</span>
          <div class="work-spine-title">${project.title}</div>
          <button class="work-spine-btn" aria-label="Expand project ${project.title}">
            <i class="fa-solid fa-plus"></i>
          </button>
        `;
        card.addEventListener('click', () => {
          this.activeWorkIndex = i;
          this.renderWorkCards();
        });
      }

      container.appendChild(card);
    });
  }

  /* ─── Certifications ─── */
  renderCertifications() {
    const table = document.getElementById('certs-table');
    if (!table) return;

    const certDates = ['Aug 2025', 'Jul 2025', 'Mar 2025', 'Dec 2024', 'Nov 2024'];

    this.data.certifications.forEach((cert, i) => {
      const row = document.createElement('div');
      row.className = 'cert-row reveal';
      row.innerHTML = `
        <div class="cert-num">${String(i + 1).padStart(2, '0')}</div>
        <div>
          <div class="cert-title">${cert.title}</div>
          <div class="cert-issuer">${cert.issuer}</div>
        </div>
        <div class="cert-date">${certDates[i] || ''}</div>
      `;
      table.appendChild(row);
    });

    const countEl = document.getElementById('cert-count');
    if (countEl) countEl.textContent = String(this.data.certifications.length).padStart(2, '0');
  }

  /* ─── Timeline (Experience + Education - Exact Ajay Bobbili Layout) ─── */
  renderTimeline() {
    const container = document.getElementById('timeline-cards');
    if (!container) return;
    container.innerHTML = '';

    // Chronological interleaved timeline: 01 Education -> 02 Intern -> 03 Intern -> 04 Full-time
    const timelineItems = [
      {
        kind: 'Education',
        title: this.data.education[0]?.degree || 'B.Tech in Computer Science and Engineering (IoT)',
        org: this.data.education[0]?.institution || 'Aditya College of Engineering and Technology (ACET)',
        place: this.data.education[0]?.location || 'Surampalem, India',
        period: this.data.education[0]?.period || '2021 – 2025'
      },
      ...this.data.experience.map(exp => ({
        kind: 'Experience',
        title: exp.role,
        org: exp.company,
        place: exp.location,
        period: exp.period,
        bullets: exp.bullets || []
      }))
    ];

    timelineItems.forEach((item, i) => {
      const li = document.createElement('li');
      li.className = 'exp-item';
      li.setAttribute('data-stop', 'true');

      const bulletsHtml = item.bullets && item.bullets.length
        ? `<ul class="exp-bullets">${item.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`
        : '';

      const placeStr = item.place ? `, ${item.place}` : '';

      li.innerHTML = `
        <span class="exp-dot" aria-hidden="true"></span>
        <article class="card exp-card rv">
          <header>
            <p class="exp-kind mono">${String(i + 1).padStart(2, '0')} · ${item.kind}</p>
            <h3 class="exp-title">${item.title}</h3>
            <p class="exp-org">${item.org}${placeStr}</p>
            <p class="exp-period mono">${item.period}</p>
          </header>
          ${bulletsHtml}
        </article>
      `;
      container.appendChild(li);
    });

    // "Your team?" dashed card
    const nextLi = document.createElement('li');
    nextLi.className = 'exp-item';
    nextLi.setAttribute('data-stop', 'true');
    nextLi.innerHTML = `
      <span class="exp-dot exp-dot-next" aria-hidden="true"></span>
      <div class="exp-next rv" tabindex="0" role="button" aria-label="Go to contact section">
        <p class="mono exp-kind">Next</p>
        <p class="exp-title">Your <span class="accent heading-italic">team?</span></p>
      </div>
    `;
    nextLi.querySelector('.exp-next')?.addEventListener('click', () => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
    container.appendChild(nextLi);

    this.initTimelineScroll();
  }

  initTimelineScroll() {
    const list = document.getElementById('timeline-cards');
    if (!list) return;

    const updateTimeline = () => {
      const rect = list.getBoundingClientRect();
      const windowH = window.innerHeight;
      const triggerY = windowH * 0.65;
      const progress = Math.max(0, Math.min(1, (triggerY - rect.top) / Math.max(1, rect.height)));
      const fillPx = progress * rect.height;

      list.style.setProperty('--fill', `${fillPx.toFixed(1)}px`);

      const items = list.querySelectorAll('.exp-item');
      items.forEach(item => {
        item.classList.toggle('on', (item.offsetTop + 30) <= fillPx);
      });
    };

    window.addEventListener('scroll', updateTimeline, { passive: true });
    window.addEventListener('resize', updateTimeline, { passive: true });
    requestAnimationFrame(updateTimeline);
  }

  /* ─── Honours & Metrics (Exact Reference Design) ─── */
  renderAchievements() {
    const track = document.getElementById('ach-track');
    if (!track) return;
    track.innerHTML = '';

    const items = this.data.achievements || [];
    const total = String(items.length).padStart(2, '0');

    items.forEach((item, i) => {
      const card = document.createElement('article');
      card.className = `ach-card${i === 0 ? ' is-active' : ''}`;
      card.style.setProperty('--tint', item.tint || 'rgba(13, 13, 13, 0.08)');
      card.setAttribute('aria-label', item.title);

      const logoContent = item.logoSvg
        ? item.logoSvg
        : (item.logoUrl
            ? `<img src="${item.logoUrl}" alt="${item.title} logo" width="44" height="44" loading="lazy" decoding="async">`
            : `<i class="fa-solid fa-award"></i>`);

      const hasNumber = item.number !== undefined;
      const prefix = item.prefix || '';
      const suffix = item.suffix || '';
      const unit = item.unit ? `<small class="mono" aria-hidden="true">${item.unit}</small>` : '';

      const numHtml = hasNumber ? `
        <p class="ach-num" role="img" aria-label="${prefix}${item.number}${suffix} ${item.unit || ''}">
          <span aria-hidden="true" class="ach-counter" data-target="${item.number}" data-prefix="${prefix}" data-suffix="${suffix}">${prefix}${item.number.toLocaleString('en-US')}${suffix}</span>
          ${unit}
        </p>
      ` : '';

      card.innerHTML = `
        <div class="ach-top">
          <div class="ach-logo">${logoContent}</div>
          <span class="mono ach-idx">${item.num || String(i + 1).padStart(2, '0')} / ${item.total || total}</span>
        </div>
        <div class="ach-bottom">
          <div class="ach-text">
            <h3 class="ach-label">${item.title}</h3>
            <p class="ach-cap">${item.subtitle}</p>
            <p class="ach-detail mono">${item.details}</p>
          </div>
          ${numHtml}
        </div>
      `;

      track.appendChild(card);
    });

    const end = document.createElement('div');
    end.className = 'ach-end serif-i';
    end.setAttribute('aria-hidden', 'true');
    end.innerHTML = 'and counting <span>&rarr;</span>';
    track.appendChild(end);

    this.bindAchievementsCarousel();
  }

  bindAchievementsCarousel() {
    const section = document.getElementById('achievements');
    const clip = document.getElementById('ach-clip');
    const track = document.getElementById('ach-track');
    const bar = document.getElementById('ach-progress-bar');
    if (!section || !clip || !track) return;

    const isMotionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let scrollDistance = 0;
    let isPinned = false;
    const animatedCounters = new Set();

    const animateCounter = (el) => {
      if (animatedCounters.has(el)) return;
      animatedCounters.add(el);
      const target = parseInt(el.dataset.target, 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1200;
      const start = performance.now();

      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(1, elapsed / duration);
        const ease = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(target * ease);
        el.textContent = `${prefix}${current.toLocaleString('en-US')}${suffix}`;
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    };

    const updateActiveCardAndCounters = (center) => {
      let minDiff = Infinity;
      let activeCard = null;
      const cards = track.querySelectorAll('.ach-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const diff = Math.abs(cardCenter - center);
        if (diff < minDiff) {
          minDiff = diff;
          activeCard = card;
        }

        // Trigger counter animation if card is in view
        if (rect.right > 0 && rect.left < window.innerWidth) {
          const counter = card.querySelector('.ach-counter');
          if (counter) animateCounter(counter);
        }
      });

      cards.forEach(card => {
        card.classList.toggle('is-active', card === activeCard);
      });
    };

    const calculateLayout = () => {
      const isDesktop = window.innerWidth >= 768 && !isMotionReduced;
      if (isDesktop) {
        scrollDistance = Math.max(0, track.scrollWidth - window.innerWidth);
        isPinned = scrollDistance > 0;
      } else {
        scrollDistance = 0;
        isPinned = false;
      }

      if (isPinned) {
        section.classList.add('is-pinned');
        section.style.height = `calc(100svh + ${scrollDistance}px)`;
      } else {
        section.classList.remove('is-pinned');
        section.style.height = '';
        track.style.transform = '';
        if (bar) bar.style.transform = 'scaleX(0)';
      }
    };

    calculateLayout();
    window.addEventListener('resize', calculateLayout, { passive: true });
    if (window.ResizeObserver) {
      new ResizeObserver(calculateLayout).observe(track);
    }

    // Pinned scroll handler (smooth horizontal translation on vertical scroll)
    const onWindowScroll = () => {
      if (!isPinned || scrollDistance <= 0) return;

      const rect = section.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, -rect.top / maxScroll)) : 0;

      track.style.transform = `translate3d(${-progress * scrollDistance}px, 0, 0)`;
      if (bar) bar.style.transform = `scaleX(${progress})`;

      updateActiveCardAndCounters(window.innerWidth / 2);
    };

    window.addEventListener('scroll', onWindowScroll, { passive: true });

    // Fallback horizontal swipe for mobile / non-pinned
    clip.addEventListener('scroll', () => {
      if (isPinned) return;
      const maxScroll = clip.scrollWidth - clip.clientWidth;
      if (maxScroll > 0 && bar) {
        const p = Math.min(1, Math.max(0, clip.scrollLeft / maxScroll));
        bar.style.transform = `scaleX(${p})`;
      }
      const center = clip.getBoundingClientRect().left + clip.clientWidth / 2;
      updateActiveCardAndCounters(center);
    }, { passive: true });

    // Initial check
    setTimeout(() => {
      calculateLayout();
      if (isPinned) {
        onWindowScroll();
      } else {
        updateActiveCardAndCounters(clip.getBoundingClientRect().left + clip.clientWidth / 2);
      }
    }, 250);
  }

  /* ─── ID Card Flip Interaction ─── */
  bindIdCard() {
    const card = document.getElementById('idc-card');
    if (!card) return;

    const toggle = () => {
      const isFlipped = card.classList.toggle('flipped');
      card.setAttribute('aria-pressed', isFlipped ? 'true' : 'false');
      const front = card.querySelector('.idc-front');
      const back = card.querySelector('.idc-back');
      if (front) front.setAttribute('aria-hidden', isFlipped ? 'true' : 'false');
      if (back) back.setAttribute('aria-hidden', isFlipped ? 'false' : 'true');
    };

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  }

  /* ─── Sliding Nav Indicator ─── */
  bindNavIndicator() {
    const navLinksContainer = document.getElementById('nav-links');
    const indicator = document.getElementById('nav-indicator');
    const links = document.querySelectorAll('.nav-link');
    if (!navLinksContainer || !indicator) return;

    this.updateNavIndicator = (targetLink) => {
      const target = targetLink || navLinksContainer.querySelector('.nav-link.active');
      if (!target) {
        indicator.style.opacity = '0';
        return;
      }
      const rect = target.getBoundingClientRect();
      const parentRect = navLinksContainer.getBoundingClientRect();
      const left = rect.left - parentRect.left;
      indicator.style.opacity = '1';
      indicator.style.width = `${rect.width}px`;
      indicator.style.transform = `translateX(${left}px)`;
    };

    links.forEach(link => {
      link.addEventListener('mouseenter', () => this.updateNavIndicator(link));
    });

    navLinksContainer.addEventListener('mouseleave', () => {
      this.updateNavIndicator();
    });

    window.addEventListener('resize', () => this.updateNavIndicator(), { passive: true });
    setTimeout(() => this.updateNavIndicator(), 250);
  }



  /* ─── Navbar scroll highlighting & Anchor Scroll (Native) ─── */
  bindNavScroll() {
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('nav-progress-bar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Smooth anchor navigation for all in-page links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href');
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    let navScrollTicking = false;
    window.addEventListener('scroll', () => {
      if (!navScrollTicking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const limit = document.documentElement.scrollHeight - window.innerHeight;

          // Scrolled class
          if (y > 20) {
            navbar?.classList.add('scrolled');
          } else {
            navbar?.classList.remove('scrolled');
          }

          // Progress bar
          if (progressBar && limit > 0) {
            const progress = Math.min(1, Math.max(0, y / limit));
            progressBar.style.transform = `scaleX(${progress})`;
          }

          // Active section highlighting
          let current = '';
          sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            if (y >= sectionTop) {
              current = section.getAttribute('id');
            }
          });

          if (current === 'certifications') current = 'experience';

          let hasActive = false;
          navLinks.forEach(link => {
            const section = link.dataset.section;
            const match = current && current === section;
            if (match && !hasActive) {
              link.classList.add('active');
              hasActive = true;
            } else {
              link.classList.remove('active');
            }
          });

          this.updateNavIndicator?.();
          navScrollTicking = false;
        });
        navScrollTicking = true;
      }
    }, { passive: true });
  }

  /* ─── Mobile Menu ─── */
  bindMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const links = document.getElementById('nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  /* ─── Email copy ─── */
  bindEmailCopy() {
    const btn = document.getElementById('email-copy-pill') || document.getElementById('email-copy-btn');
    const label = document.getElementById('copy-btn-label');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('rk635238@gmail.com').then(() => {
        btn.classList.add('copied');
        if (label) label.textContent = 'Copied!';
        this.showToast('Email copied to clipboard!');
        setTimeout(() => {
          btn.classList.remove('copied');
          if (label) label.textContent = 'Copy';
        }, 2200);
      }).catch(() => {
        this.showToast('rk635238@gmail.com');
      });
    });
  }

  /* ─── Resume Download ─── */
  bindResumeDownload() {
    const resumeLinks = document.querySelectorAll('a[href*="Resume.pdf"], a[href*="CV.pdf"], a[href*="cv.pdf"], .resume-download-btn');
    resumeLinks.forEach(link => {
      link.addEventListener('click', async (e) => {
        e.preventDefault();
        const url = link.getAttribute('href') || 'Ratnala_Raja_Resume.pdf';
        const downloadName = link.getAttribute('download') || 'Ratnala_Raja_Resume.pdf';

        this.showToast("Downloading Ratnala Raja's Resume...");

        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const blob = await res.blob();
          const blobUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = blobUrl;
          a.download = downloadName.endsWith('.pdf') ? downloadName : `${downloadName}.pdf`;
          document.body.appendChild(a);
          a.click();

          setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);
            this.showToast("Ratnala_Raja_Resume.pdf downloaded!");
          }, 800);
        } catch (err) {
          console.warn('Direct blob download failed, falling back:', err);
          const fallbackLink = document.createElement('a');
          fallbackLink.href = url;
          fallbackLink.target = '_blank';
          fallbackLink.rel = 'noopener noreferrer';
          fallbackLink.download = downloadName;
          document.body.appendChild(fallbackLink);
          fallbackLink.click();
          document.body.removeChild(fallbackLink);
        }
      });
    });
  }

  /* ─── Back to top ─── */
  bindBackToTop() {
    const btn = document.getElementById('back-to-top-btn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Contact form ─── */
  bindContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message sent!';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          form.reset();
        }, 2500);
        this.showToast('Message sent successfully!');
      }, 1500);
    });
  }

  /* ─── Toast ─── */
  showToast(message) {
    const toast = document.getElementById('toast');
    const text = document.getElementById('toast-text');
    if (!toast || !text) return;

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    text.textContent = message;
    toast.classList.add('show');

    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  /* ─── Scroll reveal ─── */
  bindScrollReveal() {
    const reveals = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh * 1.15 && rect.bottom >= -50) {
          el.classList.add('visible');
        }
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0, rootMargin: '120px 0px 120px 0px' }
      );

      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    } else {
      window.addEventListener('scroll', reveals, { passive: true });
      window.addEventListener('resize', reveals, { passive: true });
    }

    reveals();
    setTimeout(reveals, 100);
    setTimeout(reveals, 350);
    setTimeout(reveals, 800);
    // Ultimate safety: ensure all elements become visible
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
    }, 1500);
  }

  /* ─── Hero Watermark Parallax ─── */
  bindHeroAvatarParallax() {
    const watermark = document.getElementById('hero-watermark');
    if (!watermark) return;

    // Window-wide cursor tracking for true depth perspective on watermark
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    window.addEventListener('mousemove', (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // Smooth 60/120 FPS animation loop with damping for watermark
    const animate = () => {
      requestAnimationFrame(animate);

      if (window.scrollY > window.innerHeight * 1.1) return;

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const wmX = -mouse.x * 24;
      const wmY = -mouse.y * 14;
      watermark.style.transform = `translate(calc(-50% + ${wmX.toFixed(1)}px), ${wmY.toFixed(1)}px)`;
    };

    animate();
  }

  /* ─── Hero Video & Voice Sound Control ─── */
  bindHeroSoundAndVideo() {
    const video = document.getElementById('hero-video');
    const soundBtn = document.getElementById('hero-sound-btn');
    const stage = document.getElementById('hero-character-wrap');

    if (!video) return;

    video.muted = true;
    video.loop = true;

    const startAutoplay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const playOnGesture = () => {
            video.play();
            window.removeEventListener('click', playOnGesture);
            window.removeEventListener('touchstart', playOnGesture);
            window.removeEventListener('scroll', playOnGesture);
          };
          window.addEventListener('click', playOnGesture, { once: true });
          window.addEventListener('touchstart', playOnGesture, { once: true });
          window.addEventListener('scroll', playOnGesture, { once: true });
        });
      }
    };

    startAutoplay();
    video.addEventListener('loadeddata', startAutoplay);

    if (!soundBtn) return;

    const iconIdle = soundBtn.querySelector('.sound-icon-idle');
    const barsPlaying = soundBtn.querySelector('.sound-bars-playing');

    let isPlaying = false;
    let voiceAudio = new Audio('voice-intro.mp4');
    voiceAudio.preload = 'auto';

    const stopVoice = () => {
      isPlaying = false;
      voiceAudio.pause();
      voiceAudio.currentTime = 0;
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      soundBtn.classList.remove('is-playing');
      soundBtn.classList.add('is-pinging');
      soundBtn.setAttribute('aria-pressed', 'false');
      soundBtn.setAttribute('aria-label', 'Play intro once');

      if (iconIdle) iconIdle.style.display = 'block';
      if (barsPlaying) barsPlaying.style.display = 'none';

      video.loop = true;
      video.muted = true;
      video.play().catch(() => {});
    };

    const startVoice = () => {
      isPlaying = true;
      soundBtn.classList.add('is-playing');
      soundBtn.classList.remove('is-pinging');
      soundBtn.setAttribute('aria-pressed', 'true');
      soundBtn.setAttribute('aria-label', 'Stop intro');

      if (iconIdle) iconIdle.style.display = 'none';
      if (barsPlaying) barsPlaying.style.display = 'flex';

      // Sync 3D video animation from the start
      video.currentTime = 0;
      video.loop = false;
      video.muted = true;
      video.play().catch(() => {});

      // Play human neural voice audio
      voiceAudio.currentTime = 0;
      voiceAudio.ontimeupdate = () => {
        if (isPlaying && Math.abs(video.currentTime - voiceAudio.currentTime) > 0.12) {
          video.currentTime = voiceAudio.currentTime;
        }
      };
      voiceAudio.play().then(() => {
        voiceAudio.onended = () => {
          voiceAudio.ontimeupdate = null;
          stopVoice();
        };
      }).catch(err => {
        console.warn('Audio element playback failed, using Web Speech API fallback:', err);
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance("Hi, I'm Ratnala Raja, Associate Software Engineer at Tricon Infotech. Welcome to my portfolio!");
          utterance.rate = 1.0;
          utterance.pitch = 1.0;
          const voices = window.speechSynthesis.getVoices();
          const preferredVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-US'));
          if (preferredVoice) utterance.voice = preferredVoice;
          utterance.onend = stopVoice;
          utterance.onerror = stopVoice;
          window.speechSynthesis.speak(utterance);
        } else {
          stopVoice();
        }
      });
    };

    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isPlaying) {
        stopVoice();
      } else {
        startVoice();
      }
    });

    if (stage) {
      stage.addEventListener('click', (e) => {
        if (e.target.closest('#hero-sound-btn')) return;
        if (!isPlaying) startVoice();
      });
    }
  }
}

// Initialize safely when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new PortfolioApp());
} else {
  new PortfolioApp();
}
