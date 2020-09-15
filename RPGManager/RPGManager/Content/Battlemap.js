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
var Battlemap = (function (_super) {
    __extends(Battlemap, _super);
    function Battlemap(props) {
        var _this = _super.call(this, props) || this;
        _this.getCharacterInPosition = _this.getCharacterInPosition.bind(_this);
        return _this;
    }
    Battlemap.prototype.getCharacterInPosition = function (x, y) {
        for (var _i = 0, _a = this.props.combatRows; _i < _a.length; _i++) {
            var row = _a[_i];
            if (row.Actor.LocationX == x && row.Actor.LocationY == y) {
                return row.Actor;
            }
        }
        return null;
    };
    Battlemap.prototype.render = function () {
        var rows = [];
        for (var y = 0; y < 10; y++) {
            var cells = [];
            for (var x = 0; x < 10; x++) {
                var character = this.getCharacterInPosition(x, y);
                var characterPortrait = null;
                if (character) {
                    characterPortrait = React.createElement(PortraitLifebar, { size: Battlemap.cellSize, currentHitPoints: character.CurrentHitPoints, maxHitPoints: character.MaxHitPoints + character.EnhancedHitPoints, extraHitPoints: character.TemporaryHitPoints + character.ClassPowerHitPoints, portrait: character.Portrait, showDetails: this.props.isDM });
                }
                cells.push(React.createElement("td", { key: x, className: "battlemap-cell" },
                    React.createElement("div", { className: "battlemap-cell-contents" }, characterPortrait)));
            }
            rows.push(React.createElement("tr", { key: y, style: { height: Battlemap.cellSize } }, cells));
        }
        return (React.createElement("table", null,
            React.createElement("tbody", null, rows)));
    };
    Battlemap.cellSize = 30;
    return Battlemap;
}(React.Component));
//# sourceMappingURL=Battlemap.js.map