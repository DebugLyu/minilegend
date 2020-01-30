var mysql = require("mysql");
var dbfrom = require('./dbform');

function nop(a, b, c, d, e, f, g) {

}

function query(sql, callback) {
    // pool.getConnection(function (err, conn) {
    //     if (err) {
    //         callback(err, null, null);
    //     } else {
    //         conn.query(sql, function (qerr, vals, fields) {
    //             //释放连接  
    //             // pool.releaseConnection(conn)
    //             conn.release();
    //             //事件驱动回调  
    //             callback(qerr, vals, fields);
    //         });
    //     }
    // });
    dbfrom.query(sql, callback);
};
exports.query = query;

exports.init = function (config) {
    pool = mysql.createPool({
        host: config.HOST,
        user: config.USER,
        password: config.PWD,
        database: config.DB,
        port: config.PORT,
        timeout: 60 * 60 * 1000,
    });
};

exports.set = function (key, value, callback) {
    callback = callback == null ? nop : callback;
    if (key == null) {
        callback(null);
        return;
    }

    var sql = 'insert into t_tbl( t_key, t_value )values(' + key + ',' + value + ')ON DUPLICATE KEY UPDATE t_value = ' + value + ';';
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }

        if (rows.length == 0) {
            callback(null);
            return;
        }
        callback(true);
    });
};

exports.get = function (key, callback) {
    callback = callback == null ? nop : callback;
    if (key == null) {
        callback(null);
        return;
    }

    var sql = 'select * from t_tbl where t_key = ' + key + ';';
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }

        if (rows.length == 0) {
            callback(null);
            return;
        }
        callback(rows[0].t_value);
    });
};

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
function updateLoginInfo(accountid, ip, mac) {
    var sql = `UPDATE qy_account SET last_login_time = now(), login_ip = '${ip}', mac = '${mac}' WHERE accountid =${accountid};`;
    query(sql, function (err, rows, fields) {
        if (err) {
            throw err;
        }
    })
}


exports.AccountLogin = (logininfo, callback) => {
    let account = logininfo.account;
    let password = logininfo.password;
    let ip = logininfo.ip == null ? "" : logininfo.ip;
    let mac = logininfo.mac;

    callback = callback == null ? nop : callback;
    if (account == null || password == null) {
        callback(MsgCode.FAILED);
        return;
    }
    var sql = `SELECT * FROM qy_account WHERE account = '${account}';`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            throw err;
        }
        if (rows.length > 0) {
            let playerdbinfo = rows[0];
            if (password == playerdbinfo.password) {
                callback(MsgCode.SUCCESS, playerdbinfo);
                updateLoginInfo(playerdbinfo.accountid, ip, mac);
            } else {
                callback(MsgCode.LOGIN_ACCOUNT_PWD_ERROR);
            }
        }
        if (rows.length == 0) {
            callback(MsgCode.LOGIN_ACCOUNT_PWD_ERROR);
        }
    })
}

exports.AccountRegister = (register_info, callback) => {
    let account = register_info.account;
    let password = register_info.password;
    let invitecode = register_info.invitecode;

    var sql = `SELECT * FROM qy_account WHERE account = '${account}';`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            throw err;
        }
        if (rows.length > 0) {
            callback(MsgCode.REGISTER_ACCOUNT_REPEAT);
            return;
        } else {
            sql = `INSERT INTO qy_account(account, password,invite, register_time) VALUES('${account}', '${password}','${invitecode}', NOW() );`;
            query(sql, function (err, rows, fields) {
                if (err) {
                    callback(false, {});
                    throw err;
                }
                callback(MsgCode.SUCCESS);
            });
        }
    });
}

/*
 * 修改密码
 */
exports.AccountChangePassword = (data, callback) => {
	let account = data.account;
	let safecode = data.safecode;
	let password = data.password;
	let sql = `update qy_account set password = '${password}' where account = '${account}' and safecode like '_:${safecode}';`;
	query(sql, (err) => { 
		if (err) {
			callback(MsgCode.FAILED);
			throw err;
		}
		else {
			callback(MsgCode.SUCCESS);
		}
	});
};

exports.getFrozenList = (callback) => {
    var sql = `SELECT frozenip FROM ip_frozen;`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED, []);
            throw err;
        }
        if (rows.length == 0) {
            callback(MsgCode.FAILED, []);
            return;
        }
        callback(MsgCode.SUCCESS, rows);
    });
}
exports.getFrozenIpRoleid = (ip, callback) => {

    var sql = `SELECT accountid FROM qy_account WHERE login_ip = '${ip}';`;

    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED, []);
            throw err;
        }
        if (rows.length == 0) {
            callback(MsgCode.FAILED, []);
            return;
        }

        let accounts = '';
        for (const id of rows) {
            accounts = accounts + id.accountid + ',';
        }
        accounts = accounts.substr(0, accounts.length - 1); //.splice(-1);

        sql = `SELECT roleid FROM qy_role WHERE accountid in (${accounts});`;
        query(sql, function (err, rows, fields) {
            if (err) {
                callback(MsgCode.FAILED, []);
                throw err;
            }
            if (rows.length == 0) {
                callback(MsgCode.FAILED, []);
                return;
            }
            callback(MsgCode.SUCCESS, rows);
        });
    });
}

