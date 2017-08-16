var request = require('request');
var MyHeaders = {
    'X-Requested-With': 'XMLHttpRequest',
    'Connection': 'keep-alive',
    'Cookie': 'tuser=1; __mp3sessid=A828B942D1C4; _znu=1; fuid=de9aa29d9873988881b2cecce97bf3f4; __gads=ID=c42680b7198b7732:T=1495113971:S=ALNI_MYMC7VV6X6ZIan7dA2hEMIrhYt1xw; SRVID=s65178_8131; zpw_sek=null; wzvid=2000.a6307024dc5834066d49.1495721046572.0021bfc8; zsid=null; wsid=R5m6.101001015.3.jikudNlM9e1CyIE6UzOcWD0kTbW9v-nVUavYwYBM9e0; 360GAME_ACCESS=true; __zlcmid=gygVsvadl3AguB; zmsid=Lcrc.54913949.10.yg8qzDxtWxr37CQ-rVU3lR-5uDomdktOwyMsoQYNTC_lFLoyjhC7v0; __utma=1.1928836389.1495040002.1497189416.1497189416.1; __utmc=1; __utmz=1.1497189416.1.1.utmcsr=mp3.zing.vn|utmccn=(referral)|utmcmd=referral|utmcct=/vip; _zploc=A1953915124; ___zlid=403.2578798297.1953915124.1502528714.1436031958; _zmp3=0.17363880783041674; _gat=1; _ga=GA1.2.1928836389.1495040002; _gid=GA1.2.409523974.1502338811; ___sessid=2372.2578325868.3456446593.1502529097.616434284; __sessid=5093.2578328589.3456449314.1502529097; BANNER_OFF=1; atmpv=9; __zi=2000.fed4c60ef57e1d20446f.1495040031090.e6e9c767; adtimaUserId=2000.fed4c60ef57e1d20446f.1495040031090.e6e9c767; crtg_vng_rta=bmi300250H%3D1%3Bmobmi300250%3D1%3Bm3z300600%3D1%3Blbn300600%3D1%3Bnwz1190250%3D1%3Bnwz360640%3D1%3Bbmi360640%3D1%3Bm3z1190250%3D1%3Blbn970250%3D1%3B'
};

function getDowloadLink(options) {
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var dat = /data-code="([a-zA-Z0-9]{0,50})/;
                var code = body.match(dat)[0];
                var link = "http://mp3.zing.vn/json/song/get-download?code=" + code.replace('data-code="', "")
                //var link = body;
                //console.log(body);
                resolve(link);
            }
        });

    });
}

function getXmlLink(options) {
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var xml = /\/json\/song\/get-source\/\w+/;
                var link = "http://mp3.zing.vn" + body.match(xml)[0];
                resolve(link);
            }
        })
    })
}

function getSourceLink(options) {
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //var link = body;
                //console.log(body);
                data = JSON.parse(body)['data'];
                //dlink = 'http://mp3.zing.vn' + data;
                resolve(data);
            }
        });

    });
}

function getInfo(options) {
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                data = JSON.parse(body)["data"][0];
                resolve(data);
            }
        });

    });
}

function getDirectLink(options) {
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let link = response.request["uri"]["href"]
                //console.log("GET DC LINK LA: " + response.request["uri"]["href"]);
                resolve(link);
            }
        });
    });
}



async function sysn(oriLink, headers) {
    let options = {
        url: oriLink,
        headers: headers,
        gzip: 'true'
    };

    let linkXml = await getXmlLink(options);
    let linkDownload = await getDowloadLink(options);

    let optionDownload = {
        url: linkDownload,
        headers: headers,
        gzip: 'true'
    }

    let optionInfo = {
        url: linkXml,
        headers: headers,
        gzip: 'true'
    };

    let sourceLink = await getSourceLink(optionDownload);
    let info = await getInfo(optionInfo);
    let name = info["name"];
    let cover = info["cover"]
    let artist = info["artist"]

    let link320 = await getDirectLink(o = {
        url: 'http://mp3.zing.vn' + sourceLink['320']['link'],
        headers: headers,
        gzip: 'true'
    })
    let link128 = await getDirectLink(o = {
        url: 'http://mp3.zing.vn' + sourceLink['128']['link'],
        headers: headers,
        gzip: 'true'
    })
    let lossless = await getDirectLink(o = {
        url: 'http://mp3.zing.vn' + sourceLink['lossless']['link'],
        headers: headers,
        gzip: 'true'
    })

    let arrLink = [link128, link320, lossless];
    console.log("NAME: " + name);
    console.log("COVER: " + cover);
    console.log("ARTIST: " + artist);
    console.log(arrLink);
}

sysn("http://mp3.zing.vn/bai-hat/Lac-Nhau-Co-Phai-Muon-Doi-ERIK-ST319/ZW78D0FZ.html", MyHeaders);
