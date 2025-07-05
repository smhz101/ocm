# Off-Canvas Multi-Level Menu (OCM)

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Options & Configuration](#options--configuration)
6. [API / Methods](#api--methods)
7. [Events / Callbacks](#events--callbacks)
8. [Styling & Theming](#styling--theming)
9. [Accessibility](#accessibility)
10. [Changelog](#changelog)
11. [License](#license)
12. [Keywords](#keywords)

## Introduction

OCM is a lightweight, responsive off-canvas menu with support for unlimited submenu levels. It leverages jQuery to parse an existing HTML `<ul>` navigation structure into a sliding panel, complete with back/home controls and configurable styling.

## Features

- **Responsive**: Activates at a configurable breakpoint.
- **Multi-Level**: Unlimited nested submenus with breadcrumb-style navigation.
- **Accessibility**: ARIA roles, focus trapping, ESC-to-close, keyboard support.
- **Customizable**: Width, side, colors, icons, CSS classes, animation settings.
- **Overlay**: Optional page overlay that closes on click.
- **Callbacks**: Hooks for onInit, onOpen, onClose, onNavigate, onLevelChange.

## Installation

1. Clone or download the repository:

```
git clone https://github.com/smhz101/ocm.git
```

2. Include jQuery and OCM scripts/styles in your HTML:

```
<link rel="stylesheet" href="path/to/ocm.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="path/to/ocm.js"></script>
```

## Usage

1. Mark up your menu:

```
<nav class="main-menu">
  <ul>
    <li><a href="/">Home</a></li>
    <li>
      <a href="/products">Products</a>
      <ul>
        <li><a href="/products/1">Product 1</a></li>
        <li><a href="/products/2">Product 2</a></li>
      </ul>
    </li>
    <!-- ... -->
  </ul>
</nav>
```

2. Initialize OCM:

```
$('.main-menu').offCanvasMenu({
  side: 'left',
  width: '75%',
  breakpoint: '992px',
  bgColor: '#333',
  textColor: '#fff'
});
```

## Options & Configuration

```
{
  side: 'right',           // 'left' or 'right'
  width: '80%',            // Panel width (CSS value)
  breakpoint: '768px',     // Screen width to toggle menu
  zIndex: 9999,            // Panel z-index
  bgColor: '#111',         // Background color
  textColor: '#eee',       // Link/text color
  headerBg: '#222',        // Header background
  borderColor: '#333',     // List item borders
  linkHover: 'rgba(255,255,255,0.1)', // Link hover overlay
  transitionDuration: 300, // Animation timing (ms)
  transitionEasing: 'ease',// CSS easing
  overlay: true,           // Show backdrop
  closeOnEsc: true,        // ESC key closes
  closeOnOverlay: true,    // Click backdrop to close
  trapFocus: true,         // Keep focus inside panel
  navSelector: '.main-menu'// Original nav selector
}
```

## API / Methods

All methods are available on the plugin instance stored via `$.data(this, 'offCanvasMenu')`.

| Method           | Signature                     | Description                              |
| ---------------- | ----------------------------- | ---------------------------------------- |
| `.open()`        | `open(): void`                | Opens the menu panel.                    |
| `.close()`       | `close(): void`               | Closes the panel & resets to root level. |
| `.toggle()`      | `toggle(): void`              | Toggles open/close.                      |
| `.back()`        | `back(): void`                | Navigate one level up.                   |
| `.jumpTo(level)` | `jumpTo(level: number): void` | Jump to specified level (0 = root).      |
| `.settings`      | Config object                 | Access current settings.                 |
| `.menuData`      | `Array<Object>`               | Parsed menu tree.                        |

## Events / Callbacks

You can hook into lifecycle events via options:

- `onInit(instance)`: Triggers after initialization.
- `onOpen(instance)`: Triggers after opening.
- `onClose(instance)`: Triggers after closing.
- `onNavigate(level, items)`: Triggers upon entering a submenu.
- `onLevelChange(level)`: Triggers after sliding animation completes.

## Styling & Theming

- All **colors**, **z-index**, **width**, **breakpoint**, **transition** are controlled via CSS variables in `:root` or overridden in JS.
- Override `.ocm-*` classes or supply your own via `settings.containerClass`, `panelClass`, etc.
- SVG icons can be replaced via the `svg` option.

## Accessibility

- `<nav role="navigation">` with `aria-hidden` toggling.
- Focus trapping inside panel; ESC closes.
- ARIA labels on buttons (`Open menu`, `Close menu`, `Back to top level`).

## Changelog

## 1.2.0 – 2025-07-05

### Added

- Jest-based unit tests covering core methods (`open`, `close`, `toggle`, same-page anchor handling).
- Deep-nested navigation tests verifying `_navigate`, `_removeLevel`, `_reset` and `jumpTo` behavior across 5 levels.

### Changed

- Refactored test suites to invoke private navigation methods directly, removing async helpers for synchronous assertions.

### Fixed

- Adjusted test expectations to match actual `stack` and header-update logic.

#### v1.1.0 – 2025-07-05

- UMD wrapper supporting AMD, CommonJS & browser globals
- TypeScript definitions (`.d.ts`)
- JSDoc comments for most public/private methods and settings

#### v1.0.5 – 2025-07-05

- Fixed bug where anchor links to same-page `#hash` targets were not working correctly inside the menu
  - Anchor clicks with `href="#..."` now correctly close the menu and allow smooth scroll behavior
- Added full `README.md` with usage, configuration, methods, events, accessibility, and theming documentation
  - Includes installation instructions, API table, live code examples, and customization options
- Minor code cleanup in `_bindEvents` to improve readability and scope usage

#### v1.0.4 – 2025-07-04

- Initial stable release
- Multi-level submenu support
- Focus trapping and ESC to close
- Overlay and click-to-close
- Callback event support

#### v1.0.3 – 2025-07-04

- Added focus trap for accessibility
- Implemented `onLevelChange` event callback
- Improved keyboard navigation (Tab, Shift+Tab)
- Added support for `aria-hidden` toggling
- Bugfix: overlay not closing on mobile Safari

#### v1.0.2 – 2025-07-04

- Introduced animated sliding transitions
- Added support for custom panel width per breakpoint
- Included optional home button in submenu headers
- Bugfix: broken submenu detection in deeply nested lists

#### v1.0.1 – 2025-07-03

- Basic off-canvas panel structure with jQuery
- Toggle menu via `.open()`, `.close()`, `.toggle()`
- Introduced `side`, `width`, `breakpoint` options
- First working version with basic nested menu support

## License

_MIT License_

## Keywords

`jquery`, `off-canvas`, `menu`, `mobile`, `navigation`, `multi-level`, `responsive`, `a11y`, `accessibility`, `hamburger`, `slide`, `side menu`, `plugin`, `nested`, `drawer`, `touch`