exports.FreezeIP = (accountid, callback) => {
    var sql = `SELECT login_ip FROM qy_account WHERE accountid = '${accountid}';`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            throw err;
        }
        if (rows.length == 0) {
            callback(MsgCode.FAILED);
            return;
        }
        let fip = rows[0].login_ip;
        sql = `SELECT * FROM ip_frozen WHERE frozenip = '${fip}';`;
        query(sql, function (err, rows, fields) {
            if (err) {
                callback(MsgCode.FAILED);
                throw err;
            }
            if (rows.length > 0) {
                callback(MsgCode.SUCCESS, 0);
                return;
            }
            sql = `INSERT INTO ip_frozen(accountid, frozenip, frozentime) VALUES('${accountid}', '${fip}', NOW());`;
            query(sql, function (err, rows, fields) {
                if (err) {
                    callback(MsgCode.FAILED);
                    throw err;
                }
                callback(MsgCode.SUCCESS, fip);
            });
        });

    });
}

exports.getFrozenMacList = (callback) => {
    var sql = `SELECT mac FROM mac_frozen;`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED, []);
            throw err;
        }
        if (rows.length == 0) {
            callback(MsgCode.FAILED, []);
            return;
        }
        callback(MsgCode.SUCCESS, rows);
    });
}

exports.clearFrozenMacTabel = (callback) => {
    let sql = `truncate mac_frozen;`
    query(sql, (err, rows, fields) => {
        if (err) {
            throw err;
        }
        callback(MsgCode.SUCCESS, rows);
    });
};

exports.getFrozenMacRoleid = (mac, callback) => {

    var sql = `SELECT accountid FROM qy_account WHERE mac = '${mac}';`;

    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED, []);
            throw err;
        }
        if (rows.length == 0) {
            callback(MsgCode.FAILED, []);
            return;
        }

        let accounts = '';
        for (const id of rows) {
            accounts = accounts + id.accountid + ',';
        }
        accounts = accounts.substr(0, accounts.length - 1); //.splice(-1);

        sql = `SELECT roleid FROM qy_role WHERE accountid in (${accounts});`;
        query(sql, function (err, rows, fields) {
            if (err) {
                callback(MsgCode.FAILED, []);
                throw err;
            }
            if (rows.length == 0) {
                callback(MsgCode.FAILED, []);
                return;
            }
            callback(MsgCode.SUCCESS, rows);
        });


    });
}

exports.FreezeMAC = (info, callback) => {
    let accountid = info.accountid;
    let gmroleid = info.gmroleid;

    var sql = `SELECT mac FROM qy_account WHERE accountid = '${accountid}';`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            throw err;
        }
        if (rows.length == 0) {
            callback(MsgCode.FAILED);
            return;
        }
        let mac = rows[0].mac;
        sql = `SELECT * FROM mac_frozen WHERE mac = '${mac}';`;
        query(sql, function (err, rows, fields) {
            if (err) {
                callback(MsgCode.FAILED);
                throw err;
            }
            if (rows.length > 0) {
                //暂时改为
                callback(MsgCode.SUCCESS, mac);
                return;
            }
            sql = `INSERT INTO mac_frozen(GM, mac, time) VALUES('${gmroleid}', '${mac}', NOW());`;
            query(sql, function (err, rows, fields) {
                if (err) {
                    callback(MsgCode.FAILED);
                    throw err;
                }
                callback(MsgCode.SUCCESS, mac);
            });
        });

    });

}

exports.GetServerListByAccountId = (accountid, callback) => {
    var sql = `SELECT * FROM qy_role WHERE accountid = ${accountid};`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            throw err;
        }
        callback(MsgCode.SUCCESS, rows);
    });
}

exports.InsertRole = (roleInfo, callback) => {
    var sql = `SELECT * FROM qy_role WHERE (accountid = '${roleInfo.accountid}' OR name = '${roleInfo.name}') AND serverid = '${roleInfo.serverid}';`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            throw err;
        }
        if (rows.length > 0) {
            if (rows[0].name == roleInfo.name) {
                callback(MsgCode.ROLE_NAME_EXIST);
            } else {
                callback(MsgCode.FAILED);
            }
        }
        if (rows.length == 0) {
            sql = `INSERT INTO qy_role(name, race, sex, level, resid, mapid, x, y, create_time, accountid, serverid,money,taskstate) VALUES('${roleInfo.name}', '${roleInfo.race}','${roleInfo.sex}',1,'${roleInfo.resid}',1010,-1,-1, NOW(),'${roleInfo.accountid}','${roleInfo.serverid}',0,'[]' );`;
            query(sql, function (err, rows, fields) {
                if (err) {
                    callback(MsgCode.FAILED);
                    throw err;
                }
                if (rows.length == 0) {
                    callback(MsgCode.FAILED);
                    return;
                }
                callback(MsgCode.SUCCESS, rows.insertId);
            });
        }
    })
}

exports.ChangeName = (info, callback) => {
    var sql = `SELECT * FROM qy_role WHERE name = '${info.name}';`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            throw err;
        }
        if (rows.length > 0) {
            callback(MsgCode.ROLE_NAME_EXIST);
        }
        if (rows.length == 0) {
            sql = `UPDATE qy_role SET name = '${info.name}' WHERE roleid = ${info.roleid};`;
            query(sql, function (err, rows, fields) {
                if (err) {
                    callback(MsgCode.FAILED);
                    throw err;
                }
                callback(MsgCode.SUCCESS);
            });
        }
    })
}

function updateLastOnlineTime(roleid) {
    var sql = `UPDATE qy_role SET lastonline = FROM_UNIXTIME(${Math.ceil(gTime / 1000)}) WHERE roleid =${roleid};`;
    query(sql, function (err, rows, fields) {
        if (err) {
            throw err;
        }
    })
}
exports.updateLastOnlineTime = updateLastOnlineTime;

