const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        //contentHash to avoid caching problem
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /.html$/i,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|gif|obj|mtl)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        ouptputPath: "imgs"
                    }
                }
            }
        ],
    }
}