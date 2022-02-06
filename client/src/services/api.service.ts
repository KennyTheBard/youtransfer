import { WetransferUploadMeta } from './../types/types.d';
import axios from 'axios'
import fileDownload from 'js-file-download';
// import WebTorrent from 'webtorrent';

export async function wetransferUpload(
   files: File[]
): Promise<WetransferUploadMeta> {
   const formData = new FormData();
   files.forEach((file, idx) => formData.append(`file${idx}`, file, file.name));

   const res = await axios.post(`http://localhost:3000/wt/upload`, formData);
   return res.data as unknown as WetransferUploadMeta;
}

export async function wetransferDownload(
   id: string,
   hash: string,
   key: string
): Promise<void> {
   const res = await axios.post(`http://localhost:3000/wt/download`, {
      id, hash, key
   }, {
      responseType: 'blob'
   });

   fileDownload(res.data, 'download.zip', 'application/zip');
}

// export async function webtorrentUpload(
//    files: File[]
// ) {
//    const client = new WebTorrent();

//    client.seed(files, (torrent) => {
//       console.log('magnetURI: ', torrent.magnetURI);
//       console.log('Client is seeding:', torrent.progress, torrent.length, torrent.received);
//    })
// }

// export async function webtorrentDownload(
//    magnetURI: string
// ) {
//    const client = new WebTorrent();

//    client.add(magnetURI, (torrent) => {
//       // Got torrent metadata!
//       console.log('Client is downloading:', torrent.progress, torrent.length, torrent.received)

//       torrent.on('done', () => {
//          torrent.files.forEach(file => file.getBlob((err, blob) => {
//             console.error(err);

//             if (blob !== undefined) {
//                fileDownload(blob, file.name, 'application/octet-stream');
//             }
//          }))
//       })
//    })
// }