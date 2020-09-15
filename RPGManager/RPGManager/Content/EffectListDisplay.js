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
var EffectListDisplay = (function (_super) {
    __extends(EffectListDisplay, _super);
    function EffectListDisplay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EffectListDisplay.prototype.render = function () {
        var _this = this;
        if (this.props.effects && this.props.effects.length > 0) {
            return (React.createElement("div", { className: "effects-container" },
                React.createElement("div", { className: "effect-label", style: { fontSize: this.props.fontSize + "px" } }, "Effected By: "),
                this.props.effects.map(function (effect, index, effects) {
                    if (index === effects.length - 1) {
                        return [React.createElement(EffectDisplay, { fontSize: _this.props.fontSize, effect: effect })];
                    }
                    else {
                        return [React.createElement(EffectDisplay, { fontSize: _this.props.fontSize, effect: effect }), React.createElement("span", { className: "effect-label", style: { fontSize: _this.props.fontSize + "px" } }, ", ")];
                    }
                })));
        }
        return null;
    };
    return EffectListDisplay;
}(React.Component));
//# sourceMappingURL=EffectListDisplay.js.map