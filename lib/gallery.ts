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
    src: "/images/cake-roses.jpg",
    alt: "Tall white textured buttercream cake with pink-tipped cream roses on a glass stand",
    category: "cakes",
    width: 1800,
    height: 2400,
    cover: true,
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
    src: "/images/gallery/cake-honey-bear.jpg",
    alt: "Yellow and mint heart-shaped baby shower cake with honeycomb, bees, honey dippers and white satin bows",
    category: "cakes",
    width: 1800,
    height: 2400,
    cover: true,
    label: "8 Inch Heart",
  },
  {
    src: "/images/gallery/cake-leopard-cherry-heart.jpg",
    alt: "Heart-shaped leopard print cake with red and black vintage piping, red satin bows and glittered cherries",
    category: "cakes",
    width: 1800,
    height: 2400,
    cover: true,
  },
  {
    src: "/images/gallery/cake-peach-pearl-crown.jpg",
    alt: "Peach buttercream cake with vintage piping, gold and pearl sprinkles, a gold Happy Birthday topper and a gold crown",
    category: "cakes",
    width: 1800,
    height: 2400,
    cover: true,
  },
  {
    src: "/images/gallery/cake-pink-kitty-bows.jpg",
    alt: "Pink vintage-piped cake with ruffled buttercream layers, pink ribbon bows and a character image on top",
    category: "cakes",
    width: 1800,
    height: 2400,
    cover: true,
  },
  {
    src: "/images/gallery/cookie-chocolate-caramel.jpg",
    alt: "Gourmet cookie with chocolate chunks, caramel pieces and flaky sea salt",
    category: "cookies",
    width: 1500,
    height: 2000,
    cover: true,
  },
  {
    src: "/images/gallery/cake-honey-pooh-yellow.jpg",
    alt: "Butter-yellow vintage-piped honey cake with honeycomb, bee toppers, honey dippers and a honey-bear image on top",
    category: "cakes",
    width: 1500,
    height: 2000,
    cover: true,
  },
  {
    src: "/images/gallery/cake-black-knife-twenty-four.jpg",
    alt: "Black buttercream birthday cake with red drips, a “twenty four” topper and a cake knife on top",
    category: "cakes",
    width: 1500,
    height: 2000,
    cover: true,
  },
  {
    src: "/images/gallery/cake-mystery-van-alanna.jpg",
    alt: "Two-tone blue and yellow birthday cake with a haunted-house “Alanna 23” topper, toy van and cartoon cut-outs",
    category: "cakes",
    width: 1500,
    height: 2000,
    cover: true,
  },
];

/** Number of placeholder tiles to show per category until real photos arrive. */
export const GALLERY_PLACEHOLDERS = { cakes: 5, cookies: 6 };
