import LivingCtr from "./LivingCtr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WarriorCtr extends LivingCtr {
    @property(cc.Node)
    roleNode: cc.Node = null;
    
    
}