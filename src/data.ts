import { Product, ShippingMethod } from './types';

export const CATEGORIES = [
  'Gaming',
  'Audio',
  'Productivity',
  'Smart Home',
  'Streaming Gear',
  'Accessories'
];

export const BRANDS = [
  'Nexus',
  'CyberGlow',
  'Aerotech',
  'Chronos',
  'Luminar',
  'Matrix'
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'CyberClaw Pro Mechanical Keyboard',
    price: 189,
    originalPrice: 229,
    rating: 4.8,
    reviewsCount: 124,
    category: 'Gaming',
    brand: 'CyberGlow',
    description: 'Hot-swappable tactile mechanical switch keyboard with per-key dynamic cyber cyan RGB backlight customization and solid aluminum plate.',
    fullDescription: 'Unleash elite responsiveness and custom style with the CyberClaw Pro. Designed for professional gamers and software developers alike, it features hot-swappable mechanical sockets, premium PBT doubleshot keycaps, and a robust machined aluminum top plate. Connect via ultra-fast 2.4GHz wireless, Bluetooth 5.1, or high-speed USB-C. Experience true tactile typing that elevates your actions.',
    images: [
      'https://picsum.photos/id/180/800/800', // Keyboard
      'https://picsum.photos/id/160/800/800'  // Detailed close-up
    ],
    specs: {
      'Layout': 'Tenkeyless (80%)',
      'Connectivity': 'USB-C / 2.4GHz Wireless / Bluetooth 5.1',
      'Battery Life': 'Up to 200 hours (RGB Off)',
      'Keycaps': 'Double-shot PBT Cherry Profile',
      'Hot-swap Sockets': '3-pin / 5-pin compatible',
      'Weight': '980g'
    },
    colors: ['Neon Black', 'Chroma White', 'Titanium Gray'],
    switchTypes: ['Tactile Brown', 'Linear Red', 'Clicky Blue'],
    inStock: true,
    stockCount: 15,
    tags: ['RGB', 'Wireless', 'Hot-swap', 'Mechanical'],
    isTrending: true
  },
  {
    id: 'prod-2',
    name: 'AeroFlow Wireless Ergonomic Mouse',
    price: 89,
    originalPrice: 109,
    rating: 4.6,
    reviewsCount: 98,
    category: 'Productivity',
    brand: 'Aerotech',
    description: 'Ultra-lightweight high-precision ergonomic wireless mouse with adjustable DPI, infinite vertical scroll wheel, and side thumb control clusters.',
    fullDescription: 'The AeroFlow wireless mouse is designed with human anatomy in mind to reduce carpal stress and muscular tension during long working sessions. Powered by a custom PixArt 26K DPI optical sensor, it provides pixel-perfect accuracy for spreadsheet wizards and creative directors. Featuring dual-mode scrolling (tactile and hyper-fast), silent clicks, and custom programmable thumb buttons.',
    images: [
      'https://picsum.photos/id/3/800/800', // Mouse
      'https://picsum.photos/id/4/800/800'
    ],
    specs: {
      'Sensor': 'AeroPix 26K Optical Sensor',
      'DPI Range': '100 - 26,000 DPI (adjust in-app)',
      'Polling Rate': '1000Hz / 1ms response',
      'Weight': '68g ultra-lightweight',
      'Buttons': '8 fully programmable switches',
      'Battery Duration': 'Up to 120 hours on single AA/charge'
    },
    colors: ['Matte Black', 'Frost White', 'Sage Green'],
    inStock: true,
    stockCount: 42,
    tags: ['Wireless', 'Ergonomic', 'Lightweight', 'High-DPI'],
    isTrending: true
  },
  {
    id: 'prod-3',
    name: 'NeoPods Max Active Noise Cancelling Earbuds',
    price: 159,
    originalPrice: 199,
    rating: 4.9,
    reviewsCount: 215,
    category: 'Audio',
    brand: 'Nexus',
    description: 'Immersive sound earbuds featuring composite drivers, elite hybrid 45dB Active Noise Cancellation, and high-fidelity LDAC audio transmission.',
    fullDescription: 'NeoPods Max represent the pinnacle of acoustic engineering for compact audio. Featuring customized 11mm dual-magnetic dynamic drivers and advanced hybrid feedforward & feedback ANC microphones, they block up to 45dB of static environment noise, letting you focus inside airports, offices, or study rooms. Supports hi-res wireless LDAC decoding and multi-point companion pairing.',
    images: [
      'https://picsum.photos/id/48/800/800', // Tech earbuds style
      'https://picsum.photos/id/10/800/800'
    ],
    specs: {
      'Audio Drivers': '11mm Dynamic + Balanced Armatures',
      'ANC Level': 'Up to 45dB Intelligent Hybrid',
      'Audio Codecs': 'LDAC, AAC, SBC, aptX Adaptive',
      'Waterproof Standard': 'IPX7 Water & Sweat Resistant',
      'Playback Duration': '9 hours (ANC on) / 36 hours total with charging case',
      'Bluetooth Core': 'Bluetooth 5.3 with dual multipoint'
    },
    colors: ['Midnight Black', 'Platinum White', 'Cyber Teal'],
    inStock: true,
    stockCount: 22,
    tags: ['ANC', 'Hi-Res Audio', 'IPX7', 'Bluetooth 5.3'],
    isTrending: true
  },
  {
    id: 'prod-4',
    name: 'Chronos X Pro Smartwatch',
    price: 249,
    originalPrice: 299,
    rating: 4.7,
    reviewsCount: 88,
    category: 'Smart Home',
    brand: 'Chronos',
    description: 'AMOLED display smartwatch with advanced biometric vitals monitoring, offline tracking, and dynamic home hub voice controls.',
    fullDescription: 'The Chronos X Pro is your intelligent health companion and automated smart home interface right on your wrist. Framed inside a tough aerospace-grade titanium alloy casing, it features a 1.45-inch ultra-bright AMOLED displaying seamless 60 FPS transitions. Tracks heart-rate variance, SPO2 oxygen levels, personal sleep optimization patterns, and hosts native widgets to control smart lights, thermostats, and media servers.',
    images: [
      'https://picsum.photos/id/101/800/800', // Smartwatch
      'https://picsum.photos/id/102/800/800'
    ],
    specs: {
      'Display Screen': '1.45" Always-on AMOLED (466x466 px, 326 ppi)',
      'Frame Quality': 'Aerospace Grade 5 Titanium Casing',
      'Health Tracking': 'Vitals Heart Sync, Temp, SpO2, HRV Metric Engine',
      'Navigation Standard': 'Dual-band L1/L5 GNSS Satellite Location',
      'Survival Limits': '5ATM pressure proof with diving support',
      'Battery Lifespan': 'Up to 14 days standard usage'
    },
    colors: ['Obsidian Black', 'Titanium Gray', 'Desert Amber'],
    storageOptions: ['64GB Storage', '128GB Pro Storage'],
    inStock: true,
    stockCount: 8,
    tags: ['AMOLED', 'GPS', 'Smart-Home', 'Titanium'],
    isTrending: true
  },
  {
    id: 'prod-5',
    name: 'Nova RGB Ambient LED Desk Strip',
    price: 39,
    originalPrice: 49,
    rating: 4.5,
    reviewsCount: 76,
    category: 'Smart Home',
    brand: 'CyberGlow',
    description: 'Dynamic addressable IC chip RGB desk illumination with rhythm music synchronization, app dashboard controls, and voice assistant integrations.',
    fullDescription: 'Create the ultimate cyberpunk workspace with Nova LED light strips. Powered by Addressable RGBIC chips, every segment of the tape can cast different colors simultaneously, resulting in gorgeous gradients, breathing neon loops, and customized task presets. Features a high-sensitivity audio microphone controller that translates PC audio and background beats into dynamic reactive lighting arrays.',
    images: [
      'https://picsum.photos/id/104/800/800', // Desk scene
      'https://picsum.photos/id/154/800/800'
    ],
    specs: {
      'Strip Length': '5 Meters / 16.4 Feet (adjustable cutouts)',
      'Luminance Chips': '150 Addressable RGBIC LEDs with diffusers',
      'Control Methods': 'WiFi iOS/Android App, Bluetooth Controller, Local Soundbox',
      'Sync Modes': '8 Ambient Patterns & 6 Sound-Reactive audio presets',
      'Home Ecosystem': 'Alexa, Google Assistant, Webhooks API compliance'
    },
    colors: ['Neon Rainbow', 'Warm Sunset', 'Classic Mono'],
    inStock: true,
    stockCount: 110,
    tags: ['RGBIC', 'Alexa Compatible', 'Music Sync', 'Lighting'],
    isTrending: false
  },
  {
    id: 'prod-6',
    name: 'Horizon 15.6" Slim Portable Monitor',
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    reviewsCount: 143,
    category: 'Productivity',
    brand: 'Nexus',
    description: 'Crisp IPS 1080p high refresh rates lightweight external screen with dual USB-C full-function ports and foldable magnetic protective stand.',
    fullDescription: 'Boost your dual-display workflow anywhere with the Horizon Portable Monitor. Framed in a solid CNC-milled aluminum frame barely 4.7mm thin, this IPS display renders vibrant 100% sRGB colors with native HDR 10 high dynamic ranges. Hook up your tablet, smartphone, laptop, or gaming console via a single USB Type-C plug that transmits both juice and video datasets.',
    images: [
      'https://picsum.photos/id/119/800/800', // Monitor
      'https://picsum.photos/id/111/800/800'
    ],
    specs: {
      'Screen Size': '15.6 Inch IPS Panel',
      'Resolution': 'Full HD 1920x1080 Pixels',
      'Refresh Speed': '120Hz Ultra-smooth rate',
      'Color Space': '100% sRGB, 8-bit dynamic color depth',
      'Connectors': '2x USB-C (All-in-one), 1x Mini HDMI, 1x 3.5mm Jack',
      'Display Cover': 'Magnetic Carbon Fiber Kickstand Smart Cover'
    },
    colors: ['Carbon Slate', 'Sterling Silver'],
    inStock: true,
    stockCount: 12,
    tags: ['IPS', '120Hz', 'USB-C', 'Portable'],
    isTrending: true
  },
  {
    id: 'prod-7',
    name: 'OctaHub 8-in-1 Premium USB-C Dock',
    price: 69,
    originalPrice: 79,
    rating: 4.4,
    reviewsCount: 54,
    category: 'Accessories',
    brand: 'Nexus',
    description: 'Heavy duty high-speed hub supporting 4K 60Hz HDMI outputs, massive 100W Power Delivery loops, Gigabit Ethernet port, and SD slots.',
    fullDescription: 'Clear clutter and link accessories using the heavy-duty OctaHub. It features a space-gray aluminum unibody designed to dissipate internal heat. Transmit flawless 4K high frames media to external TVs or studio projectors with the 4K 60Hz HDMI slot, and keep laptop levels full via the 100W USB-C continuous pass-through charging.',
    images: [
      'https://picsum.photos/id/164/800/800', // Hub style
      'https://picsum.photos/id/201/800/800'
    ],
    specs: {
      'Host Connector': 'Flexible reinforced braided USB-C cable',
      'Data Port Outlets': '1x HDMI 2.0 (4K@60Hz), 1x USB-C PD (100W), 3x USB 3.2 Gen2 (10Gbps)',
      'Wired Network Card': 'Gigabit RJ45 Ethernet (10/100/1000Mbps)',
      'Flash Readers': 'Dedicated SD & MicroSD UHS-I Card Readers',
      'Material Finish': 'Sleek anodized sandblasted structural aluminum'
    },
    colors: ['Space Gray', 'Champagne Pearl'],
    inStock: true,
    stockCount: 85,
    tags: ['4K HDMI', 'Power Delivery', 'Ethernet', 'Alloy'],
    isTrending: false
  },
  {
    id: 'prod-8',
    name: 'Luminar Pro Streaming Key Light',
    price: 129,
    originalPrice: 149,
    rating: 4.7,
    reviewsCount: 63,
    category: 'Streaming Gear',
    brand: 'Luminar',
    description: 'Professional video studio LED panel with desk-clamp, color temp adjustments, silent cooling structures, and wifi app integration.',
    fullDescription: 'Look professional on camera with the Luminar Pro Key Light. Delivering up to 2500 lumens of crisp, uniformly diffused light, it eliminates harsh shadows and provides natural, eye-friendly video lighting. Control color temperature (2900K - 7000K) and brightness seamlessly from your desktop app, smartphone, or Elgato Stream Deck companion shortcuts.',
    images: [
      'https://picsum.photos/id/250/800/800', // Camera light or ring style
      'https://picsum.photos/id/251/800/800'
    ],
    specs: {
      'Luminous Level': 'Adjustable 2500 Lumens Max output',
      'Temp Gamut': 'Bi-Color 2900K to 7000K adjustable spectrum',
      'Color Quality': 'Premium High CRI index exceeding >95 rating',
      'Mount Attachment': 'Master Desk Clamp with flexible multi-angle ball head',
      'Wireless Sync': '802.11 b/g/n 2.4GHz internal chip',
      'Input Power': 'Steady 36W external brick adapter'
    },
    colors: ['Anodized Jet Black'],
    inStock: true,
    stockCount: 18,
    tags: ['Lighting', 'Studio', 'Streaming', 'App-Control'],
    isTrending: true
  },
  {
    id: 'prod-9',
    name: 'SoundCore Condenser USB Streaming Mic',
    price: 119,
    originalPrice: 139,
    rating: 4.8,
    reviewsCount: 82,
    category: 'Streaming Gear',
    brand: 'Nexus',
    description: 'High-definition 192kHz/24bit polar pattern condenser mic featuring zero-latency monitoring, visual levels, and instant tap-to-mute.',
    fullDescription: 'Deliver rich, high-fidelity broadcast sound with the SoundCore Condenser Mic. Built specifically for podcasters, streamers, and remote executives, this cardioid pattern capsule captures crystal clear midranges and warm, deep bass. Includes a quick-access tap-to-mute button on top with a vibrant LED indicator red/green state ring.',
    images: [
      'https://picsum.photos/id/351/800/800', // Mic style
      'https://picsum.photos/id/352/800/800'
    ],
    specs: {
      'Encoding Depth': '192 kHz / 24-bit high resolution',
      'Acoustic Design': 'Dual 14mm custom gold-sputtered condenser capsules',
      'Polar Tracking': 'Cardioid / Omnidirectional switchable matrix',
      'Monitoring Lag': 'Zero-latency dynamic 3.5mm phone port on-board',
      'Audio Mount': 'Heavy industrial isolator shock mount + metal base',
      'Connector Class': 'Dual-mode plug-and-play USB-C'
    },
    colors: ['Titan Obsidian', 'Cyberpunk Red'],
    inStock: true,
    stockCount: 14,
    tags: ['Audio', 'Podcast', 'USB-C', 'Studio'],
    isTrending: false
  },
  {
    id: 'prod-10',
    name: 'Matrix Multi-Device 3-in-1 Charger',
    price: 79,
    originalPrice: 99,
    rating: 4.6,
    reviewsCount: 112,
    category: 'Accessories',
    brand: 'Matrix',
    description: 'Sleek premium desktop charger featuring MagSafe magnetic coils, smart watch stand, and dedicated platform for earphones.',
    fullDescription: 'The Matrix 3-in-1 wireless charging pad declutters your nightstand and charges your primary gear simultaneously. Features robust official MagSafe-aligned magnetic rings that support 15W high speeds for compatible phones. Built-in smart heat dissipation protection keeps your tech devices running cool during fast refueling cycles.',
    images: [
      'https://picsum.photos/id/367/800/800', // Sleek device dock
      'https://picsum.photos/id/368/800/800'
    ],
    specs: {
      'Phone Cradle Output': 'Up to 15W MagSafe magnetic alignment',
      'Earphone Cradle Output': '5W Qi standard pad',
      'Smartwatch Output': '3W fast charger for Apple Watch & Chronos',
      'Wall adapter plug': 'Included 33W Power Delivery GaN Charger block',
      'Material Elements': 'High-purity liquid silicone, zinc frame'
    },
    colors: ['Carbon Slate Black', 'Glacier White'],
    inStock: true,
    stockCount: 30,
    tags: ['Qi Charger', 'MagSafe', '3-in-1', 'Desktop'],
    isTrending: false
  },
  {
    id: 'prod-11',
    name: 'Helios 140W Multi-Port GaN Charger',
    price: 59,
    originalPrice: 69,
    rating: 4.7,
    reviewsCount: 45,
    category: 'Accessories',
    brand: 'Aerotech',
    description: 'Next-generation gallium nitride dual USB-C plus USB-A fast charger supporting ultra compact travel and laptop capabilities.',
    fullDescription: 'Power up to 3 high-performance devices at lightning speeds. The Helios GaN charger leverages state-of-the-art Gallium Nitride semiconductor chips to pack 140W of dynamic power into a frame 40% more compact than traditional laptop blocks. Smart energy routers allocate wattage based on attached gear load requirements.',
    images: [
      'https://picsum.photos/id/105/800/800', // Charger plug
      'https://picsum.photos/id/106/800/800'
    ],
    specs: {
      'Maximum Wattage': '140W Maximum single port delivery',
      'Semiconductor Class': 'GaN (Gallium Nitride) smart technology',
      'Port Array': '2x USB-C (Power Delivery 3.1), 1x USB-A (QC 4.0)',
      'Safety System': 'Temperature overcharge, short-circuit, and high-voltage shields',
      'Travel Design': 'Compact foldable pins (US standard)'
    },
    colors: ['Carbon Black', 'Alabaster White'],
    inStock: true,
    stockCount: 68,
    tags: ['GaN', 'PD3.1', '140W', 'Travel'],
    isTrending: false
  },
  {
    id: 'prod-12',
    name: 'Titan Core Dynamic Gaming Mousepad',
    price: 34,
    originalPrice: 39,
    rating: 4.5,
    reviewsCount: 165,
    category: 'Gaming',
    brand: 'CyberGlow',
    description: 'Massive spill-resistant hybrid texture weave mousepad with customizable perimeter RGB fibers and non-slip rubber grip base.',
    fullDescription: 'Complete your battle station layout with the Titan Core Mousepad. Measuring a massive 900x400mm, it fits your entire gaming keyboard and mouse comfortably. The micro-textured hybrid weave is treated with hydrophobic coatings to protect against spilled energy drinks, while smart LED loops offer breathtaking responsive custom illuminations.',
    images: [
      'https://picsum.photos/id/400/800/800', // Workspace pad
      'https://picsum.photos/id/404/800/800'
    ],
    specs: {
      'Dimensions': '900 x 400 x 4 mm',
      'Surface Fabric': 'Micro-woven hybrid speed/control cloth',
      'Base Support': 'Anti-skid dense textured rubber bottom',
      'Waterproof Shield': 'Liquid-repelling nano coating',
      'Light Engine': 'Dual-fiber outer wrap RGB controller (USB powered)'
    },
    colors: ['Chroma Neon', 'Minimal Slate Gray'],
    inStock: true,
    stockCount: 140,
    tags: ['Spill-resistant', 'RGB', 'Gaming-Pad', '900x400'],
    isTrending: false
  }
];

