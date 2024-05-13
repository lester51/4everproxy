# 4EVERPROXY - FREE WEB PROXY

![4everproxy](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5ytf-9jwb2nV7vZpNS_HuJZmCa8ccYwZDhjMkg5kvqbWU61xaWcFVDtw&s=10)

4everproxy is a secure and anonymous free web proxy. Hide your IP address while browsing the Internet.

# HOW TO INSTALL?
```
npm i 4everproxy
```

# FUNCTIONS IMPORTING
## CJS AND ESM SUPPORTED
```js
//CommonJS
const webproxy = require("4everproxy");

//ES Module
import webproxy from "4everproxy";
```

## SIMPLE USAGE
```js
(async()=>{
    //CommonJS
    const webproxy = require("4everproxy");
    
    //ES MODULE
    import webproxy from "4everproxy";

    //THIS FUNC. IS FOR GETTING THE COOKIES AND AVAILABLE SERVERS & IP'S TO BE USED ON REQ.
    let {proxy_list,cookie} = await webproxy.getConfig()
    console.log(proxy_list)

    //THIS IS THE DATA THAT WE'RE GOING TO POST
    let formData = {
        u: 'https://youtube.com', //YOUR URL YOU WANT TO PROXIFIED
        u_default: 'https:/\/www.google.com/', //IF "u" params. IS NOT FILLED IT WILL USE THIS AS YOUR URL (NOT REALLY IMPORTANT)
        customip: '', //IF YOU HAVE OWN IP
        server_name: 'ny', //GET THIS VALUE ON "getConfig()" servers[. . .array]
        selip: '198.98.51.35', //GET THIS VALUE ON "getConfig()" ips[. . .array]
        allowCookies: 'on' //THERE ARE MORE OTHER OPTIONAL OPTIONS BUT I CHOOSE TO EXCLUDE THEM ON REQ.
    }

    //THE RESULT OF THIS FUNC. IS THE UNBLOCKED CONTENT
    let res = await webproxy.proxy(formData,cookie).catch(e=>console.error(e))
    //"res" variable contains the html response
    console.log(res);
})();
```

## EXTRA'S
### This is for the config/forData "server_name" & "selip"
```js
//getObjectByLocation([keyword:string],[array]).yourObjectKey

//for server_name
webproxt.getObjectByLocation('newyork',proxy_list.servers).server_name
//for selip
webproxy.getObjectByLocation('newyork',proxy_list.ips).ip
```
### Here's an example on `getObjectByLocation()`
```perl
let formData = {
    server_name: webproxt.getObjectByLocation('newyork',proxy_list.servers).server_name,
    selip: webproxy.getObjectByLocation('newyork',proxy_list.ips).ip
}
```
