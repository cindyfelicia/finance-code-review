import { Dimensions, PixelRatio, Platform } from "react-native";

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get("window");

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

//not used yet
export function normalizeSize(size: number) {
  return size;
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
