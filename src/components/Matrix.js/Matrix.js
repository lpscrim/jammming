import React, { useEffect } from "react";
import "./Matrix.css";
export default function Matrix() {
  useEffect(() => {
    const state = {
      fps: 15,
      color: "#4e96b3",
      charset: "spotify",
      size: 15,
    };

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");


     let w = canvas.width = window.innerWidth;
     let h = canvas.height = window.innerHeight;
     let p = Array(Math.ceil(w / state.size)).fill(0);
 
    const random = (items) => items[Math.floor(Math.random() * items.length)];

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,.05)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = state.color;

      ctx.font = state.size + "px Source Code Pro, sans-serif";
      for (let i = 0; i < p.length; i++) {
        let v = p[i];
        ctx.fillText(random(state.charset), i * state.size, v);
        p[i] = v >= h || v >= 10000 * Math.random() ? 0 : v + state.size;
      }
    };

    canvas.width = w;
    canvas.height = h;

    let interval = setInterval(draw, 1000 / state.fps);

    return () => {
      clearInterval(interval);
      
    };
  }, []);

  return (
    <div className="matrix-background">
      <canvas id="canvas"></canvas>
    </div>
  );
}
