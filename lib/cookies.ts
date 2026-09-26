/** Current (fall) cookie menu — confirmed by the owner. Prices are not set yet. */

export type Cookie = {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** Price per cookie in USD, or null while TBD (Add to Cart stays disabled). */
  price: number | null;
  /** Path to the real OrisYard photo once supplied. */
  image?: string;
  /** Placeholder tone until the real photo is supplied. */
  tone: string;
  active: boolean;
};

export const COOKIE_CAMPAIGN = "Fall just got sweeter.";

export const COOKIES: Cookie[] = [
  {
    id: "bbcc",
    slug: "brown-butter-chocolate-chunk",
    name: "Brown Butter Chocolate Chunk",
    description: "Our OG. Brown butter cookie loaded with rich chocolate chunks and toffee bits.",
    price: null,
    tone: "#B98252",
    active: true,
  },
  {
    id: "spc",
    slug: "sweet-potato-cheesecake",
    name: "Sweet Potato Cheesecake",
    description: "Sweet potato cookie with warm fall spices and creamy cheesecake center.",
    price: null,
    tone: "#D08A4E",
    active: true,
  },
  {
    id: "cdap",
    slug: "caramel-dutch-apple-pie",
    name: "Caramel Dutch Apple Pie",
    description:
      "Apple pie-inspired cookie with gooey apple filling, buttery Dutch crumb topping, caramel drizzle.",
    price: null,
    tone: "#C9964F",
    active: true,
  },
  {
    id: "bcrk",
    slug: "biscoff-crookie",
    name: "Biscoff Crookie",
    description: "Flaky croissant stuffed with Biscoff cookie dough and cookie butter.",
    price: null,
    tone: "#C4884A",
    active: true,
  },
  {
    id: "bb",
    slug: "brownie-batter",
    name: "Brownie Batter",
    description: "Rich, ultra-fudgy chocolate cookie packed with melty chocolate.",
    price: null,
    tone: "#5A3322",
    active: true,
  },
  {
    id: "hbc",
    slug: "honey-butter-cornflake",
    name: "Honey Butter Cornflake",
    description:
      "Soft honey brown sugar cookie with crispy caramelized honey-butter cornflake crunch.",
    price: null,
    tone: "#DDAA5C",
    active: true,
  },
];

export const ACTIVE_COOKIES = COOKIES.filter((c) => c.active);

export function getCookie(id: string) {
  return COOKIES.find((c) => c.id === id);
}
