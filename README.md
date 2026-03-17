# Execom XXVI Showcase

A dynamic, digital contact display system for the Executive Committee of Execom XXVI (FOSS Club). This project serves as a modern, interactive directory providing personalized web profiles for each committee member. It is designed to work seamlessly with scannable barcodes on physical ID cards, directing users strictly to these profiles.

## 🚀 Features

- **Dynamic Member Profiles**: Generates ID-card styled web profiles displaying member details, roles, departments, and social links (GitHub, LinkedIn, Instagram, Email).
- **Centralized Data Management**: Committee data is organized and fetched dynamically from a single JSON file (`data/teamInfo.json`), making updates effortless without requiring HTML changes.
- **Smart Routing & Error Handling**: URL parameter-based routing (`profile.html?id=...`). Includes fallback UI for unrecognized profiles or loading errors.
- **Responsive & Modern UI**: Built with a sleek, glassmorphic aesthetic alongside smooth CSS animations and interactive hover effects.
- **Chamber Lead Recognition**: Special badge highlights for chamber leads.
- **Auto-Avatar Fallback**: Integration with DiceBear API to generate placeholder avatars if a custom member photo isn't provided.

## 🛠️ Technology Stack

- **HTML5 & Vanilla CSS**: For structure, styling, and animations.
- **Vanilla JavaScript (ES6)**: To manage state, fetch data, and manipulate the DOM dynamically.
- **FontAwesome**: For scalable vector icons.
- **Google Fonts**: Inter, Outfit, and Space Mono for modern typography.
- **DiceBear API**: For fallback avatars.

## 📁 Project Structure

```text
execomshowcase/
├── index.html          # Landing page displaying the catalogue of all members
├── profile.html        # Dynamic ID-card profile template
├── README.md           # Project documentation
├── css/
│   └── style.css       # Core styling and animations
├── js/
│   └── app.js          # Core application logic, routing, and data fetching
├── data/
│   └── teamInfo.json   # Member data including names, roles, and socials
└── assets/
    └── images/         # Static assets (logos, member photos)
```

## 💻 Setup & Usage

Since this is a static website that fetches data via JavaScript (`fetch` API), it must be served over `http://` or `https://` instead of the local `file://` protocol to avoid CORS issues.

1. **Clone the repository** (or download the source code).
2. **Serve the project locally** using any local web server. 
   - Using Python: `python -m http.server 8000`
   - Using Node.js (http-server): `npx http-server`
   - Using VS Code: Install the *Live Server* extension and click "Go Live".
3. **Open the application** in your web browser (e.g., `http://localhost:8000`).

## ⚙️ Updating Member Data

To add, remove, or modify members, simply edit the `data/teamInfo.json` file. The application will automatically reflect the changes. Make sure to place new member photos inside the `assets/images/members/` directory and map them correctly in the `app.js` `memberImages` object if necessary.

---
*May the FOSS be with you.*