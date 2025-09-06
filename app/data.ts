export const projects = [
  {
    id: 1,
    name: "CodeRank",
    technologies: ["ReactJS", "NodeJS", "TypeScript", "Docker", "AWS", "Redux"],
    description: `Cloud-based coding editor with multi-language support, secure on-demand execution, and persistent cloud file storage—write, run, and save projects from any device with real-time feedback.`,
    githubLink: "https://github.com/ashujha301/CodeRank",
    imagePath: "/assets/projects/CodeRank.png",
  },
  {
    id: 2,
    name: "Appknox Plugin",
    technologies: [
      "Java",
      "Jenkins",
      "CI/CD",
      "GitHub Actions",
      "TypeScript",
    ],
    description: `Jenkins plugin that uploads your mobile build (APK/IPA) to Appknox for automated security scanning and fails the CI based on a configurable risk threshold. Supports Freestyle and Pipeline via the AppKnoxScanner step.`,
    githubLink: "https://github.com/jenkinsci/appknox-scanner-plugin",
    liveAppLink: "https://plugins.jenkins.io/appknox-scanner/",
    imagePath: "/assets/projects/Project1.png",
  },
  {
    id: 3,
    name: "Amazon Clone",
    technologies: ["ReactJS", "NodeJS", "JWT", "Authentication"],
    description: `E-commerce UI clone with React (CRA) and a simple Node/Express backend scaffold. Includes product listing, cart/checkout flow UI, responsive layout, routing and basic state management. Deployed on Vercel for quick demos.`,
    githubLink: "https://github.com/ashujha301/Amazon-clone",
    imagePath: "/assets/projects/AmazonClone.png",
  },
  {
    id: 4,
    name: "Task-Manager",
    technologies: ["React", "Redux", "NodeJS", "Typescript", "Vercel"],
    description: `Task management app (Vite + React client with a lightweight Node server). Create, update, complete and delete tasks with priority & due dates, plus filtering/sorting for productivity. Built as a clean, fast demo with a minimal API and deployed to Vercel.`,
    githubLink: "https://github.com/ashujha301/Task-Manager",
    liveAppLink: "https://task-manager-zeta-mocha.vercel.app/",
    imagePath: "/assets/projects/TaskManager.png",
  },
  {
    id: 5,
    name: "Canteen Web App",
    technologies: [
      "React",
      "Firebase",
      "JQuery"
    ],
    description: `AF Canteen Bamrauli booking system built with React + Firebase and hosted on Vercel. Generates unique customer tokens to reduce wait times, with an admin dashboard to verify visits and export booking data to Excel. Redux used for predictable state management.`,
    githubLink: "https://github.com/ashujha301/CanteenWebApp",
    liveAppLink: "https://afscanteen.vercel.app/",
    imagePath: "/assets/projects/CanteenWebApp.png",
  },
];

export const experienceSectionText = `Over the past 2+ years, i've had the oppurtunity to work on a wide range of complex projects, colloborate with talented individuals and learn from some of the best in the industry. Here are some of the highlights of my journey so far.`;

export type Experience = {
  id: number;
  companyName: string;
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
    companyName: "Saranyu Technologies",
    duration: `August 2024 - Oct 2025`,
    roles: ["Full stack Developer", "Software Engineer", "Frontend Developer", "Backend Developer"],
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
    id: 2,
    companyName: "Appknox, Bangalore, India",
    duration: `May 2024 - July 2024`,
    roles: ["Software Engineering", "Intern", "DevOps"],
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
    id: 3,
    companyName: "Freelancer, Remote",
    duration: `November 2023 - March 2024`,
    roles: ["Frontend Developer", "UI/UX Designer", "Full Stack developer"],
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
    question: "What’s your approach to deployment and modern web standards?",
    answer:
      "I deploy to platforms like Vercel, Netlify, and AWS. My focus is responsive UIs, performance optimization, solid SEO, and clean, scalable code. I’m comfortable with Git-based workflows and collaborative development.",
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
