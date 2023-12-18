import Image from "next/image";
import React from "react";

const Featured = () => {
  const data = [
    {
      name: "New York",
      trips: 6,
      image: "",
    },
    {
      name: "Singapore",
      trips: 6,
      image: "",
    },
  ];
  return (
    <div className="mt-[10vh] h-full relative z-30 mx-20 py-10">
      <h1 className="text-4xl font-bold mb-2">Featured places to stay</h1>
      <p className="text-lg font-medium mb-5">Popular places to stay that Arklyte recommends for you</p>
      <div>
        <div>New York</div>
        <div>Tokyo</div>
        <div>Paris</div>
        <div>London</div>
        <div>View all -></div>
      </div>
      <div className="">
        <div>
          <div>{/* <Image /> */}</div>
          <div>
            <h3>Paris</h3>
            <h5>1 trips</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
