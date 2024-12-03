document.getElementById("scan-btn").addEventListener("click", startScan);
document.getElementById("speed-test-btn").addEventListener("click", runSpeedTest);
document.getElementById("export-csv").addEventListener("click", exportCSV);
document.getElementById("export-pdf").addEventListener("click", exportPDF);

let isPasswordCorrect = false;

// Password Protection
document.getElementById("password-btn").addEventListener("click", function () {
    const passwordInput = document.getElementById("password-input");
    const password = passwordInput.value;
    if (password === "your-password") {
        isPasswordCorrect = true;
        document.getElementById("password-container").style.display = "none";
        document.getElementById("dashboard").classList.remove("hidden");
    } else {
        alert("Incorrect password!");
    }
});

// Scan Function
async function startScan() {
    if (!isPasswordCorrect) {
        alert("Please enter the correct password to start scanning.");
        return;
    }

    const scanButton = document.getElementById("scan-btn");
    scanButton.disabled = true;
    scanButton.textContent = "Scanning...";

    const progressContainer = document.getElementById("progress-container");
    const progressBar = document.getElementById("progress");
    const progressText = document.getElementById("progress-text");
    const resultsTable = document.getElementById("results-table");
    const resultsBody = document.getElementById("results-body");
    const chartsSection = document.getElementById("charts-section");

    progressBar.style.width = "0%";
    progressText.textContent = "Scanning... 0%";
    progressContainer.classList.remove("hidden");
    resultsTable.classList.add("hidden");
    chartsSection.classList.add("hidden");
    resultsBody.innerHTML = "";

    const devices = [
        { ip: "192.168.0.1", name: "Router", mac: "AA:BB:CC:DD:01", port: "80", type: "Networking Device", os: "Linux", status: "Active" },
        { ip: "192.168.0.2", name: "Laptop", mac: "AA:BB:CC:DD:02", port: "22", type: "PC", os: "Windows", status: "Active" },
    ];

    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Scanning... ${progress}%`;

        if (progress === 100) {
            clearInterval(interval);
            progressContainer.classList.add("hidden");
            resultsTable.classList.remove("hidden");
            chartsSection.classList.remove("hidden");
            displayResults(devices);
            scanButton.disabled = false;
            scanButton.textContent = "Start Scan";
        }
    }, 500);
}

function displayResults(devices) {
    const resultsBody = document.getElementById("results-body");
    devices.forEach(device => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${device.ip}</td>
            <td>${device.name}</td>
            <td>${device.mac}</td>
            <td>${device.port}</td>
            <td>${device.type}</td>
            <td>${device.os}</td>
            <td>${device.status}</td>
            <td><button onclick="viewDevice('${device.name}')">View</button></td>
        `;
        resultsBody.appendChild(row);
    });

    generateCharts(devices);
}

function viewDevice(name) {
    alert(`Viewing details for ${name}`);
}

function generateCharts(devices) {
    const ctx = document.getElementById("device-chart").getContext("2d");
    const data = {
        labels: devices.map(d => d.name),
        datasets: [{
            label: "Devices",
            data: devices.map(d => Math.random() * 100),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
        }]
    };

    new Chart(ctx, { type: "bar", data });
}

// Speed Test
function runSpeedTest() {
    const downloadSpeedElement = document.getElementById("download-speed");
    const uploadSpeedElement = document.getElementById("upload-speed");
    const pingElement = document.getElementById("ping");
    const resultsContainer = document.getElementById("speed-test-results");

    downloadSpeedElement.textContent = "50 Mbps";
    uploadSpeedElement.textContent = "10 Mbps";
    pingElement.textContent = "30 ms";

    resultsContainer.classList.remove("hidden");
}

// Export CSV
function exportCSV() {
    alert("Exporting data to CSV...");
}

// Export PDF
function exportPDF() {
    alert("Exporting data to PDF...");
}
