// Generate a QR Code
function generateQR() {
    const text = document.getElementById('text-input').value.trim();
    const output = document.getElementById('output');
    output.innerHTML = ""; // Clear previous output
  
    if (text === "") {
      alert("Please enter some text, a link, or a code!");
      return;
    }
  
    const qrCanvas = document.createElement('canvas');
    QRCode.toCanvas(qrCanvas, text, function (error) {
      if (error) {
        console.error(error);
        alert("Error generating QR Code. Try again!");
      }
      output.appendChild(qrCanvas);
    });
  }
  
  function generateBarcode() {
    const text = document.getElementById('text-input').value.trim();
    const output = document.getElementById('output');
    output.innerHTML = "";
  
    if (text === "") {
      alert("Please enter some text, a link, or a code!");
      return;
    }
  
    // Instead of creating manually, just create <svg id="barcode"></svg> inside HTML dynamically
    output.innerHTML = '<svg id="barcode"></svg>'; 
  
    JsBarcode("#barcode", text, {
      format: "CODE128",
      displayValue: true,
      fontOptions: "bold",
      fontSize: 18,
      height: 100,
      width: 2
    });
  }
  
  
  // Download QR Code or Barcode
  function downloadImage() {
    const output = document.getElementById('output');
    const canvas = output.querySelector('canvas');
    const svg = output.querySelector('svg');
  
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvas.toDataURL();
      link.click();
    } else if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const svgUrl = URL.createObjectURL(svgBlob);
      const link = document.createElement('a');
      link.download = 'barcode.svg';
      link.href = svgUrl;
      link.click();
    } else {
      alert("No code to download!");
    }
  }
  