exports.GetRoleByAccountId = (accountid, callback) => {
    var sql = `SELECT * FROM qy_role WHERE accountid = ${accountid} AND serverid = ${SERVER_ID};`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            throw err;
        }

        if (rows.length > 0) {
            let role = rows[0];
            // updateLastOnlineTime(role.roleid)
            role.equipdata = {};
            sql = `SELECT * FROM qy_equip_${SERVER_ID} WHERE RoleID = ${role.roleid} AND state != 0;`;
            query(sql, function (err, rows, fields) {
                if (err) {
                    callback(MsgCode.SUCCESS, role);
                    throw err;
                }
                for (const info of rows) {
                    role.equipdata[info.EquipID] = info;
                }
                callback(MsgCode.SUCCESS, role);
            });
        } else {
            callback(MsgCode.FAILED);
        }
    });
}

let loginByRoleid = (roleid, callback) => {
    let sql = `SELECT qy_account.safecode, qy_role.* FROM qy_account, qy_role WHERE qy_role.roleid = ${roleid} and qy_account.accountid = qy_role.accountid;`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            throw err;
        }

        if (rows.length > 0) {
            let role = rows[0];

            role.equipdata = {};
            sql = `SELECT * FROM qy_equip_${SERVER_ID} WHERE RoleID = ${role.roleid} AND state != 0;`;
            query(sql, function (err, rows, fields) {
                if (err) {
                    callback(MsgCode.SUCCESS, role);
                    throw err;
                }
                for (const info of rows) {
                    role.equipdata[info.EquipID] = info;
                }
                callback(MsgCode.SUCCESS, role);
            });
        } else {
            callback(MsgCode.FAILED);
        }
    });
};

exports.loginByRoleid = loginByRoleid;

let getRoleByRoleId = (roleid, callback) => {
    let sql = `SELECT * FROM qy_role WHERE roleid = ${roleid};`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            throw err;
        }
        if (rows.length <= 0) {
            callback(MsgCode.FAILED);
            return;
        }
        let roleinfo = rows[0];
        callback(MsgCode.SUCCESS, roleinfo);
    });
}

exports.getRoleByRoleId = getRoleByRoleId;


exports.SavePlayerInfo = (roleid, roleinfo, callback) => {
    if (callback == null) callback = nop;
    let addpoint = JSON.stringify(roleinfo.addpoint);
    let pet = roleinfo.pet;
    // let equipstr = JSON.stringify(roleinfo.equiplist);
    let bagitem = JSON.stringify(roleinfo.bagitem);
    let taskstate = JSON.stringify(roleinfo.taskstate);
    let partnerlist = roleinfo.partnerlist;
    let lockeritem = JSON.stringify(roleinfo.lockeritem);
    let skill = JSON.stringify(roleinfo.skill);
    let relivelist = JSON.stringify(roleinfo.relivelist);
    let money = roleinfo.money;
    let jade = roleinfo.jade;
    let exp = roleinfo.exp;
    let level = roleinfo.level;
    let relive = roleinfo.relive;
    let sex = roleinfo.sex;
    let resid = roleinfo.resid;
    let race = roleinfo.race;
    let xiulevel = roleinfo.xiulevel;
    let xiupoint = JSON.stringify(roleinfo.xiupoint);
    let shane = roleinfo.shane;
    let flag = roleinfo.flag;
    let level_reward = roleinfo.level_reward;
    let rewardrecord = roleinfo.rewardrecord;
    let getgift = roleinfo.getgift;
    let shuilu = JSON.stringify(roleinfo.shuilu);
    let color = JSON.stringify(roleinfo.color);
    let active_scheme_name = roleinfo.active_scheme_name;
    let friendlist = JSON.stringify(roleinfo.friendlist);
    let star = roleinfo.star;

    let sql = `UPDATE qy_role SET mapid = ${roleinfo.mapid}, x = ${roleinfo.x}, y = ${roleinfo.y}, bangid = ${roleinfo.bangid},
                addpoint = '${addpoint}', pet = ${pet}, equiplist = NULL, bagitem = '${bagitem}', star = '${star}',
                lockeritem = '${lockeritem}',taskstate = '${taskstate}', sex = ${sex}, resid = ${resid}, friendlist = '${friendlist}',
                partnerlist = '${partnerlist}', skill = '${skill}', relivelist = '${relivelist}', race = ${race},state = ${flag},
                money =${money}, jade = ${jade}, exp = ${exp}, level = ${level}, xiulevel = ${xiulevel}, xiupoint = '${xiupoint}',
				rewardrecord = ${rewardrecord}, getgift = ${getgift}, shuilu = '${shuilu}', title = '${roleinfo.titles}', color = '${color}',
                relive = ${relive}, shane = ${shane}, level_reward = '${level_reward}',active_scheme_name = '${active_scheme_name}', lastonline = FROM_UNIXTIME(${Math.ceil(gTime / 1000)})
                WHERE roleid = ${roleid};`;
    sql += roleinfo.equipinfo;

    query(sql, (err, rows, fields) => {
        if (err) {
            callback(MsgCode.FAILED);
            throw err;
        }
		callback(MsgCode.SUCCESS);
    });
};


