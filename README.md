# LokSync: Intel 3D 🏙️

### Advanced AI-Powered Smart City Operating System — Delhi NCT

Delhi-Intel 3D is a next-generation "News-Room" style dashboard designed for urban monitoring and real-time intelligence. It features a runtime-rendered 3D city model of Central Delhi integrated with thematic data streams for Education, Healthcare, Infrastructure, and Security.

![Dashboard Preview](https://github.com/Namangoel1904/LokSync_BeingNotified/blob/main/Screenshot%202026-03-12%20231931.png)

---

## 🚀 Core Features

### 1. Dynamic 3D City Engine
*   **Runtime Rendering**: 3D city model generated live from OpenFreeMap vector tiles.
*   **Volumetric Buildings**: Real-time extrusion of OSM building footprints based on height data.
*   **"News-Room" Aesthetic**: A premium light-themed monitoring interface with glassmorphism and subtle micro-animations.

### 2. Advanced Thematic Overlays
The system uses a sophisticated geographic boundary architecture to visualize sector-specific health:
*   **Area Aggregation**: District-level polygons (CP, Daryaganj, etc.) that extrude and change color based on thematic scores (e.g., School Density, Hospital Capacity).
*   **Facility Clustering**: Real-time clustering of points of interest (Schools, Clinics) that expand into individual markers upon zooming.
*   **Scene Muting**: Automatic background desaturation—city buildings "fade" when a thematic layer is active to prioritize data visualization.

### 3. Smart Camera Synchronization
*   **Fly-to Transitions**: Activating a category (e.g., Water Supply) triggers a smooth camera transition to a refined city overview.
*   **Pitch Optimization**: Pitch automatically adjusts to ~45° when analysis layers are active for better area-based comparison.

### 4. Intelligence Feed & Alerts
*   **AI Intelligence**: Real-time feed of predictive analytics and policy updates.
*   **Incident Monitoring**: High-severity alert system for water pressure drops, traffic incidents, and tender collisions.

---

## 🛠️ Technology Stack

*   **Frontend Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Map Engine**: [MapLibre GL JS](https://maplibre.org/) integrated via `react-map-gl`
*   **Base Map**: [OpenFreeMap](https://openfreemap.org/) (Liberty Style)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
*   **Styling**: Vanilla CSS with Tailwind CSS v4 patterns
*   **Icons**: [Lucide React](https://lucide.dev/)

---

## 📊 Thematic Views

````carousel
![Education Theme](file:///C:/Users/naman/.gemini/antigravity/brain/73b7de59-23d0-4fa4-a3e5-2e50fd86114e/education_layer_active_1773337119325.png)
<!-- slide -->
![Healthcare Theme](file:///C:/Users/naman/.gemini/antigravity/brain/73b7de59-23d0-4fa4-a3e5-2e50fd86114e/healthcare_layer_active_1773337155587.png)
````

---

## 🏗️ Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📐 Project Architecture

*   **`MapboxContainer.jsx`**: The core map engine handling 3D extrusions, GeoJSON sources, and camera transitions.
*   **`MockData.js`**: Centralized thematic dataset including area boundaries and facility points.
*   **`store.js`**: Lightweight global state for active layers and interactive modals.
*   **`DashboardLayout.jsx`**: Master layout coordinating the sidebars and the map canvas.

---

*It's currently just a Prototype, Built by Team Being Notified*
