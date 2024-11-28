# Responsive Expandable Card

A React component that displays a card which maintains the browser's aspect ratio and expands smoothly to fullscreen. The card features smooth animations and editable content.

## Features

- Maintains browser window aspect ratio while keeping a fixed height
- Smooth expansion animation to fullscreen
- Editable content in expanded mode
- Responsive design
- Synchronized animations with consistent timing and easing
- ESC key support for closing
- Clean, minimal UI

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/responsive-expandable-card.git
```

2. Install dependencies:
```bash
cd responsive-expandable-card
npm install
```

3. Start the development server:
```bash
npm start
```

## Usage

```jsx
import ExpandableCard from './components/ExpandableCard';

function App() {
  return (
    <ExpandableCard initialText="Click to expand this card. Once expanded, click again to edit the text." />
  );
}
```

## Props

- `initialText` (string): The initial text content of the card. Default: "Click to edit this text..."

## License

MIT
