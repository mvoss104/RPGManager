//============================
// Copyright 2018 Michael Voss
//
// The SignalR namespace manages push notifications.
//============================

interface SignalR {
    playersHub: PlayersHubProxy;
}

interface PlayersHubProxy {
    client: PlayersClient;
    server: PlayersServer;
}

interface PlayersClient {
    /**
     * Function actually adds a character to the UI.
     */
    addCharacter: Function;

    /**
     * Function removes a character's row from the UI.
     */
    removeCharacter: Function;

    /**
     * Update the UI to show a character having been injured.
     */
    updateCharacter: Function;

    /**
     * Indicate that it's someone new's turn.
     */
    updateInitiative: Function;
}

interface PlayersServer {
    /**
     * Function pushes instructions to add characters to the UI.
     */
    addCharacter: Function;

    /**
     * Push notification to all clients that a character is damaged.
     */
    damageCharacter: Function;

    /**
     * Function fetches characters who are already loaded.
     */
    getCharacters: Function;

    /**
     * Push notification to all clients that a character is healed.
     */
    healCharacter: Function;

    /**
     * Push notification to all clients that a character has temporary hit points.
     */
    addTempHp: Function;

    /**
     * Push notification to all clients that a character has extra hit points from a class power.
     */
    addClassHp: Function;

    /**
     * Push notification to all clients that a character has enhanced maximum hit points.
     */
    addEnhancedHp: Function;

    /**
     * Order initiative to cycle to the next actor.
     */
    nextInitiative: Function;

    /**
     * Order initiative to cycle to the previous actor.
     */
    prevInitiative: Function;

    /**
     * Push notification to all clients that a character should be removed.
     */
    removeCharacter: Function;
}

$.connection.playersHub.client.addCharacter = function (character: Character, initiative: number) {
    addCharacterToDisplay(new Character(character), initiative);
}

$.connection.playersHub.client.removeCharacter = function (id: number) {
    removeCharacterFromDisplay(id);
}

$.connection.playersHub.client.updateCharacter = function (characterFromServer: Character) {
    updateCharacter(characterFromServer);
}

$.connection.playersHub.client.updateInitiative = function (actorId: number) {
    updateInitiative(actorId);
}