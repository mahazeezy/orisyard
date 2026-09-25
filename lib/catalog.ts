/**
 * Provisional OrisYard catalog seed data.
 * Prices, descriptions, and flags are observed from the legacy static menu
 * and are NOT yet confirmed as final business-approved catalog data.
 */

export type CategoryId = "cakes" | "bentos" | "cupcakes" | "cookies";

export type FlavorOption = {
  id: string;
  name: string;
  priceDelta: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: CategoryId;
  basePrice: number;
  /** When true, UI should show “Starting at” (legacy cake/bento/cupcake pattern). */
  priceIsStartingAt: boolean;
  hasFlavorOptions: boolean;
  shippable: boolean;
  featured?: boolean;
};

export type Category = {
  id: CategoryId;
  slug: CategoryId;
  name: string;
  headline: string;
  description: string;
};

export const FLAVOR_OPTIONS: FlavorOption[] = [
  { id: "white", name: "White", priceDelta: 0 },
  { id: "chocolate", name: "Chocolate", priceDelta: 0 },
  { id: "funfetti", name: "Funfetti", priceDelta: 4 },
  { id: "red-velvet", name: "Red Velvet", priceDelta: 4 },
];

export const CATEGORIES: Category[] = [
  {
    id: "cakes",
    slug: "cakes",
    name: "Cakes",
    headline: "Layered cakes, made to order",
    description:
      "Round and heart-shaped cakes with vanilla Swiss meringue buttercream. Decor and writing are additional (legacy note).",
  },
  {
    id: "bentos",
    slug: "bentos",
    name: "Bentos",
    headline: "The perfect bundle",
    description: "A 5in. cake paired with cupcakes — ideal for celebrations and gifting.",
  },
  {
    id: "cupcakes",
    slug: "cupcakes",
    name: "Cupcakes",
    headline: "Dozens, made fresh",
    description: "Cupcakes with vanilla Swiss meringue buttercream in your choice of flavor.",
  },
  {
    id: "cookies",
    slug: "cookies",
    name: "Cookies",
    headline: "Cookies, cookies, cookies",
    description:
      "Individual cookies and a variety pack. Legacy site notes nationwide shipping for cookies.",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "cake-5in",
    slug: "round-cake-5in",
    name: "Round Cake 5in.",
    shortDescription: "3 layers · Serves 8–10 people",
    description:
      "A 5-inch round cake with 3 layers and vanilla Swiss meringue buttercream. Choose one flavor. Decor and writing are additional.",
    category: "cakes",
    basePrice: 60,
    priceIsStartingAt: true,
    hasFlavorOptions: true,
    shippable: false,
    featured: true,
  },
  {
    id: "cake-6in",
    slug: "round-cake-6in",
    name: "Round Cake 6in.",
    shortDescription: "3 layers · Serves 12–16 people",
    description:
      "A 6-inch round cake with 3 layers and vanilla Swiss meringue buttercream. Choose one flavor. Decor and writing are additional.",
    category: "cakes",
    basePrice: 70,
    priceIsStartingAt: true,
    hasFlavorOptions: true,
    shippable: false,
    featured: true,
  },
  {
    id: "cake-heart",
    slug: "heart-shaped-cake-6in",
    name: "Heart Shaped Cake 6in.",
    shortDescription: "3 layers · Serves 12–16 people",
    description:
      "A 6-inch heart-shaped cake with 3 layers — suited for Valentine’s, anniversaries, and celebrations. Choose one flavor.",
    category: "cakes",
    basePrice: 75,
    priceIsStartingAt: true,
    hasFlavorOptions: true,
    shippable: false,
    featured: true,
  },
  {
    id: "bento",
    slug: "bento-box",
    name: "Bento Box",
    shortDescription: "5in. cake + 8 cupcakes",
    description:
      "A treat bundle: 5-inch cake plus 8 cupcakes. Flavor of your choice (one flavor per product).",
    category: "bentos",
    basePrice: 60,
    priceIsStartingAt: true,
    hasFlavorOptions: true,
    shippable: false,
    featured: true,
  },
  {
    id: "cup12",
    slug: "cupcakes-12ct",
    name: "12 ct. Cupcakes",
    shortDescription: "Dozen with Swiss meringue buttercream",
    description:
      "A dozen cupcakes with vanilla Swiss meringue buttercream. Flavor of your choice.",
    category: "cupcakes",
    basePrice: 35,
    priceIsStartingAt: true,
    hasFlavorOptions: true,
    shippable: false,
  },
  {
    id: "cup24",
    slug: "cupcakes-24ct",
    name: "24 ct. Cupcakes",
    shortDescription: "Two dozen — great for parties",
    description:
      "Two dozen cupcakes with vanilla Swiss meringue buttercream. Flavor of your choice.",
    category: "cupcakes",
    basePrice: 55,
    priceIsStartingAt: true,
    hasFlavorOptions: true,
    shippable: false,
  },
  {
    id: "c1",
    slug: "brown-butter-chocolate-chunk",
    name: "Brown Butter Chocolate Chunk",
    shortDescription: "Rich brown butter with chocolate chunks",
    description:
      "Rich brown butter cookie loaded with generous chocolate chunks.",
    category: "cookies",
    basePrice: 2.35,
    priceIsStartingAt: false,
    hasFlavorOptions: false,
    shippable: true,
    featured: true,
  },
  {
    id: "c2",
    slug: "red-velvet-cheesecake",
    name: "Red Velvet Cheesecake",
    shortDescription: "Red velvet with cheesecake filling",
    description:
      "Stunning red velvet cookie with a creamy cheesecake filling.",
    category: "cookies",
    basePrice: 2.99,
    priceIsStartingAt: false,
    hasFlavorOptions: false,
    shippable: true,
  },
  {
    id: "c3",
    slug: "croissant-choc-chip-crookie",
    name: "Croissant Choc Chip (Crookie)",
    shortDescription: "Croissant meets chocolate chip cookie",
    description:
      "The viral crookie — buttery croissant meets chocolate chip cookie.",
    category: "cookies",
    basePrice: 2.99,
    priceIsStartingAt: false,
    hasFlavorOptions: false,
    shippable: true,
  },
  {
    id: "c4",
    slug: "valentines-mm-candy",
    name: "Valentines M&M Candy",
    shortDescription: "Festive cookie with M&M candies",
    description: "Festive cookie loaded with colorful M&M candies.",
    category: "cookies",
    basePrice: 2.99,
    priceIsStartingAt: false,
    hasFlavorOptions: false,
    shippable: true,
  },
  {
    id: "c5",
    slug: "cupids-shortbread",
    name: "Cupid's Shortbread",
    shortDescription: "Delicate buttery shortbread",
    description: "Delicate buttery shortbread — melt-in-your-mouth perfection.",
    category: "cookies",
    basePrice: 2.99,
    priceIsStartingAt: false,
    hasFlavorOptions: false,
    shippable: true,
  },
  {
    id: "c6",
    slug: "chocolate-covered-strawberry",
    name: "Chocolate Covered Strawberry",
    shortDescription: "Chocolate with strawberry flavor",
    description: "Rich chocolate with real strawberry flavor throughout.",
    category: "cookies",
    basePrice: 2.99,
    priceIsStartingAt: false,
    hasFlavorOptions: false,
    shippable: true,
  },
  {
    id: "c7",
    slug: "double-chocolate-deluxe",
    name: "Double Chocolate Deluxe",
    shortDescription: "Double chocolate with extra chunks",
    description:
      "Double chocolate dough with extra chocolate chunks on top.",
    category: "cookies",
    basePrice: 2.99,
    priceIsStartingAt: false,
    hasFlavorOptions: false,
    shippable: true,
    featured: true,
  },
  {
    id: "c8",
    slug: "sweetheart-variety-pack",
    name: "Sweetheart Variety Pack",
    shortDescription: "A curated mix — perfect for gifting",
    description:
      "A little bit of everything in one curated pack — perfect for gifting.",
    category: "cookies",
    basePrice: 19.99,
    priceIsStartingAt: false,
    hasFlavorOptions: false,
    shippable: true,
    featured: true,
  },
];

export const CATALOG_PROVISIONAL = true as const;

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategoryId | "all"): Product[] {
  if (category === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function isCategoryId(value: string): value is CategoryId {
  return CATEGORIES.some((c) => c.id === value);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatProductPrice(product: Product): string {
  const price = formatPrice(product.basePrice);
  return product.priceIsStartingAt ? `Starting at ${price}` : price;
}
