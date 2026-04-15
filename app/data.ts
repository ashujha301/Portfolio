export type UnifiedProject = {
  id: number;
  name: string;
  tagline: string;
  technologies: string[];
  description: string;
  githubLink?: string;
  liveAppLink?: string;
  live: boolean;
  statusLabel?: string;
  imagePath?: string;
  imagePaths?: string[];
  videoPath?: string;
};

// Web Projects

export const projects: UnifiedProject[] = [
  {
    id: 1,
    name: "Appknox Plugin",
    tagline: "Security scanning, baked into Jenkins CI.",
    technologies: ["Java", "Jenkins", "CI/CD", "GitHub Actions", "TypeScript"],
    description:
      "Jenkins plugin that uploads your mobile build (APK/IPA) to Appknox for automated security scanning and fails the CI based on a configurable risk threshold. Supports Freestyle and Pipeline.",
    githubLink: "https://github.com/jenkinsci/appknox-scanner-plugin",
    liveAppLink: "https://plugins.jenkins.io/appknox-scanner/",
    live: true,
    statusLabel: "Live on Jenkins Marketplace",
    imagePaths: ["/assets/projects/web/Project1.png", "/assets/projects/web/apj-2.png", "/assets/projects/web/apj-3.png", "/assets/projects/web/apj-4.png"],
  },
  {
    id: 2,
    name: "Appknox GitHub Action",
    tagline: "Mobile security scanning directly in your CI pipeline.",
    technologies: ["Go", "SARIF", "GitHub Actions", "CI/CD", "DevSecOps"],
    description:
      "A GitHub Action wrapper built around the Appknox Go CLI that enables automated mobile application security scanning within GitHub CI pipelines. The action uploads mobile binaries (APK/IPA) to Appknox for analysis and generates SARIF reports that can be directly published to GitHub Security. This allows developers to detect vulnerabilities in mobile builds during CI and view security findings natively inside GitHub's code scanning interface.",
    githubLink: "https://github.com/appknox/appknox-github-action",
    liveAppLink: "https://github.com/marketplace/actions/appknox-github-action",
    live: true,
    statusLabel: "Live on GitHub Marketplace",
    imagePaths: ["/assets/projects/web/apga-1.png", "/assets/projects/web/apga-2.png", "/assets/projects/web/apga-3.png"],
  },
  {
    id: 3,
    name: "Valentine’s Interactive Website",
    tagline: "A playful multi-page experience built with Rocket.ai.",
    technologies: ["React", "TypeScript", "Rocket.ai", "Animations", "Interactive UI"],
    description:
      "A fun multi-page interactive Valentine's themed website built using Rocket.ai. The project features smooth page transitions, animated UI elements, and small interactive games designed to create a playful user experience. The site combines modern frontend design with dynamic animations and engaging interactions, demonstrating how AI-assisted tools like Rocket.ai can accelerate the development of creative web experiences.",
    githubLink: "https://github.com/ashujha301/valentines_website",
    liveAppLink: "https://avi-wybmv.vercel.app/",
    live: true,
    statusLabel: "Live on Vercel",
    imagePaths: ["/assets/projects/web/vw-1.png", "/assets/projects/web/vw-2.png", "/assets/projects/web/vw-3.png"],
  },
  {
    id: 4,
    name: "CodeRank",
    tagline: "Write. Run. Ship — from anywhere.",
    technologies: ["ReactJS", "NodeJS", "TypeScript", "Docker", "AWS", "Redux"],
    description:
      "Cloud-based coding editor with multi-language support, secure on-demand execution, and persistent cloud file storage — write, run, and save projects from any device with real-time feedback.",
    githubLink: "https://github.com/ashujha301/CodeRank",
    live: false,
    statusLabel: "Side Project",
    imagePath: "/assets/projects/web/CodeRank.png",
  },
  {
    id: 5,
    name: "Canteen Web App",
    tagline: "Zero queues. Pure chai vibes.",
    technologies: ["React", "Firebase", "JQuery"],
    description:
      "AirForce Canteen Bamrauli booking system. Generates unique tokens to reduce wait times, admin dashboard to verify visits and export booking data to Excel. Redux for state management.",
    githubLink: "https://github.com/ashujha301/CanteenWebApp",
    liveAppLink: "https://afscanteen.vercel.app/",
    live: true,
    statusLabel: "Live",
    imagePaths: ["/assets/projects/web/CanteenWebApp-1.png", "/assets/projects/web/CanteenWebApp-2.png", "/assets/projects/web/CanteenWebApp-3.png"],
  },
  {
    id: 6,
    name: "Task-Manager",
    tagline: "Minimal. Fast. Actually useful.",
    technologies: ["React", "Redux", "NodeJS", "Typescript", "Vercel"],
    description:
      "Task management app (Vite + React client with a lightweight Node server). Create, update, complete and delete tasks with priority & due dates, plus filtering/sorting for productivity.",
    githubLink: "https://github.com/ashujha301/Task-Manager",
    liveAppLink: "https://task-manager-zeta-mocha.vercel.app/",
    live: true,
    statusLabel: "Live on Vercel",
    imagePath: "/assets/projects/web/TaskManager.png",
  },
  {
    id: 7,
    name: "Amazon Clone",
    tagline: "E-commerce.",
    technologies: ["ReactJS", "NodeJS", "JWT", "Authentication"],
    description:
      "Full e-commerce UI clone with React and a Node/Express backend. Product listing, cart/checkout flow, responsive layout, routing and JWT-based auth. Deployed on Vercel.",
    githubLink: "https://github.com/ashujha301/Amazon-clone",
    live: true,
    statusLabel: "Side Project",
    imagePath: "/assets/projects/web/AmazonClone.png",
  }
];

