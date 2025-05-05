# Doctor Appointment Admin Web App

This is the administrative web application for the Doctor Appointment mobile app. Built with Vite, React, and TypeScript, it provides administrators with the ability to manage doctors within the system.

## Features

-   **Doctor Management:**
    -   **Create Doctor:** Add new doctor profiles to the system.
    -   **Edit Doctor:** Modify existing doctor information.
    -   **Delete Doctor:** Remove doctor profiles from the system.
-   **Data Storage:** Utilizes Firebase Firestore to store and manage doctor data.

## Technologies Used

-   Vite
-   React
-   TypeScript
-   Firebase (Firestore)

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/WyvernPirate/med-dash-admin/
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd med-dash-admin
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

4.  **Set up Firebase:**
    -   Go to your Firebase project console.
    -   Create a new web app or select your existing one.
    -   Obtain your Firebase configuration object.
    -   Create a `.env` file in the root of your project and add your Firebase configuration as environment variables
    -   Ensure you have the Firebase Firestore database set up in your Firebase project.

5.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
6.  **Hosting:**

      This will start the web application on firebase hosting platform (`https://doctorappointmentapp-9f11a.web.app/`)


## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs or feature requests.
