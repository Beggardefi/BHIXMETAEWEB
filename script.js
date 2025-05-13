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

// Get referral address from URL
function getReferralAddress() {
  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get("ref");
  return ref && ethers.utils.isAddress(ref) ? ref : userAddress;
}

document.getElementById("buyBNB").addEventListener("click", async () => {
  const amount = document.getElementById("bnbAmount").value;
  if (!userAddress || !amount) return alert("Connect wallet and enter amount");

  try {
    const refAddress = getReferralAddress();
    const tx = await utilityContract.buyWithBNB(refAddress, {
      value: ethers.utils.parseEther(amount)
    });
    await tx.wait();
    alert("BHIXU purchased with BNB!");
  } catch (err) {
    console.error(err);
    alert("Transaction failed");
  }
});
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
//--------- usdt setup-------//
const usdtAddress = "0x55d398326f99059fF775485246999027B3197955"; // if on BSC
const erc20Abi = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function decimals() view returns (uint8)"
];
let usdtContract;

async function setupUSDT() {
  const decimals = await new ethers.Contract(usdtAddress, erc20Abi, provider).decimals();
  usdtContract = new ethers.Contract(usdtAddress, erc20Abi, signer);
  return decimals;
}



// -------- Buy Token Functions (Stubbed) --------
document.getElementById("buyUSDT").addEventListener("click", async () => {
  const amount = document.getElementById("usdtAmount").value;
  if (!userAddress || !amount) return alert("Connect wallet and enter amount");

  try {
    const refAddress = getReferralAddress();
    const decimals = await setupUSDT();
    const amountInWei = ethers.utils.parseUnits(amount, decimals);

    const approval = await usdtContract.approve(utilityAddress, amountInWei);
    await approval.wait();

    const tx = await utilityContract.buyWithUSDT(amountInWei, refAddress);
    await tx.wait();

    alert("BHIXU purchased with USDT!");
  } catch (err) {
    console.error(err);
    alert("Transaction failed");
  }
});


// -------- Reward System --------
document.getElementById("checkRewards").addEventListener("click", async () => {
  if (!userAddress) return alert("Connect wallet first");

  try {
    const rewards = await utilityContract.referralRewards(userAddress);
    const formatted = ethers.utils.formatUnits(rewards, 18);
    document.getElementById("rewardResult").innerText = `You have ${formatted} BHIXU in rewards.`;
  } catch (err) {
    console.error(err);
    alert("Failed to fetch rewards");
  }
});

document.getElementById("redeemRewards").addEventListener("click", async () => {
  if (!userAddress) return alert("Connect wallet first");

  try {
    const tx = await utilityContract.redeemRewards();
    await tx.wait();
    alert("Rewards successfully redeemed!");
  } catch (err) {
    console.error(err);
    alert("Reward redemption failed");
  }
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
