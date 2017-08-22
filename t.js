var request = require('request');
var reqFast = require('req-fast');
var oriLink = 'http://mp3.zing.vn/bai-hat/Xin-Dung-Lang-Im-Soobin-Hoang-Son/ZW80B6I8.html'
var MyHeaders = {
    'X-Requested-With': 'XMLHttpRequest',
    'Connection': 'keep-alive',
    'Cookie': 'tuser=1; _znu=1; fuid=de9aa29d9873988881b2cecce97bf3f4; __gads=ID=c42680b7198b7732:T=1495113971:S=ALNI_MYMC7VV6X6ZIan7dA2hEMIrhYt1xw; zpw_sek=null; wzvid=2000.a6307024dc5834066d49.1495721046572.0021bfc8; zsid=null; wsid=R5m6.101001015.3.jikudNlM9e1CyIE6UzOcWD0kTbW9v-nVUavYwYBM9e0; __zlcmid=gygVsvadl3AguB; __utma=1.1928836389.1495040002.1497189416.1497189416.1; __utmz=1.1497189416.1.1.utmcsr=mp3.zing.vn|utmccn=(referral)|utmcmd=referral|utmcct=/vip; SRVID=s65174_8133; __mp3sessid=DFEC7D827FA5; zmsid=Sqmv.54913949.13.J7d0q4qV45NGz5LMHXyGLInjSpGZTdumU2qb_hUy0MnGEB9K1Mo930; _zploc=A3419216615; _zmp3=0.7899024572239537; BANNER_OFF=1; _ga=GA1.2.1928836389.1495040002; _gid=GA1.2.689069859.1503336636; atmpv=11; __zi=2000.fed4c60ef57e1d20446f.1495040031090.e6e9c767; adtimaUserId=2000.fed4c60ef57e1d20446f.1495040031090.e6e9c767; crtg_vng_rta=m3z3002501%3D1%3Bm3z3002502%3D1%3Bbmi72890%3D1%3Bbmi300250H%3D1%3Bbmi300250S%3D1%3Bnwz300600%3D1%3Bzoom300600%3D1%3Bmom3z300250%3D1%3Bmobmi32050%3D1%3Bmonwz300250%3D1%3Bmobmi300250%3D1%3Bnwzint300600%3D1%3Bnwz300600m%3D1%3Bztv97090%3D1%3Bztvcb97090%3D1%3Bm3z300600%3D1%3Bm3zah300250%3D1%3Bm3zap300250%3D1%3Bztv970250%3D1%3Blbn300250%3D1%3Blbn72890%3D1%3Bbmi160600%3D1%3Bbmi300600%3D1%3Blbn300600%3D1%3Blbn97090%3D1%3Blbn200200%3D1%3Bnwz1190250%3D1%3Bnwz360640%3D1%3Bbmi360640%3D1%3Bm3z1190250%3D1%3Bbmi1p300250%3D1%3Blbn160600%3D1%3Blbn970250%3D1%3B; __sessid=231.1503391400.3409791234.1503391169; ___zlid=55.2579150211.3419216615.1503391169.2272224960; ___sessid=73.2579150229.1906399834.1503391169.510652287'
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
        var op = {
            url: options.url,
            headers: options.headers,
            maxRedirects: 1
        };
        reqFast(op, function(error, response){
        
            resolve(response.redirects.toString());

        })
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

//sysn("http://mp3.zing.vn/bai-hat/Lac-Nhau-Co-Phai-Muon-Doi-ERIK-ST319/ZW78D0FZ.html", MyHeaders);



var options = {
    url: oriLink,
    headers: MyHeaders,
    gzip: 'true'
};


async function getMp3Info(options) {
    let linkXml = await getXmlLink(options);
    let info = await getInfo(o = {
        url: linkXml,
        headers: MyHeaders,
        gzip: 'true'
    })
    console.log(info)
    return Promise.resolve(info)
}


async function getMp3DownloadLink(options, headers) {
    let linkDownload = await getDowloadLink(options);
    let sourceLink = await getSourceLink(o = {
        url: linkDownload,
        headers: headers,
        gzip: 'true'
    })
    // let dlink = await getDirectLink(o = {
    //     url: 'http://mp3.zing.vn' + sourceLink['lossless']['link'],
    //     headers: headers,
    //     gzip: 'true'
    // })
    // console.log(dlink);
    // console.log(sourceLink)
    // return Promise.resolve(sourceLink)
    let arrLink = await Promise.all([getDirectLink(o = {
        url: 'http://mp3.zing.vn' + sourceLink['128']['link'],
        headers: headers,
        gzip: 'true'
    }),
    getDirectLink(o = {
        url: 'http://mp3.zing.vn' + sourceLink['320']['link'],
        headers: headers,
        gzip: 'true'
    }),
    getDirectLink(o = {
        url: 'http://mp3.zing.vn' + sourceLink['lossless']['link'],
        headers: headers,
        gzip: 'true'
    })])
    console.log(arrLink)
    return Promise.resolve(arrLink);

}

async function sysnAll(options, headers) {

    let info = await getMp3Info(options);
    let arrLink = await getMp3DownloadLink(options, headers);
    console.log(info['name'])
    console.log("LINK: " + arrLink[2])
    // let data = await Promise.all([getMp3Info(options), getMp3DownloadLink(options, headers)]);
    // console.log(data[0]);

}
getMp3DownloadLink(options, MyHeaders);
//sysnAll(options, MyHeaders);
//getMp3Info(options);