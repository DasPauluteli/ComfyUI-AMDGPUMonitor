# AMD GPU Monitor for ComfyUI

A simple, lightweight AMD GPU monitoring tool for ComfyUI that displays real-time information about your AMD GPU directly in the UI. Supports both discrete AMD GPUs and APUs with unified memory (e.g. Strix Halo / gfx1151).

![AMD GPU Monitor Screenshot](https://github.com/iDAPPA/ComfyUI-AMDGPUMonitor/raw/main/screenshot.png)
![AMD APU Monitor Screenshot](https://github.com/iDAPPA/ComfyUI-AMDGPUMonitor/blob/main/screenshot2.png)

## Features

- Real-time GPU utilization monitoring (%)
- VRAM usage tracking (both in MB/GB and percentage)
- **GTT / Unified RAM tracking for APUs** — dynamically allocated system RAM used as GPU memory (shown automatically on APUs like Strix Halo)
- GPU temperature monitoring (°C)
- Automatic APU detection — relabels VRAM as "reserved pool" and shows the GTT pool as "Unified RAM" for APUs
- Color-coded indicators (blue for low, orange for medium, red for high usage)
- Draggable, collapsible, and closable UI
- Position persistence between sessions
- Works with ROCm-enabled GPUs and APUs
- Tested with AMD Radeon RX 7900 XTX (discrete) and Strix Halo APU (gfx1151)

## Installation

1. Clone the repository into your ComfyUI custom nodes directory:

```bash
cd /path/to/ComfyUI/custom_nodes
git clone https://github.com/iDAPPA/ComfyUI-AMDGPUMonitor.git
```

2. Restart ComfyUI

## Requirements

- An AMD GPU with ROCm support
- `rocm-smi` or `amd-smi` command-line tools installed and accessible in your PATH
- ComfyUI running on a Linux system with ROCm drivers

## Usage

No setup is required. Once installed, the monitor will automatically appear in the top-right corner of ComfyUI's interface.

### Monitor Features:

- **Drag**: Click and hold the title bar to move the monitor anywhere on the screen
- **Collapse/Expand**: Click the "−" button to collapse the monitor to just the title bar
- **Close**: Click the "×" button to close the monitor (a "Show AMD GPU Monitor" button will appear to bring it back)

## APU / Unified Memory Support

On AMD APUs with dynamically allocated unified memory (e.g. **Strix Halo / gfx1151**, Phoenix, Hawk Point, Rembrandt, etc.), the GPU does not have a fixed VRAM pool. Instead, it uses system RAM via the **GTT (Graphics Translation Table)** pool managed by the kernel's TTM subsystem.

The monitor detects this automatically and:

- Shows a **"Unified RAM (GTT)"** bar (purple) representing the system RAM currently mapped for GPU use
- Relabels the VRAM bar as **"VRAM (reserved pool)"** to clarify it is just a small pre-allocated chunk, not the full available memory
- APU detection uses device name matching (Strix, Phoenix, Hawk Point, etc.) and a size heuristic (GTT ≥ 4× VRAM and VRAM < 8 GB)

## How It Works

This extension polls `rocm-smi` (or `amd-smi`) in a background thread to collect GPU information and pushes updates to the frontend via WebSocket. The floating UI is updated in real time and does not affect ComfyUI or GPU performance.

## Troubleshooting

If the monitor doesn't appear or doesn't show any data:

1. Check if `rocm-smi` is installed and working by running it in a terminal
2. Make sure your AMD GPU is properly detected by the system
3. Verify that you're running ComfyUI with ROCm support
4. Check the browser console for any JavaScript errors

## Credits

- Inspired by the GPU monitoring in [ComfyUI-Crystools](https://github.com/crystian/ComfyUI-Crystools)
- Created with the help of Claude AI

## License

MIT License
