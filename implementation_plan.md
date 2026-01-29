# Implementation Plan - Way-Point Component Development

This plan outlines the steps to create and verify the UI components requested for the `way-point` React Native project.

## User Requirements
- **Context**: React Native Project (Granite).
- **Goal**: Implement purely UI components matching reference images (`MainScreen.png`, `image.png`, etc.).
- **Scope**: Components only, plus simple demo pages to verify responsiveness and visual fidelity.
- **Components**:
    1. Wide Carousel
    2. Card Carousel
    3. Callout
    4. Content Grid (dynamic/expandable)
    5. Common Input
    6. Common Modal

## Proposed Architecture
- **Directory**: `way-point/src/components`
- **Styling**: `StyleSheet.create` (Standard React Native).

## Tasks

### Phase 1: Setup
- [ ] Create `way-point/src/components` directory.
- [ ] Create `way-point/src/pages/demo` directory for testing.

### Phase 2: Component Implementation
- [ ] **Carousel Components**:
    - Implement `WideCarousel.tsx`: Horizontal scroll, full width.
    - Implement `CardCarousel.tsx`: Horizontal scroll, card styling.
- [ ] **Callout Component**:
    - Implement `Callout.tsx`: Highlighted info box.
- [ ] **Grid Component**:
    - Implement `ContentGrid.tsx`: multi-column layout (likely 3 columns), responsive content adjustment using `FlatList` `numColumns` or `FlexWrap` logic.
- [ ] **Input Component**:
    - Implement `CommonInput.tsx`: Reusable text input with label/icon support matches `inputScreen.png`.
- [ ] **Modal Component**:
    - Implement `CommonModal.tsx`: Reusable popup modal matches `modalScreen.png`.

### Phase 3: Demo & Verification
- [ ] **Main Screen Demo**:
    - Create `src/pages/demo/MainDemo.tsx` assembling Carousels and Callout.
- [ ] **Grid Screen Demo**:
    - Create `src/pages/demo/GridDemo.tsx` showing the grid with multiple items.
- [ ] **Input Screen Demo**:
    - Create `src/pages/demo/InputDemo.tsx` showing input variations.
- [ ] **Modal Screen Demo**:
    - Create `src/pages/demo/ModalDemo.tsx` triggering modals.

## Verification Plan
- **Manual Verification**: Since this is "visual fidelity", the primary verification is running the app and comparing with the provided PNGs. The code structure should be clean and reusable.
