import { getAllMechanics } from "../services/mechanic.service.js";

 const mechanicController = async (req, res) => {
  try {
    const mechanics = await getAllMechanics();

    res.status(200).json({
      success: true,
      data: mechanics,
    });
  } catch (error) {
    console.error("Get mechanics error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch mechanics",
    });
  }
};

export default mechanicController