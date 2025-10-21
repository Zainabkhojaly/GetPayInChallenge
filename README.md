# GetPayIn - React Native Coding Challenge

This is a 3-page store application built with React Native and TypeScript as part of a coding challenge.

## Features Implemented

*   **Authentication**: Login via DummyJSON API, with session restoration.
*   **Biometric Unlock**: The app prompts for biometric authentication if a valid session token exists on launch.
*   **Auto-Lock**: The app automatically locks after 10 seconds of inactivity or when it goes into the background.
*   **Product & Category Lists**: Displays all products and allows filtering by a specific category.
*   **Superadmin Role**: A designated user can see "Delete" buttons for products.
*   **Offline Caching**: Uses React Query and MMKV to persist API requests, making content available offline and on relaunch.
*   **Offline Indicator**: A simple banner shows when the device is offline.

## Setup and How to Run

1.  **Prerequisites**: Ensure you have a React Native development environment set up. Follow the [official guide](https://reactnative.dev/docs/environment-setup) for the "React Native CLI Quickstart".

2.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd <your-repo-name>
    ```

3.  **Install dependencies**:
    ```bash
    npm install
    ```

4.  **Install iOS Pods**:
    ```bash
    cd ios && pod install && cd ..
    ```

5.  **Run the application**:
    *   For Android: `npm run android`
    *   For iOS: `npm run ios`

## Technical Choices & Information

*   **Chosen Category for Specific Screen**: `smartphones`
    *   This category was chosen as it has a good number of products in the DummyJSON API for demonstration.

*   **Superadmin User**: `kminchelle`
    *   You can log in with this username (password: `0lelplR`) to see the "Delete" functionality on the All Products screen.

*   **Trade-offs and "If I had more time..."**:
    *   **UI/Design System**: The UI is minimal and functional. With more time, I would have implemented a more robust design system with a proper theme (including dark mode), consistent spacing, and custom components instead of relying on default React Native ones.
    *   **Error Handling**: Error handling is basic (using `Alert`). A better approach would be to use a centralized error handling service and display user-friendly messages like toasts or snackbars.
    *   **Testing**: The project does not include tests. I would add unit tests for utility functions and Redux slices using Jest, and component/integration tests using React Native Testing Library.
    *   **Password Fallback**: The biometric unlock fallback is simplified. A full implementation would involve a secure modal to re-enter the user's password.
