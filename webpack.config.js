const path = require("path");

module.exports = {
    entry: {
        index: "./src/index.js",
    },
    output: {
        path: path.join(__dirname, "public/"),
        filename: "bundle.js",
    },
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./public",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: "file-loader",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
            },
        ],
    },
};
