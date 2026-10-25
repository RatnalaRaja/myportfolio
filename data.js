const portfolioData = window.portfolioData = {
  personal: {
    name: "Ratnala Raja",
    handle: "@RatnalaRaja",
    role: "Associate Software Engineer",
    subRoles: [
      "Cloud & DevOps Practitioner",
      "Generative AI & LLM Builder",
      "Backend & Distributed Systems Engineer",
      "Data Structures & Algorithms Enthusiast"
    ],
    location: "Bangalore, Karnataka, India",
    email: "rk635238@gmail.com",
    collegeEmail: "21mh1a4949@acoe.edu.in",
    phone: "+91 7903899968",
    bio: "Passionate engineer architecting scalable cloud infrastructure, designing intelligent Generative AI / LLM workflows, and building high-performance backend microservices. Driven by curiosity, distributed systems design, and hands-on DevOps automation.",
    shortBio: "Associate Software Engineer at Tricon Infotech • Cloud & DevOps • GenAI & LLMs • FastAPI • C++ / Python",
    stats: [
      { label: "Public Repositories", value: "39+" },
      { label: "Industry Certifications", value: "5" },
      { label: "HackerRank C++ & Python", value: "5 ★" },
      { label: "Infrastructure Automation", value: "100%" }
    ],
    socials: {
      github: "https://github.com/RatnalaRaja",
      linkedin: "https://www.linkedin.com/in/rajaratnala/",
      hackerrank: "https://www.hackerrank.com/ratnalaraja",
      leetcode: "https://leetcode.com/",
      codechef: "https://www.codechef.com/",
      email: "mailto:rk635238@gmail.com"
    },
    resumeUrl: "Ratnala_Raja_Resume.pdf",
    avatar: "https://avatars.githubusercontent.com/u/97797913?v=4"
  },

  skills: {
    cloudDevops: [
      { name: "AWS", level: 90, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", desc: "EC2, S3, Lambda, VPC, RDS, DynamoDB, SES, CloudWatch" },
      { name: "Microsoft Azure", level: 82, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg", desc: "Azure VMs, Blob, Resource Groups, App Services" },
      { name: "Docker", level: 88, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg", desc: "Containerization, Multi-stage builds, Docker Compose" },
      { name: "Kubernetes", level: 80, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-original.svg", desc: "Pods, Deployments, Services, Cluster Orchestration" },
      { name: "Terraform", level: 85, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/terraform/terraform-original.svg", desc: "Infrastructure as Code, State management, Modules" },
      { name: "CI/CD & Actions", level: 85, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/githubactions/githubactions-original.svg", desc: "GitHub Actions, Jenkins automated pipelines" },
      { name: "Linux & Bash", level: 88, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg", desc: "RedHat RHCSA, Shell scripting, System administration" }
    ],
    aiGenAI: [
      { name: "Generative AI & LLMs", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", desc: "Prompt Engineering, OpenAI APIs, Model Fine-Tuning" },
      { name: "RAG & LangChain", level: 82, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-plain.svg", desc: "Retrieval-Augmented Generation, Vector Stores, Embeddings" },
      { name: "AI Agents", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", desc: "Autonomous task execution, Tool calling & multi-agent systems" },
      { name: "PyTorch & TensorFlow", level: 78, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg", desc: "Deep Learning, Neural Networks, Computer Vision" },
      { name: "OpenCV", level: 80, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg", desc: "Computer vision, Face manipulation & DeepFake detection" }
    ],
    backend: [
      { name: "Python", level: 92, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", desc: "Core language, AsyncIO, OOP, Scripting & Data processing" },
      { name: "FastAPI", level: 88, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg", desc: "High-speed REST APIs, Pydantic, Swagger documentation" },
      { name: "Django", level: 80, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg", desc: "Full-stack apps, ORM, Auth, Nginx reverse proxy" },
      { name: "Node.js", level: 75, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg", desc: "Express.js, Event loop, REST API microservices" },
      { name: "Databases", level: 85, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg", desc: "PostgreSQL, MySQL, MongoDB, Redis caching" }
    ],
    languagesDsa: [
      { name: "Python", level: 94, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", desc: "Data Structures, Algorithms, Core OOP, Automation & Problem Solving" },
      { name: "C++", level: 90, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg", desc: "STL, Algorithms, Competitive Programming, OOP" },
      { name: "Java", level: 82, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg", desc: "OOP principles, Collections framework, Exception handling" },
      { name: "JavaScript / ES6", level: 85, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", desc: "Modern frontend logic, WebGL / Three.js, Async/Await" },
      { name: "DSA Problem Solving", level: 90, icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", desc: "Graphs, Trees, DP, Hash Maps, HackerRank 5★ & CodeChef 2★" }
    ]
  },

  experience: [
    {
      company: "Technical Hub Private Limited",
      role: "Java Developer Intern",
      period: "May 2023 – Jul 2023",
      location: "Surampalem, India",
      kind: "work",
      bullets: [
        "Enhanced programming proficiency by mastering complex Data Structures and Algorithms, achieving a 40% improvement in code efficiency.",
        "Implemented object-oriented principles, modular architecture, and robust exception handling in Java."
      ]
    },
    {
      company: "Technical Hub Private Limited",
      role: "AWS Cloud Computing Intern",
      period: "Aug 2023 – Dec 2023",
      location: "Surampalem, India",
      kind: "work",
      bullets: [
        "Architected and deployed scalable AWS cloud infrastructure leveraging EC2, S3, RDS, DynamoDB, VPC, and AWS Lambda.",
        "Led the migration of web applications to AWS cloud infrastructure, optimizing auto-scaling and high availability.",
        "Delivered a 30% reduction in operational infrastructure costs and improved system uptime by 25%."
      ]
    },
    {
      company: "Tricon Infotech Pvt. Ltd.",
      role: "Associate Software Engineer",
      period: "Jun 2025 – Present",
      location: "Bangalore, India",
      kind: "work",
      bullets: [
        "Engineered automated CI/CD deployment pipelines using Fastlane and GitHub Actions, cutting release cycles by 70%.",
        "Architected and deployed scalable cloud-native microservices with Docker, AWS, and secure RESTful APIs.",
        "Collaborated with cross-functional engineering teams to deliver high-availability enterprise software solutions."
      ]
    }
  ],

  education: [
    {
      degree: "B.Tech in Computer Science and Engineering (IoT)",
      institution: "Aditya College of Engineering and Technology (ACET)",
      location: "Surampalem, India",
      period: "2021 – 2025",
      kind: "education"
    }
  ],

  projects: [
    {
      id: "mobile-deployment",
      title: "Automated Mobile CI/CD with Fastlane & GitHub Actions",
      category: "cloud",
      categoryLabel: "DevOps & Mobile CI/CD",
      description: "Automated end-to-end continuous deployment pipeline delivering iOS & Android mobile releases to TestFlight, App Store, and Google Play.",
      longDescription: "Engineered automated multi-platform mobile build and release pipelines utilizing Fastlane and GitHub Actions at Tricon Infotech. Automated code signing, provisioning profile management, unit testing, asset compilation, and automated store artifact uploads, slashing release cycles by 70% and eliminating manual deployment errors.",
      tags: ["Fastlane", "GitHub Actions", "CI/CD", "iOS", "Android", "Docker"],
      image: "logos/github-actions.svg",
      github: "https://github.com/RatnalaRaja/github-actions-demo",
      metrics: ["-70% Release Cycle", "Automated Code Signing", "Zero-Touch Store Upload"]
    },
    {
      id: "email-automate",
      title: "Revolutionizing Email Outreach with AWS Lambda",
      category: "cloud",
      categoryLabel: "Cloud & DevOps",
      description: "Scalable serverless email marketing and automated outreach platform with event-driven scheduling and real-time delivery telemetry.",
      longDescription: "Engineered an event-driven serverless email distribution engine on AWS. Leveraged AWS Lambda auto-scaling and Amazon SES for transactional and batch email broadcasts, orchestrating jobs with EventBridge and monitoring deliverability metrics via Amazon CloudWatch. Achieved a 150% increase in outreach capacity and 40% boost in processing speeds.",
      tags: ["AWS Lambda", "Amazon SES", "EventBridge", "CloudWatch", "AWS IAM", "Python"],
      image: "https://raw.githubusercontent.com/RatnalaRaja/AWS-AUTOMATE_Project/main/AWS-logo-2.jpg",
      github: "https://github.com/RatnalaRaja/AWS-AUTOMATE_Project",
      metrics: ["+150% Outreach Capacity", "-40% Processing Latency", "+20% Conversion"]
    },
    {
      id: "sonarqube-engine",
      title: "SonarQube Automated Code Quality Engine",
      category: "cloud",
      categoryLabel: "DevOps & CI/CD",
      description: "Production-grade automated static code analysis pipeline integrated into CI/CD workflows for vulnerability detection and technical debt remediation.",
      longDescription: "Architected a continuous code inspection engine on AWS EC2 leveraging Dockerized SonarQube integrated with Jenkins automation pipelines. Enforces automated quality gates, static security vulnerability scanning, and code smell detection across microservice codebases before deployment.",
      tags: ["Docker", "Jenkins", "SonarQube", "AWS EC2", "CI/CD", "Bash"],
      image: "https://raw.githubusercontent.com/RatnalaRaja/Project-Expert-Engine/main/1.jpeg",
      github: "https://github.com/RatnalaRaja/Project-Expert-Engine",
      metrics: ["Zero-defect gates", "Automated scan on commit", "Full Dockerized pipeline"]
    },
    {
      id: "deepfake-detection",
      title: "DeepFake Detection & Digital Authenticity",
      category: "ai",
      categoryLabel: "AI & Computer Vision",
      description: "Computer vision and deep learning system to detect facial manipulation and synthetic video artifacts with high confidence scoring.",
      longDescription: "Developed an AI detection platform for synthetic media and facial deepfakes using Python, OpenCV, and deep neural network architectures. Extracted spatial-temporal facial landmarks, trained classification models, and deployed the inference pipeline on cloud infrastructure for real-time video authenticity verification.",
      tags: ["Python", "OpenCV", "Deep Learning", "AWS Cloud", "NumPy", "TensorFlow"],
      image: "https://raw.githubusercontent.com/RatnalaRaja/DeepFake_Detection/main/Deepfake.png",
      github: "https://github.com/RatnalaRaja/DeepFake_Detection",
      metrics: ["+25% Model Accuracy", "Real-time frame evaluation", "Cloud inference"]
    },
    {
      id: "terraform-cloud",
      title: "Multi-Cloud Infrastructure as Code (Terraform)",
      category: "cloud",
      categoryLabel: "Cloud & DevOps",
      description: "Declarative modular Terraform codebase deploying scalable multi-tier VPCs, security groups, auto-scaling groups, and load balancers on AWS & Azure.",
      longDescription: "Production-ready Infrastructure as Code (IaC) repository implementing reusable Terraform modules for VPC networking, subnets, internet gateways, IAM roles, and auto-scaling EC2 clusters. Employs remote state locking with S3 and DynamoDB for team collaboration.",
      tags: ["Terraform", "HCL", "AWS", "Azure", "IaC", "Cloud Architecture"],
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/terraform/terraform-original.svg",
      github: "https://github.com/RatnalaRaja/Terraform_HandsOn",
      metrics: ["100% Reproducible", "Zero manual provisioning", "Remote state locking"]
    },
    {
      id: "fastapi-enterprise",
      title: "Enterprise Full-Stack FastAPI Architecture",
      category: "backend",
      categoryLabel: "Backend & Systems",
      description: "Modern asynchronous microservices template featuring FastAPI, PostgreSQL, SQLModel, Docker, and JWT authentication.",
      longDescription: "High-performance backend template engineered for low-latency microservices. Integrates asynchronous database connections via SQLModel, automated OpenAPI documentation, background task queues, and secure OAuth2/JWT token verification.",
      tags: ["FastAPI", "Python", "PostgreSQL", "Docker", "Redis", "REST APIs"],
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg",
      github: "https://github.com/RatnalaRaja/full-stack-fastapi-template",
      metrics: ["Sub-15ms response", "Async IO concurrency", "Auto Swagger Docs"]
    },
    {
      id: "churn-predictor",
      title: "Predictive Analytics & Customer Churn Engine",
      category: "ai",
      categoryLabel: "AI / Machine Learning",
      description: "End-to-end predictive machine learning pipeline identifying customer retention risks and extracting key behavioral indicators.",
      longDescription: "Implemented machine learning models in Jupyter Notebooks with Scikit-learn and Pandas. Conducted exploratory data analysis, handled class imbalances with SMOTE, engineered behavioral features, and trained gradient boosted trees to predict customer attrition.",
      tags: ["Machine Learning", "Python", "Pandas", "Scikit-Learn", "Data Science"],
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
      github: "https://github.com/RatnalaRaja/Churn-Prediction---Project",
      metrics: ["89% Precision", "Feature importance rankings", "Optimized SMOTE pipeline"]
    }
  ],

  certifications: [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      badge: "AWS",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      description: "Demonstrated comprehensive understanding of AWS Cloud concepts, global infrastructure, security, compliance, core services, and billing practices."
    },
    {
      title: "AWS AI Certified",
      issuer: "Amazon Web Services (AWS)",
      badge: "AWS AI",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      description: "Specialized credential in AWS AI services, Machine Learning workflows, Generative AI fundamentals, and Amazon Bedrock integration."
    },
    {
      title: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft Azure (AZ-900)",
      badge: "AZ-900",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg",
      description: "Foundational knowledge of cloud concepts, Microsoft Azure architectural components, governance, security, and cloud cost management."
    },
    {
      title: "RedHat Certified System Administrator (RHCSA)",
      issuer: "Red Hat",
      badge: "RHCSA",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redhat/redhat-original.svg",
      description: "Core Linux system administration skills including package management, shell scripting, system security, SELinux, storage configuration, and process control."
    },
    {
      title: "IT Specialist Python Certification",
      issuer: "Certiport / Pearson VUE",
      badge: "Python Specialist",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
      description: "Verified expertise in Python fundamentals, data structures, algorithms, modular programming, and object-oriented design."
    }
  ],

  achievements: [
    {
      id: "cicd-fastlane",
      num: "01",
      total: "05",
      type: "metric",
      number: 70,
      suffix: "%",
      title: "Mobile CI/CD Acceleration",
      subtitle: "Reduction in release delivery time via Fastlane & GitHub Actions automation",
      details: "Automated iOS & Android App Store / Play Store pipelines at Tricon Infotech",
      tint: "rgba(33, 114, 229, 0.16)",
      logoUrl: "logos/github-actions.svg"
    },
    {
      id: "cloud-cost",
      num: "02",
      total: "05",
      type: "metric",
      number: 30,
      suffix: "%",
      title: "Cloud Cost Optimization",
      subtitle: "Reduction in operational infrastructure expenses through AWS workload rightsizing",
      details: "AWS EC2, S3, RDS & Lambda architecture migration at Technical Hub",
      tint: "rgba(255, 153, 0, 0.16)",
      logoUrl: "logos/aws.svg"
    },
    {
      id: "uptime-boost",
      num: "03",
      total: "05",
      type: "metric",
      number: 25,
      suffix: "%",
      title: "System Uptime Increase",
      subtitle: "Enhancement in production system availability and automated failover",
      details: "High-availability multi-tier VPC & real-time Amazon CloudWatch telemetry",
      tint: "rgba(34, 197, 94, 0.16)",
      logoUrl: "logos/aws.svg"
    },
    {
      id: "outreach-lambda",
      num: "04",
      total: "05",
      type: "metric",
      number: 150,
      suffix: "%",
      title: "Serverless Outreach Capacity",
      subtitle: "Surge in automated email broadcast operations with 40% lower processing latency",
      details: "Event-driven architecture with AWS Lambda, Amazon SES & EventBridge",
      tint: "rgba(147, 51, 234, 0.16)",
      logoUrl: "logos/aws.svg"
    },
    {
      id: "deepfake-accuracy",
      num: "05",
      total: "05",
      type: "metric",
      number: 25,
      suffix: "%",
      title: "DeepFake Detection Precision",
      subtitle: "Improvement in facial manipulation detection outcomes & synthetic media classification",
      details: "Deep learning computer vision pipeline with Python, OpenCV & cloud inference",
      tint: "rgba(59, 130, 246, 0.16)",
      logoUrl: "logos/python.svg"
    }
  ]
};
