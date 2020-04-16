/* eslint-disable */
import express from 'express';
// import path from 'path';
// import enforce from 'express-sslify';

const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 3000);
console.log('Port', PORT);
const app = express();

// app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(express.static('src'));
app.use((req, res) => {
    const file = `${__dirname}/src/index.html`;
    res.sendFile(file);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
