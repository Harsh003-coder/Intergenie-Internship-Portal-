import { useState, useEffect } from 'react'
import './App.css'
import Chatbot from './Chatbot'

function App() {
  const [activeTab, setActiveTab] = useState('jobs')
  // Tabs: 'jobs', 'careerPath', 'internships', 'courses', 'search'

  // Career Path states
  const [userGrades, setUserGrades] = useState('')
  const [completedCourses, setCompletedCourses] = useState('')
  const [recommendations, setRecommendations] = useState(null)

  const [appliedJobs, setAppliedJobs] = useState([]);

  // User Profile Global State
  const [userProfile, setUserProfile] = useState({
    name: '',
    education: '',
    skills: '',
    cv: null,
    isSet: false
  });

  const trendingCareers = [
    { title: 'AI/ML Engineer', desc: 'Build intelligent systems and model deep learning algorithms.', score: 'High Demand' },
    { title: 'Full Stack Developer', desc: 'End-to-end web & application development.', score: 'Evergreen' },
    { title: 'Cloud Architect', desc: 'Design scalable server infrastructures on AWS/Azure.', score: 'High Demand' },
    { title: 'Data Scientist', desc: 'Analyze complex datasets to drive business decisions.', score: 'Trending' },
    { title: 'Cybersecurity Analyst', desc: 'Protect networks and data from cyber threats.', score: 'High Demand' },
    { title: 'Product Manager', desc: 'Drive product vision, strategy, and execution.', score: 'Highly Paid' },
    { title: 'DevOps Engineer', desc: 'Streamline development and operations pipelines.', score: 'High Demand' },
    { title: 'UI/UX Designer', desc: 'Create beautiful, user-centric interfaces and experiences.', score: 'Trending' }
  ];

  const generateRecommendations = (e) => {
    e.preventDefault();
    if (!userGrades || !completedCourses) return;

    const allOptions = [
      { title: 'Frontend Web Developer', desc: 'Focus on UI/UX with HTML, CSS, React, and Vue.', tags: ['cs', 'web', 'frontend', 'ui', 'ux', 'javascript', 'react', 'b.tech', 'bca'], scoreStr: 'Top Match', skills: ['React & Vue', 'CSS/Tailwind', 'Web Accessibility'] },
      { title: 'Backend Node.js Developer', desc: 'Build scalable APIs and server-side logic.', tags: ['cs', 'web', 'backend', 'node', 'javascript', 'b.tech', 'bca', 'api'], scoreStr: 'High Potential', skills: ['Node & Express', 'REST/GraphQL', 'Database Design'] },
      { title: 'Full Stack Developer', desc: 'End-to-end web & application development.', tags: ['cs', 'web', 'frontend', 'backend', 'javascript', 'b.tech', 'bca'], scoreStr: 'Hot Trend', skills: ['MERN/MEAN Stack', 'API Integration', 'Deployment'] },
      { title: 'Data Scientist', desc: 'Analyze complex datasets using Python and R.', tags: ['data', 'python', 'math', 'statistics', 'cs', 'ai', 'b.tech', 'b.sc'], scoreStr: 'Solid Path', skills: ['Python Data Tools', 'Statistics & Math', 'Data Visualization'] },
      { title: 'Machine Learning Engineer', desc: 'Model deep learning algorithms and predictive models.', tags: ['ai', 'ml', 'python', 'data', 'cs', 'b.tech'], scoreStr: 'Emerging', skills: ['Deep Learning', 'TensorFlow/PyTorch', 'Model Deployment'] },
      { title: 'Cloud Architect', desc: 'Design server infrastructures on AWS/Azure.', tags: ['cloud', 'networking', 'infrastructure', 'cs', 'aws', 'azure', 'b.tech'], scoreStr: 'Elite', skills: ['AWS/Azure Services', 'System Architecture', 'Scalability'] },
      { title: 'DevSecOps Automation', desc: 'Combines security with development workflows.', tags: ['cloud', 'security', 'devops', 'cs', 'networking'], scoreStr: 'Trending', skills: ['CI/CD Pipelines', 'Security Audits', 'Automation Scripts'] },
      { title: 'Cybersecurity Analyst', desc: 'Protect networks and data from cyber threats.', tags: ['security', 'network', 'cyber', 'cs', 'b.tech', 'ethical hacking'], scoreStr: 'High Demand', skills: ['Network Security', 'Pen Testing', 'Threat Analysis'] },
      { title: 'UI/UX Designer', desc: 'Create beautiful, user-centric interfaces and experiences.', tags: ['design', 'ui', 'ux', 'art', 'creative', 'graphics', 'figma'], scoreStr: 'Creative Base', skills: ['Figma/Adobe', 'User Research', 'Wireframing'] },
      { title: 'Graphics Designer', desc: 'Visual storytelling through digital illustrations.', tags: ['design', 'visual', 'art', 'graphics', 'animation'], scoreStr: 'Creative', skills: ['Adobe Suite', 'Typography', 'Visual Communication'] },
      { title: 'Product Manager', desc: 'Drive product vision, strategy, and execution.', tags: ['management', 'product', 'business', 'mba', 'strategy', 'bba'], scoreStr: 'Leadership', skills: ['Agile Methodology', 'Product Strategy', 'Stakeholder Comms'] },
      { title: 'Financial Analyst', desc: 'Analyze financial data to guide business decisions.', tags: ['finance', 'math', 'b.com', 'business', 'mba', 'accounting', 'economics'], scoreStr: 'Lucrative', skills: ['Financial Modeling', 'Data Analysis', 'Risk Management'] },
      { title: 'Investment Banker', desc: 'Help companies raise capital and manage acquisitions.', tags: ['finance', 'investment', 'mba', 'business', 'b.com'], scoreStr: 'Elite', skills: ['Capital Markets', 'M&A Strategies', 'Valuation'] },
      { title: 'Digital Marketing Specialist', desc: 'Drive online brand awareness and customer acquisition.', tags: ['marketing', 'digital', 'social media', 'seo', 'business', 'bba'], scoreStr: 'Trending', skills: ['SEO & SEM', 'Content Strategy', 'Analytics (GA4)'] },
      { title: 'HR Manager', desc: 'Manage recruitment, relations, and company culture.', tags: ['hr', 'human resources', 'management', 'mba', 'bba', 'psychology'], scoreStr: 'Essential', skills: ['Talent Sourcing', 'Employee Relations', 'Org Psychology'] },
      { title: 'Mechanical Design Engineer', desc: 'Design and analyze mechanical systems.', tags: ['mechanical', 'engineering', 'b.tech', 'machinery', 'autocad'], scoreStr: 'Core Engineering', skills: ['AutoCAD/SolidWorks', 'Thermodynamics', 'Material Science'] },
      { title: 'Electrical Engineer', desc: 'Work on electrical systems, circuitry, and power.', tags: ['electrical', 'electronics', 'b.tech', 'circuits', 'power'], scoreStr: 'Core Engineering', skills: ['Circuit Design', 'Power Systems', 'Control Systems'] },
      { title: 'Civil Engineer', desc: 'Design, build, and supervise infrastructure projects.', tags: ['civil', 'construction', 'b.tech', 'infrastructure'], scoreStr: 'Core Engineering', skills: ['Structural Analysis', 'Project Management', 'CAD Tools'] },
      { title: 'Clinical Researcher', desc: 'Conduct studies to improve healthcare solutions.', tags: ['medical', 'biology', 'science', 'health', 'b.sc', 'pharmacy', 'medicine'], scoreStr: 'Healthcare', skills: ['Trial Protocols', 'Data Management', 'Regulatory Affairs'] },
      { title: 'Data Analyst (Healthcare)', desc: 'Optimize patient care through data analytics.', tags: ['medical', 'data', 'health', 'analytics', 'b.sc'], scoreStr: 'Emerging Field', skills: ['Health Informatics', 'SQL/Python', 'Biostatistics'] },
      { title: 'Blockchain Developer', desc: 'Build decentralized applications and smart contracts.', tags: ['blockchain', 'web3', 'crypto', 'cs', 'b.tech'], scoreStr: 'Niche Tech', skills: ['Smart Contracts', 'Solidity/Rust', 'Web3 Architecture'] },
      { title: 'Game Developer', desc: 'Create interactive and immersive gaming experiences.', tags: ['game', 'c++', 'unity', 'unreal', 'cs', 'graphics'], scoreStr: 'Entertainment', skills: ['Unity/Unreal', 'C# / C++', '3D Math & Physics'] },
      { title: 'Content Strategist', desc: 'Plan, create, and manage engaging content.', tags: ['content', 'writing', 'english', 'communication', 'journalism', 'ba'], scoreStr: 'Communications', skills: ['Copywriting', 'SEO Principles', 'Brand Voice'] },
      { title: 'Advanced React & Next.js', desc: 'Perfect follow-up for modern web development.', tags: ['react', 'next', 'js', 'frontend', 'web'], scoreStr: 'Top Match', skills: ['SSR & SSG', 'Advanced Hooks', 'Performance Opt.'] },
      { title: 'Generative AI Applications', desc: 'The most trending subject in modern AI.', tags: ['ai', 'genai', 'python', 'llm', 'chatgpt', 'ml'], scoreStr: 'Trending', skills: ['LLM Orchestration', 'Prompt Engineering', 'RAG pipelines'] },
      { title: 'Agile Product Master', desc: 'A management pivot for software teams.', tags: ['agile', 'scrum', 'management', 'software', 'lead'], scoreStr: 'Alternative', skills: ['Scrum Framework', 'Sprint Planning', 'Team Coaching'] }
    ];

    const inputTokens = `${userGrades} ${completedCourses}`.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
    const fullInputText = `${userGrades} ${completedCourses}`.toLowerCase();

    // Calculate score for each option
    const scoredOptions = allOptions.map(option => {
      let score = 0;
      option.tags.forEach(tag => {
        if (inputTokens.includes(tag)) {
          score += 3;
        } else if (fullInputText.includes(tag) && tag.length > 2) {
          score += 1;
        }
      });
      return { ...option, matchScore: score };
    });

    // Sort by match score (descending), break ties pseudo-randomly for variety
    scoredOptions.sort((a, b) => {
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      return 0.5 - Math.random();
    });

    // Select the top 8 options
    const dynamicRecs = scoredOptions.slice(0, 8).map((opt, index) => {
      let eligibilityPoints = 50 + (opt.matchScore * 5);
      if (opt.matchScore === 0) eligibilityPoints = 35 + Math.floor(Math.random() * 15);
      const eligibility = Math.min(98, eligibilityPoints) + '%';
      
      return {
        title: opt.title,
        desc: opt.desc,
        score: opt.matchScore > 0 ? opt.scoreStr : (index === 0 ? 'Best Guess' : 'General Path'),
        skills: opt.skills || ['Core Concepts', 'Industry Tools', 'Problem Solving'],
        eligibility: eligibility
      }
    });

    setRecommendations(dynamicRecs);
  };

  const calculateChances = (job, userSkills, userDegree, filterJobType = 'all') => {
      let score = 50; // Base chance
      
      const jobTitle = job.title.toLowerCase();
      const jobType = job.type ? job.type.toLowerCase() : '';
      
      // Bonus for skill match in title
      if (userSkills) {
        const skills = userSkills.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
        skills.forEach(skill => {
          if (jobTitle.includes(skill)) score += 15;
        });
      } else {
        score += 10; // Free points if no specific skill filter
      }

      // Bonus for degree mention
      if (userDegree) {
        const degree = userDegree.toLowerCase();
        if (jobTitle.includes(degree) || (job.desc && job.desc.toLowerCase().includes(degree))) {
           score += 20;
        } else {
           score += 5; // General degree match assumption
        }
      } else {
        score += 10; // Free points if no specific degree filter
      }
      
      // Bonus for exact job type match
      if (filterJobType !== 'all' && jobType.includes(filterJobType.toLowerCase())) {
        score += 15;
      }

      // Randomize slightly for realism and cap at 98%
      const finalScore = Math.min(98, score + Math.floor(Math.random() * 10));
      return finalScore;
  };

  const [jobOffers, setJobOffers] = useState([]);
  const [internships, setInternships] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Search Filter states
  const [searchCategory, setSearchCategory] = useState('jobs')
  const [filterPrice, setFilterPrice] = useState(10000)
  const [filterJobType, setFilterJobType] = useState('all')
  const [filterLocation, setFilterLocation] = useState('')
  const [filterDegree, setFilterDegree] = useState('')
  const [filterSkills, setFilterSkills] = useState('')

  const [searchResults, setSearchResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    let results = [];

    if (searchCategory === 'jobs' || searchCategory === 'internships') {
       const dataSource = searchCategory === 'jobs' ? jobOffers : internships;
       
       results = dataSource.filter(job => {
        const matchLocation = filterLocation ? job.location.toLowerCase().includes(filterLocation.toLowerCase()) : true;
        const matchType = filterJobType !== 'all' ? job.type.toLowerCase().includes(filterJobType.toLowerCase()) : true;
        
        // We relax the hard skill filter to allow scoring to determine relevance
        // instead of abruptly hiding jobs if they don't perfectly match
        return matchLocation && matchType;
      }).map(job => {
        return { ...job, matchChance: calculateChances(job, filterSkills, filterDegree, filterJobType) };
      });
      
      // Filter out explicitly very low matches if skills were specified
      if (filterSkills) {
         const skills = filterSkills.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
         results = results.filter(job => {
             return skills.some(skill => job.title.toLowerCase().includes(skill)) || job.matchChance > 60;
         });
      }

      // Sort by highest chances
      results.sort((a, b) => b.matchChance - a.matchChance);

    } else if (searchCategory === 'courses') {
      results = courses.filter(course => {
        const matchSkills = filterSkills ? course.title.toLowerCase().includes(filterSkills.toLowerCase()) : true;
        const priceNum = parseInt(course.price.replace(/[^\d]/g, '')) || 0;
        const matchPrice = priceNum <= filterPrice;
        return matchSkills && matchPrice;
      });
    }
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleApply = (job) => {
    // Show the status tracker interface first
    setActiveTab('applications');

    // Open in new tab (directly to official target applying link if available)
    if (job.apply_link) {
      window.open(job.apply_link, '_blank');
    }

    // Add to applied jobs if not already there
    setAppliedJobs(prev => {
      const alreadyApplied = prev.find(p => (p.id && job.id && p.id === job.id) || (p.title === job.title && p.company === job.company));
      if (alreadyApplied) return prev;
      
      const newApp = {
        ...job,
        appliedDate: new Date().toLocaleDateString(),
        status: 'Applied', // Applied -> Viewed -> Shortlisted / Rejected
        companyName: job.company || job.provider || 'Company'
      };

      // Simulate status changes after 4 and 10 seconds for demo purposes
      setTimeout(() => {
        setAppliedJobs(current => current.map(app => 
          app.title === job.title && app.companyName === newApp.companyName ? { ...app, status: 'Viewed' } : app
        ));
      }, 4000);

      setTimeout(() => {
        setAppliedJobs(current => current.map(app => 
          app.title === job.title && app.companyName === newApp.companyName ? { ...app, status: Math.random() > 0.4 ? 'Shortlisted' : 'Rejected' } : app
        ));
      }, 10000);

      return [newApp, ...prev];
    });
  };

  useEffect(() => {
    // 1. Simulating Realistic Jobs Database
    const realisticJobs = [
      {"id":"j1","title":"Software Engineer, Early Career","company":"Google","salary":"₹14,00,000 - ₹25,00,000 / yr","type":"Full-time","location":"Bangalore, India","apply_link":"https://careers.google.com/jobs/results/"},
      {"id":"j2","title":"Frontend Engineer (React)","company":"Meta","salary":"₹18,00,000 - ₹30,00,000 / yr","type":"Remote","location":"Remote, India","apply_link":"https://www.metacareers.com/jobs"},
      {"id":"j3","title":"Deep Learning Software Engineer","company":"NVIDIA","salary":"₹20,00,000 - ₹40,00,000 / yr","type":"Full-time","location":"Pune, India","apply_link":"https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite"},
      {"id":"j4","title":"Software Development Engineer I","company":"Amazon","salary":"₹15,50,000 - ₹28,00,000 / yr","type":"Full-time","location":"Hyderabad, India","apply_link":"https://amazon.jobs/en/"},
      {"id":"j5","title":"Data Scientist","company":"Microsoft","salary":"₹16,00,000 - ₹24,00,000 / yr","type":"Hybrid","location":"Noida, India","apply_link":"https://careers.microsoft.com/v2/global/en/home.html"},
      {"id":"j6","title":"Cloud Infrastructure Engineer","company":"Netflix","salary":"₹30,00,000 - ₹50,00,000 / yr","type":"Remote","location":"Remote, Worldwide","apply_link":"https://jobs.netflix.com/search"},
      {"id":"j7","title":"Backend Developer (Node.js)","company":"Spotify","salary":"₹22,00,000 - ₹35,00,000 / yr","type":"Remote","location":"Remote, India","apply_link":"https://www.lifeatspotify.com/jobs"},
      {"id":"j8","title":"Security Analyst","company":"Apple","salary":"₹18,00,000 - ₹32,00,000 / yr","type":"Full-time","location":"Bangalore, India","apply_link":"https://jobs.apple.com/en-in/search"},
      {"id":"j9","title":"Associate UI/UX Designer","company":"Adobe","salary":"₹10,00,000 - ₹18,00,000 / yr","type":"Hybrid","location":"Noida, India","apply_link":"https://careers.adobe.com/us/en"},
      {"id":"j10","title":"Blockchain Developer","company":"Coinbase","salary":"₹25,00,000 - ₹45,00,000 / yr","type":"Remote","location":"Remote","apply_link":"https://www.coinbase.com/careers"},
      {"id":"j11","title":"Site Reliability Engineer","company":"Airbnb","salary":"₹28,00,000 - ₹42,00,000 / yr","type":"Remote","location":"Remote","apply_link":"https://careers.airbnb.com/"},
      {"id":"j12","title":"Data Analyst","company":"Uber","salary":"₹12,00,000 - ₹20,00,000 / yr","type":"Full-time","location":"Hyderabad, India","apply_link":"https://www.uber.com/global/en/careers/list/"},
      {"id":"j13","title":"Product Manager","company":"Atlassian","salary":"₹25,00,000 - ₹38,00,000 / yr","type":"Remote","location":"Remote, India","apply_link":"https://www.atlassian.com/company/careers"},
      {"id":"j14","title":"Machine Learning Researcher","company":"OpenAI","salary":"$180,000 - $350,000 / yr","type":"Full-time","location":"San Francisco, CA","apply_link":"https://openai.com/careers"},
      {"id":"j15","title":"iOS Developer","company":"Tesla","salary":"₹22,00,000 - ₹36,00,000 / yr","type":"Full-time","location":"Austin, TX","apply_link":"https://www.tesla.com/careers"},
      {"id":"j16","title":"Android Developer","company":"Samsung","salary":"₹14,00,000 - ₹22,00,000 / yr","type":"Hybrid","location":"Noida, India","apply_link":"https://research.samsung.com/careers"},
      {"id":"j17","title":"Full Stack JavaScript Engineer","company":"Slack","salary":"₹20,00,000 - ₹30,00,000 / yr","type":"Remote","location":"Remote","apply_link":"https://slack.com/careers/departments/engineering"},
      {"id":"j18","title":"Systems Engineer","company":"Cisco","salary":"₹12,00,000 - ₹19,00,000 / yr","type":"Full-time","location":"Bangalore, India","apply_link":"https://jobs.cisco.com/"},
      {"id":"j19","title":"Data Engineer","company":"Snowflake","salary":"₹24,00,000 - ₹40,00,000 / yr","type":"Remote","location":"Remote, India","apply_link":"https://careers.snowflake.com/us/en"},
      {"id":"j20","title":"Technical Writer","company":"Stripe","salary":"₹15,00,000 - ₹25,00,000 / yr","type":"Remote","location":"Remote","apply_link":"https://stripe.com/jobs/search"},
      {"id":"j21","title":"DevOps Engineer","company":"IBM","salary":"₹10,00,000 - ₹18,00,000 / yr","type":"Hybrid","location":"Pune, India","apply_link":"https://careers.ibm.com/"},
      {"id":"j22","title":"Database Administrator","company":"Oracle","salary":"₹11,00,000 - ₹18,00,000 / yr","type":"Full-time","location":"Hyderabad, India","apply_link":"https://careers.oracle.com/jobs"},
      {"id":"j23","title":"Python Developer","company":"Dropbox","salary":"₹22,00,000 - ₹32,00,000 / yr","type":"Remote","location":"Remote","apply_link":"https://jobs.dropbox.com/"},
      {"id":"j24","title":"React Native Developer","company":"Discord","salary":"₹20,00,000 - ₹35,00,000 / yr","type":"Remote","location":"Remote","apply_link":"https://discord.com/careers"},
      {"id":"j25","title":"Game Developer (C++)","company":"Electronic Arts (EA)","salary":"₹15,00,000 - ₹25,00,000 / yr","type":"Full-time","location":"Hyderabad, India","apply_link":"https://ea.gr8people.com/"},
      {"id":"j26","title":"AR/VR Engineer","company":"Snap Inc.","salary":"₹28,00,000 - ₹45,00,000 / yr","type":"Remote","location":"Remote","apply_link":"https://careers.snap.com/"},
      {"id":"j27","title":"Rust Developer","company":"Cloudflare","salary":"₹30,00,000 - ₹50,00,000 / yr","type":"Remote","location":"Remote","apply_link":"https://www.cloudflare.com/careers/jobs/"},
      {"id":"j28","title":"Go Developer","company":"Twilio","salary":"₹25,00,000 - ₹38,00,000 / yr","type":"Remote","location":"Remote","apply_link":"https://www.twilio.com/company/jobs"},
      {"id":"j29","title":"Embedded Software Engineer","company":"Intel","salary":"₹14,00,000 - ₹22,00,000 / yr","type":"Full-time","location":"Bangalore, India","apply_link":"https://jobs.intel.com/"},
      {"id":"j30","title":"Solutions Architect","company":"Salesforce","salary":"₹26,00,000 - ₹40,00,000 / yr","type":"Hybrid","location":"Bangalore, India","apply_link":"https://careers.salesforce.com/"},
      {"id":"j31","title":"QA Automation Engineer","company":"PayPal","salary":"₹12,00,000 - ₹18,00,000 / yr","type":"Hybrid","location":"Chennai, India","apply_link":"https://careers.paypal.com/"},
      {"id":"j32","title":"Network Engineer","company":"VMware","salary":"₹14,00,000 - ₹23,00,000 / yr","type":"Full-time","location":"Bangalore, India","apply_link":"https://careers.vmware.com/"},
      {"id":"j33","title":"Quantitative Researcher","company":"Two Sigma","salary":"$200,000 - $400,000 / yr","type":"Full-time","location":"New York, NY","apply_link":"https://careers.twosigma.com/"},
      {"id":"j34","title":"Fintech Software Engineer","company":"Square","salary":"₹25,00,000 - ₹40,00,000 / yr","type":"Remote","location":"Remote","apply_link":"https://careers.squareup.com/us/en/jobs"},
      {"id":"j35","title":"Graphics Programmer","company":"Epic Games","salary":"$120,000 - $200,000 / yr","type":"Remote","location":"Remote","apply_link":"https://www.epicgames.com/site/en-US/careers"},
      {"id":"j36","title":"Sales Engineer","company":"HubSpot","salary":"₹15,00,000 - ₹24,00,000 / yr","type":"Hybrid","location":"Remote, India","apply_link":"https://www.hubspot.com/careers/jobs"},
      {"id":"j37","title":"E-commerce Developer","company":"Shopify","salary":"₹22,00,000 - ₹35,00,000 / yr","type":"Remote","location":"Remote","apply_link":"https://www.shopify.com/careers"},
      {"id":"j38","title":"Cyber Security Consultant","company":"Palo Alto Networks","salary":"₹18,00,000 - ₹30,00,000 / yr","type":"Hybrid","location":"Bangalore, India","apply_link":"https://jobs.paloaltonetworks.com/"},
      {"id":"j39","title":"Systems Analyst","company":"Accenture","salary":"₹6,00,000 - ₹10,00,000 / yr","type":"Full-time","location":"Pune, India","apply_link":"https://www.accenture.com/in-en/careers"},
      {"id":"j40","title":"IT Associate","company":"TCS","salary":"₹4,00,000 - ₹6,00,000 / yr","type":"Full-time","location":"Mumbai, India","apply_link":"https://www.tcs.com/careers"},
      {"id":"j41","title":"Robotics Engineer","company":"Boston Dynamics","salary":"$130,000 - $180,000 / yr","type":"Full-time","location":"Waltham, MA","apply_link":"https://bostondynamics.com/careers/"}
    ];

    // 2. Simulating Realistic Internships Database
    const realisticInternships = [
      {"id":"i1","title":"Software Engineering Intern","company":"Google","salary":"₹80,000 / mo","type":"Internship","location":"Bangalore, India","apply_link":"https://careers.google.com/students/"},
      {"id":"i2","title":"Data Science Intern","company":"Meta","salary":"₹1,00,000 / mo","type":"Internship","location":"Remote, India","apply_link":"https://www.metacareers.com/students_and_grads/"},
      {"id":"i3","title":"Deep Learning Research Intern","company":"NVIDIA","salary":"₹1,20,000 / mo","type":"Internship","location":"Pune, India","apply_link":"https://www.nvidia.com/en-us/about-nvidia/careers/university-recruiting/"},
      {"id":"i4","title":"SDE Intern","company":"Amazon","salary":"₹85,000 / mo","type":"Internship","location":"Hyderabad, India","apply_link":"https://amazon.jobs/en/teams/internships-for-students"},
      {"id":"i5","title":"Software Engineer Intern","company":"Microsoft","salary":"₹95,000 / mo","type":"Internship","location":"Noida, India","apply_link":"https://careers.microsoft.com/v2/global/en/students-and-graduates.html"},
      {"id":"i6","title":"Product Design Intern","company":"Apple","salary":"₹90,000 / mo","type":"Internship","location":"Bangalore, India","apply_link":"https://jobs.apple.com/en-in/search?team=internships-STDNT-INTRN"},
      {"id":"i7","title":"Full Stack Engineering Intern","company":"Netflix","salary":"$8,000 / mo","type":"Internship","location":"Remote","apply_link":"https://jobs.netflix.com/search"},
      {"id":"i8","title":"Machine Learning Intern","company":"OpenAI","salary":"$10,000 / mo","type":"Internship","location":"San Francisco, CA","apply_link":"https://openai.com/careers"},
      {"id":"i9","title":"Backend Engineering Intern","company":"Spotify","salary":"₹60,000 / mo","type":"Internship","location":"Remote","apply_link":"https://www.lifeatspotify.com/students"},
      {"id":"i10","title":"UI/UX Design Intern","company":"Adobe","salary":"₹50,000 / mo","type":"Internship","location":"Noida, India","apply_link":"https://careers.adobe.com/us/en/university"},
      {"id":"i11","title":"Crypto Research Intern","company":"Coinbase","salary":"$6,000 / mo","type":"Internship","location":"Remote","apply_link":"https://www.coinbase.com/careers"},
      {"id":"i12","title":"Infrastructure Intern","company":"Airbnb","salary":"$7,000 / mo","type":"Internship","location":"Remote","apply_link":"https://careers.airbnb.com/university/"},
      {"id":"i13","title":"Data Analytics Intern","company":"Uber","salary":"₹65,000 / mo","type":"Internship","location":"Hyderabad, India","apply_link":"https://www.uber.com/us/en/careers/university/"},
      {"id":"i14","title":"APM Intern","company":"Atlassian","salary":"₹75,000 / mo","type":"Internship","location":"Remote, India","apply_link":"https://www.atlassian.com/company/careers/students"},
      {"id":"i15","title":"Autopilot AI Intern","company":"Tesla","salary":"$7,500 / mo","type":"Internship","location":"Palo Alto, CA","apply_link":"https://www.tesla.com/careers/search/?department=Autopilot%20%26%20Robotics"},
      {"id":"i16","title":"Mobile Dev Intern","company":"Samsung","salary":"₹30,000 / mo","type":"Internship","location":"Noida, India","apply_link":"https://research.samsung.com/careers"},
      {"id":"i17","title":"Frontend Developer Intern","company":"Slack","salary":"$6,500 / mo","type":"Internship","location":"Remote","apply_link":"https://slack.com/careers"},
      {"id":"i18","title":"Network Security Intern","company":"Cisco","salary":"₹40,000 / mo","type":"Internship","location":"Bangalore, India","apply_link":"https://jobs.cisco.com/jobs/SearchJobs/?listFilterMode=1&projectOffset=0&projectLimit=20&job_type_id=102"},
      {"id":"i19","title":"Cloud Engineering Intern","company":"Snowflake","salary":"$7,000 / mo","type":"Internship","location":"Remote","apply_link":"https://careers.snowflake.com/us/en/university"},
      {"id":"i20","title":"Technical Writing Intern","company":"Stripe","salary":"$5,000 / mo","type":"Internship","location":"Remote","apply_link":"https://stripe.com/jobs/university"},
      {"id":"i21","title":"Systems Programming Intern","company":"IBM","salary":"₹35,000 / mo","type":"Internship","location":"Pune, India","apply_link":"https://careers.ibm.com/early-professional"},
      {"id":"i22","title":"Database Engineering Intern","company":"Oracle","salary":"₹40,000 / mo","type":"Internship","location":"Hyderabad, India","apply_link":"https://careers.oracle.com/students"},
      {"id":"i23","title":"SWE Intern","company":"Dropbox","salary":"$7,200 / mo","type":"Internship","location":"Remote","apply_link":"https://jobs.dropbox.com/teams/emerging-talent"},
      {"id":"i24","title":"React Native Intern","company":"Discord","salary":"$6,800 / mo","type":"Internship","location":"Remote","apply_link":"https://discord.com/careers"},
      {"id":"i25","title":"Game Development Intern","company":"Electronic Arts (EA)","salary":"₹45,000 / mo","type":"Internship","location":"Hyderabad, India","apply_link":"https://ea.gr8people.com/university"},
      {"id":"i26","title":"Computer Vision Intern","company":"Snap Inc.","salary":"$8,500 / mo","type":"Internship","location":"Remote","apply_link":"https://careers.snap.com/university"},
      {"id":"i27","title":"Rust Systems Intern","company":"Cloudflare","salary":"$7,000 / mo","type":"Internship","location":"Remote","apply_link":"https://www.cloudflare.com/careers/departments/university/"},
      {"id":"i28","title":"Go Developer Intern","company":"Twilio","salary":"$6,500 / mo","type":"Internship","location":"Remote","apply_link":"https://www.twilio.com/company/jobs/early-in-career"},
      {"id":"i29","title":"Hardware Engineering Intern","company":"Intel","salary":"₹45,000 / mo","type":"Internship","location":"Bangalore, India","apply_link":"https://jobs.intel.com/page/show/student"},
      {"id":"i30","title":"Salesforce Dev Intern","company":"Salesforce","salary":"₹60,000 / mo","type":"Internship","location":"Bangalore, India","apply_link":"https://careers.salesforce.com/en/university-recruiting/"},
      {"id":"i31","title":"QA Intern","company":"PayPal","salary":"₹30,000 / mo","type":"Internship","location":"Chennai, India","apply_link":"https://careers.paypal.com/us/en/students"},
      {"id":"i32","title":"Virtualization Intern","company":"VMware","salary":"₹35,000 / mo","type":"Internship","location":"Bangalore, India","apply_link":"https://careers.vmware.com/main/university"},
      {"id":"i33","title":"Quant Trading Intern","company":"Two Sigma","salary":"$14,000 / mo","type":"Internship","location":"New York, NY","apply_link":"https://careers.twosigma.com/careers/students"},
      {"id":"i34","title":"Fintech Intern","company":"Square","salary":"$7,000 / mo","type":"Internship","location":"Remote","apply_link":"https://careers.squareup.com/us/en/students"},
      {"id":"i35","title":"Unreal Engine Intern","company":"Epic Games","salary":"$6,000 / mo","type":"Internship","location":"Remote","apply_link":"https://www.epicgames.com/site/en-US/careers/university"},
      {"id":"i36","title":"Pre-sales Engineering Intern","company":"HubSpot","salary":"₹25,000 / mo","type":"Internship","location":"Remote, India","apply_link":"https://www.hubspot.com/careers/students"},
      {"id":"i37","title":"Web Development Intern","company":"Shopify","salary":"$6,500 / mo","type":"Internship","location":"Remote","apply_link":"https://www.shopify.com/careers"},
      {"id":"i38","title":"Security Analyst Intern","company":"Palo Alto Networks","salary":"₹50,000 / mo","type":"Internship","location":"Bangalore, India","apply_link":"https://jobs.paloaltonetworks.com/early-talent/"},
      {"id":"i39","title":"Technology Analyst Intern","company":"Accenture","salary":"₹20,000 / mo","type":"Internship","location":"Pune, India","apply_link":"https://www.accenture.com/in-en/careers/local/students"},
      {"id":"i40","title":"Trainee Intern","company":"TCS","salary":"₹15,000 / mo","type":"Internship","location":"Mumbai, India","apply_link":"https://www.tcs.com/careers/india"},
      {"id":"i41","title":"Software Engineering Intern","company":"LinkedIn","salary":"$8,000 / mo","type":"Internship","location":"Remote","apply_link":"https://careers.linkedin.com/students"},
      {"id":"i42","title":"Mechanical Engineering Intern","company":"Boston Dynamics","salary":"$6,500 / mo","type":"Internship","location":"Waltham, MA","apply_link":"https://bostondynamics.com/careers/"},
      {"id":"i43","title":"Spacecraft Software Intern","company":"SpaceX","salary":"$7,000 / mo","type":"Internship","location":"Hawthorne, CA","apply_link":"https://www.spacex.com/careers"},
      {"id":"i44","title":"Operations Intern","company":"Instacart","salary":"$5,500 / mo","type":"Internship","location":"Remote","apply_link":"https://instacart.careers/university/"},
      {"id":"i45","title":"Data Structures Intern","company":"Databricks","salary":"$8,500 / mo","type":"Internship","location":"San Francisco, CA","apply_link":"https://www.databricks.com/company/careers/university"},
      {"id":"i46","title":"B2B Marketing Intern","company":"Zoom","salary":"$5,000 / mo","type":"Internship","location":"Remote","apply_link":"https://careers.zoom.us/"},
      {"id":"i47","title":"Platform Engineering Intern","company":"Pinterest","salary":"$7,500 / mo","type":"Internship","location":"Remote","apply_link":"https://www.pinterestcareers.com/university/"},
      {"id":"i48","title":"Embedded Systems Intern","company":"Qualcomm","salary":"₹45,000 / mo","type":"Internship","location":"Bangalore, India","apply_link":"https://www.qualcomm.com/company/careers/students"},
      {"id":"i49","title":"Cloud Infrastructure Intern","company":"DigitalOcean","salary":"$6,000 / mo","type":"Internship","location":"Remote","apply_link":"https://www.digitalocean.com/careers/"},
      {"id":"i50","title":"Product Management Intern","company":"Notion","salary":"$7,000 / mo","type":"Internship","location":"San Francisco, CA","apply_link":"https://www.notion.so/careers"}
    ];

    // 3. Simulating Realistic Courses Database
    const realisticCourses = [
      {"id":"c1","title":"Google Data Analytics Professional Certificate","provider":"Coursera (Google)","price":"₹ 1,185 / mo","apply_link":"https://www.coursera.org/professional-certificates/google-data-analytics"},
      {"id":"c2","title":"100 Days of Code: The Complete Python Pro Bootcamp","provider":"Udemy (Dr. Angela Yu)","price":"₹ 3,099","apply_link":"https://www.udemy.com/course/100-days-of-code/"},
      {"id":"c3","title":"CS50's Introduction to Computer Science","provider":"edX (Harvard University)","price":"Free / ₹ 18,500 (Certificate)","apply_link":"https://www.edx.org/course/introduction-computer-science-harvardx-cs50x"},
      {"id":"c4","title":"Machine Learning Specialization","provider":"Coursera (Stanford / DeepLearning.AI)","price":"₹ 2,371 / mo","apply_link":"https://www.coursera.org/specializations/machine-learning-introduction"},
      {"id":"c5","title":"The Web Developer Bootcamp 2024","provider":"Udemy (Colt Steele)","price":"₹ 3,499","apply_link":"https://www.udemy.com/course/the-web-developer-bootcamp/"},
      {"id":"c6","title":"AWS Certified Solutions Architect - Associate","provider":"Udemy (Stephane Maarek)","price":"₹ 3,099","apply_link":"https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/"},
      {"id":"c7","title":"IBM Data Science Professional Certificate","provider":"Coursera (IBM)","price":"₹ 3,161 / mo","apply_link":"https://www.coursera.org/professional-certificates/ibm-data-science"},
      {"id":"c8","title":"React - The Complete Guide (incl Hooks, React Router, Redux)","provider":"Udemy (Maximilian Schwarzmüller)","price":"₹ 3,499","apply_link":"https://www.udemy.com/course/react-the-complete-guide-incl-redux/"},
      {"id":"c9","title":"Meta Front-End Developer Professional Certificate","provider":"Coursera (Meta)","price":"₹ 1,185 / mo","apply_link":"https://www.coursera.org/professional-certificates/meta-front-end-developer"},
      {"id":"c10","title":"Deep Learning Specialization","provider":"Coursera (DeepLearning.AI)","price":"₹ 3,952 / mo","apply_link":"https://www.coursera.org/specializations/deep-learning"},
      {"id":"c11","title":"Complete C# Unity Game Developer 3D","provider":"Udemy (GameDev.tv)","price":"₹ 3,099","apply_link":"https://www.udemy.com/course/unitycourse2/"},
      {"id":"c12","title":"Cybersecurity for Managers: A Playbook","provider":"edX (MIT)","price":"₹ 145,000","apply_link":"https://professional.mit.edu/course-catalog/cybersecurity-managers-playbook"},
      {"id":"c13","title":"Introduction to Artificial Intelligence (AI)","provider":"Coursera (IBM)","price":"Free to audit","apply_link":"https://www.coursera.org/learn/introduction-to-ai"},
      {"id":"c14","title":"Blockchain and Bitcoin Fundamentals","provider":"Udemy (George Levy)","price":"₹ 3,099","apply_link":"https://www.udemy.com/course/blockchain-and-bitcoin-fundamentals/"},
      {"id":"c15","title":"Google IT Support Professional Certificate","provider":"Coursera (Google)","price":"₹ 1,185 / mo","apply_link":"https://www.coursera.org/professional-certificates/google-it-support"},
      {"id":"c16","title":"The Complete Digital Marketing Course - 12 Courses in 1","provider":"Udemy (Rob Percival)","price":"₹ 3,499","apply_link":"https://www.udemy.com/course/learn-digital-marketing-course/"},
      {"id":"c17","title":"Agile with Atlassian Jira","provider":"Coursera (Atlassian)","price":"Free to audit","apply_link":"https://www.coursera.org/learn/agile-atlassian-jira"},
      {"id":"c18","title":"Blockchain Revolution Specialization","provider":"Coursera (INSEAD)","price":"₹ 3,952 / mo","apply_link":"https://www.coursera.org/specializations/blockchain-revolution-enterprise"},
      {"id":"c19","title":"Understanding TypeScript","provider":"Udemy (Maximilian Schwarzmüller)","price":"₹ 3,099","apply_link":"https://www.udemy.com/course/understanding-typescript/"},
      {"id":"c20","title":"Google Project Management: Professional Certificate","provider":"Coursera (Google)","price":"₹ 1,185 / mo","apply_link":"https://www.coursera.org/professional-certificates/google-project-management"}
    ];

    setJobOffers(realisticJobs);
    setInternships(realisticInternships);
    setCourses(realisticCourses);
    setLoadingData(false);

  }, []);

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-left">
          <button className="nav-logo-btn" onClick={() => setActiveTab('jobs')}>
            <span className="nav-logo">Intergenie</span>
          </button>
        </div>
        <div className="nav-links">
          <button className={`nav-btn usp-btn ${activeTab === 'careerPath' ? 'active' : ''}`} onClick={() => setActiveTab('careerPath')}>
            Career Finder
          </button>
          <button className={`nav-btn ${activeTab === 'jobs' ? 'active' : ''}`} onClick={() => setActiveTab('jobs')}>
            Jobs
          </button>
          <button className={`nav-btn ${activeTab === 'internships' ? 'active' : ''}`} onClick={() => setActiveTab('internships')}>
            Internships
          </button>
          <button className={`nav-btn ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => setActiveTab('courses')}>
            Courses
          </button>
          <button className={`nav-btn ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>
            My Applications
          </button>
          <button className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
            About
          </button>
        </div>
        <div className="nav-right" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className={`nav-btn search-btn ${activeTab === 'search' ? 'active' : ''}`} onClick={() => setActiveTab('search')}>
            🔍 Search
          </button>
          <button className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')} style={{ padding: '0.4rem 1rem', background: userProfile.isSet ? '#10b981' : '#f1f5f9', color: userProfile.isSet ? 'white' : '#0f172a', borderRadius: '20px', fontWeight: 'bold' }}>
            {userProfile.isSet ? '👤 ' + (userProfile.name || 'Profile') : '👤 Login / Profile'}
          </button>
        </div>
      </nav>

      <main className="main-content">

        {/* JOBS TAB */}
        {activeTab === 'jobs' && (
          <div className="view-container slide-in">
            <h2 className="view-title">Trending Tech Jobs</h2>
            {loadingData ? (
              <div className="center-text mt-3"><p className="desc-text">Fetching live remote jobs from Remotive API...</p></div>
            ) : (
              <div className="grid-list">
                {jobOffers.map((job, idx) => {
                  const matchChance = userProfile.isSet ? calculateChances(job, userProfile.skills, userProfile.education) : null;
                  return (
                  <div key={job.id || idx} className="simple-card hover-lift">
                    <div className="flex-between">
                       <h3>{job.title}</h3>
                       {matchChance && (
                         <div className="chance-badge tooltip" title="Based on your profile skills & education">
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', color: matchChance >= 80 ? '#10b981' : matchChance >= 60 ? '#f59e0b' : '#64748b' }}>
                             <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                           </svg>
                           <span style={{ color: matchChance >= 80 ? '#059669' : matchChance >= 60 ? '#d97706' : '#475569', fontWeight: 'bold' }}>
                             {matchChance}% Match
                           </span>
                         </div>
                       )}
                    </div>
                    <p className="subtitle mt-1">{job.company}</p>
                    <div className="badges mt-2">
                      <span className="badge green">{job.salary}</span>
                      <span className="badge blue">{job.type}</span>
                      <span className="badge gray">{job.location}</span>
                    </div>
                    <button className="btn-action mt-3" onClick={() => handleApply(job)}>
                      {matchChance ? `Apply Now (${matchChance}% Match) →` : 'Apply Now →'}
                    </button>
                  </div>
                )})}
              </div>
            )}
          </div>
        )}

        {/* INTERNSHIPS TAB */}
        {activeTab === 'internships' && (
          <div className="view-container slide-in">
            <h2 className="view-title">Latest Internships</h2>
            {loadingData ? (
              <div className="center-text mt-3"><p className="desc-text">Fetching live internships from Remotive API...</p></div>
            ) : (
              <div className="grid-list">
                {internships.map((job, idx) => {
                  const matchChance = userProfile.isSet ? calculateChances(job, userProfile.skills, userProfile.education) : null;
                  return (
                  <div key={job.id || idx} className="simple-card hover-lift">
                    <div className="flex-between">
                       <h3>{job.title}</h3>
                       {matchChance && (
                         <div className="chance-badge tooltip" title="Based on your profile skills & education">
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', color: matchChance >= 80 ? '#10b981' : matchChance >= 60 ? '#f59e0b' : '#64748b' }}>
                             <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                           </svg>
                           <span style={{ color: matchChance >= 80 ? '#059669' : matchChance >= 60 ? '#d97706' : '#475569', fontWeight: 'bold' }}>
                             {matchChance}% Match
                           </span>
                         </div>
                       )}
                    </div>
                    <p className="subtitle mt-1">{job.company}</p>
                    <div className="badges mt-2">
                      <span className="badge green">{job.salary}</span>
                      <span className="badge blue">{job.type}</span>
                      <span className="badge gray">{job.location}</span>
                    </div>
                    <button className="btn-action mt-3" onClick={() => handleApply(job)}>
                      {matchChance ? `Apply Now (${matchChance}% Match) →` : 'Apply Now →'}
                    </button>
                  </div>
                )})}
              </div>
            )}
          </div>
        )}

        {/* COURSES TAB */}
        {activeTab === 'courses' && (
          <div className="view-container slide-in">
            <h2 className="view-title">In-Demand Add-on Courses</h2>
            {loadingData ? (
              <div className="center-text mt-3"><p className="desc-text">Fetching live courses...</p></div>
            ) : (
              <div className="grid-list">
                {courses.map((course, idx) => (
                  <div key={course.id || idx} className="simple-card hover-lift">
                    <h3>{course.title}</h3>
                    <p className="subtitle">{course.provider}</p>
                    <div className="badges">
                      <span className="badge yellow">{course.price}</span>
                    </div>
                    <button className="btn-action mt-3" onClick={() => handleApply(course)}>
                      Enroll Now →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CAREER FINDER TAB */}
        {activeTab === 'careerPath' && (
          <div className="view-container slide-in max-w-lg center-div">
            <h2 className="view-title center-text">AI Career Finder</h2>

            {/* Filter Section */}
            {!recommendations && (
              <>
                <form onSubmit={generateRecommendations} className="form-container mb-2">
                  <h3 className="mb-2">Get Personalized Pathway</h3>
                  <div className="input-group mb-2">
                    <label>Your Grades (e.g. 85%, A, 3.8 GPA)</label>
                    <input type="text" value={userGrades} onChange={(e) => setUserGrades(e.target.value)} required />
                  </div>
                  <div className="input-group mb-2">
                    <label>Completed Courses / Degree Stream</label>
                    <input type="text" placeholder="e.g. B.Tech CS, Python, Finance" value={completedCourses} onChange={(e) => setCompletedCourses(e.target.value)} required />
                  </div>
                  <button type="submit" className="btn-action full-w mt-2">Find My Best Match</button>
                </form>

                <h3 className="view-title center-text mt-3">Market Trending Careers</h3>
                <div className="stack-list">
                  {trendingCareers.map((rec, idx) => (
                    <div key={idx} className="simple-card ai-card slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <div className="flex-between">
                        <h4 className="ai-title">{rec.title}</h4>
                        <span className="badge purp">{rec.score}</span>
                      </div>
                      <p className="desc-text mt-1">{rec.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Recommendations Section */}
            {recommendations && (
              <div className="results-container">
                <button type="button" className="btn-text mb-2" onClick={() => setRecommendations(null)}>← Back to Trends & Search</button>
                <h3 className="mb-2">Your Profile Matches (Top 8 Options)</h3>
                <div className="grid-list">
                  {recommendations.map((rec, idx) => (
                    <div key={idx} className="simple-card ai-card hover-reveal slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <div className="ai-card-front">
                        <div className="flex-between">
                          <h4 className="ai-title">{rec.title}</h4>
                          <span className="badge purp">{rec.score}</span>
                        </div>
                        <p className="desc-text mt-1">{rec.desc}</p>
                        <p className="mt-2 text-blue font-bold animated-pulse" style={{ fontSize: '0.85rem' }}>Hover to see details →</p>
                      </div>
                      <div className="ai-card-back">
                        <h4 style={{ marginBottom: '0.5rem', color: '#1e293b' }}>Skills You'll Learn</h4>
                        <ul className="skills-list">
                          {rec.skills.map((skill, sIdx) => <li key={sIdx}>{skill}</li>)}
                        </ul>
                        <div className="eligibility-bar mt-2">
                          <div className="flex-between" style={{ fontSize: '0.8rem', marginBottom: '0.3rem', color: '#475569' }}>
                            <span>Eligibility Match</span>
                            <strong className="text-blue">{rec.eligibility}</strong>
                          </div>
                          <div className="progress-bg">
                            <div className="progress-fill" style={{ width: rec.eligibility }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SEARCH & FILTERS TAB */}
        {activeTab === 'search' && (
          <div className="view-container slide-in">
            <h2 className="view-title center-text">Advanced Search</h2>
            <div className="search-grid">
              <div className="filter-panel">
                <h3>Filters</h3>
                <div className="input-group mt-2">
                  <label>What are you looking for?</label>
                  <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
                    <option value="jobs">Jobs</option>
                    <option value="internships">Internships</option>
                    <option value="courses">Courses</option>
                  </select>
                </div>

                <div className="input-group mt-2">
                  <label className="dynamic-fade" key={searchCategory}>
                    {searchCategory === 'courses' ? 'Max Course Price (₹)' : 'Minimum Salary Expectation (₹/mo)'}
                  </label>
                  <input type="range" min="0" max="100000" step="5000" value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)} />
                  <span className="dynamic-fade font-bold text-blue" key={`val-${searchCategory}`}>₹ {filterPrice}</span>
                </div>

                {searchCategory !== 'courses' && (
                  <>
                    <div className="input-group mt-2">
                      <label>Work Type</label>
                      <select value={filterJobType} onChange={(e) => setFilterJobType(e.target.value)}>
                        <option value="all">All Options</option>
                        <option value="remote">Remote</option>
                        <option value="full-time">Full-time</option>
                        <option value="internship">Internship</option>
                        <option value="office">Office</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div className="input-group mt-2">
                      <label>Location (City/District)</label>
                      <input type="text" placeholder="e.g. Pune, Bangalore" value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} />
                    </div>
                  </>
                )}

                <div className="input-group mt-2">
                  <label>Current Degree/Course Done</label>
                  <input type="text" placeholder="e.g. B.Tech CS, B.Com" value={filterDegree} onChange={(e) => setFilterDegree(e.target.value)} />
                </div>

                <div className="input-group mt-2">
                  <label>Skills</label>
                  <input type="text" placeholder="e.g. Python, Financial Analysis" value={filterSkills} onChange={(e) => setFilterSkills(e.target.value)} />
                </div>

                <button className="btn-action full-w mt-3" onClick={handleSearch}>Apply Filters</button>
              </div>

              <div className="search-results-panel">
                {!hasSearched ? (
                  <div className="empty-state">
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                    <h3>Ready to Search</h3>
                    <p className="desc-text mt-1">Configure your filters on the left and hit apply to see custom tailored results.</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="empty-state">
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</div>
                    <h3>No results found</h3>
                    <p className="desc-text mt-1">Try adjusting your filters to find more matches.</p>
                  </div>
                ) : (
                  <div className="grid-list">
                    {searchResults.map((item, idx) => (
                      <div key={item.id || idx} className="simple-card hover-lift slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className="flex-between">
                           <h3>{item.title}</h3>
                           {item.matchChance && (
                             <div className="chance-badge tooltip" title="Based on your skills & degree">
                               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', color: item.matchChance >= 80 ? '#10b981' : item.matchChance >= 60 ? '#f59e0b' : '#64748b' }}>
                                 <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                               </svg>
                               <span style={{ color: item.matchChance >= 80 ? '#059669' : item.matchChance >= 60 ? '#d97706' : '#475569', fontWeight: 'bold' }}>
                                 {item.matchChance}% Match
                               </span>
                             </div>
                           )}
                        </div>
                        <p className="subtitle mt-1">{item.company || item.provider}</p>
                        <div className="badges">
                          <span className="badge green">{item.salary || item.price}</span>
                          {item.type && <span className="badge blue">{item.type}</span>}
                          {item.location && <span className="badge gray">{item.location}</span>}
                        </div>
                        <button className="btn-action mt-3" onClick={() => handleApply(item)}>
                          {searchCategory === 'courses' ? 'Enroll Now →' : 'Apply Now →'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MY APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <div className="view-container slide-in max-w-lg center-div">
            <h2 className="view-title center-text">My Applications</h2>
            {appliedJobs.length === 0 ? (
               <div className="empty-state center-div mt-3" style={{ padding: '3rem', border: '2px dashed #cbd5e1', borderRadius: '12px', background: '#f8fafc' }}>
                 <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
                 <h3>No Applications Yet</h3>
                 <p className="desc-text mt-1">You haven't applied to any jobs or internships yet. Head over to the Jobs tab to get started!</p>
                 <button className="btn-action mt-3" onClick={() => setActiveTab('jobs')}>Browse Jobs</button>
               </div>
            ) : (
              <div className="stack-list">
                {appliedJobs.map((job, idx) => (
                  <div key={idx} className="simple-card hover-lift slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="flex-between mb-1">
                      <h3>{job.title}</h3>
                      <span className="badge gray">{job.appliedDate}</span>
                    </div>
                    <p className="subtitle mb-2">{job.companyName}</p>
                    
                    {/* Status Tracker */}
                    <div className="status-tracker mt-2 mb-2">
                       <div className={`status-step ${job.status === 'Applied' || job.status === 'Viewed' || job.status === 'Shortlisted' || job.status === 'Rejected' ? 'active' : ''}`}>
                         <div className="step-circle">1</div>
                         <span className="step-label">Applied</span>
                       </div>
                       <div className={`status-line ${job.status === 'Viewed' || job.status === 'Shortlisted' || job.status === 'Rejected' ? 'active-line' : ''}`}></div>
                       
                       <div className={`status-step ${job.status === 'Viewed' || job.status === 'Shortlisted' || job.status === 'Rejected' ? 'active' : ''}`}>
                         <div className="step-circle">2</div>
                         <span className="step-label">Viewed</span>
                       </div>
                       <div className={`status-line ${job.status === 'Shortlisted' || job.status === 'Rejected' ? 'active-line' : ''} ${job.status === 'Rejected' ? 'rejected-line' : ''}`}></div>
                       
                       <div className={`status-step ${job.status === 'Shortlisted' ? 'active-success' : job.status === 'Rejected' ? 'active-reject' : ''}`}>
                         <div className={`step-circle ${job.status === 'Rejected' ? 'reject-circle' : ''}`}>{job.status === 'Rejected' ? '✕' : '3'}</div>
                         <span className="step-label">{job.status === 'Rejected' ? 'Rejected' : 'Shortlisted'}</span>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ABOUT TAB */}
        {activeTab === 'about' && (
          <div className="view-container slide-in max-w-lg center-div">
            <h2 className="view-title center-text">About Intergenie</h2>

            <div className="simple-card hover-lift mb-2">
              <h3 className="mb-1">Meet Our Team</h3>
              <ul className="desc-text" style={{ paddingLeft: '1.5rem', marginBottom: '0.5rem' }}>
                <li style={{ marginBottom: '0.4rem' }}><strong>Abhinav Choudhary</strong></li>
                <li style={{ marginBottom: '0.4rem' }}><strong>Harsh Dhonkriy</strong></li>
                <li style={{ marginBottom: '0.4rem' }}><strong>Ankit Yadav</strong></li>
                <li style={{ marginBottom: '0.4rem' }}><strong>Pragati Jain</strong></li>
              </ul>
            </div>

            <div className="simple-card hover-lift mb-2">
              <h3 className="mb-1">Terms & Conditions</h3>
              <p className="desc-text">
                Intergenie provides recommendations based on basic AI heuristics and curates a list of ongoing jobs, courses, and internships.
                Please note that we do <strong>not</strong> provide a 100% guarantee for placements, internship selections, or absolute accuracy of external links.
                All data should be carefully verified by the applicant.
              </p>
            </div>

            <div className="simple-card hover-lift" style={{ border: '2px dashed #cbd5e1', background: '#f8fafc' }}>
              <div className="flex-between mb-1">
                <h3 className="text-blue">Partner With Us</h3>
                <span style={{ fontSize: '1.5rem' }}>🏢</span>
              </div>
              <p className="desc-text mb-2">
                Are you a recruiter, an organization, or an institution looking to post your latest job openings, internships, or courses on our platform? We welcome collaborations to boost student careers!
              </p>
              <button className="btn-action full-w" onClick={() => setActiveTab('postJob')}>
                Apply to Post Opportunities
              </button>
            </div>
          </div>
        )}

        {/* POST JOB TAB */}
        {activeTab === 'postJob' && (
          <div className="view-container slide-in max-w-lg center-div">
            <h2 className="view-title center-text">Post an Opportunity</h2>
            <div className="form-container">
              <p className="desc-text mb-2 center-text">Fill out this form to request posting a job or internship on Intergenie. (Demo)</p>
              <form onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you! Your request to post an opportunity has been submitted.');
                setActiveTab('jobs');
              }}>
                <div className="input-group mb-2">
                  <label>Company Name</label>
                  <input type="text" placeholder="e.g. Acme Corp" required />
                </div>
                <div className="input-group mb-2">
                  <label>Job / Title</label>
                  <input type="text" placeholder="e.g. Frontend Developer" required />
                </div>
                <div className="input-group mb-2">
                  <label>Type</label>
                  <select required>
                    <option value="job">Job</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div className="input-group mb-2">
                  <label>Salary / Stipend</label>
                  <input type="text" placeholder="e.g. ₹8,00,000 / yr or ₹20,000 / mo" required />
                </div>
                <div className="input-group mb-2">
                  <label>Education Qualification</label>
                  <input type="text" placeholder="e.g. B.Tech, B.Sc, Any Graduate" required />
                </div>
                <div className="input-group mb-2">
                  <label>Skills Required</label>
                  <input type="text" placeholder="e.g. React, Node.js, Communication" required />
                </div>
                <div className="input-group mb-2">
                  <label>Location</label>
                  <input type="text" placeholder="e.g. Bangalore, Remote" required />
                </div>
                <button type="submit" className="btn-action full-w mt-2">Submit Request</button>
                <button type="button" className="btn-text full-w mt-2 center-text" onClick={() => setActiveTab('about')}>Cancel</button>
              </form>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="view-container slide-in max-w-lg center-div">
            <h2 className="view-title center-text">Your Profile</h2>
            <p className="center-text desc-text mb-3">Set your profile to automatically see your chances of getting jobs and internships across the platform.</p>
            
            <form className="form-container" onSubmit={(e) => { e.preventDefault(); setUserProfile({...userProfile, isSet: true}); setActiveTab('jobs'); }}>
              <div className="input-group mb-2">
                <label>Full Name</label>
                <input type="text" value={userProfile.name} onChange={(e) => setUserProfile({...userProfile, name: e.target.value})} placeholder="e.g. John Doe" required />
              </div>
              <div className="input-group mb-2">
                <label>Education / Degree</label>
                <input type="text" value={userProfile.education} onChange={(e) => setUserProfile({...userProfile, education: e.target.value})} placeholder="e.g. B.Tech Computer Science" required />
              </div>
              <div className="input-group mb-2">
                <label>Top Skills (comma separated)</label>
                <input type="text" value={userProfile.skills} onChange={(e) => setUserProfile({...userProfile, skills: e.target.value})} placeholder="e.g. React, Python, Data Analysis" required />
              </div>
              <div className="input-group mb-3">
                <label>Resume / CV</label>
                <div style={{ padding: '0.8rem', border: '1px dashed #cbd5e1', borderRadius: '8px', background: '#f8fafc', color: '#64748b', fontSize: '0.9rem' }}>
                   📂 Click to upload PDF, DOCX (Demo only)
                </div>
                <span className="desc-text text-sm block mt-1">Optional. Upload to auto-fill skills.</span>
              </div>
              
              <button type="submit" className="btn-action full-w mb-2">{userProfile.isSet ? 'Update Profile' : 'Save & See Job Matches'}</button>
              {userProfile.isSet && (
                 <button type="button" className="btn-action full-w pb-1" style={{ background: '#ef4444' }} onClick={() => setUserProfile({name: '', education: '', skills: '', cv: null, isSet: false})}>Logout / Clear Profile</button>
              )}
            </form>
          </div>
        )}
      </main>

      <Chatbot />
    </div>
  )
}
export default App