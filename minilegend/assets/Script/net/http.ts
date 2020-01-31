import { safeJson } from "../common/gFunc";
import gameMgr from "../manager/GameMgr";

export var http = {

    /**
     * 功能：get请求
     * @param url
     * @param path
     * @param params
     * @param cb
     */
    get: async function (path: string, params?: object, url?: string) {
        return new Promise<object>((resolve, reject) => {
            let xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 10000;
            let str = "?";
            for (let k in params) {
                if (str != "?") {
                    str += "&";
                }
                str += k + "=" + params[k];
            }
            if (url == null) {
                url = gameMgr.config.host;
            }
            let requestURL = url + path + encodeURI(str);
            console.log("RequestURL:" + requestURL);
            xhr.open("GET", requestURL, true);
            xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8")

            if (cc.sys.isNative) {
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)) {
                    // console.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
                    let ret = xhr.responseText;
                    resolve(safeJson(ret));
                }
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
        return new Promise<object>((resolve, reject) => {
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
            console.log("RequestURL:" + requestURL);
            xhr.open("POST", requestURL, true);

            if (cc.sys.isNative) {
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
            }

            if (body) {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)) {
                    // console.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
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