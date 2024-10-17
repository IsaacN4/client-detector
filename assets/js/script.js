'use strict';

function getOS() {
    const userAgent = window.navigator.userAgent;
    let os = "Unknown OS";

    if (userAgent.includes("Win")) os = "Windows";
    else if (userAgent.includes("Mac")) os = "Mac/iOS";
    else if (userAgent.includes("X11") || userAgent.includes("Linux")) os = "Linux";

    return os;
}

function getBrowser() {
    const userAgent = window.navigator.userAgent;
    let browser = "Unknown Browser";

    switch (true) {
        case /Opera|OPR/.test(userAgent):
            browser = "Opera";
            break;
        case /Chrome/.test(userAgent) && !/Edg/.test(userAgent):
            browser = "Chrome";
            break;
        case /Safari/.test(userAgent) && !/Chrome/.test(userAgent):
            browser = "Safari";
            break;
        case /Firefox/.test(userAgent):
            browser = "Firefox";
            break;
        case /Edg/.test(userAgent):
            browser = "Edge";
            break;
        default:
            browser = "Unknown Browser";
    }

    return browser;
}

function updateWindowInfo() {
    const width = document.querySelector(".width");
    const height = document.querySelector(".height");
    const orientation = document.querySelector(".orientation");

    width.textContent = `${window.innerWidth}px`;
    height.textContent = `${window.innerHeight}px`;
    orientation.textContent = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
}

function updateBatteryStatus(battery) {
    const batteryLevel = document.querySelector(".battery-level");
    const batteryStatus = document.querySelector(".battery-status");

    batteryLevel.textContent = `${Math.round(battery.level * 100)}%`;
    batteryStatus.textContent = battery.charging ? "charging" : "idle";
}

function setupBatteryUpdates() {
    if (navigator.getBattery) {
        navigator.getBattery().then((battery) => {
            updateBatteryStatus(battery);

            battery.addEventListener("levelchange", () => updateBatteryStatus(battery));
            battery.addEventListener("chargingchange", () => updateBatteryStatus(battery));
        });
    } else {
        document.querySelector(".battery-level").textContent = "not available";
        document.querySelector(".battery-status").textContent = "not available";
    }
}

function updateNetworkStatus() {
    const networkStatusText = document.querySelector(".network-status-text");

    if (navigator.onLine) {
        networkStatusText.textContent = "ONLINE";
        networkStatusText.classList.add("online");
        networkStatusText.classList.remove("offline");
    } else {
        networkStatusText.textContent = "OFFLINE";
        networkStatusText.classList.add("offline");
        networkStatusText.classList.remove("online");
    }
}

window.onload = () => {
    document.querySelector(".os").textContent = getOS();
    document.querySelector(".language").textContent = navigator.language || "Unknown Language";
    document.querySelector(".browser").textContent = getBrowser();

    updateWindowInfo();
    window.addEventListener("resize", updateWindowInfo);

    setupBatteryUpdates();

    updateNetworkStatus();
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);
};
