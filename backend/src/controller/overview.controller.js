import getOverview from "../services/overview.service.js";

export const overviewController = async (req, res) => {
  try {
    const overview = await getOverview();

    res.status(200).json({
      success: true,
      data: overview,
    });
  } catch (error) {
    console.error("Overview error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch overview data",
    });
  }
};