// AI / ML Projects

export const aimlProjects: UnifiedProject[] = [
  {
    id: 1,
    name: "Zynk - Gesture Controlled Browser AI",
    tagline: "Control the browser with your hands or voice.",
    technologies: [
      "Python",
      "Computer Vision",
      "MediaPipe",
      "OpenCV",
      "OpenAI API",
      "LLM / whisper-api",
      "Chrome Extension",
      "Manifest V3",
      "JavaScript",
      "Machine Learning"
    ],
    description:
      "An AI-powered Chrome extension that enables touchless browser interaction using real-time hand gesture recognition. Built with MediaPipe and OpenCV to detect finger gestures for actions like scrolling, clicking, selecting text, and cursor control directly inside the browser tab. The system streams gesture data from a Python vision pipeline to the extension, enabling low-latency interaction and experimenting with real-world human–computer interaction using computer vision.",
    githubLink: "https://github.com/ashujha301/Zynk-Chrome-Extention",
    liveAppLink: "https://chromewebstore.google.com/detail/zynk-ai/emdoiabhlllnfhenaejgliopnddbpaga",
    live: true,
    statusLabel: "Available on Chrome Web Store",
    imagePath: "/assets/projects/ai-ml/zynk.png",
    videoPath: "assets/projects/ai-ml/Zynk-glimpse.mp4"
  },
  {
    id: 2,
    name: "Deep Super Resolution",
    tagline: "Turning blurry images into high-resolution detail (2X) - GPU accelerated, built from scratch",
    technologies: [
      "Python",
      "PyTorch",
      "CNN",
      "Deep Learning",
      "Computer Vision",
      "GPU Acceleration",
      "C++ kernels",
      "Core Maths/Algorithms"
    ],
    description:
      "Deep learning based image super-resolution system that reconstructs high-resolution images from low-resolution inputs using convolutional neural networks. The project explores modern super-resolution techniques including residual learning and feature extraction layers to recover fine visual details. Built as an experimental research project to understand how neural networks enhance image clarity and reconstruct lost pixel information.",
    githubLink: "https://github.com/ashujha301/Deep-super-resolution",
    live: false,
    statusLabel: "Started Development",
    imagePath: "/assets/projects/in-progress.png"
  },
  {
    id: 3,
    name: "Job Search AI Agent",
    tagline: "An autonomous AI agent that hunts jobs for you.",
    technologies: [
      "Python",
      "LLMs",
      "LangGraph",
      "RAG",
      "Vector Database",
      "AI Agents",
      "Web Scraping"
    ],
    description:
      "Autonomous AI job search agent designed to discover, rank, and recommend highly relevant job opportunities across multiple job boards. The system combines web scraping pipelines with LLM reasoning and vector search to match job descriptions with user profiles, rank opportunities using semantic similarity, and automatically filter the best matches. Designed as a production-style agent system that mimics how modern AI copilots perform information retrieval and decision making.",
    githubLink: "https://github.com/ashujha301/Job-Search-AI-Agent",
    live: false,
    statusLabel: "Actively Building",
    imagePath: "/assets/projects/in-progress.png"
  },
  {
    id: 4,
    name: "Real-Time Fraud Detection System",
    tagline: "Detect suspicious transactions before they happen - built from scratch",
    technologies: [
      "Python",
      "Logistic Regression",
      "Maths",
      "Machine Learning",
      "Feature Engineering",
      "Kafka-streaming"
    ],
    description:
      "Machine learning system designed to detect fraudulent financial transactions using logistic regression. The project simulates a real production fraud detection pipeline including feature preprocessing, model training, evaluation, and prediction scoring. Built to replicate how banks and fintech platforms classify high-risk transactions in real-time using statistical models and probability scoring from scratch using.",
    githubLink: "https://github.com/ashujha301/ML-Models/tree/main/logistic_regression",
    live: true,
    statusLabel: "Working Prototype",
    imagePath: "/assets/projects/ai-ml/logreg.png",
    videoPath: "assets/projects/ai-ml/LogRegFast.mp4"
  },
  {
    id: 5,
    name: "Loan Approval Prediction System",
    tagline: "Predicting loan approvals using decision trees - Built from scratch",
    technologies: [
      "Python",
      "Decision Trees",
      "Maths",
      "Machine Learning",
      "Data Preprocessing"
    ],
    description:
      "End-to-end machine learning model that predicts loan approval decisions based on applicant financial attributes. Built from scratch without any ml libraries used, core maths and decision tree algorithms, including dataset preprocessing, feature engineering, model training, and evaluation. The system replicates the decision logic used by financial institutions to assess credit eligibility and automate lending decisions.",
    githubLink: "https://github.com/ashujha301/ML-Models/tree/main/decison_tree",
    live: true,
    statusLabel: "Completed ML Project",
    imagePath: "/assets/projects/ai-ml/dectree.png",
    videoPath: "assets/projects/ai-ml/DecTree-video.mp4"
  }
];