let getFriends = (roleid, callback) => { //state=1 已验证的好友  state=0未验证的好友
    var sql = `SELECT * FROM qy_friends WHERE ((roleidA = '${roleid}' OR roleidB = '${roleid}') AND state = 1) OR (roleidB = '${roleid}' AND state = 0);`;
    let friendsList = [];
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED, friendsList);
            throw err;
        }

        if (Array.isArray(rows) == false) {
            callback(MsgCode.FAILED, friendsList);
        }

        if (rows.length <= 0) {
            callback(MsgCode.FAILED, friendsList);
        } else {
            for (const info of rows) {
                if (info.roleidA == roleid) {
                    friendsList.push({
                        friendid: info.id,
                        roleid: info.roleidB,
                        name: info.nameB,
                        resid: info.residB,
                        relive: info.reliveB,
                        level: info.levelB,
                        race: info.raceB,
                        sex: info.sexB,
                        accountid: info.accountidB,
                        state: info.state,
                    });
                } else if (info.roleidB == roleid) {
                    friendsList.push({
                        friendid: info.id,
                        roleid: info.roleidA,
                        name: info.nameA,
                        resid: info.residA,
                        relive: info.reliveA,
                        level: info.levelA,
                        race: info.raceA,
                        sex: info.sexA,
                        accountid: info.accountidA,
                        state: info.state,
                    });
                }
            }
            callback(MsgCode.SUCCESS, friendsList);
        }
    });
}
exports.getFriends = getFriends;

exports.updateFriends = (friendid, roleid, operation, callback) => { //operation 0：删除 1：同意 2：拒绝 3：全部同意 4：全部拒绝
    var sql = `UPDATE qy_friends SET state = '1' WHERE id =${friendid};`;
    if (operation == 0 || operation == 2) {
        sql = `DELETE FROM qy_friends WHERE id =${friendid};`;
    } else if (operation == 3) {
        sql = `UPDATE qy_friends SET state = '1' WHERE roleidB =${roleid};`;
    } else if (operation == 4) {
        sql = `DELETE FROM qy_friends WHERE roleidB = ${roleid} AND state = 0;`;
    }
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED, []);
            throw err;
        }
        getFriends(roleid, callback);
    });
}


exports.searchRoles = (info, callback) => {
    var sql = `SELECT serverid, level FROM qy_role WHERE roleid = ${info.roleid}`;
    let playerList = [];
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED, playerList);
            throw err;
        }
        if (rows.length <= 0) {
            callback(MsgCode.FAILED, playerList);
        } else {
            let serverid = rows[0].serverid;
            sql = `SELECT * FROM qy_role WHERE serverid = ${serverid} AND roleid != ${info.roleid} AND (name LIKE '%${info.data}%' OR roleid = '${info.data}') AND (SELECT COUNT(1) FROM qy_friends WHERE (qy_friends.roleidA = ${info.roleid} AND qy_friends.roleidB = qy_role.roleid) OR (qy_friends.roleidB = ${info.roleid} AND qy_friends.roleidA = qy_role.roleid)) = 0 ORDER BY RAND() LIMIT 10;`;
            if (info.type == 0) {
                let maxLevel = rows[0].level + 30;
                let minLevel = rows[0].level - 30;
                sql = `SELECT * FROM qy_role WHERE serverid = ${serverid} AND roleid != ${info.roleid} AND level > ${minLevel} AND level < ${maxLevel} AND (SELECT COUNT(1) FROM qy_friends WHERE (qy_friends.roleidA = ${info.roleid} AND qy_friends.roleidB = qy_role.roleid) OR (qy_friends.roleidB = ${info.roleid} AND qy_friends.roleidA = qy_role.roleid)) = 0 ORDER BY RAND() LIMIT 10;`;
            }

            query(sql, function (err, rows, fields) {
                if (err) {
                    callback(MsgCode.FAILED, playerList);
                    throw err;
                }

                if (rows.length <= 0) {
                    callback(MsgCode.FAILED, playerList);
                } else {
                    for (const info of rows) {
                        playerList.push({
                            roleid: info.roleid,
                            name: info.name,
                            resid: info.resid,
                            level: info.level,
                            relive: info.relive,
                            race: info.race,
                            sex: info.sex,
                        });
                    }
                    callback(MsgCode.SUCCESS, playerList);
                }
            });
        }
    });
}

exports.addFriends = (pinfo, callback) => {
    if (pinfo.roleidA == pinfo.roleidB) {
        callback(MsgCode.FAILED);
        return;
    }

    var sql = `SELECT * FROM qy_friends WHERE (roleidA = '${pinfo.roleidA}' AND roleidB = '${pinfo.roleidB}') OR (roleidA = '${pinfo.roleidB}' AND roleidB = '${pinfo.roleidA}');`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            throw err;
        }

        if (Array.isArray(rows) == false) {
            callback(MsgCode.FAILED);
        }

        if (rows.length > 0) {
            callback(MsgCode.FAILED);
        } else {
            let roleinfoA = {};
            let roleinfoB = {};
            getRoleByRoleId(pinfo.roleidA, (ret, dbdata) => {
                if (ret == MsgCode.SUCCESS) {
                    roleinfoA = dbdata;
                    getRoleByRoleId(pinfo.roleidB, (ret, dbdata) => {
                        if (ret == MsgCode.SUCCESS) {
                            roleinfoB = dbdata;
                            let sql = `INSERT INTO qy_friends(roleidA, nameA, residA, reliveA, levelA, raceA, sexA, accountidA, roleidB, nameB, residB, reliveB, levelB, raceB, sexB, accountidB, state, time) VALUES('${roleinfoA.roleid}', '${roleinfoA.name}', '${roleinfoA.resid}', '${roleinfoA.relive}', '${roleinfoA.level}', '${roleinfoA.race}', '${roleinfoA.sex}', '${roleinfoA.accountid}', '${roleinfoB.roleid}', '${roleinfoB.name}', '${roleinfoB.resid}', '${roleinfoB.relive}', '${roleinfoB.level}', '${roleinfoB.race}', '${roleinfoB.sex}', '${roleinfoB.accountid}', 0, NOW());`;
                            query(sql, function (err, rows, fields) {
                                if (err) {
                                    callback(MsgCode.FAILED);
                                    throw err;
                                }
                                callback(MsgCode.SUCCESS);
                            });
                        } else {
                            callback(ret);
                        }
                    });
                } else {
                    callback(ret);
                }
            });
        }
    });
}

