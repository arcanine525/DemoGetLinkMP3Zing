import json
import requests
import sys
import base64
import re # import regular expression

oriLink = sys.argv[1]

#oriLink = 'http://mp3.zing.vn/bai-hat/Xin-Dung-Lang-Im-Soobin-Hoang-Son/ZW80B6I8.html'

requestLink = requests.get(oriLink)
HTMLLink = requestLink.text

#GET XML LINK
regexData_xml_get_source = r'data-xml="\/json\/song\/get-source\/\w+"'
data_xml_get_source = re.search(regexData_xml_get_source, HTMLLink)
if data_xml_get_source is not None: # Nếu tìm được data_xml
    data_xml = data_xml_get_source.group()
    data_xml = data_xml.rstrip('"') # bỏ đi '"'
    sourceID = data_xml.split('/')[-1] # chúng ta chỉ lấy cái ID thôi

linkXML = 'http://mp3.zing.vn/json/song/get-source/' + sourceID


#GET LINK MP3
cookies = {
    'tuser': '1',
    '__mp3sessid': 'A828B942D1C4',
    '_znu': '1',
    'fuid': 'de9aa29d9873988881b2cecce97bf3f4',
    '__gads': 'ID=c42680b7198b7732:T=1495113971:S=ALNI_MYMC7VV6X6ZIan7dA2hEMIrhYt1xw',
    'SRVID': 's65178_8131',
    'zpw_sek': 'null',
    'wzvid': '2000.a6307024dc5834066d49.1495721046572.0021bfc8',
    'zsid': 'null',
    'wsid': 'R5m6.101001015.3.jikudNlM9e1CyIE6UzOcWD0kTbW9v-nVUavYwYBM9e0',
    '360GAME_ACCESS': 'true',
    '__zlcmid': 'gygVsvadl3AguB',
    'zmsid': 'Lcrc.54913949.10.yg8qzDxtWxr37CQ-rVU3lR-5uDomdktOwyMsoQYNTC_lFLoyjhC7v0',
    '__utma': '1.1928836389.1495040002.1497189416.1497189416.1',
    '__utmc': '1',
    '__utmz': '1.1497189416.1.1.utmcsr=mp3.zing.vn|utmccn=(referral)|utmcmd=referral|utmcct=/vip',
    '_gat': '1',
    '_gat_mp3': '1',
    '_zploc': 'A3419216615',
    '_zmp3': '0.677647939666822',
    '___sessid': '4188.2578671324.4921564236.1502343433.2657103019',
    '__sessid': '1584.2578668720.4921561632.1502343433',
    '_ga': 'GA1.2.1928836389.1495040002',
    '_gid': 'GA1.2.409523974.1502338811',
    'atmpv': '2',
    '__zi': '2000.fed4c60ef57e1d20446f.1495040031090.e6e9c767',
    'adtimaUserId': '2000.fed4c60ef57e1d20446f.1495040031090.e6e9c767',
    'crtg_vng_rta': 'bmi72890%3D1%3Bbmi300250H%3D1%3Bzoom300600%3D1%3Bmobmi32050%3D1%3Bmobmi300250%3D1%3Bztv97090%3D1%3Bztvcb97090%3D1%3Bm3z300600%3D1%3Bm3zah300250%3D1%3Bm3zap300250%3D1%3Blbn300250%3D1%3Bbmi160600%3D1%3Bbmi300600%3D1%3Blbn300600%3D1%3Blbn97090%3D1%3Bnwz1190250%3D1%3Bnwz360640%3D1%3Bbmi360640%3D1%3Bm3z1190250%3D1%3Bbmi1p300250%3D1%3Blbn970250%3D1%3B',
    '___zlid': 'GW5Vw7uKtBcllOYnVgeG+iuHgGI1Hw1jjl8rmF4t/1kHWilCLXEDnq5Z1d6YdfX1JI0AWLiHX8zy09OkwA0ZSA==',
    'BANNER_OFF': '',
}

headers = {
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'vi,en-US;q=0.8,en;q=0.6',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    'Accept': '*/*',
    'Referer': oriLink,
    'X-Requested-With': 'XMLHttpRequest',
    'Connection': 'keep-alive',
}

res = requests.get(linkXML, headers=headers, cookies=cookies).text

data = json.loads(res)
gdata = data['data'][0]['name']
link128 = data['data'][0]['source_list'][0]

print (link128)

#print ('Link XML get duoc: '+linkXML)
#print (data)