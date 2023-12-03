import { Queue } from "bullmq";

import { connection } from "./redis";

export const importQueue = new Queue("importQueue", {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  },
});
