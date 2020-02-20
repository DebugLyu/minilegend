import { safeJson, lRandom } from "../common/gFunc";
import gameMgr from "../manager/GameMgr";
import Llog from "../common/LLog";
import playerMgr from "../manager/PlayerMgr";
import md5 from "../common/md5";

// let md5 = new MD5();

function getSecret(): string {
    let maindata = playerMgr.mainData;
    if (maindata.onlyid == 0) {
        return "";
    }
    let list = [
        maindata.uuid,
        maindata.token,
        maindata.onlyid,
    ];
    let random1 = lRandom(0, 2);
    let random2 = lRandom(0, 2);
    let m1 = md5.hex_md5(String(list[random1]));
    let m2 = md5.hex_md5(String(list[random2]));
    let a1 = m1.slice(0, 19);
    let a2 = m2.slice(11, 32);
    let s = `&uuid=${maindata.uuid}&r1=${random1}&r2=${random2}&m=${a1 + a2}`;
    return s;
}

export var http = {
    /**
     * 功能：get请求
     * @param url
     * @param path
     * @param params
     * @param cb
     */
    get: async function (path: string, params?: object, url?: string) {
        return new Promise<any>((resolve) => {
            let xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 10000;
            let str = "?";
            for (let k in params) {
                if (str != "?") {
                    str += "&";
                }
                str += k + "=" + params[k];
            }
            str += getSecret();

            if (url == null) {
                url = gameMgr.rURL;
            }
            let requestURL = url + path + encodeURI(str);

            Llog.log("RequestURL:" + requestURL);
            xhr.open("GET", requestURL, true);
            xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8")

            if (cc.sys.isNative) {
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)) {
                    // Llog.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
                    let ret = xhr.responseText;
                    resolve(safeJson(ret));
                }
            }

            xhr.onerror = () => {
                // MsgBox.show(0, { msg: "网络连接失败！请检查网络设置", timeout: 3 })
                resolve(null);
            }

            xhr.ontimeout = () => {
                resolve(null);
            }

            xhr.send();
        })
    },


    /**
     * 功能：post请求
     *     1）与get区别就是post能带数据body，其余均一样
     * @param url
     * @param path
     * @param params
     * @param body
     * @param cb
     */
    post: async function (path: string, body?: string | Document | Blob | ArrayBufferView | ArrayBuffer | FormData, params?: object, url?: string) {
        return new Promise<object>((resolve) => {
            let xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 10000;
            if (url == null) {
                url = gameMgr.config.host;
            }
            let str = "?"
            for (let k in params) {
                if (str != "?") {
                    str += "&";
                }
                str += k + "=" + params[k];
            }
            // true代表异步
            let requestURL = url + path + encodeURI(str);
            Llog.log("RequestURL:" + requestURL);
            xhr.open("POST", requestURL, true);

            if (cc.sys.isNative) {
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
            }

            if (body) {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }


            xhr.onerror = () => {
                resolve(null);
            }

            xhr.ontimeout = () => {
                resolve(null);
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)) {
                    // Llog.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
                    let ret = xhr.responseText;
                    resolve(safeJson(ret));
                }
            }

            //
            if (body) {
                xhr.send(body);
            }
        })
    },

    /**
     * 功能：下载
     * @param url
     * @param path
     * @param params
     * @param cb
     */
    download: function (url, path, params, cb) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;
        var requestURL = url + path;
        if (params) {
            requestURL = requestURL + "?" + params;
        }

        xhr.responseType = "arraybuffer";
        xhr.open("GET", requestURL, true);
        // xhr.setRequestHeader("", "text/html;charset=UTF-8")
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)) {
                var buffer = xhr.response;

                //
                var data = new Uint8Array(buffer);

                cb(null, data);
            }
        }

        xhr.send();
        return xhr;
    }

}