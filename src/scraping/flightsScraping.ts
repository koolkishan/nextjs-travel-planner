/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Page } from "puppeteer";

interface Flight {
  airlineLogo: string;
  departureTime: string;
  arrivalTime: string;
  flightDuration: string;
  airlineName: string;
  price: number;
}

export const startFlightScraping = async (page: Page): Promise<Flight[]> => {
  return await page.evaluate(async (): Promise<Flight[]> => {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const flights: Flight[] = [];

    const flightSelectors = document.querySelectorAll(".nrc6-wrapper");

    flightSelectors.forEach((flightElement) => {
      const airlineLogo = flightElement.querySelector("img")?.src || "";
      const [rawDepartureTime, rawArrivalTime] = (
        flightElement.querySelector(".vmXl")?.innerText || ""
      ).split(" – ");

      // Function to extract time and remove numeric values at the end
      const extractTime = (rawTime: string): string => {
        const timeWithoutNumbers = rawTime.replace(/[0-9+\s]+$/, "").trim();
        return timeWithoutNumbers;
      };

      const departureTime = extractTime(rawDepartureTime);
      const arrivalTime = extractTime(rawArrivalTime);
      const flightDuration = (
        flightElement.querySelector(".xdW8")?.children[0]?.innerText || ""
      ).trim();

      const airlineName = (
        flightElement.querySelector(".VY2U")?.children[1]?.innerText || ""
      ).trim();

      // Extract price
      const price = parseInt(
        (flightElement.querySelector(".f8F1-price-text")?.innerText || "")
          .replace(/[^\d]/g, "")
          .trim(),
        10
      );

      flights.push({
        airlineLogo,
        departureTime,
        arrivalTime,
        flightDuration,
        airlineName,
        price,
      });
    });

    return flights;
  });
};
