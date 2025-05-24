// --------- Global Setup ---------
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

// --------- Web3Modal v2 Setup (WalletConnect + Mobile Support) ---------
const projectId = "9bb77bfd32a850e43324d0b8c8ff41dc";
const chains = [
  {
    chainId: 56,
    name: "Binance Smart Chain",
    rpcUrl: "https://bsc-dataseed.binance.org/"
  }
];
const metadata = {
  name: "BHIKX",
  description: "BHIKX Superhero Metaverse DApp",
  url: "https://beggardefi.github.io/BHIXMETAEWEB/",
  icons: ["https://raw.githubusercontent.com/Beggardefi/BHIXMETAEWEB/main/logo/logo.png"]
};

web3Modal = new window.Web3Modal({
  projectId,
  walletConnectVersion: 2,
  themeMode: "dark",
  chains,
  metadata
});

// --------- Utility Functions ---------
function getReferralAddress() {
  const urlRef = new URLSearchParams(window.location.search).get("ref");
  if (urlRef && window.ethers.utils.isAddress(urlRef) && urlRef.toLowerCase() !== userAddress?.toLowerCase()) {
    return urlRef;
  }
  return window.ethers.constants.AddressZero;
}

function generateReferralLink() {
  if (userAddress) {
    document.getElementById("referralLink").value = `${window.location.origin}?ref=${userAddress}`;
  }
}

function copyReferral() {
  const input = document.getElementById("referralLink");
  window.navigator.clipboard.writeText(input.value)
    .then(() => alert("Referral link copied!"))
    .catch(err => console.error("Failed to copy", err));
}

const endDate = new Date("2025-07-31T23:59:59Z").getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const distance = endDate - now;
  const countdown = document.getElementById("countdown");

  if (!countdown) return;
  if (distance < 0) {
    countdown.innerHTML = "Presale Ended";
    return;
  }

  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
}

async function setupUSDT() {
  usdtContract = new window.ethers.Contract(usdtAddress, erc20Abi, signer);
  return await usdtContract.decimals();
}

// --------- Wallet Connect/Disconnect ---------
async function connectWallet() {
  try {
    const ethereumProvider = await web3Modal.connect();
    provider = new window.ethers.providers.Web3Provider(ethereumProvider);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    const ref = getReferralAddress();
    if (ref.toLowerCase() === userAddress.toLowerCase()) {
      alert("You can't refer yourself!");
      return;
    }

    utilityContract = new window.ethers.Contract(utilityAddress, utilityAbi, signer);
    document.getElementById("connectBtn").textContent = "Connected";
    generateReferralLink();
  } catch (err) {
    console.error("Wallet connect error:", err);
    alert("Connection failed: " + (err?.message || "Unknown error"));
  }
}

// --------- DOM & UI Event Bindings ---------
function bindEvents() {
  // Wallet Connect Button
  document.getElementById("connectBtn")?.addEventListener("click", connectWallet);

  // Buy with BNB
  document.getElementById("buyBNB")?.addEventListener("click", async () => {
    const amount = document.getElementById("bnbAmount").value;
    if (!userAddress || !amount || isNaN(amount) || Number(amount) <= 0) {
      return alert("Enter valid amount and connect wallet.");
    }
    try {
      document.getElementById("buyBNB").disabled = true;
      const ref = getReferralAddress();
      const tx = await utilityContract.buyWithBNB(ref, {
        value: window.ethers.utils.parseEther(amount)
      });
      await tx.wait();
      alert("BHIXU purchased with BNB!");
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    } finally {
      document.getElementById("buyBNB").disabled = false;
    }
  });

  // Buy with USDT
  document.getElementById("buyUSDT")?.addEventListener("click", async () => {
    const amount = document.getElementById("usdtAmount").value;
    if (!userAddress || !amount) return alert("Connect wallet and enter amount");
    try {
      document.getElementById("buyUSDT").disabled = true;
      const ref = getReferralAddress();
      const decimals = await setupUSDT();
      const amountInWei = window.ethers.utils.parseUnits(amount, decimals);

      const approval = await usdtContract.approve(utilityAddress, amountInWei);
      await approval.wait();

      const tx = await utilityContract.buyWithUSDT(amountInWei, ref);
      await tx.wait();
      alert("BHIXU purchased with USDT!");
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    } finally {
      document.getElementById("buyUSDT").disabled = false;
    }
  });

  // Referral Link Copy
  document.getElementById("copyReferral")?.addEventListener("click", copyReferral);

  // Check Rewards
  document.getElementById("checkRewards")?.addEventListener("click", async () => {
    if (!userAddress) return alert("Connect wallet first");
    try {
      const rewards = await utilityContract.getReferralRewards(userAddress);
      const formatted = window.ethers.utils.formatUnits(rewards, 18);
      document.getElementById("rewardResult").innerText = `You have ${formatted} BHIXU in rewards.`;
    } catch (err) {
      console.error(err);
      alert("Failed to fetch rewards");
    }
  });

  // Redeem Rewards
  document.getElementById("redeemRewards")?.addEventListener("click", async () => {
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

  // Bot Key Generation
  document.getElementById("generateBotKey")?.addEventListener("click", async () => {
    if (!userAddress) return alert("Connect wallet first");
    const botKey = `BHIX-BOT-${userAddress.slice(2, 10).toUpperCase()}`;
    document.getElementById("botKeyDisplay").innerText = `Your Bot Key: ${botKey}`;
  });

  // Whitepaper Slider
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

  showSlide(currentSlide);
  document.getElementById("prevSlide")?.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + whitepaperSlides.length) % whitepaperSlides.length;
    showSlide(currentSlide);
  });
  document.getElementById("nextSlide")?.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % whitepaperSlides.length;
    showSlide(currentSlide);
  });

  // Hamburger Menu (Mobile Nav)
  document.getElementById("hamburger")?.addEventListener("click", () => {
    const nav = document.getElementById("navMenu");
    nav.classList.toggle("active");
  });
}

// --------- App Initialization ---------
function appInit() {
  // Countdown Timer
  const countdown = document.getElementById("countdown");
  if (countdown) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
  bindEvents();
}

// --------- Start App (No DOMContentLoaded Needed With defer) ---------
appInit();
