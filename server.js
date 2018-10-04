import express from 'express';
import svg2png from 'svg2png';
import JSZip from 'jszip';
import fs from 'fs';

import svg from './svg.svg';

const app = express();

const scale = 5;

app.get('/png', (req, res) => {
  const pngs = Promise.all([svg, svg].map(file => {
    return svg2png(
      Buffer.from(svg, 'utf-8'),
      { 
        width: Math.floor(520*scale),
        height: Math.floor(350*scale)
      }
    )
  }));
  
  return pngs.then(buffers => {
    const zip = new JSZip();

    buffers.forEach((buffer, index) => {
      zip.file(`image${index}.png`, buffer.toString('binary'), {binary: true});
    })

    return zip.generateAsync({type:"base64"}).then(data => {
      res.setHeader('Content-Type', 'application/zip');

      return res.send(Buffer.from(data, 'base64'));
    })
  });
});

app.listen(8080, () => console.log('listening'));