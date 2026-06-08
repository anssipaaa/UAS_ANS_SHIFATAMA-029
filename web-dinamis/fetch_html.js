const http = require('http');

http.get('http://13.212.233.207:3000/produk', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/<img[^>]+src="([^">]+)"/g);
    console.log(matches);
    const bread = data.match(/🍞/g);
    console.log("Bread emojis:", bread ? bread.length : 0);
  });
});
