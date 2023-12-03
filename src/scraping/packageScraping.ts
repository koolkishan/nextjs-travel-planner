interface PackageInfo {
  id: string | null;
  name: string;
  nights: string;
  days: string;
  destinationItinerary: string;
  inclusions: string[];
  price: string;
  image: string;
}

//   packageIteniary = dataExtracted; Json

export const startPackageScraping = async (page: any, pkg: any) => {
  console.log("in start package scraping");
  const packageDetails = await page.evaluate(() => {
    const packageDetails = {};
    console.log("in evalute");
    const packageElement = document.querySelector("#main-container");
    const descriptionSelector = packageElement?.querySelector("#pkgOverView");
    const regex = new RegExp("Yatra", "gi");
    descriptionSelector?.querySelector(".readMore").click();
    packageDetails.description = packageElement
      ?.querySelector("#pkgOverView p")
      ?.innerHTML.replace(regex, "Arklyte");

    packageDetails.images = Array.from(
      packageElement?.querySelectorAll(".galleryThumbImg")
    ).map((imageElement) =>
      imageElement
        .getAttribute("src")
        ?.replace("/t_holidays_responsivedetailsthumbimg", "")
    );

    const themesSelector = packageElement?.querySelector("#packageThemes");
    packageDetails.themes = Array.from(
      themesSelector?.querySelectorAll("li")
    ).map((li) => li.innerText.trim());

    const descriptions = [];

    // Select all day elements
    const dayElements = packageElement.querySelectorAll(
      ".itineraryOverlay .subtitle"
    );

    dayElements.forEach((dayElement) => {
      const title = dayElement.textContent.trim();
      let value = [];

      // Get the next sibling elements until the next day element
      let nextElement = dayElement.nextElementSibling;
      while (nextElement && !nextElement.classList.contains("subtitle")) {
        const textContent = nextElement.textContent.trim();
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
    const destinationItinerary = [];
    const destinationItinerarySelector =
      packageElement.querySelectorAll(".type-list li");

    destinationItinerarySelector.forEach((element) => {
      const placeElement = element.firstChild;
      const placeText = placeElement.textContent.trim().replace(/[\n\t]/g, "");

      const nightsElement = element.querySelector("span");
      let totalNights = 0;

      if (nightsElement) {
        const nightsText = nightsElement.textContent.trim();
        const nightsMatch = nightsText.match(/\d+/);
        totalNights = nightsMatch ? parseInt(nightsMatch[0]) : 0;
      }

      destinationItinerary.push({ place: placeText, totalNights });
    });

    packageDetails.destinationItinerary = destinationItinerary;

    const cities = [];

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

      const cityName = cityElement.textContent.trim();
      const cityDescription = document
        .getElementById("aboutDestPara")
        .textContent.trim();
      const cityImage = document
        .querySelector(".info-block img")
        .getAttribute("src");

      cities.push({
        name: cityName,
        description: cityDescription,
        image: cityImage,
      });
    });

    packageDetails.destinationDetails = cities;

    const dataExtracted = [];
    const timeline = document.querySelector(".time-line .right-column");
    const articles = timeline.querySelectorAll("article");
    // const cities = 1;
    articles.forEach((article) => {
      const cityNameElement = article.querySelector(
        ".title.row.acc-title .first.ng-binding"
      );
      const cityName = cityNameElement
        ? cityNameElement.textContent.trim()
        : null;
      const daysSelector = article.querySelectorAll(".days.acc-content");
      const daysActivity = [];

      daysSelector.forEach((daySelector, index) => {
        const activityElements = daySelector.querySelectorAll(".items-content");
        const activities = [];
        // Check if any activity elements exist
        if (activityElements.length > 0) {
          // Loop through each activity element
          activityElements.forEach((activityElement, index) => {
            // Extract activity type
            const activityTypeElement =
              activityElement.querySelector(".content.left.ico");
            const activityType = activityTypeElement
              ? activityTypeElement.textContent
                  .trim()
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
                  const scrapedData = [];

                  // Loop through each li element and extract text content
                  liElements.forEach((liElement, index) => {
                    const liText = liElement.textContent.trim();
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
                ? activityDescriptionElement.textContent.trim()
                : null;
            } else if (activityType === "FLIGHT") {
              const places =
                activityElement.querySelectorAll(".place span.full");

              const scrappedData = [];
              places.forEach((place) => {
                scrappedData.push(place.textContent.trim());
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
  console.log({ details });
  console.log(details.cities);
  return details;
};
