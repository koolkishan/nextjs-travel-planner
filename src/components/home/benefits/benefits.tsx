import { Chip } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const Benefits = () => {
  const data = [
    {
      title: "Seamless Flight Booking",
      description:
        "Book your flights effortlessly with real-time data, ensuring the best deals and convenient options.",
      badge: "Flights",
      badgeType: "primary",
    },
    {
      title: "Comfortable Hotel Reservations",
      description:
        "Discover ideal accommodations with real-time availability, making your stay comfortable and worry-free.",
      badge: "Hotels",
      badgeType: "secondary",
    },
    {
      title: "Tailored Trip Planning",
      description:
        "Craft personalized trips with real-time information, creating unforgettable travel experiences just for you.",
      badge: "Trips",
      badgeType: "danger",
    },
  ];
  return (
    <div className="mx-32 mb-20 flex gap-20 items-center justify-center">
      <div>
        <Image src="/home/benefit.png" alt="benefit" height={750} width={750} />
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <p className="uppercase text-neutral-600">Benefits</p>
          <h2 className="font-semibold text-4xl mt-5">Arklyte Features</h2>
        </div>
        <div className="flex flex-col gap-10">
          {data.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-3">
              <Chip
                color={
                  feature.badgeType as
                    | "danger"
                    | "default"
                    | "primary"
                    | "secondary"
                    | "success"
                    | "warning"
                }
              >
                {feature.badge}
              </Chip>
              <h4 className="block text-xl font-semibold">{feature.title}</h4>
              <p className="block  text-neutral-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