exports.updateBang = (bangInfo, callabck) => {
    let sql = `UPDATE qy_bang SET rolenum = ${bangInfo.rolenum} WHERE bangid =${bangInfo.bangid};`;
    query(sql, function (err, rows, fields) {
        if (err) {
            throw err;
        }
        if (callabck) {
            callabck();
        }
    });
}

exports.updateBangBidding = (bangid, bidding) => {
    let sql = `UPDATE qy_bang SET bidding = ${bidding} WHERE bangid =${bangid};`;
    query(sql, function (err, rows, fields) {});
}

exports.deleteBang = (bangid) => {
    let sql = `UPDATE qy_bang SET state = 0 WHERE bangid =${bangid};`;
    query(sql, function (err, rows, fields) {
        if (err) {
            throw err;
        }
    });
    // var sql = `DELETE FROM qy_bang WHERE bangid = ${bangid};`;
    // query(sql, function (err, rows, fields) {
    //     if (err) {
    //         throw err;
    //     }
    // });
}

exports.getBangList = (callback) => {
    let sql = `SELECT * FROM qy_bang WHERE state = 1 and serverid = ${SERVER_ID};`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            throw err;
        }
        // if (rows.length == 0) {//没有帮派信息
        //     callback(MsgCode.FAILED);
        //     return;
        // }
        callback(MsgCode.SUCCESS, rows);
    });
}

exports.getBangRoles = (callback) => {
    let sql = `SELECT roleid, name, resid, relive, level, race, sex, bangid FROM qy_role WHERE bangid <> 0 AND serverid = ${SERVER_ID};`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            throw err;
        }
        let tlist = {};
        for (const info of rows) {
            if (tlist[info.bangid] == null) {
                tlist[info.bangid] = [];
            }
            tlist[info.bangid].push(info);
        }
        callback(MsgCode.SUCCESS, tlist);
    });
}

exports.updatePlayerBangID = function (roleid, bangid, callback) {
    if (callback == null) {
        callback = nop;
    }
    let sql = `UPDATE qy_role SET bangid = ${bangid} WHERE roleid = ${roleid}`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            console.log(sql);
            throw err;
        }
    });
}

exports.getBangMaxId = (callback) => {
    let sql = `SELECT MAX(bangid) AS bangId FROM qy_bang WHERE serverid = ${SERVER_ID};`;
    query(sql, (err,rows) => {
        if(err) {
            callback(MsgCode.FAILED);
            console.log('ERROR', err);
            throw err;
        }

        callback(MsgCode.SUCCESS,rows[0].bangId);
    });
}

exports.createBang = (bangInfo, callback) => {
    let sql = `INSERT INTO qy_bang(bangid,name, aim, masterid, mastername, createtime, state, serverid) 
        VALUES(${bangInfo.bangid},'${bangInfo.name}', '${bangInfo.aim}','${bangInfo.masterid}','${bangInfo.mastername}', NOW(), 1, ${SERVER_ID});`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            console.log('ERROR', sql);
            throw err;
        }
        if (rows.length == 0) {
            callback(MsgCode.FAILED);
            return;
        }
        callback(MsgCode.SUCCESS, rows.insertId);
    });
    // })
}

exports.createPet = (petInfo, callback) => {
    let sql = `INSERT INTO qy_pet_${SERVER_ID}(petid, name, resid, dataid, grade, roleid, rate, hp, mp, atk, spd, wuxing, create_time) VALUES(${petInfo.petid}, '${petInfo.name}', ${petInfo.resid}, ${petInfo.dataid}, ${petInfo.grade}, ${petInfo.ownid}, ${petInfo.rate}, ${petInfo.hp}, ${petInfo.mp}, ${petInfo.atk}, ${petInfo.spd}, '${petInfo.wuxing}', NOW());`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            console.log(sql);
            throw err;
        }
        callback(MsgCode.SUCCESS)
    });
}

exports.getPetList = (roleid, callback) => {
    let sql = `SELECT * FROM qy_pet_${SERVER_ID} WHERE roleid = ${roleid} and state = 1 limit ${limitPetNum}`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            console.log(sql);
            throw err;
        }
        callback(MsgCode.SUCCESS, rows);
    });
}

exports.getPetByID = (petid, callback) => {
    let sql = `SELECT * FROM qy_pet_${SERVER_ID} WHERE petid = ${petid}`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            console.log(sql);
            throw err;
        }
        if (rows.length == 0) {
            callback(MsgCode.FAILED);
            return;
        }
        callback(MsgCode.SUCCESS, rows[0]);
    });
}

exports.delPet = (petid, callback) => {
    let sql = `UPDATE qy_pet_${SERVER_ID} SET state = 0, delete_time = NOW() WHERE petid =${petid};`;
    query(sql, function (err, rows, fields) {
        // if (err) {
        //     callback(MsgCode.FAILED);
        //     throw err;
        // }
    });
}

