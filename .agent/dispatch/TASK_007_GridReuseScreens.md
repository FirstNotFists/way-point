**Status**: Pending
**Task ID**: TASK_007_GridReuseScreens
**Target Role**: Developer

## Context
The user requested grid reconstruction for multiple screens (image.png, image copy 1~6). 
We need to demonstrate that `ContentGrid` is perfectly reusable for these screens.

## Instructions
1. Create dummy data sets for at least 3 different grid scenarios:
    - Scenario A: Standard 3-column photo grid.
    - Scenario B: Grid with text labels under items.
    - Scenario C: Dense grid for choosing categories.
2. Create `way-point/src/pages/demo/GridGalleryDemo.tsx` that renders these scenarios.
3. Ensure the dynamic expansion (3x width) logic works as the data array grows.

## Constraints
- Use `ContentGrid` component only.
- Match the visual spacing of the "image copy.png" series.
