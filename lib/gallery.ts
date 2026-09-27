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
  /** Size/count tag shown on the photo, as supplied by OrisYard (e.g. "8 Inch Round"). */
  label?: string;
};

export const GALLERY: GalleryItem[] = [
  {
    src: "/images/gallery/cake-chocolate-cherry.jpg",
    alt: "Tall chocolate cake with vintage piping, brown satin ribbons and fresh dark cherries on top",
    category: "cakes",
    width: 1350,
    height: 1800,
    cover: true,
    label: "8 Inch Round",
  },
  {
    src: "/images/cookies.jpg",
    alt: "Six OrisYard gourmet cookies on a cooling rack",
    category: "cookies",
    width: 2800,
    height: 2340,
    cover: true,
  },
  {
    src: "/images/gallery/cake-banana-caramel.jpg",
    alt: "Speckled buttercream cake with wavy piping, caramelized banana slices and caramel chocolate shards on a glass stand",
    category: "cakes",
    width: 1086,
    height: 1448,
    cover: true,
  },
  {
    src: "/images/gallery/cupcakes-blue-gold.jpg",
    alt: "Boxed cupcakes piped in blue, gold and white buttercream with pearl sprinkles and an OrisYard sticker",
    category: "cakes",
    width: 1350,
    height: 1800,
    cover: true,
    label: "24 ct Cupcakes",
  },
  {
    src: "/images/hero-cake.png",
    alt: "Tall white textured buttercream cake with pink-tipped cream roses",
    category: "cakes",
    width: 1590,
    height: 1927,
  },
  {
    src: "/images/gallery/cupcakes-honey-bear.jpg",
    alt: "Honey-themed cupcakes in yellow and mint buttercream with honeycomb, bee toppers and wooden honey dippers",
    category: "cakes",
    width: 1350,
    height: 1800,
    cover: true,
    label: "12 ct Cupcakes",
  },
  {
    src: "/images/custom-cake.png",
    alt: "Yellow and mint custom baby shower cake with honeycomb, bees, honey dippers and white satin bows",
    category: "cakes",
    width: 2216,
    height: 2320,
    label: "8 Inch Heart",
  },
];

/** Number of placeholder tiles to show per category until real photos arrive. */
export const GALLERY_PLACEHOLDERS = { cakes: 5, cookies: 6 };