export const experienceSectionText = `Over the past 1.8+ years, i've had the opportunity to work on a wide range of complex projects, collaborate with talented individuals and learn from some of the best in the industry. Here are some of the highlights of my journey so far.`;

export type Experience = {
  id: number;
  companyName: string;
  location: string;
  duration: string;
  roles: string[];
  tags: string[];
  details?: {
    imagePaths?: string[];
    description: string;
    companyWebsite?: string;
  };
};

export const experiences: Experience[] = [
  {
    id: 1,
    companyName: "Sort Tree",
    location: "London, United Kingdom - Remote",
    duration: `November 2025 - Present`,
    roles: ["Machine Learning Engineer", "AI/ML Engineer"],
    tags: ["Python", "MLOps", "FastAPI", "Tensorflow", "Pytorch", "LLMs", "RAG", "Feature Engineering", "Inference API", "ML", "Deep Learning"],
    details: {
      companyWebsite: "https://www.sort-tree.com/",
      imagePaths: [
        "/assets/experiences/sort-tree-1.png",
        "/assets/experiences/sort-tree-2.png",
      ],
      description: `Working as a Machine Learning Engineer on a performance marketing platform, building ML-driven systems for product and campaign analysis.`,
    },
  },
  {
    id: 2,
    companyName: "Saranyu Technologies",
    location: "Bangalore, India - On site",
    duration: `August 2024 - October 2025`,
    roles: ["Full stack Developer", "Software Engineer"],
    tags: ["NextJS", "NodeJS", "Typescript", "SCSS", "MySQL", "WordPress", "JavaScript"],
    details: {
      companyWebsite: "https://saranyu.in/",
      imagePaths: [
        "/assets/experiences/Saranyu-1.png",
        "/assets/experiences/Saranyu-2.png",
      ],
      description: `As a Full Stack Developer I Contributed across client projects: Next.js frontend and Node.js (Fastify) / PHP APIs for scalable web apps. Set up CI/CD with GitHub Actions, collaborated through Git PR reviews, and worked in Agile ceremonies (sprint planning, standups). Focus on maintainable TypeScript code, performance and reliable deployments.`,
    },
  },
  {
    id: 3,
    companyName: "Appknox, Bangalore, India",
    location: "Bangalore, India - Hybrid",
    duration: `May 2024 - July 2024`,
    roles: ["Software Engineering", "Intern", "Backend", "DevOps"],
    tags: ["Go", "Typescript", "Jenkins", "CI/CD", "SARIF Report", "Security", "Python", "Java"],
    details: {
      companyWebsite: "https://www.appknox.com/",
      imagePaths: [
        "/assets/experiences/Appknox-1.png",
        "/assets/experiences/Appknox-2.png",
      ],
      description: `As a Software Engineering Intern at Appknox, I Implemented SARIF report generation in the Appknox CLI to enable GitHub Advanced Security. Built and integrated a Jenkins CI/CD plugin to automate Appknox scans for enterprise clients. Created a Python web scraper to collect metadata for 15k+ Play Store apps, improving data-processing efficiency by ~35%. Learned Go and contributed to the Appknox backend API, enhancing my full-stack skills in a fast-paced startup environment.`,
    },
  },
  {
    id: 4,
    companyName: "Freelancer",
    location: "Bangalore, India - Remote",
    duration: `November 2023 - March 2024`,
    roles: ["Frontend Developer", "UI/UX Designer", "Backend developer"],
    tags: ["React", "Firebase", "Javascript", "Figma"],
    details: {
      description: `As a freelance developer, I worked with a variety of clients to create custom websites, web applications, and user interfaces. I specialized in React, NextJS, and TypeScript, building high-performance, responsive, and user-friendly applications that met the unique needs of each client. I collaborated closely with clients to understand their vision and goals, translating them into engaging, interactive digital experiences.`,
      imagePaths: ["/assets/experiences/CanteenWebApp.png"],
    },
  },
];

