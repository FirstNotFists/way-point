**Status**: Pending
**Task ID**: TASK_009_NavigationHub
**Target Role**: Developer

## Context
Management of multiple demo pages is getting complex. We need a central entry point.

## Instructions
1. Update `way-point/src/pages/index.tsx` (or the main entry page).
2. Create a "Component Gallery Hub" UI:
    - List all available demos: Main Display, Input Controls, Modals & Overlays, Dynamic Grids, Carousel Variations.
3. Improve Navigation:
    - Ensure every demo page has a clear "Back to Hub" button.
    - Use the project's standard router (Granite router) for transitions.

## Constraints
- Hub design should be clean and professional.
- Use `ContentGrid` or a simple List for the Hub layout.
