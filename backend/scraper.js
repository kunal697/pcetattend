const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());

app.post('/api/attendance', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Go to the login page
    await page.goto('https://learner.pceterp.in/', { waitUntil: 'networkidle2' });

    // Log in using provided credentials
    await page.type('input[type="text"]', username);
    await page.type('input[type="password"]', password);

    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 }), // 10 seconds timeout
    ]);

    // Check if login was successful
    const isLoggedIn = await page.evaluate(() => {
      // Replace this selector with one that is only present when logged in
      return !document.querySelector('.login-error'); 
    });

    if (!isLoggedIn) {
      await browser.close();
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Navigate to the attendance page
    await page.goto('https://learner.pceterp.in/attendance', { waitUntil: 'networkidle2' });

    // Scrape the attendance data
    const attendanceData = await page.evaluate(() => {
      const data = [];
      document.querySelectorAll('.v-card').forEach(card => {
        const studentInfo = card.querySelector('.overflow-text-dot')?.innerText.trim();
        const progress = card.querySelector('.v-progress-circular__content')?.innerText.trim();
        const course = card.querySelector('.v-col-sm-5 .pb-5')?.innerText.trim();
        const type = card.querySelector('.v-chip__content')?.innerText.trim();
        const lecturesElement = card.querySelector('span > span');
        const lecturesText = lecturesElement ? lecturesElement.innerText.trim() : '0 / 0';
        const [lecturesAttended, totalLectures] = lecturesText.split(' / ').map(Number);

        if (studentInfo && progress && course && type) {
          data.push({
            studentInfo,
            progress,
            course,
            type,
            lecturesAttended,
            totalLectures
          });
        }
      });
      return data;
    });

    console.log('Attendance Data:', attendanceData);

    await browser.close();
    res.json(attendanceData);
  } catch (error) {
    console.error('Error scraping data:', error);
    res.status(500).json({ error: 'Failed to scrape data' });
  } finally {
    if (browser && browser.isConnected()) {
      await browser.close();
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
