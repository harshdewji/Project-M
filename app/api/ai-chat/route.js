import { NextResponse } from 'next/server';

// Studio Arka Knowledge Base for Architectural AI Concierge
const STUDIO_ARKA_KNOWLEDGE = {
  brand: "Studio Arka | Architectural Interiors",
  tagline: "Bespoke architectural interiors for luxury homes and offices.",
  phone: "+91 6232793125",
  whatsappUrl: "https://wa.me/916232793125",
  services: [
    { title: "Modular Kitchens", slug: "modular-kitchens", rate: "Starting from ₹2,000 / sq.ft", materials: "BWP Marine Ply, German Blum/Hafele hardware, Quartz countertops" },
    { title: "Wardrobes & Storage", slug: "wardrobes-and-storage", rate: "Starting from ₹1,400 / sq.ft", materials: "Floor-to-ceiling sliders, PU lacquer, suede organizers, tinted glass" },
    { title: "Living Room Design", slug: "living-room-design", rate: "Starting from ₹1,200 / sq.ft", materials: "Architectural TV console, wooden acoustic slat paneling, ambient coving" },
    { title: "Bedroom Interiors", slug: "bedroom-interiors", rate: "Starting from ₹1,000 / sq.ft", materials: "Custom fabric headboards, fluted panelling, concealed lighting" },
    { title: "Turnkey Luxury Renovation", slug: "full-renovation", rate: "Custom quotes (₹1,500 - ₹3,500 / sq.ft)", materials: "Complete civil, electrical, plumbing, carpentry & furnishings" }
  ],
  projects: [
    { id: 1, title: "Modern Organic Kitchen", category: "Residential", image: "/assets/modern_kitchen_homelane_style_1777577519367.png", highlight: "Handleless matte cabinetry, waterfall quartz island, Blum Legrabox drawers." },
    { id: 2, title: "Bespoke Wardrobe System", category: "Residential", image: "/assets/modern_wardrobe_homelane_style_1777577538135.png", highlight: "Smoked glass sliding shutters with integrated 3000K warm LED strips." },
    { id: 3, title: "Luxury Living Concept", category: "Residential", image: "/assets/luxury_living_room_homelane_style_1777577556206.png", highlight: "Double-height Italian travertine accent wall with concealed cove illumination." },
    { id: 4, title: "Minimalist Master Bedroom", category: "Residential", image: "/assets/portfolio_modern_bedroom_1776973196356.png", highlight: "Japanese wabi-sabi simplicity, raw lime-wash walls, organic linen bedding." },
    { id: 5, title: "Commercial Executive Office", category: "Commercial", image: "/assets/office_organic_new.png", highlight: "Acoustic wood baffles, ergonomic workstations, biophilic partition walls." },
    { id: 6, title: "Contemporary Dining", category: "Residential", image: "/assets/dining_organic_new.png", highlight: "Book-matched Statuario marble dining table with custom brass pendant." }
  ],
  palettes: {
    japandi: {
      name: "Japandi Serenity",
      colors: ["#F7F5F0", "#E3DCCB", "#B8A898", "#7D6E63", "#2B2825"],
      tags: ["warm white", "limewash", "natural oak", "deep walnut", "matte black"]
    },
    organicModern: {
      name: "Organic Modern Luxury",
      colors: ["#FAF8F5", "#E8DFD5", "#C2B29F", "#8E7B6D", "#3B322C"],
      tags: ["creamy alabaster", "travertine beige", "cashmere grey", "warm terracotta", "espresso wood"]
    },
    scandinavian: {
      name: "Nordic Minimalist",
      colors: ["#FFFFFF", "#EDEDED", "#A9B2AC", "#6B7C72", "#222D28"],
      tags: ["pure white", "light ash", "sage grey", "forest mist", "charcoal slate"]
    },
    contemporaryLuxury: {
      name: "Midnight Bronze & Brass",
      colors: ["#0E1116", "#1F242D", "#8E7B6D", "#D4AF37", "#F4EFEA"],
      tags: ["obsidian black", "deep charcoal", "warm bronze", "brushed brass", "statuario marble"]
    }
  }
};

