import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";

// Create the monitor UI element
const createMonitorElement = () => {
    // Create main container
    const container = document.createElement("div");
    container.className = "amd-gpu-monitor";
    container.style.position = "absolute";
    container.style.top = "40px"; // Moved down to avoid toolbar
    container.style.right = "5px";
    container.style.zIndex = "1000";
    container.style.backgroundColor = "#1a1a1a";
    container.style.color = "#fff";
    container.style.padding = "10px";
    container.style.borderRadius = "5px";
    container.style.fontFamily = "monospace";
    container.style.fontSize = "12px";
    container.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    container.style.width = "220px";
    container.style.userSelect = "none";
    
    // Add title
    const title = document.createElement("div");
    title.style.fontWeight = "bold";
    title.style.marginBottom = "5px";
    title.style.display = "flex";
    title.style.alignItems = "center";
    title.style.justifyContent = "space-between";
    title.innerHTML = '<span style="color: #ff5555;">AMD GPU Monitor</span>';
    
    // Add collapse button
    const collapseButton = document.createElement("button");
    collapseButton.innerHTML = "−"; // Unicode minus sign
    collapseButton.style.background = "none";
    collapseButton.style.border = "none";
    collapseButton.style.color = "#888";
    collapseButton.style.cursor = "pointer";
    collapseButton.style.fontSize = "14px";
    collapseButton.style.padding = "0 5px";
    collapseButton.title = "Collapse/Expand";
    
    // Add close button
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "×"; // Unicode times sign
    closeButton.style.background = "none";
    closeButton.style.border = "none";
    closeButton.style.color = "#888";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "14px";
    closeButton.style.padding = "0 5px";
    closeButton.title = "Close";
    
    const buttonContainer = document.createElement("div");
    buttonContainer.appendChild(collapseButton);
    buttonContainer.appendChild(closeButton);
    
    title.appendChild(buttonContainer);
    container.appendChild(title);
    
    // Content container that can be collapsed
    const content = document.createElement("div");
    content.className = "amd-gpu-monitor-content";
    container.appendChild(content);
    
    // GPU Utilization section
    const gpuSection = document.createElement("div");
    gpuSection.style.marginBottom = "8px";
    
    const gpuLabel = document.createElement("div");
    gpuLabel.textContent = "GPU Utilization:";
    gpuLabel.style.marginBottom = "2px";
    
    const gpuBarContainer = document.createElement("div");
    gpuBarContainer.style.height = "15px";
    gpuBarContainer.style.backgroundColor = "#333";
    gpuBarContainer.style.borderRadius = "3px";
    gpuBarContainer.style.position = "relative";
    
    const gpuBar = document.createElement("div");
    gpuBar.className = "amd-gpu-utilization-bar";
    gpuBar.style.height = "100%";
    gpuBar.style.width = "0%";
    gpuBar.style.backgroundColor = "#47a0ff";
    gpuBar.style.borderRadius = "3px";
    gpuBar.style.transition = "width 0.5s ease-out, background-color 0.3s";
    
    const gpuText = document.createElement("div");
    gpuText.className = "amd-gpu-utilization-text";
    gpuText.textContent = "0%";
    gpuText.style.position = "absolute";
    gpuText.style.top = "0";
    gpuText.style.left = "5px";
    gpuText.style.lineHeight = "15px";
    gpuText.style.textShadow = "1px 1px 1px #000";
    
    gpuBarContainer.appendChild(gpuBar);
    gpuBarContainer.appendChild(gpuText);
    gpuSection.appendChild(gpuLabel);
    gpuSection.appendChild(gpuBarContainer);
    content.appendChild(gpuSection);
    
    // VRAM Usage section
    const vramSection = document.createElement("div");
    vramSection.style.marginBottom = "8px";
    
    const vramLabel = document.createElement("div");
    vramLabel.textContent = "VRAM Usage:";
    vramLabel.style.marginBottom = "2px";
    
    const vramBarContainer = document.createElement("div");
    vramBarContainer.style.height = "15px";
    vramBarContainer.style.backgroundColor = "#333";
    vramBarContainer.style.borderRadius = "3px";
    vramBarContainer.style.position = "relative";
    
    const vramBar = document.createElement("div");
    vramBar.className = "amd-vram-bar";
    vramBar.style.height = "100%";
    vramBar.style.width = "0%";
    vramBar.style.backgroundColor = "#47a0ff";
    vramBar.style.borderRadius = "3px";
    vramBar.style.transition = "width 0.5s ease-out, background-color 0.3s";
    
    const vramText = document.createElement("div");
    vramText.className = "amd-vram-text";
    vramText.textContent = "0MB / 0MB (0%)";
    vramText.style.position = "absolute";
    vramText.style.top = "0";
    vramText.style.left = "5px";
    vramText.style.lineHeight = "15px";
    vramText.style.textShadow = "1px 1px 1px #000";
    
    vramBarContainer.appendChild(vramBar);
    vramBarContainer.appendChild(vramText);
    vramSection.appendChild(vramLabel);
    vramSection.appendChild(vramBarContainer);
    content.appendChild(vramSection);
    
    // GTT / Unified RAM section (shown for APUs with dynamic unified memory)
    const gttSection = document.createElement("div");
    gttSection.style.marginBottom = "8px";
    gttSection.style.display = "none"; // hidden until we know it's an APU

    const gttLabel = document.createElement("div");
    gttLabel.className = "amd-gtt-label";
    gttLabel.textContent = "Unified RAM (GTT):";
    gttLabel.style.marginBottom = "2px";

    const gttBarContainer = document.createElement("div");
    gttBarContainer.style.height = "15px";
    gttBarContainer.style.backgroundColor = "#333";
    gttBarContainer.style.borderRadius = "3px";
    gttBarContainer.style.position = "relative";

    const gttBar = document.createElement("div");
    gttBar.className = "amd-gtt-bar";
    gttBar.style.height = "100%";
    gttBar.style.width = "0%";
    gttBar.style.backgroundColor = "#a78bfa"; // Purple to distinguish from VRAM
    gttBar.style.borderRadius = "3px";
    gttBar.style.transition = "width 0.5s ease-out, background-color 0.3s";

    const gttText = document.createElement("div");
    gttText.className = "amd-gtt-text";
    gttText.textContent = "0MB / 0MB (0%)";
    gttText.style.position = "absolute";
    gttText.style.top = "0";
    gttText.style.left = "5px";
    gttText.style.lineHeight = "15px";
    gttText.style.textShadow = "1px 1px 1px #000";

    gttBarContainer.appendChild(gttBar);
    gttBarContainer.appendChild(gttText);
    gttSection.appendChild(gttLabel);
    gttSection.appendChild(gttBarContainer);
    content.appendChild(gttSection);

    // Temperature section
    const tempSection = document.createElement("div");

    const tempLabel = document.createElement("div");
    tempLabel.textContent = "GPU Temperature:";
    tempLabel.style.marginBottom = "2px";
    
    const tempBarContainer = document.createElement("div");
    tempBarContainer.style.height = "15px";
    tempBarContainer.style.backgroundColor = "#333";
    tempBarContainer.style.borderRadius = "3px";
    tempBarContainer.style.position = "relative";
    
    const tempBar = document.createElement("div");
    tempBar.className = "amd-temp-bar";
    tempBar.style.height = "100%";
    tempBar.style.width = "0%";
    tempBar.style.backgroundColor = "#47a0ff";
    tempBar.style.borderRadius = "3px";
    tempBar.style.transition = "width 0.5s ease-out, background-color 0.3s";
    
    const tempText = document.createElement("div");
    tempText.className = "amd-temp-text";
    tempText.textContent = "0°C";
    tempText.style.position = "absolute";
    tempText.style.top = "0";
    tempText.style.left = "5px";
    tempText.style.lineHeight = "15px";
    tempText.style.textShadow = "1px 1px 1px #000";
    
    tempBarContainer.appendChild(tempBar);
    tempBarContainer.appendChild(tempText);
    tempSection.appendChild(tempLabel);
    tempSection.appendChild(tempBarContainer);
    content.appendChild(tempSection);
    
    // Add event listener for collapsing
    let isCollapsed = false;
    collapseButton.addEventListener("click", () => {
        if (isCollapsed) {
            content.style.display = "block";
            collapseButton.innerHTML = "−";
            isCollapsed = false;
        } else {
            content.style.display = "none";
            collapseButton.innerHTML = "+";
            isCollapsed = true;
        }
    });
    
    // Add event listener for closing
    closeButton.addEventListener("click", () => {
        container.style.display = "none";
        // Store the closed state in localStorage
        localStorage.setItem("amd-gpu-monitor-closed", "true");
    });
    
    // Make the monitor draggable
    let isDragging = false;
    let dragOffsetX, dragOffsetY;
    
    title.addEventListener("mousedown", (e) => {
        // Only handle main button (left button)
        if (e.button !== 0) return;
        
        isDragging = true;
        dragOffsetX = e.clientX - container.offsetLeft;
        dragOffsetY = e.clientY - container.offsetTop;
        
        // Prevent text selection during drag
        e.preventDefault();
    });
    
    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        
        const x = e.clientX - dragOffsetX;
        const y = e.clientY - dragOffsetY;
        
        // Keep monitor within window bounds
        const maxX = window.innerWidth - container.offsetWidth;
        const maxY = window.innerHeight - container.offsetHeight;
        
        container.style.left = Math.max(0, Math.min(x, maxX)) + "px";
        container.style.top = Math.max(0, Math.min(y, maxY)) + "px";
        
        // We're now positioning with left instead of right
        container.style.right = "auto";
    });
    
    document.addEventListener("mouseup", () => {
        isDragging = false;
        
        // Save position to localStorage
        if (container.style.left && container.style.top) {
            localStorage.setItem("amd-gpu-monitor-position", JSON.stringify({
                left: container.style.left,
                top: container.style.top
            }));
        }
    });
    
    // Load saved position if available
    const savedPosition = localStorage.getItem("amd-gpu-monitor-position");
    if (savedPosition) {
        try {
            const { left, top } = JSON.parse(savedPosition);
            container.style.left = left;
            container.style.top = top;
            container.style.right = "auto";
        } catch (e) {
            // Silently fail and use default position
        }
    }
    
    // Check if monitor was closed previously
    if (localStorage.getItem("amd-gpu-monitor-closed") === "true") {
        container.style.display = "none";
    }
    
    // Add a button to show the monitor again
    const showButton = document.createElement("button");
    showButton.textContent = "Show AMD GPU Monitor";
    showButton.style.position = "fixed";
    showButton.style.top = "5px";
    showButton.style.right = "5px";
    showButton.style.zIndex = "999";
    showButton.style.padding = "5px";
    showButton.style.borderRadius = "3px";
    showButton.style.backgroundColor = "#333";
    showButton.style.color = "#fff";
    showButton.style.border = "none";
    showButton.style.fontSize = "12px";
    showButton.style.cursor = "pointer";
    showButton.style.display = "none";
    
    showButton.addEventListener("click", () => {
        container.style.display = "block";
        showButton.style.display = "none";
        localStorage.removeItem("amd-gpu-monitor-closed");
    });
    
    document.body.appendChild(showButton);
    
    // Toggle showButton visibility based on monitor visibility
    const updateShowButtonVisibility = () => {
        if (container.style.display === "none") {
            showButton.style.display = "block";
        } else {
            showButton.style.display = "none";
        }
    };
    
    // Create a MutationObserver to watch for changes to container's display style
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === "style") {
                updateShowButtonVisibility();
            }
        });
    });
    
    observer.observe(container, { attributes: true });
    
    // Initial visibility check
    updateShowButtonVisibility();
    
    return { container, gpuBar, gpuText, vramBar, vramText, vramLabel, vramSection, gttBar, gttText, gttSection, gttLabel, tempBar, tempText };
};

