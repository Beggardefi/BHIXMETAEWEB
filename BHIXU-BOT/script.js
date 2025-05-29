async function checkBotAccess() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const userAddress = await signer.getAddress();

  const contract = new ethers.Contract(
    '0x7380Be8D02b767D6E1071FD562222A15F512D5a6',
    bhixUtilityABI,
    provider
  );

  const access = await contract.hasBotAccess(userAddress);

  const status = document.getElementById("bot-status");
  const keyBox = document.getElementById("bot-key-box");
  const keyText = document.getElementById("bot-key");

  if (access) {
    status.innerText = "✅ You have access to the BHIX Trading Bot!";
    keyBox.style.display = "block";

    // Generate or show their access key (you can fetch this from backend later)
    const generatedKey = userAddress.slice(0, 6) + "..." + userAddress.slice(-4); // Simple example
    keyText.innerText = generatedKey;
  } else {
    status.innerText = "❌ You do not have bot access yet. Please stake required amount to unlock.";
  }
}
