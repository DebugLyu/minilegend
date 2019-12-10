var file_fs = require('fs');
let MAP_RES_WIDTH = 5258;
let MAP_RES_HEIGHT = 2910;
let MENU_HEIGHT = 200;
let mapNodeSize = 512;
let gridWidth = 20;
let gridHeight = 20;
let canvasWidht = 1024;
let canvasHeight = 576;
let rowCount = Math.ceil(MAP_RES_HEIGHT / gridHeight);
let lineCount = Math.ceil(MAP_RES_WIDTH / gridWidth);
let borderCount = 1; //屏幕外的图片显示宽度
let mapInfoData = null;

cc.Class({
    extends: cc.Component,
    properties: {
        moveBtn: cc.Node,
        editBtn: cc.Node,
        scaleLab: cc.Label,
        sizeLab: cc.Label,

        homeTexture: {
            type: cc.Texture2D,
            default: null,
        },
        bigtowerTexture: {
            type: cc.Texture2D,
            default: null,
        },
        smalltowerTexture: {
            type: cc.Texture2D,
            default: null,
        },
        taskTexture: {
            type: cc.Texture2D,
            default: null,
        },
        netPointTexture: {
            type: cc.Texture2D,
            default: null,
        },

        buildingLayer: cc.Node,

        selfHero: cc.Node,

        posLab: cc.Label,
        posLab1: cc.Label,
        posLab2: cc.Label,
        inputLayer: cc.Node,
        inputEditbox: cc.EditBox,
        mapIdEditbox: cc.EditBox,
    },

    onLoad() {
        let self = this;

        let canvas = cc.find('Canvas');
        canvasWidht = canvas.width;
        canvasHeight = canvas.height;

        // cc.loader.loadRes("Map/prop_map", function (err, data) {
        //     mapInfoData = data.json;
        //     self.loadMap();
        // });
        this.buildingLayer.zIndex = 4;

        this.aStarNetPoint = [];
        this.aStarNetPath = [];

        this.width = cc.find('Canvas').width;
        this.height = cc.find('Canvas').height - MENU_HEIGHT;

        // cc.loader.loadResDir('npc', cc.SpriteFrame, function (err, assets) {
        //     let sprites = {}
        //     for (const spriteframe of assets) {
        //         sprites[spriteframe.name] = spriteframe;
        //     }
        //     self.npcAssets = sprites;
        //     self.showNPC();
        // });

        // this.showGrid();

        this.node.on(cc.Node.EventType.TOUCH_START, self.touchBegan.bind(self));
        this.node.on(cc.Node.EventType.TOUCH_MOVE, self.touchMoved.bind(self));

        this.brushType = 1;
        this.brushSize = 0;
        this.operationType = 0;
        this.mapScale = 1;

        this.selfHero.zIndex = 3;

        this.selfHeroLogic = this.selfHero.addComponent('HeroPlayer');
        this.selfHeroLogic.gridHeight = gridHeight;
        this.selfHeroLogic.gridWidth = gridWidth;
        this.selfHeroLogic.canvasHeight = canvasHeight;
        this.selfHeroLogic.canvasWidht = canvasWidht;

        this.inputType = -1;
        this.inputIndex = -1;
        this.npcInfo = {};
        this.mapNodeArr = [];
        // this.mapId = 0;
        this.map_res_name = '';
        this.mapIdEditbox.string = this.map_res_name;
    },

    start() {
        this.map = cc.find('Canvas/mapbg/map');
        let drawNode = new cc.Node();
        drawNode.parent = this.map;
        drawNode.zIndex = 3;
        this.draw = drawNode.addComponent(cc.Graphics);
    },

    loadMap(e, d) {
        // if (this.mapId != 0) {
        //     for (let yTileNum = 0; yTileNum < this.mapNodeArr.length; yTileNum++) {
        //         let list = this.mapNodeArr[yTileNum];
        //         for (let xTileNum = 0; xTileNum < list.length; xTileNum++) {
        //             if (list[xTileNum] == 1) {
        //                 this.map.getChildByName(this.mapresId + '_' + yTileNum + '_' + xTileNum).destroy();
        //                 this.mapNodeArr[yTileNum][xTileNum] = 0;
        //             }
        //         }
        //     }
        // }
        this.map_res_name = this.mapIdEditbox.string;

        // 加载地图资源
        cc.loader.loadRes(`Map/${this.map_res_name}`, cc.SpriteFrame, (err, spriteFrame) => {

            let mapNode = this.map;//new cc.Node();
            let mapframe = this.map.addComponent(cc.Sprite);
            mapframe.spriteFrame = spriteFrame;
            // mapNode.parent = cc.find('Canvas/mapbg/map');
            // mapNode.name = this.map_res_name;
            mapNode.setAnchorPoint(cc.v2(0, 0));
            mapNode.setPosition(-this.map.parent.width / 2, -this.map.parent.height / 2);

            this.scaleLab.string = Math.round(this.mapScale * 100) + '' + '%';
            this.map.setScale(this.mapScale);


            MAP_RES_WIDTH = mapNode.width;
            MAP_RES_HEIGHT = mapNode.height;
            rowCount = Math.ceil(MAP_RES_HEIGHT / gridHeight);
            lineCount = Math.ceil(MAP_RES_WIDTH / gridWidth);

            // this.mapNodeArr = []; //先声明一维
            // let maprow = Math.ceil(MAP_RES_HEIGHT / mapNodeSize);
            // let mapline = Math.ceil(MAP_RES_WIDTH / mapNodeSize);
            // for (var i = 0; i < maprow; i++) { //一维长度为20
            //     this.mapNodeArr[i] = new Array(mapline); //在声明二维
            //     for (var j = 0; j < mapline; j++) { //二维长度为20
            //         this.mapNodeArr[i][j] = 0;
            //     }
            // }

            this.gridInfoArr = []; //先声明一维
            for (var i = 0; i < rowCount; i++) { //一维长度为20
                this.gridInfoArr[i] = new Array(lineCount); //在声明二维
                for (var j = 0; j < lineCount; j++) { //二维长度为20
                    this.gridInfoArr[i][j] = 1;
                }
            }

            this.selfHeroLogic.gridHeight = gridHeight;
            this.selfHeroLogic.gridWidth = gridWidth;
            this.selfHeroLogic.canvasHeight = canvasHeight;
            this.selfHeroLogic.canvasWidht = canvasWidht;
            this.showGrid();
            this.updateMap(cc.v2(0, 0));
        });

        // if (mapInfoData == null) {
        //     return;
        // }
        // if (mapInfoData[this.mapId] == null) {
        //     return;
        // }
        // this.mapresId = mapInfoData[this.mapId].mapid;

        // MAP_RES_WIDTH = mapInfoData[this.mapId].width;
        // MAP_RES_HEIGHT = mapInfoData[this.mapId].height;
        // rowCount = Math.ceil(MAP_RES_HEIGHT / gridHeight);
        // lineCount = Math.ceil(MAP_RES_WIDTH / gridWidth);



        // this.npcInfo = {};
        // this.startPos = {
        //     x: -1,
        //     y: -1
        // };
        // let self = this;

        // cc.loader.loadRes(`Map/json/map_${this.mapresId}`, function (err, jsondata) {
        //     if (!err) {
        //         // var data = JSON.parse(tex);
        //         let data = jsondata.json;
        //         data.mapInfo && (self.gridInfoArr = data.mapInfo.slice(0));
        //         data.npcInfo && (self.npcInfo = data.npcInfo);
        //         data.startPos && (self.startPos = data.startPos);
        //     }
        //     self.showGrid();
        // });

        // cc.loader.loadResDir(`Map/jpg/${this.mapresId}`, cc.SpriteFrame, function (err, assets) {
        //     let sprites = {}
        //     for (const spriteframe of assets) {
        //         sprites[spriteframe.name] = spriteframe;
        //     }
        //     self.assets = sprites;
        //     // self.init();


        //     if (self.mapScale < canvasWidht / MAP_RES_WIDTH) {
        //         self.mapScale = canvasWidht / MAP_RES_WIDTH;
        //     }
        //     if (self.mapScale < canvasHeight / MAP_RES_HEIGHT) {
        //         self.mapScale = canvasHeight / MAP_RES_HEIGHT;
        //     }

        //     self.scaleLab.string = Math.round(self.mapScale * 100) + '' + '%';
        //     self.map.setScale(self.mapScale);
        //     self.updateMap(cc.v2(0, 0));
        // });

        // this.selfHeroLogic.gridHeight = gridHeight;
        // this.selfHeroLogic.gridWidth = gridWidth;
        // this.selfHeroLogic.canvasHeight = canvasHeight;
        // this.selfHeroLogic.canvasWidht = canvasWidht;
    },

    showGrid() {
        // var timestamp = new Date().getTime();
        // console.log('start_time:', timestamp);
        this.draw.clear();
        // this.draw.node.x = -this.map.width / 2; 
        // this.draw.node.y = -this.map.height / 2; 
        for (let yTileNum = 0; yTileNum < rowCount; yTileNum++) {
            for (let xTileNum = 0; xTileNum < lineCount; xTileNum++) {
                if (this.gridInfoArr[yTileNum][xTileNum] == 0) { //障碍
                    this.draw.fillColor = cc.color(255, 0, 0, 80);
                } else if (this.gridInfoArr[yTileNum][xTileNum] == 1) { //道路
                    this.draw.fillColor = cc.color(0, 255, 0, 25);
                } else if (this.gridInfoArr[yTileNum][xTileNum] == 2) { //遮挡
                    this.draw.fillColor = cc.color(0, 0, 0, 80);
                } else if (this.gridInfoArr[yTileNum][xTileNum] == 3) { //怪物中心点
                    this.draw.fillColor = cc.color(0, 0, 255, 120);
                } else if (this.gridInfoArr[yTileNum][xTileNum] == 4) { //怪物警戒点
                    this.draw.fillColor = cc.color(0, 255, 255, 80);
                } else if (this.gridInfoArr[yTileNum][xTileNum] == 5) {
                    this.draw.fillColor = cc.color(0, 0, 0, 200);
                } else if (this.gridInfoArr[yTileNum][xTileNum] == 9) {
                    this.draw.fillColor = cc.color(0, 0, 0, 255);
                    this.gridInfoArr[yTileNum][xTileNum] = 1;
                } else if (this.gridInfoArr[yTileNum][xTileNum] == -1) {
                    this.draw.fillColor = cc.color(0, 255, 0, 255);
                }
                this.draw.fillRect(xTileNum * gridWidth, yTileNum * gridHeight, gridWidth - 2, gridHeight - 2);
            }
        }
        // timestamp = new Date().getTime();
        // console.log('etart_time:', timestamp);
    },

    showNPC() {
        this.buildingLayer.removeAllChildren();
        for (const index in this.npcInfo) {
            if (this.npcInfo.hasOwnProperty(index)) {
                const element = this.npcInfo[index];
                this.addNPCIcon(element.x, element.y, this.npcAssets[element.id]);
            }
        }
    },

    addNPCIcon(x, y, frame) {
        let icon = new cc.Node();
        icon.setPosition(cc.v2(-canvasWidht / 2 + gridWidth / 2 + x * gridWidth, -canvasHeight / 2 + y * gridHeight));
        let sprite = icon.addComponent(cc.Sprite);
        sprite.spriteFrame = frame;
        icon.parent = this.buildingLayer;
        icon.setAnchorPoint(cc.v2(0.5, 0));
        icon.name = y * lineCount + x;
        return icon;
    },

    moveBtnClick(e, d) {
        this.operationType = 1;
        this.moveBtn.active = false;
        this.editBtn.active = true;
    },

    editBtnClick(e, d) {
        this.operationType = 0;
        this.moveBtn.active = true;
        this.editBtn.active = false;
    },

    fangfaBtnClick(e, d) {
        if (this.mapScale < 0.4 && this.mapScale > 0.2) {
            this.mapScale = 0.2;
        }
        this.mapScale += 0.2;

        if (this.mapScale < canvasWidht / MAP_RES_WIDTH) {
            this.mapScale = canvasWidht / MAP_RES_WIDTH;
        }
        if (this.mapScale < canvasHeight / MAP_RES_HEIGHT) {
            this.mapScale = canvasHeight / MAP_RES_HEIGHT;
        }

        this.mapScale = Math.round(this.mapScale * 100) / 100;
        if (this.mapScale > 5) {
            this.mapScale = 5;
            return;
        }
        this.scaleLab.string = Math.round(this.mapScale * 100) + '' + '%';
        this.map.setScale(this.mapScale);
        this.updateMap(cc.v2(0, 0));
    },

    suoxiaoBtnClick(e, d) {
        this.mapScale -= 0.2;
        if (this.mapScale < canvasWidht / MAP_RES_WIDTH) {
            this.mapScale = canvasWidht / MAP_RES_WIDTH;
        }
        if (this.mapScale < canvasHeight / MAP_RES_HEIGHT) {
            this.mapScale = canvasHeight / MAP_RES_HEIGHT;
        }
        this.mapScale = Math.round(this.mapScale * 100) / 100;
        if (this.mapScale < 0.2) {
            this.mapScale = 0.2;
            return;
        }
        this.scaleLab.string = Math.round(this.mapScale * 100) + '' + '%';
        this.map.setScale(this.mapScale);
        this.updateMap(cc.v2(0, 0));
    },

    fangfaBrushClick(e, d) {
        this.brushSize += 1;
        if (this.brushSize > 4) {
            this.brushSize = 4;
            return;
        }
        this.sizeLab.string = this.brushSize + 1;
    },

    suoxiaoBrushClick(e, d) {
        this.brushSize -= 1;
        if (this.brushSize < 0) {
            this.brushSize = 0;
            return;
        }
        this.sizeLab.string = this.brushSize + 1;
    },

    changeBrushType(e, d) {
        this.brushType = parseInt(d);
    },

    saveBtnClick(e, d) {
        if (cc.sys.isNative) {
            cc.log('---\n', JSON.stringify(this.gridInfoArr));
            // cc.log("Path:"+jsb.fileUtils.getWritablePath());  
            cc.log(jsb.fileUtils.writeStringToFile(JSON.stringify(this.gridInfoArr), jsb.fileUtils.getWritablePath() + 'mapdata.json'));
            // cc.log("fullPathForFilename:"+jsb.fileUtils.fullPathForFilename("resources/data.json"));  
        }


        if (cc.sys.isBrowser) {
            let saveInfo = {};
            saveInfo.datatype = "map";
            saveInfo.mapId = this.mapresId;
            saveInfo.baseInfo = {
                mapId: this.mapresId,
                width: MAP_RES_WIDTH,
                height: MAP_RES_HEIGHT,
                grid_width: gridWidth,
                grid_height: gridHeight,
                rows: rowCount,
                lines: lineCount,
            };
            saveInfo.mapInfo = this.gridInfoArr;
            saveInfo.npcInfo = this.npcInfo;
            saveInfo.startPos = this.startPos;
            let textFileAsBlob = new Blob([JSON.stringify(saveInfo)], {
                type: 'application/json'
            });
            let downloadLink = document.createElement("a");
            downloadLink.download = "map_" + this.mapresId + ".json";
            downloadLink.innerHTML = "Download File";
            if (window.webkitURL != null) {
                // Chrome allows the link to be clicked
                // without actually adding it to the DOM.
                downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
            } else {
                // Firefox requires the link to be added to the DOM
                // before it can be clicked.
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.onclick = destroyClickedElement;
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
            }
            downloadLink.click();
        }
    },

    update() {
        // this.checkRolePos();
    },

    checkRolePos() {
        let rolePos = this.map.convertToWorldSpace(this.selfHero.getPosition());
        let distance = cc.v2(this.width / 2, this.height / 2).sub(rolePos).mag();
        if (distance > 1) {
            let deltaPos = cc.v2(0, 0);
            if (rolePos.x - this.width / 2 > 0 || rolePos.x - this.width / 2 < 0) {
                // deltaPos.x = (this.width / 2 - rolePos.x) / 80;
                let direction = rolePos.x > this.width / 2 ? -1 : 1;
                deltaPos.x = direction * Math.sqrt(Math.abs(this.width / 2 - rolePos.x)) / 4;
            }
            if (rolePos.y - this.height / 2 > 0 || rolePos.y - this.height / 2 < 0) {
                // deltaPos.y = (this.height / 2 - rolePos.y) / 20;
                let direction = rolePos.y > this.height / 2 ? -1 : 1;
                deltaPos.y = direction * Math.sqrt(Math.abs(this.height / 2 - rolePos.y)) / 4;
            }
            this.updateMap(deltaPos);
        }
    },

    updateMap(deltaPos) {
        this.map.x += deltaPos.x;
        this.map.y += deltaPos.y;
        let maxX = -this.width / 2 // (this.mapScale - 1) * this.width / 2;
        let maxY = -this.height / 2 //(this.mapScale - 1) * this.height / 2;
        if (this.map.x > maxX) {
            this.map.x = maxX;
        }
        if (this.map.y > maxY) {
            this.map.y = maxY;
        }
        let minh = (MAP_RES_HEIGHT - this.height / 2) * this.mapScale;
        let minw = (MAP_RES_WIDTH - this.width / 2) * this.mapScale;
        if (this.map.y <= -minh) {
            this.map.y = -minh;
        }
        if (this.map.x <= -minw) {
            this.map.x = -minw;
        }

        this.posLab2.string = `(${this.map.x},${this.map.y})`;
        
        let currentNodeSize = mapNodeSize * this.mapScale;
        let tx = this.map.x + currentNodeSize * borderCount - maxX;
        if (tx >= 0) {
            tx = 0;
        }

        let ty = this.map.y + currentNodeSize * borderCount - maxY;
        if (ty >= 0) {
            ty = 0;
        }
        // let begin_w_n = Math.max(Math.round((Math.abs(tx) / currentNodeSize)), 0);

        // let end_w_n = Math.round((Math.abs(this.map.x - this.width / 2 - currentNodeSize * borderCount) / currentNodeSize));

        // let begin_h_n = Math.max(Math.round((Math.abs(ty) / currentNodeSize)), 0);
        // let end_h_n = Math.round((Math.abs(this.map.y - this.height / 2 - currentNodeSize * borderCount) / currentNodeSize));

        // for (let yTileNum = 0; yTileNum < this.mapNodeArr.length; yTileNum++) {
        //     let list = this.mapNodeArr[yTileNum];
        //     for (let xTileNum = 0; xTileNum < list.length; xTileNum++) {
        //         const hadadd = list[xTileNum];
        //         if (xTileNum >= begin_w_n && xTileNum <= end_w_n && yTileNum >= begin_h_n && yTileNum <= end_h_n) {
        //             if (hadadd == 0) {
        //                 let mapNode = new cc.Node();
        //                 let mapframe = mapNode.addComponent(cc.Sprite);
        //                 let spriteFrame = this.assets[this.mapresId + '_' + yTileNum + '_' + '' + xTileNum];
        //                 mapframe.spriteFrame = spriteFrame;
        //                 mapNode.parent = cc.find('Canvas/mapbg/map');
        //                 mapNode.name = this.mapresId + '_' + yTileNum + '_' + '' + xTileNum;
        //                 mapNode.setAnchorPoint(cc.v2(0, 0));
        //                 // mapNode.opacity = 50;
        //                 mapNode.setPosition(-this.width / 2 + xTileNum * mapNodeSize, -this.height / 2 + yTileNum * mapNodeSize);
        //                 this.mapNodeArr[yTileNum][xTileNum] = 1;
        //             }
        //         } else {
        //             if (hadadd == 1) {
        //                 this.map.getChildByName(this.mapresId + '_' + yTileNum + '_' + xTileNum).destroy();
        //                 this.mapNodeArr[yTileNum][xTileNum] = 0;
        //             }
        //         }
        //     }
        // }
    },

    saveInputId(e, d) {
        if (this.inputType == -1) {
            return;
        }
        let inputid = this.inputEditbox.string;
        if (this.inputType == 0) {
            if (d == 0) {
                this.gridInfoArr[this.npcInfo[this.inputIndex].y][this.npcInfo[this.inputIndex].x] = 1;
                delete this.npcInfo[this.inputIndex];
                this.showGrid();
            } else {
                this.npcInfo[this.inputIndex].id = inputid;
                this.addNPCIcon(this.npcInfo[this.inputIndex].x, this.npcInfo[this.inputIndex].y, this.npcAssets[inputid]);
            }
        }
        // else {
        //     if (d == 0) {
        //         this.gridInfoArr[this.transferInfo[this.inputIndex].y][this.transferInfo[this.inputIndex].x] = 1;
        //         delete this.transferInfo[this.inputIndex];
        //         this.showGrid();
        //     }
        //     else {
        //         this.transferInfo[this.inputIndex].id = inputid;
        //     }
        // }
        this.inputLayer.active = false;
    },

    touchBegan(event) {
        let beganPos = event.getLocation();
        if (beganPos.y > canvasHeight) {
            return;
        }
        let drawPos = this.map.convertToNodeSpaceAR(beganPos);
        let touchx = Math.floor((drawPos.x + canvasWidht / 2) / gridWidth);
        let touchy = Math.floor((drawPos.y + canvasHeight / 2) / gridHeight);
        this.posLab.string = `(${Math.round(drawPos.x + canvasWidht / 2)},${Math.round(drawPos.y + canvasHeight / 2)})`;
        this.posLab1.string = `(${touchx},${touchy})`;
        if (this.operationType == 0) {
            return;
        }
        if (this.brushType == 9) {
            let startPosInMap = cc.v2(this.selfHero.x + canvasWidht / 2 - gridWidth / 2, this.selfHero.y + canvasHeight / 2 - gridHeight / 2);
            let startX = Math.round(startPosInMap.x / gridWidth);
            let startY = Math.round(startPosInMap.y / gridHeight);
            let endPosInMap = cc.v2(drawPos.x + canvasWidht / 2 - gridWidth / 2, drawPos.y + canvasHeight / 2 - gridHeight / 2);
            let endX = Math.round(endPosInMap.x / gridWidth);
            let endY = Math.round(endPosInMap.y / gridHeight);
            let availableStart = this.getAvailabelPoint(startY, startX, this.gridInfoArr, rowCount, lineCount, startPosInMap);
            let availableEnd = this.getAvailabelPoint(endY, endX, this.gridInfoArr, rowCount, lineCount, endPosInMap);

            var timestamp = new Date().getTime();
            // console.log('start_time:', timestamp);
            let result = this.searchRoad(availableStart.r, availableStart.l, availableEnd.r, availableEnd.l, this.gridInfoArr, rowCount, lineCount);
            var timestamp1 = new Date().getTime();
            console.log('本次寻路耗时:', timestamp1 - timestamp, '毫秒');

            this.selfHeroLogic.movePosArr = result.slice(0);

            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                if (this.gridInfoArr[element.r][element.l] == 1) {
                    this.gridInfoArr[element.r][element.l] = 9;
                }

            }
            this.showGrid();

            return;
        }

        this.gridInfoArr[touchy][touchx] = this.brushType;

        let temp = this.buildingLayer.getChildByName(touchy * lineCount + touchx);
        if (temp) {
            temp.destroy();
        }

        // .removeChildByName
        if (this.brushType == 3) {
            if (this.npcInfo[touchy * lineCount + touchx] == null) {
                this.npcInfo[touchy * lineCount + touchx] = {
                    x: touchx,
                    y: touchy,
                    id: ''
                }
            }
            this.inputEditbox.string = this.npcInfo[touchy * lineCount + touchx].id;
            this.inputType = 0;
            this.inputIndex = touchy * lineCount + touchx;
            this.inputLayer.active = true;
        } else if (this.npcInfo[touchy * lineCount + touchx] != null) {
            delete this.npcInfo[touchy * lineCount + touchx];
        }
        if (this.brushType == 5) {
            if (this.startPos.x != -1) {
                this.gridInfoArr[this.startPos.y][this.startPos.x] = 1;
            }
            this.startPos.x = touchx;
            this.startPos.y = touchy;
            // if (this.transferInfo[touchy * lineCount + touchx] == null) {
            //     this.transferInfo[touchy * lineCount + touchx] = {
            //         x: touchx,
            //         y: touchy,
            //         id: ''
            //     }
            // }
            // this.inputEditbox.string = this.transferInfo[touchy * lineCount + touchx].id;
            // this.inputType = 1;
            // this.inputIndex = touchy * lineCount + touchx;
            // this.inputLayer.active = true;
        }
        // else if (this.transferInfo[touchy * lineCount + touchx] != null) {
        //     delete this.transferInfo[touchy * lineCount + touchx];
        // }
        this.showGrid();
    },

    touchMoved(event) {
        if (event.getLocation().y > canvasHeight) {
            return;
        }
        if (this.operationType == 0) {
            this.updateMap(event.getDelta());
        } else if (this.operationType == 1) {
            // if (this.brushType < 0) {
            //     return;
            // }
            if (this.brushType == 3 || this.brushType == 5 || this.brushType == 9) {
                return;
            }
            let movePos = event.getLocation();
            let drawPos = this.map.convertToNodeSpaceAR(movePos);
            let touchx = Math.floor((drawPos.x + canvasWidht / 2) / gridWidth);
            let touchy = Math.floor((drawPos.y + canvasHeight / 2) / gridHeight);
            for (let index = touchx - this.brushSize; index <= touchx + this.brushSize; index++) {
                if (index < 0 || index >= lineCount) continue;
                for (let indexy = touchy - this.brushSize; indexy <= touchy + this.brushSize; indexy++) {
                    if (indexy < 0 || indexy >= rowCount) continue;
                    // if (this.gridInfoArr[indexy][index] < 2) {
                    this.gridInfoArr[indexy][index] = this.brushType;
                    // }
                }
            }
            // if (this.brushType != this.gridInfoArr[touchy][touchx]) {
            //     this.gridInfoArr[touchy][touchx] = this.brushType;
            // }
            this.showGrid();
        }
    },

    getAvailabelPoint(r, l, mapArr, rows, lines, pos) {
        if (mapArr[r][l] != 0) {
            return {
                r: r,
                l: l
            };
        }
        let count = 1;
        let pointarr = [];
        while (pointarr.length == 0) {
            if (count > lines && count > rows) {
                // pointarr.push({ r: -1, l: -1 });
                return {
                    r: -1,
                    l: -1
                };
            }
            if (r + count < rows && mapArr[r + count][l] != 0) {
                pointarr.push({
                    r: r + count,
                    l: l
                });
                // return { r: r + count, l: l };
            }
            if (l + count < lines && mapArr[r][l + count] != 0) {
                pointarr.push({
                    r: r,
                    l: l + count
                });
            }
            if (r >= count && mapArr[r - count][l] != 0) {
                pointarr.push({
                    r: r - count,
                    l: l
                });
            }
            if (l >= count && mapArr[r][l - count] != 0) {
                pointarr.push({
                    r: r,
                    l: l - count
                });
            }
            if (r + count < rows && l + count < lines && mapArr[r + count][l + count] != 0) {
                pointarr.push({
                    r: r + count,
                    l: l + count
                });
            }
            if (r >= count && l >= count && mapArr[r - count][l - count] != 0) {
                pointarr.push({
                    r: r - count,
                    l: l - count
                });
            }
            if (r >= count && l + count < lines && mapArr[r - count][l + count] != 0) {
                pointarr.push({
                    r: r - count,
                    l: l + count
                });
            }
            if (l >= count && r + count < rows && mapArr[r + count][l - count] != 0) {
                pointarr.push({
                    r: r + count,
                    l: l - count
                });
            }
            count++;
        }
        let minpoint = pointarr[0];
        let minlength = 100000;
        for (const point of pointarr) {
            let curlength = cc.v2(point.l * gridWidth, point.r * gridHeight).sub(pos).mag();
            if (curlength < minlength) {
                minlength = curlength;
                minpoint = point;
            }
        }
        return minpoint;
    },
    /**
     * 小顶堆上升算法
     * list 小顶堆列表
     * pos 起始计算位置，即从改点开始上升
     * indexlist 地图节点索引，节点地图坐标对应list中的位置
     * cols 地图列数
     */
    minheap_filterup(list, pos, indexlist, cols) {
        let c = pos; // 当前节点(current)的位置
        let p = Math.floor((c - 1) / 2); // 父(parent)结点的位置 
        let tmp = list[c]; // 当前节点(current)
        while (c > 0) { // c>0 还未上升到顶部
            if (list[p].F <= tmp.F) // 父节点比当前节点小，上升结束
                break;
            else {
                list[c] = list[p]; // 父节点放到当前位置
                indexlist[list[p].r * cols + list[p].l] = c; //设置父节点的索引位置
                c = p; // 当前位置上升到父节点位置
                p = Math.floor((p - 1) / 2); // 重新计算父节点位置
            }
        }
        list[c] = tmp; // 把传入节点放到上升位置
        indexlist[tmp.r * cols + tmp.l] = c; // 设置传入点的索引位置
    },

    /**
     * 小顶堆下沉算法
     * list 小顶堆列表
     * pos 起始计算位置，即从改点开始上升
     * indexlist 地图节点索引，节点地图坐标对应list中的位置
     * cols 地图列数
     */
    minheap_filterdown(list, pos, indexlist, cols) {
        let c = pos; // 当前(current)节点的位置
        let l = 2 * c + 1; // 左(left)孩子的位置
        let tmp = list[c]; // 当前(current)节点
        let end = list.length - 1; // 数组终点
        while (l <= end) {
            if (l < end && list[l].F > list[l + 1].F) // "l"是左孩子，"l+1"是右孩子
                l++; // 左右两孩子中选择较小者，即list[l+1]
            if (tmp.F <= list[l].F) // 当前节点比最小的子节点小，调整结束
                break;
            else {
                list[c] = list[l];
                indexlist[list[l].r * cols + list[l].l] = c;
                c = l;
                l = 2 * l + 1;
            }
        }
        list[c] = tmp;
        indexlist[tmp.r * cols + tmp.l] = c;
    },
    //其中的MAP.arr是二维数组
    searchRoad(start_r, start_l, end_r, end_l, mapArr, rows, cols) {
        if (end_r == -1 && end_l == -1) {
            return [];
        }
        var openList = [], //开启列表
            closeObjList = {}, //关闭列表索引
            openObjList = {}, //开启列表索引
            result = [], //结果数组
            result_index = 0; //终点位置

        if (start_r == end_r && start_l == end_l) {
            return result;
        }

        openList.push({
            r: start_r,
            l: start_l,
            G: 0
        }); //把当前点加入到开启列表中，并且G是0
        openObjList[start_r * cols + start_l] = start_r * cols + start_l;
        do {
            var currentPoint = openList[0];
            if (openList.length > 1) {
                openList[0] = openList[openList.length - 1];
                this.minheap_filterdown(openList, 0, openObjList, cols);
            }
            openList.splice(openList.length - 1, 1);
            closeObjList[currentPoint.r * cols + currentPoint.l] = currentPoint;
            delete openObjList[currentPoint.r * cols + currentPoint.l];

            var surroundPoint = this.SurroundPoint(currentPoint);
            for (var i in surroundPoint) {
                var item = surroundPoint[i]; //获得周围的八个点
                if (
                    item.r >= 0 && //判断是否在地图上
                    item.l >= 0 &&
                    item.r < rows &&
                    item.l < cols &&
                    mapArr[item.r][item.l] != 0 && //判断是否是障碍物
                    !this.existInCloseList(item, closeObjList, cols) && //判断是否在关闭列表中
                    mapArr[item.r][currentPoint.l] != 0 && //判断之间是否有障碍物，如果有障碍物是过不去的
                    mapArr[currentPoint.r][item.l] != 0) {
                    //g 到父节点的位置
                    //如果是上下左右位置的则g等于10，斜对角的就是14
                    var g = currentPoint.G + ((currentPoint.r - item.r) * (currentPoint.l - item.l) == 0 ? 10 : 14);
                    if (!this.existInOpenList(item, openObjList, cols)) { //如果不在开启列表中
                        //计算H，通过水平和垂直距离进行确定
                        item['H'] = Math.abs(end_r - item.r) * 10 + Math.abs(end_l - item.l) * 10;
                        item['G'] = g;
                        item['F'] = item.H + item.G;
                        item['parent'] = currentPoint;
                        openList.push(item);
                        openObjList[item.r * cols + item.l] = openList.length - 1;
                        if (item['H'] == 0) {
                            break;
                        }
                        this.minheap_filterup(openList, openList.length - 1, openObjList, cols);
                    } else { //存在在开启列表中，比较目前的g值和之前的g的大小
                        var index = this.existInOpenList(item, openObjList, cols);
                        //如果当前点的g更小
                        if (g < openList[index].G) {
                            openList[index].parent = currentPoint;
                            openList[index].G = g;
                            openList[index].F = g + openList[index].H;
                        }
                        this.minheap_filterup(openList, index, openObjList, cols);
                    }
                }
            }
            //如果开启列表空了，没有通路，结果为空
            if (openList.length == 0) {
                break;
            }
            // openList.sort(this.sortF);//这一步是为了循环回去的时候，找出 F 值最小的, 将它从 "开启列表" 中移掉
        } while (!(result_index = this.existInOpenList({
                r: end_r,
                l: end_l
            }, openObjList, cols)));

        //判断结果列表是否为空
        if (!result_index) {
            result = [];
        } else {
            var currentObj = openList[result_index];
            do {
                //把路劲节点添加到result当中
                result.unshift({
                    r: currentObj.r,
                    l: currentObj.l
                });
                currentObj = currentObj.parent;
            } while (currentObj.r != start_r || currentObj.l != start_l);
        }
        return result;
    },

    //用F值对数组排序
    sortF(a, b) {
        return b.F - a.F;
    },
    //获取周围八个点的值
    SurroundPoint(curPoint) {
        var r = curPoint.r,
            l = curPoint.l;
        return [{
                r: r - 1,
                l: l - 1
            },
            {
                r: r,
                l: l - 1
            },
            {
                r: r + 1,
                l: l - 1
            },
            {
                r: r + 1,
                l: l
            },
            {
                r: r + 1,
                l: l + 1
            },
            {
                r: r,
                l: l + 1
            },
            {
                r: r - 1,
                l: l + 1
            },
            {
                r: r - 1,
                l: l
            }
        ]
    },

    existInCloseList(point, list, cols) {
        if (list[point.r * cols + point.l]) return true;
        return false;
    },

    existInOpenList(point, list, cols) {
        if (list[point.r * cols + point.l]) return list[point.r * cols + point.l];
        return false;
    },

    //判断点是否存在在列表中，是的话返回的是序列号
    existList(point, list) {

        for (var i in list) {
            if (point.r == list[i].r && point.l == list[i].l) {
                return i;
            }
        }
        return false;
    },

});