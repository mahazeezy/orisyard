/**
 * Reviews copied verbatim from the legacy index.html.
 * Not labeled as verified. Treat as provisional content.
 */

export type Review = {
  id: string;
  quote: string;
  author: string;
};

export const REVIEWS: Review[] = [
  {
    id: "sarah-m",
    quote:
      "These cookies are absolutely divine. The double chocolate is out of this world — my whole family is obsessed!",
    author: "Sarah M., Merrillville",
  },
  {
    id: "keisha-t",
    quote:
      "Ordered for my daughter's birthday and everyone was asking where I got them. Orisyard never disappoints!",
    author: "Keisha T., Chicago",
  },
  {
    id: "maria-r",
    quote:
      "The lemon glazed cookies are something else. So fresh and perfectly sweet. Already ordered three times!",
    author: "Maria R., Hammond",
  },
];

export const REVIEWS_DISCLAIMER =
  "These quotes appear on the previous OrisYard site. They are not marked as verified reviews.";
