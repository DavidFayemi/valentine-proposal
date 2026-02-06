# 🍂 Autumn Proposal Design

A second, completely different design for the Valentine proposal app with autumn/fall theme colors and creative animations!

## Design Features

### Creative Elements

**No Button Behavior:**

- Instead of shrinking, the "Nope" button **spins away (720°) and fades out**
- Much more dynamic and playful
- Only works once, then it's gone forever

**Celebration Effects:**

- ✨ **Fireworks** instead of confetti (more explosive celebration!)
- 🎉 **Celebration GIF** in the modal (dancing celebration animation)
- 🍂 Falling leaf emojis throughout the modal

**Visual Design:**

- 🎨 **Autumn gradient** background (amber → orange → red)
- 🍂 Animated falling leaves in the background (continuous loop)
- 📦 Gift icon instead of heart (more playful/modern vibe)
- ✨ Glassmorphic gradient text effects
- 🌟 Hover glow effects on buttons
- 🎯 Completely different layout from the Valentine version

### Colors (Autumn Theme)

- Primary: Orange (`#f97316`) with gradient
- Accents: Red, Yellow, Amber
- Background: Soft gradient from amber to orange to red
- Text: Orange/brown tones

## How to Switch Between Designs

Edit `src/main.tsx`:

```tsx
// Current (Valentine theme):
import App from "./App.tsx";

// OR for Autumn theme:
import App from "./AutumnProposal.tsx";
```

Just swap which file you import!

## Features Maintained

✅ EmailJS email functionality (same as Valentine version)
✅ Attribution (hover over bottom-left to see credits)
✅ Disappearing No button (but with creative spin-away effect)
✅ Responsive design (mobile/tablet/desktop)
✅ Smooth animations with Framer Motion
✅ DaisyUI styling with autumn theme

## New Features

✨ Fireworks celebration effect
🎉 Celebration GIF in modal
🍂 Animated falling leaves
📦 Gift icon animation
🌟 Gradient text effects
✨ Hover glow effects

## Customization

### Change the Celebration GIF

Edit `src/AutumnProposal.tsx` line 161:

```tsx
<img
  src="https://media.giphy.com/media/g9GnnuU7UF4uU/giphy.gif"
  alt="Celebration"
  // ↑ Change this URL to any GIF from giphy.com or tenor.com
/>
```

### Change Button Text

Edit `src/AutumnProposal.tsx`:

- Line 125: Change "My Person?" to your question
- Line 128: Change "Let's make this season unforgettable ✨"
- Line 141: Change "Yes, Absolutely!"
- Line 158: Change "Nope" to your answer

### Change Colors

All colors are based on the `autumn` DaisyUI theme. Colors are defined in the inline `style` properties and tailwind classes:

- `bg-gradient-to-br from-orange-300` - Change these Tailwind color classes
- `text-orange-600` - Change text colors
- `border-orange-400` - Change border colors

### Change Animations

- **No button spin:** Line 114 `rotate: 1080` → change to 360 (less spin) or 1440 (more spin)
- **Falling leaves speed:** Line 54 `duration: 8 + Math.random() * 4` → adjust the numbers
- **Leaf count:** Line 51 `[...Array(8)]` → change 8 to 12 for more leaves
- **Celebration emojis speed:** Line 184 `duration: 2` → adjust for faster/slower fall

## Mobile Responsiveness

- Buttons stack vertically on mobile/tablet (`flex-col sm:flex-row`)
- Text scales responsively (5xl on mobile → 7xl on desktop)
- Modal adapts to screen size (`modal-bottom sm:modal-middle`)
- Touch-optimized button sizes (`btn-lg`)

## Browser Compatibility

Works on all modern browsers:

- Chrome/Edge (recommended for fireworks)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

**Fireworks not showing?**

- Check browser console (F12) for errors
- Make sure react-fireworks is installed: `npm list react-fireworks`

**GIF not loading?**

- Check internet connection
- Try a different GIF URL from giphy.com
- Make sure the URL is accessible (not blocked)

**Leaves not falling?**

- Check animations are enabled in browser
- Try refreshing the page

**No button not spinning?**

- Make sure you're clicking exactly once
- Check browser developer tools for errors
