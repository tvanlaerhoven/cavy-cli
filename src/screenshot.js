const { exec } = require('child_process');
const path = require('path');

function takeScreenshot(platform) {
  const filename = `screenshot_${Date.now()}.png`;

  if (platform === 'android') {
    exec(`adb exec-out screencap -p > ${filename}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error taking screenshot: ${error.message}`);
        return;
      }
      console.log(`Android screenshot saved as ${path.resolve(filename)}`);
    });
  } else {
    exec(`xcrun simctl io booted screenshot ${filename}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error taking screenshot: ${error.message}`);
        return;
      }
      console.log(`iOS screenshot saved as ${path.resolve(filename)}`);
    });
  }
}

module.exports = takeScreenshot;
