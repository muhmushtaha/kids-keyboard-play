# Kids Keyboard Play 🎹✨

A fun, interactive keyboard play page designed for toddlers! Press any key to trigger colorful animations, playful shapes, and delightful sounds.

## 🌟 Features

- **Full Keyboard Capture**: Responds to all keyboard keys, including special keys (Ctrl, Alt, Command, etc.)
- **Random Sound Effects**: Web Audio API generates fun, musical sounds on each keypress
- **Colorful Visual Effects**: Random shapes, emojis, and animations appear with each key
- **Toddler-Safe**: Prevents accidental closure via keyboard shortcuts
- **Mouse-Only Exit**: Exit button only responds to mouse clicks for safety
- **No Dependencies**: Pure vanilla HTML, CSS, and JavaScript

## 🎮 Live Demo

**[Try it here!](https://muhmushtaha.github.io/kids-keyboard-play/)**

## 🚀 Usage

### Online
Simply visit the [GitHub Pages link](https://muhmushtaha.github.io/kids-keyboard-play/) and start pressing keys!

### Local
1. Download or clone this repository
2. Open `index.html` in any modern web browser
3. Let your child press keys and enjoy!

## 🎨 What It Does

Every keypress triggers:
- 🎵 A random musical note (synthesized via Web Audio API)
- 🌈 A colorful shape, emoji, or symbol that appears on screen
- ✨ Dynamic animations (bouncing, spinning, pulsing, floating, etc.)
- 🧹 Auto-cleanup after 3 seconds to keep the screen fresh

## 🔒 Safety Features

- All keyboard shortcuts are disabled (Ctrl+W, Ctrl+R, F5, etc.)
- Exit button requires mouse interaction
- Confirmation dialog before closing
- Right-click context menu disabled
- Text selection disabled

## 🛠️ Technical Details

- **Audio**: Web Audio API with oscillators (sine, triangle, square waves)
- **Visuals**: CSS3 animations with automatic DOM cleanup
- **Compatibility**: Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- **Performance**: Optimized with `will-change` properties and efficient event handling

## 📝 License

Feel free to use, modify, and share this project!

## 🤝 Contributing

Ideas and improvements welcome! Feel free to fork and submit pull requests.

---

Made with ❤️ for curious little fingers!