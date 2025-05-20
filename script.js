// -------- Global Setup --------
let web3Modal;
let provider; // This variable will hold the connected provider from Web3Modal
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
  const projectId = "9bb77bfd32a850e43324d0b8c8ff41dc"; // Your WalletConnect project ID

  const chains = [{
    id: 56,
    name: 'Binance Smart Chain',
    rpcUrl: 'https://bsc-dataseed.binance.org/'
  }];

  const metadata = {
    name: "BHIKX",
    description: "BHIKX Superhero Metaverse",
    url: "https://beggardefi.github.io/BHIXMETAEWEB/", // 
    icons: ["https://beggardefi.github.io/BHIXMETAEWEB/logo.png"] // Optional icon
  };

  // Web3Modal v2 setup now includes the WalletConnect connector directly
  // This replaces the separate window.WalletConnectEthereumProvider.init() call
  web3Modal = new window.Web3Modal.Modal({
    projectId: projectId,
    chains: chains, // Pass the chains array directly
    themeMode: "dark",
    themeVariables: {
      "--w3m-accent": "#f9a826"
    },
    // WalletConnect is configured internally by Web3Modal v2 based on projectId and chains
    // standaloneChains is a property that can help with specific chain handling
    standaloneChains: [56]
  });

  // The 'connectButton' is now primarily responsible for opening the modal.
  // The actual connection logic resides in connectWallet().
  const openModalButton = document.getElementById('connectButton');
  if (openModalButton) {
    openModalButton.addEventListener('click', async () => {
      // When connectButton is clicked, it calls connectWallet()
      // which uses the web3Modal.connect() method.
      await connectWallet();
    });
  }
}

// -------- Wallet Connect --------
async function connectWallet() {
  try {
    // This call opens the Web3Modal and allows the user to choose a wallet.
    // The provider returned is the connected wallet's provider (e.g., MetaMask, WalletConnect).
    provider = await web3Modal.connect();

    // Wrap the provider with ethers.js
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    signer = ethersProvider.getSigner();
    userAddress = await signer.getAddress();

    // Initialize your contracts with the signer
    utilityContract = new ethers.Contract(utilityAddress, utilityAbi, signer);
    usdtContract = new ethers.Contract(usdtAddress, erc20Abi, signer); // Initialize USDT contract with signer

    document.getElementById("connectBtn").textContent = "Connected";
    generateReferralLink();
    console.log("Wallet Connected:", userAddress);

    // Optional: Add event listeners for provider events to handle disconnects, account changes, etc.
    provider.on("accountsChanged", (accounts) => {
      console.log("Accounts changed:", accounts);
      if (accounts.length === 0) {
        // Wallet disconnected or no accounts available
        disconnectWallet();
      } else {
        signer = ethersProvider.getSigner();
        userAddress = accounts[0];
        // Re-initialize contracts with new signer if necessary
        utilityContract = new ethers.Contract(utilityAddress, utilityAbi, signer);
        usdtContract = new ethers.Contract(usdtAddress, erc20Abi, signer);
        generateReferralLink(); // Update referral link for new address
      }
    });

    provider.on("chainChanged", (chainId) => {
      console.log("Chain changed:", chainId);
      // You might want to reload the DApp or inform the user to switch networks
      // if your DApp only supports BSC.
      alert("Network changed. Please ensure you are on Binance Smart Chain (BSC).");
      window.location.reload(); // Simple approach to handle chain change
    });

    provider.on("disconnect", (error) => {
      console.error("Provider disconnected:", error);
      disconnectWallet();
    });

  } catch (err) {
    console.error("Connection error:", err);
    alert("Wallet connection failed. Please ensure you have a wallet installed or try again.");
    // Clear cached provider if connection failed (e.g., user rejected)
    if (web3Modal && err.message && err.message.includes("User rejected")) {
      console.log("User rejected wallet connection. Clearing cached provider.");
      web3Modal.clearCachedProvider();
    }
  }
}

// Function to handle wallet disconnection
function disconnectWallet() {
  console.log("Wallet disconnected.");
  if (web3Modal) {
    web3Modal.clearCachedProvider(); // Clear any cached provider in Web3Modal
  }
  provider = null;
  signer = null;
  userAddress = null;
  utilityContract = null;
  usdtContract = null; // Clear USDT contract as well
  document.getElementById("connectBtn").textContent = "Connect Wallet";
  document.getElementById("referralLink").value = ""; // Clear referral link
  document.getElementById("rewardResult").innerText = ""; // Clear rewards display
  document.getElementById("botKeyDisplay").innerText = ""; // Clear bot key display
}


// -------- Referral Utilities --------
function getReferralAddress() {
  const ref = new URLSearchParams(window.location.search).get("ref");
  // Ensure that ref is a valid address and not the user's own address if it's the same
  return ref && ethers.utils.isAddress(ref) && ref.toLowerCase() !== userAddress.toLowerCase() ? ref : userAddress;
}

function generateReferralLink() {
  if (userAddress) {
    document.getElementById("referralLink").value = `${window.location.origin}?ref=${userAddress}`;
  } else {
    document.getElementById("referralLink").value = ""; // Clear if not connected
  }
}

function copyReferral() {
  const input = document.getElementById("referralLink");
  if (input.value) { // Only copy if there's a link
    navigator.clipboard.writeText(input.value)
      .then(() => alert("Referral link copied!"))
      .catch(err => console.error("Failed to copy", err));
  } else {
    alert("No referral link to copy. Connect your wallet first.");
  }
}

