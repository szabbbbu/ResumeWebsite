import CanvasLayerClient from '@/components/CanvasLayerSystem/CanvasLayerClient';
import CanvasLayerClientDebug from '@/components/CanvasLayerSystem/CanvasLayerClientDebug';

export default function Home() {
  console.log("HOME RENDERED:")
  return (
    <div>
      hello
      <div>
        <CanvasLayerClient />
        <CanvasLayerClientDebug />
      </div>
    </div>
  );
}
