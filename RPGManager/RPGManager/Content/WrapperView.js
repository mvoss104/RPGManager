var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var WrapperView = (function (_super) {
    __extends(WrapperView, _super);
    function WrapperView(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isDM: window.location.hash === "#/DM",
            activeRow: null,
            rows: []
        };
        window.onhashchange = function () {
            this.setState({
                isDM: window.location.hash === "#/DM"
            });
        }.bind(_this);
        addCharacterToDisplay = _this.addCharacterToDisplay.bind(_this);
        removeCharacterFromDisplay = _this.removeCharacterFromDisplay.bind(_this);
        updateCharacter = _this.updateCharacter.bind(_this);
        updateInitiative = _this.updateInitiative.bind(_this);
        Communication.StartSyncWithServer();
        return _this;
    }
    WrapperView.prototype.addCharacterToDisplay = function (character, initiative) {
        var newRow = new CombatRow();
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
            return a.Actor.Name.localeCompare(b.Actor.Name);
        });
        this.setState({ rows: this.state.rows });
    };
    WrapperView.prototype.removeCharacterFromDisplay = function (id) {
        var toRemove;
        for (var _i = 0, _a = this.state.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            if (row.Actor.Id === id) {
                toRemove = row;
                break;
            }
        }
        this.state.rows.splice(this.state.rows.indexOf(toRemove), 1);
        this.setState({ rows: this.state.rows });
    };
    WrapperView.prototype.updateCharacter = function (characterFromServer) {
        for (var _i = 0, _a = this.state.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            if (row.Actor.Id === characterFromServer.Id) {
                row.Actor.updateFromServer(characterFromServer);
                break;
            }
        }
        this.setState({ rows: this.state.rows });
    };
    WrapperView.prototype.updateInitiative = function (actorId) {
        for (var _i = 0, _a = this.state.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            if (row.Actor.Id === actorId) {
                this.setState({ activeRow: row });
                break;
            }
        }
    };
    WrapperView.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(SummaryView, { isDM: this.state.isDM, rows: this.state.rows, activeRow: this.state.activeRow }),
            React.createElement(Battlemap, { isDM: this.state.isDM, combatRows: this.state.rows }),
            this.state.isDM ? React.createElement(CharacterAdder, null) : null));
    };
    return WrapperView;
}(React.Component));
//# sourceMappingURL=WrapperView.js.map