import __http = require('http');
import __https = require('https');
import qs = require('querystring');
import { ResInterface } from '../common/G';
import { safeJson } from '../common/gFunc';

export class myhttp {
    async sendpost(host: string, port: string, path: string, data: object) {
        return new Promise<JSON>((resolve, reject) => {
            if (host == null) {
                console.error('[HTTP] ERROR: host is null');
                return;
            }
            var content = qs.stringify(data);
            var options = {
                hostname: host,
                port: port,
                path: path + '?' + content,
                method: 'GET'
            };

            var req = __http.request(options, function (res) {
                console.log('STATUS: ' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    //console.log('BODY: ' + chunk);
                    // callback(chunk);
                    resolve(chunk);
                });
            });

            req.setTimeout(5000);

            req.on('error', function (e) {
                console.error('problem with request: ' + e.message);
            });

            req.end();
        });
    };

    async sendgeturl(url: string, data: object, safe: boolean) {
        return new Promise<object | string | null>((resolve, reject) => {
            var content = qs.stringify(data);
            url = url + '?' + content;
            let getfunc = __http.get;
            if (safe) {
                getfunc = __https.get;
            }
            var req = getfunc(url, function (res) {
                //console.log('STATUS: ' + res.statusCode);  
                //console.log('HEADERS: ' + JSON.stringify(res.headers));  
                var str = "";
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    //console.log('BODY: ' + chunk);
                    var json = safeJson(chunk);
                    // callback(true, json);
                    // str += chunk;
                    resolve(json);
                });
                res.on("end", function () {
                    // console.log(str.toString());
                });
            });

            req.on('error', function (e) {
                console.error('problem with request: ' + e.message);
                resolve();
            });
            req.setTimeout(5000);

            req.end();
        });
    }

    async sendget(host: string, port: number, path: string, data: object, safe: boolean) {
        return new Promise<object | string | null>((resolve, reject) => {
            if (host == null) {
                console.error('[HTTP] ERROR: host is null');
                return;
            }
            var content = qs.stringify(data);
            var options = {
                hostname: host,
                path: path + '?' + content,
                method: 'GET',
                port: 0,
            };

            if (port) {
                options.port = port;
            }

            var getfunc = __http.get;
            if (safe) {
                getfunc = __https.get;
            }
            var req = getfunc(options, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    let json = safeJson(chunk);
                    resolve(json);
                });
            });

            req.setTimeout(5000);

            req.on('error', function (e) {
                console.error('problem with request: ' + e.message);
            });

            req.end();
        })
    }
    /*
        exports.sendPost = function (host: string, path: string, data:object) {
            var contents = qs.stringify(data);
            var options = {
                host: host,
                // port: 8081,
                path: path,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': contents.length
                }
            };
    
            var req = https.request(options, function (res) {
                // console.log('STATUS:'+res.statusCode);
                // console.log('HEADERS:'+JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (data) {
                    // console.log("data:",data);   //一段html代码
                    callback(data);
                });
            });
    
            req.write(contents);
            req.end();
        };
    */
    reply(res: ResInterface, data: any) {
        let str = "";
        if (data == null) {

        } else if (typeof data == "string" || typeof data == "number") {
            str = String(data);
        } else if (typeof data == "object") {
            str = JSON.stringify(data);
        }

        res.send(str);
    };
}

let http = new myhttp();
export default http;