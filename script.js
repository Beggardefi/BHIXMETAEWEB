let provider, signer, utilityContract;

const utilityAbi = [
  // Add only used functions here, like:
  "function buyWithBNB(address ref) payable",
  "function buyWithUSDT(uint256 amount, address ref) external",
  "function getReferralRewards(address user) view returns (uint256)",
  "function redeemRewards() external"
];

const utilityAddress = "0x7380Be8D02b767D6E1071FD562222A15F512D5a6";

async function setupEthers() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    utilityContract = new ethers.Contract(utilityAddress, utilityAbi, signer);
  }
}
// -------- Responsive Navbar Toggle --------
document.getElementById("hamburger").addEventListener("click", () => {
  const navMenu = document.getElementById("navMenu");
  navMenu.classList.toggle("active");
});

// -------- Countdown Timer --------
const countdown = document.getElementById('countdown');
const endDate = new Date("2025-06-30T23:59:59Z").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = endDate - now;

  if (distance < 0) {
    countdown.innerHTML = "Presale Ended";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();


// -------- Wallet Connection --------
let userAddress = null;

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAddress = accounts[0];
      document.getElementById("connectBtn").textContent = "Connected";
      generateReferralLink();
      await setupEthers();
    } catch (error) {
      alert("Wallet connection failed");
    }
  } else {
    alert("MetaMask not found!");
  }
}

document.getElementById("connectBtn").addEventListener("click", connectWallet);


// -------- Referral Link --------
function generateReferralLink() {
  if (userAddress) {
    const link = `${window.location.origin}?ref=${userAddress}`;
    document.getElementById("referralLink").value = link;
  }
}

function copyReferral() {
  const input = document.getElementById("referralLink");
  input.select();
  document.execCommand("copy");
  alert("Referral link copied!");
}


// -------- Buy Token Functions (Stubbed) --------
document.getElementById("buyBNB").addEventListener("click", () => {
  const amount = document.getElementById("bnbAmount").value;
  if (!userAddress || !amount) return alert("Connect wallet and enter amount");
  alert(`Buying BHIXU with ${amount} BNB...`);
  // Web3 smart contract call would go here
});

document.getElementById("buyUSDT").addEventListener("click", () => {
  const amount = document.getElementById("usdtAmount").value;
  if (!userAddress || !amount) return alert("Connect wallet and enter amount");
  alert(`Buying BHIXU with ${amount} USDT...`);
  // Web3 smart contract call would go here
});


// -------- Reward System --------
document.getElementById("checkRewards").addEventListener("click", () => {
  if (!userAddress) return alert("Connect wallet first");
  // Fetch referral rewards from smart contract
  document.getElementById("rewardResult").innerHTML = "You have 150 BHIXU in rewards.";
});

document.getElementById("redeemRewards").addEventListener("click", () => {
  if (!userAddress) return alert("Connect wallet first");
  alert("Rewards redeemed!");
  // Smart contract interaction to redeem
});


// -------- Bot Key Generation --------
document.getElementById("generateBotKey").addEventListener("click", () => {
  if (!userAddress) return alert("Connect wallet first");
  const key = btoa(userAddress + ":" + Date.now());
  document.getElementById("botKeyDisplay").innerText = "Your Bot Key: " + key;
});


// -------- Whitepaper Slider --------
const whitepaperSlides = [
  "BHIKX is a superhero-themed blockchain metaverse.",
  "Earn by staking, referrals, and completing missions.",
  "Use BHIXU tokens in-game and in the real world.",
  "Join the DAO and shape the beggar-free future!"
];

let currentSlide = 0;
const whitepaperSlide = document.getElementById("whitepaperSlide");

function showSlide(index) {
  whitepaperSlide.innerText = whitepaperSlides[index];
}

document.getElementById("prevSlide").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + whitepaperSlides.length) % whitepaperSlides.length;
  showSlide(currentSlide);
});

document.getElementById("nextSlide").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % whitepaperSlides.length;
  showSlide(currentSlide);
});

showSlide(currentSlide);
