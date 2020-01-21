const openfinLauncher = require("openfin-launcher");

module.exports = (configPath) => {
    console.log("OpenFin launching app... " + configPath);
    openfinLauncher
        .launchOpenFin({ configPath })
        .then(() => { console.log("OpenFin launching app... completed"); })
        .catch(console.error);
};
