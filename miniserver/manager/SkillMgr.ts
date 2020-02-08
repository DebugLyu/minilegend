/**
 * 技能模块
 *      攻击类技能 以3种方式为主 
 *          1 近战攻击：伤害远高于其他技能，攻速由自身速度决定
 *          2 远程直接伤害：如雷电术 没有飞行轨道，直接命中的，伤害一般
 *          3 远程飞行伤害：灵魂火符，火球术之类的，有飞行轨道，伤害看碰撞的，
 *                          伤害一般，但会在场景中弹射2次，后期可加入穿透。
 *      技能类型
 *          伤害类：雷电 火球
 *          buff类：魔法盾等
 *          debuff：施毒术等
 */

class SkillMgr {
    

    skillList:{[x:number]: string} = {}

    init() {

    }

    getSkill(skillid: number) {
        return this.skillList[skillid];
    }
}

let skillMgr = new SkillMgr();
export default skillMgr;