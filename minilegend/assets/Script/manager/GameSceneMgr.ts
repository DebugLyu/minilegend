export default class GameSceneMgr {
    public static ChangeScene(scene): void {
        cc.director.preloadScene(scene, function () {
            // scene.sceneName = scene;
            cc.director.loadScene(scene, () => {
                cc.sys.garbageCollect();
            });
        });
    }
}
