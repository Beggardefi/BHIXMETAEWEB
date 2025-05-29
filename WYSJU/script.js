const tiers = [
  {
    level: "Level 1 – $1 Stake-BECOME A MEMBER",
    benefits: [
      "Basic community + metaverse membership",
      "Access to real & virtual job portals",
      "Apply for loans after 1-year staking",
      "DAO voting rights",
      "Metaverse school open classes",
      "Eligible for DAO emergency assistance",
      "+0.25% token value growth daily",
      "Can unstake and exit anytime"
    ]
  },
  {
    level: "Level 2 – $10 Stake-BECOME AN ENTERPRENEUR",
    benefits: [
      "All Level 1 benefits",
      "Eligible for startup loan (9× stake)/",
      "Can join BHIX store franchise Module & get 10% profit share."
    ]
  },
  {
    level: "Level 3 – $100 Stake- SETUP YOUR BRAND",
    benefits: [
      "All Level 2 benefits",
      "Free subdomain or BHIKX-hosted domain (own domain = user pays)",
      "2–3 page website & brand setup",
      "Social media presence & logo by BHIX team",
      "NFT listed on OpenSea at $100+ as per demand by user",
      "Selling NFT = exit special role in metaverse"
    ]
  },
  {
    level: "Level 4 – $1,000 Stake",
    benefits: [
      "All Level 3 benefits",
      "Complete working website",
      "3-month digital marketing (no ad cost)",
      "Premium RARE NFT as per category",
      "Choose: 0.25% daily income OR franchise partnership OR startup loan"
    ]
  },
  {
    level: "Level 5 – $10,000 Stake-KNOW YOUR SUPERWOERS",
    benefits: [
      "All Level 4 benefits",
      "Real Superhero NFT with powers",
      "Protector role in metaverse",
      "Access to private missions & high-tier DAO influence"
    ]
  },
  {
    level: "Level 6 – $100,000 Stake-BECOME A SUPERPOWER",
    benefits: [
      "All Level 5 benefits",
      "RARE & Legendary Hero NFT (1 OUT OF 100)",
      "Virtual land ownership rights",
      "Permanent DAO Senate seat",
      "15–20% profit share from flagship stores",
      "Run a BHIX accelerator program"
    ]
  },
  {
    level: "Level 7 – $1,000,000 Stake-BECOME A MYTHICAL GAURDIAN OF METAVERSE",
    benefits: [
      "All Level 6 benefits",
      "Mythical Guardian NFT (1 of 10)",
      "Own a virtual district",
      "25–30% share in master BHIX project",
      "Global Ambassador status",
      "Lifetime staking rewards (5–10% APY)",
    ]
  }
];

const container = document.getElementById("tiers");

tiers.forEach(tier => {
  const card = document.createElement("div");
  card.className = "bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform";

  const title = document.createElement("h2");
  title.className = "text-xl font-semibold text-yellow-300 mb-3";
  title.textContent = tier.level;

  const ul = document.createElement("ul");
  ul.className = "space-y-1 text-sm list-disc list-inside";
  tier.benefits.forEach(benefit => {
    const li = document.createElement("li");
    li.textContent = benefit;
    ul.appendChild(li);
  });

  card.appendChild(title);
  card.appendChild(ul);
  container.appendChild(card);
});