exports.SavePetInfo = (petid, petinfo, callback) => {
    let updatestr = '';
    for (const key in petinfo) {
        let value = petinfo[key];
        if (typeof (value) == 'number') {
            updatestr += `${key} = ${value}, `
        } else if (typeof (value) == 'string') {
            updatestr += `${key} = '${value}', `
        }
    }
    updatestr = updatestr.substr(0, updatestr.length - 2);

    let sql = `UPDATE qy_pet_${SERVER_ID} SET ${updatestr} WHERE petid = ${petid}`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            console.log(sql);
            throw err;
        }
        callback(MsgCode.SUCCESS);
    });
}

exports.getEquipMaxId = () => {
    let sql = `SELECT MAX(EquipID) AS equipid FROM qy_equip_${SERVER_ID};`;
    query(sql, function (err, rows, fields) {
        let equipMgr = require('../game/object/equip_mgr');
        equipMgr.setMaxEquipID(rows[0].equipid);
    });
}

exports.getPetMaxId = () => {
    let sql = `SELECT MAX(petid) AS petid FROM qy_pet_${SERVER_ID};`;
    query(sql, function (err, rows, fields) {
        let petMgr = require('../game/pet/pet_mgr');
        petMgr.setMaxPetSeed(rows[0].petid);
    });
}

exports.createEquip = (roleid, equiparr, callback) => {
    let equipMgr = require('../game/object/equip_mgr');
    let equipdata = equipMgr.getInsertData(equiparr, roleid);
    let sql = `INSERT INTO qy_equip_${SERVER_ID}(${equipdata.fieldstr}) VALUES(${equipdata.valuestr});`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            console.log(sql);
            throw err;
        }
        callback(MsgCode.SUCCESS);
    });
}

exports.getEquipByEquipID = (equipid, callback) => {
    let sql = `SELECT * FROM qy_equip_${SERVER_ID} WHERE EquipID = ${equipid};`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            console.log(sql);
            throw err;
        }
        if (rows.length == 0) {
            callback(MsgCode.FAILED);
            return;
        }
        callback(MsgCode.SUCCESS, rows[0]);
    });
}

exports.delEquip = (equipid, callback) => {
    let sql = `UPDATE qy_equip_${SERVER_ID} SET state = 0, delete_time = NOW() WHERE EquipID =${equipid};`;
    query(sql, function (err, rows, fields) {
        // if (err) {
        //     callback(MsgCode.FAILED);
        //     throw err;
        // }
    });
}

exports.SaveEquipInfo = (equipid, savedata, callback) => {
    let numlist = ['pos', 'Grade', 'Type', 'GemCnt', 'EIndex'];
    let updatestr = '';
    for (const key in savedata) {
        if (numlist.indexOf(key) == -1) {
            updatestr += `${key} = '${savedata[key]}', `
        } else {
            updatestr += `${key} = ${savedata[key]}, `
        }
    }
    updatestr = updatestr.substr(0, updatestr.length - 2);

    let sql = `UPDATE qy_equip_${SERVER_ID} SET ${updatestr} WHERE EquipID = ${equipid}`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            console.log(sql);
            throw err;
        }
        callback(MsgCode.SUCCESS);
    });
}

exports.dbGETWX = (callback) => {
    sql = `SELECT * FROM qy_wx`;
    query(sql, function (err, rows, fields) {
        if (err) {
            console.log(sql);
            return
        }
        callback(true, rows);
    });
}

exports.getPet = (roleid) => {
    sql = `UPDATE qy_role SET getpet = 1 WHERE roleid =${roleid}`;
    query(sql, function (err, rows, fields) {
        if (err) {
            console.log('ERROR', err);
            console.log(sql);
            return
        }
    });
}

/*
 * 创建订单
 * @param orderid 订单id
 * @param roleid 角色id
 * @param money 人民币
 * @param jade 仙玉
 * @param count 物品个数
 * @param goodsid 货物id
 * @param activitystates 充值活动的开启状态 
 * @param callback 回调
 */
exports.createChargeOrder = (orderid, roleid, money, jade, count, goodsid, activitystates, callback) => {
    getRoleByRoleId(roleid, (errcode, role) => {
        if (errcode == MsgCode.SUCCESS) {
            let server_id = role.serverid;
			if (activitystates[server_id] && activitystates[server_id].state == 1) { // 双倍活动 
				jade *= 2;
			}
            let sql = `insert into charge_record (orderid, roleid, money, jade, goodscount, goodsid, create_time, serverid) values ('${orderid}', ${roleid}, ${money}, ${jade}, ${count}, ${goodsid}, NOW(), ${server_id});`;
            query(sql, (err, packet) => {
                if (err) {
                    callback(false);
                    console.log(sql);
                    throw (err);
                } else
                    callback(true);
            });
        } else
            callback(false);
    });
};

/*
 * 是否能完成订单
 * @param orderid 订单号
 */
exports.canFinishOrder = (orderid, money, callback) => {
    query(`select * from charge_record where finish_time is null and orderid = '${orderid}';`, (err, rows) => {
        if (err) {
            console.log(`查询订单${orderid}失败！`);
            callback(false);
            throw (err);
        }
        if (rows.length == 0) {
            console.log(`未查询到订单${orderid}!`);
            callback(false);
        } else {
            if (rows[0].money == money) {
                callback(true, rows[0]);
            } else {
                query(`update charge_record set finish_time = now(), realmoney = ${money}, status = 0 where orderid = '${orderid}';`, ret => {});
                console.log(`订单${orderid}充值金额错误！`);
            }
        }
    });
};

/*
 * 完成订单
 * @param orderid 订单号
 */
