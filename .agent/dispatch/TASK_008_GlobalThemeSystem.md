**Status**: Pending
**Task ID**: TASK_008_GlobalThemeSystem
**Target Role**: Developer

## Context
To achieve "Premium Design" and consistency, we need to stop hardcoding colors like '#333' or '#BDBDBD' in every component.

## Instructions
1. Create `way-point/src/constants/Theme.ts`.
2. Define:
    - **Colors**: Primary, Secondary, Background, Surface, Error, TextPrimary, TextSecondary.
    - **Spacing**: XS, S, M, L, XL units.
    - **Typography**: Sizes and weights for Title, Body, Caption.
3. Refactor:
    - Update `CommonInput`, `CommonModal`, `Callout`, and `ContentGrid` to use these theme constants.

## Constraints
- Do not change the visual result, only the internal structure (Refactoring).
- Ensure the colors match the premium aesthetic identified in previous visual polishing.