const formatMemText = (usedMB, totalMB, percent) => {
    if (totalMB >= 1024) {
        return `${(usedMB / 1024).toFixed(1)}GB / ${(totalMB / 1024).toFixed(1)}GB (${percent}%)`;
    }
    return `${usedMB}MB / ${totalMB}MB (${percent}%)`;
};

const barColor = (percent, low = '#47a0ff', mid = '#ffad33', high = '#ff4d4d', midThresh = 70, highThresh = 85) => {
    if (percent > highThresh) return high;
    if (percent > midThresh) return mid;
    return low;
};

// Update the monitor UI with new data
const updateMonitorUI = (monitor, data) => {
    // Check if we have GPU data
    if (!data || !data.gpus || data.gpus.length === 0) return;

    const gpu = data.gpus[0]; // Use the first GPU
    const isAPU = !!gpu.is_apu;

    // Update GPU utilization
    if (monitor.gpuBar && monitor.gpuText) {
        const utilization = gpu.gpu_utilization || 0;
        monitor.gpuBar.style.width = `${utilization}%`;
        monitor.gpuText.textContent = `${utilization}%`;
        monitor.gpuBar.style.backgroundColor = barColor(utilization, '#47a0ff', '#ffad33', '#ff4d4d', 50, 80);
    }

    // Update VRAM usage — on APUs this is a small pre-allocated pool; label accordingly
    if (monitor.vramBar && monitor.vramText) {
        const vramPercent = gpu.vram_used_percent || 0;
        const vramUsed = gpu.vram_used || 0;
        const vramTotal = gpu.vram_total || 1;

        monitor.vramBar.style.width = `${vramPercent}%`;
        monitor.vramText.textContent = formatMemText(vramUsed, vramTotal, vramPercent);
        monitor.vramBar.style.backgroundColor = barColor(vramPercent);

        // On APUs, VRAM is just the small reserved pool — label it clearly
        if (monitor.vramLabel) {
            monitor.vramLabel.textContent = isAPU ? "VRAM (reserved pool):" : "VRAM Usage:";
        }
    }

    // Show/update GTT (unified RAM) section for APUs
    if (monitor.gttSection) {
        const hasGTT = (gpu.gtt_total || 0) > 0;
        monitor.gttSection.style.display = (isAPU && hasGTT) ? "block" : "none";

        if (isAPU && hasGTT && monitor.gttBar && monitor.gttText) {
            const gttPercent = gpu.gtt_used_percent || 0;
            const gttUsed = gpu.gtt_used || 0;
            const gttTotal = gpu.gtt_total || 1;

            monitor.gttBar.style.width = `${gttPercent}%`;
            monitor.gttText.textContent = formatMemText(gttUsed, gttTotal, gttPercent);
            // Purple baseline; warn orange/red as system RAM fills up
            monitor.gttBar.style.backgroundColor = barColor(gttPercent, '#a78bfa', '#ffad33', '#ff4d4d');
        }
    }

    // Update temperature
    if (monitor.tempBar && monitor.tempText) {
        const temp = gpu.gpu_temperature || 0;
        const tempPercent = Math.min(temp, 100);
        monitor.tempBar.style.width = `${tempPercent}%`;
        monitor.tempText.textContent = `${temp}°C`;
        monitor.tempBar.style.backgroundColor = barColor(temp, '#47a0ff', '#ffad33', '#ff4d4d', 60, 80);
    }
};

// Main app function
const main = () => {
    // Create the monitor UI
    const monitor = createMonitorElement();
    document.body.appendChild(monitor.container);
    
    // Set up WebSocket listener for GPU updates
    api.addEventListener("amd_gpu_monitor", (event) => {
        updateMonitorUI(monitor, event.detail);
    });
};

// Wait for DOM to be loaded
app.registerExtension({
    name: "amd.gpu.monitor",
    async setup() {
        // Wait a bit for the UI to be fully loaded
        setTimeout(main, 1000);
    },
});
