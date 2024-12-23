// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
require('dotenv').config()
//import "dotenv/config";

describe('HEOnline_ImmatrikulationAusdrucken', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('firefox').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('HEOnline_ImmatrikulationAusdrucken', async function() {
    await driver.manage().setTimeouts({ implicit: 10000 });
    await driver.manage().window().setRect({ width: 1302, height: 923 })
    await driver.get("https://heonline.hs-esslingen.de/")

    await driver.wait(until.elementLocated(By.id("login-right-column")),10000)
    await driver.executeScript('document.getElementById("social-saml").scrollIntoView()')
    await driver.wait(until.elementLocated(By.id("social-saml")),10000)
    await driver.findElement(By.id("social-saml")).click()
    
    await driver.findElement(By.id("username")).sendKeys(process.env.loginname.toString())
    await driver.findElement(By.id("password")).sendKeys(process.env.loginpassword.toString())
    await driver.findElement(By.name("_eventId_proceed")).click()
    await driver.findElement(By.css("#co-access-wrapper-studreports_des_stu-st .ca-link")).click()
    const iframe = driver.findElement(By.css('iframe'));
    await driver.switchTo().frame(iframe);
    //const frame = driver.findElement(By.css('frame'))
    //await driver.switchTo().frame(frame)
    await driver.wait(until.elementLocated(By.css("#pageContent")),10000);
    const pageContent = await driver.findElement(By.css("#pageContent"))
    const printImmatrikulation = await pageContent.findElement(By.id("student_print_immat_button"))
    await printImmatrikulation.findElement(By.css("a")).click()
    let handles = await driver.getAllWindowHandles();

    await driver.switchTo().window(handles[1]);
    await driver.wait(until.elementsLocated(By.css(".page")),10000)
    let title = await driver.getTitle();
    let regexGerman = new RegExp("Immatrikulationsbescheinigung")
    let regexEnglish = new RegExp("Certificate of Enrollment")
    assert(regexGerman.test(title) || regexEnglish.test(title))
    console.log("Wir befinden uns auf einer Immatrikulationsbescheinigung: "+title)
  })
})
