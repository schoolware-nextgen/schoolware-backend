const { default: axios } = require('axios');
var express = require('express');
const { chromium } = require('playwright');

var router = express.Router();

router.post('/microsoft', async function (req, res, next) {

  const user = req.body.user;
  const password = req.body.password;
  if (typeof (user) != 'string' || typeof (password) != 'string') {
    res.status(400).send(`send user and password`);
    return;
  }

  const browser = await chromium.launch(headless = false);

  const context = await browser.newContext(
    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0")
  await context.setDefaultTimeout(25000);
  const page = await context.newPage()
  try {
    await page.goto('https://kov.schoolware.be/webleerling/start.html#!fn=llagenda');
    await page.locator("#ext-comp-1014-btnEl").click()
    await page.getByRole("textbox").fill(user)
    await page.getByText("Next").click()
    await page.getByPlaceholder("Password").fill(password)
    await page.getByText("Sign In").click()
    await page.waitForLoadState()
    let cookies = await context.cookies("https://kov.schoolware.be");
    console.log(cookies[0].name)
    console.log(cookies[0].value)
    res.send(`${cookies[0].value}`);
    await context.close();
    await browser.close();
  } catch (err) {
    console.log(err);
    res.status(500).send("error getting token");
    await context.close();
    await browser.close();
  }
});


router.post('/schoolware', async function (req, res, next) {
  const user = req.body.user;
  const password = req.body.password;
  if (typeof (user) != 'string' || typeof (password) != 'string') {
    res.status(400).send(`send user and password`);
    return;
  }
  let url = 'https://kov.schoolware.be/webleerling/bin/server.fcgi/RPC/ROUTER/';
  
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{"action":"WisaUserAPI","method":"Authenticate","data":["${user}","${password}"],"type":"rpc","tid":1}`
  };
  
  const response = await fetch(url, options)
  
  let cookie = response.headers.getSetCookie()[0].split(";")[0].split("=")[1];
  console.log(cookie);
  res.send(`${cookie}`);
});

module.exports = router;







