import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";

const Metrics = ({ title, value }: { title: string; value: number }) => {
  return (
    <Card className=" bg-opacity-40">
      <CardHeader className="text-lg">{title}</CardHeader>
      <CardBody className="text-5xl font-semibold">{value}</CardBody>
    </Card>
  );
};

export default Metrics;
