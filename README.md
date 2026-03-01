# Battery Dashboard – Real-Time IoT Monitoring

**Technologies Used:** React, Node.js, Express, MongoDB, Socket.io, Tailwind CSS

---

## Project Overview

This project is a **real-time IoT battery monitoring dashboard**. It tracks multiple batteries and displays live telemetry data such as:

- State of Charge (SOC)  
- State of Health (SOH)  
- Voltage  
- Current  
- Temperature  
- Charge Cycles  

The dashboard updates automatically via **WebSockets** using **Socket.io**, providing live insights without page refresh.

---

## Features

- Real-time live data streaming from Node.js server to React frontend  
- Interactive battery selection (Battery A / Battery B)  
- Warnings for low SOC, out-of-range voltage, and high temperature  
- Graphical visualization of battery metrics using charts  
- Responsive UI with Tailwind CSS for cards, grids, and layouts  
- Insights panel with computed summaries of battery data  

---

## Screenshots



---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AkashPenliwar/Battery-dashboard.git
cd Battery-dashboard
2. Install Dependencies

Frontend:

npm install

Backend:

cd server
npm install
3. Start MongoDB

Make sure MongoDB is running locally:

mongod
4. Start Backend Server
node server.js

The server will run on http://localhost:5000 and start emitting live battery telemetry.

5. Start Frontend
cd ..
npm run dev

Open the provided local URL (usually http://localhost:5173) to view the dashboard.

Project Structure
Battery-dashboard/
├─ server/              # Backend server with MongoDB & Socket.io
│  ├─ models/Telemetry.js
│  ├─ server.js
│  └─ package.json
├─ src/                 # React frontend
│  ├─ components/       # Dashboard UI components
│  ├─ data/             # Sample or seed data
│  ├─ utils/            # Helper functions
│  ├─ App.jsx
│  └─ main.jsx
├─ package.json
└─ README.md
Notes

The dashboard uses fake telemetry data generated every 5 seconds for demonstration.

To connect with real IoT devices, replace the data generator in server/server.js with actual device API calls.

Tailwind CSS is used for fast responsive design and clean layout.

Author: Akash Penliwar
GitHub: https://github.com/AkashPenliwar/Battery-dashboard
Installation Notes / Prerequisites
You can add the Node.js and MongoDB version you used:

## Prerequisites
- Node.js >= 18
- npm >= 9
- MongoDB >= 6

How to Contribute / Test (Optional for assessment)
Just a small note like:

## Contributing
This project is for assessment purposes. Contributions are welcome for improvements or bug fixes.

Additional Notes / Known Issues
For example:

## Notes
- Live telemetry is simulated for demo purposes.
- Ensure MongoDB is running locally before starting the server.

Badges (Optional)
Nice-to-have if you want the README to pop:

Build status, license, or npm version badges.
For assessment, this is optional, but it does make it look professional.

Screenshots / GIFs
Visuals of the dashboard showing the charts, warning banners, etc., make your README much more impressive.




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
