var Communication = (function () {
    function Communication() {
    }
    Communication.StartSyncWithServer = function () {
        $.connection.hub.url = "http://" + location.hostname + "/RPGManagerService";
        $.connection.hub.start().done(function () {
            Communication.GetCharacters();
        });
    };
    Communication.GetCharacters = function () {
        $.connection.playersHub.server.getCharacters().done(function (chars) {
            for (var _i = 0, chars_1 = chars; _i < chars_1.length; _i++) {
                var row = chars_1[_i];
                addCharacterToDisplay(new Character(row.Actor), row.InitiativeCount);
            }
        });
    };
    Communication.GetPortraits = function () {
        var request = new XMLHttpRequest();
        request.addEventListener("load", function () {
            updatePortraitOptions(JSON.parse(this.response));
        });
        request.open("GET", (location.pathname + "/Home/GetPortraits").replace("//", "/"));
        request.send();
    };
    Communication.GetSavedCharacters = function () {
        var request = new XMLHttpRequest();
        request.addEventListener("load", function () {
        });
        request.open("GET", (location.pathname + "/Home/GetCharacters").replace("//", "/"));
        request.send();
    };
    Communication.Save = function (fileName) {
        var request = new XMLHttpRequest();
        request.open("GET", (location.pathname + "/Home/Save?fileName=" + fileName).replace("//", "/"));
        request.send();
    };
    Communication.Load = function (fileName) {
        var request = new XMLHttpRequest();
        request.addEventListener("load", function () {
            for (var _i = 0, _a = JSON.parse(this.response); _i < _a.length; _i++) {
                var row = _a[_i];
                addCharacterToDisplay(new Character(row.Actor), row.InitiativeCount);
            }
        });
        request.open("GET", (location.pathname + "/Home/Load?fileName=" + fileName).replace("//", "/"));
        request.send();
    };
    Communication.AddCharacter = function (character, initiative) {
        $.connection.playersHub.server.addCharacter(character, initiative);
    };
    Communication.RemoveCharacter = function (id) {
        $.connection.playersHub.server.removeCharacter(id);
    };
    Communication.DamageCharacter = function (id, damage) {
        $.connection.playersHub.server.damageCharacter(id, damage);
    };
    Communication.HealCharacter = function (id, hitPoints) {
        $.connection.playersHub.server.healCharacter(id, hitPoints);
    };
    Communication.AddTempHp = function (id, hitPoints) {
        $.connection.playersHub.server.addTempHp(id, hitPoints);
    };
    Communication.AddClassHp = function (id, hitPoints) {
        $.connection.playersHub.server.addClassHp(id, hitPoints);
    };
    Communication.AddEnhancedHp = function (id, hitPoints) {
        $.connection.playersHub.server.addEnhancedHp(id, hitPoints);
    };
    Communication.NextInitiative = function () {
        $.connection.playersHub.server.nextInitiative();
    };
    Communication.PrevInitiative = function () {
        $.connection.playersHub.server.prevInitiative();
    };
    return Communication;
}());
//# sourceMappingURL=Communication.js.map