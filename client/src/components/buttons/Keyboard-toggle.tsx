import { isMobile, isTablet } from "react-device-detect";

export default function KeyboardToggle() {
  if (!isMobile && !isTablet) return null;
  return <div>Keyboard-toggle</div>;
}
