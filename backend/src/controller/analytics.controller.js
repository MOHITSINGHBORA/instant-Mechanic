import { getAnalyticsService } from "../services/analytics.service.js";

export const getAnalytics = async (req, res) => {
  try {
    const data = await getAnalyticsService();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Analytics error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
    });
  }
};