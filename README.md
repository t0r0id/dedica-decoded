# ☕ Dedica Decoded

> The unofficial, slightly unhinged starter guide for **DeLonghi Dedica EC890 / EC685** espresso in **India**.

A single-page, zero-dependency static site that helps a complete beginner go from
"I just bought a tiny espresso machine" to "I pull decent shots and understand the rabbit hole I've fallen into."

It covers:

- ✅ A **starter-kit checklist** (saved to your device)
- ⚙️ **Grinders** — manual & electric, with a budget/type filter and honest "avoid" list
- 🫘 **Beans worth buying in India**, filterable by budget / milk / specialty
- 🕳️ **Bottomless portafilters & baskets** (incl. the DIY "circumcise your portafilter" route)
- 🧰 **Accessories** with honest ratings
- 🎯 **Dial-in recipe** + an interactive **"Fix My Shot"** diagnoser
- 🥛 **Milk steaming** technique for the Dedica's polite little wand
- 🚑 **Troubleshooting** + a big **FAQ**
- 🎟️ **Coupon codes** (tap to copy) & money hacks
- 📺 **YouTubers** to learn from, 🛒 **trusted India sellers**, 🛠️ **mods**
- 📸 a community **gallery** and a **wall of quotes**

## Origin

Distilled from a WhatsApp group of ~70 obsessed Indian home baristas. Somewhere around
message #7000 someone said *"someone should just build a site for this."* So here it is. 🫡

## Tech

Pure HTML + CSS + vanilla JS. No build step, no framework, no tracking, no newsletter.
All content is data-driven from `js/main.js`, so it's easy to extend.

```
index.html        # markup + section shells
css/style.css     # all styles (warm coffee theme, responsive, reduced-motion aware)
js/main.js        # data + rendering + interactions
assets/img/*.jpg  # optimized community photos (coffee/gear only — no people, no PII)
```

## Run locally

It's static — just open `index.html`, or:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploy

Hosted on **Vercel** as a static site (no framework). The included `vercel.json` sets
sensible caching headers. To deploy your own copy:

```bash
vercel
```

## Disclaimer

Not affiliated with DeLonghi, any roaster, retailer, or your bank. No affiliate links.
Prices, stock and coupon codes change constantly — **verify before you buy**.
Made with caffeine and questionable financial decisions.
