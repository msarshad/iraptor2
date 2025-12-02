<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1MkzZByC03SAyDgAjVijbsBYHidyun6mX

## Deploy to GitHub Pages (no local git needed)
1. Create a new GitHub repository (public is easiest for Pages).
2. In that repo, choose **Add file → Upload files**, and upload everything in this folder (including `.github/workflows/deploy.yml`). Commit to the `main` branch.
3. Open the **Actions** tab and enable workflows if GitHub prompts. The “Deploy to GitHub Pages” workflow will build and publish automatically.
4. After the workflow turns green, visit **Settings → Pages** to grab your live URL.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. (Optional) Set the `GEMINI_API_KEY` in [.env.local](.env.local) if you add Gemini API calls
3. Run the app:
   `npm run dev`
