const jobCategories = [
  { title: "Delivery Boy", requiredStake: 10 },
  { title: "Store Keeper", requiredStake: 25 },
  { title: "Store Manager", requiredStake: 100 },
  { title: "Sales Executive", requiredStake: 50 },
  { title: "Software Developer", requiredStake: 200 },
  { title: "Blockchain Engineer", requiredStake: 500 },
  { title: "Doctor", requiredStake: 300 },
  { title: "Tailor", requiredStake: 30 },
  { title: "Electrician", requiredStake: 40 },
  { title: "UrbanClap Services", requiredStake: 50 },
];

async function loadJobs() {
  const container = document.getElementById('jobCategories');
  const totalJobs = document.getElementById('totalJobs');
  totalJobs.textContent = `Currently ${jobCategories.length} job roles available`;

  jobCategories.forEach(job => {
    const jobCard = document.createElement('div');
    jobCard.className = "job-card";
    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <p>Stake Required: ${job.requiredStake} BHIX</p>
      <button onclick="applyForJob('${job.title}', ${job.requiredStake})">Apply</button>
    `;
    container.appendChild(jobCard);
  });
}

async function applyForJob(title, requiredStake) {
  if (!userWalletAddress) {
    alert("Connect your wallet first");
    return;
  }

  const staked = await getUserStakedAmount(); // your staking contract function
  if (staked < requiredStake) {
    alert(`You need to stake at least ${requiredStake} BHIX to apply for ${title}`);
    return;
  }

  document.getElementById('jobApplicationForm').style.display = 'block';
  document.getElementById('jobCategory').value = title;
}

// Handle form submission
document.getElementById("applyForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const job = document.getElementById("jobCategory").value;
  const skills = document.getElementById("skills").value;
  const location = document.getElementById("location").value;

  // Save to database or smart contract (simplified here)
  console.log("Application Submitted", { job, skills, location, wallet: userWalletAddress });
  alert("Application submitted. Our team will contact you.");
});
