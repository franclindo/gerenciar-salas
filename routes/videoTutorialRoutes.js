const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const io = require('socket.io')(require('http').createServer());

const videoPath = path.join(__dirname, '../public/video-tutorial.mp4');


router.get('/videoTutorial', (req, res) => {
    fs.stat(videoPath, (err, stats) => {
        if (err) {
            return res.status(404).send('Vídeo não encontrado');
        }
        const range = req.headers.range;
        if (!range) {
            return res.status(416).send('Range header required');
        }
        const videoSize = stats.size;
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${videoSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
    });
});

router.post('/bloquear/:lab', (req, res) => {
    const lab = req.params.lab;
    io.emit(`bloquear(${lab})`, { message: `Laboratório ${lab} foi bloqueado!` });
    res.status(200).send(`Evento emitido para o canal bloquear(${lab})`);
});

router.get('/temperaturaAtual', (req, res) => {
    res.json({ temperatura: temperaturaAtual.toFixed(2) });
});

module.exports = router; 