const { type } = require("os")
const path = require("path")


module.exports = {
    mode: "production",
    entry: "./src/script.js", 
    output: {
        filename: "bundle.min.js",
        path: path.resolve(__dirname, "dist") // nadji "dist" folder u projektu
    },

    module:{
        rules:[
            {
                test: /\.m?js$/,
                type: "javascript/auto",
                resolve:{
                    fullySpecified: false
                }
            }
        ]
    }


}


// const path = require("path")


// module.exports = {
//     mode: "production",
//     entry: [
//         "./src/script.js", "./src/functions.js"
//     ],
//     output: {
//         filename: "bundle.min.js",
//         path: path.resolve(__dirname, "dist") // nadji "dist" folder u projektu
//     }
// }
