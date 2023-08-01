import { useContext } from "react";
import { DashBoardContext } from "../../../app/contexts/DashboardContext";

export default function useDashboard() {
  return useContext(DashBoardContext);
}
