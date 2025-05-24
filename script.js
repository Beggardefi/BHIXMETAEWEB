// Minimal test for Web3Modal and Ethers.js
alert("DApp JS Loaded!");

console.log("window.Web3Modal:", window.Web3Modal);
console.log("window.ethers:", window.ethers);

const projectId = "9bb77bfd32a850e43324d0b8c8ff41dc";
const chains = [{
  chainId: 56,
  name: "Binance Smart Chain",
  rpcUrl: "https://bsc-dataseed.binance.org/"
}];
const metadata = {
  name: "BHIKX Test DApp",
  description: "Testing WalletConnect",
  url: "https://beggardefi.github.io/BHIXMETAEWEB/",
  icons: []
};

const web3Modal = new window.Web3Modal({
  projectId,
  walletConnectVersion: 2,
  themeMode: "dark",
  chains,
  metadata
});

document.getElementById("connectBtn")?.addEventListener("click", async () => {
  alert("Connect Button Clicked!");
  try {
    const ethereumProvider = await web3Modal.connect();
    const provider = new window.ethers.providers.Web3Provider(ethereumProvider);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    alert("Wallet Connected: " + address);
  } catch (err) {
    alert("Error: " + err.message);
  }
});
