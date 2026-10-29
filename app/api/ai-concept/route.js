import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { roomType = 'Living Room', vibe = 'Organic Modern', sqft = 250, level = 'Premium', requirements = '' } = body;

    const geminiApiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // Base price per sq.ft
    const rates = {
      Standard: 1100,
      Premium: 1800,
      'Ultra-Luxury': 2900
    };
    const ratePerSqft = rates[level] || 1800;
    const totalEst = Math.round(Number(sqft) * ratePerSqft);
    const minEst = Math.round(totalEst * 0.9);
    const maxEst = Math.round(totalEst * 1.15);

    // Concept palettes
    const paletteMap = {
      'Organic Modern': {
        name: 'Earth & Stone Symphony',
        colors: ['#FAF8F5', '#E5DDD3', '#C7B7A3', '#8E7B6D', '#2E2722'],
        labels: ['Warm Alabaster', 'Limestone', 'Oatmeal', 'Warm Bronze', 'Smoked Espresso']
      },
      'Japandi Minimalist': {
        name: 'Wabi-Sabi Tranquility',
        colors: ['#F5F5F0', '#E2DCD2', '#B9AAA0', '#7A6B60', '#1F1E1D'],
        labels: ['Rice Paper', 'Raw Linen', 'Blonde Hinoki', 'Clay Earth', 'Sumi Black']
      },
      'Contemporary Luxury': {
        name: 'Midnight Grandeur',
        colors: ['#FFFFFF', '#D4AF37', '#8E7B6D', '#242933', '#0F1218'],
        labels: ['Carrara White', 'Brushed Brass', 'Warm Taupe', 'Charcoal Slate', 'Obsidian']
      },
      'Scandinavian Zen': {
        name: 'Nordic Light',
        colors: ['#FFFFFF', '#EAEAEA', '#B3BCB7', '#607268', '#1F2923'],
        labels: ['Chalk White', 'Ash Wood', 'Sage Mist', 'Nordic Pine', 'Deep Spruce']
      },
      'Industrial Loft': {
        name: 'Urban Warehouse Raw',
        colors: ['#EBE6DE', '#B5A895', '#8C5843', '#404348', '#191A1C'],
        labels: ['Raw Concrete', 'Aged Canvas', 'Terracotta Brick', 'Gunmetal Steel', 'Cast Iron']
      }
    };

    const selectedPalette = paletteMap[vibe] || paletteMap['Organic Modern'];

    // Concept portfolios
    const projectMap = {
      'Modular Kitchen': { id: 1, title: 'Modern Organic Kitchen', image: '/assets/modern_kitchen_homelane_style_1777577519367.png' },
      'Master Suite': { id: 4, title: 'Minimalist Bedroom', image: '/assets/portfolio_modern_bedroom_1776973196356.png' },
      'Living Room': { id: 3, title: 'Luxury Living Concept', image: '/assets/luxury_living_room_homelane_style_1777577556206.png' },
      'Executive Office': { id: 5, title: 'Commercial Spaces', image: '/assets/office_organic_new.png' },
      'Dining Room': { id: 6, title: 'Contemporary Dining', image: '/assets/dining_organic_new.png' }
    };

    const matchedProject = projectMap[roomType] || projectMap['Living Room'];

    // Check if Gemini is enabled for custom bespoke narrative
    let narrative = `An architectural sanctuary harmonizing ${vibe.toLowerCase()} principles with functional luxury. Designed for ${sqft} sq.ft of fluid movement, incorporating tactile natural finishes, concealed anti-glare ambient illumination (2700K), and tailored storage modules that maximize vertical volume without crowding sightlines.`;
    
    if (geminiApiKey) {
      try {
        const promptText = `As an architectural interior designer at Studio Arka, write a 3-sentence poetic yet practical architectural concept for a ${level} ${roomType} (${sqft} sq.ft) in ${vibe} aesthetic. User requirements: ${requirements || 'None specified'}. Mention lighting, materials, and spatial flow.`;
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }]
          })
        });
        if (res.ok) {
          const aiData = await res.json();
          const generatedNarrative = aiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedNarrative) narrative = generatedNarrative.trim();
        }
      } catch (err) {
        console.warn('Concept generator AI fallback used:', err);
      }
    }

    const responsePayload = {
      success: true,
      summary: {
        roomType,
        vibe,
        sqft,
        level,
        narrative,
        estimatedTotal: `₹${(minEst / 100000).toFixed(2)}L - ₹${(maxEst / 100000).toFixed(2)} Lakhs`,
        timeline: level === 'Ultra-Luxury' ? '60 - 75 Days' : level === 'Premium' ? '45 - 55 Days' : '35 - 45 Days'
      },
      palette: selectedPalette,
      materials: [
        { category: 'Flooring', spec: level === 'Ultra-Luxury' ? 'Imported Italian Bottochino / Dyna Marble' : 'Glazed Vitrified 4x2 Porcelain Slabs' },
        { category: 'Joinery & Carcass', spec: 'Boiling Water Proof (BWP) 710 Marine Ply + German Blum Blumotion hardware' },
        { category: 'Wall Architecture', spec: `${vibe === 'Japandi Minimalist' ? 'Raw Limewash & Fluted Oak' : 'Fluted acoustic panelling with indirect LED profile'}` },
        { category: 'Illumination', spec: '2700K Architectural Warm Coving + CRI 95+ magnetic spot & track lights' },
        { category: 'Textiles', spec: 'Heavy organic linen, textured boucle, and brushed brass architectural accents' }
      ],
      breakdown: [
        { item: 'Modular Woodwork & Joinery', percentage: '45%', approx: `₹${Math.round(totalEst * 0.45).toLocaleString('en-IN')}` },
        { item: 'Civil, Flooring & False Ceiling', percentage: '25%', approx: `₹${Math.round(totalEst * 0.25).toLocaleString('en-IN')}` },
        { item: 'Electrical, Automation & Architectural Lighting', percentage: '18%', approx: `₹${Math.round(totalEst * 0.18).toLocaleString('en-IN')}` },
        { item: 'Finishes, PU Paint & Soft Furnishings', percentage: '12%', approx: `₹${Math.round(totalEst * 0.12).toLocaleString('en-IN')}` }
      ],
      matchedProject
    };

    return NextResponse.json(responsePayload);
  } catch (err) {
    console.error('Error generating AI concept:', err);
    return NextResponse.json({ error: 'Failed to generate concept' }, { status: 500 });
  }
}

