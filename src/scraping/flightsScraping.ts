export const startFlightScraping = async (page) => {
  return await page.evaluate(() => {
    const flightData = [];

    // Find all main containers
    const mainContainers = document.querySelectorAll(".nrc6-content-section");

    // Iterate through each main container
    mainContainers.forEach((mainContainer) => {
      // Find the list of flights within each main container
      const flightsList = mainContainer.querySelector(".hJSA-list");

      if (flightsList) {
        // Iterate through each flight
        flightsList.querySelectorAll(".hJSA-item").forEach((flightItem) => {
          // Extract relevant information
          const airlineLogo = flightItem
            .querySelector("img[alt]")
            .getAttribute("src");
          const departureTime = flightItem
            .querySelector(".vmXl-mod-variant-large")
            .textContent.trim();
          const duration = flightItem
            .querySelector(".vmXl-mod-variant-default")
            .textContent.trim();
          const stops = flightItem
            .querySelector(".JWEO-stops-text")
            .textContent.trim();
          const departureAirport = flightItem
            .querySelectorAll(".EFvI-ap-info span")[0]
            .textContent.trim();
          const arrivalAirport = flightItem
            .querySelectorAll(".EFvI-ap-info span")[1]
            .textContent.trim();
          const airlineName = flightItem
            .querySelector(".c_cgF")
            .textContent.trim();
          const price = flightItem
            .querySelector(".your-price-class")
            .textContent.trim(); // Adjust this selector accordingly

          // Store the data in an object
          const flightInfo = {
            airlineLogo,
            departureTime,
            duration,
            stops,
            departureAirport,
            arrivalAirport,
            airlineName,
            price,
          };

          // Append the flight information to the array
          flightData.push(flightInfo);
        });
      }
    });

    return flightData;
  });
};
