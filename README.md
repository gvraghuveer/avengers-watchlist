# 🛡️ The Avengers Database

A high-fidelity, cinematic archival interface for the Marvel Cinematic Universe. Track your progress across phases, explore the Sacred Timeline, and manage your ultimate MCU watchlist.

![The Avengers Database Banner](/public/logo.svg)

## ✨ Features

-   **🎬 Avengers Archive:** A comprehensive catalog of MCU movies organized by Phase. Includes real-time data fetching for posters and metadata.
-   **⏳ Sacred Timeline:** A horizontal, scroll-responsive cinematic timeline that visualizes the MCU chronology with smooth Framer Motion animations.
-   **🦸 Heroes & Powers:** A dedicated roster of the Avengers with detailed power statistics and high-tech UI cards.
-   **💾 Persistent Watchlist:** Track your viewing status (Watched, To Watch, Unwatched) with offline-first persistence using Browser LocalStorage.
-   **⚡ Performance First:** Built with Next.js 14 and Tailwind CSS for lightning-fast interactions and deep dark-mode aesthetics.

## 🚀 Tech Stack

-   **Framework:** Next.js (App Router)
-   **Animations:** Framer Motion
-   **Styling:** Tailwind CSS
-   **Data Storage:** LocalStorage (Client-side)
-   **Data Provider:** [TMDB API](https://www.themoviedb.org/)

## 🛠️ Local Setup

1.  **Clone the Repository:**
    ```bash
    git clone <your-repo-url>
    cd avengers-app
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env.local` file in the root and add your TMDB API Key:
    ```bash
    NEXT_PUBLIC_TMDB_API_KEY=your_actual_api_key_here
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the portal.

## 🌐 Deployment (Vercel)

This project is optimized for [Vercel](https://vercel.com/). 

1.  Connect your GitHub repository to Vercel.
2.  Set the **Root Directory** to `avengers-app` (if applicable).
3.  Add the `NEXT_PUBLIC_TMDB_API_KEY` Environment Variable.
4.  Deploy!

---

**Excelsior!** 🚀
Created with ❤️ for the Marvel Cinematic Universe.
