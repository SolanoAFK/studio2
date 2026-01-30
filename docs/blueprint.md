# **App Name**: AuthFlow

## Core Features:

- Login Page: User login with username/password fields, POST request to https://api.solanoafk.com/api/auth/login, redirection to /dashboard on success, and token storage in localStorage.
- Signup Page: User registration form with name, username, email, password, and confirm password fields, POST request to the API, and redirection to /login on success.
- Reset Password Page: Password reset request form with email field, POST request to the API to initiate password recovery.
- Dashboard Page: Protected route displaying a personalized welcome message with the user's name. Requires authentication to access. Includes a 'Logout' button.
- Logout Functionality: Clears user data from localStorage and redirects the user to the /login page.
- Authentication Middleware: Verifies user authentication status and redirects unauthenticated users to the /login page, ensuring protected routes are only accessible to logged-in users.
- Docker Deployment: Dockerize the Next.js application for deployment using an optimized Dockerfile for production. Expose port 3002.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) for a professional and trustworthy feel.
- Background color: Light gray (#F0F2F5) for a clean and modern aesthetic.
- Accent color: Soft violet (#7E57C2) to add sophistication and highlight key interactive elements.
- Body and headline font: 'Inter' sans-serif font to provide a modern and neutral look, well-suited to a clean dashboard and forms.
- Use simple, line-based icons from a library like 'Lucide React' to maintain a clean and consistent look.
- Employ a responsive layout that adapts to different screen sizes, ensuring a consistent experience across devices.
- Implement subtle transition effects on form elements to improve user experience.