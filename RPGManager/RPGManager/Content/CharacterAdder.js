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
var CharacterAdder = (function (_super) {
    __extends(CharacterAdder, _super);
    function CharacterAdder(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            name: "",
            initiative: 0,
            currentHP: 0,
            maxHP: 0,
            portrait: "",
            portraitOptions: []
        };
        _this.updateInit = _this.updateInit.bind(_this);
        _this.updateName = _this.updateName.bind(_this);
        _this.updatePortrait = _this.updatePortrait.bind(_this);
        _this.updateCurrentHP = _this.updateCurrentHP.bind(_this);
        _this.updateMaxHP = _this.updateMaxHP.bind(_this);
        _this.updateCharacter = _this.updateCharacter.bind(_this);
        updatePortraitOptions = _this.setOptions.bind(_this);
        _this.addCharacter = _this.addCharacter.bind(_this);
        Communication.GetPortraits();
        return _this;
    }
    CharacterAdder.prototype.updateCurrentHP = function (event) {
        this.setState({ currentHP: parseInt(event.target.value) });
    };
    CharacterAdder.prototype.updateMaxHP = function (event) {
        this.setState({ maxHP: parseInt(event.target.value) });
    };
    CharacterAdder.prototype.updateInit = function (event) {
        this.setState({ initiative: parseInt(event.target.value) });
    };
    CharacterAdder.prototype.updateName = function (event) {
        this.setState({ name: event.target.value });
    };
    CharacterAdder.prototype.updatePortrait = function (event) {
        this.setState({ portrait: event.target.value });
    };
    CharacterAdder.prototype.updateCharacter = function (event) {
        var pickedChar = CharacterAdder.preGenCharacters[parseInt(event.target.value)];
        var init = Math.floor((Math.random() * 20) + 1) + pickedChar.Dexterity;
        document.getElementById("current-hp-field").value = pickedChar.CurrentHitPoints.toString();
        document.getElementById("max-hp-field").value = pickedChar.MaxHitPoints.toString();
        document.getElementById("name-field").value = pickedChar.Name;
        document.getElementById("init-field").value = init.toString();
        document.getElementById("portrait-field").value = pickedChar.Portrait;
        this.setState({
            currentHP: pickedChar.CurrentHitPoints,
            maxHP: pickedChar.MaxHitPoints,
            initiative: init,
            name: pickedChar.Name,
            portrait: pickedChar.Portrait
        });
    };
    CharacterAdder.prototype.addCharacter = function () {
        var newChar = new Character();
        newChar.Name = this.state.name;
        newChar.Portrait = this.state.portrait;
        newChar.CurrentHitPoints = this.state.currentHP;
        newChar.MaxHitPoints = this.state.maxHP;
        Communication.AddCharacter(newChar, this.state.initiative);
    };
    CharacterAdder.prototype.setOptions = function (options) {
        this.setState({
            portraitOptions: options
        });
    };
    CharacterAdder.prototype.getPreGenOptions = function () {
        var ret = [];
        for (var c = 0; c < CharacterAdder.preGenCharacters.length; c++) {
            ret.push(React.createElement("option", { key: c, value: c }, CharacterAdder.preGenCharacters[c].Name));
        }
        return ret;
    };
    CharacterAdder.prototype.render = function () {
        return (React.createElement("div", { className: "adder-wrapper" },
            React.createElement("label", null, "Name:"),
            React.createElement("input", { id: "name-field", className: "input", onChange: this.updateName }),
            React.createElement("label", null, "Initiative:"),
            React.createElement("input", { id: "init-field", className: "input", onChange: this.updateInit }),
            React.createElement("div", { className: "columns" },
                React.createElement("div", { className: "column" },
                    React.createElement("label", null, "Current HP:"),
                    React.createElement("input", { id: "current-hp-field", className: "input", onChange: this.updateCurrentHP })),
                React.createElement("div", { className: "column" },
                    React.createElement("label", null, "Max HP:"),
                    React.createElement("input", { id: "max-hp-field", className: "input", onChange: this.updateMaxHP }))),
            React.createElement("div", null,
                React.createElement("label", null, "Portrait:")),
            React.createElement("div", null,
                React.createElement("input", { id: "portrait-field", list: "portrait-list", className: "select", onChange: this.updatePortrait }),
                React.createElement("datalist", { id: "portrait-list" },
                    React.createElement("option", { key: "blank", value: "" }),
                    this.state.portraitOptions.map(function (option) {
                        return React.createElement("option", { key: option, value: option }, option);
                    }))),
            React.createElement("button", { className: "button is-pulled-right", onClick: this.addCharacter }, "Add Character"),
            React.createElement("div", null,
                React.createElement("input", { list: "character-list", className: "select", onChange: this.updateCharacter }),
                React.createElement("datalist", { id: "character-list" },
                    React.createElement("option", { key: "blank", value: "" }),
                    this.getPreGenOptions()))));
    };
    CharacterAdder.preGenCharacters = [
        new Character({
            Charisma: 3,
            ClassPowerHitPoints: 0,
            Constitution: 1,
            CurrentHitPoints: 22,
            Dexterity: 0,
            EnhancedHitPoints: 0,
            Intelligence: 1,
            MaxHitPoints: 22,
            Name: "Aisling",
            Portrait: "Content/Images/Portraits/NPC/!blank.png",
            Strength: -1,
            TemporaryHitPoints: 0,
            Wisdom: 1
        }),
        new Character({
            Charisma: 1,
            ClassPowerHitPoints: 0,
            Constitution: 1,
            CurrentHitPoints: 29,
            Dexterity: 2,
            EnhancedHitPoints: 0,
            Intelligence: 1,
            MaxHitPoints: 29,
            Name: "Burgess Jurgens",
            Portrait: "Content/Images/Portraits/NPC/!blank.png",
            Strength: 2,
            TemporaryHitPoints: 0,
            Wisdom: 1
        }),
        new Character({
            Charisma: 0,
            ClassPowerHitPoints: 0,
            Constitution: 1,
            CurrentHitPoints: 21,
            Dexterity: 1,
            EnhancedHitPoints: 0,
            Intelligence: 2,
            MaxHitPoints: 21,
            Name: "Caiside Braith",
            Portrait: "Content/Images/Portraits/PC/Caiside.png",
            Strength: 1,
            TemporaryHitPoints: 0,
            Wisdom: 2
        }),
        new Character({
            Charisma: 3,
            ClassPowerHitPoints: 0,
            Constitution: 2,
            CurrentHitPoints: 28,
            Dexterity: 0,
            EnhancedHitPoints: 0,
            Intelligence: -1,
            MaxHitPoints: 28,
            Name: "Gwynn Roberts",
            Portrait: "Content/Images/Portraits/PC/gwynn.png",
            Strength: 2,
            TemporaryHitPoints: 0,
            Wisdom: 0
        }),
        new Character({
            Charisma: 2,
            ClassPowerHitPoints: 0,
            Constitution: 2,
            CurrentHitPoints: 20,
            Dexterity: 1,
            EnhancedHitPoints: 0,
            Intelligence: 1,
            MaxHitPoints: 20,
            Name: "Lavenzia Amano",
            Portrait: "Content/Images/Portraits/PC/Lavenzia.png",
            Strength: 0,
            TemporaryHitPoints: 0,
            Wisdom: 1
        }),
        new Character({
            Charisma: 0,
            ClassPowerHitPoints: 0,
            Constitution: 3,
            CurrentHitPoints: 27,
            Dexterity: 2,
            EnhancedHitPoints: 0,
            Intelligence: -1,
            MaxHitPoints: 27,
            Name: "Seirian Cadwallader",
            Portrait: "Content/Images/Portraits/NPC/!blank.png",
            Strength: -1,
            TemporaryHitPoints: 0,
            Wisdom: 2
        }),
        new Character({
            Charisma: -2,
            ClassPowerHitPoints: 0,
            Constitution: 3,
            CurrentHitPoints: 59,
            Dexterity: -1,
            EnhancedHitPoints: 0,
            Intelligence: -3,
            MaxHitPoints: 59,
            Name: "Ogre",
            Portrait: "Content/Images/Portraits/Giant/Ogre.png",
            Strength: 4,
            TemporaryHitPoints: 0,
            Wisdom: -2
        }),
        new Character({
            Charisma: -2,
            ClassPowerHitPoints: 0,
            Constitution: 2,
            CurrentHitPoints: 37,
            Dexterity: 2,
            EnhancedHitPoints: 0,
            Intelligence: -4,
            MaxHitPoints: 37,
            Name: "Dire Wolf",
            Portrait: "Content/Images/Portraits/Beast/direwolf.png",
            Strength: 3,
            TemporaryHitPoints: 0,
            Wisdom: 1
        }),
        new Character({
            Charisma: -2,
            ClassPowerHitPoints: 0,
            Constitution: 1,
            CurrentHitPoints: 11,
            Dexterity: 2,
            EnhancedHitPoints: 0,
            Intelligence: -4,
            MaxHitPoints: 11,
            Name: "Dire Puppy",
            Portrait: "Content/Images/Portraits/Beast/direwolf.png",
            Strength: 1,
            TemporaryHitPoints: 0,
            Wisdom: 1
        }),
        new Character({
            Charisma: -1,
            ClassPowerHitPoints: 0,
            Constitution: 3,
            CurrentHitPoints: 56,
            Dexterity: 2,
            EnhancedHitPoints: 0,
            Intelligence: -4,
            MaxHitPoints: 56,
            Name: "Griffon",
            Portrait: "Content/Images/Portraits/Monstrosity/Griffon.png",
            Strength: 4,
            TemporaryHitPoints: 0,
            Wisdom: 1
        }),
        new Character({
            Charisma: 0,
            ClassPowerHitPoints: 0,
            Constitution: 1,
            CurrentHitPoints: 11,
            Dexterity: 1,
            EnhancedHitPoints: 0,
            Intelligence: 0,
            MaxHitPoints: 11,
            Name: "Bandit",
            Portrait: "Content/Images/Portraits/NPC/Bandit.png",
            Strength: 0,
            TemporaryHitPoints: 0,
            Wisdom: 0
        }),
        new Character({
            Charisma: 2,
            ClassPowerHitPoints: 0,
            Constitution: 2,
            CurrentHitPoints: 65,
            Dexterity: 3,
            EnhancedHitPoints: 0,
            Intelligence: 2,
            MaxHitPoints: 65,
            Name: "Bandit Leader",
            Portrait: "Content/Images/Portraits/NPC/Bandit.png",
            Strength: 2,
            TemporaryHitPoints: 0,
            Wisdom: 0
        }),
        new Character({
            Charisma: 0,
            ClassPowerHitPoints: 0,
            Constitution: 2,
            CurrentHitPoints: 23,
            Dexterity: 2,
            EnhancedHitPoints: 0,
            Intelligence: -1,
            MaxHitPoints: 23,
            Name: "Guard Captain",
            Portrait: "Content/Images/Portraits/NPC/Guard.png",
            Strength: 3,
            TemporaryHitPoints: 0,
            Wisdom: 1
        }),
        new Character({
            Charisma: 0,
            ClassPowerHitPoints: 0,
            Constitution: 1,
            CurrentHitPoints: 11,
            Dexterity: 1,
            EnhancedHitPoints: 0,
            Intelligence: 0,
            MaxHitPoints: 11,
            Name: "Guard",
            Portrait: "Content/Images/Portraits/NPC/Guard.png",
            Strength: 1,
            TemporaryHitPoints: 0,
            Wisdom: 0
        }),
        new Character({
            Charisma: 3,
            ClassPowerHitPoints: 0,
            Constitution: 1,
            CurrentHitPoints: 17,
            Dexterity: 5,
            EnhancedHitPoints: 0,
            Intelligence: 3,
            MaxHitPoints: 17,
            Name: "Pixie",
            Portrait: "Content/Images/Portraits/Fey/pixie.png",
            Strength: -2,
            TemporaryHitPoints: 0,
            Wisdom: 2
        }),
        new Character({
            Charisma: -2,
            ClassPowerHitPoints: 0,
            Constitution: 3,
            CurrentHitPoints: 42,
            Dexterity: 0,
            EnhancedHitPoints: 0,
            Intelligence: -2,
            MaxHitPoints: 42,
            Name: "Polar Bear",
            Portrait: "Content/Images/Portraits/Beast/polarbear.png",
            Strength: 5,
            TemporaryHitPoints: 0,
            Wisdom: 1
        }),
        new Character({
            Charisma: 5,
            ClassPowerHitPoints: 0,
            Constitution: 1,
            CurrentHitPoints: 66,
            Dexterity: 3,
            EnhancedHitPoints: 0,
            Intelligence: 2,
            MaxHitPoints: 66,
            Name: "Succubus",
            Portrait: "Content/Images/Portraits/Demon/succubus.png",
            Strength: -1,
            TemporaryHitPoints: 0,
            Wisdom: 1
        }),
        new Character({
            Charisma: 2,
            ClassPowerHitPoints: 0,
            Constitution: 1,
            CurrentHitPoints: 10,
            Dexterity: 3,
            EnhancedHitPoints: 0,
            Intelligence: 0,
            MaxHitPoints: 10,
            Name: "Imp",
            Portrait: "Content/Images/Portraits/Demon/imp.png",
            Strength: -2,
            TemporaryHitPoints: 0,
            Wisdom: 1
        }),
        new Character({
            Charisma: 1,
            ClassPowerHitPoints: 0,
            Constitution: 2,
            CurrentHitPoints: 39,
            Dexterity: 2,
            EnhancedHitPoints: 0,
            Intelligence: 1,
            MaxHitPoints: 39,
            Name: "Hobgoblin Captain",
            Portrait: "Content/Images/Portraits/NPC/Hobgoblin.png",
            Strength: 2,
            TemporaryHitPoints: 0,
            Wisdom: 0
        }),
        new Character({
            Charisma: -1,
            ClassPowerHitPoints: 0,
            Constitution: 1,
            CurrentHitPoints: 11,
            Dexterity: 1,
            EnhancedHitPoints: 0,
            Intelligence: 0,
            MaxHitPoints: 11,
            Name: "Hobgoblin",
            Portrait: "Content/Images/Portraits/NPC/Hobgoblin.png",
            Strength: 1,
            TemporaryHitPoints: 0,
            Wisdom: 0
        }),
        new Character({
            Charisma: -3,
            ClassPowerHitPoints: 0,
            Constitution: 5,
            CurrentHitPoints: 126,
            Dexterity: 0,
            EnhancedHitPoints: 0,
            Intelligence: -5,
            MaxHitPoints: 126,
            Name: "Fin Lizard",
            Portrait: "Content/Images/Portraits/Beast/crocodile.png",
            Strength: 6,
            TemporaryHitPoints: 0,
            Wisdom: 0
        }),
        new Character({
            Charisma: -1,
            ClassPowerHitPoints: 0,
            Constitution: 1,
            CurrentHitPoints: 27,
            Dexterity: 2,
            EnhancedHitPoints: 0,
            Intelligence: -1,
            MaxHitPoints: 27,
            Name: "Tentacle Person",
            Portrait: "Content/Images/Portraits/NPC/Kuo_Toa.png",
            Strength: 2,
            TemporaryHitPoints: 0,
            Wisdom: 0
        }),
        new Character({
            Charisma: 1,
            ClassPowerHitPoints: 0,
            Constitution: 1,
            CurrentHitPoints: 16,
            Dexterity: 0,
            EnhancedHitPoints: 0,
            Intelligence: 0,
            MaxHitPoints: 16,
            Name: "Eel with Feet",
            Portrait: "Content/Images/Portraits/Beast/eel.png",
            Strength: 2,
            TemporaryHitPoints: 0,
            Wisdom: 0
        }),
    ];
    return CharacterAdder;
}(React.Component));
//# sourceMappingURL=CharacterAdder.js.map