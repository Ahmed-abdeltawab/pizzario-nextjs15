---
applyTo: '**'
---

## Coding Guidelines

- The **root container (page wrapper)** must define the base `font-size` using `rem`.
- All **nested elements** (text, padding, margin, border-radius, etc.) must use `em` units, so that changes in the root `font-size` automatically scale all child elements.
- For widths and heights, always use **percentage (%)** values whenever possible.
- **Never use `px` units**, except in the following cases:
  - 1px borders (hairline borders)
  - Box-shadow properties
  - Media query breakpoints
- For images and media, always use `max-width: 100%` and responsive sizing with percentages.
