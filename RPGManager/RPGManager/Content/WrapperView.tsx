//============================
// Copyright 2018 Michael Voss
//
// SummaryView is responsible for organizing all details of the summary
//============================

// Variable declarations to allow us to bridge from static SignalR to instanced SummaryView.
declare var addCharacterToDisplay: Function;
declare var removeCharacterFromDisplay: Function;
declare var updateCharacter: Function;
declare var updateCombatRow: Function;
declare var updateInitiative: Function;
declare var addWall: Function;
declare var addWallSkinny: Function;
declare var removeWall: Function;
declare var showRolledDice: Function;

declare var wrapper: WrapperView;

class WrapperView extends React.Component {
    public state: {
        isDM: boolean,
        activeRow: CombatRow,
        rows: CombatRow[],
        walls: boolean[][],
        dice: Die[],
        diceResults: DiceResult[],
    }

    public static sessionCharacter: Character;

    constructor(props: any) {
        super(props);

        this.state = {
            isDM: window.location.hash === "#/DM",
            activeRow: null,
            rows: [],
            walls: [],
            dice: [],
            diceResults: []
        }

        window.onhashchange = function () {
            this.setState({
                isDM: window.location.hash === "#/DM"
            });
        }.bind(this);

        addCharacterToDisplay = this.addCharacterToDisplay.bind(this);
        removeCharacterFromDisplay = this.removeCharacterFromDisplay.bind(this);
        updateCharacter = this.updateCharacter.bind(this);
        updateInitiative = this.updateInitiative.bind(this);
        updateCombatRow = this.updateCombatRow.bind(this);
        addWall = this.addWall.bind(this);
        addWallSkinny = this.addWallSkinny.bind(this);
        removeWall = this.removeWall.bind(this);
        showRolledDice = this.showRolledDice.bind(this);

        this.diceFieldKeyDown = this.diceFieldKeyDown.bind(this);
        this.dismissResult = this.dismissResult.bind(this);

        Communication.StartSyncWithServer();
        wrapper = this;
    }

    /**
     * Add a new character to the display
     * @param character the character to add
     * @param initiative the initiative to add at
     */
    public addCharacterToDisplay(character: Character, initiative: number, x: number, y: number) {
        if (WrapperView.sessionCharacter && character.Name === WrapperView.sessionCharacter.Name) {
            WrapperView.sessionCharacter.Id = character.Id;
        }
        let newRow = new CombatRow();
        newRow.Actor = character;
        newRow.InitiativeCount = initiative;
        newRow.LocationX = x;
        newRow.LocationY = y;
        this.state.rows.push(newRow);
        this.state.rows.sort(WrapperView.sortRows);
        this.setState({ rows: this.state.rows });
    }

    /**
     * Remove a character from the display who is on the display
     * @param id the ID of the character to remove
     */
    public removeCharacterFromDisplay(id: number) {
        let toRemove: CombatRow;
        for (let row of this.state.rows) {
            if (row.Actor.Id === id) {
                toRemove = row;
                break;
            }
        }
        this.state.rows.splice(this.state.rows.indexOf(toRemove), 1);
        this.setState({ rows: this.state.rows });
    }

    /**
     * Update a character based on new data from the server
     * @param characterFromServer the character to update
     */
    public updateCharacter(characterFromServer: Character) {
        for (let row of this.state.rows) {
            if (row.Actor.Id === characterFromServer.Id) {
                row.Actor.updateFromServer(characterFromServer);
                if (characterFromServer.Id === (WrapperView.sessionCharacter && WrapperView.sessionCharacter.Id)) {
                    WrapperView.sessionCharacter = row.Actor;
                }
                break;
            }
        }
        this.setState({ rows: this.state.rows });
    }

    /**
     * Update a combat row.
     * @param charId the id of the character to update
     * @param init the initiative roll of the character
     * @param x the character's X location on the battle map
     * @param y the character's Y location on the battle map
     */
    public updateCombatRow(charId: number, init: number, x: number, y: number) {
        for (let row of this.state.rows) {
            if (row.Actor.Id === charId) {
                if (init !== null && init !== undefined && row.InitiativeCount !== init) {
                    row.InitiativeCount = init;
                    this.state.rows.sort(WrapperView.sortRows);
                }
                row.LocationX = x;
                row.LocationY = y;
                this.setState({ rows: this.state.rows });
                break;
            }
        }
    }

    /**
     * Update the current active row
     * @param actorId the Id of the character who is now active
     */
    public updateInitiative(actorId: number) {
        for (let row of this.state.rows) {
            if (row.Actor.Id === actorId) {
                this.setState({ activeRow: row });
                break;
            }
        }
    }

