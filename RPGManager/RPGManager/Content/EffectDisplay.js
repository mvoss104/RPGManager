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
var EffectDisplay = (function (_super) {
    __extends(EffectDisplay, _super);
    function EffectDisplay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EffectDisplay.prototype.render = function () {
        var tooltip;
        if (this.props.effect.Concentrator) {
            tooltip = "From " + this.props.effect.Concentrator.Name;
        }
        else {
            tooltip = "Not connected to source";
        }
        return (React.createElement("div", { className: "effect-container", title: tooltip, style: { fontSize: this.props.fontSize + "px" } },
            React.createElement("div", { className: "effect-name" }, this.props.effect.Name),
            React.createElement("div", { className: "effect-duration" },
                "(",
                this.props.effect.RemainingRounds,
                ")")));
    };
    return EffectDisplay;
}(React.Component));
//# sourceMappingURL=EffectDisplay.js.map