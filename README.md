# OneClick Africa: Your Gateway to African News & Stories

## Overview
OneClick Africa is a modern, high-performance web application dedicated to delivering engaging African news, culture, and stories. Built with Nuxt.js 3 and TypeScript, it offers a seamless and intuitive user experience with dynamic content feeds, comprehensive navigation, and powerful features designed to connect the continent with the world.

## Features
- **Dynamic Content Delivery**: Browse a wide array of articles across various topics and subtopics, ensuring a rich and diverse news experience.
- **Interactive Home Page**: Features a responsive hero carousel showcasing trending and featured posts to keep users informed with the latest headlines.
- **Comprehensive Search**: Easily find articles and topics of interest through a robust search functionality.
- **Newsletter Subscription**: Stay updated with daily news delivered directly to your inbox through seamless Mailchimp integration.
- **Responsive & Accessible UI**: Crafted with Tailwind CSS and Shadcn-Vue components, ensuring a visually appealing and accessible experience across all devices.
- **Theme Switching**: Personalize your browsing experience with easy toggle between light and dark modes.
- **Social Sharing**: Share captivating articles effortlessly across popular social media platforms.
- **Advertising Placement**: Strategically integrated ad components to support the platform while maintaining a clean user interface.
- **Infinite Scroll Feed**: Enjoy a continuous browsing experience with an auto-loading feed of posts.
- **Author & Source Information**: Detailed display of article authors and original external sources for transparency and credibility.

## Getting Started

### Installation
To get OneClick Africa up and running on your local machine, follow these steps:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/OneClick-Africa/website.git
    cd website/frontend
    ```

2.  **Install Dependencies**:
    Using npm:
    ```bash
    npm install
    ```
    Or using pnpm:
    ```bash
    pnpm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

3.  **Prepare Nuxt Modules**:
    ```bash
    npm run postinstall
    ```

### Environment Variables
Before running the application, you'll need to set up several environment variables. Create a `.env` file in the `frontend` directory based on the `.env.example` (if present, otherwise create it manually) and populate it with the following:

```env
# Public API base URL for fetching data
NUXT_PUBLIC_API_BASE="http://localhost:3000/api"

# Public URL of the application for generating shareable links
NUXT_PUBLIC_APP_URL="https://oneclickafrica.com"

# Mailchimp API Key for newsletter subscription
MAILCHIMP_API_KEY="YOUR_MAILCHIMP_API_KEY"

# Mailchimp Server Prefix (e.g., us1, eu2)
MAILCHIMP_SERVER_PREFIX="YOUR_MAILCHIMP_SERVER_PREFIX"

# Mailchimp Audience/List ID
MAILCHIMP_LIST_ID="YOUR_MAILCHIMP_LIST_ID"
```

## Usage
Once the installation and environment variables are set up, you can start the development server:

```bash
npm run dev
```

The application will typically be available at `http://localhost:3000`.

-   **Navigate**: Use the main navigation menu and category links to explore different sections of the news platform.
-   **Search**: Utilize the search bar in the header to find articles by keywords.
-   **Subscribe**: Enter your email in the newsletter widget (found on the homepage sidebar or footer) to receive updates.
-   **Read Articles**: Click on any post card to view the full article content, including author details, source information, and social sharing options.
-   **Change Theme**: Use the sun/moon icon in the header to switch between light and dark modes.

## Technologies Used
| Technology                  | Description                                            |
| :-------------------------- | :----------------------------------------------------- |
| ![Nuxt.js](https://img.shields.io/badge/Nuxt.js-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white) | Intuitive Vue framework for web development            |
| ![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white) | Progressive JavaScript framework for building UIs      |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) | JavaScript with syntax for types                       |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) | Utility-first CSS framework                            |
| ![Shadcn-Vue](https://img.shields.io/badge/Shadcn--Vue-000000?style=for-the-badge&logo=vuedotjs&logoColor=white) | Reusable UI components for Vue                         |
| ![VeeValidate](https://img.shields.io/badge/VeeValidate-42B883?style=for-the-badge&logo=vue.js&logoColor=white) | Form validation library for Vue.js                     |
| ![Zod](https://img.shields.io/badge/Zod-3672B1?style=for-the-badge&logo=zod&logoColor=white) | TypeScript-first schema declaration and validation     |
| ![Embla Carousel](https://img.shields.io/badge/Embla%20Carousel-000000?style=for-the-badge&logo=npm&logoColor=white) | Lightweight, dependency-free carousel library          |
| ![Lucide Icons](https://img.shields.io/badge/Lucide%20Icons-14B8A6?style=for-the-badge&logo=lucide&logoColor=white) | Beautiful and consistent open-source icons             |
| ![Vue Sonner](https://img.shields.io/badge/Vue%20Sonner-000000?style=for-the-badge&logo=vuedotjs&logoColor=white) | Toast notifications for Vue                            |
| ![Mailchimp](https://img.shields.io/badge/Mailchimp-ffe01b?style=for-the-badge&logo=mailchimp&logoColor=black) | Email marketing and automation platform                |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | Next generation frontend tooling                       |

## License
This project is currently unlicensed. Please refer to the repository for more details or consider adding a license.

## Author Info
Developed by a passionate team dedicated to delivering quality content.

-   **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourusername)
-   **X (formerly Twitter)**: [@YourTwitterHandle](https://x.com/YourTwitterHandle)

---
[![Nuxt.js](https://img.shields.io/badge/Framework-Nuxt.js-00DC82?style=for-the-badge&logo=nuxt.js)](https://nuxt.com/)
[![Vue.js](https://img.shields.io/badge/Powered%20By-Vue.js-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Build%20Tool-Vite-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)