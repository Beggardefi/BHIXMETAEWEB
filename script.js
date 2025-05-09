<script src="https://cdn.jsdelivr.net/npm/ethers/dist/ethers.min.js"></script>
<script src="https://unpkg.com/@walletconnect/web3-provider/dist/umd/index.min.js"></script>
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

// Navbar Show/Hide on Scroll
let prevScroll = window.pageYOffset;
const header = document.getElementById("mainHeader");

window.onscroll = () => {
  const currentScroll = window.pageYOffset;
  if (prevScroll > currentScroll) {
    header.style.top = "0";
  } else {
    header.style.top = "-80px";
  }
  prevScroll = currentScroll;
};

// Hamburger Toggle
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
let provider;
let signer;
let currentAccount = "";
const usdtAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const presaleContractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

async function connectWallet() {
  try {
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
    } else {
      const walletConnectProvider = new WalletConnectProvider.default({
        rpc: { 56: "https://bsc-dataseed.binance.org/" },
        chainId: 56
      });
      await walletConnectProvider.enable();
      provider = new ethers.providers.Web3Provider(walletConnectProvider);
    }

    signer = provider.getSigner();
    currentAccount = await signer.getAddress();
    document.getElementById("walletBalance").innerText = currentAccount;
    initializeBotAccess();
  } catch (error) {
    console.error("Wallet connection failed", error);
  }
}
document.getElementById("connectWallet").addEventListener("click", connectWallet);

// --- Buy with BNB ---
const presaleContractABI = [
  "function contributeBNB() public payable",
  "function contributeUSDT(uint256 amount) external",
];

async function buyWithBNB() {
  if (!checkWalletConnected()) return;

  const amountBNB = prompt("Enter amount in BNB:");
  if (!amountBNB || isNaN(amountBNB)) return alert("Invalid BNB amount.");

  try {
    const tx = await signer.sendTransaction({
      to: presaleContractAddress,
      value: ethers.utils.parseEther(amountBNB)
    });
    await tx.wait();
    alert("BNB contributed successfully!");
  } catch (error) {
    console.error(error);
    alert("Transaction failed.");
  }
}

// --- Buy with USDT ---
async function buyWithUSDT() {
  if (!checkWalletConnected()) return;

  const amountUSDT = prompt("Enter amount in USDT:");
  if (!amountUSDT || isNaN(amountUSDT)) return alert("Invalid USDT amount.");

  const amount = ethers.utils.parseUnits(amountUSDT, 18);
  const presale = new ethers.Contract(presaleContractAddress, presaleContractABI, signer);
  const usdt = new ethers.Contract(usdtAddress, USDT_ABI, signer);

  try {
    const tx1 = await usdt.approve(presaleContractAddress, amount);
    await tx1.wait();
    const tx2 = await presale.contributeUSDT(amount);
    await tx2.wait();
    alert("USDT contributed successfully!");
  } catch (err) {
    console.error(err);
    alert("USDT contribution failed.");
  }
}
// --- Redeem Rewards (Simulated) ---
function redeemRewards() {
  if (!currentAccount) return alert("Connect wallet to redeem.");
  document.getElementById("rewardBalance").innerText = "0 USDT";
  alert("Rewards claimed! (Simulation)");
}
document.getElementById("redeemBtn").addEventListener("click", redeemRewards);

// --- Referral Copy ---
function copyReferral() {
  const link = document.getElementById("refLink");
  link.select();
  link.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Referral link copied!");
}
document.getElementById("copyReferralBtn").addEventListener("click", copyReferral);

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
document.getElementById("copyBotKey").addEventListener("click", copyBotKey);

function launchBot() {
  alert("Launching your bot... Key is valid!");
}
document.getElementById("launchBotBtn").addEventListener("click", launchBot);

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
function checkWalletConnected() {
  if (!currentAccount) {
    alert("Please connect your wallet first.");
    return false;
  }
  return true;
}

async function buyWithBNB() {
  if (!checkWalletConnected()) return;

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

async function buyWithUSDT() {
  if (!checkWalletConnected()) return;

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
function showPostWalletUI() {
  document.getElementById("postWalletUI").style.display = "block";
  document.getElementById("connectWallet").style.display = "none";
}

currentAccount = await signer.getAddress();
document.getElementById("walletBalance").innerText = currentAccount;
initializeBotAccess();
showPostWalletUI(); // <-- Add this
