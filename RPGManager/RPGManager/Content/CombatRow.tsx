//============================
// Copyright 2018 Michael Voss
//
// CombatRow allows the placement of an entity in the initiative order.
//============================

class CombatRow {
    /**
     * This is the count on which the actor acts.
     */
    InitiativeCount: number;

    /**
     * This is who or what acts on that initiative count.
     */
    Actor: Character;
}