import Image from "next/image";
import React from "react";

const Images = ({ images }) => {
  console.log({ images });
  return (
    <div className=" px-5 py-5">
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
                      loading="lazy"
                      width={610}
                      height={288}
                      decoding="async"
                      data-nimg="1"
                      className="w-full rounded-2xl"
                      style={{ color: "transparent" }}
                      src={images[0]}
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
                      loading="lazy"
                      width={610}
                      height={288}
                      decoding="async"
                      data-nimg="1"
                      className="w-full rounded-2xl"
                      style={{ color: "transparent" }}
                      src={images[1]}
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
                  loading="lazy"
                  width={610}
                  height={600}
                  decoding="async"
                  className="w-full rounded-2xl h-full"
                  src={images[6]}
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
                      loading="lazy"
                      width={610}
                      height={288}
                      decoding="async"
                      data-nimg="1"
                      className="w-full rounded-2xl h-full"
                      style={{ color: "transparent" }}
                      src={images[3]}
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
                      loading="lazy"
                      width={610}
                      height={600}
                      decoding="async"
                      data-nimg="1"
                      className="w-full rounded-2xl h-full"
                      style={{ color: "transparent" }}
                      src={images[4]}
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
                      loading="lazy"
                      width={610}
                      height={288}
                      decoding="async"
                      data-nimg="1"
                      className="w-full rounded-2xl h-full"
                      style={{ color: "transparent" }}
                      src={images[5]}
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
