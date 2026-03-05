# RePlay LA

**RePlay LA** is a web app that connects **post–LA28 Olympics surplus** (furniture, equipment, temporary structures, broadcast gear, etc.) to **Los Angeles community organizations** — at no cost. After the 2028 Games, thousands of tonnes of materials from 40+ venues need a new home; RePlay LA helps schools, youth sports leagues, community centers, and nonprofits find and claim what they need.

## What the site does

- **Browse listings** — Explore surplus items by category (Furniture, Electronics, Structures, Equipment), with details like quantity, venue, and condition.
- **Map view** — See where items are located across LA28 venues on an interactive map and filter by category.
- **AI Match** — Describe your organization (type, size, programs). The app uses AI to recommend the best-fit items from current inventory, with short explanations and fit scores, so you can claim and coordinate pickup directly with the venue.

The site is built for **public schools**, **youth sports leagues**, **community centers**, and **nonprofits** across the LA metro area, so surplus goes where it’s needed most instead of being discarded.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment (Vercel)

1. **安装 Vercel CLI（可选，用于本地同时跑前端 + API）**
   ```bash
   npm i -g vercel
   vercel dev
   ```
   本地会同时提供 React 应用和 `/api/match`，无需在浏览器暴露 Claude API key。

2. **部署到 Vercel**
   - 将仓库连接 [Vercel](https://vercel.com)，用默认的 Create React App 设置即可。
   - 在项目 **Settings → Environment Variables** 中配置：
     - `REACT_APP_GOOGLE_MAPS_API_KEY`：Google 地图（前端使用；请在 [Google Cloud Console](https://console.cloud.google.com/apis/credentials) 中为该 key 设置 HTTP 引荐来源限制，只允许你的域名）。
     - `ANTHROPIC_API_KEY`：Claude API（仅服务端 `/api/match` 使用，不要加 `REACT_APP_` 前缀）。
   - 重新部署后生效。

3. **环境变量说明**
   - 参考 `.env.example`；本地开发时复制为 `.env` 可只配 `REACT_APP_GOOGLE_MAPS_API_KEY`，匹配功能需在部署后或 `vercel dev` 下使用。

### Deployment (CRA docs)

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
