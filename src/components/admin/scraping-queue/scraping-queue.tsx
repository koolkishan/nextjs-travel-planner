import { apiClient } from "@/lib";
import { ADMIN_API_ROUTES } from "@/utils/api-routes";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const ScrapingQueue = () => {
  const [ongoingJobs, setOngoingJobs] = useState(0);
  useEffect(() => {
    const getData = async () => {
      const data = await apiClient.get(ADMIN_API_ROUTES.JOB_DETAILS);

      setOngoingJobs(data.data.onGoingJobs);
    };
    const interval = setInterval(() => getData(), 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onGoingJobColor = () => {
    if (ongoingJobs <= 5) return "bg-green-500";
    else if (ongoingJobs <= 10) return "bg-orange-500";
    else return "bg-red-500";
  };

  const onGoingJobTextColor = () => {
    if (ongoingJobs <= 5) return "text-green-500";
    else if (ongoingJobs <= 10) return "text-orange-500";
    else return "text-red-500";
  };

  return (
    <Card className="h-full">
      <CardHeader>Current Queue</CardHeader>
      <CardBody className="flex items-center justify-center">
        <div
          className={`h-52 w-52 ${onGoingJobColor()} rounded-full  flex items-center justify-center`}
        >
          <div className="h-44 w-44 bg-white rounded-full flex items-center justify-center">
            <h4 className={`text-6xl font-bold ${onGoingJobTextColor()}`}>
              {ongoingJobs}
            </h4>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ScrapingQueue;
