import Image from "next/image";
import React from "react";

// Function to shuffle array in-place
const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const Images = ({ images }: { images: string[] }) => {
  // Array of random images to use when the source is not available
  const randomImages = [
    "/randomImages/random1.jpg",
    "/randomImages/random2.jpg",
    "/randomImages/random3.jpg",
    "/randomImages/random4.jpg",
    "/randomImages/random5.jpg",
  ];

  // Shuffle the randomImages array to ensure randomness
  shuffleArray(randomImages);

  const getRandomImage = (index: number) => {
    // If the images array has a valid source, use it
    if (images && images[index]) {
      return images[index];
    } else {
      // If not, use a random image from the shuffled array
      const randomIndex = index % randomImages.length;
      return randomImages[randomIndex];
    }
  };

  return (
    <div className="px-5 py-5">
      {images && (
        <>
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            <div className="col-span-12 xl:col-span-4">
              <div className="grid grid-cols-12 gap-4 lg:gap-6">
                <div className="col-span-12 sm:col-span-6 xl:col-span-12">
                  <a
                    className="link property-gallery"
                    href="/img/tour-details-img-1.jpg"
                  >
                    <Image
                      alt="image"
                      width={610}
                      height={288}
                      decoding="async"
                      data-nimg="1"
                      className="w-full rounded-2xl"
                      style={{ color: "transparent" }}
                      src={getRandomImage(0)}
                    />
                  </a>
                </div>
                <div className="col-span-12 sm:col-span-6 xl:col-span-12 relative">
                  <a
                    className="link property-gallery"
                    href="/img/tour-details-img-2.jpg"
                  >
                    <Image
                      alt="image"
                      width={610}
                      height={288}
                      decoding="async"
                      data-nimg="1"
                      className="w-full rounded-2xl"
                      style={{ color: "transparent" }}
                      src={getRandomImage(1)}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-span-12  md:col-span-6 xl:col-span-4">
              <a
                className="link block property-gallery h-full overflow-hidden"
                href="/img/tour-details-img-3.jpg"
              >
                <Image
                  alt="image"
                  width={610}
                  height={600}
                  decoding="async"
                  className="w-full rounded-2xl h-full"
                  src={getRandomImage(6)}
                  objectFit={"cover"}
                />
              </a>
            </div>
            <div className="col-span-12 md:col-span-6 xl:col-span-4">
              <div className="grid grid-cols-12 gap-4 lg:gap-6 h-full">
                <div className="col-span-12  h-full">
                  <a
                    className="link property-gallery h-full"
                    href="/img/tour-details-img-4.jpg"
                  >
                    <Image
                      alt="image"
                      width={610}
                      height={288}
                      decoding="async"
                      data-nimg="1"
                      className="w-full rounded-2xl h-full"
                      style={{ color: "transparent" }}
                      src={getRandomImage(3)}
                    />
                  </a>
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <a
                    className="link property-gallery"
                    href="/img/tour-details-img-5.jpg"
                  >
                    <Image
                      alt="image"
                      width={610}
                      height={600}
                      decoding="async"
                      data-nimg="1"
                      className="w-full rounded-2xl h-full"
                      style={{ color: "transparent" }}
                      src={getRandomImage(4)}
                    />
                  </a>
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <a
                    className="link property-gallery"
                    href="/img/tour-details-img-6.jpg"
                  >
                    <Image
                      alt="image"
                      width={610}
                      height={288}
                      decoding="async"
                      data-nimg="1"
                      className="w-full rounded-2xl h-full"
                      style={{ color: "transparent" }}
                      src={getRandomImage(5)}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Images;