    /**
     * show dice that were rolled
     * @param dice the dice rolled
     */
    public showRolledDice(characterId: number, dice: Die[], result: number) {
        this.state.dice = this.state.dice.concat(dice);
        let parsedResult = new DiceResult();
        for (let row of this.state.rows) {
            if (row.Actor.Id === characterId) {
                parsedResult.characterName = row.Actor.Name;
                break;
            }
        }
        if (!parsedResult.characterName) {
            parsedResult.characterName = "Someone ";
        }
        parsedResult.diceResult = result;
        this.state.diceResults.push(parsedResult);
        this.setState({ dice: this.state.dice, diceResults: this.state.diceResults });
    }

    /**
     * Add a wall to the map
     * @param x the x coordinate of the wall
     * @param y the y coordinate of the wall
     */
    public addWall(x: number, y: number) {
        addWallSkinny(x, y);
        this.setState({ walls: this.state.walls });
    }

    /**
     * Update the array of walls without re-rendering the component
     * @param x the x coordinate of the wall
     * @param y the y coordinate of the wall
     */
    public addWallSkinny(x: number, y: number) {
        if (!this.state.walls[x]) {
            this.state.walls[x] = [];
        }
        this.state.walls[x][y] = true;
    }

    /**
     * Remove a wall from the map
     * @param x the x coordinate of the wall
     * @param y the y coordinate of the wall
     */
    public removeWall(x: number, y: number) {
        if (!this.state.walls[x]) {
            return;
        }
        this.state.walls[x][y] = false;
        this.setState({ walls: this.state.walls });
    }

    public dismissResult() {
        this.setState({ diceResults: [], dice: [] });
    }

    /**
     * Function compares two CombatRows to sort by initiative
     * @param a the first row to compare
     * @param b the second row to compare
     */
    public static sortRows(a: CombatRow, b: CombatRow) {
        if (!a || !b) {
            return 0;
        }
        if (a.InitiativeCount > b.InitiativeCount) {
            return -1;
        }
        else if (a.InitiativeCount < b.InitiativeCount) {
            return 1;
        }
        else if (a.Actor.Dexterity > b.Actor.Dexterity) {
            return -1;
        }
        else if (a.Actor.Dexterity < b.Actor.Dexterity) {
            return 1;
        }
        return a.Actor.Name.localeCompare(b.Actor.Name);
    }

    public static onDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();

        if (event.dataTransfer.files) {
            for (var c = 0; c < event.dataTransfer.files.length; c++) {
                (event.dataTransfer.files[c] as any).text().then(WrapperView.handleCharacter);
            }

            event.stopPropagation();
        }
    }

    public static handleCharacter(characterString: string) {
        let addingCharacter = new Character(JSON.parse(characterString));
        let initiative = Math.floor((Math.random() * 20) + 1) + addingCharacter.Dexterity;
        let highestCharCode = 0;
        for (let row of wrapper.state.rows) {
            if (row.Actor.Name.indexOf(addingCharacter.Name) == 0) {
                var suffixCode = 0;
                if (row.Actor.Name === addingCharacter.Name) {
                    suffixCode = 65; // "A"
                }
                else {
                    suffixCode = row.Actor.Name.charCodeAt(row.Actor.Name.length - 1);
                }
                if (suffixCode > highestCharCode) {
                    highestCharCode = suffixCode;
                }
            }
        }
        if (highestCharCode > 0) {
            addingCharacter.Name += " " + String.fromCharCode(highestCharCode + 1);
        }
        WrapperView.sessionCharacter = addingCharacter;
        Communication.AddCharacter(addingCharacter, initiative);
    }

    public static onDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
    }

    public static diceToDiceDisplay(value: Die, index: number, array: Die[]) {
        return (<SingleDieDisplay key={index} die={value} />);
    }

    public diceFieldKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            let characterId = -1;
            if (this.state.isDM && this.state.activeRow) {
                characterId = this.state.activeRow.Actor.Id;
            }
            else if (WrapperView.sessionCharacter) {
                characterId = WrapperView.sessionCharacter.Id;
            }
            Communication.RollDice(characterId, event.currentTarget.value);
            event.currentTarget.select();
        }
    }

    render() {
        return (
            <div onDrop={WrapperView.onDrop} onDragOver={WrapperView.onDragOver}>
                {WrapperView.sessionCharacter ? <SessionCharacter character={WrapperView.sessionCharacter} /> : null}
                <DiceResultDisplay diceResults={this.state.diceResults} dismiss={this.dismissResult} />
                <SummaryView isDM={this.state.isDM} rows={this.state.rows} activeRow={this.state.activeRow} />
                <Battlemap isDM={this.state.isDM} combatRows={this.state.rows} walls={this.state.walls} />
                {this.state.isDM ? <CharacterAdder /> : null}
                {this.state.dice.map(WrapperView.diceToDiceDisplay)}
                <div className="bottom dice-field-container">
                    {this.state.isDM ? <div>
                        <button className="button" onClick={Communication.NextInitiative}>Next Turn</button>
                        <button className="button" onClick={Communication.PrevInitiative}>Previous Turn</button>
                    </div> : null}
                    <input className="dice-field" onKeyPress={this.diceFieldKeyDown} />
                </div>
            </div>
        );
    }
}