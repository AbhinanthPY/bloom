// Canvas coordinates are shared with the supplied 1536 × 1024 image layers.
export const FRAME = { width: 1536, height: 1024 };
export const LAYERS = [
  { file: '01_sunrise_background', role: 'Sunrise and distant environment', z: -360, scale: 1.14, x: 0, y: -20, pointer: 1.2, scrollX: 0, scrollY: -3, opacity: 1 },
  { file: '02_distant_mountains_mist', role: 'Distant mountain ridges and mist', z: -260, scale: 1.05, x: 0, y: 30, pointer: 2, scrollX: -2, scrollY: -5, opacity: 1 },
  { file: '03_rear_pink_hills', role: 'Rear flowering hills', z: -160, scale: 1.12, x: 0, y: 100, pointer: 3.5, scrollX: 2, scrollY: -8, opacity: 1 },
  { file: '04_left_pink_hillside', role: 'Left middle hillside', z: -50, scale: 1.05, x: -200, y: 90, pointer: 5, scrollX: -12, scrollY: -12, opacity: 1 },
  { file: '05_right_hillside_grove', role: 'Right middle hillside', z: 50, scale: 1.07, x: 160, y: 80, pointer: 6, scrollX: 14, scrollY: -14, opacity: 1 },
  { file: '06_central_river_valley', role: 'Central stream and valley floor', z: 140, scale: 1.1, x: 0, y: 130, pointer: 7, scrollX: 0, scrollY: -18, opacity: 1 },
  { file: '07_foreground_tree', role: 'Near right flowering tree', z: 245, scale: .9, x: 330, mobileX: 200, y: 100, pointer: 10, scrollX: 26, scrollY: -25, opacity: 1 },
  { file: '08_lower_left_branch', role: 'Lower left foreground branch', z: 340, scale: .95, x: -300, mobileX: -140, y: 140, pointer: 14, scrollX: -32, scrollY: -34, opacity: 1 },
  { file: '09_upper_left_canopy', role: 'Overhanging cherry blossom canopy', z: 430, scale: .9, x: -160, mobileX: -120, y: -140, pointer: 17, scrollX: -24, scrollY: -38, opacity: 1 },
  { file: '10_floating_petals', role: 'Soft foreground petal atmosphere', z: 500, scale: 1.18, x: 0, y: 0, pointer: 18, scrollX: 10, scrollY: -36, opacity: .16 }
];
export const textureURL = (file, tier) => new URL(`../assets/parallax/${tier}/${file}.webp`, import.meta.url).href;
