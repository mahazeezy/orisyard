/**
 * Gallery of real OrisYard work. Add supplied photos here (files go in
 * public/images/gallery). Empty slots render as styled placeholders.
 */

export type GalleryItem = {
  src: string;
  alt: string;
  category: "cakes" | "cookies";
  width: number;
  height: number;
  /** Full photo (fills its tile) rather than a transparent cut-out. */
  cover?: boolean;
};

export const GALLERY: GalleryItem[] = [
  {
    src: "/images/hero-cake.png",
    alt: "Tall white textured buttercream cake with pink-tipped cream roses",
    category: "cakes",
    width: 1590,
    height: 1927,
  },
  {
    src: "/images/custom-cake.png",
    alt: "Yellow and mint custom baby shower cake with honeycomb, bees, honey dippers and white satin bows",
    category: "cakes",
    width: 2216,
    height: 2320,
  },
  {
    src: "/images/cookies.jpg",
    alt: "Six OrisYard gourmet cookies on a cooling rack",
    category: "cookies",
    width: 2800,
    height: 2340,
    cover: true,
  },
];

/** Number of placeholder tiles to show per category until real photos arrive. */
export const GALLERY_PLACEHOLDERS = { cakes: 5, cookies: 6 };
