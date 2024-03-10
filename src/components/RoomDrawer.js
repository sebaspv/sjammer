import React, { useEffect, useRef } from "react";

const RoomDrawer = ({ width, height, furniture }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size based on device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const scale = Math.min(canvas.width / width, canvas.height / height);
    const lineWidth = 4;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw room outline
    ctx.beginPath();
    ctx.rect(0, 0, width * scale, height * scale);
    ctx.strokeStyle = "#4C9FFF";
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    // Draw grid
    const gridSize = 1; // Decreased grid size
    ctx.beginPath();
    for (let x = 0; x <= width; x += gridSize) {
      ctx.moveTo(x * scale, 0);
      ctx.lineTo(x * scale, height * scale);
    }
    for (let y = 0; y <= height; y += gridSize) {
      ctx.moveTo(0, y * scale);
      ctx.lineTo(width * scale, y * scale);
    }
    ctx.strokeStyle = "#4C9FFF"; // adjust this color if needed
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw furniture
    furniture.forEach(({ x, y, svg, width, height }) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(
          img,
          x * scale,
          y * scale,
          width * scale - 10,
          height * scale - 10
        );
      };
      img.src = svg;
    });
  }, [width, height, furniture]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default RoomDrawer;