exports.finishOrder = (orderid, callback) => {
    query(`select * from charge_record where finish_time is null and orderid = '${orderid}';`, (err, rows) => {
        if (err) {
            console.log(`完成订单${orderid}失败，查询订单错误！`);
            callback(false);
            throw (err);
        }
        if (rows.length == 0) {
            console.log(`完成订单${orderid}失败，未找到订单！`);
            callback(false);
        } else {
            let roleid = rows[0].roleid;
            let jade = rows[0].jade;
            let money = rows[0].money;
            query(`update charge_record set finish_time = NOW(), realmoney = money, status = 1 where orderid = '${orderid}' and finish_time is null;`, (err, packet) => {
                if (err) {
                    console.log(`完成订单${orderid}时失败！`);
                    callback(false);
                    throw (err);
                }
                if (packet.affectedRows == 0) {
                    console.log(`完成订单${orderid}时失败！`);
                    callback(false);
                } else {
                    query(`update qy_role set jade = jade + ${jade}, chargesum = chargesum + ${money} where roleid = ${roleid};`, (err) => {
                        if (err) {
                            console.log(`订单${orderid}充值加金币失败！`);
                            callback(false);
                            throw (err);
                        }
                        console.log(`玩家${roleid}充值${jade}仙玉成功，订单${orderid}！`);
                        callback(true);
                    });
                }
            });
        }
    });
};

/*
 * 领取充值奖励
 * @param roleid 角色id
 * @param id 充值奖励列表id
 */
/* exports.gainChargeReward = (roleid, id, callback) => {
	let num = 1<<(id-1);
	query(`update qy_role set rewardrecord = rewardrecord | ${num} where roleid = ${roleid};`, (err, packet) => {
		if (err) {
			callback(false);
			throw(err);
		}
		callback(packet.affectedRows == 1);
	});
}; */

exports.setOrderFinish = (orderid, callback) => {
    query(`update charge_record set finish_time = NOW(), realmoney = money, status = 1 where orderid = '${orderid}';`, (err, packet) => {
        if (err) {
            console.log(`订单${orderid}设置完成状态时失败！`);
            callback(false);
            throw (err);
        }
        if (packet.affectedRows == 0) {
            console.log(`订单${orderid}设置完成状态时失败！`);
            callback(false);
        } else {
            console.log(`订单${orderid}成功设置完成状态！`);
            callback(true);
        }
    });
};

exports.fixEquip = () => {
    let sql = 'SELECT * from qy_role';
    query(sql, (err, rows) => {
        if (err) {
            callback(false);
            throw (err);
        }

        let run = () => {
            let roleinfo = rows.shift();
            if (roleinfo == null) {
                console.log('well done!');
                return;
            }
            let eplist = JSON.parse(roleinfo.equiplist);
            if (eplist == null) {
                run();
                return;
            }
            let upsql = `update qy_equip_${SERVER_ID} set RoleID = ${roleinfo.roleid} where EquipID in `;

            let equips = '';
            let keys = Object.keys(eplist.use);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const equipid = eplist.use[key];
                // upsql +=  + ' where EquipID=' + equipid + ';\n';
                if (i == 0) {
                    equips = '(';
                }
                equips += (equipid + ((i == keys.length - 1) ? ')' : ','));
            }

            if (eplist.list.length > 0) {
                equips += ' or EquipID in ';
                for (let i = 0; i < eplist.list.length; i++) {
                    const equipid = eplist.list[i];
                    if (i == 0) {
                        equips = '(';
                    }
                    equips += (equipid + ((i == eplist.list.length - 1) ? ')' : ','));
                }
            }
            if (equips.length > 0) {
                upsql += equips;
                query(upsql, (uperror, rows) => {
                    if (uperror) {
                        console.log('equip error', roleinfo.roleid, upsql);
                        throw (uperror);
                    }
                    run();
                });
            } else {
                run();
            }

        }
        run();
    });
}

/*
 * 游戏loading界面notice
 */
exports.getConfigInfo = (callback) => {
    let sql = 'SELECT * FROM qy_info;'
    query(sql, (err, rows) => {
        callback(rows);
    });
}

exports.setNotice = (text) => {
    let sql = `UPDATE qy_info SET comment = '${text}';`;
    query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
    });
}

exports.setGuideServerID = (id) => {
    let sql = `UPDATE qy_info SET guideid = '${id}';`;
    query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
    });
}

exports.setGuideServerID = (id) => {
    let sql = `UPDATE qy_info SET guideid = '${id}';`;
    query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
    });
}

exports.setShuilu = (sid, lid) => {
    let sql = `UPDATE qy_info SET shuilusid = ${sid}, shuilulid = ${lid};`;
    query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
    });
}

/*
 * 游戏内notice
 */
exports.getScrollNotice = (serverid, limit, callback) => {
    let sql = `select text, type from qy_notice where serverid = ${serverid} or serverid = 0 order by time desc limit ${limit};`;
    query(sql, (err, rows) => {
        if (err) {
            callback(false);
            throw err;
        }
        callback(true, rows);
    });
};

exports.addScrollNotice = (serverid, type, text, callback) => {
    let sql = `insert into qy_notice (text, type, serverid, time) values ('${text}', ${type}, ${serverid}, NOW());`;
    callback = (callback) ? callback : nop;
    query(sql, (err, rows) => {
        if (err) {
            callback(false);
            throw (err);
        }
        callback(true);
    });
};


/*
 * 关系（结拜，夫妻等）
 */