export const socials = {
  linkedin: "https://www.linkedin.com/in/ayush-jha301/",
  github: "https://github.com/ashujha301",
  twitter: "https://x.com/AyushJha1930"
};

export type FAQItem = {
  question: string;
  answer: string;
};

export const faqData: FAQItem[] = [
  {
    question: "Where are you located, and how do you like to collaborate?",
    answer:
      "I’m based in Bengaluru, India. I work comfortably within Agile routines, prefer asynchronous communication, and keep progress visible through GitHub issues/PRs and CI pipeline dashboards.",
  },
  {
    question: "Can you adapt quickly to new tools and changing requirements?",
    answer:
      "Absolutely. I enjoy learning new stacks and evolving with project scope. If a new framework, API, or pattern is needed, I research fast, prototype, and implement a solution that fits the goal.",
  },
  {
    question: "Do you own projects end-to-end?",
    answer:
      "Yes. I take full ownership—from planning to delivery—communicating proactively, meeting timelines, solving issues independently, and making sure the final outcome meets or exceeds expectations.",
  },
  {
    question: "How do you drive innovation and tackle tough problems?",
    answer:
      "I combine research with experimentation to find practical, creative solutions. I’m willing to try new approaches while maintaining code quality and a strong user experience.",
  },
  {
    question: "What does your typical workflow look like?",
    answer:
      "Clear communication, regular checkpoints, and attention to detail. I ship maintainable code, provide realistic estimates, and support the product after launch to ensure long-term reliability.",
  },
];

export const college: College[] = [
  {
    name: "Reva University",
    degree: "Bachelor of Technology in Electronics and Communication Engineering ( Computer Science Minor )",
    duration: "2019 - 2023",
    website: "https://www.reva.edu.in/",
    place: "Bengaluru, India",
  },
];

export type College = {
  name: string;
  degree: string;
  duration: string;
  website: string;
  place: string;
};
