import mockHomeData from "../Data/mockHomeData.json";

export function getHomeData() {
  return {
    user: mockHomeData.user,
    doseHoje: mockHomeData.dose_hoje,
    macrotemas: mockHomeData.macrotemas,
  };
}
