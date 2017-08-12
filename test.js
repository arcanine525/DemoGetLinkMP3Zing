var request = require('request');
var xmlReq = {
    url: 'http://mp3.zing.vn/bai-hat/Goi-Ten-Em-Min/ZW78B06A.html',
    gzip: 'true'
}
var headers = {
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'vi,en-US;q=0.8,en;q=0.6',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    'Accept': '*/*',
    'Referer': 'http://mp3.zing.vn/bai-hat/Dieu-Anh-Biet-Chi-Dan/ZW78UD07.html',
    'X-Requested-With': 'XMLHttpRequest',
    'Connection': 'keep-alive',
    'Cookie': 'tuser=1; __mp3sessid=A828B942D1C4; _znu=1; fuid=de9aa29d9873988881b2cecce97bf3f4; __gads=ID=c42680b7198b7732:T=1495113971:S=ALNI_MYMC7VV6X6ZIan7dA2hEMIrhYt1xw; SRVID=s65178_8131; zpw_sek=null; wzvid=2000.a6307024dc5834066d49.1495721046572.0021bfc8; zsid=null; wsid=R5m6.101001015.3.jikudNlM9e1CyIE6UzOcWD0kTbW9v-nVUavYwYBM9e0; 360GAME_ACCESS=true; __zlcmid=gygVsvadl3AguB; zmsid=Lcrc.54913949.10.yg8qzDxtWxr37CQ-rVU3lR-5uDomdktOwyMsoQYNTC_lFLoyjhC7v0; __utma=1.1928836389.1495040002.1497189416.1497189416.1; __utmc=1; __utmz=1.1497189416.1.1.utmcsr=mp3.zing.vn|utmccn=(referral)|utmcmd=referral|utmcct=/vip; _zploc=A1700993407; _zmp3=0.2345735612405364; _ga=GA1.2.1928836389.1495040002; _gid=GA1.2.409523974.1502338811; atmpv=16; __zi=2000.fed4c60ef57e1d20446f.1495040031090.e6e9c767; adtimaUserId=2000.fed4c60ef57e1d20446f.1495040031090.e6e9c767; crtg_vng_rta=mobmi300250%3D1%3Bnwz1190250%3D1%3Bnwz360640%3D1%3Bbmi360640%3D1%3Bm3z1190250%3D1%3B; ___zlid=175.2578295772.1700993407.1502523046.4033456619; ___sessid=329.2578295926.1700993407.1502523046.4294327214; __sessid=256.1502523303.3203516710.1502523047; BANNER_OFF='
};

request(xmlReq, function (error, response, body) {
    var xml = /\/json\/song\/get-source\/\w+/;
    var linkxml = "http://mp3.zing.vn" + body.match(xml)[0];
    console.log(linkxml);

    var getSource ={
        url: linkxml,
        gzip: 'true',
        headers: headers,
    } 
    request(getSource,function(error, response, body){
        data = JSON.parse(body)['data'][0];
        
        var Music = {
            name: data['name'],
            artist: data['artist'],
            cover: data['cover'],
            link128: data['source_list'][0],
            link320: data['source_list'][1]
        }
        
        console.log(Music);
    })
});







