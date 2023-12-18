import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import { FaCalendar, FaCalendarAlt, FaMarker, FaSearch } from "react-icons/fa";

const Search = () => {
  const [searchLoaction, setSearchLoaction] = useState("Search Location");
  const [dates, setDates] = useState(new Date());
  const handleSearch = () => {};
  const activities = [
    { name: "Sea & Sailing", icon: "/home/sailboat.png" },
    { name: "Trekking Tours", icon: "/home/trekking.png" },
    { name: "City Tours", icon: "/home/bag.png" },
    { name: "Motor Sports", icon: "/home/car.png" },
    { name: "Jungle Safari", icon: "/home/summer-beach.png" },
  ];
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className=" absolute left-0 top-0 h-[100vh] w-[100vw] max-w-[100vw] overflow-hidden overflow-x-hidden">
        <Image src="/home/home-bg.png" fill alt="Search" />
      </div>
      <div className="absolute h-[50vh] w-[60vw] flex flex-col gap-5">
        <div className="text-white text-center flex flex-col gap-5">
          <h3 className="text-xl font-bold">
            Best Tours made for you in mind!
          </h3>
          <h2 className="text-6xl font-extrabold">Explore the exotic world.</h2>
        </div>
        <div className="grid grid-cols-3 gap-5  p-5 rounded-xl">
          <Input
            color="danger"
            variant="bordered"
            className="text-white placeholder:text-white"
            startContent={<FaSearch />}
            value={searchLoaction}
            onChange={(e) => setSearchLoaction(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Dates"
            variant="bordered"
            color="danger"
            className="text-white accent-danger-500"
            startContent={<FaCalendarAlt />}
          />
          <Button
            size="lg"
            className="h-full cursor-pointer"
            color="danger"
            variant="shadow"
          >
            Search
          </Button>
        </div>
        <div>
          <ul className="text-white grid grid-cols-5 mt-5">
            {activities.map((activity) => (
              <li
                key={activity.name}
                className="flex items-center justify-center gap-5 flex-col cursor-pointer"
              >
                <div className="p-5 bg-white bg-opacity-20 rounded-full ">
                  <div className="relative h-12 w-12 ">
                    <Image src={activity.icon} fill alt="Activity" />
                  </div>
                </div>
                <span className="text-lg font-medium">{activity.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
