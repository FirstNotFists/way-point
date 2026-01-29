**Status**: Pending
**Task ID**: TASK_001_CreateComponents
**Target Role**: Developer

## Context
The user is building UI components for the `way-point` React Native (Granite) project.
**Current Progress**: 
- `CommonInput.tsx` has been created but needs verification.
- `CommonModal.tsx` has been created but needs verification.
- Directory structures `way-point/src/components` and `way-point/src/pages/demo` have been initialized.

## Instructions
1.  **Code Verification & Lint Fix**:
    - Review `way-point/src/components/CommonInput.tsx` and `CommonModal.tsx`.
    - Fix any Lint errors (especially missing type definitions for `react` and `react-native`). You may need to check the `tsconfig.json` or ensure dependencies are recognized.
2.  **Ensure Reusability**:
    - Make sure these components are generic enough for the requirements in `requirement.md`.
3.  **Prepare for Next Tasks**:
    - Ensure the exports are correct so they can be easily imported in future Demo pages.

## Constraints
- Use Functional Components with TypeScript.
- Use `StyleSheet` for styling.
- **Goal**: Perfect the foundation before moving to Carousels and Grids.

## Output
- Verified/Fixed `CommonInput.tsx`.
- Verified/Fixed `CommonModal.tsx`.
