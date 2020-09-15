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
var CharacterRow = (function (_super) {
    __extends(CharacterRow, _super);
    function CharacterRow(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hpAdjust: 0,
            expanded: false,
            portraitSize: 100,
            bodySize: 380
        };
        _this.updateDimensions = _this.updateDimensions.bind(_this);
        _this.updateHpAdjust = _this.updateHpAdjust.bind(_this);
        _this.expandCollapse = _this.expandCollapse.bind(_this);
        _this.applyDamage = _this.applyDamage.bind(_this);
        _this.applyHealing = _this.applyHealing.bind(_this);
        _this.addTempHp = _this.addTempHp.bind(_this);
        _this.addClassHp = _this.addClassHp.bind(_this);
        _this.addEnhancedHp = _this.addEnhancedHp.bind(_this);
        return _this;
    }
    CharacterRow.prototype.applyDamage = function () {
        Communication.DamageCharacter(this.props.character.Id, this.state.hpAdjust);
    };
    CharacterRow.prototype.applyHealing = function () {
        Communication.HealCharacter(this.props.character.Id, this.state.hpAdjust);
    };
    CharacterRow.prototype.addTempHp = function () {
        Communication.AddTempHp(this.props.character.Id, this.state.hpAdjust);
    };
    CharacterRow.prototype.addClassHp = function () {
        Communication.AddClassHp(this.props.character.Id, this.state.hpAdjust);
    };
    CharacterRow.prototype.addEnhancedHp = function () {
        Communication.AddEnhancedHp(this.props.character.Id, this.state.hpAdjust);
    };
    CharacterRow.prototype.updateDimensions = function () {
        var clientWidth = document.body.clientWidth;
        if (!this.props.active) {
            clientWidth -= 25;
        }
        var portrait = clientWidth * 0.2;
        if (portrait > 100) {
            portrait = 100;
        }
        var body = clientWidth - portrait - 10;
        if (body > 380) {
            body = 380;
        }
        if (body < 0) {
            body = 0;
        }
        this.setState({
            portraitSize: portrait,
            bodySize: body
        });
    };
    CharacterRow.prototype.updateHpAdjust = function (event) {
        this.setState({ hpAdjust: parseInt(event.target.value) });
    };
    CharacterRow.prototype.expandCollapse = function () {
        this.setState({ expanded: !this.state.expanded });
    };
    CharacterRow.prototype.componentWillMount = function () {
        this.updateDimensions();
    };
    CharacterRow.prototype.componentDidMount = function () {
        window.addEventListener("resize", this.updateDimensions);
    };
    CharacterRow.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        if (this.props.active) {
            this.refs.RowElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center"
            });
        }
        if (prevProps.active != this.props.active) {
            this.updateDimensions();
        }
    };
    CharacterRow.prototype.componentWillUnmount = function () {
        window.removeEventListener("resize", this.updateDimensions);
    };
    CharacterRow.prototype.render = function () {
        var _this = this;
        var className;
        if (this.props.active) {
            className = "character-row active";
        }
        else {
            className = "character-row inactive";
        }
        var rows = [];
        rows.push(React.createElement("div", { key: "summary-row", className: className, style: { height: this.state.portraitSize, width: this.state.portraitSize + this.state.bodySize }, onClick: this.expandCollapse, ref: "RowElement" },
            React.createElement("div", { className: "character-portrait-wrapper", style: { height: this.state.portraitSize, width: this.state.portraitSize } },
                React.createElement(PortraitLifebar, { size: this.state.portraitSize, currentHitPoints: this.props.character.CurrentHitPoints, maxHitPoints: this.props.character.MaxHitPoints + this.props.character.EnhancedHitPoints, extraHitPoints: this.props.character.TemporaryHitPoints + this.props.character.ClassPowerHitPoints, portrait: this.props.character.Portrait, showDetails: this.props.isDM })),
            React.createElement("div", { className: "character-info-wrapper", style: { height: this.state.portraitSize, width: this.state.bodySize } },
                React.createElement("div", { className: "character-name", style: { fontSize: (this.state.portraitSize * 0.25) + "px" } }, this.props.character.Name),
                React.createElement("div", { className: "character-initiative", style: { fontSize: (this.state.portraitSize * 0.20) + "px" } }, this.props.initiativeCount),
                React.createElement("div", { className: "character-concentrating" }, this.props.character.ConcentratingOn ?
                    [React.createElement("div", { key: "concentration-label", className: "effect-label", style: { fontSize: (this.state.portraitSize * 0.15) + "px" } }, "Conc: "),
                        React.createElement(EffectDisplay, { key: "concentration-effect", effect: this.props.character.ConcentratingOn, fontSize: this.state.portraitSize * 0.15 })] :
                    React.createElement("div", null, "Not Concentrating")),
                React.createElement(EffectListDisplay, { effects: this.props.character.Effects, fontSize: this.state.portraitSize * 0.15 }))));
        if (this.props.isDM && this.state.expanded) {
            rows.push(React.createElement("div", { key: "expanded-row", className: className, style: { height: "50px", width: this.state.portraitSize + this.state.bodySize } },
                React.createElement("div", null,
                    React.createElement("input", { className: "input", onChange: this.updateHpAdjust, value: this.state.hpAdjust || "" })),
                React.createElement("div", null,
                    React.createElement("button", { className: "button", onClick: this.applyDamage }, "Damage")),
                React.createElement("div", null,
                    React.createElement("button", { className: "button", onClick: this.applyHealing }, "Heal")),
                React.createElement("div", null,
                    React.createElement("button", { className: "button", onClick: this.addTempHp }, "Temp HP")),
                React.createElement("div", null,
                    React.createElement("button", { className: "button", onClick: this.addEnhancedHp }, " Enh HP")),
                React.createElement("div", null,
                    React.createElement("button", { className: "button", onClick: this.addClassHp }, "Class HP"))));
            rows.push(React.createElement("div", { key: "delete-row", className: className, style: { height: "30px", width: this.state.portraitSize + this.state.bodySize } },
                React.createElement("button", { className: "button character-delete", onClick: function () { Communication.RemoveCharacter(_this.props.character.Id); } }, "X")));
        }
        return rows;
    };
    return CharacterRow;
}(React.Component));
//# sourceMappingURL=CharacterRow.js.map