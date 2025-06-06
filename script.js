// --- Navbar Toggle ---
document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.getElementById("mainMenu").classList.toggle("active");
});
//update preslae
async function updatePresaleProgress() {
  try {
    const presale = new ethers.Contract(presaleAddress, presaleAbi, provider);
    const raised = await presale.totalUSDRaised();
    const amount = ethers.utils.formatUnits(raised, 18);
    document.getElementById("raisedAmount").innerText = `Raised: $${parseFloat(amount).toFixed(2)}`;
  } catch (err) {
    console.error("Failed to fetch presale progress", err);
  }
}
// --- Countdown Timer ---
const countdownEl = document.getElementById("countdown");

async function startCountdown() {
  try {
    if (!provider) {
      provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
    }

    const presale = new ethers.Contract(presaleAddress, presaleAbi, provider);
    const endTime = await presale.presaleEndTime();
    const endTimestamp = Number(endTime.toString()) * 1000; // Convert to ms

    const countdownTimer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTimestamp - now;

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

  } catch (err) {
    console.error("Countdown error:", err);
    countdownEl.innerHTML = "Unable to load countdown.";
  }
}

startCountdown(); // Run it

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
let walletConnected = false;

// Contract addresses
const usdtAddress = "0x55d398326f99059fF775485246999027B3197955"; // USDT on BSC
const bhixAddress = "0x03Fb7952f51e0478A1D38a56F3021CFca8a739F6";  // Your BHIX token
const presaleAddress = "0xdC1E3E7F3502c7B3F47BB94F1C7f4B63934B6Cf3"; // Presale contract
const bhixUtilityAddress = "0xYourUtilityContractAddressHere";
// ABIs
const erc20Abi = [
  "function balanceOf(address) view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)"
];

const presaleAbi = [
  "function buyWithUSDT(uint256 usdtAmount, address referrer) external",
  "function totalUSDRaised() view returns (uint256)",
  "function presaleEndTime() view returns (uint256)"
];
async function connectWallet() {
  try {
    if (walletConnected) {
      disconnectWallet();
      return;
    }

    // Detect wallet
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
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
    walletConnected = true;

    document.getElementById("walletAddress").innerText = `Address: ${currentAccount}`;
    document.getElementById("connectWallet").innerText = "Disconnect Wallet";

    await updateBalances();
  } catch (error) {
    console.error("Wallet connection failed", error);
  }
}

async function updateBalances() {
  try {
    const bnbBalance = await provider.getBalance(currentAccount);
    document.getElementById("bnbBalance").innerText = `BNB: ${parseFloat(ethers.utils.formatEther(bnbBalance)).toFixed(4)}`;

    const usdt = new ethers.Contract(usdtAddress, erc20Abi, provider);
    const usdtRaw = await usdt.balanceOf(currentAccount);
    document.getElementById("usdtBalance").innerText = `USDT: ${parseFloat(ethers.utils.formatUnits(usdtRaw, 18)).toFixed(2)}`;

    const bhix = new ethers.Contract(bhixAddress, erc20Abi, provider);
    const bhixRaw = await bhix.balanceOf(currentAccount);
    document.getElementById("bhixBalance").innerText = `BHIX: ${parseFloat(ethers.utils.formatUnits(bhixRaw, 18)).toFixed(2)}`;
  } catch (error) {
    console.error("Failed to fetch balances", error);
  }
}

function disconnectWallet() {
async function disconnectWallet() {
  if (provider?.provider?.disconnect && typeof provider.provider.disconnect === "function") {
    await provider.provider.disconnect();
  }

  provider = null;
  signer = null;
  currentAccount = "";
  walletConnected = false;

  document.getElementById("walletAddress").innerText = "Address: Not connected";
  document.getElementById("bnbBalance").innerText = "BNB: 0";
  document.getElementById("usdtBalance").innerText = "USDT: 0";
  document.getElementById("bhixBalance").innerText = "BHIX: 0";
  document.getElementById("connectWallet").innerText = "Connect Wallet";
}
document.getElementById("connectWallet").addEventListener("click", connectWallet);
await initializeBotAccess();
// Buy with USDT
async function buyWithUSDT(amountInUSD, referrer = ethers.constants.AddressZero) {
  if (!walletConnected) {
    alert("Please connect wallet first.");
    return;
  }

  t
    const usdtContract = new ethers.Contract(usdtAddress, erc20Abi, signer);
    const presaleContract = new ethers.Contract(presaleAddress, presaleAbi, signer);

    const amount = ethers.utils.parseUnits(amountInUSD.toString(), 18);

    const allowance = await usdtContract.allowance(currentAccount, presaleAddress);
    if (allowance.lt(amount)) {
      const approveTx = await usdtContract.approve(presaleAddress, amount);
      await approveTx.wait();
    }

    const buyTx = await presaleContract.buyWithUSDT(amount, referrer);
    await buyTx.wait();

    alert("BHIX purchased successfully!");
    await updateBalances();
  } catch (error) {
    console.error("USDT purchase failed", error);
    alert("Transaction failed. Check console for details.");
  }
const referrer = getReferrer();
await buyWithUSDT(amountInUSD, referrer);
}
}
// --- Buy with BNB ---
async function buyWithUSDT(amountInUSD, referrer = ethers.constants.AddressZero) {
  if (!walletConnected) {
    alert("Please connect wallet first.");
    return;
  }

  try {
    const usdtContract = new ethers.Contract(usdtAddress, erc20Abi, signer);
    const presaleContract = new ethers.Contract(presaleAddress, presaleAbi, signer);

    const amount = ethers.utils.parseUnits(amountInUSD.toString(), 18);

    const allowance = await usdtContract.allowance(currentAccount, presaleAddress);
    if (allowance.lt(amount)) {
      const approveTx = await usdtContract.approve(presaleAddress, amount);
      await approveTx.wait();
    }

    const buyTx = await presaleContract.buyWithUSDT(amount, referrer);
    await buyTx.wait();

    alert("BHIX purchased successfully!");
    await updateBalances();
  } catch (error) {
    console.error("USDT purchase failed", error);
    alert("Transaction failed. Check console for details.");
  }
}
document.getElementById("buyBNB").addEventListener("click", buyWithBNB);
(async () => {
  await updatePresaleProgress();
})(); 
// --- Referral Copy ---
function copyReferral() {
  const baseUrl = window.location.origin;
document.getElementById("refLink").value = `${baseUrl}/?ref=${currentAccount}`;
  const link = document.getElementById("refLink");
  link.select();
  link.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Referral link copied!");
}
function getReferrer() {
  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get("ref");
  return ethers.utils.isAddress(ref) ? ref : ethers.constants.AddressZero;
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

t.getElementById("buyBNB").addEventListener("click", buyWithBNB);

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
  // -- check network id--//
const { chainId } = await provider.getNetwork();
if (chainId !== 56) alert("Please switch to Binance Smart Chain");
