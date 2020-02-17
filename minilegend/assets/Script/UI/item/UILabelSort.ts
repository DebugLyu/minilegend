const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("ui/UILabelSort")
export default class UILabelSort extends cc.Component {
    start(){
        setTimeout(() => {
            this.reSort();
        }, 0);
    }

    reSort(){
        let nodes = this.node.children;
        nodes.sort((a, b) => {
            return a.x - b.x;
        });
        let sx = -this.node.width / 2;
        let cx = 0;
        for (const node of nodes) {
            node.x = sx - cx;
            cx = node.x + node.width + 5;
        }
    }
}