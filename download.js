var fs = require("fs");
var request = require("request");
var link = "http://mp3.zing.vn/download/song/Yeu-La-Tha-Thu-Em-Chua-18-OST-OnlyC-OnlyC/kmJHtknNhZvZRAgyZFJtbGZmyLpnbNEkdXa?sig=3518d12408fe903389b69544acb7d2b8"
fs.createReadStream('music.mp3').pipe(request.put(link));