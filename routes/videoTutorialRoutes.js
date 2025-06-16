const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const videoPath = path.join(__dirname, '../public/tutorial.mp4');

router.get('/videoTutorial', (req, res) => {
    fs.stat(videoPath, (err, stats) => {
        if (err) {
            return res.status(404).send('Vídeo não encontrado');
        }
        const range = req.headers.range;
        if (!range) {
            res.writeHead(200, {
                'Content-Length': stats.size,
                'Content-Type': 'video/mp4',
            });
            fs.createReadStream(videoPath).pipe(res);
            return;
        }
        const videoSize = stats.size;
        const CHUNK_SIZE = 10 ** 6; 
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

module.exports = router;
