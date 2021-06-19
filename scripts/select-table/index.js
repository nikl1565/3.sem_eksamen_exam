import "../../sass/index.scss";
import QrScanner from "qr-scanner";
QrScanner.WORKER_PATH = "../../node_modules/qr-scanner/qr-scanner-worker.min.js";

const settings = {
    videoElement: document.querySelector("video"),
    tables: [
        {
            qrId: "qrzu",
            tableNumber: 1,
        },
        {
            qrId: "oiuy",
            tableNumber: 2,
        },
        {
            qrId: "hgfd",
            tableNumber: 3,
        },
        {
            qrId: "lkjh",
            tableNumber: 4,
        },
        {
            qrId: "qwer",
            tableNumber: 5,
        },
    ],
    modal: {
        template: document.querySelector(".t-modal"),
        success: {
            icon: "modal-success-icon.svg",
            title: "Success",
            subtitle: "Your table is",
            button: "Go to payment",
        },
        error: {
            icon: "modal-error-icon.svg",
            title: "Table not found",
            subtitle: "Please try again",
            button: "Try again",
        },
    },
};

document.addEventListener("DOMContentLoaded", start);

function start() {
    startQrScanner();
}

function startQrScanner() {
    // Grab video element where the camera / video feed is going to be
    const videoElement = document.querySelector("video");
    // Create new QrScanner
    const qrScanner = new QrScanner(videoElement, (result) => qrCodeDetected(result, qrScanner));
    qrScanner.start();
}

function qrCodeDetected(qrCode, qrScanner) {
    const tableList = settings.tables;

    // Check if qrCode is a table that exists in the list (settings)
    const isQrCodeATable = tableList.find((table) => table.qrId === qrCode);

    if (isQrCodeATable) {
        prepareModal("success");
        console.log(`Your table number is: ${isQrCodeATable.tableNumber}`);
        qrScanner.stop();
        return;
    }

    prepareModal("error");
}

function prepareModal(status) {
    const modal = settings.modal.template.content.cloneNode(true);
    const text = settings.modal[status];

    modal.querySelector("modal__button").textContent = text.button;

    console.log(modal);
}
