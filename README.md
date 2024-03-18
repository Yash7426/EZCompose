# Project Title : [EZCompose](https://ez-compose.vercel.app/)

EZCompose is an innovative web design collaboration platform that empowers users to create stunning websites effortlessly.

## Introduction

EZCompose is a real-time web design collaboration platform that simplifies the process of building responsive websites without code. It addresses the inefficiencies and complexities of traditional web design collaboration by providing an intuitive, no-code editor coupled with robust collaboration features. With EZCompose, individuals and teams can collaborate seamlessly, bringing their website visions to life effortlessly.

## Configuration & Installation

To get started with EZCompose, ensure you have the following dependencies and tools installed:

1. Node.js: Make sure you have Node.js installed on your system. You can download and install it from [here](https://nodejs.org/en/download).
2. Next.js: EZCompose is built using Next.js, a React framework for server-rendered applications . Install it globally using npm :

   ```
   npm install -g next
   ```
3. Convex Backend as a Service (BaaS): EZCompose leverages Convex BaaS for backend services and real-time database functionality. Sign up for a Convex account and obtain your API key.

Once you have installed the necessary dependencies, follow these steps to set up the development environment:

1. Clone the EZCompose repository from GitHub:
   ```
   git clone https://github.com/Yash7426/EZCompose.git
   ```
2. Navigate to the project directory:
   ```
   cd ezcompose
   ```
3. Install project dependencies:
   ```
   npm install
   ```
4. Create a .env file in the root directory and add all environment variables.
   ```
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CONVEX_URL=
    REACT_APP_GOOGLE_API_KEY=
    NEXT_PUBLIC_PEXELS_API_KEY=

    # Deployment used by `npx convex dev`
    CONVEX_DEPLOYMENT=
    NEXT_PUBLIC_CONVEX_URL=
   ```
5. Start the development server:
   ```
   npm run dev
   ```
6. Open your browser and navigate to http://localhost:3000 to access EZCompose.


## Details

EZCompose is a cutting-edge web design collaboration platform that empowers users to create responsive websites collaboratively, without the need for coding expertise. Let's delve into its key features and functionality:

### 1. Real-Time Collaboration:
  - EZCompose enables multiple users to collaborate in real-time on website development projects.
  - Users can see changes made by others instantly, facilitating seamless collaboration and teamwork.

### 2. No-Code Editor:
  - The intuitive no-code editor allows users to design and customize websites visually, using drag-and-drop functionality.
  - Users can add elements such as paragraphs, buttons, images, gradients, navigation menus, and more, without writing any code.

### 3. Scheduled Publishing:
  - Users can schedule the publishing of their websites for a later time, allowing for efficient planning and timing of website launches.
  - Scheduled publishing can be easily set up through the intuitive user interface.

### 4. Integration with Convex BaaS:
  - EZCompose seamlessly integrates with Convex Backend as a Service (BaaS) for backend functionalities and real-time database management.
  - Convex BaaS provides robust backend services, including authentication, data storage, scheduled functions, and real-time updates, enhancing the reliability and performance of EZCompose.

## Contributors
The following individuals have contributed to the EZCompose project:
### 1. [Ankit Yadav](https://github.com/ANKITy102)
 - Role: Frontend Developer
 - Responsibilities: Implementation of frontend components, user interface design, and user experience optimization.
### 2. [Akhilesh Jyotishi](https://github.com/AkhileshJyotishi)
 - Role: Frontend Developer
 - Responsibilities: Refining frontend components, optimizing performance, ensuring responsive design, maintaining code consistency across the application, and ensuring smooth integration with the backend.
### 3. [Yash Agarwal](https://github.com/Yash7426)
 - Role: Backend Developer
 - Responsibilities: Development of backend functionalities, integration with Convex BaaS, and implementation of real-time collaboration features.

