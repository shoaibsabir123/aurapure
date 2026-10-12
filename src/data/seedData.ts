import { Product, BlogPost, ProductReview, Coupon } from '../types';

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'organic-structure-oil',
    name: 'Organic Structure Oil',
    subtitle: 'Nourish & Restore with Jojoba, Rosehip & Vitamin E',
    category: 'Skincare',
    price: 68,
    rating: 4.9,
    reviewsCount: 128,
    originCountry: 'Morocco & Chile',
    originCountryCode: 'MA',
    originRegion: 'Souss Valley & Andean Slopes',
    description: 'A transformative, nutrient-dense facial oil engineered to reinforce lipid barrier integrity, replenish cellular moisture, and impart a radiant, satin finish without congestion.',
    story: 'Conceived in collaboration with an organic certified cooperative in Morocco’s Souss Valley, our pure cold-pressed golden jojoba is combined with wild-harvested rosehip seed from high-altitude Chilean valleys. Each bottle delivers pure bio-active fatty acids and antioxidant vitamins.',
    ingredients: ['Simmondsia Chinensis (Jojoba) Seed Oil', 'Rosa Canina (Rosehip) Seed Oil', 'Tocopherol (Vitamin E)', 'Helianthus Annuus (Sunflower) Seed Oil', 'Rosmarinus Officinalis Leaf Extract'],
    ingredientDetails: [
      {
        name: 'Organic Jojoba Oil',
        botanicalName: 'Simmondsia Chinensis',
        origin: 'Morocco',
        benefit: 'Mimics natural skin sebum to balance hydration without clogging pores.'
      },
      {
        name: 'Wild Rosehip Seed Oil',
        botanicalName: 'Rosa Canina',
        origin: 'Chile',
        benefit: 'Concentrated in provitamin A & trans-retinoic acid to brighten and repair skin texture.'
      },
      {
        name: 'Natural Vitamin E',
        botanicalName: 'D-Alpha Tocopherol',
        origin: 'Spain',
        benefit: 'Potent fat-soluble antioxidant that shields against oxidative environmental stress.'
      }
    ],
    isCustomizable: true,
    customizationConfig: {
      baseLabel: 'Primary Base Oil',
      baseOptions: [
        {
          id: 'base-jojoba-rosehip',
          name: 'Golden Jojoba & Wild Rosehip Base',
          origin: 'Morocco & Chile',
          description: 'Balanced lipid formula ideal for normal, combination, and dry skin.',
          priceOffset: 0
        },
        {
          id: 'base-argan-prickly-pear',
          name: 'Rare Moroccan Prickly Pear & Argan',
          origin: 'Atlas Mountains, Morocco',
          description: 'Ultra-nourishing, rich in amino acids and phytosterols for mature skin.',
          priceOffset: 12
        },
        {
          id: 'base-squalane-camellia',
          name: 'Lightweight Botanical Squalane & Camellia',
          origin: 'Jeju Island, South Korea',
          description: 'Featherlight absorption, perfect for sensitive and acne-prone skin.',
          priceOffset: 8
        }
      ],
      boostersLabel: 'Select Active Botanical Boosters (Up to 2)',
      maxBoosters: 2,
      boosterOptions: [
        {
          id: 'booster-blue-tansy',
          name: 'Moroccan Blue Tansy Infusion',
          origin: 'Chefchaouen, Morocco',
          description: 'Rich in chamazulene, renowned for deep soothing and reducing skin redness.',
          priceOffset: 9,
          benefits: ['Reduces visible inflammation', 'Calms reactive capillaries']
        },
        {
          id: 'booster-sea-buckthorn',
          name: 'Himalayan Sea Buckthorn CO2 Extract',
          origin: 'Ladakh, India',
          description: 'High in Omega-7 palmitoleic acid for intensive cellular regeneration.',
          priceOffset: 8,
          benefits: ['Restores radiance', 'Supports collagen synthesis']
        },
        {
          id: 'booster-bakuchiol',
          name: 'Ayurvedic Babchi (Bakuchiol 2%)',
          origin: 'Rajasthan, India',
          description: 'Natural gentle alternative to retinol that smooths fine lines without photo-sensitivity.',
          priceOffset: 14,
          benefits: ['Smooths texture', 'Zero irritation']
        },
        {
          id: 'booster-frankincense',
          name: 'Wild Somalian Sacred Frankincense',
          origin: 'Sanaag Highlands, Somalia',
          description: 'Revered boswellic acids that firm tissue and tone facial contours.',
          priceOffset: 10,
          benefits: ['Tones & tightens', 'Grounding aroma']
        }
      ],
      scentsLabel: 'Natural Botanical Scent',
      scentOptions: [
        {
          id: 'scent-unscented',
          name: 'Fragrance-Free / Pure Seed',
          origin: 'Natural',
          description: 'Zero essential oils, pure earthy botanical seed aroma.',
          priceOffset: 0
        },
        {
          id: 'scent-neroli-bergamot',
          name: 'Tunisian Neroli & Calabrian Bergamot',
          origin: 'Tunisia & Italy',
          description: 'Crisp citrus floral with delicate sunny honey undertones.',
          priceOffset: 4
        },
        {
          id: 'scent-cedar-vetiver',
          name: 'Atlas Cedarwood & Haitian Vetiver',
          origin: 'Morocco & Haiti',
          description: 'Deep grounding woods with smoky moss accents.',
          priceOffset: 4
        }
      ],
      allowLabelEngraving: true
    },
    variations: [
      {
        id: 'var-30ml',
        name: '30ml Dropper Bottle',
        type: 'size',
        value: '30 ml / 1.0 fl oz',
        priceOffset: 0,
        stock: 34,
        image: 'https://images.unsplash.com/photo-1608248597359-0524458f4a13?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 'var-50ml',
        name: '50ml Dropper Bottle',
        type: 'size',
        value: '50 ml / 1.7 fl oz',
        priceOffset: 26,
        stock: 19,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 'var-100ml',
        name: '100ml Studio Decanter',
        type: 'size',
        value: '100 ml / 3.4 fl oz',
        priceOffset: 65,
        stock: 8,
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1608248597359-0524458f4a13?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 61,
    featured: true,
    bestseller: true,
    isNewArrival: false,
    tags: ['Organic', 'Facial Oil', 'Jojoba', 'Rosehip', 'Customizable', 'Clean Beauty']
  },
  {
    id: 'organic-clay-face-mask',
    name: 'Organic Clay Face Mask',
    subtitle: 'Detoxify & Glow with Uji Matcha & White Kaolin Clay',
    category: 'Skincare',
    price: 54,
    rating: 4.8,
    reviewsCount: 94,
    originCountry: 'Japan & France',
    originCountryCode: 'JP',
    originRegion: 'Uji (Kyoto) & Brittany Coast',
    description: 'A mineral-rich ceremonial treatment mask designed to gently extract micro-impurities, tighten pores, and infuse dermal cells with chlorophyll antioxidants without over-drying the epidermis.',
    story: 'Crafted from shade-grown first-flush Matcha sourced from organic hillside tea estates in Uji, Kyoto, paired with sun-dried ultra-refined French White Kaolin Clay. We honor Japanese skincare rituals where purification is both gentle and deeply restorative.',
    ingredients: ['Kaolin (White French Clay)', 'Camellia Sinensis (Ceremonial Matcha) Leaf Powder', 'Montmorillonite (French Green Clay)', 'Aloe Barbadensis Leaf Juice', 'Spirulina Platensis Powder', 'Melaleuca Alternifolia Leaf Extract'],
    ingredientDetails: [
      {
        name: 'Ceremonial Grade Matcha',
        botanicalName: 'Camellia Sinensis',
        origin: 'Uji, Kyoto, Japan',
        benefit: 'Packed with EGCG polyphenols that detoxify and shield against oxidative environmental pollution.'
      },
      {
        name: 'White Kaolin Clay',
        botanicalName: 'Hydrated Aluminium Silicate',
        origin: 'Brittany, France',
        benefit: 'The gentlest mineral clay, draws out oil and cellular debris without disrupting lipid moisture.'
      },
      {
        name: 'Organic Aloe Vera',
        botanicalName: 'Aloe Barbadensis',
        origin: 'Oaxaca, Mexico',
        benefit: 'Provides instant soothing hydration to balance the clay purifying cycle.'
      }
    ],
    isCustomizable: true,
    customizationConfig: {
      baseLabel: 'Clay Base Blend',
      baseOptions: [
        {
          id: 'clay-matcha-kaolin',
          name: 'Kyoto Matcha & White Kaolin',
          origin: 'Kyoto, Japan',
          description: 'Balanced gentle purification suitable for all skin types, especially combination.',
          priceOffset: 0
        },
        {
          id: 'clay-rhassoul-volcanic',
          name: 'Moroccan Rhassoul & Volcanic Ash',
          origin: 'Middle Atlas, Morocco',
          description: 'Deep mineral pore clearing, optimal for congested or oily T-zones.',
          priceOffset: 6
        },
        {
          id: 'clay-french-pink',
          name: 'French Rose Pink Clay & Chamomile',
          origin: 'Provence, France',
          description: 'Ultra-gentle soothing formula curated specifically for delicate, reactive skin.',
          priceOffset: 5
        }
      ],
      boostersLabel: 'Botanical Herbal Infusion (Select 1)',
      maxBoosters: 1,
      boosterOptions: [
        {
          id: 'herb-spirulina',
          name: 'Organic Hawaiian Spirulina Micro-Nutrients',
          origin: 'Kailua-Kona, Hawaii',
          description: 'Loaded with chlorophyll and bio-chelated minerals for cellular revitalization.',
          priceOffset: 6,
          benefits: ['Revitalizes dull complexions', 'Boosts cellular glow']
        },
        {
          id: 'herb-ginseng',
          name: 'Red Korean Panax Ginseng 6-Year Root',
          origin: 'Geumsan, South Korea',
          description: 'Traditional adaptogen known to energize skin micro-circulation.',
          priceOffset: 10,
          benefits: ['Energizes circulation', 'Firms epidermal tone']
        },
        {
          id: 'herb-willow-bark',
          name: 'Organic White Willow Bark (Natural Salicin)',
          origin: 'Bavarian Alps, Germany',
          description: 'Botanical BHA source providing gentle enzymatic pore exfoliation.',
          priceOffset: 7,
          benefits: ['Refines pore clarity', 'Prevents blemishes']
        }
      ],
      scentsLabel: 'Aromatherapeutic Herb Note',
      scentOptions: [
        {
          id: 'scent-sweet-mint',
          name: 'Organic Spearmint & Japanese Yuzu',
          origin: 'Japan',
          description: 'Crisp, cooling, and mood-lifting botanical note.',
          priceOffset: 3
        },
        {
          id: 'scent-chamomile-neroli',
          name: 'Roman Chamomile & Lavender Flower',
          origin: 'France',
          description: 'Soft herbal tranquilizer that relaxes facial tension.',
          priceOffset: 4
        },
        {
          id: 'scent-clay-natural',
          name: 'Unscented / Raw Mineral & Green Tea',
          origin: 'Natural',
          description: '100% natural aroma of matcha leaves and clean clay.',
          priceOffset: 0
        }
      ],
      allowLabelEngraving: true
    },
    variations: [
      {
        id: 'var-60g',
        name: '60g Amber Jar',
        type: 'size',
        value: '60 g / 2.1 oz',
        priceOffset: 0,
        stock: 45,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 'var-120g',
        name: '120g Deluxe Ceramic Jar + Bamboo Spoon',
        type: 'size',
        value: '120 g / 4.2 oz',
        priceOffset: 32,
        stock: 22,
        image: 'https://images.unsplash.com/photo-1567928815117-640a34b29b6f?auto=format&fit=crop&w=900&q=80'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1567928815117-640a34b29b6f?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 67,
    featured: true,
    bestseller: true,
    isNewArrival: false,
    tags: ['Detox', 'Face Mask', 'Matcha', 'Kaolin Clay', 'Customizable', 'Clean Skincare']
  },
  {
    id: 'provence-botanical-pillow-mist',
    name: 'Provence Lavender & Wild Thyme Sleep Mist',
    subtitle: 'Artisanal Distillation for Restorative Slumber & Linen',
    category: 'Wellness & Fragrance',
    price: 42,
    rating: 4.9,
    reviewsCount: 81,
    originCountry: 'France',
    originCountryCode: 'FR',
    originRegion: 'Plateau de Valensole, Provence',
    description: 'An atmospheric room and textile mist formulated with high-altitude true lavender (Lavandula Angustifolia) and wild thyme hydrolat. Clinically recognized botanical aromatics ease the nervous system into restorative sleep states.',
    story: 'Harvested at dawn during peak summer bloom on the sun-baked limestone plateau of Valensole. Our 4th-generation master distiller utilizes traditional copper alembics to capture delicate volatile linalool molecules without thermal degradation.',
    ingredients: ['Lavandula Angustifolia (True Lavender) Floral Water', 'Thymus Vulgaris (Wild Thyme) Leaf Hydrosol', 'Hamamelis Virginiana (Witch Hazel) Distillate', 'Cedrus Atlantica (Atlas Cedarwood) Bark Oil', 'Salvia Sclarea (Clary Sage) Essential Oil'],
    ingredientDetails: [
      {
        name: 'High-Altitude True Lavender',
        botanicalName: 'Lavandula Angustifolia',
        origin: 'Provence, France',
        benefit: 'Naturally high in linalool and linalyl acetate to quiet mental chatter and encourage slow-wave sleep.'
      },
      {
        name: 'Wild Thyme Hydrosol',
        botanicalName: 'Thymus Vulgaris',
        origin: 'Luberon, France',
        benefit: 'Purifies ambient room air and leaves linens naturally clean and fresh.'
      }
    ],
    isCustomizable: true,
    customizationConfig: {
      baseLabel: 'Hydrosol Mist Base',
      baseOptions: [
        {
          id: 'mist-lavender-thyme',
          name: 'True Lavender & Wild Thyme',
          origin: 'Valensole, France',
          description: 'Classic Provencal sleep formulation with floral and herbaceous depth.',
          priceOffset: 0
        },
        {
          id: 'mist-rose-chamomile',
          name: 'Grasse Rose & German Chamomile',
          origin: 'Grasse, France',
          description: 'Velvety floral comfort for tension release and serene stillness.',
          priceOffset: 6
        }
      ],
      boostersLabel: 'Aromatherapy Accents',
      maxBoosters: 1,
      boosterOptions: [
        {
          id: 'accent-bergamot',
          name: 'Cold-Pressed Bergamot (Bergapten-Free)',
          origin: 'Calabria, Italy',
          description: 'Lifts subtle mood and dissipates afternoon mental fatigue.',
          priceOffset: 4
        },
        {
          id: 'accent-frankincense',
          name: 'Somalian Resin Tears Distillate',
          origin: 'Somalia',
          description: 'Sacred resin providing meditative clarity and grounding.',
          priceOffset: 6
        }
      ],
      scentsLabel: 'Intensity Blend',
      scentOptions: [
        {
          id: 'scent-gentle',
          name: 'Subtle & Whispering (Light linen touch)',
          origin: 'Natural',
          description: 'Delicate aroma that evaporates gently without lingering heavy.',
          priceOffset: 0
        },
        {
          id: 'scent-deep',
          name: 'Deep Sanctuary (Higher botanical concentration)',
          origin: 'Natural',
          description: 'Enveloping botanical embrace ideal for bedtime meditation spaces.',
          priceOffset: 5
        }
      ],
      allowLabelEngraving: true
    },
    variations: [
      {
        id: 'var-100ml-mist',
        name: '100ml Matte Glass Atomizer',
        type: 'size',
        value: '100 ml / 3.4 oz',
        priceOffset: 0,
        stock: 50,
        image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 'var-200ml-mist',
        name: '200ml Sanctuary Flacon + Refill Dropper',
        type: 'size',
        value: '200 ml / 6.8 oz',
        priceOffset: 24,
        stock: 28,
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 78,
    featured: true,
    bestseller: false,
    isNewArrival: true,
    tags: ['Aromatherapy', 'Provence Lavender', 'Custom Mist', 'Sleep Ritual']
  },
  {
    id: 'kashmiri-saffron-sandalwood-balm',
    name: 'Kashmiri Saffron & Wild Sandalwood Body Crème',
    subtitle: 'Rich Adaptogenic Dermal Restoration & Radiant Warmth',
    category: 'Body & Bath',
    price: 64,
    rating: 5.0,
    reviewsCount: 47,
    originCountry: 'India',
    originCountryCode: 'IN',
    originRegion: 'Pampore Plateau & Karnataka',
    description: 'An indulgent, velvety body nectar infused with certified GI-tagged Mongra Saffron from the Pampore plateau and ethically cultivated Mysore sandalwood. Deeply repairs parched skin while cloaking limbs in an intoxicating, warm golden glow.',
    story: 'Known as the "Golden Spice of the Gods", our saffron requires 75,000 hand-picked purple crocus blooms to produce a single pound of vivid red stigmas. Blended in small copper kettles with organic kokum butter and sandalwood milk.',
    ingredients: ['Garcinia Indica (Kokum) Seed Butter', 'Santalum Album (Sandalwood) Hydrosol', 'Crocus Sativus (Saffron) Stigma Extract', 'Prunus Amygdalus Dulcis (Sweet Almond) Oil', 'Sesamum Indicum (Sesame) Seed Oil', 'Nelumbo Nucifera (Sacred Lotus) Extract'],
    ingredientDetails: [
      {
        name: 'Kashmiri Mongra Saffron',
        botanicalName: 'Crocus Sativus',
        origin: 'Pampore, Kashmir, India',
        benefit: 'Rich in crocin and safranal, imparting legendary luminosity and evening skin tone.'
      },
      {
        name: 'Ethical Mysore Sandalwood',
        botanicalName: 'Santalum Album',
        origin: 'Karnataka, India',
        benefit: 'Cools internal heat, smooths dry patches, and leaves a comforting sacred woody note.'
      }
    ],
    isCustomizable: false,
    variations: [
      {
        id: 'var-150ml-pot',
        name: '150ml Hand-Turned Terracotta Pot',
        type: 'size',
        value: '150 ml / 5.1 oz',
        priceOffset: 0,
        stock: 31,
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 'var-250ml-pot',
        name: '250ml Grand Apothecary Jar',
        type: 'size',
        value: '250 ml / 8.5 oz',
        priceOffset: 34,
        stock: 14,
        image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=80'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 45,
    featured: false,
    bestseller: true,
    isNewArrival: false,
    tags: ['Body Butter', 'Saffron', 'Sandalwood', 'Ayurvedic', 'Luxury']
  },
  {
    id: 'oaxaca-smoked-terracotta-vessel',
    name: 'Oaxaca Hand-Thrown Smoked Terracotta Vessel',
    subtitle: 'Artisan Zapotec Incense & Ritual Herb Burner',
    category: 'Handcrafted Crafts',
    price: 72,
    rating: 4.9,
    reviewsCount: 38,
    originCountry: 'Mexico',
    originCountryCode: 'MX',
    originRegion: 'San Bartolo Coyotepec, Oaxaca',
    description: 'A tactile, heirloom sculptural object hand-shaped using local Oaxaca river clay, burnished with quartz river stones, and pit-fired with oak and copal wood to achieve its natural velvety matte black and charcoal smoke finish.',
    story: 'Created by Maestro Manuel and his family collective in Oaxaca, where ceramic traditions have endured for more than twenty-five centuries. No synthetic glazes or chemicals are ever used—the smoky patina is born strictly of earth and cedar embers.',
    ingredients: ['100% Native Oaxaca River Clay', 'Natural Smoked Oak Ash', 'Wild Copal Resin Shavings included'],
    isCustomizable: false,
    variations: [
      {
        id: 'var-charcoal-smoke',
        name: 'Smoked Charcoal Matte',
        type: 'color',
        value: 'Charcoal Matte',
        priceOffset: 0,
        stock: 16,
        image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 'var-raw-terracotta',
        name: 'Warm Earth Terracotta',
        type: 'color',
        value: 'Raw Ochre Earth',
        priceOffset: 0,
        stock: 12,
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 28,
    featured: false,
    bestseller: false,
    isNewArrival: true,
    tags: ['Handcrafted', 'Ceramics', 'Oaxaca', 'Artisan', 'Home Decor']
  },
  {
    id: 'tuscan-olive-leaf-cleanser',
    name: 'Tuscan Olive Leaf & Bergamot Cleansing Oil',
    subtitle: 'Antioxidant-Rich Dermal Purifier & Micro-Emulsion',
    category: 'Skincare',
    price: 48,
    rating: 4.8,
    reviewsCount: 63,
    originCountry: 'Italy',
    originCountryCode: 'IT',
    originRegion: 'Chianti Hills, Tuscany',
    description: 'A silky hydro-active cleansing oil that melts long-wear sunscreen and makeup without stripping cellular lipids. Rinses clean with water into a gentle milky emulsion, leaving skin luminous and soft.',
    story: 'Cold-extracted from biodynamic olive groves cultivated on sun-drenched terraced hills outside Florence. Enriched with fresh olive leaf oleuropein—a phytonutrient shown to possess 400% greater antioxidant capacity than Vitamin C.',
    ingredients: ['Olea Europaea (Olive) Fruit Oil', 'Polyglyceryl-4 Oleate', 'Citrus Aurantium Bergamia (Bergamot) Peel Oil', 'Olea Europaea Leaf Extract', 'Vitis Vinifera (Grape) Seed Oil', 'Tocopherol'],
    ingredientDetails: [
      {
        name: 'Biodynamic Tuscan Olive Oil',
        botanicalName: 'Olea Europaea',
        origin: 'Tuscany, Italy',
        benefit: 'Rich in squalene and polyphenols, dissolves impurities while maintaining moisture barrier.'
      },
      {
        name: 'Olive Leaf Oleuropein',
        botanicalName: 'Oleuropein Glycoside',
        origin: 'Florence, Italy',
        benefit: 'Fiercely neutralizes oxidative free radicals and preserves natural firmness.'
      }
    ],
    isCustomizable: false,
    variations: [
      {
        id: 'var-150ml-cleanser',
        name: '150ml Pump Bottle',
        type: 'size',
        value: '150 ml / 5.1 fl oz',
        priceOffset: 0,
        stock: 42,
        image: 'https://images.unsplash.com/photo-1556228722-d0b5d928c9b9?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 'var-300ml-refill',
        name: '300ml Eco Refill Pouch',
        type: 'size',
        value: '300 ml / 10.2 fl oz',
        priceOffset: 28,
        stock: 25,
        image: 'https://images.unsplash.com/photo-1608248597359-0524458f4a13?auto=format&fit=crop&w=900&q=80'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1556228722-d0b5d928c9b9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1608248597359-0524458f4a13?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 67,
    featured: false,
    bestseller: false,
    isNewArrival: false,
    tags: ['Cleanser', 'Olive Oil', 'Tuscany', 'Clean Beauty']
  },
  {
    id: 'ghanaian-baobab-shea-butter',
    name: 'Ghanaian Wild-Harvested Baobab & Raw Shea Butter',
    subtitle: 'Deep Replenishment for Dry Skin & Hair Strands',
    category: 'Body & Bath',
    price: 38,
    rating: 4.9,
    reviewsCount: 75,
    originCountry: 'Ghana',
    originCountryCode: 'GH',
    originRegion: 'Northern Region, Tamale',
    description: 'An unrefined, Grade-A whipped butter hand-processed by women artisans using ancient smoke-free water-emulsion techniques. Deeply soothes eczema, chapped lips, dry cuticles, and sun-exposed skin.',
    story: 'Sourced in direct fair-wage trade with the Pagba Shea Cooperative in Northern Ghana. We pay 2.5x the local commodity rate to directly support women artisans and girls’ secondary school scholarships.',
    ingredients: ['Butyrospermum Parkii (Unrefined Shea) Butter', 'Adansonia Digitata (Baobab) Seed Oil', 'Theobroma Cacao (Raw Cocoa) Seed Butter', 'Citrus Nobilis (Mandarin Orange) Peel Oil'],
    isCustomizable: false,
    variations: [
      {
        id: 'var-100g-shea',
        name: '100g Recyclable Tin',
        type: 'size',
        value: '100 g / 3.5 oz',
        priceOffset: 0,
        stock: 58,
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 'var-200g-shea',
        name: '200g Grand Kitchen Glass Jar',
        type: 'size',
        value: '200 g / 7.0 oz',
        priceOffset: 20,
        stock: 31,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 89,
    featured: false,
    bestseller: true,
    isNewArrival: false,
    tags: ['Fair Trade', 'Shea Butter', 'Baobab', 'Ghana', 'Body Care']
  },
  {
    id: 'alentejo-cork-diffuser-vessel',
    name: 'Alentejo Cork & Ceramic Essential Oil Diffuser',
    subtitle: 'Passive Aromatherapy Vessel for Mindful Spaces',
    category: 'Home & Living',
    price: 58,
    rating: 4.7,
    reviewsCount: 29,
    originCountry: 'Portugal',
    originCountryCode: 'PT',
    originRegion: 'Alentejo Montado Forest',
    description: 'A sculptural, electricity-free passive aroma diffuser marrying sustainably stripped Portuguese cork and porous unglazed biscuit stoneware. Gently evaporates botanical essential oils into your room throughout the day.',
    story: 'Harvested without felling a single tree: Portugal’s cork oak forests are carefully hand-stripped once every nine years by generational corticeiros. The harvested bark naturally regenerates, absorbing five times more carbon than unharvested trees.',
    ingredients: ['100% Regenerative Portuguese Cork Oak Bark', 'Unglazed Porous White Biscuit Ceramic'],
    isCustomizable: false,
    variations: [
      {
        id: 'var-sand-cork',
        name: 'Sand Stone + Natural Cork',
        type: 'color',
        value: 'Natural Sand',
        priceOffset: 0,
        stock: 24,
        image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 'var-olive-cork',
        name: 'Olive Green Stoneware + Dark Smoked Cork',
        type: 'color',
        value: 'Olive Stoneware',
        priceOffset: 6,
        stock: 15,
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 39,
    featured: false,
    bestseller: false,
    isNewArrival: true,
    tags: ['Sustainable', 'Home Decor', 'Diffuser', 'Cork', 'Portugal']
  },
  {
    id: 'pakistan-himalayan-pink-salt-polish',
    name: 'Himalayan Pink Salt & Hunza Apricot Mineral Polish',
    subtitle: '84 Primal Trace Minerals with Cold-Pressed Wild Apricot Kernel Oil',
    category: 'Body & Bath',
    price: 52,
    rating: 4.9,
    reviewsCount: 68,
    originCountry: 'Pakistan',
    originCountryCode: 'PK',
    originRegion: 'Khewra Salt Range & Hunza Valley',
    description: 'An intensely restorative, mineral-packed body polish marrying ancient rose-hued halite crystals extracted from Pakistan’s primal Khewra salt beds with raw, cold-pressed wild apricot kernel oil from the glacier-fed Hunza Valley.',
    story: 'Extracted by hand without explosives in the ancient Salt Range of Punjab, Pakistan, preserved under volcanic ash for over 250 million years. We blend these trace-mineral-rich pink crystals with pure unrefined apricot kernel oil pressed by women’s artisan cooperatives in the high-altitude Karakoram valleys of Hunza.',
    ingredients: [
      'Sodium Chloride (Primal Himalayan Pink Halite)',
      'Prunus Armeniaca (Hunza Wild Apricot) Kernel Oil',
      'Carthamus Tinctorius Seed Oil',
      'Tocopherol (Vitamin E)',
      'Juniperus Communis (Karakoram Mountain Juniper) Berry Oil',
      'Mentha Arvensis (Wild Himalayan Mint) Leaf Oil'
    ],
    ingredientDetails: [
      {
        name: 'Ancient Himalayan Pink Halite',
        botanicalName: 'Mineral Halite Crystal',
        origin: 'Khewra Salt Range, Pakistan',
        benefit: 'Contains 84 bio-available trace electrolytes that stimulate lymphatic drainage and cellular remineralization.'
      },
      {
        name: 'Hunza Glacial Wild Apricot Oil',
        botanicalName: 'Prunus Armeniaca',
        origin: 'Hunza Valley, Gilgit-Baltistan, Pakistan',
        benefit: 'Rich in provitamin A and essential oleic acids, deeply softens dry tissue and restores skin elasticity.'
      },
      {
        name: 'Karakoram Mountain Juniper',
        botanicalName: 'Juniperus Communis',
        origin: 'Karakoram Range, Pakistan',
        benefit: 'Wild high-altitude evergreen essence that clarifies and invigorates fatigued muscles.'
      }
    ],
    isCustomizable: true,
    customizationConfig: {
      baseLabel: 'Mineral Polish Texture',
      baseOptions: [
        {
          id: 'base-pink-silk',
          name: 'Fine Himalayan Silk Halite + Apricot Oil',
          origin: 'Khewra, Pakistan',
          description: 'Micro-crystalline texture for gentle all-over smoothing and sensitive skin.',
          priceOffset: 0
        },
        {
          id: 'base-coarse-detox',
          name: 'Coarse Rose Crystals + Hunza Apricot & Almond',
          origin: 'Khewra & Hunza, Pakistan',
          description: 'Medium-coarse exfoliating crystals ideal for deep lymphatic and foot ritual exfoliation.',
          priceOffset: 5
        }
      ],
      boostersLabel: 'Botanical Herbal Infusion',
      maxBoosters: 1,
      boosterOptions: [
        {
          id: 'booster-hunza-mint',
          name: 'Wild Karakoram Field Mint (Cooling Refresh)',
          origin: 'Gilgit, Pakistan',
          description: 'Natural high-menthol alpine mint providing a tingling fresh awakening.',
          priceOffset: 4,
          benefits: ['Stimulates circulation', 'Cooling after-feel']
        },
        {
          id: 'booster-kashmiri-rose-petals',
          name: 'Wild Mountain Rose Petals & Cardamom',
          origin: 'Northern Pakistan',
          description: 'Aromatic crushed petals delivering gentle bio-flavonoids and romantic floral notes.',
          priceOffset: 6,
          benefits: ['Softens skin barrier', 'Lifts mood']
        }
      ],
      scentsLabel: 'Aromatherapy Profile',
      scentOptions: [
        {
          id: 'scent-pakistan-juniper',
          name: 'Mountain Juniper & Cedar (Woody Alpine)',
          origin: 'Pakistan',
          description: 'Crisp mountain forest air with grounding resin undertones.',
          priceOffset: 3
        },
        {
          id: 'scent-sweet-apricot',
          name: 'Pure Honeyed Apricot & Sweet Almond',
          origin: 'Hunza, Pakistan',
          description: 'Warm gourmand botanical aroma reminiscent of summer fruit orchards.',
          priceOffset: 0
        }
      ],
      allowLabelEngraving: true
    },
    variations: [
      {
        id: 'var-250g-polish',
        name: '250g Heavy Glass Apothecary Tub',
        type: 'size',
        value: '250 g / 8.8 oz',
        priceOffset: 0,
        stock: 48,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 'var-500g-polish',
        name: '500g Grand Jar + Olive Wood Bath Spoon',
        type: 'size',
        value: '500 g / 17.6 oz',
        priceOffset: 28,
        stock: 22,
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 70,
    featured: true,
    bestseller: true,
    isNewArrival: true,
    tags: ['Pakistan', 'Himalayan Salt', 'Hunza Valley', 'Body Scrub', 'Customizable', 'Minerals', 'Clean Beauty']
  },
  {
    id: 'hunza-wild-apricot-elixir',
    name: 'Hunza Glacier Wild Apricot Cellular Oil',
    subtitle: 'Cold-Pressed Karakoram Valley Youth Nectar & Essential Lipids',
    category: 'Skincare',
    price: 62,
    rating: 4.9,
    reviewsCount: 52,
    originCountry: 'Pakistan',
    originCountryCode: 'PK',
    originRegion: 'Hunza Valley, Gilgit-Baltistan',
    description: 'Harvested from century-old heirloom apricot orchards watered exclusively by ancient glacial runoff in Northern Pakistan. Exceptionally concentrated in bioactive phytosterols, Vitamin E, and oleic fatty acids to restore supple resilience to dry and reactive complexions.',
    story: 'In the remote mountain kingdom of Hunza, wild apricot trees cling to steep Himalayan terraces at 2,500 meters altitude. The oil is cold-pressed by generational women artisans on carved stone mills without synthetic refining, preserving its natural golden glow and sweet marzipan fragrance.',
    ingredients: [
      'Prunus Armeniaca (Hunza Wild Apricot) Kernel Oil',
      'Tocopherol (Pure Vitamin E)',
      'Helianthus Annuus Seed Oil',
      'Boswellia Serrata (Frankincense) Resin Extract'
    ],
    ingredientDetails: [
      {
        name: 'Hunza Cold-Pressed Apricot Kernel Oil',
        botanicalName: 'Prunus Armeniaca',
        origin: 'Hunza Valley, Pakistan',
        benefit: 'Deeply penetrates lipid bilayers, smoothing fine wrinkles without pore congestion.'
      },
      {
        name: 'Natural Mountain Vitamin E',
        botanicalName: 'D-Alpha Tocopherol',
        origin: 'Pakistan',
        benefit: 'Fierce antioxidant defense protecting cellular walls against ultraviolet stress.'
      }
    ],
    isCustomizable: true,
    customizationConfig: {
      baseLabel: 'Apricot Seed Extraction Base',
      baseOptions: [
        {
          id: 'base-pure-hunza-apricot',
          name: '100% Pure Virgin Hunza Apricot Kernel',
          origin: 'Hunza Valley, Pakistan',
          description: 'Single-source cold-pressed golden elixir, intensely hydrating yet featherlight.',
          priceOffset: 0
        },
        {
          id: 'base-apricot-black-seed',
          name: 'Hunza Apricot & Pakistani Kalonji (Black Seed)',
          origin: 'Punjab & Hunza, Pakistan',
          description: 'Infused with thymoquinone-rich black cumin seed for clearing reactive breakouts.',
          priceOffset: 10
        }
      ],
      boostersLabel: 'Targeted Bio-Active Boosters (Up to 2)',
      maxBoosters: 2,
      boosterOptions: [
        {
          id: 'booster-sea-buckthorn-karakoram',
          name: 'Karakoram Wild Sea Buckthorn Berry',
          origin: 'Skardu, Pakistan',
          description: 'High in Omega-7 palmitoleic acid for intense dermal barrier elasticity.',
          priceOffset: 8,
          benefits: ['Firms skin tone', 'Imparts natural golden glow']
        },
        {
          id: 'booster-blue-tansy-blend',
          name: 'Moroccan Blue Tansy Soothing Drops',
          origin: 'Chefchaouen, Morocco',
          description: 'Potent chamazulene anti-inflammatory soothing for reactive redness.',
          priceOffset: 9,
          benefits: ['Calms inflammation', 'Soothes capillaries']
        }
      ],
      scentsLabel: 'Botanical Aroma Note',
      scentOptions: [
        {
          id: 'scent-natural-apricot',
          name: 'Pure Sweet Apricot Seed (Fragrance-Free)',
          origin: 'Natural',
          description: 'Unscented, retaining its natural sweet almond bouquet.',
          priceOffset: 0
        },
        {
          id: 'scent-mountain-rose',
          name: 'Pakistani Mountain Rose & Cardamom',
          origin: 'Pakistan',
          description: 'Subtle regal floral spiced with freshly cracked wild cardamom.',
          priceOffset: 4
        }
      ],
      allowLabelEngraving: true
    },
    variations: [
      {
        id: 'var-30ml-apricot',
        name: '30ml Pharmaceutical Dropper',
        type: 'size',
        value: '30 ml / 1.0 fl oz',
        priceOffset: 0,
        stock: 36,
        image: 'https://images.unsplash.com/photo-1608248597359-0524458f4a13?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 'var-50ml-apricot',
        name: '50ml Deluxe Apothecary Decanter',
        type: 'size',
        value: '50 ml / 1.7 fl oz',
        priceOffset: 24,
        stock: 19,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80'
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1608248597359-0524458f4a13?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80'
    ],
    stock: 55,
    featured: true,
    bestseller: false,
    isNewArrival: true,
    tags: ['Pakistan', 'Hunza Valley', 'Apricot Oil', 'Facial Oil', 'Customizable', 'Clean Skincare']
  }
];

export const SEED_BLOG_POSTS: BlogPost[] = [
  {
    id: 'the-rose-of-the-karakoram-pakistan-apricot-and-salt',
    title: 'The Rose of the Karakoram: Sourcing Wild Apricot and Ancient Pink Halite in Pakistan',
    slug: 'the-rose-of-the-karakoram-pakistan-apricot-and-salt',
    category: 'Global Sourcing',
    excerpt: 'Journey to the dramatic glacier valleys of Hunza and the primordial Khewra salt mountains to discover two of nature’s most potent dermal restoratives.',
    content: `Nestled along the jagged snow-capped spine of the Karakoram mountain range in Northern Pakistan lies the valley of Hunza. At over 2,500 meters altitude, glacial meltwater charged with pulverized mineral silt irrigates terraced orchards of heritage wild apricot trees that have thrived here for centuries.

### The Sacred Apricot Kernel
Unlike cultivated orchard fruit, wild Hunza apricots yield kernel oil of staggering bio-activity. Rich in oleic and linoleic essential fatty acids, it penetrates human skin within seconds, replenishing depleted ceramides without the greasy film common to synthetic emollients.

### 250 Million Years in the Making: Khewra Pink Halite
South of the Himalayas, in the Salt Range of Punjab, Pakistan, rest the ancient subterranean chambers of Khewra. Formed when a prehistoric ocean evaporated over 250 million years ago and was subsequently sealed under volcanic basalt, this salt contains 84 vital ionic trace elements—including magnesium, calcium, and potassium.

When hand-ground into fine crystals and suspended in cold-pressed Hunza apricot oil, it creates a body polish that stimulates micro-circulation, detoxifies sluggish lymph nodes, and leaves limbs with an unprecedented velvet finish.`,
    author: 'Rizwan Sabir',
    authorRole: 'Master Botanical Sourcing Specialist',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
    tags: ['Pakistan', 'Hunza Valley', 'Himalayan Salt', 'Sourcing', 'Karakoram'],
    publishedAt: '2026-09-28'
  },
  {
    id: 'the-ritual-of-custom-botanicals',
    title: 'The Alchemy of Custom Botanicals: Tailoring Nature to Your Skin Lipid Needs',
    slug: 'the-ritual-of-custom-botanicals',
    category: 'Rituals',
    excerpt: 'Why single-formula skincare often falls short, and how cold-pressed botanicals tailored to your personal microclimate restore radiance.',
    content: `Skin is never static. It shifts with the seasons, altitude, humidity, and emotional stress. When you customize a botanical formula with Aura Pure, you are engaging in an ancient practice modernized by lipid science.

### The Foundation: Carrier Oils as Dermal Architecture
Not all oils behave identically on the epidermis. Golden Jojoba from Morocco closely mimics human wax esters, making it universally bio-compatible. When blended with high-altitude Chilean Rosehip—rich in trans-retinoic acid—the formula penetrates without residue.

### Active Boosters: Target Specific Imbalances
- **Moroccan Blue Tansy**: Infused with chamazulene, renowned for quelling micro-inflammation and reducing reactive redness.
- **Himalayan Sea Buckthorn**: A rare source of palmitoleic acid (Omega-7) that supports cellular membrane elasticity.
- **Bakuchiol**: The Ayurvedic plant-derived miracle that stimulates collagen without the peeling associated with synthetic retinol.

Your bespoke blend is compounded by hand upon order, bottled in light-shielding amber apothecary glass, and shipped fresh to your door.`,
    author: 'Elena Vance, Herbalist & Biochemist',
    authorRole: 'Head of Formulation at Aura Pure',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1608248597359-0524458f4a13?auto=format&fit=crop&w=900&q=80',
    tags: ['Skincare', 'Custom Formulation', 'Botanicals', 'Lipids'],
    publishedAt: '2026-09-15'
  },
  {
    id: 'kyoto-matcha-harvest-and-kaolin-clay',
    title: 'Shade, Mist, and Stone: Sourcing Ceremonial Matcha in the Hills of Uji, Kyoto',
    slug: 'kyoto-matcha-harvest-and-kaolin-clay',
    category: 'Global Sourcing',
    excerpt: 'Step inside the family-run hillside estates where the pure green leaves for our Detoxifying Mask are hand-picked before sunrise.',
    content: `In the undulating river valleys of Uji, morning fog drifts between rows of tea bushes covered in black woven reed shades. This shade-growing technique, called 'Tana', forces the Camellia Sinensis plants to concentrate supreme quantities of chlorophyll and theanine.

When ground slowly between grooved granite millstones at a speed of only 30 grams per hour, the resulting powder is microscopic in fineness and emerald in hue.

### Why Matcha Works Wonders on the Skin
Matcha contains roughly 137 times more epigallocatechin gallate (EGCG) than standard brewed green tea. When suspended in a base of French Brittany Kaolin clay, it:
1. Neutralizes city smog and airborne heavy metals.
2. Tightens lax pore walls without dehydrating dermal cells.
3. Imparts an immediate clarity and calm to irritated complexions.`,
    author: 'Kenji Takahashi',
    authorRole: 'Ethical Sourcing Director, East Asia',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
    tags: ['Matcha', 'Japan', 'Sourcing', 'Antioxidants'],
    publishedAt: '2026-09-02'
  },
  {
    id: 'sustainability-and-zero-plastic-pledge',
    title: 'The Pure Cycle: Why We Package in Glass, Recycled Cork, and Stone',
    slug: 'sustainability-and-zero-plastic-pledge',
    category: 'Sustainability',
    excerpt: 'Our commitment to a closed-loop system: from biodegradable mushroom packaging to infinitely recyclable pharmaceutical amber glass.',
    content: `The global cosmetics industry produces over 120 billion units of packaging annually—the vast majority consisting of multi-layer plastic pumps and unrecyclable sachets.

At Aura Pure, every single container is designed with intentional permanence:
- **Amber Pharmaceutical Glass**: Protects photo-sensitive antioxidants from UV light while being 100% infinitely recyclable.
- **Portuguese Montado Cork**: Naturally harvested bark that absorbs five times more CO2 than unstripped trees.
- **Oaxaca Smoked Terracotta**: Handcrafted heirloom clay vessels intended to live on your bedside table for decades.
- **Mushroom Mycelium Mailers**: Our shipping inserts dissolve into home garden soil within 45 days.`,
    author: 'Aura Pure Sustainability Guild',
    authorRole: 'Impact Team',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80',
    tags: ['Sustainability', 'Eco Luxury', 'Zero Plastic', 'Circular Design'],
    publishedAt: '2026-08-20'
  }
];

export const SEED_COUPONS: Coupon[] = [
  {
    id: 'coupon-welcome15',
    code: 'WELCOME15',
    discountPercent: 15,
    minOrder: 40,
    isActive: true
  },
  {
    id: 'coupon-pure10',
    code: 'PURE10',
    discountPercent: 10,
    minOrder: 0,
    isActive: true
  },
  {
    id: 'coupon-earthday20',
    code: 'EARTHDAY20',
    discountPercent: 20,
    minOrder: 100,
    isActive: true
  }
];

export const SEED_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    productId: 'organic-structure-oil',
    userName: 'Claire M.',
    userCountry: 'United Kingdom',
    rating: 5,
    title: 'Transformed my dry autumn skin completely',
    comment: 'I personalized my Structure Oil with the Moroccan Blue Tansy booster and Tunisian Neroli note. My face has never looked so calm and dewy. The engraved label with my name on the bottle makes it feel like an apothecary treasure.',
    verifiedPurchase: true,
    createdAt: '2026-09-18'
  },
  {
    id: 'rev-2',
    productId: 'organic-structure-oil',
    userName: 'Julian K.',
    userCountry: 'Germany',
    rating: 5,
    title: 'Cleanest facial oil I have ever tested',
    comment: 'No greasy film, absorbs within two minutes, and the subtle herbaceous scent is sublime. Knowing the exact cooperative where the jojoba was cold-pressed gives true peace of mind.',
    verifiedPurchase: true,
    createdAt: '2026-09-10'
  },
  {
    id: 'rev-3',
    productId: 'organic-clay-face-mask',
    userName: 'Amara D.',
    userCountry: 'France',
    rating: 5,
    title: 'Gentle enough for my sensitive skin',
    comment: 'Most clay masks leave my skin tight and red. The Uji matcha and white kaolin in this mask feels like a cool silk mousse. My pores look refined and clear after every Sunday ritual.',
    verifiedPurchase: true,
    createdAt: '2026-09-22'
  },
  {
    id: 'rev-4',
    productId: 'provence-botanical-pillow-mist',
    userName: 'Sofia R.',
    userCountry: 'United States',
    rating: 5,
    title: 'Instant sleep trigger',
    comment: 'Two spritzes across my linen pillows before reading and my nervous system just relaxes. True high-altitude lavender smells completely different from artificial lavender perfumes.',
    verifiedPurchase: true,
    createdAt: '2026-09-14'
  },
  {
    id: 'rev-5',
    productId: 'pakistan-himalayan-pink-salt-polish',
    userName: 'Zainab A.',
    userCountry: 'United Kingdom',
    rating: 5,
    title: 'Unrivaled minerals from Khewra and Hunza',
    comment: 'As someone of Pakistani heritage, knowing the ancient Khewra pink salt and wild Hunza apricot oil are sourced directly from ethical cooperatives is heartwarming. The texture is divine—my skin feels polished like polished marble.',
    verifiedPurchase: true,
    createdAt: '2026-09-29'
  },
  {
    id: 'rev-6',
    productId: 'hunza-wild-apricot-elixir',
    userName: 'David M.',
    userCountry: 'Canada',
    rating: 5,
    title: 'Remarkable cold-pressed oil',
    comment: 'The natural marzipan aroma is completely organic with zero synthetic perfumes. Absorbs into dry mountain winter skin instantly.',
    verifiedPurchase: true,
    createdAt: '2026-09-27'
  }
];
