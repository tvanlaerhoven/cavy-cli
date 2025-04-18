const { exec } = require('child_process');
const fs = require('fs');

function takeScreenshot(platform) {
  const filename = `screenshot_${Date.now()}.png`;

  if (platform === 'android') {
    exec(`adb exec-out screencap -p > ${filename}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error taking screenshot: ${error.message}`);
        return;
      }
      console.log(`Android screenshot saved as ${filename}`);
    });
  } else {
    exec(`xcrun simctl io booted screenshot ${filename}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error taking screenshot: ${error.message}`);
        return;
      }
      console.log(`iOS screenshot saved as ${filename}`);
    });
  }
}

module.exports = takeScreenshot;
