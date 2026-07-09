/* =======================================================
   VJ INTERIORS — Product catalogue
   Single source of truth used by:
   • Home → FeaturedProducts (first 4 items)
   • Products page → full grid
   ======================================================= */

export const products = [
  {
    id: 1,
    name: "3 Seater Recliner",
    category: "Living Room",
    price: "₹85,000",
    description: "Premium comfort with this plush 3-seater recliner, perfect for relaxing in your living space.",
    image: "/images/3 seater recliner.webp",
  },
  {
    id: 2,
    name: "6 Seater Dining Table",
    category: "Dining",
    price: "₹1,10,000",
    description: "Elegant and spacious 6-seater dining table for memorable family meals.",
    image: "/images/6 seater dining table.webp",
  },
  {
    id: 3,
    name: "Pearl Cafe Coffee Table Set",
    category: "Living Room",
    price: "₹32,000",
    description: "A beautiful coffee table set that adds a sophisticated touch to your seating area.",
    image: "/images/pearl cafe coffe table set.webp",
  },
  {
    id: 4,
    name: "Pooja Mandir",
    category: "Decor",
    price: "₹45,000",
    description: "Intricately carved wooden Pooja Mandir, bringing peace and spirituality to your home.",
    image: "/images/pooja mandir.webp",
  },
  {
    id: 5,
    name: "Seagrass Chandelier",
    category: "Lighting",
    price: "₹18,000",
    description: "Hand-woven rattan seagrass chandelier for a warm, natural lighting aesthetic.",
    image: "/images/seagrass, Chandelier,rattan Weaving light fixture.webp",
  },
  {
    id: 6,
    name: "Classic Sofa",
    category: "Living Room",
    price: "₹72,000",
    description: "A timeless sofa design with deep cushioning and a sturdy hardwood frame.",
    image: "/images/sofa.webp",
  },

  {
    id: 9,
    name: "Modular Kitchen Cabinet",
    category: "Kitchen",
    price: "₹1,25,000",
    description: "Fully customisable modular system in finger-pull matte lacquer with soft-close drawers.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 10,
    name: "Decorative Wall Mirror",
    category: "Decor",
    price: "₹9,500",
    description: "Oversized arched mirror in a thin antique-gold frame — amplifies light and space.",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800&auto=format&fit=crop",
  },

  {
    id: 12,
    name: "Indoor Planter Stand",
    category: "Decor",
    price: "₹6,000",
    description: "Three-tier elevated planter in powder-coated steel — bring the garden indoors.",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop",
  },
];

/* Convenience export: first 4 products for the homepage preview */
export const featuredProducts = products.slice(0, 4);
