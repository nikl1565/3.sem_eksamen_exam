import IMask from "imask";
import { startStaggerAnimation, startBasketAnimation } from "./animation";
import QrScanner from "qr-scanner";
QrScanner.WORKER_PATH = "scripts/qr-scanner-worker.min.js";
QrScanner.DEFAULT_CANVAS_SIZE = 220;

const settings = {
    qrScanner: document.querySelector(".qr-scanner"),
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
        },
        error: {
            icon: "modal-error-icon.svg",
            title: "Table not found",
            subtitle: "Please try again",
            button: "Try again",
        },
    },
};

export function startQrScanner() {
    // Grab video element where the camera / video feed is going to be
    const videoElement = document.querySelector("video");

    // Create new QrScanner
    const qrScanner = new QrScanner(videoElement, (result) => qrCodeDetected(result, qrScanner));
    qrScanner.start();

    const manuallyButton = document.querySelector("[data-modal=enter-qr-manually");
    manuallyButton.addEventListener("click", showModal);

    settings.qrScanner.classList.remove("is-hidden");
}

function hideQrScanner() {
    document.querySelector(".qr-scanner").classList.add("is-hidden");
}

function showQrScanner() {
    document.querySelector(".qr-scanner").classList.remove("is-hidden");
}

function showModal() {
    const clickedButton = this;
    const modalName = clickedButton.dataset.modal;
    const modal = document.querySelector(`.modal[data-modal=${modalName}`);

    clickedButton.removeEventListener("click", showModal);

    if (modal) {
        const allModals = document.querySelectorAll(`.modal[data-modal]`);
        allModals.forEach((modal) => modal.classList.add("is-hidden"));

        modal.classList.remove("is-hidden");
        return;
    }

    console.log("No modal attached to this button name");
}

function qrCodeDetected(qrCode, qrScanner) {
    const tableList = settings.tables;
    setTheme("light");
    qrScanner.stop();
    // Check if qrCode is a table that exists in the list (settings)
    const isQrCodeATable = tableList.find((table) => table.qrId === qrCode);

    if (isQrCodeATable) {
        const tableNumber = isQrCodeATable.tableNumber;
        prepareModal(tableNumber, "success");
        console.log(`Your table number is: ${isQrCodeATable.tableNumber}`);
        setTableNumberStorage(tableNumber);
        hideQrScanner();

        return;
    }

    prepareModal(null, "error");
    hideQrScanner();
}

async function prepareModal(tableNumber, status) {
    const modal = settings.modal.template.content.cloneNode(true);
    const text = settings.modal[status];
    const { title, subtitle, button, icon } = text;

    if (status === "success") {
        modal.querySelector(".modal").classList.add("is-success");
    } else {
        modal.querySelector(".modal").classList.add("is-error");
    }
    modal.querySelector(".modal__icon").src = icon;
    modal.querySelector(".modal__icon").alt = `${status} icon`;
    modal.querySelector(".modal__title").textContent = title;
    modal.querySelector(".modal__subtitle").textContent = subtitle;
    if (status === "success") {
        modal.querySelector(".modal__subtitle").textContent = `${subtitle} #${tableNumber}`;
        modal.querySelector(".modal__button").remove();
    } else {
        modal.querySelector(".modal__subtitle").textContent = subtitle;
        modal.querySelector(".modal__button").addEventListener("click", showModal);
        modal.querySelector(".modal__button").textContent = button;
    }

    // Show on screen
    document.querySelector("body").append(modal);

    if (status === "success") {
        setTimeout(isSuccess, 3000);
    }

    function showModal() {
        this.removeEventListener("click", showModal);
        startQrScanner();
        setTheme("dark");
        showQrScanner();
        hideModal();
    }

    function isSuccess() {
        hideModal();
        showHome();
    }

    function hideModal() {
        document.querySelector(`.modal.is-${status}`).remove();
    }

    function showHome() {
        startStaggerAnimation();
        startBasketAnimation();
    }
}

function setTheme(state) {
    document.documentElement.setAttribute("data-theme", state);
}

export function getTableNumberStorage() {
    return localStorage.getItem("tableNumber");
}

function setTableNumberStorage(tableNumber) {
    localStorage.setItem("tableNumber", tableNumber);
}
