//============================
// Copyright 2018 Michael Voss
//
// Character reflects the data storage of a Character object.
//============================

class Character {
    /**
     * The effect that the character is currently concentrating on.
     */
    ConcentratingOn?: Effect;

    /**
     * The effects that the character is currently effected by.
     */
    Effects?: Effect[];

    /**
     * The character's ID
     */
    Id?: number;

    /**
     * The character's name.
     */
    Name: string;

    /**
     * Path to this character's portrait image.
     */
    Portrait: string;

    /**
     * Hit points granted by a class power.
     */
    ClassPowerHitPoints: number;

    /**
     * Temporary hit points, which are depleted before regular hit points.
     */
    TemporaryHitPoints: number;

    /**
     * Magical increase to maximum hit points
     */
    EnhancedHitPoints: number;

    /**
     * Current hit points.
     */
    CurrentHitPoints: number;

    /**
     * Maximum hit poins.
     */
    MaxHitPoints: number;

    Strength: number;

    Dexterity: number;

    Constitution: number;

    Intelligence: number;

    Wisdom: number;

    Charisma: number;

    Proficiency: number;

    DiceColors: string[];

    DiceForeground: string;

    /**
     * Create a new blank character 
     */
    constructor();

    /**
     * Create a copy of a character based on flattened data from the server
     * @param fromServer the object from the server
     */
    constructor(fromServer: Character);

    /**
     * Create a new instance of Character
     * @param fromServer the object from the server
     */
    constructor(fromServer?: Character) {
        if (fromServer) {
            this.updateFromServer(fromServer);
        }

        this.Effects = [];
    }

    /**
     * Begin concentration on an effect
     * @param name The name of the effect
     * @param duration The duration of the effect
     * @param targets The characters effected by the effect
     */
    public beginConcentration(name: string, duration: number, targets?: Character[]) {
        let newEffect = new Effect();
        newEffect.Name = name;
        newEffect.RemainingRounds = duration;
        newEffect.Concentrator = this;
        this.ConcentratingOn = newEffect;
        if (targets) {
            for (let target of targets) {
                target.Effects.push(newEffect);
            }
        }
    }

    /**
     * Use data from the server to update this character.
     * @param fromServer the data to use for the update.
     */
    public updateFromServer(fromServer: Character) {
        this.Id = fromServer.Id;
        this.Name = fromServer.Name;
        this.Portrait = fromServer.Portrait;
        this.ClassPowerHitPoints = fromServer.ClassPowerHitPoints;
        this.TemporaryHitPoints = fromServer.TemporaryHitPoints;
        this.EnhancedHitPoints = fromServer.EnhancedHitPoints;
        this.CurrentHitPoints = fromServer.CurrentHitPoints;
        this.MaxHitPoints = fromServer.MaxHitPoints;
        this.Strength = fromServer.Strength;
        this.Dexterity = fromServer.Dexterity;
        this.Constitution = fromServer.Constitution;
        this.Intelligence = fromServer.Intelligence;
        this.Wisdom = fromServer.Wisdom;
        this.Charisma = fromServer.Charisma;
        this.Proficiency = fromServer.Proficiency;
        this.DiceColors = fromServer.DiceColors;
        this.DiceForeground = fromServer.DiceForeground;
    }
}