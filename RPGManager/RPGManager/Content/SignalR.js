$.connection.playersHub.client.addCharacter = function (character, initiative) {
    addCharacterToDisplay(new Character(character), initiative);
};
$.connection.playersHub.client.removeCharacter = function (id) {
    removeCharacterFromDisplay(id);
};
$.connection.playersHub.client.updateCharacter = function (characterFromServer) {
    updateCharacter(characterFromServer);
};
$.connection.playersHub.client.updateInitiative = function (actorId) {
    updateInitiative(actorId);
};
//# sourceMappingURL=SignalR.js.map