import Ladder from "./Ladder (1x1).png";
import Door from "./Door (2x1).png";
import TrapDoor from "./Hatch, trap door (1x1).png";
import RampartLong from "./Rampart, long (7x4).png";
import RampartRound from "./Rampart, round, corner (6x6).png";
import RampartSquare from "./Rampart, square, corner (6x6).png";
import SpiralStairs from "./Stairs, wood, spiral, down (4x4).png";
import WalkWayLong from "./Walkway, long (7x4).png";
import TowerSquare from "./Tower, square, exterior (5x5).png";
import WalkwayCorner from "./Walkway, corner (5x5).png";
import RampartSquareBastion from "./Rampart, square, bastion (5x3).png";
import StoneStairs from "./Stairs, stone, long (3x5).png";
import StoneGateRoof from "./Minor Gate, roof,  rampart (8x4).png";
import BlackWall from "./Wall, thick, long (5x3).png";
import BlackWallCorner from "./Wall, thin, corner (2x2).png";
import BlackWallDiagonal from "./Wall, thin, corner, diagonal (2x2).png";
import BlackWallThin from "./Wall, thin, long (5x2).png";

import type { Image } from "~/types";

export const Images: Array<Image> = [
  { name: "Ladder", src: Ladder },
  { name: "Door", src: Door },
  { name: "TrapDoor", src: TrapDoor },
  { name: "RampartLong", src: RampartLong },
  { name: "RampartRound", src: RampartRound },
  { name: "RampartSquare", src: RampartSquare },
  { name: "SpiralStairs", src: SpiralStairs },
  { name: "WalkWayLong", src: WalkWayLong },
  { name: "TowerSquare", src: TowerSquare },
  { name: "WalkwayCorner", src: WalkwayCorner },
  { name: "RampartSquareBastion", src: RampartSquareBastion },
  { name: "StoneGateRoof", src: StoneGateRoof },
  { name: "StoneStairs", src: StoneStairs },
  { name: "BlackWall", src: BlackWall },
  { name: "BlackWallCorner", src: BlackWallCorner },
  { name: "BlackWallDiagonal", src: BlackWallDiagonal },
  { name: "BlackWallThin", src: BlackWallThin },
];
