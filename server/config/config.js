const environment = process.env.NODE_ENV || "development";

if (environment === "development") {
  const config = require("./config.json");
  const environmentConfig = config[environment];

  Object.keys(environmentConfig).forEach(key => {
    process.env[key] = environmentConfig[key];
  });
}