// -------- Countdown --------
let countdown;
const endDate = new Date("2025-07-31T23:59:59Z").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = endDate - now;

  const countdownElement = document.getElementById("countdown");
  if (!countdownElement) return; // Exit if countdown element is not found

  if (distance < 0) {
    countdownElement.innerHTML = "Presale Ended";
    clearInterval(countdownInterval); // Stop updating once ended
    return;
  }

  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
}
let countdownInterval; // Define interval variable globally

// -------- USDT Setup --------
// This function needs to be called after `provider` is set,
// and it should use the `signer` to interact with the USDT contract for approvals.
async function getUsdtDecimals() {
  if (!provider) {
    console.error("Provider not initialized for USDT decimals.");
    return null;
  }
  const usdtContractReadOnly = new ethers.Contract(usdtAddress, erc20Abi, provider);
  return await usdtContractReadOnly.decimals();
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
  const slideElement = document.getElementById("whitepaperSlide");
  if (slideElement) {
    slideElement.innerText = whitepaperSlides[index];
  }
}

// -------- DOM Ready --------
window.addEventListener("DOMContentLoaded", async () => {
  // Initialize Web3Modal first
  await initWeb3Modal();

  // Initialize countdown
  countdown = document.getElementById("countdown");
  if (countdown) {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000); // Store interval ID
  }

  // Show first whitepaper slide
  showSlide(currentSlide);

  // Event Listeners for existing buttons
  // Note: The 'connectButton' is for opening the modal,
  // 'connectBtn' is for updating its text once connected.
  // The 'connectBtn' click listener below is now redundant if 'connectButton' already calls connectWallet().
  // If 'connectButton' is the main button, you might want to remove this listener for 'connectBtn' to avoid double-handling.
  // Keeping it for now as per your request "no changes should affect old btna or script"
  const mainConnectBtn = document.getElementById("connectBtn");
  if (mainConnectBtn) {
    mainConnectBtn.addEventListener("click", connectWallet);
  }


  document.getElementById("buyBNB").addEventListener("click", async () => {
    const amount = document.getElementById("bnbAmount").value;
    const buyBtn = document.getElementById("buyBNB");
    if (!userAddress || !amount) return alert("Connect wallet and enter amount");

    try {
      buyBtn.disabled = true;
      const ref = getReferralAddress();
      const tx = await utilityContract.buyWithBNB(ref, {
        value: ethers.utils.parseEther(amount)
      });
      await tx.wait();
      alert("BHIXU purchased with BNB!");
    } catch (err) {
      console.error(err);
      alert("Transaction failed: " + (err.data ? err.data.message : err.message)); // More informative error
    } finally {
      buyBtn.disabled = false;
    }
  });

  document.getElementById("buyUSDT").addEventListener("click", async () => {
    const amount = document.getElementById("usdtAmount").value;
    const buyBtn = document.getElementById("buyUSDT");
    if (!userAddress || !amount) return alert("Connect wallet and enter amount");
    if (!usdtContract) return alert("USDT contract not initialized. Connect wallet first.");


    try {
      buyBtn.disabled = true;
      const ref = getReferralAddress();
      const decimals = await getUsdtDecimals(); // Get decimals for parsing
      if (decimals === null) {
        throw new Error("Could not get USDT decimals.");
      }
      const amountInWei = ethers.utils.parseUnits(amount, decimals);

      // Approve USDT transfer
      const approvalTx = await usdtContract.approve(utilityAddress, amountInWei);
      alert("Approving USDT... Please confirm in your wallet.");
      await approvalTx.wait();
      alert("USDT approved! Now confirming purchase...");

      // Buy with USDT
      const buyTx = await utilityContract.buyWithUSDT(amountInWei, ref);
      await buyTx.wait();
      alert("BHIXU purchased with USDT!");
    } catch (err) {
      console.error(err);
      alert("Transaction failed: " + (err.data ? err.data.message : err.message)); // More informative error
    } finally {
      buyBtn.disabled = false;
    }
  });

  document.getElementById("checkRewards").addEventListener("click", async () => {
    if (!userAddress) return alert("Connect wallet first");
    if (!utilityContract) return alert("Utility contract not initialized. Connect wallet first.");


    try {
      const rewards = await utilityContract.getReferralRewards(userAddress);
      const formatted = ethers.utils.formatUnits(rewards, 18);
      document.getElementById("rewardResult").innerText = `You have ${formatted} BHIXU in rewards.`;
    } catch (err) {
      console.error(err);
      alert("Failed to fetch rewards: " + err.message);
    }
  });

  document.getElementById("redeemRewards").addEventListener("click", async () => {
    if (!userAddress) return alert("Connect wallet first");
    if (!utilityContract) return alert("Utility contract not initialized. Connect wallet first.");

    try {
      const tx = await utilityContract.redeemRewards();
      alert("Redeeming rewards... Please confirm in your wallet.");
      await tx.wait();
      alert("Rewards successfully redeemed!");
    } catch (err) {
      console.error(err);
      alert("Reward redemption failed: " + (err.data ? err.data.message : err.message));
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

  const copyBtn = document.getElementById("copyReferral");
  if (copyBtn) {
    copyBtn.addEventListener("click", copyReferral);
  }

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
});
