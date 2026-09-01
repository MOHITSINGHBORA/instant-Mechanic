import Mechanic from "../models/Mechanic.js";

export const getAllMechanics = async () => {
  const mechanics = await Mechanic.find();

  return mechanics;
};