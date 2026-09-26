const path = require("path")
const { pathToFileURL } = require("url")

module.exports = {
    mode: "production",
    entry: "./src/script.js", // Glavna ulazna skripta
    output: {
        filename: "script.min.js", // Naziv spakovanog fajla
        path: path.resolve(__dirname, "dist") // Folder gde se snima spakovani kod
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false // Dozvoljava import bez obavezne .js ekstenzije
                }
            }
        ]
    }
};