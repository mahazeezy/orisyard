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
};

export const GALLERY: GalleryItem[] = [
  {
    src: "/images/hero-cake.png",
    alt: "Tall white textured buttercream cake with pink-tipped cream roses",
    category: "cakes",
    width: 1590,
    height: 1927,
  },
];

/** Number of placeholder tiles to show per category until real photos arrive. */
export const GALLERY_PLACEHOLDERS = { cakes: 5, cookies: 6 };
