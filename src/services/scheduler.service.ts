import cron from "node-cron";
import prefetchData from "../helpers/prefetchData";

export function setupDataUpdateScheduler() {
  // Schedule the task to run every day at midnight (00:00)
  cron.schedule("0 0 * * *", async () => {
    console.log("Running scheduled data update check...");
    try {
      await prefetchData();
      console.log("Scheduled data update check completed successfully");
    } catch (error) {
      console.error("Error during scheduled data update check:", error);
    }
  });

  // Run the task immediately on startup
  (async () => {
    console.log("Running immediate data update check...");
    try {
      await prefetchData();
      console.log("Immediate data update check completed successfully");
    } catch (error) {
      console.error("Error during immediate data update check:", error);
    }
  })();

  console.log("Data update scheduler has been set up");
}
