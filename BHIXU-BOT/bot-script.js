async function submitApiKeys() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const wallet = await signer.getAddress();

  const apiKey = document.getElementById("apiKey").value;
  const apiSecret = document.getElementById("apiSecret").value;

  if (!apiKey || !apiSecret) {
    alert("Please enter both API Key and Secret");
    return;
  }

  // Send to your backend
  const res = await fetch('https://your-backend.com/api/bot-access', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ wallet, apiKey, apiSecret })
  });

  const data = await res.json();
  document.getElementById("response").innerText = data.message;
}
