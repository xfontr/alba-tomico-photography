/**
 * This is a 95% vibe-coded file. Proceed with caution
 */

import Matter from "matter-js";
import type { ImgHTMLAttributes } from "vue";
import type { Image } from "~/types/Image";

const BASE_SIZE = 150;
const SCALE_RANGE: [number, number] = [3.5, 4.5];
const MARGIN = 60;
const BORDER_THICKNESS = 200;
const SIM_STEPS = 600;

export function generateMatterLayout(
  images: Image[],
  screenW: number,
  screenH: number
): Record<number, ImgHTMLAttributes["style"]> {
  const { Engine, World, Bodies } = Matter;
  const engine = Engine.create();
  engine.gravity.y = 0;

  const bodies: Matter.Body[] = [];

  // Borders
  const walls = [
    Bodies.rectangle(
      screenW / 2,
      -BORDER_THICKNESS / 2,
      screenW * 2,
      BORDER_THICKNESS,
      { isStatic: true }
    ),
    Bodies.rectangle(
      screenW / 2,
      screenH + BORDER_THICKNESS / 2,
      screenW * 2,
      BORDER_THICKNESS,
      { isStatic: true }
    ),
    Bodies.rectangle(
      -BORDER_THICKNESS / 2,
      screenH / 2,
      BORDER_THICKNESS,
      screenH * 2,
      { isStatic: true }
    ),
    Bodies.rectangle(
      screenW + BORDER_THICKNESS / 2,
      screenH / 2,
      BORDER_THICKNESS,
      screenH * 2,
      { isStatic: true }
    ),
  ];
  World.add(engine.world, walls);
  images.forEach((_, i) => {
    const scale =
      Math.random() * (SCALE_RANGE[1] - SCALE_RANGE[0]) + SCALE_RANGE[0];
    const width = BASE_SIZE * scale;
    const height = width * (Math.random() * 0.6 + 0.8);

    const x =
      Math.random() * (screenW - width - MARGIN * 2) + MARGIN + width / 2;

    const groupSize = 1;
    const verticalChunkHeight = 350;

    const groupIndex = Math.floor(i / groupSize);
    const yMin = groupIndex * verticalChunkHeight;
    const yMax = yMin + verticalChunkHeight;

    const y =
      Math.random() * (yMax - yMin - height - MARGIN * 2) +
      yMin +
      MARGIN +
      height / 2;

    const body = Bodies.rectangle(x, y, width, height, {
      restitution: 0,
      frictionAir: 0.3,
      angle: 0,
      inertia: Infinity,
    });

    bodies.push(body);
  });

  World.add(engine.world, bodies);

  for (let i = 0; i < SIM_STEPS; i++) {
    Engine.update(engine, 16);
  }

  const styles: Record<number, ImgHTMLAttributes["style"]> = {};
  bodies.forEach((b, i) => {
    const width = (b.bounds.max.x - b.bounds.min.x) * 0.7;
    const height = (b.bounds.max.y - b.bounds.min.y) * 0.7;
    styles[i] = {
      position: "absolute",
      top: `${b.position.y - height / 2}px`,
      left: `${b.position.x - width / 2}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
  });

  return styles;
}
