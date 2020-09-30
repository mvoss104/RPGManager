//============================
// Copyright 2018 Michael Voss
//
// Communication allows for messages outside of signalR (e.g. initial load)
//============================

class Communication {
    public static StartSyncWithServer() {
        $.connection.hub.url = "http://" + location.hostname + "/RPGManagerService";
        $.connection.hub.start().done(function () {
            Communication.GetCharacters();
            Communication.GetWalls();
        });
    }

    public static GetCharacters() {
        $.connection.playersHub.server.getCharacters().done(function (chars: any[]) {
            for (let row of chars) {
                addCharacterToDisplay(new Character(row.Actor), row.InitiativeCount, row.LocationX, row.LocationY);
            }
        });
    }

    public static GetWalls() {
        $.connection.playersHub.server.getWalls().done(function (walls: any[]) {
            for (var c = 0; c < walls.length; c++) {
                if (c === walls.length - 1) {
                    addWall(walls[c].Item1, walls[c].Item2);
                }
                else {
                    addWallSkinny(walls[c].Item1, walls[c].Item2);
                }
            }
        });
    }

    public static GetPortraits() {
        let request = new XMLHttpRequest();
        request.addEventListener("load", function () {
            updatePortraitOptions(JSON.parse(this.response));
        });
        request.open("GET", (location.pathname + "/Home/GetPortraits").replace("//", "/"));
        request.send();
    }

    public static GetSavedCharacters() {
        let request = new XMLHttpRequest();
        request.addEventListener("load", function () {

        });
        request.open("GET", (location.pathname + "/Home/GetCharacters").replace("//", "/"));
        request.send();
    }

    public static Save(fileName: string) {
        let request = new XMLHttpRequest();
        request.open("GET", (location.pathname + "/Home/Save?fileName=" + fileName).replace("//", "/"));
        request.send();
    }

    public static Load(fileName: string) {
        let request = new XMLHttpRequest();
        request.addEventListener("load", function () {
            for (let row of JSON.parse(this.response)) {
                addCharacterToDisplay(new Character(row.Actor), row.InitiativeCount);
            }
        });
        request.open("GET", (location.pathname + "/Home/Load?fileName=" + fileName).replace("//", "/"));
        request.send();
    }

    public static AddCharacter(character: Character, initiative: number) {
        $.connection.playersHub.server.addCharacter(character, initiative);
    }

    public static RemoveCharacter(id: number) {
        $.connection.playersHub.server.removeCharacter(id);
    }

    public static DamageCharacter(id: number, damage: number) {
        $.connection.playersHub.server.damageCharacter(id, damage);
    }

    public static HealCharacter(id: number, hitPoints: number) {
        $.connection.playersHub.server.healCharacter(id, hitPoints);
    }

    public static AddTempHp(id: number, hitPoints: number) {
        $.connection.playersHub.server.addTempHp(id, hitPoints);
    }

    public static AddClassHp(id: number, hitPoints: number) {
        $.connection.playersHub.server.addClassHp(id, hitPoints);
    }

    public static AddEnhancedHp(id: number, hitPoints: number) {
        $.connection.playersHub.server.addEnhancedHp(id, hitPoints);
    }

    public static NextInitiative() {
        $.connection.playersHub.server.nextInitiative();
    }

    public static PrevInitiative() {
        $.connection.playersHub.server.prevInitiative();
    }

    public static UpdateCombatRow(charId: number, init: number, x: number, y: number) {
        $.connection.playersHub.server.updateCombatRow(charId, init, x, y);
    }

    public static AddWall(x: number, y: number) {
        $.connection.playersHub.server.addWall(x, y);
    }

    public static RemoveWall(x: number, y: number) {
        $.connection.playersHub.server.removeWall(x, y);
    }
}