import "../../sass/index.scss";
import QrScanner from "qr-scanner";
QrScanner.WORKER_PATH = "../../node_modules/qr-scanner/qr-scanner-worker.min.js";

// Webcam / Camera scan

const videoElement = document.querySelector("video");

const qrScanner = new QrScanner(videoElement, (result) => console.log("decoded qr code:", result));
qrScanner.start();

// // Image scan
// const image = "../../qr-test.png";

// QrScanner.scanImage(image)
//     .then((result) => console.log(result))
//     .catch((error) => console.log(error || "No QR code found."));
