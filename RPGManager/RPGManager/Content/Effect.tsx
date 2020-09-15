//============================
// Copyright 2018 Michael Voss
//
// Effect tracks the source and targets of an effect.
//============================

class Effect {
    /**
     * Name of the effect
     */
    Name: string;

    /**
     * The amount of time, in rounds, that the effect has remaining.
     */
    RemainingRounds: number;

    /**
     * The character, if any, who is concentrating on this effect.
     */
    Concentrator?: Character;

    /**
     * The characters effected by this effect.
     */
    Effected?: Character[];
}