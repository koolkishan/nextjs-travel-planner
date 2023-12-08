export const startHotelScraping = async (
  page: any,
  browser: any,
  location: string
) => {
  await page.setViewport({ width: 1920, height: 1080 });
  await page.waitForSelector(".NhpT-mod-radius-base");
  await page.type(".NhpT-mod-radius-base:nth-child(2)", location);
  const liSelector = "ul.EMAt li:first-child";
  await page.waitForSelector(liSelector);
  await page.click(liSelector);
  const buttonSelector = "#main-search-form button[type='submit']";
  await page.waitForSelector(buttonSelector);

  const [target] = await Promise.all([
    new Promise((resolve) => browser.once("targetcreated", resolve)),
    await page.click(buttonSelector),
  ]);

  const newPage = await target.page();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await newPage.bringToFront();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  //   await newPage.bringToFront();

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