const SYSTEM_PROMPT = `
You are Arka AI, the lead virtual architectural consultant and interior designer at "Studio Arka | Architectural Interiors".
Your persona: Sophisticated, architectural, highly knowledgeable, polite, modern, and inspiring.
You help clients design their dream homes, penthouses, villas, modular kitchens, and executive workspaces.

Studio Arka Details:
- Firm Name: Studio Arka (Architectural Interiors)
- Founder / Principal Style: Organic modern, architectural luxury, Japandi, contemporary minimalism.
- WhatsApp Direct: +91 6232793125
- Services Offered: Modular Kitchens (from ₹2,000/sq.ft), Bespoke Wardrobes (from ₹1,400/sq.ft), Living Room Design (from ₹1,200/sq.ft), Master Bedrooms (from ₹1,000/sq.ft), Turnkey Renovations (₹1,500 - ₹3,500/sq.ft).
- Key Projects in Portfolio:
  1. Modern Organic Kitchen (id: 1)
  2. Bespoke Wardrobe System (id: 2)
  3. Luxury Living Concept (id: 3)
  4. Minimalist Master Bedroom (id: 4)
  5. Commercial Executive Office (id: 5)
  6. Contemporary Dining (id: 6)

Guidelines for your responses:
1. Provide concrete, architectural recommendations (e.g., lighting temperature like 2700K warm-white, materials like BWP marine ply, fluted acoustic panels, Italian Bottochino / Statuario marble, micro-cement, linen fabrics).
2. For cost estimations, provide realistic ranges in INR (₹) and explain what affects the cost (hardware like Blum/Hafele, finishes like acrylic vs PU polish vs veneer).
3. Where relevant, suggest reviewing Studio Arka's portfolio projects or booking a free 3D design session.
4. Keep answers concise, elegantly structured with bullet points and bold highlights.
5. Provide actionable next steps (e.g. "Would you like me to generate a tailored 5-tone color palette or calculate an itemized estimate for your room?").
`;

