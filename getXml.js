var request = require('request');
var options = {
    url: 'http://mp3.zing.vn/bai-hat/Xin-Dung-Lang-Im-Soobin-Hoang-Son/ZW80B6I8.html',
    //headers: headers,
    gzip: 'true'
};

function getCode(error, response, body) {
    if (!error && response.statusCode == 200) {
        var dat = /data-code="([a-zA-Z0-9]{0,50})/;
        var code = body.match(dat)[0];
        var link = "http://mp3.zing.vn/json/song/get-download?code=" + code.replace('data-code="', "");

        console.log("Get :" + link);

        var request = require('request');
        
        var headers = {
            // 'Accept-Encoding': 'gzip, deflate',
            // 'Accept-Language': 'vi,en-US;q=0.8,en;q=0.6',
            // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
            // 'Accept': '*/*',
            // 'Referer': 'http://mp3.zing.vn/bai-hat/Co-Duoc-Khong-Em-Chi-Dan/ZW79F6A7.html',
            'X-Requested-With': 'XMLHttpRequest',
            'Connection': 'keep-alive',
            'Cookie': 'tuser=1; __mp3sessid=A828B942D1C4; _znu=1; fuid=de9aa29d9873988881b2cecce97bf3f4; __gads=ID=c42680b7198b7732:T=1495113971:S=ALNI_MYMC7VV6X6ZIan7dA2hEMIrhYt1xw; SRVID=s65178_8131; zpw_sek=null; wzvid=2000.a6307024dc5834066d49.1495721046572.0021bfc8; zsid=null; wsid=R5m6.101001015.3.jikudNlM9e1CyIE6UzOcWD0kTbW9v-nVUavYwYBM9e0; 360GAME_ACCESS=true; __zlcmid=gygVsvadl3AguB; zmsid=Lcrc.54913949.10.yg8qzDxtWxr37CQ-rVU3lR-5uDomdktOwyMsoQYNTC_lFLoyjhC7v0; __utma=1.1928836389.1495040002.1497189416.1497189416.1; __utmc=1; __utmz=1.1497189416.1.1.utmcsr=mp3.zing.vn|utmccn=(referral)|utmcmd=referral|utmcct=/vip; _zploc=A1700993407; _gat_mp3=1; _zmp3=0.22917775328828816; __sessid=4084.2578421034.3203532930.1502535439; ___sessid=4187.2578421137.3203533033.1502535439.2160420978; BANNER_OFF=1; _gat=1; _ga=GA1.2.1928836389.1495040002; _gid=GA1.2.409523974.1502338811; atmpv=13; __zi=2000.fed4c60ef57e1d20446f.1495040031090.e6e9c767; adtimaUserId=2000.fed4c60ef57e1d20446f.1495040031090.e6e9c767; crtg_vng_rta=mobmi300250%3D1%3Blbn300600%3D1%3Bnwz1190250%3D1%3Bnwz360640%3D1%3Bbmi360640%3D1%3Bm3z1190250%3D1%3B; ___zlid=3923.2578420877.3203532773.1502535443.2139086921'
        };
        
        var options = {
            url: link,
            headers: headers,
            gzip: 'true'
        };
        
        function getData(error, response, body) {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(body)['data']['lossless']['link'];
                dlink = 'http://mp3.zing.vn'+data;
                console.log(dlink);
            }
        }
        
        request(options, getData);
        






    }
}

request(options, getCode);
