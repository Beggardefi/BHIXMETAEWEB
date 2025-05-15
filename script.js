// ==== CONFIGURATION ====
const PRESALE_ADDRESS = "0xdC1E3E7F3502c7B3F47BB94F1C7f4B63934B6Cf3";
const BHIX_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_referrer",
				"type": "address"
			}
		],
		"name": "buyWithBNB",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_referrer",
				"type": "address"
			}
		],
		"name": "buyWithUSDT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimReferralReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_status",
				"type": "bool"
			}
		],
		"name": "pausePresale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_bhixToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_usdtToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endTime",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newPrice",
				"type": "uint256"
			}
		],
		"name": "PriceUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountBHIX",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "ref",
				"type": "address"
			}
		],
		"name": "Purchased",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newEndTime",
				"type": "uint256"
			}
		],
		"name": "updateEndTime",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newPrice",
				"type": "uint256"
			}
		],
		"name": "updateTokenPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bnb",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "usdt",
				"type": "uint256"
			}
		],
		"name": "Withdrawn",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "bhixToken",
		"outputs": [
			{
				"internalType": "contract IBEP20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "contributions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "contributors",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBNBPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "presalePaused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "referralRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "referrer",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "softCap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalRaisedUSD",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "usdtToken",
		"outputs": [
			{
				"internalType": "contract IBEP20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // 

const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // BSC Mainnet USDT
const USDT_ABI = [
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function allowance(address owner, address spender) public view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() view returns (uint8)"
];

let provider, signer, contract, userAddress;

// ==== INIT ====
async function init() {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(PRESALE_ADDRESS, BHIX_ABI, signer);
  userAddress = await signer.getAddress();

  // Generate referral link
  const referralLink = `${window.location.origin}?ref=${userAddress}`;
  document.getElementById("referralLink").value = referralLink;
}

// ==== CONNECT WALLET ====
document.getElementById("connectBtn").addEventListener("click", async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    await init();
    alert("Wallet Connected: " + userAddress);
  } else {
    alert("Install MetaMask to use this dApp!");
  }
});

// ==== BUY WITH BNB ====
document.getElementById("buyBNB").addEventListener("click", async () => {
  const bnbAmount = document.getElementById("bnbAmount").value;
  const ref = new URLSearchParams(window.location.search).get("ref") || ethers.constants.AddressZero;

  try {
    const tx = await contract.buyWithBNB(ref, { value: ethers.utils.parseEther(bnbAmount) });
    await tx.wait();
    alert("BNB Purchase Successful");
  } catch (error) {
    console.error(error);
    alert("BNB Purchase Failed");
  }
});

// ==== BUY WITH USDT ====
document.getElementById("buyUSDT").addEventListener("click", async () => {
  const usdtAmount = document.getElementById("usdtAmount").value;
  const ref = new URLSearchParams(window.location.search).get("ref") || ethers.constants.AddressZero;

  const usdt = new ethers.Contract(USDT_ADDRESS, USDT_ABI, signer);
  const decimals = await usdt.decimals();
  const amount = ethers.utils.parseUnits(usdtAmount, decimals);

  try {
    const allowance = await usdt.allowance(userAddress, PRESALE_ADDRESS);
    if (allowance.lt(amount)) {
      const tx1 = await usdt.approve(PRESALE_ADDRESS, amount);
      await tx1.wait();
    }

    const tx2 = await contract.buyWithUSDT(amount, ref);
    await tx2.wait();
    alert("USDT Purchase Successful");
  } catch (error) {
    console.error(error);
    alert("USDT Purchase Failed");
  }
});

// ==== COPY REFERRAL ====
function copyReferral() {
  const input = document.getElementById("referralLink");
  input.select();
  document.execCommand("copy");
  alert("Referral link copied!");
}

// ==== CHECK REWARDS ====
document.getElementById("checkRewards").addEventListener("click", async () => {
  try {
    const rewards = await contract.rewards(userAddress);
    document.getElementById("rewardResult").innerText = `My Rewards: ${ethers.utils.formatEther(rewards)} BHIXU`;
  } catch (err) {
    console.error(err);
    alert("Could not fetch rewards");
  }
});

// ==== REDEEM REWARDS ====
document.getElementById("redeemRewards").addEventListener("click", async () => {
  try {
    const tx = await contract.redeemRewards();
    await tx.wait();
    alert("Rewards Redeemed!");
  } catch (err) {
    console.error(err);
    alert("Redeem Failed");
  }
});

// ==== BOT KEY ====
document.getElementById("generateBotKey").addEventListener("click", async () => {
  try {
    const key = await contract.getBotKey(userAddress);
    document.getElementById("botKeyDisplay").innerText = `Your Bot Key: ${key}`;
  } catch (err) {
    console.error(err);
    alert("Bot key generation failed");
  }
});

// ==== COUNTDOWN TIMER ====
const countdownEl = document.getElementById("countdown");
const endTime = new Date("2025-07-31T23:59:59Z").getTime();
setInterval(() => {
  const now = Date.now();
  const diff = endTime - now;

  if (diff <= 0) {
    countdownEl.innerText = "Presale Ended";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// ==== WHITEPAPER SLIDER ====
const slides = [
  "Superhero Economy: Stake and earn with real impact.",
  "NFTs with Superpowers: Own, level up, and trade heroes.",
  "DAO Governance: Community decisions shape the future.",
  "Beggar-Free Mission: Ending poverty through web3."
];
let currentSlide = 0;

function showSlide(index) {
  document.getElementById("whitepaperSlide").innerText = slides[index];
}

document.getElementById("prevSlide").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});
document.getElementById("nextSlide").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

showSlide(currentSlide); // Initial slide

// ==== NAVBAR TOGGLE ====
document.getElementById("hamburger").addEventListener("click", () => {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("open");
});
