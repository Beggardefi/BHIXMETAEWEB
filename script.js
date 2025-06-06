// --- Countdown Timer ---
const countdownEl = document.getElementById("countdown");
const presaleEndDate = new Date("2025-06-30T23:59:59").getTime();
const countdownTimer = setInterval(() => {
  const now = new Date().getTime();
  const distance = presaleEndDate - now;

  if (distance < 0) {
    clearInterval(countdownTimer);
    countdownEl.innerHTML = "Presale Ended";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.innerHTML = `${days}d ${hours}h ${mins}m ${secs}s`;
}, 1000);

// --- Navbar Toggle ---
document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.getElementById("mainMenu").classList.toggle("active");
});

// --- Whitepaper Slider ---
let currentSlide = 0;
function showSlide(index) {
  const slides = document.querySelectorAll("#whitepaper-slider .slide");
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}
function nextSlide() {
  const slides = document.querySelectorAll("#whitepaper-slider .slide");
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
function prevSlide() {
  const slides = document.querySelectorAll("#whitepaper-slider .slide");
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}
document.addEventListener("DOMContentLoaded", () => {
  showSlide(currentSlide);
});

// --- Wallet Connect ---
let provider, signer, userAddress;
const presaleAddress = "0xdC1E3E7F3502c7B3F47BB94F1C7f4B63934B6Cf3";
const bhixTokenAddress = "0x03Fb7952f51e0478A1D38a56F3021CFca8a739F6";
const usdtAddress = "0x55d398326f99059fF775485246999027B3197955";

let presaleAbi, tokenAbi;

// Load ABIs
fetch('./abi/bhixpresale.json')
  .then(res => res.json())
  .then(abi => presaleAbi = abi);

fetch('./abi/bhix.json')
  .then(res => res.json())
  .then(abi => tokenAbi = abi);

// Connect Wallet
// Connect MetaMask wallet
document.getElementById("connectWallet").addEventListener("click", async () => {
  const connectBtn = document.getElementById("connectWallet");

  if (connectBtn.innerText === "Disconnect") {
    provider = null;
    signer = null;
    userAddress = null;
    connectBtn.innerText = "Connect Wallet";
    document.getElementById("walletAddress").innerText = "Not connected";
    return;
  }

  if (!window.ethereum) {
    return alert("MetaMask is not installed!");
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    connectBtn.innerText = "Disconnect";
    document.getElementById("walletAddress").innerText = userAddress;

    updateBalances();
  } catch (err) {
    console.error(err);
    alert("Wallet connection failed.");
  }
});
// Update all balances
async function updateBalances() {
  if (!provider || !signer || !userAddress) return;

  const bnb = await provider.getBalance(userAddress);
  document.getElementById("bnbBalance").innerText = ethers.utils.formatEther(bnb);

  const usdt = new ethers.Contract(usdtAddress, tokenAbi, provider);
  const usdtBal = await usdt.balanceOf(userAddress);
  document.getElementById("usdtBalance").innerText = ethers.utils.formatUnits(usdtBal, 18);

  const bhix = new ethers.Contract(bhixTokenAddress, tokenAbi, provider);
  const bhixBal = await bhix.balanceOf(userAddress);
  document.getElementById("bhixBalance").innerText = ethers.utils.formatUnits(bhixBal, 18);
}

// Buy with BNB
document.getElementById("buyBNB").addEventListener("click", async () => {
  const amount = prompt("Enter BNB amount to spend:");
  if (!amount) return;

  const value = ethers.utils.parseEther(amount);
  const presale = new ethers.Contract(presaleAddress, presaleAbi, signer);

  try {
    const tx = await presale.buyWithBNB({ value });
    await tx.wait();
    alert("BNB Purchase Successful");
    updateBalances();
  } catch (err) {
    alert("BNB Purchase Failed: " + err.message);
  }
});

// Buy with USDT
document.getElementById("buyUSDT").addEventListener("click", async () => {
  const amount = prompt("Enter USDT amount to spend:");
  if (!amount) return;

  const value = ethers.utils.parseUnits(amount, 18);
  const usdt = new ethers.Contract(usdtAddress, tokenAbi, signer);
  const presale = new ethers.Contract(presaleAddress, presaleAbi, signer);

  try {
    const allowance = await usdt.allowance(userAddress, presaleAddress);
    if (allowance.lt(value)) {
      const approveTx = await usdt.approve(presaleAddress, value);
      await approveTx.wait();
    }

    const tx = await presale.buyWithUSDT(value);
    await tx.wait();
    alert("USDT Purchase Successful");
    updateBalances();
  } catch (err) {
    alert("USDT Purchase Failed: " + err.message);
  }
});
// --- Redeem Rewards (Simulated) ---
function redeemRewards() {
  if (!currentAccount) return alert("Connect wallet to redeem.");
  document.getElementById("rewardBalance").innerText = "0 USDT";
  alert("Rewards claimed! (Simulation)");
}

// --- Referral Copy ---
function copyReferral() {
  const link = document.getElementById("refLink");
  link.select();
  link.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Referral link copied!");
}

// --- Bot Key Access ---
async function getStakedBalanceUSD() {
  // Simulated staking check
  return 120;
}

function copyBotKey() {
  const botKey = document.getElementById("botKey");
  botKey.select();
  document.execCommand("copy");
  alert("Bot key copied to clipboard!");
}

function launchBot() {
  alert("Launching your bot... Key is valid!");
}

async function initializeBotAccess() {
  const balance = await getStakedBalanceUSD(currentAccount);
  const message = document.getElementById("bot-access-message");
  const botUI = document.getElementById("bot-ui");

  if (balance >= 100) {
    const uniqueKey = `BHIKX-${currentAccount.slice(2, 8)}-${Math.random().toString(36).substring(2, 8)}`;
    document.getElementById("botKey").value = uniqueKey;
    message.innerHTML = `<span style="color: green;">Access Granted!</span>`;
    botUI.style.display = "block";
  } else {
    message.innerHTML = `<span style="color: red;">Stake $100+ to activate your bot.</span>`;
    botUI.style.display = "none";
  }
      }
  