// Intelligent Domain Engine (Offline & Reliable Fallback)
function generateExpertResponse(userMessage, history = []) {
  const query = userMessage.toLowerCase();
  
  // 1. Budget / Cost / Price inquiries
  if (query.includes('cost') || query.includes('price') || query.includes('budget') || query.includes('rate') || query.includes('estimate') || query.includes('how much') || query.includes('bhk')) {
    let bhkType = '3 BHK';
    let sqft = 1400;
    let range = '₹12 Lakhs - ₹22 Lakhs';

    if (query.includes('1bhk') || query.includes('1 bhk')) {
      bhkType = '1 BHK';
      sqft = 650;
      range = '₹5.5 Lakhs - ₹9.5 Lakhs';
    } else if (query.includes('2bhk') || query.includes('2 bhk')) {
      bhkType = '2 BHK';
      sqft = 1000;
      range = '₹8.5 Lakhs - ₹15 Lakhs';
    } else if (query.includes('4bhk') || query.includes('4 bhk') || query.includes('villa') || query.includes('penthouse')) {
      bhkType = '4 BHK / Luxury Villa';
      sqft = 2400;
      range = '₹25 Lakhs - ₹45+ Lakhs';
    } else if (query.includes('kitchen')) {
      return {
        text: `### 🍳 Modular Kitchen Investment Guide\n\nAt **Studio Arka**, our architectural kitchens are engineered for ergonomic precision and longevity:\n\n* **Standard Premium:** **₹2.5L – ₹4.5L** (BWP Marine Ply 710 grade, Anti-scratch Acrylic shutters, Soft-close channels)\n* **Luxury Architectural:** **₹5.0L – ₹9.5L+** (German Blum / Häfele Legrabox fittings, Quartz / Neolith sintered stone slab, PU lacquered shutters, built-in sensor strip lighting 3000K)\n\n* **Average Base Rate:** Starting at **₹2,000 / sq.ft** of front fascia.\n\nWould you like our lead architect to prepare a 3D layout simulation based on your floor plan?`,
        projectRef: { id: 1, title: "Modern Organic Kitchen", image: "/assets/modern_kitchen_homelane_style_1777577519367.png" },
        estimate: { type: "Modular Kitchen", sqft: "120-180 sq.ft", priceRange: "₹2.5L - ₹6.5L", timeline: "35 - 45 Working Days" },
        suggestedPrompts: ["Book a Free 3D Kitchen Session", "Compare Quartz vs Granite", "View Kitchen Portfolio"],
        action: "book_consultation"
      };
    }

    return {
      text: `### 📐 Estimated Investment for ${bhkType} (${sqft} sq.ft)\n\nFor a **${bhkType}** interior with Studio Arka's architectural standards, here is the breakdown:\n\n* **Standard Package:** **${range.split('-')[0].trim()}**\n  * Complete modular woodwork (Kitchen, Wardrobes with soft-close)\n  * Full false ceiling with magnetic LED spot & magnetic track lights\n  * Royal emulsion wall finishes & accent wallpaper\n* **Architectural Luxury Tier:** **${range.split('-')[1]?.trim() || 'Custom'}**\n  * Fluted wooden acoustic panelling & Italian marble console accents\n  * Blum Servo-drive hardware & PU matte lacquered finishes\n  * Bespoke ambient lighting scenes & custom upholstered headboards\n\n*Turnkey execution timeline: 45 to 60 days with 10-year structural warranty.*`,
      estimate: { type: `${bhkType} Turnkey Interior`, sqft: `${sqft} sq.ft approx`, priceRange: range, timeline: "45 - 60 Days" },
      suggestedPrompts: ["Calculate Kitchen Cost Only", "Schedule a Site Visit", "Explore Signature Collections"],
      action: "book_consultation"
    };
  }

  // 2. Kitchen inquiries
  if (query.includes('kitchen') || query.includes('cabinet') || query.includes('pantry') || query.includes('chimney')) {
    return {
      text: `### 🍳 Studio Arka Architectural Kitchens\n\nOur kitchens merge minimalist European aesthetics with heavy-duty Indian cooking functionality:\n\n* **Carcass Integrity:** 100% Boiling Water Proof (BWP) Marine Plywood with 1mm inner antibacterial laminate backing.\n* **Hardware:** Precision German mechanics by **Blum** (Tandembox / Legrabox with Blumotion soft-closing) and **Häfele** pantry pullouts.\n* **Countertops:** Quartz (Caesarstone / Kalinga) or sintered stone (Dekton) that resists turmeric stains, hot pans, and knife scratches.\n* **Illumination:** Concealed 3000K warm-white high-CRI profile LEDs under wall cabinets ensuring zero shadows on prep areas.\n\n*Take a look at our completed project below:*`,
      projectRef: { id: 1, title: "Modern Organic Kitchen", image: "/assets/modern_kitchen_homelane_style_1777577519367.png" },
      suggestedPrompts: ["Estimate My Kitchen Cost", "What countertop is best for curry stains?", "Book 3D Design Session"],
      action: "view_portfolio"
    };
  }

  // 3. Wardrobe / Closet inquiries
  if (query.includes('wardrobe') || query.includes('closet') || query.includes('storage') || query.includes('cupboard') || query.includes('dressing')) {
    return {
      text: `### 🚪 Bespoke Architectural Wardrobe Systems\n\nWe craft floor-to-ceiling storage tailored to your daily dressing ritual:\n\n* **Door Formats:** Fluted tinted-glass sliding shutters, fluted MDF in PU finish, or soft-touch cashmere anti-fingerprint laminates.\n* **Internal Layouts:** Dedicated shoe pull-outs, velvet-lined watch and jewelry drawers with biometric safes, dual hanging rails, and luggage lofts.\n* **Sensors:** Micro-switch LED strip lighting activated automatically when doors glide open.\n* **Base Pricing:** Starting from **₹1,400 / sq.ft**.\n\n*Check out our bespoke wardrobe project:*`,
      projectRef: { id: 2, title: "Bespoke Wardrobe System", image: "/assets/modern_wardrobe_homelane_style_1777577538135.png" },
      suggestedPrompts: ["Sliding vs Hinged Wardrobe?", "Estimate 8x9ft Wardrobe Cost", "Book a Design Consultation"],
      action: "view_portfolio"
    };
  }

  // 4. Living Room / TV unit / Hall inquiries
  if (query.includes('living') || query.includes('tv unit') || query.includes('sofa') || query.includes('drawing') || query.includes('hall')) {
    return {
      text: `### 🛋️ Living Room Architectural Statement\n\nThe living space establishes the emotional temperature of your home. Key Studio Arka design principles:\n\n* **Architectural Focal Point:** Low-profile floating TV console with seamless wire concealment, fluted wood veneer slats, and backlit book-matched Italian marble or sintered stone slabs.\n* **Layered Lighting:** Recessed anti-glare COB downlights, indirect ceiling cove illumination (2700K warm), and architectural floor lamps.\n* **Spatial Flow:** Low-slung linen or boucle sofas with curved organic coffee tables to maintain sightlines to natural light windows.\n\n*Explore our signature concept below:*`,
      projectRef: { id: 3, title: "Luxury Living Concept", image: "/assets/luxury_living_room_homelane_style_1777577556206.png" },
      palette: STUDIO_ARKA_KNOWLEDGE.palettes.organicModern,
      suggestedPrompts: ["Suggest living room color palette", "Calculate living room budget", "Book a Free Consultation"],
      action: "view_portfolio"
    };
  }

  // 5. Bedroom inquiries
  if (query.includes('bedroom') || query.includes('bed') || query.includes('master bed') || query.includes('sleep')) {
    return {
      text: `### 🛏️ Master Retreat & Organic Sanctuary\n\nWe design bedrooms as decompression sanctuaries from high-tempo urban living:\n\n* **Acoustics & Headboard:** Full-width upholstered headboards in stain-resistant linen or boucle with integrated acoustic battens.\n* **Lighting:** Warm 2400K–2700K ambient illumination with independent bedside reading sconces and under-bed floating perimeter glow.\n* **Work & Vanity Integration:** Seamless floating cantilevered dressing tables or quiet study nooks that tuck into architectural niches.\n\n*View our organic master retreat:*`,
      projectRef: { id: 4, title: "Minimalist Master Bedroom", image: "/assets/portfolio_modern_bedroom_1776973196356.png" },
      palette: STUDIO_ARKA_KNOWLEDGE.palettes.japandi,
      suggestedPrompts: ["Suggest bedroom colors", "What lighting is best for sleep?", "Schedule 3D Session"],
      action: "view_portfolio"
    };
  }

  // 6. Color palette / Paint / Aesthetic vibes
  if (query.includes('color') || query.includes('palette') || query.includes('paint') || query.includes('vibe') || query.includes('japandi') || query.includes('minimalist') || query.includes('neutral')) {
    let chosen = STUDIO_ARKA_KNOWLEDGE.palettes.organicModern;
    if (query.includes('japandi') || query.includes('japan')) chosen = STUDIO_ARKA_KNOWLEDGE.palettes.japandi;
    else if (query.includes('nordic') || query.includes('scandi') || query.includes('scandinavian')) chosen = STUDIO_ARKA_KNOWLEDGE.palettes.scandinavian;
    else if (query.includes('luxury') || query.includes('dark') || query.includes('midnight') || query.includes('black')) chosen = STUDIO_ARKA_KNOWLEDGE.palettes.contemporaryLuxury;

    return {
      text: `### 🎨 Curated Architectural Palette: ${chosen.name}\n\nOur design philosophy balances warm earthen tones with textural depth:\n\n* **60% Dominant Base:** ${chosen.tags[0]} / ${chosen.tags[1]} (creates optical airiness and reflects soft natural daylight)\n* **30% Secondary Materiality:** ${chosen.tags[2]} & ${chosen.tags[3]} (grounds the space with tactile organic warmth)\n* **10% Architectural Contrast:** ${chosen.tags[4]} (fine-line metal hardware, fixtures, or framing)\n\n*Tap any swatch below to copy its HEX color code to your clipboard:*`,
      palette: chosen,
      suggestedPrompts: ["Suggest another palette", "Which materials pair with these colors?", "Apply this to my 3BHK"],
      action: "view_palette"
    };
  }

  // 7. Materials / Marble vs Tiles / Wood
  if (query.includes('marble') || query.includes('tile') || query.includes('wood') || query.includes('veneer') || query.includes('acrylic') || query.includes('laminate') || query.includes('material')) {
    return {
      text: `### 🏛️ Material Comparison: Architect's Recommendation\n\n* **Flooring (Italian Marble vs Large GVT Tiles):**\n  * *Italian Marble (Bottochino/Dyna):* Luxurious, timeless, natural veining (₹350 - ₹800/sq.ft installed + polished). Requires sealing every 2-3 years.\n  * *Glazed Vitrified Tiles (4ft x 8ft slabs):* Zero maintenance, scratch-resistant, stain-proof, half the cost of marble.\n* **Cabinetry (Acrylic vs PU Lacquer vs Veneer):**\n  * *Acrylic:* High gloss, ultra-modern, seamless color consistency.\n  * *PU Paint (Polyurethane):* Silky super-matte finish, available in infinite custom RAL color codes, zero edge-banding seams.\n  * *Natural Veneer:* Warm organic grain, polished in water-based PU for longevity.\n\nWould you like sample swatches brought to your physical site during a consultation?`,
      suggestedPrompts: ["Schedule a Materials Consultation", "How much does Italian marble cost?", "Estimate my full renovation"],
      action: "book_consultation"
    };
  }

  // 8. Booking / Consultation / Contact / Appointment
  if (query.includes('book') || query.includes('consult') || query.includes('meet') || query.includes('call') || query.includes('contact') || query.includes('schedule') || query.includes('hire') || query.includes('appointment')) {
    return {
      text: `### 📅 Book Your Free Architectural Design Session\n\nWe would love to discuss your space! Here is what happens during your complimentary consultation:\n\n1. **Space & Lifestyle Discovery:** We review your floor plan, light orientation, and storage priorities.\n2. **Curated Moodboard & Material Palette:** Tailored to your aesthetic preference.\n3. **3D Visualization Overview:** Conceptual space layout.\n4. **Itemized Investment Estimate:** Clear scope with zero hidden costs.\n\n*Click below to immediately open our appointment booking form or chat with our team on WhatsApp directly.*`,
      suggestedPrompts: ["Open Booking Form", "Chat on WhatsApp (+91 6232793125)", "View Portfolio First"],
      action: "book_consultation"
    };
  }

  // Default intelligent architectural greeting / guidance
  return {
    text: `### 👋 Welcome to Studio Arka Architectural Studio\n\nI am your **AI Design Consultant**. I can assist you with:\n\n* **Spatial Planning & Style Advisory:** Japandi, Organic Modern, Contemporary Luxury, and Minimalist concepts.\n* **Real-Time Investment Estimations:** Accurate cost models for 1BHK, 2BHK, 3BHK, luxury villas, and modular kitchens.\n* **Material & Lighting Engineering:** Advice on Italian marble, veneers, Blum hardware, and architectural 2700K lighting plans.\n* **Portfolio Walkthroughs:** Discover our executed homes and executive spaces.\n\nTell me about your home or project — what room are you looking to transform?`,
    suggestedPrompts: [
      "💰 Estimate budget for 3BHK flat",
      "🍳 How much does a modern kitchen cost?",
      "🎨 Recommend an Organic Modern color palette",
      "📅 Book a free 3D design session"
    ],
    action: "explore"
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { messages = [], currentPrompt = "", context = {} } = body;
    
    // Extract the latest query
    const userQuery = currentPrompt || (messages.length > 0 ? messages[messages.length - 1].content : "");
    
    const geminiApiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // If Gemini API Key is present, attempt live generative AI call
    if (geminiApiKey) {
      try {
        const conversationHistory = messages.map(m => ({
          role: m.sender === 'user' || m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text || m.content || '' }]
        }));

        // Append current prompt if not already in history
        if (currentPrompt && (!conversationHistory.length || conversationHistory[conversationHistory.length - 1].role !== 'user')) {
          conversationHistory.push({
            role: 'user',
            parts: [{ text: currentPrompt }]
          });
        }

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;
        
        const payload = {
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: conversationHistory.slice(-8), // Send last 8 turns for speed & context
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          }
        };

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const data = await res.json();
          const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          
          if (generatedText) {
            // Also enrich response with contextual cards if relevant keywords appear
            const expertFallback = generateExpertResponse(userQuery, messages);
            return NextResponse.json({
              success: true,
              engine: 'gemini-live',
              text: generatedText,
              palette: expertFallback.palette || null,
              projectRef: expertFallback.projectRef || null,
              estimate: expertFallback.estimate || null,
              suggestedPrompts: expertFallback.suggestedPrompts || [
                "Estimate full project cost",
                "Suggest color palette",
                "Book free consultation"
              ],
              action: expertFallback.action || 'explore'
            });
          }
        } else {
          console.warn("Gemini API call returned non-200, falling back to internal expert engine:", res.status);
        }
      } catch (geminiError) {
        console.error("Gemini call failed, defaulting to expert engine:", geminiError);
      }
    }

    // Default to the rich built-in Architectural Knowledge Engine
    const responseData = generateExpertResponse(userQuery, messages);
    return NextResponse.json({
      success: true,
      engine: 'arka-expert-core',
      ...responseData
    });

  } catch (error) {
    console.error("AI Chat API Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to process AI response", 
        text: "I apologize, our design server experienced a brief pause. Please try asking again or feel free to connect with our design team directly on WhatsApp (+91 6232793125)." 
      }, 
      { status: 500 }
    );
  }
}

