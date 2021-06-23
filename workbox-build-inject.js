const {injectManifest} = require('workbox-build');

const swSrc = 'src/service-worker.js';
const swDest = 'dist/sw.js';
injectManifest({
  globDirectory: 'dist',
  swSrc,
  swDest
}).then(({count, size}) => {
  console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
});
