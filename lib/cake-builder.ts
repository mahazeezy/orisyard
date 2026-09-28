/** Custom cake builder options — confirmed by the owner. */

export type CakeShape = "round" | "heart";

export type CakeSize = {
  id: string;
  shape: CakeShape;
  inches: 6 | 8 | 10;
  label: string;
  startingPrice: number;
};

export type PricedOption = {
  id: string;
  label: string;
  /** Surcharge in USD; 0 = included. */
  price: number;
  /** Placeholder swatch colour until the real photo is supplied. */
  swatch: string;
  /** Path to the real OrisYard photo once supplied. */
  image?: string;
};

export const CAKE_SIZES: CakeSize[] = [
  { id: "round-6", shape: "round", inches: 6, label: "6” Round", startingPrice: 75 },
  { id: "round-8", shape: "round", inches: 8, label: "8” Round", startingPrice: 100 },
  { id: "round-10", shape: "round", inches: 10, label: "10” Round", startingPrice: 130 },
  { id: "heart-6", shape: "heart", inches: 6, label: "6” Heart", startingPrice: 85 },
  { id: "heart-8", shape: "heart", inches: 8, label: "8” Heart", startingPrice: 110 },
  { id: "heart-10", shape: "heart", inches: 10, label: "10” Heart", startingPrice: 145 },
];

export const CAKE_FLAVORS: PricedOption[] = [
  { id: "vanilla", label: "Vanilla", price: 0, swatch: "#F6E7C8", image: "/images/builder/flavor-vanilla.jpg" },
  { id: "chocolate", label: "Chocolate", price: 0, swatch: "#6B3B26", image: "/images/builder/flavor-chocolate.jpg" },
  { id: "red-velvet", label: "Red Velvet", price: 4, swatch: "#A8213A", image: "/images/builder/flavor-red-velvet.jpg" },
  { id: "confetti", label: "Confetti", price: 4, swatch: "#F7E3EE", image: "/images/builder/flavor-confetti.jpg" },
  { id: "strawberry", label: "Strawberry", price: 4, swatch: "#F4A6B8", image: "/images/builder/flavor-strawberry.jpg" },
  { id: "cookies-cream", label: "Cookies & Cream", price: 5, swatch: "#D9D4CF", image: "/images/builder/flavor-cookies-cream.jpg" },
  { id: "lotus-biscoff", label: "Lotus Biscoff", price: 5, swatch: "#C8894E", image: "/images/builder/flavor-lotus-biscoff.jpg" },
];

export const CAKE_FILLINGS: PricedOption[] = [
  { id: "none", label: "No Filling", price: 0, swatch: "#FFFFFF", image: "/images/builder/filling-none.jpg" },
  { id: "strawberries", label: "Strawberries", price: 6, swatch: "#E7475E", image: "/images/builder/filling-strawberries.jpg" },
  { id: "ganache", label: "Chocolate Ganache", price: 6, swatch: "#4A2618", image: "/images/builder/filling-ganache.jpg" },
  { id: "cookie-butter", label: "Cookie Butter", price: 6, swatch: "#B9783F", image: "/images/builder/filling-cookie-butter.jpg" },
  { id: "cream-cheese", label: "Cream Cheese Frosting", price: 6, swatch: "#FBF3E6", image: "/images/builder/filling-cream-cheese.jpg" },
  { id: "fresh-berries", label: "Fresh Berries", price: 6, swatch: "#6E2A57", image: "/images/builder/filling-fresh-berries.jpg" },
  { id: "biscoff-crumbs", label: "Biscoff Crumbs", price: 6, swatch: "#C07B3F", image: "/images/builder/filling-biscoff-crumbs.jpg" },
  { id: "oreo-crumbs", label: "Oreo Crumbs", price: 6, swatch: "#2E2A2A" },
  { id: "oreo-buttercream", label: "Oreo Buttercream", price: 6, swatch: "#CFCAC6", image: "/images/builder/filling-oreo-buttercream.jpg" },
  { id: "biscoff-buttercream", label: "Biscoff Buttercream", price: 6, swatch: "#DDB184", image: "/images/builder/filling-biscoff-buttercream.jpg" },
];

export const CAKE_ADDONS: PricedOption[] = [
  { id: "bows", label: "Bows", price: 5, swatch: "#F7B8C8", image: "/images/builder/addon-bows.jpg" },
  { id: "cherries", label: "Cherries", price: 5, swatch: "#C8102E", image: "/images/builder/addon-cherries.jpg" },
  { id: "butterflies", label: "Butterflies", price: 5, swatch: "#F3C6E0", image: "/images/builder/addon-butterflies.jpg" },
  { id: "disco-balls", label: "Disco Balls", price: 5, swatch: "#D8D8E0", image: "/images/builder/addon-disco-balls.jpg" },
  { id: "custom-topper", label: "Custom Topper", price: 5, swatch: "#F2D4A8", image: "/images/builder/addon-custom-topper.jpg" },
  { id: "fake-flowers", label: "Fake Flowers", price: 7, swatch: "#F9D2DC", image: "/images/builder/addon-fake-flowers.jpg" },
];

export const WRITING_EXAMPLES = ["Happy Birthday", "Twenty Fine", "Chapter 25", "Virgo Baby"];

export const COLOR_PRESETS = [
  { name: "Blush Pink", hex: "#F8C8D4" },
  { name: "Hot Pink", hex: "#E83E8C" },
  { name: "Baby Blue", hex: "#BFDDF2" },
  { name: "Lavender", hex: "#D8C8EE" },
  { name: "Mint", hex: "#C7EBD9" },
  { name: "Butter Yellow", hex: "#F8E7A6" },
  { name: "Red", hex: "#C8102E" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#1A1A1A" },
  { name: "Gold", hex: "#D4AF37" },
];

export const CAKE_NOTICES = {
  availability:
    "Submitting an inquiry does not guarantee availability. Your order is confirmed after your final quote and required payment have been completed.",
  startingPrices:
    "Prices shown are starting prices. Your final price will depend on flavor, filling, add-ons, and design complexity.",
  inspiration:
    "Inspiration photos are used as a reference. Each Orisyard cake is handmade, so exact replicas are not guaranteed.",
  notAnOrder: "Submitting an inquiry does not place or confirm your order.",
};

export function findOption(list: PricedOption[], id: string | null | undefined) {
  return list.find((o) => o.id === id);
}
