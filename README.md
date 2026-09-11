# Quote Goat 🐐

A Chrome extension that automatically wraps random words in webpage headers with sarcastic scare quotes.

## What it does

Quote Goat scans every webpage you visit and finds all the h1, h2, and h3 headers. For each header, it picks one random word (longer than 1 character) and wraps it in quotes, adding an air of sarcasm, suspicion, or ironic detachment to the page.

For example:
- "Breaking News: Major Update" becomes "Breaking" News: Major Update
- "Welcome to Our Website" becomes Welcome to "Our" Website
- "About the Company" becomes About the "Company"

## Installation

### From Source (Developer Mode)

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the quote-goat folder
5. The extension will now run automatically on all websites

### From Chrome Web Store

*Coming soon - extension will be published to the Chrome Web Store*

## How it works

- **Automatic**: No setup required, works on every webpage
- **Passive**: Runs in the background, no UI or buttons to click
- **Smart**: Only quotes words longer than 1 character
- **Transparent**: Check the browser console to see what words were quoted
- **Safe**: Preserves all original styling and functionality

## Features

- ✅ Processes h1, h2, and h3 headers automatically
- ✅ Random word selection for maximum chaos
- ✅ Console logging for transparency
- ✅ Handles dynamically loaded content
- ✅ Preserves accessibility and semantic meaning
- ✅ Zero performance impact
- ✅ Works on all websites

## Privacy

Quote Goat:
- ❌ Does NOT collect any data
- ❌ Does NOT send information anywhere
- ❌ Does NOT track your browsing
- ❌ Does NOT require accounts or login
- ✅ Runs entirely locally in your browser

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: Runs on all URLs (required to modify webpage content)
- **Languages**: Vanilla JavaScript (no dependencies)
- **Performance**: Minimal impact, processes headers in <50ms typically

## Console Output

Quote Goat logs its activity to the browser console. Open Developer Tools (F12) and check the Console tab to see messages like:

```
[Quote Goat] Quote Goat initialized
[Quote Goat] Quoted "Breaking" in H1: "Breaking" News: Major Update
[Quote Goat] Quoted "Company" in H2: About the "Company"
[Quote Goat] 🐐 Quote Goat has added 3 sarcastic quotes to this page!
```

## Troubleshooting

**Extension not working?**
- Make sure it's enabled in `chrome://extensions/`
- Check that the website has h1, h2, or h3 headers
- Look at the console for Quote Goat messages

**No quotes appearing?**
- Some headers might only have short words (1 character)
- Dynamic content might load after initial processing
- Check console logs to see what Quote Goat is doing

**Performance issues?**
- Quote Goat is designed to be lightweight
- If you notice slowdowns, check console for error messages
- Try disabling and re-enabling the extension

## Development

### File Structure
```
quote-goat/
├── manifest.json           # Extension configuration
├── content-script.js       # Main functionality
├── icons/                  # Extension icons (16px, 48px, 128px)
└── README.md              # This file
```

### Building from Source
1. Clone the repository
2. No build process required - it's vanilla JavaScript
3. Load unpacked in Chrome developer mode

### Contributing
This is a fun hackathon project, but contributions are welcome! Please:
- Test on multiple websites
- Maintain the simple, dependency-free approach
- Add console logging for new features
- Preserve accessibility and performance

## License

MIT License - feel free to fork, modify, and share!

## Credits

Created for a no-code/vibe coding hackathon. Built with love, sarcasm, and an unhealthy obsession with unnecessary quotation marks.

---

*"Enjoy" your newly sarcastic web browsing experience! 🐐*
