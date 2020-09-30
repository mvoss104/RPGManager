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

class WrapperView extends React.Component {
    public state: {
        isDM: boolean,
        activeRow: CombatRow,
        rows: CombatRow[],
        walls: boolean[][]
    }

    constructor(props: any) {
        super(props);

        this.state = {
            isDM: window.location.hash === "#/DM",
            activeRow: null,
            rows: [],
            walls: []
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

        Communication.StartSyncWithServer();
    }

    /**
     * Add a new character to the display
     * @param character the character to add
     * @param initiative the initiative to add at
     */
    public addCharacterToDisplay(character: Character, initiative: number, x: number, y: number) {
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
     * Add a wall to the map
     * @param x the x coordinate of the wall
     * @param y the y coordinate of the wall
     */
    public addWall(x: number, y: number) {
        addWallSkinny(x, y);
        this.setState({ walls: this.state.walls });
    }

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
        Communication.AddCharacter(addingCharacter, initiative);
    }

    public static onDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
    }

    render() {
        return (
            <div onDrop={WrapperView.onDrop} onDragOver={WrapperView.onDragOver}>
                <SummaryView isDM={this.state.isDM} rows={this.state.rows} activeRow={this.state.activeRow} />
                <Battlemap isDM={this.state.isDM} combatRows={this.state.rows} walls={this.state.walls} />
                {this.state.isDM ? <CharacterAdder /> : null}
            </div>
        );
    }
}