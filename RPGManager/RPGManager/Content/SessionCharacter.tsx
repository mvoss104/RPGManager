class SessionCharacter extends React.Component {
    private static readonly __rollerSize = 40;

    props: {
        character: Character
    }

    state: {
        hpAdjust: number,
        expanded: boolean,
        portraitSize: number,
        bodySize: number
    }

    constructor(props: any) {
        super(props);

        this.state = {
            hpAdjust: 0,
            expanded: false,
            portraitSize: 100,
            bodySize: 380
        };

        this.expandCollapse = this.expandCollapse.bind(this);
        this.rollStat = this.rollStat.bind(this);
        this.updateHpAdjust = this.updateHpAdjust.bind(this);
        this.applyDamage = this.applyDamage.bind(this);
        this.applyHealing = this.applyHealing.bind(this);
        this.addTempHp = this.addTempHp.bind(this);
        this.addClassHp = this.addClassHp.bind(this);
        this.addEnhancedHp = this.addEnhancedHp.bind(this);
    }

    expandCollapse() {
        this.setState({ expanded: !this.state.expanded });
    }

    swallowEvent(event: React.MouseEvent<HTMLElement>) {
        event.stopPropagation();
        event.preventDefault();
        return false;
    }

    rollStat(stat: string, profMult: number) {
        let modifier = this.props.character[stat] + (this.props.character.Proficiency * profMult);
        if (modifier >= 0) {
            Communication.RollDice(this.props.character.Id, "1d20+" + modifier);
        }
        else {
            Communication.RollDice(this.props.character.Id, "1d20" + modifier);
        }
    }

    updateHpAdjust(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ hpAdjust: parseInt(event.target.value) });
    }

    applyDamage() {
        Communication.DamageCharacter(this.props.character.Id, this.state.hpAdjust);
    }

    applyHealing() {
        Communication.HealCharacter(this.props.character.Id, this.state.hpAdjust);
    }

    addTempHp() {
        Communication.AddTempHp(this.props.character.Id, this.state.hpAdjust);
    }

    addClassHp() {
        Communication.AddClassHp(this.props.character.Id, this.state.hpAdjust);
    }

    addEnhancedHp() {
        Communication.AddEnhancedHp(this.props.character.Id, this.state.hpAdjust);
    }

    render() {
        const rollRegular = new Die();
        rollRegular.DieType = DiceType.d20;
        rollRegular.Colors = ["Grey"];
        rollRegular.TextColor = "White";

        const rollProf = new Die();
        rollProf.DieType = DiceType.d20;
        rollProf.Colors = ["Grey", "Gold"];
        rollProf.TextColor = "White";

        const rollExpert = new Die();
        rollExpert.DieType = DiceType.d20;
        rollExpert.Colors = ["Gold"];
        rollExpert.TextColor = "White";

        return (
            <div key="summary-row" className="character-row session" style={{ height: this.state.portraitSize }} onClick={this.expandCollapse} ref="RowElement">
                <div style={{ width: "calc(100% - " + (this.state.bodySize + this.state.portraitSize) + "px)" }}></div>
                <div className="character-info-wrapper" style={{ height: this.state.portraitSize, width: this.state.bodySize }}>
                    <div className="character-name" style={{ fontSize: (this.state.portraitSize * 0.25) + "px" }}>{this.props.character.Name}</div>
                    <div className="character-concentrating">
                        {this.props.character.ConcentratingOn ?
                            [<div key="concentration-label" className="effect-label" style={{ fontSize: (this.state.portraitSize * 0.15) + "px" }}>Conc: </div>,
                            <EffectDisplay key="concentration-effect" effect={this.props.character.ConcentratingOn} fontSize={this.state.portraitSize * 0.15} />] :
                            <div>Not Concentrating</div>
                        }
                    </div>
                    <EffectListDisplay effects={this.props.character.Effects} fontSize={this.state.portraitSize * 0.15} />
                </div>
                <div className="character-portrait-wrapper" style={{ height: this.state.portraitSize, width: this.state.portraitSize }}>
                    <PortraitLifebar
                        draggable={true}
                        characterId={this.props.character.Id}
                        size={this.state.portraitSize}
                        currentHitPoints={this.props.character.CurrentHitPoints}
                        maxHitPoints={this.props.character.MaxHitPoints + this.props.character.EnhancedHitPoints}
                        extraHitPoints={this.props.character.TemporaryHitPoints + this.props.character.ClassPowerHitPoints}
                        portrait={this.props.character.Portrait}
                        showDetails={true}
                    />
                </div>
                {this.state.expanded ?
                    <div className="character-sheet" onClick={this.swallowEvent}>
                        <div className="stat-block">
                            <div>
                                <div className="stat-box">
                                    <div className="stat-name">STR</div>
                                    {this.props.character.Strength}
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Strength", 0); }} title="Roll Strength">
                                    <DieDisplay die={rollRegular} size={SessionCharacter.__rollerSize} />
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Strength", 1); }} title="Roll Strength with Proficiency">
                                    <DieDisplay die={rollProf} size={SessionCharacter.__rollerSize} />
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Strength", 2); }} title="Roll Strength with Expertise">
                                    <DieDisplay die={rollExpert} size={SessionCharacter.__rollerSize} />
                                </div>
                            </div>
                            <div>
                                <div className="stat-box">
                                    <div className="stat-name">DEX</div>
                                    {this.props.character.Dexterity}
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Dexterity", 0); }} title="Roll Dexterity">
                                    <DieDisplay die={rollRegular} size={SessionCharacter.__rollerSize} />
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Dexterity", 1); }} title="Roll Dexterity with Proficiency">
                                    <DieDisplay die={rollProf} size={SessionCharacter.__rollerSize} />
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Dexterity", 2); }} title="Roll Dexterity with Expertise">
                                    <DieDisplay die={rollExpert} size={SessionCharacter.__rollerSize} />
                                </div>
                            </div>
                            <div>
                                <div className="stat-box">
                                    <div className="stat-name">CON</div>
                                    {this.props.character.Constitution}
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Constitution", 0); }} title="Roll Constitution">
                                    <DieDisplay die={rollRegular} size={SessionCharacter.__rollerSize} />
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Constitution", 1); }} title="Roll Constitution with Proficiency">
                                    <DieDisplay die={rollProf} size={SessionCharacter.__rollerSize} />
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Constitution", 2); }} title="Roll Constitution with Expertise">
                                    <DieDisplay die={rollExpert} size={SessionCharacter.__rollerSize} />
                                </div>
                            </div>
                            <div>
                                <div className="stat-box">
                                    <div className="stat-name">INT</div>
                                    {this.props.character.Intelligence}
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Intelligence", 0); }} title="Roll Intelligence">
                                    <DieDisplay die={rollRegular} size={SessionCharacter.__rollerSize} />
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Intelligence", 1); }} title="Roll Intelligence with Proficiency">
                                    <DieDisplay die={rollProf} size={SessionCharacter.__rollerSize} />
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Intelligence", 2); }} title="Roll Intelligence with Expertise">
                                    <DieDisplay die={rollExpert} size={SessionCharacter.__rollerSize} />
                                </div>
                            </div>
                            <div>
                                <div className="stat-box">
                                    <div className="stat-name">WIS</div>
                                    {this.props.character.Wisdom}
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Wisdom", 0); }} title="Roll Wisdom">
                                    <DieDisplay die={rollRegular} size={SessionCharacter.__rollerSize} />
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Wisdom", 1); }} title="Roll Wisdom with Proficiency">
                                    <DieDisplay die={rollProf} size={SessionCharacter.__rollerSize} />
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Wisdom", 2); }} title="Roll Wisdom with Expertise">
                                    <DieDisplay die={rollExpert} size={SessionCharacter.__rollerSize} />
                                </div>
                            </div>
                            <div>
                                <div className="stat-box">
                                    <div className="stat-name">CHA</div>
                                    {this.props.character.Charisma}
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Charisma", 0); }} title="Roll Charisma">
                                    <DieDisplay die={rollRegular} size={SessionCharacter.__rollerSize} />
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Charisma", 1); }} title="Roll Charisma with Proficiency">
                                    <DieDisplay die={rollProf} size={SessionCharacter.__rollerSize} />
                                </div>
                                <div className="stat-roller" onClick={() => { this.rollStat("Charisma", 2); }} title="Roll Charisma with Expertise">
                                    <DieDisplay die={rollExpert} size={SessionCharacter.__rollerSize} />
                                </div>
                            </div>
                        </div>
                        <div className="hp-block">
                            <div className="hp-text">Hit Points</div>
                            <div className="hp-text">{this.props.character.CurrentHitPoints + this.props.character.TemporaryHitPoints + this.props.character.EnhancedHitPoints + this.props.character.ClassPowerHitPoints}/{this.props.character.MaxHitPoints}</div>
                            <div>
                                <input className="input" onChange={this.updateHpAdjust} value={this.state.hpAdjust || ""} />
                            </div>
                            <div className="hp-buttons">
                                <button className="button" onClick={this.applyDamage}>Damage</button>
                                <button className="button" onClick={this.applyHealing}>Heal</button>
                            </div>
                            <div className="hp-buttons">
                                <button className="button" onClick={this.addTempHp}>Temp HP</button>
                                <button className="button" onClick={this.addEnhancedHp}> Enh HP</button>
                                <button className="button" onClick={this.addClassHp}>Class HP</button>
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
       );
    }
}