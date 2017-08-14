var oriLink = 'http://mp3.zing.vn/bai-hat/Anh-Se-Tot-Ma-Pham-Hong-Phuoc-Thuy-Chi/ZW7OOUDB.html'

let aPromise = new Promise((resolve, reject) => {
    var options = {
        url: oriLink,
        headers: headers,
        gzip: 'true'
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var xml = /\/json\/song\/get-source\/\w+/;
            var link = "http://mp3.zing.vn" + body.match(xml)[0];
            resolve(link);
        }
    })

})

aPromise.then(link => console.log("GET DC: " + link));