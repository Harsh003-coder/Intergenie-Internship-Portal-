const fs = require('fs');

const data = JSON.parse(fs.readFileSync('public/database.json', 'utf8'));

let content = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Uncomment link redirects
content = content.replace(
  "//     // Open in new tab (directly to official target applying link if available)\n//     if (job.apply_link) {\n//       window.open(job.apply_link, '_blank');\n//     }",
  "    // Open in new tab (directly to official target applying link if available)\n    if (job.apply_link) {\n      window.open(job.apply_link, '_blank');\n    }"
);

// 2. Format database objects into Javascript code strings
const formatArrayString = (arr) => {
  return "[\n" + arr.map(item => `      ${JSON.stringify(item)}`).join(",\n") + "\n    ];";
};

const jobsCode = `    // 1. Simulating Realistic Jobs Database\n    const realisticJobs = ${formatArrayString(data.jobs)}\n\n`;
const internshipsCode = `    // 2. Simulating Realistic Internships Database\n    const realisticInternships = ${formatArrayString(data.internships)}\n\n`;

const replacement = jobsCode + internshipsCode + `    setJobOffers(realisticJobs);\n    setInternships(realisticInternships);\n    setLoadingData(false);`;

const fetchBlock = `    // Fetch from our local dataset instead of hardcoding or external APIs
    fetch('/database.json')
      .then(res => res.json())
      .then(data => {
        if (data.jobs) setJobOffers(data.jobs);
        if (data.internships) setInternships(data.internships);
        setLoadingData(false);
      })
      .catch(err => {
        console.error('Failed to load local dataset', err);
        setLoadingData(false);
      });`;

content = content.replace(fetchBlock, replacement);

fs.writeFileSync('src/App.jsx', content);
fs.unlinkSync('public/database.json');
console.log('Successfully reverted changes!');
