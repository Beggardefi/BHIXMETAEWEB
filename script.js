// --- Countdown Timer ---
const countdownEl = document.getElementById("countdown");
const presaleEndDate = new Date("2025-08-16T23:59:59").getTime();
const countdownTimer = setInterval(() => {
  const now = new Date().getTime();
  const distance = presaleEndDate - now;

  if (distance < 0) {
    clearInterval(countdownTimer);
    coun
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
// --- Wallet Connect (Web3Modal v2) ---
let provider;
let signer;
let currentAccount = "";

const web3Modal = new window.Web3Modal.default({
  projectId: "9bb77bfd32a850e43324d0b8c8ff41dc", // Replace with your WalletConnect Project ID
  rsion: 2,
  themeMode: "light",
  themeColor: "blue",
  chains: [{ id: 56, name: "Binance Smart Chain", rpcUrl: "https://bsc-dataseed.binance.org/" }]
});

async function connectWallet() {
  try {
    const instance = await web3Modal.connect();
    provider = new ethers.providers.Web3Provider(instance);
    signer = provider.getSigner();
    currentAccount = await signer.getAddress();

    document.getElementById("walletBalance").innerText = currentAccount;
    initializeBotAccess();
  } catch (error) {
    console.error("Wallet connection failed", error);
    alert("Failed to connect wallet.");
  }
}
document.getElementById("connectWallet").addEventListener("click", connectWallet);
// --- Buy with BNB ---
async function buyWithBNB() {
  const amountBNB = prompt("Enter amount in BNB:");
  if (!amountBNB || isNaN(amountBNB)) return alert("Invalid BNB amount.");

  try {
    const tx = await signer.sendTransaction({
      to: presaleAddress,
      value: ethers.utils.parseEther(amountBNB)
    });
    await tx.wait();
    alert("BNB sent successfully! You'll get BHIKX after presale.");
  } catch (error) {
    console.error(error);
    alert("Transaction failed.");
  }
}
document.getElementById("buyBNB").addEventListener("click", buyWithBNB);

// --- Buy with USDT ---
const USDT_ABI = [
  "function transfer(address to, uint amount) public returns (bool)",
  "function approve(address spender, uint amount) public returns (bool)"
];

async function buyWithUSDT() {
  const amountUSDT = prompt("Enter amount in USDT:");
  if (!amountUSDT || isNaN(amountUSDT)) return alert("Invalid USDT amount.");

  const amount = ethers.utils.parseUnits(amountUSDT, 18);
  const usdt = new ethers.Contract(usdtAddress, USDT_ABI, signer);

  try {
    const tx1 = await usdt.approve(presaleAddress, amount);
    await tx1.wait();
    const tx2 = await usdt.transfer(presaleAddress, amount);
    await tx2.wait();
    alert("USDT sent successfully! You'll get BHIKX after presale.");
  } catch (err) {
    console.error(err);
    alert("USDT transaction failed.");
  }
}
document.getElementById("buyUSDT").addEventListener("click", buyWithUSDT);

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

  if // --- Countdown Timer ---
const countdownEl = document.getElementById("countdown");
const presaleEndDate = new Date("2025-08-16T23:59:59").getTime();
const countdownTimer = setInterval(() => {
  const now = new Date().getTime();
  const distance = presaleEndDate - now;

  if (distance < 0) {
    clearInterval(countdownTimer);
    coun
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
// --- Wallet Connect (Web3Modal v2) ---
let provider;
let signer;
let currentAccount = "";

const web3Modal = new window.Web3Modal.default({
  projectId: "9bb77bfd32a850e43324d0b8c8ff41dc", // Replace with your WalletConnect Project ID
  rsion: 2,
  themeMode: "light",
  themeColor: "blue",
  chains: [{ id: 56, name: "Binance Smart Chain", rpcUrl: "https://bsc-dataseed.binance.org/" }]
});

async function connectWallet() {
  try {
    const instance = await web3Modal.connect();
    provider = new ethers.providers.Web3Provider(instance);
    signer = provider.getSigner();
    currentAccount = await signer.getAddress();

    document.getElementById("walletBalance").innerText = currentAccount;
    initializeBotAccess();
  } catch (error) {
    console.error("Wallet connection failed", error);
    alert("Failed to connect wallet.");
  }
}
document.getElementById("connectWallet").addEventListener("click", connectWallet);
// --- Buy with BNB ---
async function buyWithBNB() {
  const amountBNB = prompt("Enter amount in BNB:");
  if (!amountBNB || isNaN(amountBNB)) return alert("Invalid BNB amount.");

  try {
    const tx = await signer.sendTransaction({
      to: presaleAddress,
      value: ethers.utils.parseEther(amountBNB)
    });
    await tx.wait();
    alert("BNB sent successfully! You'll get BHIKX after presale.");
  } catch (error) {
    console.error(error);
    alert("Transaction failed.");
  }
}
document.getElementById("buyBNB").addEventListener("click", buyWithBNB);

// --- Buy with USDT ---
const USDT_ABI = [
  "function transfer(address to, uint amount) public returns (bool)",
  "function approve(address spender, uint amount) public returns (bool)"
];

async function buyWithUSDT() {
  const amountUSDT = prompt("Enter amount in USDT:");
  if (!amountUSDT || isNaN(amountUSDT)) return alert("Invalid USDT amount.");

  const amount = ethers.utils.parseUnits(amountUSDT, 18);
  const usdt = new ethers.Contract(usdtAddress, USDT_ABI, signer);

  try {
    const tx1 = await usdt.approve(presaleAddress, amount);
    await tx1.wait();
    const tx2 = await usdt.transfer(presaleAddress, amount);
    await tx2.wait();
    alert("USDT sent successfully! You'll get BHIKX after presale.");
  } catch (err) {
    console.error(err);
    alert("USDT transaction failed.");
  }
}
document.getElementById("buyUSDT").addEventListener("click", buyWithUSDT);

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
    message.innerHTML = `<span style="color: red;">Stake $100+ to activate your bot.</span>`;// --- Countdown Timer ---
const countdownEl = document.getElementById("countdown");
const presaleEndDate = new Date("2025-08-16T23:59:59").getTime();
const countdownTimer = setInterval(() => {
  const now = new Date().getTime();
  const distance = presaleEndDate - now;

  if (distance < 0) {
    clearInterval(countdownTimer);
    coun
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
// --- Wallet Connect (Web3Modal v2) ---
let provider;
let signer;
let currentAccount = "";

const web3Modal = new window.Web3Modal.default({
  projectId: "9bb77bfd32a850e43324d0b8c8ff41dc", // Replace with your WalletConnect Project ID
  rsion: 2,
  themeMode: "light",
  themeColor: "blue",
  chains: [{ id: 56, name: "Binance Smart Chain", rpcUrl: "https://bsc-dataseed.binance.org/" }]
});

async function connectWallet() {
  try {
    const instance = await web3Modal.connect();
    provider = new ethers.providers.Web3Provider(instance);
    signer = provider.getSigner();
    currentAccount = await signer.getAddress();

    document.getElementById("walletBalance").innerText = currentAccount;
    initializeBotAccess();
  } catch (error) {
    console.error("Wallet connection failed", error);
    alert("Failed to connect wallet.");
  }
}
document.getElementById("connectWallet").addEventListener("click", connectWallet);
// --- Buy with BNB ---
async function buyWithBNB() {
  const amountBNB = prompt("Enter amount in BNB:");
  if (!amountBNB || isNaN(amountBNB)) return alert("Invalid BNB amount.");

  try {
    const tx = await signer.sendTransaction({
      to: presaleAddress,
      value: ethers.utils.parseEther(amountBNB)
    });
    await tx.wait();
    alert("BNB sent successfully! You'll get BHIKX after presale.");
  } catch (error) {
    console.error(error);
    alert("Transaction failed.");
  }
}
document.getElementById("buyBNB").addEventListener("click", buyWithBNB);

// --- Buy with USDT ---
const USDT_ABI = [
  "function transfer(address to, uint amount) public returns (bool)",
  "function approve(address spender, uint amount) public returns (bool)"
];

async function buyWithUSDT() {
  const amountUSDT = prompt("Enter amount in USDT:");
  if (!amountUSDT || isNaN(amountUSDT)) return alert("Invalid USDT amount.");

  const amount = ethers.utils.parseUnits(amountUSDT, 18);
  const usdt = new ethers.Contract(usdtAddress, USDT_ABI, signer);

  try {
    const tx1 = await usdt.approve(presaleAddress, amount);
    await tx1.wait();
    const tx2 = await usdt.transfer(presaleAddress, amount);
    await tx2.wait();
    alert("USDT sent successfully! You'll get BHIKX after presale.");
  } catch (err) {
    console.error(err);
    alert("USDT transaction failed.");
  }
}
document.getElementById("buyUSDT").addEventListener("click", buyWithUSDT);

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

  if // --- Countdown Timer ---
const countdownEl = document.getElementById("countdown");
const presaleEndDate = new Date("2025-08-16T23:59:59").getTime();
const countdownTimer = setInterval(() => {
  const now = new Date().getTime();
  const distance = presaleEndDate - now;

  if (distance < 0) {
    clearInterval(countdownTimer);
    coun
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
// --- Wallet Connect (Web3Modal v2) ---
let provider;
let signer;
let currentAccount = "";

const web3Modal = new window.Web3Modal.default({
  projectId: "9bb77bfd32a850e43324d0b8c8ff41dc", // Replace with your WalletConnect Project ID
  rsion: 2,
  themeMode: "light",
  themeColor: "blue",
  chains: [{ id: 56, name: "Binance Smart Chain", rpcUrl: "https://bsc-dataseed.binance.org/" }]
});

async function connectWallet() {
  try {
    const instance = await web3Modal.connect();
    provider = new ethers.providers.Web3Provider(instance);
    signer = provider.getSigner();
    currentAccount = await signer.getAddress();

    document.getElementById("walletBalance").innerText = currentAccount;
    initializeBotAccess();
  } catch (error) {
    console.error("Wallet connection failed", error);
    alert("Failed to connect wallet.");
  }
}
document.getElementById("connectWallet").addEventListener("click", connectWallet);
// --- Buy with BNB ---
async function buyWithBNB() {
  const amountBNB = prompt("Enter amount in BNB:");
  if (!amountBNB || isNaN(amountBNB)) return alert("Invalid BNB amount.");

  try {
    const tx = await signer.sendTransaction({
      to: presaleAddress,
      value: ethers.utils.parseEther(amountBNB)
    });
    await tx.wait();
    alert("BNB sent successfully! You'll get BHIKX after presale.");
  } catch (error) {
    console.error(error);
    alert("Transaction failed.");
  }
}
document.getElementById("buyBNB").addEventListener("click", buyWithBNB);

// --- Buy with USDT ---
const USDT_ABI = [
  "function transfer(address to, uint amount) public returns (bool)",
  "function approve(address spender, uint amount) public returns (bool)"
];

async function buyWithUSDT() {
  const amountUSDT = prompt("Enter amount in USDT:");
  if (!amountUSDT || isNaN(amountUSDT)) return alert("Invalid USDT amount.");

  const amount = ethers.utils.parseUnits(amountUSDT, 18);
  const usdt = new ethers.Contract(usdtAddress, USDT_ABI, signer);

  try {
    const tx1 = await usdt.approve(presaleAddress, amount);
    await tx1.wait();
    const tx2 = await usdt.transfer(presaleAddress, amount);
    await tx2.wait();
    alert("USDT sent successfully! You'll get BHIKX after presale.");
  } catch (err) {
    console.error(err);
    alert("USDT transaction failed.");
  }
}
document.getElementById("buyUSDT").addEventListener("click", buyWithUSDT);

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
//--navbar logic auto hide--//
document.querySelectorAll("#mainMenu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mainMenu").classList.remove("active");
  });
});
(balance >= 100) {
    const uniqueKey = `BHIKX-${currentAccount.slice(2, 8)}-${Math.random().toString(36).substring(2, 8)}`;
    document.getElementById("botKey").value = uniqueKey;
    message.innerHTML = `<span style="color: green;">Access Granted!</span>`;
    botUI.style.display = "block";
  } else {
    message.innerHTML = `<span style="color: red;">Stake $100+ to activate your bot.</span>`;
    botUI.style.display = "none";
  }
}
//--navbar logic auto hide--//
document.querySelectorAll("#mainMenu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mainMenu").classList.remove("active");
  });
});

    botUI.style.display = "none";
  }
}
//--navbar logic auto hide--//
document.querySelectorAll("#mainMenu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mainMenu").classList.remove("active");
  });
});
(balance >= 100) {
    const uniqueKey = `BHIKX-${currentAccount.slice(2, 8)}-${Math.random().toString(36).substring(2, 8)}`;
    document.getElementById("botKey").value = uniqueKey;
    message.innerHTML = `<span style="color: green;">Access Granted!</span>`;
    botUI.style.display = "block";
  } else {
    message.innerHTML = `<span style="color: red;">Stake $100+ to activate your bot.</span>`;
    botUI.style.display = "none";
  }
}
//--navbar logic auto hide--//
document.querySelectorAll("#mainMenu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mainMenu").classList.remove("active");
  });
});
