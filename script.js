const video = document.getElementById('video');
const result = document.getElementById('result');

function onScanSuccess(decodedText, decodedResult) {
  // Handle on success condition with the decoded text or result.
  console.log(`Scan result: ${decodedText}`, decodedResult);
  result.innerText = `QR Code detected: ${decodedText}`;
  navigator.clipboard.writeText(decodedText).then(() => {
    console.log('Copied to clipboard');
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}

function onScanFailure(error) {
  // Handle scan failure, usually better to ignore and keep scanning.
  console.warn(`QR code scan error: ${error}`);
}

const html5QrCode = new Html5Qrcode("video");
Html5Qrcode.getCameras().then(cameras => {
  if (cameras && cameras.length) {
    const cameraId = cameras[0].id;
    html5QrCode.start(
      cameraId,
      {
        fps: 10,    // Optional, frame per seconds for qr code scanning
        qrbox: 250  // Optional, if you want bounded box UI
      },
      onScanSuccess,
      onScanFailure
    );
  }
}).catch(err => {
  console.error(`Error getting cameras: ${err}`);
});
