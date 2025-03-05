# Time Tracking Application (WIP)

![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)

A modern React web application for tracking and managing work hours with intuitive weekly calendar views.

## ✨ Features

- **Weekly Overview**: Navigate through weeks with an interactive calendar interface
- **Time Entry Management**: Easily add, edit, and delete time entries
- **Responsive Design**: Optimized experience across desktop and mobile devices
- **Detailed Analytics**: Comprehensive summary views of your logged hours
- **Data Persistence**: Secure storage of all your time tracking data

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/CodePawfect/time-tracking-app.git
    cd time-tracking-app
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Launch development server
    ```bash
    npm run dev
    ```

4. Clone and run clock-in-service

5. Open UI in browser
    ```
    http://localhost:5173
    ```

## 📖 Usage

### Main Interface

The application provides an intuitive weekly view where you can:

- **Navigate Between Weeks**: Use arrow buttons to move backward/forward
- **Add New Entries**: Click the "+ Erfassen" button to log new time entries
- **View & Edit Entries**: Review your existing time entries in the table view
- **Quick Navigation**: Jump to today's view with the "Heute" button

### Time Entry Form

When adding or editing an entry:

1. Select the date
2. Enter start and end times
3. Add a description of work completed
4. Save your entry

## 🔌 API Integration

The application integrates with a backend API for data persistence:

- Time entries are fetched based on week number and year
- The API endpoint is configured via the `.env` file
- API responses follow a standardized format for consistency

## Generate API-Types

```bash
  npx openapi-typescript src/api/api-docs.yaml --output src/api/generated/api-types.ts
```

## 🧪 Running Tests

```bash
# Run unit tests
npm run test

# Run with coverage report
npm run test:coverage
```

## License

This project is licensed under the GNU General Public License v3.0 - see the [license.md](license.md) file for details.
