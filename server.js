const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
// const { Socket } = require("socket.io");
const app = express();


app.use(morgan("dev"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const server = require("http").createServer(app);

app.use("/api/v1/users/auth/", require("./routes/User"));

app.use("/", require("./routes/home"));
 
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});
// io.on("connection", (socket) => {
//     console.log(socket.id);
// });
server.listen(3002);