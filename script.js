// BHIKX Presale Script

// Ensure DOM is loaded first
document.addEventListener("DOMContentLoaded", async () => {
  const connectBtn = document.getElementById("connectWallet");
  const walletAddressSpan = document.getElementById("walletAddress");
  const buyBNBBtn = document.getElementById("buyWithBNB");
  const buyUSDTBtn = document.getElementById("buyWithUSDT");
  const copyRefBtn = document.getElementById("copyReferral");
  const checkRewardsBtn = document.getElementById("checkRewards");
  const redeemRewardsBtn = document.getElementById("redeemRewards");
  const generateBotKeyBtn = document.getElementById("generateBotKey");
  const referralLinkEl = document.getElementById("referralLink");
  const rewardResultEl = document.getElementById("rewardResult");
  const botKeyResultEl = document.getElementById("botKeyResult");

  let provider, signer, userAddress;

  const presaleContractAddress = "0xdC1E3E7F3502c7B3F47BB94F1C7f4B63934B6Cf3";
  const utilityContractAddress = "0x7380Be8D02b767D6E1071FD562222A15F512D5a6";
  const usdtTokenAddress = "0x55d398326f99059fF775485246999027B3197955";
  const presaleABI = await fetch("./abi/Presale.json").then(r => r.json());
  const utilityABI = await fetch("./abi/Utility.json").then(r => r.json());
  const usdtABI = await fetch("./abi/USDT.json").then(r => r.json());

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        userAddress = await signer.getAddress();
        walletAddressSpan.textContent = userAddress.slice(0, 6) + "..." + userAddress.slice(-4);
        referralLinkEl.value = `${location.origin}?ref=${userAddress}`;
      } else {
        alert("No wallet found. Please install MetaMask.");
      }
    } catch (err) {
      alert("Wallet connection failed: " + err.message);
    }
  };

  connectBtn.addEventListener("click", connectWallet);

  const getContracts = () => {
    const presale = new ethers.Contract(presaleContractAddress, presaleABI, signer);
    const utility = new ethers.Contract(utilityContractAddress, utilityABI, signer);
    const usdt = new ethers.Contract(usdtTokenAddress, usdtABI, signer);
    return { presale, utility, usdt };
  };

  buyBNBBtn.addEventListener("click", async () => {
    const amountInput = document.getElementById("bnbAmount");
    const amount = ethers.utils.parseEther(amountInput.value);
    const ref = new URLSearchParams(window.location.search).get("ref") || ethers.constants.AddressZero;
    const { presale } = getContracts();
    try {
      const tx = await presale.buyWithBNB(ref, { value: amount });
      await tx.wait();
      alert("Purchase successful");
    } catch (err) {
      alert("BNB Buy Failed: " + err.message);
    }
  });

  buyUSDTBtn.addEventListener("click", async () => {
    const amountInput = document.getElementById("usdtAmount");
    const rawAmount = ethers.utils.parseUnits(amountInput.value, 18);
    const ref = new URLSearchParams(window.location.search).get("ref") || ethers.constants.AddressZero;
    const { presale, usdt } = getContracts();
    try {
      const allowance = await usdt.allowance(userAddress, presaleContractAddress);
      if (allowance.lt(rawAmount)) {
        await usdt.approve(presaleContractAddress, ethers.constants.MaxUint256);
      }
      const tx = await presale.buyWithUSDT(rawAmount, ref);
      await tx.wait();
      alert("USDT Purchase successful");
    } catch (err) {
      alert("USDT Buy Failed: " + err.message);
    }
  });

  copyRefBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(referralLinkEl.value).then(() => alert("Referral copied!"));
  });

  checkRewardsBtn.addEventListener("click", async () => {
    const { utility } = getContracts();
    try {
      const rewards = await utility.getReferralRewards(userAddress);
      rewardResultEl.innerText = ethers.utils.formatEther(rewards) + " BHIXU";
    } catch (err) {
      alert("Error checking rewards: " + err.message);
    }
  });

  redeemRewardsBtn.addEventListener("click", async () => {
    const { utility } = getContracts();
    try {
      const tx = await utility.redeemRewards();
      await tx.wait();
      alert("Rewards redeemed successfully");
    } catch (err) {
      alert("Redeem failed: " + err.message);
    }
  });

  generateBotKeyBtn.addEventListener("click", async () => {
    const { utility } = getContracts();
    try {
      const key = await utility.getBotKey(userAddress);
      botKeyResultEl.innerText = key;
    } catch (err) {
      alert("Bot Key Error: " + err.message);
    }
  });

  // Countdown Timer
  const countdown = () => {
    const endTime = new Date("2025-07-31T23:59:59Z").getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = endTime - now;
      if (distance < 0) {
        clearInterval(interval);
        document.getElementById("countdown").innerText = "Presale Ended";
        return;
      }
      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const m = Math.floor((distance / (1000 * 60)) % 60);
      const s = Math.floor((distance / 1000) % 60);
      document.getElementById("countdown").innerText = `${d}d ${h}h ${m}m ${s}s`;
    }, 1000);
  };

  countdown();

  // Hamburger Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
});
