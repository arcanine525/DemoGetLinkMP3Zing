var request = require('request');

var headers = {
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'vi,en-US;q=0.8,en;q=0.6',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    'Accept': '*/*',
    'Referer': 'http://mp3.zing.vn/bai-hat/Alone-Alan-Walker/ZW78AWZF.html',
    'X-Requested-With': 'XMLHttpRequest',
    'Connection': 'keep-alive',
    'Cookie': 'tuser=1; __mp3sessid=A828B942D1C4; _znu=1; fuid=de9aa29d9873988881b2cecce97bf3f4; __gads=ID=c42680b7198b7732:T=1495113971:S=ALNI_MYMC7VV6X6ZIan7dA2hEMIrhYt1xw; SRVID=s65178_8131; zpw_sek=null; wzvid=2000.a6307024dc5834066d49.1495721046572.0021bfc8; zsid=null; wsid=R5m6.101001015.3.jikudNlM9e1CyIE6UzOcWD0kTbW9v-nVUavYwYBM9e0; 360GAME_ACCESS=true; __zlcmid=gygVsvadl3AguB; zmsid=Lcrc.54913949.10.yg8qzDxtWxr37CQ-rVU3lR-5uDomdktOwyMsoQYNTC_lFLoyjhC7v0; __utma=1.1928836389.1495040002.1497189416.1497189416.1; __utmc=1; __utmz=1.1497189416.1.1.utmcsr=mp3.zing.vn|utmccn=(referral)|utmcmd=referral|utmcct=/vip; _zploc=A1953915124; ___zlid=403.2578798297.1953915124.1502528714.1436031958; _zmp3=0.17363880783041674; _gat=1; _ga=GA1.2.1928836389.1495040002; _gid=GA1.2.409523974.1502338811; ___sessid=2372.2578325868.3456446593.1502529097.616434284; __sessid=5093.2578328589.3456449314.1502529097; BANNER_OFF=1; atmpv=9; __zi=2000.fed4c60ef57e1d20446f.1495040031090.e6e9c767; adtimaUserId=2000.fed4c60ef57e1d20446f.1495040031090.e6e9c767; crtg_vng_rta=bmi300250H%3D1%3Bmobmi300250%3D1%3Bm3z300600%3D1%3Blbn300600%3D1%3Bnwz1190250%3D1%3Bnwz360640%3D1%3Bbmi360640%3D1%3Bm3z1190250%3D1%3Blbn970250%3D1%3B'
};

var options = {
    url: 'http://mp3.zing.vn/json/song/get-download?panel=.fn-tab-panel-service&code=ZHxmtknapaizVRiyZFJtvnkG&group=.fn-tab-panel',
    headers: headers,
    gzip: 'true'

};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

request(options, callback);