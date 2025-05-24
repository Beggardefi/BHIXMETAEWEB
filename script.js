alert("DApp JS Loaded!");

if (typeof window.Web3Modal !== "undefined") {
  alert("Web3Modal is loaded!");
} else {
  alert("Web3Modal is NOT loaded!");
}

if (typeof window.ethers !== "undefined") {
  alert("Ethers.js is loaded!");
} else {
  alert("Ethers.js is NOT loaded!");
}
