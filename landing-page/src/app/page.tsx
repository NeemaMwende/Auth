// pages/index.js
import HeartCanvas from '../components/Heart';
import BubbleText from "../components/BubbleText";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <HeartCanvas />
      <div className="z-10 text-white text-center">
        {/* <h1 className="text-4xl font-bold mb-4">Mi Curacacha</h1> */}
        <BubbleText text="Mi Curacacha" /> 
      </div>
    </div>
  );
}
