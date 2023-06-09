// A user interface element that slides out from the edge of the screen.
import type { DrawerProps } from "rc-drawer";
// import './motion.css';

export const maskMotion: DrawerProps["maskMotion"] = {
  motionAppear: true,
  motionName: "mask-motion",
  onAppearEnd: console.warn,
};

export const motion: DrawerProps["motion"] = (placement) => ({
  motionAppear: true,
  motionName: `panel-motion-${placement}`,
});

const motionProps: Partial<DrawerProps> = {
  maskMotion,
  motion,
};

export default motionProps;
