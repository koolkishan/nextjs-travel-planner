// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  DestinationDetailsType,
  DestinationItineraryType,
  DetailedIntinearyType,
  PackageIteniaryType,
} from "@/types/trip";
import { Page } from "puppeteer";
interface PackageType {
  id: string;
  name: string;
  nights: number;
  days: number;
  inclusions: string[];
  price: number;
}

interface PackageDetailsType {
  description: string;
  images: string[];
  themes: string[];
  detailedIntineary: DetailedIntinearyType[];
  destinationItinerary: DestinationItineraryType[];
  destinationDetails: DestinationDetailsType[];
  packageIteniary: PackageIteniaryType[];
}

export const startPackageScraping = async (page: Page, pkg: PackageType) => {
  console.log("in start package scraping");
  const packageDetails = await page.evaluate(() => {
    const packageDetails: PackageDetailsType = {
      description: "",
      images: [],
      themes: [],
      detailedIntineary: [],
      destinationItinerary: [],
      destinationDetails: [],
      packageIteniary: [],
    };
    console.log("in evalute");
    const packageElement = document.querySelector("#main-container");
    const descriptionSelector = packageElement?.querySelector("#pkgOverView");
    const regex = new RegExp("Yatra", "gi");
    descriptionSelector?.querySelector(".readMore")?.click();
    packageDetails.description = packageElement
      ?.querySelector("#pkgOverView p")
      ?.innerHTML.replace(regex, "Arklyte") as string;

    packageDetails.images = Array.from(
      packageElement?.querySelectorAll(".galleryThumbImg")
    ).map((imageElement) =>
      imageElement
        .getAttribute("src")
        ?.replace("/t_holidays_responsivedetailsthumbimg", "")
    ) as string[];

    const themesSelector = packageElement?.querySelector("#packageThemes");
    packageDetails.themes = Array.from(
      themesSelector?.querySelectorAll("li")
    ).map((li) => li.innerText.trim());

    const descriptions: DetailedIntinearyType[] = [];

    // Select all day elements
    const dayElements = packageElement?.querySelectorAll(
      ".itineraryOverlay .subtitle"
    );

    dayElements?.forEach((dayElement) => {
      const title = dayElement.textContent!.trim();
      const value = [];

      // Get the next sibling elements until the next day element
      let nextElement = dayElement.nextElementSibling;
      while (nextElement && !nextElement.classList.contains("subtitle")) {
        const textContent = nextElement.textContent!.trim();
        if (textContent) {
          value.push(textContent);
        }
        nextElement = nextElement.nextElementSibling;
      }

      // Push the title and value into the result array
      descriptions.push({ title, value });
    });
    console.log({ packageDetails });
    packageDetails.detailedIntineary = descriptions;

    // For destination Iteniary
    const destinationItinerary: { place: string; totalNights: number }[] = [];
    const destinationItinerarySelector =
      packageElement?.querySelectorAll(".type-list li");

    destinationItinerarySelector?.forEach((element) => {
      const placeElement = element.firstChild;
      const placeText = placeElement
        ?.textContent!.trim()
        .replace(/[\n\t]/g, "");

      const nightsElement = element.querySelector("span");
      let totalNights = 0;

      if (nightsElement) {
        const nightsText = nightsElement?.textContent!.trim();
        const nightsMatch = nightsText.match(/\d+/);
        totalNights = nightsMatch ? parseInt(nightsMatch[0]) : 0;
      }

      destinationItinerary.push({ place: placeText!, totalNights });
    });

    packageDetails.destinationItinerary = destinationItinerary;

    const cities: { name: string; description: string; image: string }[] = [];

    // Click on "Read More" for the first city
    const readMoreButton = document.getElementById("readMore");
    if (readMoreButton) {
      readMoreButton.click();
    }

    const cityElements = document.querySelectorAll(".tabbing a");
    cityElements.forEach((cityElement) => {
      // Click on the city tab to load its description
      cityElement.click();

      // Click on "Read More" if available
      const readMoreButtonCity = document.getElementById("readMore");
      if (readMoreButtonCity) {
        readMoreButtonCity.click();
      }

      const cityName = cityElement?.textContent!.trim();
      const cityDescription = document
        .getElementById("aboutDestPara")
        ?.textContent!.trim();
      const cityImage = document
        .querySelector(".info-block img")!
        .getAttribute("src");

      cities.push({
        name: cityName,
        description: cityDescription!,
        image: cityImage!,
      });
    });

    packageDetails.destinationDetails = cities;

    const dataExtracted: PackageIteniaryType[] = [];
    const timeline = document.querySelector(".time-line .right-column");
    const articles = timeline?.querySelectorAll("article");

    articles?.forEach((article) => {
      const cityNameElement = article.querySelector(
        ".title.row.acc-title .first.ng-binding"
      );
      const cityName = cityNameElement
        ? cityNameElement?.textContent!.trim()
        : "";
      const daysSelector = article.querySelectorAll(".days.acc-content");
      const daysActivity: {
        activityType: string;
        activityDescription: string;
      }[][] = [];

      daysSelector.forEach((daySelector) => {
        const activityElements = daySelector.querySelectorAll(".items-content");
        const activities: {
          activityType: string;
          activityDescription: string;
        }[] = [];
        // Check if any activity elements exist
        if (activityElements.length > 0) {
          // Loop through each activity element
          activityElements.forEach((activityElement, index) => {
            // Extract activity type
            const activityTypeElement =
              activityElement.querySelector(".content.left.ico");
            const activityType = activityTypeElement
              ? activityTypeElement
                  ?.textContent!.trim()
                  .split(" ")[0]
                  .split(" ")[0]
                  .split("\n")[0]
              : `Activity ${index + 1}`;

            let activityDescription = null;

            if (activityType === "MEAL" || activityType === "SIGHTSEEING") {
              const listHolder = activityElement.querySelector(".list-holder");

              // Check if the list-holder element exists
              if (listHolder) {
                // Extract li elements
                const liElements = listHolder.querySelectorAll("li.ng-scope");

                // Check if any li elements exist
                if (liElements.length > 0) {
                  // Create an array to store scraped data
                  const scrapedData: { index: number; text: string }[] = [];

                  // Loop through each li element and extract text content
                  liElements.forEach((liElement, index) => {
                    const liText = liElement?.textContent!.trim();
                    scrapedData.push({ index: index + 1, text: liText });
                  });

                  // Log the scraped data
                  activityDescription = scrapedData;
                }
              }
            } else if (activityType === "HOTEL") {
              // Extract activity description
              const activityDescriptionElement = activityElement.querySelector(
                ".content.right .name a"
              );
              activityDescription = activityDescriptionElement
                ? activityDescriptionElement?.textContent!.trim()
                : null;
            } else if (activityType === "FLIGHT") {
              const places =
                activityElement.querySelectorAll(".place span.full");

              const scrappedData: string[] = [];
              places.forEach((place) => {
                scrappedData.push(place?.textContent!.trim());
              });
              activityDescription = scrappedData;
            }
            // Log the results

            activities.push({ activityType, activityDescription });
          });
        }
        daysActivity.push(activities);
      });

      dataExtracted.push({
        city: cityName,
        daysActivity,
      });
    });

    packageDetails.packageIteniary = dataExtracted;

    return packageDetails;
  });

  const details = { ...pkg, ...packageDetails };
  return details;
};
