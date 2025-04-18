const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

function takeScreenshot(platform) {
  const filename = `screenshot_${Date.now()}.png`;
  const folder = process.env.CAVY_SCREENSHOT_DIR || 'screenshots';
  fs.mkdirSync(folder, { recursive: true });
  const fullPath = path.join(folder, filename);
  console.log(`Capturing screenshot to ${fullPath}`);

  if (platform === 'android') {
    exec(`adb exec-out screencap -p > ${fullPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error taking screenshot: ${error.message}`);
        return;
      }
      console.log(`Android screenshot saved as ${fullPath}`);
    });
  } else {
    exec(`xcrun simctl io booted screenshot ${filename}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error taking screenshot: ${error.message}`);
        return;
      }
      console.log(`iOS screenshot saved as ${fullPath}`);
    });
  }
}

module.exports = takeScreenshot;
