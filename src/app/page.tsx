import Demo from "./components/Demo";
import Mapbox from "./components/Mapbox";
import Panel from "./components/Sidebar";

export default function Dashboard() {
  return (
    <Panel main={<Mapbox />} side={<div></div>} />
    // <Demo></Demo>
  );
}
