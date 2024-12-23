// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
require("dotenv").config();

describe('HEOnline_ModuleNochNichtBestanden', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('firefox').build()
    vars = {}
  })
  afterEach(async function() {
    //await driver.quit();
  })
  it('HEOnline_ModuleNochNichtBestanden', async function() {
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
    await driver.findElement(By.css("#co-access-wrapper-co_loc_zug_48513-st .ca-link")).click()
    await driver.wait(until.elementLocated(By.className("cm-curriculum-headline")),10000);
    let Abschnitte = await driver.findElements(By.css(".curriculum-element-card"))
    let AbschnitteAnzahl = await Abschnitte.length
    let AlleNichtBestandenen= [];
    for (var index = 0; index < AbschnitteAnzahl - 1; index++) {
        if (await Abschnitte[index].getCssValue('background-color') === "rgb(255, 255, 255)") {
            await Abschnitte[index].click()
            await driver.wait(until.elementsLocated(By.css(".curriculum-element-card")))
            await driver.executeScript('document.getElementsByClassName("cdk-virtual-scroll-viewport")[0].scrollBy(0, document.body.scrollHeight)')
            const ScrollTime = Date.now()
            //leider hardcoded, da keine andere warte möglichkeit
            await driver.wait(async () => {let zahl = await driver.findElements(By.css(".mat-mdc-card.mdc-card.curriculum-element-card")); return zahl.length >= 16})

            let Module = await driver.findElements(By.css(".mat-mdc-card.mdc-card.curriculum-element-card"))
            let ModulAnzahl = Module.length
            for (var modulindex = 0; modulindex < ModulAnzahl; modulindex++)
            {
                if (await Module[modulindex].getCssValue('background-color') === "rgb(255, 255, 255)") {
                    AlleNichtBestandenen.push(await Module[modulindex].findElement(By.css(".curriculum-element-name")).getText())
                }
            }
            await driver.navigate().back();
            await driver.wait(until.elementLocated(By.className("cm-curriculum-headline")),5000);
        }
    }
    console.log(AlleNichtBestandenen)
  }
)
})