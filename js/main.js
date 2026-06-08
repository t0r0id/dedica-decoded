/* ===================== Dedica Decoded — main.js ===================== */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* ---------- DATA ---------- */

  const STARTER_KIT = [
    { t: "A DeLonghi Dedica", d: "EC890 (Duo, has cold brew) or EC685. They're near-identical for espresso. ~₹12k open-box, ~₹20k new on Amazon." },
    { t: "An espresso-capable grinder", d: "The make-or-break purchase. Manual K6 / Timemore C3 ESP, or electric HiBrew G5 / Rift 64." },
    { t: "Fresh, medium-roast beans", d: "Rest 7–10 days off roast date. Lighter roasts go sour on a Dedica." },
    { t: "A non-pressurised basket (51mm)", d: "The real upgrade from the stock pressurised setup. Get a precision (IMS) basket if budget allows, or a bottomless portafilter that comes with one (THW / Neouza / Brewalsa). Real legends just chop their stock portafilter into a bottomless one. 🔪" },
    { t: "A WDT tool (~₹200)", d: "A few thin needles to stir & de-clump grounds. Cheap, essential." },
    { t: "An RDT spray bottle (~₹120)", d: "One spritz on beans kills static & mess." },
    { t: "A scale with a timer", d: "Weigh dose in & shot out. Stop trusting the buttons. Hoffen ~₹1k." },
    { t: "A 0.8mm magnetic puck screen", d: "Cleaner shots, lets you fit 17–18g, keeps the shower screen tidy." },
    { t: "Watched 1 Hoffmann + 1 Tom's Coffee Corner video", d: "Seriously. 30 minutes saves you weeks." },
  ];

  const GRINDERS = [
    { name: "Kingrinder K6", price: "~₹10,800", tags: ["manual"], badge: ["pick", "Manual pick"],
      desc: "The community's favourite hand grinder. 48mm burrs, external adjustment, great clarity & capacity. Espresso ≈ 24–30 clicks from true zero.",
      pros: ["Big burrs, fast for a manual", "External dial = easy dial-in"], cons: ["Still an arm workout daily — pair with a low-RPM drill"],
      link: "https://coffeeplus.in/", linkLabel: "Coffee Plus (pre-order)" },
    { name: "Timemore C3 ESP / ESP Pro", price: "~₹7–8k", tags: ["manual", "budget"], badge: ["value", "Budget pick"],
      desc: "Entry espresso-capable hand grinder. Use the ESP version (or a C3S + ₹1000 mod-plate). Espresso ≈ 0.6–0.8 / ~20–22 clicks.",
      pros: ["Affordable gateway to real espresso", "Good build"], cons: ["Slow (2–3 min/dose)", "Plain C3 / C3S are NOT espresso-capable"],
      link: "https://coffeeplus.in/", linkLabel: "Coffee Plus" },
    { name: "Kingrinder K2", price: "~₹4–5k", tags: ["manual", "budget"], badge: ["neutral", "Budget manual"],
      desc: "Cheapest sensible entry into hand grinding for espresso. Smaller burrs than the K6 but gets you started.",
      pros: ["Cheap", "Espresso-capable"], cons: ["Slower, less consistent than K6"],
      link: "https://www.amazon.in/s?k=kingrinder+k2", linkLabel: "Search Amazon" },
    { name: "HiBrew G5", price: "~₹13–15k", tags: ["electric", "budget"], badge: ["pick", "Best cheap electric"],
      desc: "The 'sexiest looking in the budget' electric grinder. Single-dose, conical burr. People upgrading from a hand grinder say 'life has changed.'",
      pros: ["No more arm day", "Looks great, compact"], cons: ["Conical (smaller) burr vs the Rift's 64mm flat"],
      link: "https://fixcoffee.shop/", linkLabel: "Fix Coffee" },
    { name: "Cipher Rift 64 / Espressa Orbit 64", price: "~₹19–21k", tags: ["electric"], badge: ["pick", "Group darling"],
      desc: "64mm flat-burr single-dose grinder (Rift/Orbit/Shardor are the same platform). The sweet-spot upgrade. Get the single-dose hopper; metal body if you can.",
      pros: ["64mm flat burrs = clarity", "Easy clean, low retention", "Burr-swappable later"], cons: ["Plastic body version can crack — pay ~5k more for metal"],
      link: "https://coffeeplus.in/products/espressa-orbit-64-home-grinder", linkLabel: "Coffee Plus (code PRE5)" },
    { name: "Turin DF54", price: "~₹27k", tags: ["electric", "endgame"], badge: ["pick", "End-game-ish"],
      desc: "Best-looking grinder in the budget tier, with a full all-metal build. 54mm flat burrs, with a titanium-coated burr option. 'Sounds like music.'",
      pros: ["Gorgeous, sturdy all-metal build", "Titanium burr option", "Excellent clarity"], cons: ["Pricey"],
      link: "https://coffeeplus.in/", linkLabel: "Coffee Plus" },
    { name: "Espressa Orbit 64 Pro", price: "~₹25k", tags: ["electric", "endgame"], badge: ["pick", "All-metal flat burr"],
      desc: "The Pro version of the Orbit 64 — same 64mm flat burrs, but with a premium all-metal (die-cast aluminium) body for durability and peace of mind. The sturdy end of the group's favourite platform.",
      pros: ["64mm flat burrs", "All-metal die-cast body", "Single-dose, low retention"], cons: ["Pricier than the plastic Orbit"],
      link: "https://coffeeplus.in/products/espressa-orbit-64-home-grinder", linkLabel: "Coffee Plus" },
    { name: "Baratza Encore ESP", price: "~₹14k", tags: ["electric"], badge: ["neutral", "Reliable"],
      desc: "Plastic-bodied but widely used and dependable home espresso grinder. 'Heard no complaints about it breaking.'",
      pros: ["Proven reliability", "Easy to live with"], cons: ["Plastic body", "Not single-dose-first"],
      link: "https://www.amazon.in/s?k=baratza+encore+esp", linkLabel: "Search Amazon" },
    { name: "Plain Timemore C3 / C3S", price: "—", tags: ["avoid"], badge: ["avoid", "Not for espresso"],
      desc: "Great for filter/pour-over, but the standard C3/C3S can't grind fine & consistent enough for espresso. You need the ESP burr or mod-plate.",
      pros: [], cons: ["Sour, gushing espresso", "Endless frustration"], link: "", linkLabel: "" },
    { name: "1Zpresso Q Air", price: "—", tags: ["avoid"], badge: ["avoid", "Filter grinder"],
      desc: "A filter grinder (~25µm/click) — hard to dial in for espresso. Lovely for pour-over, wrong tool here.",
      pros: [], cons: ["Not espresso-suited"], link: "", linkLabel: "" },
    { name: "Agaro / generic cheap grinders", price: "—", tags: ["avoid", "budget"], badge: ["avoid", "Avoid"],
      desc: "Inconsistent grind (fines + boulders) = channeling & sour shots. '5 minutes for 14g and biceps like Arnold.' Save up instead.",
      pros: [], cons: ["Inconsistent", "Painfully slow"], link: "", linkLabel: "" },
  ];

  const BEANS = [
    { name: "Araku (Selection / Signature)", price: "~₹400–450 / 250g", tags: ["budget", "milk"], badge: ["value", "Cheapest fresh"],
      desc: "Cheap, fresh, widely available on CRED. Great milk-drink starter. Some find Signature/Selection a touch weak for straight espresso — fine for lattes.",
      link: "https://www.araku.com/", linkLabel: "araku.com / CRED" },
    { name: "Hunkal Estate — Aranya Gold", price: "~₹630 / 500g", tags: ["budget", "milk"], badge: ["value", "Best ₹/gram"],
      desc: "~₹1.56/g — a genuine value daily driver. Balanced, not watery. A group go-to for 'seasoning' a new setup.",
      link: "https://www.hunkalestatecoffee.com/collections/all/products/aranya-gold-coffee-beans", linkLabel: "hunkalestatecoffee.com" },
    { name: "Fraction9 — Everyday Gold", price: "~₹470 / 250g", tags: ["budget", "milk", "specialty"], badge: ["pick", "Crowd favourite"],
      desc: "Medium-dark, consistent roasting, cacao + nutty. Bold, daily-driveable. Free delivery over ₹2k. Use code FARM15.",
      link: "https://fraction9coffee.com/", linkLabel: "fraction9coffee.com (FARM15)" },
    { name: "Blue Tokai — Attikan / Vienna / Dhak", price: "~₹500+ / 250g", tags: ["specialty", "milk"], badge: ["pick", "Reliable specialty"],
      desc: "Roast date + process printed on every pack. Store pickup = freshest. Vienna (dark) & Dhak blend shine for milk. Code HELLOSUMMER.",
      link: "https://bluetokaicoffee.com/", linkLabel: "bluetokaicoffee.com (HELLOSUMMER)" },
    { name: "Naivo — Attikan White Mist", price: "~₹450 / 250g", tags: ["specialty"], badge: ["pick", "Group loved"],
      desc: "'Kya pyaari coffee.' Nutty notes that survive into milk. Roasts next-day after order (fresh!) but delivery can be slow. Code HELLONAIVO.",
      link: "https://naivo.in/", linkLabel: "naivo.in (HELLONAIVO)" },
    { name: "Mokka Farms", price: "~₹600 / 500g", tags: ["budget"], badge: ["neutral", "Divisive"],
      desc: "Cheap practice beans (try 50:50 or 80:20). Roasting can be inconsistent — some love it for the price, one member said 'never again.' You decide.",
      link: "https://www.mokkafarms.com/", linkLabel: "mokkafarms.com" },
    { name: "Lavazza Crema e Gusto", price: "supermarket", tags: ["budget", "milk"], badge: ["neutral", "Seasoning beans"],
      desc: "Easy to find, great for practising / seasoning a new grinder & for iced milk drinks. Watch the roast date — often old. Not specialty, and that's OK.",
      link: "https://www.amazon.in/s?k=lavazza+crema+e+gusto+beans", linkLabel: "Search Amazon" },
    { name: "Roastery Coffee House — Baarbara", price: "~₹500 / 250g", tags: ["specialty"], badge: ["neutral", "Cafés everywhere"],
      desc: "Solid specialty with cafés in most cities (order via Zomato/Swiggy for same-day-fresh). Baarbara Estate is a popular pick.",
      link: "https://roasterycoffee.co.in/", linkLabel: "roasterycoffee.co.in" },
    { name: "Season Sync / Odd / Broot / Bloom", price: "varies", tags: ["specialty"], badge: ["neutral", "Worth exploring"],
      desc: "Group mentions: Season Sync 'Monsoon Craft', Odd Coffee 'Ol Smoky' (very dark), Broot espresso blend, Bloom 'Kid Dynamite'. Branch out once you can dial in.",
      link: "https://www.instagram.com/explore/search/keyword/?q=indian%20specialty%20coffee", linkLabel: "Explore roasters" },
  ];

  const PORTAFILTERS = [
    { name: "THW 51mm Bottomless", price: "~₹2.5–2.7k", tags: [], badge: ["pick", "Community #1"],
      desc: "Stainless steel, comes with an IMS-grade precision basket, wooden or black handle. Frequently out of stock — grab it when it's live. (That's the hero photo up top.)",
      link: "https://www.amazon.in/s?k=THW+bottomless+portafilter+delonghi+51mm", linkLabel: "Search Amazon" },
    { name: "Neouza 51mm Bottomless", price: "~₹2–2.4k", tags: [], badge: ["value", "Great quality"],
      desc: "Ships from China (10–25 days, ~₹600 shipping). Comes with dose rings + cleaning tools. Card payments can be fussy — One Card / Forex / Scapia tend to work.",
      link: "https://neouza.com/", linkLabel: "neouza.com" },
    { name: "Brewalsa 51mm (Made for DeLonghi)", price: "~₹2.1k + ship", tags: [], badge: ["neutral", "Purpose-built"],
      desc: "Wooden-handle SS portafilter explicitly made for Dedica EC680/685/785/820/850. Use code BREWALSA_2026.",
      link: "https://brewalsa.com/", linkLabel: "brewalsa.com (BREWALSA_2026)" },
    { name: "DIY: 'circumcise' your stock PF", price: "~₹50–100", tags: [], badge: ["neutral", "Jugaad route"],
      desc: "Take the stock portafilter to a welder/fabricator and chop the spout off the bottom. Cheap & works — just don't cut all the way to the top (it can snap when you knock). Smooth the edge after.",
      link: "https://www.youtube.com/results?search_query=delonghi+dedica+bottomless+portafilter+mod", linkLabel: "How-to videos" },
  ];

  const BASKETS = [
    "<b>IMS precision (H22 / H26):</b> ~₹3–5k. Laser-cut, super even flow. Premium — import via desertcart or a friend abroad to dodge inflated local pricing.",
    "<b>THW basket:</b> comes bundled with the THW portafilter and is already IMS-grade quality. Most people need nothing more.",
    "<b>Supvox 8–12g single-shot basket:</b> good budget single basket if you drink small.",
    "<b>Capfei / generic precision baskets:</b> fine performers at lower cost — fit 16–17g easily.",
    "<b>Always check fitment:</b> 51mm, and the listing must mention DeLonghi / Dedica / EC685 / EC890.",
  ];

  const ACCESSORIES = [
    { name: "WDT tool", price: "~₹200", rating: ["pick", "Essential"], desc: "Thin needles to stir & distribute grounds. Kills clumps & channeling. The best ₹200 you'll spend.",
      link: "https://www.amazon.in/s?k=WDT+tool+espresso+distribution+51mm", linkLabel: "Search Amazon" },
    { name: "RDT spray bottle", price: "~₹120", rating: ["pick", "Essential"], desc: "One spritz of water on the beans before grinding = no static, no mess. The Neutrino bottle is 'too good for ₹120.'",
      link: "https://www.amazon.in/dp/B0GRR9DQXZ", linkLabel: "Neutrino RDT bottle" },
    { name: "Puck screen (0.8mm, magnetic)", price: "~₹300–500", rating: ["pick", "Get it"], desc: "Even water distribution, keeps the shower screen clean, lets you load 17–18g. Get 0.8mm, not 1.7mm.",
      link: "https://www.amazon.in/s?k=51mm+puck+screen+0.8mm+magnetic", linkLabel: "Search Amazon" },
    { name: "Scale w/ timer", price: "~₹1–2k", rating: ["pick", "Important"], desc: "Weigh dose + shot, time the pour. This one fits the Dedica's drip tray nicely; Hoffen (~₹1k) & Kaapi A-Series (~₹2086) also work.",
      link: "https://www.amazon.in/dp/B0DPL28C9Q", linkLabel: "Coffee scale (fits EC890)" },
    { name: "Tamper", price: "~₹1–1.2k", rating: ["neutral", "Nice"], desc: "Flat-base preferred. Supvox / Fix Coffee spring-loaded are OK but loosely calibrated; Normcore if budget allows.",
      link: "https://www.amazon.in/Supvox%C2%AE-Espresso-Calibrated-Stainless-Anti-Corrosion/dp/B0D5XL38HX/", linkLabel: "Supvox calibrated tamper" },
    { name: "Dosing ring", price: "~₹699", rating: ["neutral", "Optional"], desc: "Makes WDT mess-free. Buy one that sits ABOVE the portafilter, not one that drops inside (those get stuck).",
      link: "https://amzn.in/d/0bI0iOI4", linkLabel: "No-border dosing ring" },
    { name: "Knock box", price: "~₹500–1k", rating: ["neutral", "QoL"], desc: "Bonus: many people's stock basket stopped flying out on knock once they used a knock box.",
      link: "https://www.amazon.in/s?k=espresso+knock+box", linkLabel: "Search Amazon" },
    { name: "Single-dose vials", price: "~₹350 / 15", rating: ["neutral", "Good to have"], desc: "Single-dose your beans into 50ml test-tube vials (≈18g of medium-dark each) and freeze them. Mostly aesthetic + a tiny RDT effect from condensation — but they look fantastic on the bar. Pair them with a <a href=\"https://www.amazon.in/Test-Stand-holes-Moulded-Polypropylene/dp/B0DD429G18\" target=\"_blank\" rel=\"noopener\">test-tube stand ↗</a>.",
      link: "https://www.amazon.in/dp/B0GCWGBBM4", linkLabel: "50ml vials" },
    { name: "Tamping station", price: "~₹500+ / 3D-print", rating: ["neutral", "If bottomless"], desc: "Bottomless portafilters wobble — a station holds it steady while you tamp. 3D-print it for ~₹50 in filament.",
      link: "https://www.amazon.in/s?k=51mm+tamping+station+holder", linkLabel: "Search Amazon" },
    { name: "Descaler", price: "~₹600 / 6 uses", rating: ["neutral", "Upkeep"], desc: "Aftermarket descaler is far cheaper than DeLonghi's (~₹750/use). Food-safe citric acid works too. Run the cycle ~monthly.",
      link: "https://www.amazon.in/dp/B00CWANDT6", linkLabel: "Aftermarket descaler" },
  ];

  const SYMPTOMS = [
    { label: "😖 Sour / sharp / hollow", cause: "Under-extracted (or too light a roast for the Dedica)",
      fixes: ["<b>Grind finer</b> — the #1 fix.", "Pull a longer ratio (1:2.5–1:3) and let it run a few more seconds.", "Use fresher beans; rest 7–10 days off roast.", "Light roast? The Dedica struggles to hold 94°C — go medium/medium-dark."] },
    { label: "😣 Bitter / harsh / dry", cause: "Over-extracted",
      fixes: ["<b>Grind coarser.</b>", "Stop the shot earlier (shorter ratio, e.g. 1:2).", "Clean the basket & portafilter — old oils taste rancid/metallic.", "Don't go below ~9 clicks on a hand grinder (and don't over-extract dark roasts)."] },
    { label: "💦 Watery / gushes / done in <15s", cause: "Too coarse, or channeling",
      fixes: ["<b>Grind finer</b> (1–2 clicks at a time).", "WDT + level before tamping.", "Check beans aren't stale (pre-ground in a naked basket = no resistance).", "Make sure you're not using a filter-only grinder."] },
    { label: "🪨 Chokes / barely drips", cause: "Too fine",
      fixes: ["<b>Grind coarser.</b>", "Use a touch less coffee.", "If the machine auto-switches to the steam light when choked — let steam out, then retry."] },
    { label: "🎇 Sprays sideways (bottomless)", cause: "Channeling — uneven puck",
      fixes: ["<b>WDT thoroughly</b> and distribute evenly.", "Tap the portafilter to settle grounds, then level & tamp flat.", "Add a puck screen on top.", "A spritzy bottomless shot is normal for the first few seconds — judge the steady state."] },
    { label: "🥛 Espresso vanishes in milk", cause: "Shot too weak / wrong ratio for milk",
      fixes: ["Pull a stronger shot (more dose, tighter ratio like 1:1.5–1:2).", "Use a medium-dark or robusta-blend bean for milk drinks.", "Don't over-dilute — start with less milk (~100–140g)."] },
    { label: "🧊 Machine stuck on the steam light", cause: "Water/airlock or a choked shot",
      fixes: ["<b>Check the water tank</b> — refill & reseat it firmly.", "Open the steam knob and release steam for a few seconds.", "Power-cycle. If it choked, it auto-switches to steam — let it out and retry.", "It happens to everyone. Nobody's machine has exploded. Probably."] },
  ];

  const TROUBLE = [
    { q: "🧊 Machine froze on the steam light and won't pull a shot", a: "Almost always water or a choked puck. Refill and firmly reseat the tank; open the steam knob to release steam for a few seconds; power-cycle. If you'd ground too fine and choked it, the machine flips to steam mode on purpose — let the steam out and try again. Empty tank is the usual culprit." },
    { q: "🔒 The basket gets stuck in the group head (need a knife to remove)", a: "Super common with the stock portafilter. Fixes: use a bit less coffee (keep it below the basket 'ears'); if it's stuck, run a shot and the pressure pops it off; use a puck screen; pull the portafilter slightly <b>upward</b> as you remove it; or just switch to a bottomless portafilter and the problem disappears." },
    { q: "🧪 Descaling light came on — what do I do?", a: "It's based on shot count + your water-hardness setting, roughly monthly / ~100 shots. Use DeLonghi descaler (~₹750) or aftermarket (~₹600 for six), or food-safe citric acid. The Dedica has <b>no 3-way valve and no blind basket</b>, so you can't back-flush — just run the descale cycle. Don't touch the liquid bare-handed." },
    { q: "💧 Set water hardness?", a: "Long-press the steam button ~10s to enter settings (levels 1–3, higher = harder water). If you run RO/soft water, a low setting is fine. A TDS meter does <i>not</i> measure hardness — use a test strip if you have one (most boxes don't include it; buy on Amazon)." },
    { q: "📦 Should I buy open-box (e.g. Latteholic)?", a: "<b>It's the group's most debated question.</b> Open-box saves ~₹8k (≈₹12k vs ~₹20k new on Amazon — sometimes 10k+), and most units arrive basically new with only minor cosmetic marks. But it's a genuine gamble: one member's tank arrived broken and the replacement was <i>also</i> damaged; one machine's pump failed after a couple of months and is back with Latteholic for repair — whether the warranty gets honoured cleanly is still to be seen. So <b>film one continuous unboxing video</b>, go in eyes-open, and decide if the saving is worth the risk. Want zero chance of a flaw? Buy sealed/new." },
    { q: "🚰 The water tank cracked / I need a spare part", a: "Tanks are fragile and crack in transit. A replacement tank runs ~₹1–1.5k (don't believe inflated ₹5k Amazon listings; ask the seller). Spare parts for EC680/685 are at pgservice.cc. Do NOT patch a tank with super-glue — it's not food-safe." },
    { q: "🫗 Steam wand has milk buildup / weak steam", a: "Purge & wipe the wand immediately after every steam. For buildup, soak the tip and clear the holes with a pin. The EC685's tiny wand is weak by design — some people upgrade to a Rancilio-style wand (a mod), but technique fixes most of it." },
    { q: "🧱 My THW portafilter chipped/broke", a: "Usually from grinding super fine + over-pressure, sometimes when reseating the rubber gasket. The current stock is reportedly more robust; most users report theirs is solid. Don't force a too-fine grind into a naked basket." },
  ];

  const FAQ = [
    { q: "EC890 or EC685 — which Dedica?", a: "The group overwhelmingly votes <b>EC890</b> (the 'Duo' — adds cold brew + a better steam wand). The 685 is near-identical for espresso but has a weaker, smaller steam wand. If you can, get the 890." },
    { q: "Do I really need to ditch the stock portafilter?", a: "For your best espresso, yes — a bottomless (naked) portafilter + non-pressurised basket lets you see channeling and actually improve. But <b>keep the pressurised stock one</b> for pre-ground coffee, lazy days, guests, and the Duo's cold-brew mode." },
    { q: "How much should I spend on a grinder vs the machine?", a: "At least as much as the machine — ideally more. The grinder is the single biggest factor in cup quality after the beans. A great machine with a bad grinder makes bad espresso." },
    { q: "Is a manual grinder fine, or do I need electric?", a: "Manual (Kingrinder K6 / Timemore C3 ESP) makes excellent espresso — it's just slow and a daily arm workout. Most people upgrade to electric (HiBrew G5 / Rift 64) within months. If budget allows, buy electric now and skip the regret." },
    { q: "What ratio & dose should I start with?", a: "Double: <b>18g in → 36g out in ~25–32s</b> (1:2). Single: 9g → ~22g (1:2.5). Weigh everything; the machine's '2x' button actually pulls a lungo, so don't rely on it." },
    { q: "Why is my espresso always sour?", a: "Two reasons: (1) grind too coarse → under-extraction → grind finer; (2) the bean is a light roast and the Dedica can't hold high temp, so it under-extracts. Start with medium / medium-dark roasts and pull a slightly longer ratio." },
    { q: "Can I use pre-ground coffee?", a: "Yes, but only in the <b>pressurised</b> stock basket. In a bottomless/non-pressurised basket, stale pre-ground has no CO₂ left to build resistance, so it just gushes. Freshly ground is night-and-day better." },
    { q: "Which milk steams best for a beginner?", a: "Lower-fat tetra-pack milk is more forgiving — <b>Amul Blue</b> or <b>Akshayakalpa</b> are group favourites. Use it cold, purge the wand first, and keep it under 65°C." },
    { q: "How long do I rest beans after roasting?", a: "7–10 days off the roast date is the sweet spot (some go 2–3 weeks for darker roasts). Then use within ~a month. To store longer, degas ~10 days then freeze in single-dose portions." },
    { q: "Do I need an expensive IMS basket?", a: "No. A good grinder + fresh beans + a decent precision basket beats a fancy basket with a bad grind. The THW portafilter already ships with an IMS-grade basket. Buy the IMS only when everything else is dialled in." },
    { q: "What about the HiBrew H10A instead of the Dedica?", a: "If your budget is ~₹25k, the H10A is a genuinely better machine (temp control, pressure gauge, stronger steam, 3 baskets in the box). The group's honest take: 'don't buy a Dedica if you can spend 25k.' But the Dedica is cheaper, more moddable, better supported in India, and a delightful gateway." },
    { q: "Coffee after which time ruins sleep?", a: "Caffeine's half-life is ~5 hours (3–7h range), so a fair chunk is still in you 7 hours later. If you're sensitive, avoid coffee after ~6 PM. Or embrace 'darr ke aage caffeine hai' and accept the consequences. ☠️" },
  ];

  const COUPONS = [
    { vendor: "Fraction9", code: "FARM15", discount: "15% off coffee" },
    { vendor: "Fraction9", code: "FARM2CUP12", discount: "12% off coffee" },
    { vendor: "Naivo", code: "HELLONAIVO", discount: "10% off" },
    { vendor: "Blue Tokai", code: "HELLOSUMMER", discount: "on coffee" },
    { vendor: "Fix Coffee", code: "SCL12", discount: "12% off gear" },
    { vendor: "Coffee Plus", code: "PRE5", discount: "select grinders" },
    { vendor: "Brewalsa", code: "BREWALSA_2026", discount: "portafilter" },
  ];

  const YOUTUBERS = [
    { name: "James Hoffmann", by: "the espresso bible", desc: "World Barista Champion. His espresso & dial-in videos are the canonical starting point. Watch 'The Best Espresso… ' and his milk videos.",
      link: "https://www.youtube.com/@jameshoffmann", linkLabel: "youtube.com/@jameshoffmann" },
    { name: "Lance Hedrick", by: "practical dial-in & milk", desc: "Genuinely the most useful practical channel for beginners — dialing in, puck prep, and milk steaming explained clearly.",
      link: "https://www.youtube.com/@LanceHedrick", linkLabel: "youtube.com/@LanceHedrick" },
    { name: "Tom's Coffee Corner", by: "THE Dedica channel", desc: "The GOAT for this exact machine. Dedica-specific mods, the bottomless conversion, and EC890 milk steaming. Watch this for machine-specific tips.",
      link: "https://www.youtube.com/@TomsCoffeeCorner", linkLabel: "youtube.com/@TomsCoffeeCorner" },
    { name: "Daddy Got Coffee", by: "India-focused home barista", desc: "Great India-specific content — gear that's actually available here, beans you can actually buy, and beginner-friendly walkthroughs. Very relatable for the Dedica crowd.",
      link: "https://www.youtube.com/@DaddyGotCoffee", linkLabel: "youtube.com/@DaddyGotCoffee" },
  ];

  const SELLERS = [
    { name: "Latteholic", type: "Machines (new + open-box)", desc: "The trusted India distributor (also fulfils delonghi.co.in). EC890 ~₹20k new (Amazon), ~₹12k open-box (10k+ on a good day). Open-box is sold with the 1-year warranty — though whether they honour it smoothly on a real fault is still being tested. The group's go-to regardless; just film your unboxing.",
      link: "https://latteholic.com/", linkLabel: "latteholic.com" },
    { name: "DeLonghi India (official)", type: "Machines", desc: "Official site for the Dedica Duo EC890. Ships via Latteholic. Compare its price with sales before buying.",
      link: "https://delonghi.co.in/", linkLabel: "delonghi.co.in" },
    { name: "Coffee Plus", type: "Grinders & gear", desc: "Reliable for grinders — Espressa Orbit 64, Kingrinder K6 (pre-order), Timemore. Good support, ~5% payment cashback. Code PRE5.",
      link: "https://coffeeplus.in/", linkLabel: "coffeeplus.in" },
    { name: "Fix Coffee", type: "Grinders & accessories", desc: "HiBrew G5/H10A, DF54, tampers, dosing rings. Code SCL12.",
      link: "https://fixcoffee.shop/", linkLabel: "fixcoffee.shop" },
    { name: "Cipher Brewing", type: "Grinders", desc: "Makers of the Rift 64 — excellent grinder, strong warranty support (they've replaced units). Support replies can be slow.",
      link: "https://cipherbrewing.com/", linkLabel: "cipherbrewing.com" },
    { name: "Neouza", type: "Portafilters & baskets", desc: "Good bottomless portafilters with dose rings + tools. Ships from China (10–25 days). There's a dedicated WhatsApp buy group.",
      link: "https://neouza.com/", linkLabel: "neouza.com" },
    { name: "Brewalsa", type: "Portafilters & baskets", desc: "Purpose-built 51mm bottomless portafilters & baskets for DeLonghi. Code BREWALSA_2026.",
      link: "https://brewalsa.com/", linkLabel: "brewalsa.com" },
    { name: "Amazon India", type: "Everything", desc: "THW portafilters, baskets, WDT/RDT tools, scales, puck screens, descaler. Use the gift-card + cashback-card trick to save. Watch big sales.",
      link: "https://www.amazon.in/", linkLabel: "amazon.in" },
  ];

  const MODS = [
    { name: "🔅 Dimmer / flow-control mod", desc: "Add a dimmer to control pump pressure & flow — the gateway mod. Several clean write-ups exist on Reddit.",
      link: "https://www.reddit.com/r/espresso/comments/1n77iil/modded_delonghi_dedica/", linkLabel: "Modded Dedica (r/espresso)" },
    { name: "💾 The Dedica mod bible (GitHub)", desc: "CaiJonas' full hardware modification repo for the EC685/EC885 — pressure profiling, wiring, the works.",
      link: "https://github.com/CaiJonas/DeLonghi-Dedica-EC885-EC685-modification", linkLabel: "github.com/CaiJonas" },
    { name: "🤖 Dedica Coach Buddy", desc: "A community-made web app to help log shots & dial in. Rough around the edges but a fun starting point.",
      link: "https://dedica-coach-buddy.lovable.app/", linkLabel: "dedica-coach-buddy.lovable.app" },
    { name: "👥 r/IndiaCoffee", desc: "Where half this group came from. Buy/sell preloved gear, ask questions, find roaster reviews & free bean samples.",
      link: "https://www.reddit.com/r/IndiaCoffee/", linkLabel: "reddit.com/r/IndiaCoffee" },
    { name: "📊 Community bean price sheet", desc: "A crowd-maintained spreadsheet comparing Indian coffee bean prices by ₹/gram. Find the cheapest fresh beans.",
      link: "https://docs.google.com/spreadsheets/u/0/d/1qj5oSo6gBcBq2cdFhcIouNtfLc3VQJgsDX-U31OSnnc/htmlview", linkLabel: "Open the price sheet" },
    { name: "⚖️ DIY smart scale (ESP32)", desc: "For the truly gone: build a Bluetooth shot scale with an ESP32 + load cell. The deep end of the rabbit hole.",
      link: "https://www.reddit.com/r/espresso/", linkLabel: "Get inspired (r/espresso)" },
  ];

  const GALLERY = [
    { src: "assets/img/latte-tulip.jpg", cap: "A clean tulip. Goals." },
    { src: "assets/img/latte-swan.jpg", cap: "Phoenix? Swan? Mozilla fox? Group couldn't agree." },
    { src: "assets/img/setup-corner.jpg", cap: "A tidy little Dedica + grinder corner." },
    { src: "assets/img/latte-attempt.jpg", cap: "Latte art is a journey. This is the journey." },
    { src: "assets/img/basket-ims-vs-generic.jpg", cap: "Generic vs IMS basket — spot the precision." },
  ];

  const QUOTES = [
    { t: "Welcome to the rabbit hole and hope you have fun lol", w: "— a kindly senior member, to every newbie" },
    { t: "1. trash the portafilter. 2. buy a bottomless portafilter (sorry, it's true 😓).", w: "— the entire group's onboarding advice" },
    { t: "Crazy, gotta perform circumcision on my portafilter now.", w: "— on the DIY bottomless mod" },
    { t: "Bhai galat group me aagya mai 🤣 Never ending loop. Hole h.", w: "— a member realising the cost of this hobby" },
    { t: "My right arm looking jacked already, people will assume the wrong things.", w: "— a hand-grinder owner" },
    { t: "Istg never give expensive coffee for guests.", w: "— hard-won wisdom" },
    { t: "If someone asks for milk coffee, I serve them Davidoff.", w: "— protecting the good beans" },
    { t: "Purani coffee ka taste accha hota hai, apko nhi pta 💀", w: "— a heretic, after pulling a shot of moka pre-ground" },
    { t: "Darr ke aage caffeine hai!", w: "— the group motto, basically" },
    { t: "apes together strong", w: "— after two members verified an accessory with ChatGPT" },
    { t: "You have 72 people in this group praying for your tank bhai, stop worrying.", w: "— solidarity over a cracked water tank" },
    { t: "Hobbies are expensive 😤 saari mehengi hobbies leke baith gaya hun.", w: "— a man and his receipts" },
    { t: "someone should just build a site for this… Claude devta ki jai ho!", w: "— the message that created this website 🫡" },
  ];

  /* ---------- RENDER ---------- */

  // Ticker
  const tickerItems = ["☕ spend on the grinder","🕳️ go bottomless","🫘 fresh beans win","💦 sour? grind finer","🧪 descale monthly","📦 film your unboxing","🥛 purge the wand","⚖️ weigh everything","🚫 lighter roast = sour","🔧 change one variable","💸 watch the sales","🐇 down the rabbit hole"];
  const tk = $("#tickerTrack");
  if (tk) {
    const span = el("span", null, tickerItems.join(" &nbsp;•&nbsp; ") + " &nbsp;•&nbsp; ");
    const span2 = span.cloneNode(true);
    tk.append(span, span2);
  }

  // Rabbit meter (tracks max of scroll depth & kit progress) — declared early so it's safe to call from the checklist
  const rabbitFill = $("#rabbitMeter"), rabbitLabel = $("#rabbitLabel");
  const rabbitStages = [
    [0, "just a curious beginner…"], [20, "ooh, a bottomless portafilter 👀"], [40, "you bought a scale, didn't you"],
    [60, "explaining 'channeling' at parties"], [80, "eyeing a ₹20k grinder 💸"], [95, "soldering a dimmer mod at 2am 🔧"],
  ];
  let rabbitVal = 8;
  function setRabbit(v) {
    rabbitVal = Math.max(rabbitVal, v);
    rabbitFill.style.width = Math.max(8, rabbitVal) + "%";
    let label = rabbitStages[0][1];
    for (const [th, txt] of rabbitStages) if (rabbitVal >= th) label = txt;
    rabbitLabel.textContent = label;
  }

  // Checklist
  const checklistEl = $("#checklist");
  const KIT_KEY = "dedica_kit_v1";
  let kitState = JSON.parse(localStorage.getItem(KIT_KEY) || "{}");
  const kitMsgs = [
    "Press a checkbox to begin your descent. 😈",
    "Baby steps. The beans await. 🫘",
    "You're committing. No going back now.",
    "Halfway down the hole. 🐇",
    "Your wallet is nervous. Keep going.",
    "Almost a real home barista now…",
    "Look at you. A whole setup.",
    "Certified Dedica menace. 🏆",
  ];
  function renderChecklist() {
    checklistEl.innerHTML = "";
    STARTER_KIT.forEach((item, i) => {
      const done = !!kitState[i];
      const node = el("div", "check-item" + (done ? " done" : ""));
      node.innerHTML = `<div class="check-box">${done ? "✓" : ""}</div>
        <div><div class="ci-title">${item.t}</div><div class="ci-desc">${item.d}</div></div>`;
      node.addEventListener("click", () => {
        kitState[i] = !kitState[i];
        localStorage.setItem(KIT_KEY, JSON.stringify(kitState));
        renderChecklist();
        updateKit(true);
      });
      checklistEl.appendChild(node);
    });
    updateKit(false);
  }
  function updateKit(celebrate) {
    const total = STARTER_KIT.length;
    const done = STARTER_KIT.filter((_, i) => kitState[i]).length;
    const pct = Math.round((done / total) * 100);
    $("#kitPct").textContent = pct + "%";
    $("#kitMsg").textContent = kitMsgs[Math.min(kitMsgs.length - 1, Math.floor((done / total) * (kitMsgs.length - 1)))];
    setRabbit(pct);
    if (celebrate && pct === 100) beanBurst();
  }
  $("#resetKit").addEventListener("click", () => {
    kitState = {}; localStorage.removeItem(KIT_KEY); renderChecklist();
  });
  renderChecklist();

  // Generic card builders
  function badgeHTML(b) { return b && b.length ? `<span class="tag ${b[0]}">${b[1]}</span>` : ""; }
  function pcHTML(pros, cons) {
    if ((!pros || !pros.length) && (!cons || !cons.length)) return "";
    const p = (pros || []).map(x => `<span class="p">✓ ${x}</span>`).join("");
    const c = (cons || []).map(x => `<span class="c">✗ ${x}</span>`).join("");
    return `<div class="pc">${p}${c}</div>`;
  }
  function buyHTML(link, label) { return link ? `<a class="buylink" href="${link}" target="_blank" rel="noopener">${label || "Buy / info"}</a>` : ""; }

  function renderGrinders(filter) {
    const grid = $("#grinderGrid"); grid.innerHTML = "";
    GRINDERS.forEach(g => {
      const show = filter === "all" || g.tags.includes(filter);
      const card = el("div", "card" + (show ? "" : " is-hidden"));
      card.dataset.tags = g.tags.join(" ");
      card.innerHTML = `<div class="card-top"><h3>${g.name}</h3>${badgeHTML(g.badge)}</div>
        <div class="meta"><b>${g.price}</b></div>
        <p class="desc">${g.desc}</p>${pcHTML(g.pros, g.cons)}${buyHTML(g.link, g.linkLabel)}`;
      grid.appendChild(card);
    });
  }
  function renderBeans(filter) {
    const grid = $("#beanGrid"); grid.innerHTML = "";
    BEANS.forEach(b => {
      const show = filter === "all" || b.tags.includes(filter);
      const card = el("div", "card" + (show ? "" : " is-hidden"));
      card.innerHTML = `<div class="card-top"><h3>${b.name}</h3>${badgeHTML(b.badge)}</div>
        <div class="meta"><b>${b.price}</b></div>
        <p class="desc">${b.desc}</p>${buyHTML(b.link, b.linkLabel)}`;
      grid.appendChild(card);
    });
  }
  function renderPF() {
    const grid = $("#pfGrid"); grid.innerHTML = "";
    PORTAFILTERS.forEach(p => {
      const card = el("div", "card");
      card.innerHTML = `<div class="card-top"><h3>${p.name}</h3>${badgeHTML(p.badge)}</div>
        <div class="meta"><b>${p.price}</b></div>
        <p class="desc">${p.desc}</p>${buyHTML(p.link, p.linkLabel)}`;
      grid.appendChild(card);
    });
  }
  function renderBaskets() {
    const ul = $("#basketList"); ul.innerHTML = "";
    BASKETS.forEach(b => ul.appendChild(el("li", null, b)));
  }
  function renderAcc() {
    const grid = $("#accGrid"); grid.innerHTML = "";
    ACCESSORIES.forEach(a => {
      const card = el("div", "card");
      card.innerHTML = `<div class="card-top"><h3>${a.name}</h3>${badgeHTML(a.rating)}</div>
        <div class="meta"><b>${a.price}</b></div><p class="desc">${a.desc}</p>${buyHTML(a.link, a.linkLabel)}`;
      grid.appendChild(card);
    });
  }
  function renderYT() {
    const grid = $("#ytGrid"); grid.innerHTML = "";
    YOUTUBERS.forEach(y => {
      const card = el("div", "card");
      card.innerHTML = `<h3>${y.name}</h3><div class="yt-by">▶ ${y.by}</div>
        <p class="desc">${y.desc}</p>${buyHTML(y.link, y.linkLabel)}`;
      grid.appendChild(card);
    });
  }
  function renderSellers() {
    const grid = $("#sellerGrid"); grid.innerHTML = "";
    SELLERS.forEach(s => {
      const card = el("div", "card");
      card.innerHTML = `<div class="seller-type">${s.type}</div><h3>${s.name}</h3>
        <p class="desc">${s.desc}</p>${buyHTML(s.link, s.linkLabel)}`;
      grid.appendChild(card);
    });
  }
  function renderMods() {
    const grid = $("#modGrid"); grid.innerHTML = "";
    MODS.forEach(m => {
      const card = el("div", "card");
      card.innerHTML = `<h3>${m.name}</h3><p class="desc">${m.desc}</p>${buyHTML(m.link, m.linkLabel)}`;
      grid.appendChild(card);
    });
  }
  function renderGallery() {
    const g = $("#gallery"); g.innerHTML = "";
    GALLERY.forEach(item => {
      const fig = el("figure");
      fig.innerHTML = `<img src="${item.src}" alt="${item.cap}" loading="lazy"><figcaption>${item.cap}</figcaption>`;
      g.appendChild(fig);
    });
  }
  function renderQuotes() {
    const w = $("#quoteWall"); w.innerHTML = "";
    QUOTES.forEach(q => {
      const node = el("div", "quote", `“${q.t}”<span class="who">${q.w}</span>`);
      w.appendChild(node);
    });
  }

  // Accordions
  function renderAccordion(target, data) {
    const wrap = $(target); wrap.innerHTML = "";
    data.forEach(item => {
      const it = el("div", "acc-item");
      it.innerHTML = `<button class="acc-q">${item.q}<span class="pm">+</span></button>
        <div class="acc-a"><div class="acc-a-inner">${item.a}</div></div>`;
      const btn = it.querySelector(".acc-q"), ans = it.querySelector(".acc-a");
      btn.addEventListener("click", () => {
        const open = it.classList.toggle("open");
        ans.style.maxHeight = open ? ans.scrollHeight + "px" : 0;
      });
      wrap.appendChild(it);
    });
  }

  // Diagnoser
  function renderDiagnoser() {
    const chips = $("#symptomChips"), out = $("#diagnosis");
    SYMPTOMS.forEach((s, i) => {
      const b = el("button", "symptom", s.label);
      b.addEventListener("click", () => {
        $$(".symptom", chips).forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        out.innerHTML = `<div class="diag-title">${s.label}</div>
          <div class="diag-cause">Likely cause: ${s.cause}</div>
          <ul class="diag-fixes">${s.fixes.map(f => `<li>${f}</li>`).join("")}</ul>`;
        setRabbit(35);
      });
      chips.appendChild(b);
    });
  }

  // Coupons
  function renderCoupons() {
    const grid = $("#couponGrid"); grid.innerHTML = "";
    COUPONS.forEach(c => {
      const card = el("div", "coupon");
      card.innerHTML = `<span class="copyhint">tap to copy</span>
        <div class="vendor">${c.vendor}</div><div class="code">${c.code}</div><div class="discount">${c.discount}</div>`;
      card.addEventListener("click", () => {
        navigator.clipboard?.writeText(c.code).then(
          () => toast(`Copied “${c.code}” ☕`),
          () => toast(`Code: ${c.code}`)
        );
      });
      grid.appendChild(card);
    });
  }

  renderGrinders("all"); renderBeans("all"); renderPF(); renderBaskets(); renderAcc();
  renderYT(); renderSellers(); renderMods(); renderGallery(); renderQuotes();
  renderAccordion("#troubleAccordion", TROUBLE); renderAccordion("#faqAccordion", FAQ);
  renderDiagnoser(); renderCoupons();

  // Filter chips
  function wireFilters(wrap, renderFn) {
    $$(".chip", $(wrap)).forEach(chip => {
      chip.addEventListener("click", () => {
        $$(".chip", $(wrap)).forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        renderFn(chip.dataset.filter);
      });
    });
  }
  wireFilters("#grinderFilters", renderGrinders);
  wireFilters("#beanFilters", renderBeans);

  /* ---------- INTERACTIONS ---------- */

  // Mobile nav
  const toggle = $("#navToggle"), navLinks = $("#navLinks");
  toggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => {
    navLinks.classList.remove("open"); toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  }));

  // Scroll progress + rabbit meter on scroll
  const prog = $("#scrollProgress");
  function onScroll() {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    prog.style.width = (scrolled * 100) + "%";
    setRabbit(Math.round(scrolled * 92));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Count-up stats
  $$(".hero-stats b[data-count]").forEach(b => {
    const target = b.textContent; const num = parseInt(b.dataset.count, 10);
    if (isNaN(num)) return;
    let cur = 0; const suffix = target.replace(/[0-9]/g, "");
    const step = Math.max(1, Math.round(num / 28));
    const iv = setInterval(() => {
      cur += step; if (cur >= num) { cur = num; clearInterval(iv); }
      b.textContent = cur + suffix;
    }, 28);
  });

  // To-top
  $("#toTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Toast
  let toastTimer;
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 1900);
  }

  // Floating beans
  const beansBg = $(".beans-bg");
  if (beansBg && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const emojis = ["🫘", "☕", "🫘"];
    for (let i = 0; i < 14; i++) {
      const b = el("span", "bean", emojis[i % emojis.length]);
      b.style.left = Math.random() * 100 + "vw";
      b.style.animationDuration = (16 + Math.random() * 20) + "s";
      b.style.animationDelay = (-Math.random() * 30) + "s";
      b.style.fontSize = (16 + Math.random() * 22) + "px";
      beansBg.appendChild(b);
    }
  }

  // Bean burst on 100% kit
  function beanBurst() {
    toast("🏆 Full kit unlocked. You menace.");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (let i = 0; i < 26; i++) {
      const b = el("div", null, Math.random() > .5 ? "🫘" : "☕");
      b.style.cssText = `position:fixed;left:50%;top:40%;font-size:${18 + Math.random() * 18}px;z-index:300;pointer-events:none;transition:transform 1.1s ease-out,opacity 1.1s`;
      document.body.appendChild(b);
      requestAnimationFrame(() => {
        const a = Math.random() * Math.PI * 2, d = 120 + Math.random() * 260;
        b.style.transform = `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px) rotate(${Math.random() * 720}deg)`;
        b.style.opacity = "0";
      });
      setTimeout(() => b.remove(), 1200);
    }
  }

  // Konami-ish easter egg: type "beans"
  let buf = "";
  window.addEventListener("keydown", e => {
    buf = (buf + e.key).slice(-5).toLowerCase();
    if (buf === "beans") { beanBurst(); toast("🫘 you found the beans"); }
  });

  // Active nav link on scroll
  const sections = $$("main section[id]");
  const navMap = {};
  $$("#navLinks a").forEach(a => navMap[a.getAttribute("href").slice(1)] = a);
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      const a = navMap[en.target.id];
      if (a && en.isIntersecting) {
        $$("#navLinks a").forEach(x => x.style.color = "");
        a.style.color = "var(--orange)";
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => obs.observe(s));
})();
