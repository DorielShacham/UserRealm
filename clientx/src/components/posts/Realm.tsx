import { useEffect, useState } from "react";

const Realm = () => {
  const [ringColors, setRingColors] = useState<string[]>([]);

  useEffect(() => {
    const sphere = document.getElementById('sphere');
    const rows: string[] = [];

    for (let i = 0; i < 180; i += 9) {
      rows.push(`<div class="ring" style="color: ${ringColors[i / 9]}; transform: rotateY(${i}deg);"></div>`);
    }

    if (sphere) {
      sphere.innerHTML = rows.join("");
    }
  }, [ringColors]);

  useEffect(() => {
    const startColor = '#ff3c00';
    const endColor = '#0c0c22';
    const steps = 32;

    function generateColorBetween(startColor: string, endColor: string, steps: number, step: number) {
      const startRGB = hexToRgb(startColor);
      const endRGB = hexToRgb(endColor);

      const currentColor = {
        r: Math.round(startRGB.r + (endRGB.r - startRGB.r) * step / steps),
        g: Math.round(startRGB.g + (endRGB.g - startRGB.g) * step / steps),
        b: Math.round(startRGB.b + (endRGB.b - startRGB.b) * step / steps),
      };

      return rgbToHex(currentColor.r, currentColor.g, currentColor.b);
    }

    function hexToRgb(hex: string) {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return { r, g, b };
    }

    function rgbToHex(r: number, g: number, b: number) {
      return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
    }

    const generatedColors = Array.from({ length: steps }, (_, i) => generateColorBetween(startColor, endColor, steps, i + 1));
    setRingColors(generatedColors);
  }, []);

  return (
    <div id="sphere" className="sphere"></div>
  );
};

export default Realm;
