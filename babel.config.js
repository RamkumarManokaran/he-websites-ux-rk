module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
    [
      "next/babel",
      {
        modules: false,
      },
    ], // If using TypeScript
  ],
};
