import { CakeDesign } from '../types';

export const CAKE_DESIGNS: CakeDesign[] = [
  {
    id: 'opulent-botanical-wedding',
    title: 'Botanical Elegance 3-Tier',
    category: 'wedding',
    tagline: 'Cascading pressed edible florals & wafer paper ruffles',
    description: 'A breathtaking three-tiered masterpiece finished in velvety Swiss meringue buttercream, adorned with hand-placed fresh organic edible blooms, gold foil leafing, and delicate textured sugar detailing.',
    imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1000&q=80',
    servings: '75 - 95 guests',
    recommendedTiers: '3 Tiers (6" / 8" / 10")',
    priceFrom: 340,
    popular: true,
    styleTags: ['Fresh Florals', 'Swiss Buttercream', 'Gold Leaf', 'Rustic Romance'],
    signatureFlavors: [
      { sponge: 'Madagascan Vanilla Bean', filling: 'Raspberry Coulis & White Chocolate Ganache' },
      { sponge: 'Lemon & Elderflower', filling: 'Meyer Lemon Curd Buttercream' }
    ],
    leadTimeDays: 14
  },
  {
    id: 'vintage-lambeth-pearl',
    title: 'Vintage Lambeth Rococo Cake',
    category: 'birthday',
    tagline: 'Ornate Victorian piping with cocktail maraschino cherries',
    description: 'An ethereal pastel heart cake sculpted with intricate Victorian over-piping, intricate scallops, draped pearl beadings, and glossy candied cherries. The quintessential timeless birthday centerpiece.',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80',
    servings: '12 - 16 guests',
    recommendedTiers: 'Single Tier (8" Heart or Round)',
    priceFrom: 95,
    popular: true,
    styleTags: ['Vintage Lambeth', 'Heart Shape', 'Victorian Piping', 'Pastel Aesthetic'],
    signatureFlavors: [
      { sponge: 'Red Velvet Classic', filling: 'Tahitian Vanilla Cream Cheese' },
      { sponge: 'Confetti Funfetti Buttercake', filling: 'Silky Vanilla Buttercream' }
    ],
    leadTimeDays: 5
  },
  {
    id: 'dark-chocolate-berry-drip',
    title: 'Decadent Belgian Ganache Drip',
    category: 'anniversary',
    tagline: '70% Belgian chocolate glaze with gilded forest berries',
    description: 'Deep, rich dark chocolate fudge sponge filled with salted caramel crisp, blanketed in dark cocoa ganache drip, freeze-dried raspberries, and 24k edible gold dust.',
    imageUrl: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1000&q=80',
    servings: '18 - 24 guests',
    recommendedTiers: 'Tall Single Tier (8" Extended Height)',
    priceFrom: 110,
    popular: true,
    styleTags: ['Chocolate Drip', 'Fresh Berries', 'Gold Dust', 'Rich & Dark'],
    signatureFlavors: [
      { sponge: 'Double Fudge Belgian Cocoa', filling: 'Dark Truffle Ganache & Salted Caramel' },
      { sponge: 'Mocha Espresso Sponge', filling: 'Hazelnut Praline Buttercream' }
    ],
    leadTimeDays: 4
  },
  {
    id: 'korean-minimalist-bento',
    title: 'Pastel Bento Lunchbox Cake',
    category: 'bento',
    tagline: 'Cute, pocket-sized individual cake with custom handwriting',
    description: 'The Korean-style minimalist lunchbox cake. Packaged in an eco-friendly sugarcane bento box with wooden spoon and matching artisan candle. Ideal for intimate couples, birthdays, or sweet gestures.',
    imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1000&q=80',
    servings: '2 - 4 guests',
    recommendedTiers: 'Miniature 4" Bento',
    priceFrom: 35,
    popular: true,
    styleTags: ['Bento Cake', 'Minimalist', 'Custom Lettering', 'Eco Bento Box'],
    signatureFlavors: [
      { sponge: 'Earl Grey Infused Vanilla', filling: 'Honey Lavender Buttercream' },
      { sponge: 'Fluffy Strawberry Shortcake', filling: 'Fresh Strawberry Compote & Chantilly' }
    ],
    leadTimeDays: 2
  },
  {
    id: 'whimsical-woodland-safari',
    title: 'Whimsical Woodland Safari',
    category: 'novelty',
    tagline: 'Hand-sculpted fondant fauna & botanical greenery',
    description: 'Charming handcrafted safari animal figurines nestled among textured buttercream bark, fondant vines, and golden jungle foliage. Designed to create pure childhood delight.',
    imageUrl: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&fit=crop&w=1000&q=80',
    servings: '25 - 30 guests',
    recommendedTiers: '2 Tiers (6" / 8")',
    priceFrom: 165,
    popular: false,
    styleTags: ['Hand-Sculpted', 'Kids Birthday', 'Animal Fondant', 'Themed'],
    signatureFlavors: [
      { sponge: 'Golden Sponge', filling: 'Smooth Milk Chocolate Mousse' },
      { sponge: 'Vanilla Sponge', filling: 'Strawberry Jam & Vanilla Buttercream' }
    ],
    leadTimeDays: 7
  },
  {
    id: 'marble-geometric-wedding',
    title: 'Modern Marble & Rose Gold Tier',
    category: 'wedding',
    tagline: 'Hand-painted sugar marble with crisp sharp edges',
    description: 'Sleek architectural design featuring watercolor grey-and-blush marble fondant, accented by a rose gold geometric separator tier and handcrafted sugar peonies.',
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1000&q=80',
    servings: '60 - 75 guests',
    recommendedTiers: '2 Tall Tiers (6" / 8" Extended)',
    priceFrom: 290,
    popular: false,
    styleTags: ['Marble Effect', 'Rose Gold', 'Sugar Flowers', 'Modern Minimalist'],
    signatureFlavors: [
      { sponge: 'Pistachio & Cardamom', filling: 'White Chocolate & Rosewater Cream' },
      { sponge: 'Rich Carrot & Roasted Pecan', filling: 'Zesty Cream Cheese Filling' }
    ],
    leadTimeDays: 14
  },
  {
    id: 'artisan-cupcake-bouquet',
    title: 'Artisan Floral Cupcake Platter',
    category: 'cupcakes',
    tagline: 'Dozen hyper-realistic buttercream hydrangeas & roses',
    description: 'A presentation box of twelve gourmet cupcakes piped by hand with botanical precision: blooming English roses, tulips, and hydrangeas in organic natural food tones.',
    imageUrl: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=1000&q=80',
    servings: '12 Individual Cupcakes',
    recommendedTiers: 'Set of 12 / 24',
    priceFrom: 48,
    popular: true,
    styleTags: ['Cupcakes', 'Floral Piping', 'Gift Box', 'Artisan Treats'],
    signatureFlavors: [
      { sponge: 'Vanilla Bean Sponge', filling: 'Raspberry Jam Core & Buttercream' },
      { sponge: 'Spiced Biscoff Sponge', filling: 'Biscoff Cookie Butter Buttercream' }
    ],
    leadTimeDays: 2
  },
  {
    id: 'rustic-semi-naked-fig',
    title: 'Rustic Semi-Naked Honey & Fig',
    category: 'anniversary',
    tagline: 'Scraped buttercream with fresh mission figs & rosemary',
    description: 'Understated elegance celebrating rustic textures. Layers of spiced honey sponge subtly peeking through silky buttercream, topped with halved mission figs, blackberries, and fresh rosemary sprigs.',
    imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1000&q=80',
    servings: '20 - 25 guests',
    recommendedTiers: '2 Tiers (6" / 8")',
    priceFrom: 145,
    popular: false,
    styleTags: ['Semi-Naked', 'Fresh Figs', 'Rustic Chic', 'Earthy Elegance'],
    signatureFlavors: [
      { sponge: 'Wildflower Honey & Lavender', filling: 'Mascarpone Buttercream' },
      { sponge: 'Carrot & Candied Walnut', filling: 'Spiced Cream Cheese' }
    ],
    leadTimeDays: 5
  },
  {
    id: 'champagne-anniversary-glitz',
    title: 'Champagne Shimmer & Macarons',
    category: 'anniversary',
    tagline: 'Edible luster dust with handmade French macarons',
    description: 'Glittering ivory shimmer finish crowned with handmade French almond macarons, edible crystal isomalt geode accents, and personalized acrylic topper.',
    imageUrl: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=1000&q=80',
    servings: '16 - 20 guests',
    recommendedTiers: 'Single Tier 8" Tall',
    priceFrom: 120,
    popular: false,
    styleTags: ['French Macarons', 'Luster Dust', 'Glamour', 'Geode Texture'],
    signatureFlavors: [
      { sponge: 'Pink Champagne Sponge', filling: 'Strawberry Coulis & White Chocolate' },
      { sponge: 'Madagascan Vanilla', filling: 'Passionfruit Curd' }
    ],
    leadTimeDays: 5
  },
  {
    id: 'rainbow-cloud-fantasy',
    title: 'Pastel Rainbow Cloud Burst',
    category: 'birthday',
    tagline: 'Ombre rainbow sponge layers hidden beneath fluffy cloud piping',
    description: 'A delight for young and young-at-heart. Cut inside to reveal six pastel rainbow sponge layers sandwiched between creamy vanilla meringue, decorated with golden stars and cloud swirls.',
    imageUrl: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=1000&q=80',
    servings: '16 - 20 guests',
    recommendedTiers: 'Single Tier (7" Tall)',
    priceFrom: 105,
    popular: false,
    styleTags: ['Rainbow Layers', 'Whimsical', 'Kids Birthday', 'Pastel Cloud'],
    signatureFlavors: [
      { sponge: '6-Color Pastel Vanilla Sponge', filling: 'Fluffy Marshmallow Buttercream' }
    ],
    leadTimeDays: 4
  },
  {
    id: 'classic-tiered-rosette',
    title: 'Pearl Rosette Cascades',
    category: 'wedding',
    tagline: 'Textured ombré buttercream rosettes with sugar pearls',
    description: 'Romantic seamless ombre cascading from soft blush to ivory rosettes covering two generous tiers. Timeless, photogenic, and intensely moist.',
    imageUrl: 'https://images.unsplash.com/photo-1568827999250-3f04a8497672?auto=format&fit=crop&w=1000&q=80',
    servings: '50 - 65 guests',
    recommendedTiers: '2 Tiers (7" / 9")',
    priceFrom: 260,
    popular: false,
    styleTags: ['Rosette Piping', 'Ombre Blush', 'Wedding Centerpiece', 'Pearls'],
    signatureFlavors: [
      { sponge: 'Almond & Amaretto Sponge', filling: 'Cherry Compote & Vanilla Creme' },
      { sponge: 'Classic Victoria Sponge', filling: 'Seedless Raspberry & Buttercream' }
    ],
    leadTimeDays: 10
  },
  {
    id: 'matcha-pistachio-bento',
    title: 'Japanese Uji Matcha Bento',
    category: 'bento',
    tagline: 'Kyoto ceremonial matcha with toasted pistachio crumb',
    description: 'Subtly sweet earthy Kyoto matcha sponge balanced with white chocolate cream and crushed roasted Sicilian pistachios. Presented in a miniature custom kraft bento.',
    imageUrl: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1000&q=80',
    servings: '2 - 3 guests',
    recommendedTiers: '4" Bento Cake',
    priceFrom: 38,
    popular: false,
    styleTags: ['Matcha', 'Bento Box', 'Japanese Style', 'Less Sweet'],
    signatureFlavors: [
      { sponge: 'Uji Ceremonial Matcha', filling: 'White Chocolate Mascarpone' }
    ],
    leadTimeDays: 2
  }
];

