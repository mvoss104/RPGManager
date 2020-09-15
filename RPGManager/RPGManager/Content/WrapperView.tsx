//============================
// Copyright 2018 Michael Voss
//
// SummaryView is responsible for organizing all details of the summary
//============================

// Variable declarations to allow us to bridge from static SignalR to instanced SummaryView.
declare var addCharacterToDisplay: Function;
declare var removeCharacterFromDisplay: Function;
declare var updateCharacter: Function;
declare var updateInitiative: Function;

class WrapperView extends React.Component {
    state: {
        isDM: boolean,
        activeRow: CombatRow,
        rows: CombatRow[]
    }

    constructor(props: any) {
        super(props);

        this.state = {
            isDM: window.location.hash === "#/DM",
            activeRow: null,
            rows: []
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

        Communication.StartSyncWithServer();
    }

    addCharacterToDisplay(character: Character, initiative: number) {
        let newRow = new CombatRow();
        newRow.Actor = character;
        newRow.InitiativeCount = initiative;
        this.state.rows.push(newRow);
        this.state.rows.sort(function (a, b) {
            if (a.InitiativeCount > b.InitiativeCount) {
                return -1;
            }
            else if (a.InitiativeCount < b.InitiativeCount) {
                return 1;
            }
            // TODO: Compare dexterity scores when possible.
            return a.Actor.Name.localeCompare(b.Actor.Name);
        });
        this.setState({ rows: this.state.rows });
    }

    removeCharacterFromDisplay(id: number) {
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

    updateCharacter(characterFromServer: Character) {
        for (let row of this.state.rows) {
            if (row.Actor.Id === characterFromServer.Id) {
                row.Actor.updateFromServer(characterFromServer);
                break;
            }
        }
        this.setState({ rows: this.state.rows });
    }

    updateInitiative(actorId: number) {
        for (let row of this.state.rows) {
            if (row.Actor.Id === actorId) {
                this.setState({ activeRow: row });
                break;
            }
        }
    }

    render() {
        return (
            <div>
                <SummaryView isDM={this.state.isDM} rows={this.state.rows} activeRow={this.state.activeRow} />
                <Battlemap isDM={this.state.isDM} combatRows={this.state.rows} />
                {this.state.isDM ? <CharacterAdder /> : null}
            </div>
        );
    }
}