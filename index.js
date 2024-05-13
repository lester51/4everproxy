const cheerio = require('cheerio'),
request = require('request'),
qs = require('querystring');

module.exports.proxy = (data,jar) => {
    return new Promise((res,rej)=>{
        request({
            url: 'https:/\/www.4everproxy.com/query',
            method: 'POST',
            followAllRedirects: true,
            headers: {
                'cookie': jar,
    	            'content-type': 'application/x-www-form-urlencoded',
    	        },
            body: qs.stringify(data)
        },(e,r,b)=>(!e && r.statusCode == 200) ? res(b) : rej(e))
    })
}

module.exports.getConfig = () => {
    return new Promise(async(res,rej)=>{
        let data = await new Promise((Res,Rej)=>{
            request({
                url: 'https:/\/www.4everproxy.com/',
                method: 'GET'
            },(e,r,b)=>(!e && r.statusCode == 200) ? Res({cookie: r.headers['set-cookie'][0].split(';')[0], body: b}) : Rej(e))
        }).catch(e=>{
            throw new Error(`Error while making the request!\n\n${String(e)}`);
        })
        let $ = cheerio.load(data.body)
        let serverList = [],ipLocList = []
        $('select[id=server_name] optgroup option').each((i,e)=>{
            let obj = {};
            obj.location = $(e).text();
            obj.server_name = $(e).attr('value');
            serverList.push(obj)
        })
        $('select[name=selip] option').each((i,e)=>{
            let obj = {};
            obj.ip = $(e).attr('value')
            obj.location = $(e).text()
            ipLocList.push(obj)
        })
        res({
            cookie: data.cookie,
	           proxy_list: {
	   	            servers: serverList,
	   	            ips: ipLocList
	           }
        })
        
    })
}

module.exports.getObjectByLocation = (el,array) => {
  return array.find(obj => obj.location.toLowerCase().includes(el.toLowerCase()));
}