exports.createRelation = (sqlData, callback) => {
    let sql = `insert into qy_relation (relationId,members, relationType, relationName, createTime,status) values (${sqlData.relationId},'${sqlData.members}', ${sqlData.relationType},'${sqlData.relationName}',  NOW(),${sqlData.status});`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            console.log(sql);
            throw err;
        }
        if (rows.length == 0) {
            callback(MsgCode.FAILED);
            return;
        }
        callback(MsgCode.SUCCESS, rows.insertId);
    });

};


exports.queryAllRelations = (callback) => {
    let sql = `select * from qy_relation where status = 0`;
    query(sql, function (err, rows) {
        if (err) {
            callback(MsgCode.FAILED);
            throw err;
        }
        callback(MsgCode.SUCCESS, rows);
    });
}


exports.deleteRelationById = (sqlData,callback) => {// status 0 正常 -1 已删除
    //var sql = `DELETE FROM qy_relation WHERE relationId =${relationId};`;
    var sql = `select * from qy_relation where relationId = ${sqlData.relationId}`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            throw err;
        }
        if (rows.length > 0) {
            sql = `update qy_relation set status = -1,deleteTime = NOW() where relationId = ${sqlData.relationId};`;
            query(sql, function (err, rows, fields) {
                if (err) {
                    callback(MsgCode.FAILED, []);
                    console.log('ERROR', err);
                    throw err;
                }
                callback(MsgCode.SUCCESS, []);
            });

        }else{
            sql = `insert into qy_relation (relationId, members, relationType, relationName, createTime,status,deleteTime) values (${sqlData.relationId},'${sqlData.members}', ${sqlData.relationType},'${sqlData.relationName}',  NOW(),${sqlData.status}, NOW());`;
            query(sql, function (err, rows, fields) {
                if (err) {
                    callback(MsgCode.FAILED);
                    console.log(sql);
                    throw err;
                }
                if (rows.length == 0) {
                    callback(MsgCode.FAILED);
                    return;
                }
                callback(MsgCode.SUCCESS, rows.insertId);
            });
        }
    });
}


exports.updateRelationMembersById = (info, callback) => {
    var sql = `select * from qy_relation where relationId = ${info.relationId};`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            throw err;
        }
        if (rows.length > 0) {
            sql = `update qy_relation set members = '${info.members}' where relationId = ${info.relationId};`;
            query(sql, function (err, rows, fields) {
                if (err) {
                    callback(MsgCode.FAILED);
                    throw err;
                }
                callback(MsgCode.SUCCESS);
            });
        }else{
            sql = `insert into qy_relation (relationId, members, relationType, relationName, createTime,status) values (${info.relationId},'${info.members}', ${info.relationType},'${info.relationName}',  NOW(),${info.status});`;
            query(sql, function (err, rows, fields) {
                if (err) {
                    callback(MsgCode.FAILED);
                    console.log(sql);
                    throw err;
                }
                if (rows.length == 0) {
                    callback(MsgCode.FAILED);
                    return;
                }
                callback(MsgCode.SUCCESS, rows.insertId);
            });
        }
    })
}

exports.getRelationById = (id, callback) => {
    let sql = `select * from qy_relation where relationId = ${id}`;
    query(sql, (err, rows) => {
        if (err) {
            callback(false);
            throw err;
        }

        callback(true, rows);
    });

}

exports.getRelationMaxId = (callback) => {
    let sql = `select max(relationId) as relationId from qy_relation;`;
    query(sql, (err,rows) => {
        if(err) {
            callback(MsgCode.FAILED);
            console.log('ERROR', err);
            throw err;
        }

        callback(MsgCode.SUCCESS,rows[0].relationId);
    });
}

exports.getSchemesByRoleId = (id,callback) => {
    let sql = `select * from qy_scheme where roleId = ${id}`;
    query(sql, (err,rows) => {
        if(err) {
            callback(false);
            throw err;
        }

        callback(MsgCode.SUCCESS,rows);
    });
}

exports.updateSchemeById = (info, callback) => {
    var sql = `select * from qy_scheme where schemeId = '${info.schemeId}';`;
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(MsgCode.FAILED);
            console.log('ERROR', err);
            throw err;
        }
        if (rows.length > 0) {
            sql = `update qy_scheme set schemeName = '${info.schemeName}',content = '${info.content}',status = ${info.status} where schemeId = '${info.schemeId}';`;
            query(sql, function (err, rows, fields) {
                if (err) {
                    callback(MsgCode.FAILED);
                    console.log('ERROR', err);
                    throw err;
                }
                callback(MsgCode.SUCCESS);
            });
        }else{
            sql = `insert into qy_scheme(schemeId,roleId,schemeName,content,status) values (${info.schemeId},${info.roleId},'${info.schemeName}','${info.content}',${info.status});`;
            query(sql, function (err, rows, fields) {
                if (err) {
                    callback(MsgCode.FAILED);
                    console.log('ERROR', err);
                    throw err;
                }
                callback(MsgCode.SUCCESS,rows.insertId,1);
            });
        }
    })
}

exports.getSchemeMaxId = (callback) => {
    let sql = `select max(schemeId) as schemeId from qy_scheme;`;
    query(sql, (err,rows) => {
        if(err) {
            callback(MsgCode.FAILED);
            console.log('ERROR', err);
            throw err;
        }

        callback(MsgCode.SUCCESS,rows[0].schemeId);
    });
}

exports.setSafecode = (accountid, safecode, callback) => {
	let sql = `update qy_account set safecode = '${safecode}' where accountid = ${accountid};`;
	query(sql, (err) => {
		if (err) {
			callback(MsgCode.FAILED);
			throw(err);
		}
		else {
			callback(MsgCode.SUCCESS);
		}
	});
}
