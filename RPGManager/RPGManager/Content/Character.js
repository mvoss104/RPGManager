var Character = (function () {
    function Character(fromServer) {
        if (fromServer) {
            this.updateFromServer(fromServer);
        }
        this.Effects = [];
    }
    Character.prototype.beginConcentration = function (name, duration, targets) {
        var newEffect = new Effect();
        newEffect.Name = name;
        newEffect.RemainingRounds = duration;
        newEffect.Concentrator = this;
        this.ConcentratingOn = newEffect;
        if (targets) {
            for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
                var target = targets_1[_i];
                target.Effects.push(newEffect);
            }
        }
    };
    Character.prototype.updateFromServer = function (fromServer) {
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
        this.LocationX = fromServer.LocationX;
        this.LocationY = fromServer.LocationY;
    };
    return Character;
}());
//# sourceMappingURL=Character.js.map