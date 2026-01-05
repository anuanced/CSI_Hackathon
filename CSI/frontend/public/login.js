// UI Navigation: Show Register & Login Forms
document.getElementById("show-register").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("register-section").classList.remove("hidden");
});

document.getElementById("show-login").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("register-section").classList.add("hidden");
    document.getElementById("login-section").classList.remove("hidden");
});

// Initialize Camera for Face Authentication
async function startCamera(type) {
    try {
        const videoElement = document.getElementById(`${type}Video`);
        if (!videoElement.srcObject) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = stream;
        }
    } catch (error) {
        console.error(`Error accessing camera for ${type}:`, error);
        alert("Please allow camera access to use face authentication");
    }
}

// Start cameras when the page loads
document.addEventListener("DOMContentLoaded", async () => {
    await Promise.allSettled([startCamera("register"), startCamera("login")]);
});

// Capture an image from the video stream
async function captureImage(video) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg").split(",")[1]; // Convert image to Base64
}

// Registration Form Handler
document.getElementById("register-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;
    const aadhaarNumber = document.getElementById("register-aadhaar").value.trim();
    const accountNumber = `BANK${Math.floor(Math.random() * 1000000000)}`;
    const customerId = `CUST${Math.floor(Math.random() * 1000000)}`;

    try {
        const imageBase64 = await captureImage(document.getElementById("registerVideo"));
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("aadhaarNumber", aadhaarNumber);
        formData.append("accountNumber", accountNumber);
        formData.append("customerId", customerId);
        formData.append("image", dataURLtoBlob(imageBase64));

        const response = await axios.post("http://localhost:5000/register", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        alert(response.data.message);

        if (response.status === 200) {
            document.getElementById("register-form").reset();
            document.getElementById("show-login").click();
        }
    } catch (error) {
        console.error("Registration error:", error);
        alert("Error during registration. Please try again.");
    }
});

// Login Form Handler
document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    try {
        const imageBase64 = await captureImage(document.getElementById("loginVideo"));
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", dataURLtoBlob(imageBase64));

        const response = await axios.post("http://localhost:5000/login", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (response.data.token) {
            alert("Login Successful! Redirecting...");
            localStorage.setItem("token", response.data.token);
            window.location.href = "dashboard.html";
        } else {
            alert(response.data.error || "Login failed. Please try again.");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Error during login. Please try again.");
    }
});

// Utility function to convert Base64 to Blob
function dataURLtoBlob(dataURL) {
    const byteString = atob(dataURL);
    const arrayBuffer = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        arrayBuffer[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: "image/jpeg" });
}