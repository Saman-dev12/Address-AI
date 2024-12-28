import { Metadata } from "next";
import MapPage from "./components/map";

export const metadata: Metadata = {
  title: "Address-AI | Result",
  description:
    "Visualize corrected postal addresses on a live map with Address-AI. Perfect for confirming single address corrections.",
};

const Map = () => {
  return <MapPage />;
};

export default Map;
