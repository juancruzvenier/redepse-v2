import Image from "next/image";
import styles from "./page.module.css";
import SideBar from "./components/SideBar"; // Importa el componente SideBar

export default function Home() {
  return (
    <div>
      <SideBar />
    </div>
  );
}