export const SPONGE_FLAVORS = [
  'Madagascan Bourbon Vanilla',
  'Belgian Double Fudge Dark Chocolate',
  'Zesty Lemon & Elderflower',
  'Classic Velvet with Cocoa',
  'Spiced Carrot, Cinnamon & Roasted Pecan',
  'Kyoto Ceremonial Matcha',
  'Earl Grey Infused Bergamot',
  'Salted Caramel & Toasted Pecan',
  'Funfetti Celebration Buttercake'
];

export const FILLING_FLAVORS = [
  'Vanilla Bean Swiss Meringue Buttercream',
  'Dark Belgian Chocolate Ganache (70%)',
  'House-made Raspberry & Blackberry Compote',
  'Meyer Lemon Curd & Cream',
  'Salted Butter Caramel Drizzle',
  'White Chocolate Pistachio Truffle',
  'Silky Cream Cheese Frosting',
  'Lotus Biscoff Cookie Spread',
  'Passionfruit & Mango Curd'
];

export const DIETARY_OPTIONS = [
  'Standard Authentic Recipe',
  'Eggless / Vegetarian Available',
  'Gluten-Friendly Available',
  'Nut-Free Facility Standard',
  'Low-Sugar Recipe'
];

export const WHATSAPP_LINK = 'https://wa.me/message/B3VAE2VODNMBJ1';
export const WHATSAPP_PHONE = '27812078640'; // International format without +
export const DISPLAY_PHONE = '+27 81 207 8640';
export const BAKERY_EMAIL = 'chansauthenticcakes@gmail.com';
export const STUDIO_LOCATION = '58 Albert Street, George Central, George. 6529';
export const BAKERY_HOURS = 'Mon - Sat: 8:30 AM – 5:30 PM | Sun: By Appointment';

export function getWhatsAppUrl(customText?: string): string {
  if (customText && customText.trim()) {
    return `${WHATSAPP_LINK}?text=${encodeURIComponent(customText.trim())}`;
  }
  return WHATSAPP_LINK;
}

