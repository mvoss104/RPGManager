//============================
// Copyright 2018 Michael Voss
//
// CharacterAdder allows the DM to add a character to the initiative order.
//============================

declare var updatePortraitOptions: Function;
declare var receiveSavedCharacters: Function;

class CharacterAdder extends React.Component {
    public static preGenCharacters: Character[] = [
        // ===================================================================================================
        // ========================================= Player Characters =======================================
        // ===================================================================================================
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
            Wisdom: 1,
        } as Character),
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
            Wisdom: 1,
        } as Character),
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
            Wisdom: 2,
        } as Character),
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
            Wisdom: 0,
        } as Character),
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
            Wisdom: 1,
        } as Character),
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
            Wisdom: 2,
        } as Character),

        // ===================================================================================================
        // ============================================= Monsters ============================================
        // ===================================================================================================
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
            Wisdom: -2,
        } as Character),

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
            Wisdom: 1,
        } as Character),

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
            Wisdom: 1,
        } as Character),

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
        } as Character),

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
        } as Character),

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
        } as Character),

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
        } as Character),

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
        } as Character),

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
        } as Character),

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
        } as Character),

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
        } as Character),

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
        } as Character),

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
        } as Character),

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
        } as Character),

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
        } as Character),

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
        } as Character),

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
        } as Character),
    ];

    state: {
        name: string,
        initiative: number,
        currentHP: number,
        maxHP: number,
        portrait: string,
        portraitOptions: string[]
    }

    constructor(props: any) {
        super(props);

        this.state = {
            name: "",
            initiative: 0,
            currentHP: 0,
            maxHP: 0,
            portrait: "",
            portraitOptions: []
        }

        this.updateInit = this.updateInit.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updatePortrait = this.updatePortrait.bind(this);
        this.updateCurrentHP = this.updateCurrentHP.bind(this);
        this.updateMaxHP = this.updateMaxHP.bind(this);
        this.updateCharacter = this.updateCharacter.bind(this);

        updatePortraitOptions = this.setOptions.bind(this);

        this.addCharacter = this.addCharacter.bind(this);

        Communication.GetPortraits();
    }

    updateCurrentHP(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ currentHP: parseInt(event.target.value) });
    }

    updateMaxHP(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ maxHP: parseInt(event.target.value) });
    }

    updateInit(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ initiative: parseInt(event.target.value) });
    }

    updateName(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ name: event.target.value });
    }

    updatePortrait(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ portrait: event.target.value });
    }

    updateCharacter(event: React.ChangeEvent<HTMLInputElement>) {
        let pickedChar = CharacterAdder.preGenCharacters[parseInt(event.target.value)];
        let init = Math.floor((Math.random() * 20) + 1) + pickedChar.Dexterity;
        (document.getElementById("current-hp-field") as HTMLInputElement).value = pickedChar.CurrentHitPoints.toString();
        (document.getElementById("max-hp-field") as HTMLInputElement).value = pickedChar.MaxHitPoints.toString();
        (document.getElementById("name-field") as HTMLInputElement).value = pickedChar.Name;
        (document.getElementById("init-field") as HTMLInputElement).value = init.toString();
        (document.getElementById("portrait-field") as HTMLInputElement).value = pickedChar.Portrait;
        this.setState({
            currentHP: pickedChar.CurrentHitPoints,
            maxHP: pickedChar.MaxHitPoints,
            initiative: init,
            name: pickedChar.Name,
            portrait: pickedChar.Portrait
        });
    }

    addCharacter() {
        let newChar = new Character();
        newChar.Name = this.state.name;
        newChar.Portrait = this.state.portrait;
        newChar.CurrentHitPoints = this.state.currentHP;
        newChar.MaxHitPoints = this.state.maxHP;
        Communication.AddCharacter(newChar, this.state.initiative);
    }

    setOptions(options: string[]) {
        this.setState({
            portraitOptions: options
        });
    }

    getPreGenOptions() {
        let ret = [];
        for (var c = 0; c < CharacterAdder.preGenCharacters.length; c++) {
            ret.push(<option key={c} value={c}>{CharacterAdder.preGenCharacters[c].Name}</option>);
        }
        return ret;
    }

    render() {
        return (
            <div className="adder-wrapper">
                <label>Name:</label>
                <input id="name-field" className="input" onChange={this.updateName} />
                <label>Initiative:</label>
                <input id="init-field" className="input" onChange={this.updateInit} />
                <div className="columns">
                    <div className="column">
                        <label>Current HP:</label>
                        <input id="current-hp-field" className="input" onChange={this.updateCurrentHP} />
                    </div>
                    <div className="column">
                        <label>Max HP:</label>
                        <input id="max-hp-field" className="input" onChange={this.updateMaxHP} />
                    </div>
                </div>
                <div>
                    <label>Portrait:</label>
                </div>
                <div>
                    <input id="portrait-field" list="portrait-list" className="select" onChange={this.updatePortrait} />
                    <datalist id="portrait-list">
                        <option key="blank" value=""></option>
                        {this.state.portraitOptions.map((option) => {
                            return <option key={option} value={option}>{option}</option>
                        })}
                    </datalist>
                </div>
                <button className="button is-pulled-right" onClick={this.addCharacter}>Add Character</button>
                <div>
                    <input list="character-list" className="select" onChange={this.updateCharacter} />
                    <datalist id="character-list">
                        <option key="blank" value=""></option>
                        {this.getPreGenOptions()}
                    </datalist>
                </div>
            </div>
        );
    }
}