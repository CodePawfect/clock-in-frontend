# User interface for Clock:In

**Clock:In** is a work time management application for employees and employers.

## ✨ Features

- User Authentication
- Work Time Management

## 💻 Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript
- **Data Fetching/State Management:** React Query (`@tanstack/react-query`)
- **Styling:** CSS

## ⚙️ Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/CodePawfect/clock-in-frontend.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Set up environment variables:**
    - Update the necessary environment variables in `.env.dev` if needed.

## 🚀 Available Scripts

In the project directory, you can run:

- **`npm run dev`** or **`yarn dev`**: Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) (or the port specified by Vite) to view it in the browser. The page will reload if you make edits.

## 🌐 API Interaction

The frontend interacts with a backend API for various operations:

- **Authentication:**
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/auth/me`

---

## License

This project is licensed under the GNU General Public License v3.0 - see the [license.md](license.md) file for details.
