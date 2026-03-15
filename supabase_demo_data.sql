CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    salary TEXT NOT NULL,
    type TEXT NOT NULL,
    location TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.internships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    salary TEXT NOT NULL,
    type TEXT NOT NULL,
    location TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    provider TEXT NOT NULL,
    price TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert Demo Data for Jobs
INSERT INTO public.jobs (title, company, salary, type, location) VALUES
('Frontend Developer Intern', 'TechNova', '₹15,000/mo', 'Remote', 'Bangalore'),
('Data Science Associate', 'DataSphere', '₹45,000/mo', 'Office', 'Bangalore'),
('React JS Developer', 'WebCraft', '₹35,000/mo', 'Remote', 'Mumbai'),
('Machine Learning Engineer', 'AI Labs', '₹80,000/mo', 'Hybrid', 'Hyderabad'),
('Backend Node.js Developer', 'CloudWorks', '₹60,000/mo', 'Office', 'Pune'),
('Full Stack Web Developer', 'InnoTech Solutions', '₹55,000/mo', 'Hybrid', 'Delhi'),
('DevOps Engineer', 'SysOps Inc.', '₹75,000/mo', 'Remote', 'Chennai'),
('UI/UX Designer', 'Creative Mints', '₹40,000/mo', 'Office', 'Bangalore'),
('Cybersecurity Analyst', 'SecureNet', '₹65,000/mo', 'Hybrid', 'Noida'),
('Android Developer', 'MobileAppz', '₹45,000/mo', 'Remote', 'Gurgaon'),
('iOS Developer', 'AppifyTech', '₹50,000/mo', 'Office', 'Hyderabad'),
('Cloud Architect', 'Skyline Cloud', '₹95,000/mo', 'Remote', 'Bangalore'),
('System Administrator', 'TechFix', '₹35,000/mo', 'Office', 'Mumbai'),
('Database Administrator', 'DataVault', '₹55,000/mo', 'Hybrid', 'Pune'),
('Blockchain Developer', 'CryptoCore', '₹85,000/mo', 'Remote', 'Remote');

-- Insert Demo Data for Internships
INSERT INTO public.internships (title, company, salary, type, location) VALUES
('Software Engineering Intern', 'BuildOps', '₹20,000/mo', 'Hybrid', 'Pune'),
('Data Analyst Intern', 'FinTechPro', '₹18,000/mo', 'Remote', 'Delhi'),
('Cybersecurity Intern', 'SecurWeb', '₹12,000/mo', 'Office', 'Noida'),
('Marketing Intern', 'BrandBoost', '₹10,000/mo', 'Remote', 'Mumbai'),
('HR Intern', 'PeopleFirst', '₹8,000/mo', 'Office', 'Bangalore'),
('Graphic Design Intern', 'Pixelete', '₹12,000/mo', 'Hybrid', 'Chennai'),
('Product Management Intern', 'ProdMasters', '₹15,000/mo', 'Remote', 'Hyderabad'),
('Business Development Intern', 'GrowFast', '₹14,000/mo', 'Office', 'Gurgaon'),
('Content Writing Intern', 'WordSmiths', '₹10,000/mo', 'Remote', 'Remote'),
('AI Research Intern', 'DeepMind Labs', '₹25,000/mo', 'Hybrid', 'Bangalore'),
('Social Media Intern', 'ViralTrends', '₹8,000/mo', 'Office', 'Pune'),
('Web Development Intern', 'CodeCamp', '₹15,000/mo', 'Remote', 'Noida');

-- Insert Demo Data for Courses
INSERT INTO public.courses (title, provider, price) VALUES
('Full Stack Web Development', 'CareerPath Academy', '₹4,999'),
('Advanced React & Redux', 'Tech Educators', '₹2,499'),
('Python for Data Science', 'Data Institute', '₹3,499'),
('AWS Cloud Practitioner Prep', 'CloudGuru India', '₹1,999'),
('UI/UX Design Masterclass', 'Design School', '₹2,999'),
('Machine Learning A-Z', 'AI Academy', '₹5,999'),
('Cybersecurity for Beginners', 'SecureLearn', '₹1,499'),
('Digital Marketing 101', 'MarketPro', '₹2,000'),
('Complete Node.js Developer', 'NodeMasters', '₹3,999'),
('Java Programming Masterclass', 'Java Experts', '₹4,500'),
('iOS Development with Swift', 'AppleDevs', '₹5,500'),
('Blockchain Fundamentals', 'CryptoUniversity', '₹3,000'),
('DevOps Automation BootCamp', 'OpsLearn', '₹4,999'),
('Data Engineering Fundamentals', 'BigData Institute', '₹5,999'),
('Business Analytics Masters', 'BizAnalyst Pro', '₹6,499');