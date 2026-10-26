/**
 * Ratnala Raja Portfolio — AI Agent Assistant
 * Built-in Instant AI Twin with comprehensive career knowledge,
 * interactive actions (resume download, deep navigation), and natural streaming responses.
 */

class PortfolioAIAgent {
  constructor() {
    this.widget = document.getElementById('ai-widget');
    this.launcher = document.getElementById('ai-launcher-btn');
    this.drawer = document.getElementById('ai-drawer');
    this.messagesContainer = document.getElementById('ai-drawer-messages');
    this.form = document.getElementById('ai-drawer-form');
    this.input = document.getElementById('ai-input');
    this.closeBtn = document.getElementById('ai-close-btn');
    this.resetBtn = document.getElementById('ai-reset-btn');
    this.chipsWrap = document.getElementById('ai-chips-wrap');

    this.isOpen = false;
    this.isStreaming = false;
    this.conversationHistory = [];

    // Preloaded Career Knowledge Base
    this.knowledge = {
      name: "Ratnala Raja",
      title: "Associate Software Engineer",
      company: "Tricon Infotech Pvt. Ltd.",
      location: "Bangalore, Karnataka, India",
      email: "rk635238@gmail.com",
      phone: "+91 7903899968",
      github: "https://github.com/RatnalaRaja",
      linkedin: "https://www.linkedin.com/in/rajaratnala/",
      resumeFile: "Ratnala_Raja_Resume.pdf",
      bio: "Associate Software Engineer at Tricon Infotech, architecting scalable cloud solutions with AWS & Azure, mobile CI/CD pipelines with Fastlane & GitHub Actions, GenAI workflows, and FastAPI microservices. Former AWS Cloud Computing Intern at Technical Hub.",
      education: {
        degree: "Bachelor of Technology in Computer Science & Engineering (IoT)",
        college: "Aditya College of Engineering and Technology, Surampalem, AP",
        gpa: "7.9 / 10",
        year: "May 2025"
      },
      experience: [
        {
          role: "Associate Software Engineer",
          company: "Tricon Infotech Pvt. Ltd.",
          location: "Bangalore, India",
          period: "Sep 2025 – Present",
          highlights: [
            "Architecting and optimizing enterprise cloud solutions using AWS and Azure.",
            "Building automated mobile CI/CD pipelines using Fastlane & GitHub Actions for iOS and Android.",
            "Developing high-throughput microservices using Python and FastAPI with JWT-based authentication.",
            "Implementing Generative AI & RAG pipelines for internal enterprise workflows."
          ]
        },
        {
          role: "AWS Cloud Computing Intern",
          company: "Technical Hub Private Limited",
          location: "Surampalem, India",
          period: "Aug 2023 – Dec 2023",
          highlights: [
            "Architected and deployed scalable AWS infrastructure leveraging EC2, S3, RDS, and Lambda.",
            "Led cloud infrastructure migration, achieving 30% cost reduction and 25% increase in system uptime.",
            "Engineered automated infrastructure provisioning using Terraform and Linux shell scripting."
          ]
        }
      ],
      projects: [
        {
          name: "Automated Mobile CI/CD with Fastlane & GitHub Actions",
          period: "Jun 2025",
          metric: "-70% Release Cycle",
          stack: "Fastlane, GitHub Actions, CI/CD, iOS, Android, Docker",
          description: "End-to-end mobile automation pipeline deploying iOS & Android apps to TestFlight, Apple App Store, and Google Play Console automatically upon merge.",
          section: "work"
        },
        {
          name: "AWS Infrastructure Automation with Terraform",
          period: "Dec 2024",
          metric: "-30% Cloud Cost · +25% Uptime",
          stack: "AWS, Terraform, Docker, Linux, Bash, CI/CD",
          description: "Multi-region high-availability cloud infrastructure with automated scaling, VPC peering, RDS clusters, and CI/CD pipelines.",
          section: "work"
        },
        {
          name: "DeepFake Detection System",
          period: "Oct 2024",
          metric: "+25% Accuracy",
          stack: "Python, PyTorch, OpenCV, CNN, FastAPI",
          description: "Deep learning computer vision system detecting manipulated media using facial artifacts and temporal inconsistencies with 94.2% test accuracy.",
          section: "work"
        },
        {
          name: "Revolutionizing Email Outreach with AWS Lambda",
          period: "Aug 2024",
          metric: "+150% Capacity",
          stack: "AWS Lambda, SES, DynamoDB, Python, Serverless",
          description: "Event-driven serverless email distribution engine with dynamic rate limiting and high-volume delivery tracking.",
          section: "work"
        }
      ],
      skills: {
        cloudDevops: ["AWS (EC2, S3, RDS, Lambda, VPC, IAM)", "Microsoft Azure", "Docker", "Kubernetes", "Terraform", "CI/CD & GitHub Actions", "Fastlane", "Linux & Bash"],
        aiGenai: ["RAG & LangChain", "AI Agents & Autonomous Workflows", "PyTorch & TensorFlow", "OpenCV Computer Vision", "LLM Fine-tuning & Embeddings"],
        backend: ["FastAPI Microservices", "Django", "Node.js", "PostgreSQL, MongoDB & DynamoDB", "RESTful APIs"],
        observability: ["New Relic (APM & Infrastructure Monitoring)", "LangSmith (LLM Tracing & Evaluation)"],
        languages: ["C++", "Python", "JavaScript / ES6", "Data Structures & Algorithms"]
      }
    };

    this.init();
  }

