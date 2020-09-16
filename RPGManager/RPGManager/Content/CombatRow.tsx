//============================
// Copyright 2018 Michael Voss
//
// CombatRow allows the placement of an entity in the initiative order.
//============================

class CombatRow {
    /**
     * This is the count on which the actor acts.
     */
    public InitiativeCount: number;

    /**
     * The location of the character on the map on the X axis.
     */
    public LocationX: number;

    /**
     * The location of the character on the map on the Y axis.
     */
    public LocationY: number;

    /**
     * This is who or what acts on that initiative count.
     */
    public Actor: Character;
}