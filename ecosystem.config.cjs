module.exports = {
  apps: [
    {
      name: "react-vite-app",   // Name for your app
      script: "serve",          // Command to run serve
      args: "dist",          // Arguments for serve to specify the dist folder
      env: {
        NODE_ENV: "production", // Set the environment to production
      },
    },
  ],
};

