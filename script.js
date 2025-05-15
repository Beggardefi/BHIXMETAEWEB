// -------- Global Setup --------
let web3Modal;
let provider;
let signer;
let utilityContract;
let userAddress = null;

const utilityAddress = "0xdC1E3E7F3502c7B3F47BB94F1C7f4B63934B6Cf3";
const utilityAbi = [
  "function buyWithBNB(address ref) payable",
  "function buyWithUSDT(uint256 amount, address ref) external",
  "function getReferralRewards(address user) view returns (uint256)",
  "function redeemRewards() external"
];

const usdtAddress = "0x55d398326f99059fF775485246999027B3197955"; // BSC USDT
const erc20Abi = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function decimals() view returns (uint8)"
];
let usdtContract;

// -------- Web3Modal Setup --------
async function initWeb3Modal() {
  const providerOptions = {
    walletconnect: {
      package: window.WalletConnectProvider.default,
      options: {
        rpc: { 56: "https://bsc-dataseed.binance.org/" }
      }
    }
  };

  web3Modal = new window.Web3Modal.default({
    cacheProvider: true,
    providerOptions,
    theme: "dark"
  });
}

// -------- Wallet Connect --------
async function connectWallet() {
  try {
    const instance = await web3Modal.connect();
    provider = new ethers.providers.Web3Provider(instance);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    utilityContract = new ethers.Contract(utilityAddress, utilityAbi, signer);

    document.getElementById("connectBtn").textContent = "Connected";
    generateReferralLink();
  } catch (err) {
    console.error(err);
    alert("Wallet connection failed");
  }
}

// -------- Referral Utilities --------
function getReferralAddress() {
  const ref = new URLSearchParams(window.location.search).get("ref");
  return ref && ethers.utils.isAddress(ref) ? ref : userAddress;
}

function generateReferralLink() {
  if (userAddress) {
    document.getElementById("referralLink").value = `${window.location.origin}?ref=${userAddress}`;
  }
}

function copyReferral() {
  const input = document.getElementById("referralLink");
  input.select();
  document.execCommand("copy");
  alert("Referral link copied!");
}

// -------- Countdown --------
const countdown = document.getElementById('countdown');
const endDate = new Date("2025-07-31T23:59:59Z").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = endDate - now;

  if (distance < 0) return countdown.innerHTML = "Presale Ended";

  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
}

// -------- USDT Setup --------
async function setupUSDT() {
  const decimals = await new ethers.Contract(usdtAddress, erc20Abi, provider).decimals();
  usdtContract = new ethers.Contract(usdtAddress, erc20Abi, signer);
  return decimals;
}

// -------- Whitepaper Slides --------
const whitepaperSlides = [
  "BHIKX is a superhero-themed blockchain metaverse.",
  "Earn by staking, referrals, and completing missions.",
  "Use BHIXU tokens in-game and in the real world.",
  "Join the DAO and shape the beggar-free future!"
];
let currentSlide = 0;

function showSlide(index) {
  document.getElementById("whitepaperSlide").innerText = whitepaperSlides[index];
}

// -------- DOM Ready --------
window.addEventListener("DOMContentLoaded", () => {
  initWeb3Modal();

  document.getElementById("connectBtn").addEventListener("click", connectWallet);

  document.getElementById("buyBNB").addEventListener("click", async () => {
    const amount = document.getElementById("bnbAmount").value;
    if (!userAddress || !amount) return alert("Connect wallet and enter amount");

    try {
      const ref = getReferralAddress();
      const tx = await utilityContract.buyWithBNB(ref, {
        value: ethers.utils.parseEther(amount)
      });
      await tx.wait();
      alert("BHIXU purchased with BNB!");
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    }
  });

  document.getElementById("buyUSDT").addEventListener("click", async () => {
    const amount = document.getElementById("usdtAmount").value;
    if (!userAddress || !amount) return alert("Connect wallet and enter amount");

    try {
      const ref = getReferralAddress();
      const decimals = await setupUSDT();
      const amountInWei = ethers.utils.parseUnits(amount, decimals);

      const approval = await usdtContract.approve(utilityAddress, amountInWei);
      await approval.wait();

      const tx = await utilityContract.buyWithUSDT(amountInWei, ref);
      await tx.wait();
      alert("BHIXU purchased with USDT!");
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    }
  });

  document.getElementById("checkRewards").addEventListener("click", async () => {
    if (!userAddress) return alert("Connect wallet first");

    try {
      const rewards = await utilityContract.getReferralRewards(userAddress);
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

  document.getElementById("generateBotKey").addEventListener("click", () => {
    if (!userAddress) return alert("Connect wallet first");
    const key = btoa(userAddress + ":" + Date.now());
    document.getElementById("botKeyDisplay").innerText = "Your Bot Key: " + key;
  });

  document.getElementById("prevSlide").addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + whitepaperSlides.length) % whitepaperSlides.length;
    showSlide(currentSlide);
  });

  document.getElementById("nextSlide").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % whitepaperSlides.length;
    showSlide(currentSlide);
  });

  document.getElementById("copyReferral").addEventListener("click", copyReferral);

  document.getElementById("hamburger").addEventListener("click", () => {
    document.getElementById("navMenu").classList.toggle("active");
  });

  showSlide(currentSlide);
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
