import React, { useEffect, useRef } from "react";

const SilkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Perlin Noise Implementation
    class Perlin {
      constructor() {
        this.p = [];
        for (let i = 0; i < 256; i++) {
          this.p[i] = Math.floor(Math.random() * 256);
        }
        this.p = this.p.concat(this.p);
      }
      lerp(a, b, x) {
        return a + x * (b - a);
      }
      fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
      }
      grad(hash, x, y, z) {
        let h = hash & 15;
        let u = h < 8 ? x : y;
        let v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
      }
      noise(x, y, z) {
        let X = Math.floor(x) & 255;
        let Y = Math.floor(y) & 255;
        let Z = Math.floor(z) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);
        let u = this.fade(x);
        let v = this.fade(y);
        let w = this.fade(z);
        let A = this.p[X] + Y;
        let AA = this.p[A] + Z;
        let AB = this.p[A + 1] + Z;
        let B = this.p[X + 1] + Y;
        let BA = this.p[B] + Z;
        let BB = this.p[B + 1] + Z;
        return this.lerp(
          this.lerp(
            this.lerp(
              this.grad(this.p[AA], x, y, z),
              this.grad(this.p[BA], x - 1, y, z),
              u
            ),
            this.lerp(
              this.grad(this.p[AB], x, y - 1, z),
              this.grad(this.p[BB], x - 1, y - 1, z),
              u
            ),
            v
          ),
          this.lerp(
            this.lerp(
              this.grad(this.p[AA + 1], x, y, z - 1),
              this.grad(this.p[BA + 1], x - 1, y, z - 1),
              u
            ),
            this.lerp(
              this.grad(this.p[AB + 1], x, y - 1, z - 1),
              this.grad(this.p[BB + 1], x - 1, y - 1, z - 1),
              u
            ),
            v
          ),
          w
        );
      }
    }

    const perlin = new Perlin();

    // Config
    const scale = 0.005;
    const lineCount = 15;
    const lineColor = "#E0E0E0";
    const animationSpeed = 0.0005;
    const res = 10;
    let time = 0;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    function animate() {
      requestAnimationFrame(animate);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += animationSpeed;

      for (let i = 0; i < lineCount; i++) {
        const threshold = (i / lineCount) * 2 - 1;
        const lineWidth = i % 3 === 0 ? 1.5 : 1;
        const isDashed = i % 5 === 0;

        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.setLineDash(isDashed ? [5, 5] : []);

        for (let y = 0; y < canvas.height; y += res) {
          for (let x = 0; x < canvas.width; x += res) {
            const a = perlin.noise(x * scale, y * scale, time);
            const b = perlin.noise((x + res) * scale, y * scale, time);
            const c = perlin.noise((x + res) * scale, (y + res) * scale, time);
            const d = perlin.noise(x * scale, (y + res) * scale, time);

            let state = 0;
            if (a < threshold) state |= 8;
            if (b < threshold) state |= 4;
            if (c < threshold) state |= 2;
            if (d < threshold) state |= 1;

            ctx.beginPath();
            switch (state) {
              case 1:
              case 14:
                ctx.moveTo(x, y + res / 2);
                ctx.lineTo(x + res / 2, y + res);
                break;
              case 2:
              case 13:
                ctx.moveTo(x + res / 2, y + res);
                ctx.lineTo(x + res, y + res / 2);
                break;
              case 3:
              case 12:
                ctx.moveTo(x, y + res / 2);
                ctx.lineTo(x + res, y + res / 2);
                break;
              case 4:
              case 11:
                ctx.moveTo(x + res, y + res / 2);
                ctx.lineTo(x + res / 2, y);
                break;
              case 5:
                ctx.moveTo(x + res, y + res / 2);
                ctx.lineTo(x, y + res / 2);
                ctx.moveTo(x, y + res / 2);
                ctx.lineTo(x + res / 2, y);
                break;
              case 6:
              case 9:
                ctx.moveTo(x + res / 2, y + res);
                ctx.lineTo(x + res / 2, y);
                break;
              case 7:
              case 8:
                ctx.moveTo(x, y + res / 2);
                ctx.lineTo(x + res / 2, y);
                break;
              case 10:
                ctx.moveTo(x + res, y + res / 2);
                ctx.lineTo(x + res / 2, y + res);
                ctx.moveTo(x, y + res / 2);
                ctx.lineTo(x + res / 2, y);
                break;
              default:
                break;
            }
            ctx.stroke();
          }
        }
      }
    }

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
};

export default SilkBackground;