  init() {
    if (!this.widget || !this.launcher) return;

    // Toggle drawer
    this.launcher.addEventListener('click', () => this.toggleDrawer());
    this.closeBtn?.addEventListener('click', () => this.closeDrawer());
    this.resetBtn?.addEventListener('click', () => this.resetConversation());

    // Submit user message
    this.form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = this.input.value.trim();
      if (!query || this.isStreaming) return;
      this.handleUserQuery(query);
    });

    // Suggestion chips
    this.chipsWrap?.addEventListener('click', (e) => {
      const chip = e.target.closest('.ai-chip');
      if (!chip || this.isStreaming) return;
      const query = chip.dataset.query;
      if (query) {
        this.handleUserQuery(query);
      }
    });

    // Close on click outside drawer
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.drawer.contains(e.target) && !this.launcher.contains(e.target)) {
        this.closeDrawer();
      }
    });

    // Keyboard Shortcuts (Cmd+K / Ctrl+K and Escape)
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggleDrawer();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.closeDrawer();
      }
    });

    // Initial greeting
    this.renderInitialGreeting();
  }

  toggleDrawer() {
    if (this.isOpen) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  openDrawer() {
    this.isOpen = true;
    this.drawer.classList.add('is-open');
    this.launcher.classList.add('is-active');
    this.launcher.setAttribute('aria-expanded', 'true');
    this.drawer.setAttribute('aria-hidden', 'false');

    // Record initial scroll position & bind scroll-to-close listener
    this.openScrollY = window.scrollY || window.pageYOffset;
    this.bindScrollClose();

    setTimeout(() => this.input?.focus(), 250);
  }

  closeDrawer() {
    this.isOpen = false;
    this.drawer.classList.remove('is-open');
    this.launcher.classList.remove('is-active');
    this.launcher.setAttribute('aria-expanded', 'false');
    this.drawer.setAttribute('aria-hidden', 'true');

    // Unbind scroll-to-close listener
    this.unbindScrollClose();
  }

  bindScrollClose() {
    this.unbindScrollClose();
    this.openTime = Date.now();
    this.scrollCloseHandler = () => {
      if (!this.isOpen) return;
      // Brief 150ms grace period after open to ignore layout shifts/focus jumps
      if (Date.now() - this.openTime < 150) return;
      const currentY = window.scrollY || window.pageYOffset;
      if (Math.abs(currentY - this.openScrollY) > 20) {
        this.closeDrawer();
      }
    };
    window.addEventListener('scroll', this.scrollCloseHandler, { passive: true });
  }

  unbindScrollClose() {
    if (this.scrollCloseHandler) {
      window.removeEventListener('scroll', this.scrollCloseHandler);
      this.scrollCloseHandler = null;
    }
  }

  renderInitialGreeting() {
    this.messagesContainer.innerHTML = '';
    const welcomeHtml = `
      <div class="ai-msg ai-msg-bot">
        <div class="ai-msg-bubble">
          <p>Hi! I'm <b>Raja's AI Twin</b>.</p>
          <p>Ask me anything about Raja's cloud &amp; DevOps experience at <b>Tricon Infotech</b>, his <b>Mobile CI/CD</b> project, tech stack, or request his resume!</p>
        </div>
      </div>
    `;
    this.messagesContainer.innerHTML = welcomeHtml;
  }

  resetConversation() {
    this.conversationHistory = [];
    this.renderInitialGreeting();
    if (this.input) this.input.value = '';
  }

  async handleUserQuery(query) {
    this.input.value = '';

    // Append user message
    this.appendMessage('user', query);

    // Scroll to bottom
    this.scrollToBottom();

    // Show typing indicator
    const typingIndicator = this.showTypingIndicator();

    // Process intelligence query
    await new Promise(r => setTimeout(r, 450)); // natural micro-pause
    const response = this.computeAnswer(query);

    // Remove typing indicator and stream response
    typingIndicator.remove();
    await this.streamBotMessage(response);
  }

  appendMessage(sender, text) {
    const msgEl = document.createElement('div');
    msgEl.className = `ai-msg ai-msg-${sender}`;
    const bubble = document.createElement('div');
    bubble.className = 'ai-msg-bubble';
    bubble.textContent = text;
    msgEl.appendChild(bubble);
    this.messagesContainer.appendChild(msgEl);
    this.scrollToBottom();
    return msgEl;
  }

  showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'ai-msg ai-msg-bot ai-typing-msg';
    indicator.innerHTML = `
      <div class="ai-msg-bubble">
        <div class="ai-typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    this.messagesContainer.appendChild(indicator);
    this.scrollToBottom();
    return indicator;
  }

  async streamBotMessage(responseObj) {
    this.isStreaming = true;
    const msgEl = document.createElement('div');
    msgEl.className = 'ai-msg ai-msg-bot';
    const bubble = document.createElement('div');
    bubble.className = 'ai-msg-bubble';
    msgEl.appendChild(bubble);
    this.messagesContainer.appendChild(msgEl);

    const fullText = responseObj.text;
    const words = fullText.split(' ');
    let currentText = '';

    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? '' : ' ') + words[i];
      bubble.innerHTML = this.formatMarkdown(currentText);
      this.scrollToBottom();
      await new Promise(r => setTimeout(r, 18));
    }

    // Render interactive action buttons if provided
    if (responseObj.actions && responseObj.actions.length > 0) {
      const actionsWrap = document.createElement('div');
      actionsWrap.className = 'ai-msg-actions';
      responseObj.actions.forEach(action => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ai-action-chip';
        btn.textContent = action.label;
        btn.addEventListener('click', () => this.handleActionClick(action));
        actionsWrap.appendChild(btn);
      });
      bubble.appendChild(actionsWrap);
      this.scrollToBottom();
    }

    this.isStreaming = false;
  }

  formatMarkdown(text) {
    // Quick, safe inline formatting for bold, code, and bullet lists
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n- /g, '<br>• ');
    return `<p>${html}</p>`;
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  handleActionClick(action) {
    if (action.type === 'download_resume') {
      const resumeBtn = document.querySelector('.resume-download-btn');
      if (resumeBtn) {
        resumeBtn.click();
      } else {
        window.open(this.knowledge.resumeFile, '_blank');
      }
    } else if (action.type === 'scroll_to') {
      const target = document.getElementById(action.targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        this.closeDrawer();
      }
    } else if (action.type === 'email') {
      window.location.href = `mailto:${this.knowledge.email}?subject=Opportunity%20via%20Portfolio`;
    }
  }

  computeAnswer(query) {
    const q = query.toLowerCase().trim();

    // 1. Resume / CV Request
    if (/resume|cv|biodata|download cv|curriculum/i.test(q)) {
      return {
        text: `You can download **Ratnala Raja's Resume** right now! It details his experience as an Associate Software Engineer at **Tricon Infotech**, AWS & Azure cloud deployments, CI/CD pipelines, and education.`,
        actions: [
          { label: "Download Resume (PDF)", type: "download_resume" },
          { label: "View Experience", type: "scroll_to", targetId: "experience" }
        ]
      };
    }

    // 2. Mobile CI/CD Deployment Project
    if (/mobile|fastlane|deployment|deploy|ios|android|apk|ipa|store/i.test(q)) {
      const proj = this.knowledge.projects[0];
      return {
        text: `Raja built the **${proj.name}** (${proj.metric})!\n- **Stack:** ${proj.stack}\n- **What it does:** Automates the complete release lifecycle for iOS & Android, including lane configuration, match code-signing, TestFlight/Play Console uploads, and automated build notifications. It slashed release cycle times by 70%.`,
        actions: [
          { label: "View Project in Showcase", type: "scroll_to", targetId: "work" },
          { label: "Check GitHub", type: "scroll_to", targetId: "contact" }
        ]
      };
    }

    // 3. Projects overview
    if (/project|built|work|showcase|portfolio projects|apps/i.test(q)) {
      return {
        text: `Raja has engineered high-impact projects spanning Cloud, DevOps, and AI:\n\n1. **Automated Mobile CI/CD with Fastlane & GitHub Actions** (-70% release time, iOS & Android)\n2. **AWS Infrastructure Automation with Terraform** (30% cost drop, 25% uptime increase)\n3. **DeepFake Detection System** (PyTorch, OpenCV, CNN with 94.2% accuracy)\n4. **Serverless Email Outreach with AWS Lambda & SES** (+150% delivery capacity)`,
        actions: [
          { label: "Explore Work Section", type: "scroll_to", targetId: "work" },
          { label: "Download Resume", type: "download_resume" }
        ]
      };
    }

    // 4. Current Role & Experience
    if (/experience|experience at tricon|tricon|work history|job|internship|career|role/i.test(q)) {
      return {
        text: `Raja is currently an **Associate Software Engineer** at **Tricon Infotech Pvt. Ltd.** in Bangalore (Since Sep 2025).\n\n- **Focus:** Enterprise cloud architecture with AWS & Azure, mobile CI/CD pipelines with Fastlane, FastAPI microservices, and GenAI workflows.\n- **Previously:** AWS Cloud Computing Intern at **Technical Hub** (Aug–Dec 2023), optimizing multi-region AWS cloud infrastructure and saving 30% on infrastructure expenses.`,
        actions: [
          { label: "View Timeline", type: "scroll_to", targetId: "experience" },
          { label: "Download Resume", type: "download_resume" }
        ]
      };
    }

    // 5. Skills & Tech Stack
    if (/skill|tech stack|technology|tools|language|languages|aws|azure|docker|kubernetes|python|backend|observability|new relic|langsmith/i.test(q)) {
      return {
        text: `Raja's technical core is organized across five specialized domains:\n\n- **Cloud & DevOps:** AWS, Azure, Docker, Kubernetes, Terraform, Fastlane, GitHub Actions, Linux/Bash\n- **AI & GenAI:** RAG & LangChain, Autonomous Agents, PyTorch, OpenCV, Model fine-tuning\n- **Backend:** FastAPI, Django, Node.js, PostgreSQL, DynamoDB, MongoDB, RESTful APIs\n- **Observability Tools:** New Relic (APM & Infrastructure), LangSmith (LLM Tracing & Evaluation)\n- **Languages:** C++, Python, JavaScript (ES6+), Data Structures & Algorithms`,
        actions: [
          { label: "Open Skills Periodic Table", type: "scroll_to", targetId: "skills" }
        ]
      };
    }

    // 6. Contact / Hiring
    if (/contact|hire|email|reach|phone|touch|call|message|linkedin|location/i.test(q)) {
      return {
        text: `Raja is based in **Bangalore, Karnataka, India** and is open to discussing cloud engineering, DevOps, and backend software opportunities.\n\n- **Email:** \`${this.knowledge.email}\`\n- **Phone:** \`${this.knowledge.phone}\`\n- **LinkedIn:** [linkedin.com/in/rajaratnala](${this.knowledge.linkedin})\n- **GitHub:** [github.com/RatnalaRaja](${this.knowledge.github})`,
        actions: [
          { label: "Send Email Directly", type: "email" },
          { label: "Go to Contact Form", type: "scroll_to", targetId: "contact" }
        ]
      };
    }

    // 7. Education / Degree
    if (/education|college|degree|btech|b.tech|university|cgpa|gpa|aditya/i.test(q)) {
      const edu = this.knowledge.education;
      return {
        text: `Raja holds a **${edu.degree}** from **${edu.college}** with a cumulative **GPA of ${edu.gpa}** (Graduated in ${edu.year}).`,
        actions: [
          { label: "View About Section", type: "scroll_to", targetId: "about" }
        ]
      };
    }

    // 8. Greetings & Casual
    if (/^(hi|hello|hey|greetings|hola|namaste|sup|yo)\b/i.test(q)) {
      return {
        text: `Hello! I'm **Raja's AI Twin**. How can I help you today? You can ask me about his work at **Tricon Infotech**, his **Mobile CI/CD** project, skills, or grab his resume!`,
        actions: [
          { label: "What are your top projects?", type: "scroll_to", targetId: "work" },
          { label: "Download Resume", type: "download_resume" }
        ]
      };
    }

    // 9. Who is Raja / About
    if (/who is raja|about raja|tell me about yourself|who are you|summary/i.test(q)) {
      return {
        text: `**Ratnala Raja** is an **Associate Software Engineer** at Tricon Infotech based in Bangalore. He specializes in designing robust cloud infrastructure on AWS & Azure, automating deployments via CI/CD, and building high-performance backend systems with Python & FastAPI.`,
        actions: [
          { label: "Read Full Bio", type: "scroll_to", targetId: "about" },
          { label: "Download Resume", type: "download_resume" }
        ]
      };
    }

    // 10. Default / Fallback
    return {
      text: `Thanks for asking! As **Raja's AI Twin**, I can share insights on his **Mobile CI/CD project**, his cloud engineering work at **Tricon Infotech**, his **AWS & Azure stack**, or deliver his official **Resume**. What would you like to explore?`,
      actions: [
        { label: "Mobile CI/CD Project", type: "scroll_to", targetId: "work" },
        { label: "Download Resume", type: "download_resume" },
        { label: "Contact Raja", type: "scroll_to", targetId: "contact" }
      ]
    };
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioAIAgent = new PortfolioAIAgent();
});
