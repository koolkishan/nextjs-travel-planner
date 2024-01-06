/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Page } from "puppeteer";

interface PackageInfo {
  id: string | null;
  name: string;
  nights: number;
  days: number;

  inclusions: string[];
  price: number;
}

export const startLocationScraping = async (
  page: Page
): Promise<PackageInfo[]> => {
  return await page.evaluate(() => {
    const packageElements = document.querySelectorAll(".packages-container");

    const packages: PackageInfo[] = [];

    packageElements.forEach((packageElement) => {
      const packageInfo: PackageInfo = {
        id: null,
        name: "",
        nights: 0,
        days: 0,
        // destinationItinerary: "",
        inclusions: [],
        price: 0,
        // image: "",
      };

      const nameElement = packageElement.querySelector(
        ".package-name a"
      ) as HTMLAnchorElement;
      const href = nameElement.getAttribute("href");
      const packageIdMatch = href?.match(/packageId=([^&]+)/);
      packageInfo.id = packageIdMatch ? packageIdMatch[1] : null;

      // Extracting package name
      packageInfo.name =
        (packageElement.querySelector(".package-name a") as HTMLElement)
          .textContent || "";

      // Extracting package duration in nights and days
      const durationElement = packageElement.querySelector(".package-duration");
      packageInfo.nights = parseInt(
        (durationElement?.querySelector(".nights span") as HTMLElement)
          ?.textContent || 0
      );
      packageInfo.days = parseInt(
        (durationElement?.querySelector(".days span") as HTMLElement)
          ?.textContent || 0
      );

      // Extracting destination itinerary
      // const destinationsElement = packageElement.querySelector(
      //   ".package-destinations"
      // );
      // packageInfo.destinationItinerary =
      //   destinationsElement?.textContent?.trim() || "";

      // Extracting package inclusions
      const inclusionsElement = packageElement.querySelector(
        ".package-inclusions"
      );
      const inclusionItems = Array.from(
        inclusionsElement?.querySelectorAll("li") || []
      ).map(
        (item) =>
          (item.querySelector(".icon-name") as HTMLElement)?.textContent || ""
      );
      packageInfo.inclusions = inclusionItems;

      // // Extracting package price
      const priceElement = packageElement.querySelector(".final-price .amount");
      packageInfo.price =
        parseInt(priceElement?.textContent?.replace(/,/g, "")) || 0;

      packages.push(packageInfo);
    });

    return packages;
  });
};
