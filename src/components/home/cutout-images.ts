// The homepage's cutout sources, keyed by the names used in
// src/lib/home-atmosphere.ts.
//
// Thirteen come from src/assets/home/cutouts (exported from the Studio File's
// Cutouts page — provenance in src/assets/home/sources.json). Two already live
// in the curated cutout library and are reused from there rather than copied:
// HOPE/LESS/NESS and TIME/LESS/NESS are Studio File 1737:3 and 1737:4, the same
// nodes the Figma rotation names.
import billboardSpokane from '../../assets/home/cutouts/billboard-spokane.png';
import baseballAdvertising from '../../assets/home/cutouts/baseball-advertising.png';
import vegasPrintAd from '../../assets/home/cutouts/vegas-print-ad.png';
import superStarliner from '../../assets/home/cutouts/super-starliner.png';
import unionLettering from '../../assets/home/cutouts/union-lettering.png';
import sunNewsprint from '../../assets/home/cutouts/sun-newsprint.png';
import falconDrawing from '../../assets/home/cutouts/falcon-drawing.png';
import greyhoundDrawing from '../../assets/home/cutouts/greyhound-drawing.png';
import landscapeDrawing from '../../assets/home/cutouts/landscape-drawing.png';
import converseCollage from '../../assets/home/cutouts/converse-collage.png';
import nedKelly from '../../assets/home/cutouts/ned-kelly.png';
import luckyCat from '../../assets/home/cutouts/lucky-cat.png';
import intermissionLettering from '../../assets/home/cutouts/intermission-lettering.png';
import hopelessness from '../../assets/cutouts/hopelessness-paper.png';
import timelessness from '../../assets/cutouts/timelessness-paper.png';

export const CUTOUT_IMAGES = {
  'billboard-spokane': billboardSpokane,
  'baseball-advertising': baseballAdvertising,
  'vegas-print-ad': vegasPrintAd,
  'super-starliner': superStarliner,
  'union-lettering': unionLettering,
  'sun-newsprint': sunNewsprint,
  'falcon-drawing': falconDrawing,
  'greyhound-drawing': greyhoundDrawing,
  'landscape-drawing': landscapeDrawing,
  'converse-collage': converseCollage,
  'ned-kelly': nedKelly,
  'lucky-cat': luckyCat,
  'intermission-lettering': intermissionLettering,
  hopelessness,
  timelessness,
} satisfies Record<string, ImageMetadata>;

export type CutoutName = keyof typeof CUTOUT_IMAGES;
