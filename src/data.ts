import { Product, Review } from "./types";

export const INSTAGRAM_PHOTOS = [
  {
    id: "ig-1",
    url: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=600&auto=format&fit=crop",
    likes: "2.4K",
    comments: "148"
  },
  {
    id: "ig-2",
    url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
    likes: "1.8K",
    comments: "92"
  },
  {
    id: "ig-3",
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop",
    likes: "3.1K",
    comments: "256"
  },
  {
    id: "ig-4",
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop",
    likes: "4.2K",
    comments: "305"
  },
  {
    id: "ig-5",
    url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop",
    likes: "2.7K",
    comments: "119"
  },
  {
    id: "ig-6",
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
    likes: "5.0K",
    comments: "412"
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: "rev-1",
    name: "Alexander V.",
    rating: 5,
    comment: "The heavyweight fabric density is unbelievable. XLoth has nailed the luxury streetwear look with the perfect drop-shoulder silhouette, reminding me of high-end bespoke garments from Paris showrooms.",
    date: "2026-05-18",
    verified: true,
    itemPurchased: "Archival Boxy Hoodie (01)"
  },
  {
    id: "rev-2",
    name: "Sophia L.",
    rating: 5,
    comment: "Exquisite presentation. The matte black custom luxury packaging and the gold-foil stitch lines are so premium. It fits beautifully oversized without looking baggy.",
    date: "2026-05-24",
    verified: true,
    itemPurchased: "Heavy Knit Oversized Longsleeve"
  },
  {
    id: "rev-3",
    name: "Marcus K.",
    rating: 5,
    comment: "The French Terry texture is heavy but breathable. This street clothing withstands the wash perfectly without losing its structured fit or deep charcoal tone. Incredible craft.",
    date: "2026-06-02",
    verified: true,
    itemPurchased: "Signature Heavyweight Tee"
  },
  {
    id: "rev-4",
    name: "Elena R.",
    rating: 4,
    comment: "Excellent custom streetwear. The proportions are exact. I am 5'8\" and the M sizing serves a gorgeous architectural structure. Highly recommend their bespoke line.",
    date: "2026-06-08",
    verified: true,
    itemPurchased: "Modular Brutalist Work Pants"
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "prod-1",
    name: "Signature Heavyweight Tee",
    price: 85,
    category: "Oversized T-Shirts",
    subCategory: "Premium Essentials",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=700&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=700&auto=format&fit=crop",
    description: "Constructed from our ultra-dense 315GSM combed cotton, the signature box-cut tee features double-ribbed custom collars and drops perfectly at the shoulder. Finished in a washed charcoal tone.",
    details: [
      "100% Organically Grown Cotton",
      "Pre-shrunk fibers for consistent sizing",
      "Custom metal branded tag stitching at the back hem",
      "Handcrafted in Tokyo workshops"
    ],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isBestSeller: true,
    inStock: true
  },
  {
    id: "prod-2",
    name: "Archival Boxy Hoodie (01)",
    price: 185,
    category: "Hoodies",
    subCategory: "Streetwear Outerwear",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=700&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=700&auto=format&fit=crop",
    description: "An architectural masterpiece in heavy cotton. Featuring an elite double-layered hood (no drawstrings for a ultra-luxurious, clean neckline profile), kangaroo pouch pocket, and rib-elastic side cuffs.",
    details: [
      "460GSM ultra-heavy French Terry lining",
      "Slightly cropped waist with custom rib-bundling",
      "Elegant metal plate detail at the hood apex",
      "Engineered drop-shoulder frame"
    ],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    isBestSeller: true,
    inStock: true
  },
  {
    id: "prod-3",
    name: "Modular Brutalist Work Pants",
    price: 210,
    category: "Streetwear",
    subCategory: "Tailored Streetwear",
    image: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=700&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=700&auto=format&fit=crop",
    description: "Form, functionality, and minimalism integrated. Features a tailored straight-leg fit, modular side bellows with custom gold plated RiRi zippers, and high-tensile ripstop knee panels.",
    details: [
      "Water-resistant dense Japanese canvas",
      "Signature double-stitched reinforced utility loops",
      "Concealed adjustable drawstrings at cuff",
      "Luxury matte-gold finish rivet buttons"
    ],
    sizes: ["M", "L", "XL"],
    isNew: true,
    isBestSeller: false,
    inStock: true
  },
  {
    id: "prod-4",
    name: "Luxe Modular Utility Vest",
    price: 145,
    category: "Streetwear",
    subCategory: "Premium Techwear",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=700&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=700&auto=format&fit=crop",
    description: "Designed for premium layering. Engineered with dual-access tactical chest pouches, sleek low-profile mesh padding, and heavy-duty adjustable seatbelt compression buckles.",
    details: [
      "3M reflective piping thread",
      "Water-repellent technical nylon blend",
      "Sleek gold-tipped utility cords",
      "Rear zipper cargo bay slot"
    ],
    sizes: ["S", "M", "L"],
    isNew: false,
    isBestSeller: false,
    inStock: true
  },
  {
    id: "prod-5",
    name: "Ecru Drop Shoulder Knit",
    price: 165,
    category: "New Arrivals",
    subCategory: "Minimalist Knitwear",
    image: "https://images.unsplash.com/photo-1574164904299-3a102b110380?q=80&w=700&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=700&auto=format&fit=crop",
    description: "A gorgeous luxury knit for high-end styling. Handcrafted with a tight fisherman weave from high-twist organic wool, offering an elegant drape and remarkable temperature-regulating quality.",
    details: [
      "100% fine Icelandic organic wool knit",
      "Seamless collar connection with flatlock stitches",
      "Exquisite natural raw ecru/cream coloring",
      "Dry clean only for lifetime retention"
    ],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isBestSeller: true,
    inStock: true
  },
  {
    id: "prod-6",
    name: "Bespoke Street Hooded Jacket",
    price: 245,
    category: "Hoodies",
    subCategory: "Premium Outerwear",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=700&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=700&auto=format&fit=crop",
    description: "A stunning crossover between a designer leather coat structure and a functional hoodie. Heavyweight twill canvas shell, premium fully lined satin interior, and tailored high-neck zip collar.",
    details: [
      "Rigid structured heavy twill outer shell",
      "Premium black-satin gloss internal lining",
      "Solid modular brass zippers with gold-leaf overlay",
      "Rib knit inside hems for heat trapping"
    ],
    sizes: ["S", "M", "L"],
    isNew: true,
    isBestSeller: false,
    inStock: true
  },
  {
    id: "prod-7",
    name: "Raw Charcoal Sport Pant",
    price: 155,
    category: "Streetwear",
    subCategory: "Premium Loungewear",
    image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=700&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=700&auto=format&fit=crop",
    description: "Elevate your daily lounge. These tracks feature a luxurious heavy French Terry drape, side seam hidden zip pockets, and single-needle gold-thread branding accents.",
    details: [
      "400GSM organic cotton fibers",
      "Custom gunmetal drawstring ends",
      "Rear magnetic closure card pouch",
      "Flexible elasticized waist build"
    ],
    sizes: ["M", "L", "XL"],
    isNew: false,
    isBestSeller: true,
    inStock: true
  },
  {
    id: "prod-8",
    name: "Earthenton Boxy Tee",
    price: 80,
    category: "Oversized T-Shirts",
    subCategory: "Premium Essentials",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=700&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=700&auto=format&fit=crop",
    description: "Taking modern basics to luxury standards. Made in custom earthenton washed clay palette using eco-benign pigments. It fits exceptionally clean with an industrial shape.",
    details: [
      "Premium breathable long-fiber cotton",
      "Specially dyed with natural minerals",
      "Exquisite drape weight that moves with gravity",
      "Contrast double stitch seams on points"
    ],
    sizes: ["S", "M", "L"],
    isNew: false,
    isBestSeller: false,
    inStock: false
  }
];

export const CRAFTSMANSHIP_DETAILS = [
  {
    title: "1. Raw Fabric Selection",
    desc: "We scan international spinning mills for our custom heavy weights. Every thread in our Signature Tees and Hoodies originates from 100% fine long-fiber organic cotton, resulting in rich textures that hold architectural silhouettes structural integrity forever."
  },
  {
    title: "2. Precision Tailoring",
    desc: "Our design studios utilize advanced mathematical modeling to perfect the drop-shoulder e-commerce sizing. We cut garments so they cascade naturally down the human skeletal structure - providing voluminous fits without losing sleekness."
  },
  {
    title: "3. Modular Durability",
    desc: "Every seams is secured using heavy-duty German Amann-group threads and flatlocked joints. Our metal details are bespoke plated with heavy matte gold to guard against erosion, providing garments that can be passed down generations."
  }
];