export const FAQS = [
  {
    group: 'Orders',
    q: 'Can I modify or cancel my order after placing it?',
    a: 'Since we strive to dispatch orders as fast as possible, modifications are only achievable within 30 minutes of checkout. Please contact our 24/7 Priority Support console immediately with your Order Number.'
  },
  {
    group: 'Orders',
    q: 'How can I view my purchase invoice?',
    a: 'Your dynamic PDF digital invoice is dispatched to your registered email immediately following checkout. You can also head over to your Accounts Dashboard -> Order History page to download copies.'
  },
  {
    group: 'Shipping',
    q: 'What shipping options are available?',
    a: 'We offer three options: Standard Ground (5-7 business days - FREE for purchases over $100), Express Premium (2-3 business days), and Same-Day Priority Delivery for supported metropolitan areas.'
  },
  {
    group: 'Shipping',
    q: 'Do you ship to international locations?',
    a: 'Yes! We ship globally to over 80 countries. International checkout options automatically calculate native duties, taxes, and final carrier charges at payment screens.'
  },
  {
    group: 'Returns',
    q: 'What is your product return policy?',
    a: 'We offer an ironclad 30-day trial window. If a product doesn’t suit your layout, initiate a return from the dashboard for a prepaid shipping label. Items must be returned in their original packaging.'
  },
  {
    group: 'Payments',
    q: 'What payment modes are supported?',
    a: 'We support all major global credit cards (Visa, Mastercard, American Express, Discover), secure PayPal integrations, Apple Pay, and interest-free BNPL installments via Affirm/Klarna.'
  },
  {
    group: 'Warranty & Support',
    q: 'What does your 1-Year Warranty cover?',
    a: 'Our premium coverage guarantees protection against mechanical malfunctions, controller chip board failures, and material defects under regular operation. We will repair or ship a direct replacement.'
  }
];

