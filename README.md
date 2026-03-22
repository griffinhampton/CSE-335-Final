# JSONify

## Tech Stack

- **Next.js**: React framework for server-side rendering, static site generation, and API routes
- **React**: UI library for building interactive user interfaces

---

## Project Links

- **Vercel Project:** [CSE-335-Final on Vercel](https://vercel.com/cse-335/cse-335-final)
- **GitHub Repo:** [github.com/griffinhampton/CSE-335-Final](https://github.com/griffinhampton/CSE-335-Final)

---

## Getting Started

Follow these steps to clone the repository, install dependencies, and run the project locally.

### Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js & npm](https://nodejs.org/) (npm comes with Node.js)

### Installation & Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/griffinhampton/CSE-335-Final.git
   cd CSE-335-Final
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the local development server**
   ```bash
   npm run dev
   ```
   This will start Next.js and open the app at [http://localhost:3000](http://localhost:3000) (or another port if 3000 is in use).

4. **Build for production**
   ```bash
   npm run build
   ```
   The output will be in the `.next/` folder.

5. **Start the production build locally**
   ```bash
   npm start
   ```

## Deployment

### Vercel (CSE-335 Team)

This project is deployed via [Vercel](https://vercel.com/) and is connected to the CSE-335 team and GitHub repository. All pushes to the `main` branch are automatically deployed.

#### How Vercel Works

- Vercel builds and deploys your app on every push to the main branch.
- Preview URLs are generated for each pull request.
- The project is managed by the CSE-335 team on Vercel, and is linked to the GitHub repo.
- You can view deployments and logs in the [Vercel dashboard](https://vercel.com/cse-335/cse-335-final/HaD3HaiFQ7MBAiZo3iHZvKNNc7mo).
- Custom domains can be added in the Vercel dashboard if needed.

## Making Changes

1. **Stage your changes**
   ```bash
   git add .
   ```
2. **Commit your changes**
   ```bash
   git commit -m "Your descriptive commit message here"
   ```
3. **Push to GitHub**
   ```bash
   git push origin main
   ```

## Tips

- Always pull the latest changes before starting work: `git pull origin main`
- Write clear, descriptive commit messages
- Test your changes locally before committing
- For environment variables, create a `.env.local` file (not committed to git)
- If you add static assets, place them in `public/` or `src/assets/`

## Important Notes

- Do **not** commit large files or sensitive data. The `.gitignore` is set up to exclude unnecessary files.
- If you need to add custom assets, follow the team’s guidelines for asset management.

---

