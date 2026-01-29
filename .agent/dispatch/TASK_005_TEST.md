**Status**: Completed
**Task ID**: TASK_005_InputAndModalDemo_TEST
**Target Role**: Tester

## Context
Implemented `InputDemo` and `ModalDemo` pages to verify `CommonInput` and `CommonModal` components.

## Test Points
1.  **Input Demo Page (`/demo/input`):**
    - Verify that all 4 input states are displayed: Default, With Label, Error state, Password type.
    - Verify that the label "Username" is correctly associated with the second input.
    - Verify that the error message "This is an error message" is visible for the third input and it has a red border.
    - Verify that the password input masks characters (secureTextEntry).
    - Verify that the "Back" button works and takes you back to the home page.
2.  **Modal Demo Page (`/demo/modal`):**
    - Verify that three buttons are present: "Show Standard Modal", "Show Alert Modal", "Show Flexible Modal".
    - **Standard Modal:**
        - Click the button, verify the title "Standard Modal Title" and content text are visible.
        - Click "Close" or the overlay to close the modal.
    - **Alert Modal:**
        - Click the button, verify the alert icon (⚠️), title "Important Notification", and message are visible.
        - Click "Close" to close.
    - **Flexible Modal:**
        - Click the button, verify it contains a label "Your Feedback" and a multiline input.
        - Type something in the input and click "Submit". The modal should close.
    - Verify that the "Back" button works.
3.  **Navigation:**
    - From the main screen (`/`), verify there are "Input Demo" and "Modal Demo" buttons that navigate correctly.

## Related Files
- `way-point/src/pages/demo/InputDemo.tsx`
- `way-point/src/pages/demo/ModalDemo.tsx`
- `way-point/pages/demo/input.tsx`
- `way-point/pages/demo/modal.tsx`
- `way-point/src/pages/index.tsx` (updated with links)
- `way-point/src/pages/demo/__tests__/InputDemo.test.tsx`
- `way-point/src/pages/demo/__tests__/ModalDemo.test.tsx`
