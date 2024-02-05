/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Browser, Page } from "puppeteer";

export const startHotelScraping = async (
  page: Page,
  browser: Browser,
  location: string
) => {
  await page.setViewport({ width: 1920, height: 1080 });
  console.log("Page Viewport set.");
  await page.waitForSelector(".NhpT-mod-radius-base");
  console.log("Wait for selector complete.");
  await page.type(".NhpT-mod-radius-base:nth-child(2)", location);
  console.log("Page location typing complete.");
  const liSelector = "ul.EMAt li:first-child";
  await page.waitForSelector(liSelector);
  console.log("Page li selector complete.");
  await page.click(liSelector);
  console.log("Page li click complete.");
  const buttonSelector = "#main-search-form button[type='submit']";
  await page.waitForSelector(buttonSelector);
  console.log("Page button selector complete.");

  const [target] = await Promise.all([
    new Promise((resolve) => browser.once("targetcreated", resolve)),
    await page.click(buttonSelector),
  ]);

  const newPage = await target.page();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Timeout Complete. [New Page Open]");

  await newPage.bringToFront();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Timeout Complete. [Bring to Front]");

  // const client = await page.createCDPSession();
  // console.log('Waiting captcha to solve...');
  // const { status } = await client.send('Captcha.waitForSolve', {
  //     detectTimeout: 10000,
  // });
  // console.log('Captcha solve status:', status);
  //   await newPage.bringToFront();
  console.log("Starting Page Evalution");
  await new Promise((resolve) => setTimeout(resolve, 30000));

  return await newPage.evaluate(() => {
    // Your scraping logic goes here
    const hotels = [];
    const selectors = document.querySelectorAll(".yuAt");
    selectors.forEach((selector) => {
      const title = selector.querySelector(".IirT-header")?.innerText;

      const price = parseInt(
        (selector.querySelector(".D8J--price-container span")?.innerText || "")
          .replace(/[^\d]/g, "")
          .trim(),
        10
      );

      const photo = selector.querySelector(".e9fk-photoWrap img")?.src;
      if (title && price && photo) hotels.push({ title, price, photo });
    });

    return hotels;
  });
};
