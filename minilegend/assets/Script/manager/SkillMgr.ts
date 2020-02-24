export interface SkillData {
    skillid: number,    // 技能id
    icon: string,   // 图标
    name: string,   // 名字
    mode: number,    // 攻击类型1物理攻击2魔法3道术
    selfeffect: number, // 自身特效
    enemyeffect: number,    // 敌人特效
    enemyeffectoffset: number,    // 敌人特效偏移
    flyeffect: number,  // 飞行特效
    flyspeed: number,   // 飞行速度
    bounce: number, // 弹射次数  墙壁 怪物之间等
    pierce: number, // 穿透次数
    cooldown: number,   // 冷却时间（秒）
    ailevel: number,    // ai优先级
    aitype: number, // ai类型1无限释放2目标无buff释放3血量低于50%释放
    range: number,  // 释放距离
    atktype: number,    // 攻击类型1单目标指向2单目标无指向3周围1格4目标及附近1格敌人
    leveldata: string,  // 等级数值
    desc: string,   // 简介
    type : number,  // 技能类型1加法攻击2乘法攻击
    subtype: number,    // 数值影响1攻击力2敌人防御力3自身受到伤害4定时掉血5自身血量6神兽伤害
}

export interface SkillLevelData {
    level: number, // 等级
    cisha: number, // 刺杀剑法
    gongsha: number, // 攻杀剑法
    banyue: number, // 半月剑法
    liehuo: number, // 烈火剑法
    huoqiu: number, // 火球术
    leidian: number, // 雷电术
    mofadun: number, // 魔法盾
    bingpaoxiao: number, // 冰咆哮
    huofu: number, // 灵魂火符
    shidu: number, // 施毒术
    zhiyu: number, // 治愈术
    shenshou: number, // 召唤神兽
}

class __skillMgr {
    private skillList: { [x: number]: SkillData } = {};
    private skillLevelList: {[x: number]: SkillLevelData} = {};
    private skillIconAtlas: cc.SpriteAtlas = null;

    async init() {
        let getRes = (await import("../common/gFunc")).getRes;
        let data = await getRes("/prop_data/prop_skill", cc.JsonAsset);
        let json = data.json;
        this.skillList = json;

        let skillleveldata = await getRes("/prop_data/prop_skilllevel", cc.JsonAsset);
        let skilllevel = skillleveldata.json;
        this.skillLevelList = skilllevel;

        let iconAtlas = await getRes("skillicon/skill", cc.SpriteAtlas);
        this.skillIconAtlas = iconAtlas;
    }

    // async init() {
	// 	let RootDir = (await import("../common/gFunc")).RootDir;
	// 	let data = require(RootDir("../app/prop_data/prop_item"));
	// 	this.itemList = data;
    // }
    
    getSkillData(skillid: number): SkillData | null{
        return this.skillList[skillid];
    }

    getAllSkills(){
        return this.skillList;
    }

    getSkillLevelData(skilldata: string, level: number): number;
    getSkillLevelData(skillid: number, level: number): number;
    getSkillLevelData(skillinfo: number | string, level: number): number {
        let leveldata = null;
        if (typeof skillinfo == "number"){
            let skilldata = this.getSkillData(skillinfo);
            if(skilldata == null){
                return null;
            }
            leveldata = skilldata.leveldata;
        } else if( typeof skillinfo == "string"){
            leveldata = skillinfo;
        }
        
        if (leveldata == null){
            return null;
        }
        let levelData = this.skillLevelList[level];
        if(!levelData){
            return null;
        }
        return levelData[leveldata];
    }

    getSkillIconSpriteFrame(sf: string){
        return this.skillIconAtlas.getSpriteFrame(sf);
    }
}

let skillMgr = new __skillMgr();
export default skillMgr;