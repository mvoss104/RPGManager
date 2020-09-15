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
var SummaryView = (function (_super) {
    __extends(SummaryView, _super);
    function SummaryView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SummaryView.prototype.render = function () {
        var ret = [];
        for (var _i = 0, _a = this.props.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            ret.push(React.createElement(CharacterRow, { key: row.Actor.Id, active: row === this.props.activeRow, character: row.Actor, initiativeCount: row.InitiativeCount, isDM: this.props.isDM }));
        }
        if (this.props.isDM) {
            ret.push(React.createElement("div", { key: "bottom-spacer", className: "bottom-spacer" }));
            ret.push(React.createElement("div", { key: "bottom", className: "bottom" },
                React.createElement("button", { className: "button", onClick: Communication.NextInitiative }, "Next Turn"),
                React.createElement("button", { className: "button", onClick: Communication.PrevInitiative }, "Previous Turn")));
        }
        return React.createElement("div", { className: "summary-wrapper" }, ret);
    };
    return SummaryView;
}(React.Component));
//# sourceMappingURL=SummaryView.js.map