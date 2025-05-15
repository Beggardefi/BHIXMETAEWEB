import presaleAbi from './abi/Presale.json' assert { type: 'json' };
import tokenAbi from './abi/BHIXU.json' assert { type: 'json' };

const presaleAddress = '0xdC1E3E7F3502c7B3F47BB94F1C7f4B63934B6Cf3';
const tokenAddress = '0x03Fb7952f51e0478A1D38a56F3021CFca8a739F6';

let provider, signer, presale, token, userAddress;

// Connect wallet
async function connectWallet() {
    if (!window.ethereum) return alert("Install MetaMask");

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    document.getElementById("connectButton").textContent = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;

    presale = new ethers.Contract(presaleAddress, presaleAbi, signer);
    token = new ethers.Contract(tokenAddress, tokenAbi, signer);

    showReferralLink();
    loadUserVesting();
}

document.getElementById("connectButton").addEventListener("click", connectWallet);

// Countdown
const countdownEl = document.getElementById("countdown");
const endDate = new Date("2025-07-31T23:59:59Z").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = endDate - now;
    if (diff <= 0) return countdownEl.textContent = "Presale Ended";

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    countdownEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Dynamic token price
const basePrice = 0.01;
const launchDate = new Date("2025-05-14T00:00:00Z").getTime();

function getCurrentPrice() {
    const now = new Date().getTime();
    const days = Math.floor((now - launchDate) / (1000 * 60 * 60 * 24));
    return (basePrice * Math.pow(1.0025, days)).toFixed(6);
}

function updatePriceUI() {
    document.getElementById("currentPrice").textContent = `$${getCurrentPrice()} per BHIX`;
}
setInterval(updatePriceUI, 60000);
updatePriceUI();

// Show referral link
function showReferralLink() {
    const link = `${location.origin}?ref=${userAddress}`;
    const el = document.getElementById("referralLink");
    el.value = link;
    el.readOnly = true;
}

// Copy referral
document.getElementById("copyReferral").addEventListener("click", () => {
    const el = document.getElementById("referralLink");
    navigator.clipboard.writeText(el.value);
    alert("Referral link copied!");
});

// Buy tokens
document.getElementById("buyBtn").addEventListener("click", async () => {
    const amount = parseFloat(document.getElementById("buyAmount").value || "0");
    const currency = document.querySelector("input[name='currency']:checked").value;
    if (!amount || amount <= 0) return alert("Invalid amount");

    const ref = new URLSearchParams(window.location.search).get("ref") || ethers.constants.AddressZero;
    const price = parseFloat(getCurrentPrice());
    const bhixAmount = (amount / price).toFixed(2);

    if (currency === "BNB") {
        const tx = await presale.buyWithBNB(ref, { value: ethers.utils.parseEther(amount.toString()) });
        await tx.wait();
    } else if (currency === "USDT") {
        const usdt = new ethers.Contract(await presale.USDT(), ["function approve(address,uint256) external returns (bool)"], signer);
        const amt = ethers.utils.parseUnits(amount.toString(), 18);
        await usdt.approve(presaleAddress, amt);
        const tx = await presale.buyWithUSDT(amt, ref);
        await tx.wait();
    }

    alert(`Purchased approx. ${bhixAmount} BHIX`);
    loadUserVesting();
});

// Redeem referral rewards
document.getElementById("redeemReward").addEventListener("click", async () => {
    const tx = await presale.claimReferralReward();
    await tx.wait();
    alert("Referral reward claimed.");
});

// Bot Key Generation
document.getElementById("generateBotKey").addEventListener("click", () => {
    if (!userAddress) return alert("Connect wallet first");
    const key = "BHIKX-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    document.getElementById("botKey").textContent = `Your Bot Key: ${key}`;
});

// Vesting Info
async function loadUserVesting() {
    if (!userAddress) return;

    const [total, claimed, nextTime] = await Promise.all([
        presale.tokenAllocated(userAddress),
        presale.claimed(userAddress),
        presale.nextUnlockTime(userAddress)
    ]);

    document.getElementById("myTokens").textContent = `Total: ${ethers.utils.formatUnits(total, 18)} BHIX`;
    document.getElementById("unlockedTokens").textContent = `Claimed: ${ethers.utils.formatUnits(claimed, 18)} BHIX`;
    document.getElementById("nextUnlock").textContent = `Next Unlock: ${new Date(nextTime * 1000).toLocaleDateString()}`;
}

// Whitepaper Slider
let currentSlide = 0;
const slides = document.querySelectorAll(".whitepaper-slide");

function showSlide(n) {
    slides.forEach((s, i) => s.style.display = (i === n ? "block" : "none"));
}

document.getElementById("prevSlide").addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});
document.getElementById("nextSlide").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

showSlide(currentSlide);