export const SHIPPING_METHODS: ShippingMethod[] = [
  { id: 'standard', name: 'Standard Shipping (Insured)', price: 0, estimate: '5 - 7 business days' },
  { id: 'express', name: 'Express Freight (Priority)', price: 15, estimate: '2 - 3 business days' },
  { id: 'sameday', name: 'Same-Day Drone Courier', price: 35, estimate: 'Deliver before 8:00 PM today' }
];

export const ABOUT_MILESTONES = [
  { year: '2023', title: 'Concept Born', text: 'Three hardware engineering graduates start Nexus in a small garage, aiming to create glowing high-performance gear.' },
  { year: '2024', title: 'SaaS Launchpad', text: 'Secured Seed funding to release the signature hot-swappable mechanical keyboard ecosystem.' },
  { year: '2025', title: 'Global Operations', text: 'Opened state-of-the-art climate-controlled fulfillment hubs across Asia-Pacific and North America.' },
  { year: '2026', title: 'Carbon Neutrality Shield', text: 'Introduced 100% biodegradable product shells and zero-plastic retail packs.' }
];

export const TEAM_MEMBERS = [
  { name: 'Kaelen Vance', role: 'Founder & Chief Architect', bio: 'Former industrial designer for premium workspace labels. Loves high-tactility clicks.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400' },
  { name: 'Sora Tanaka', role: 'Head of Firmware Systems', bio: 'Expert in low-latency 2.4GHz wireless transmission. Spends nights fine-tuning controller chips.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400' },
  { name: 'Iris Montgomery', role: 'Ecosystem CX Director', bio: 'Dedicated to customer-first success. Architect of the 24/7 priority support platform.', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400' }
];
