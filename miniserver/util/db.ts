import mysql from "mysql";
import Llog from "./Log";
// var dbfrom = require('./dbform');
let pool: mysql.Pool;

function nop(a: any, b: any, c: any, d: any, e: any, f: any, g: any) {

}
function query(sql: string) {
    pool.getConnection((err, conn) => {
        if (err) {
            Llog.error("Sql:" + sql + ", Query Error");
            Llog.error(err);
        } else {
            conn.query(sql, (qerr, vals, fields) => {
                conn.release();
                if (qerr) {
                    Llog.error("Sql:" + sql + ", Query Error");
                    Llog.error(qerr);
                }
            });
        }
    });
}
async function asyncQuery(sql: string) {
    return new Promise<JSON | null>((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                Llog.error("Sql:" + sql + ", Query Error");
                Llog.error(err);
                resolve(null);
            } else {
                conn.query(sql, (qerr, vals, fields) => {
                    conn.release();
                    if (qerr) {
                        Llog.error("Sql:" + sql + ", Query Error");
                        Llog.error(qerr);
                    }
                    resolve(vals);
                });
            }
        });
    });
};

exports.init = function (config: mysql.PoolConfig) {
    pool = mysql.createPool(config);
};

exports.set = async function (key: string, value: string) {
    if (key == null) {
        return;
    }

    var sql = 'insert into t_tbl( t_key, t_value )values(' + key + ',' + value + ')ON DUPLICATE KEY UPDATE t_value = ' + value + ';';
    query(sql);
};

exports.get = async function (key:string) {
    // return new Promise<JSON | null>((resolve, reject) => {
    var sql = 'select * from t_tbl where t_key = ?;';
    sql = mysql.format(sql, [key]);
    return await asyncQuery(sql);
}