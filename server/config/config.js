const environment = process.env.NODE_ENV || "development";

if (environment === "development" || environment === "test") {
  const config = require("./config.json");
  const keys = require("./keys.json");
  const environmentConfig = config[environment];

  Object.keys(environmentConfig).forEach(key => {
    process.env[key] = environmentConfig[key];
  });

  Object.keys(keys).forEach(key => {
    process.env[key] = keys[key];
  });
}
