**Status**: Completed
**Task ID**: TASK_003_ContentGrid
**Target Role**: Developer

## Context
Requirement states: "Content should increase in a 3x(width) grid pattern as content grows."

## Instructions
1. **ContentGrid.tsx**:
    - Use Vertical FlatList with `numColumns={3}`.
    - Ensure items are evenly spaced.
    - Grid should be reusable across different screens (grid items should be passed as data).
    - Responsive handling: Ensure items look good on both narrow and wide screens.

## Constraints
- Use Functional Components + TypeScript.
- Use StyleSheet for styling.
- Place in `way-point/src/components/`.
