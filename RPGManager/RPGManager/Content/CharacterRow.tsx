//============================
// Copyright 2018 Michael Voss
//
// CharacterRow is responsible for presenting a row for a character in an initiative order.
//============================

class CharacterRow extends React.Component {
    props: {
        initiativeCount: number,
        character: Character,
        active: boolean,
        isDM: boolean
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

        this.updateDimensions = this.updateDimensions.bind(this);
        this.updateHpAdjust = this.updateHpAdjust.bind(this);
        this.expandCollapse = this.expandCollapse.bind(this);

        this.applyDamage = this.applyDamage.bind(this);
        this.applyHealing = this.applyHealing.bind(this);
        this.addTempHp = this.addTempHp.bind(this);
        this.addClassHp = this.addClassHp.bind(this);
        this.addEnhancedHp = this.addEnhancedHp.bind(this);
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

    updateDimensions() {
        let clientWidth = document.body.clientWidth;
        if (!this.props.active) {
            clientWidth -= 25;
        }
        let portrait = clientWidth * 0.2;
        if (portrait > 100) {
            portrait = 100;
        }
        let body = clientWidth - portrait - 10;
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
    }

    updateHpAdjust(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ hpAdjust: parseInt(event.target.value) });
    }

    expandCollapse() {
        this.setState({ expanded: !this.state.expanded });
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (this.props.active) {
            (this.refs.RowElement as Element).scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center"
            });
        }
        if (prevProps.active != this.props.active) {
            this.updateDimensions();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {
        let className;
        if (this.props.active) {
            className = "character-row active";
        }
        else {
            className = "character-row inactive";
        }
        let rows = [];
        rows.push(
            <div key="summary-row" className={className} style={{ height: this.state.portraitSize, width: this.state.portraitSize + this.state.bodySize }} onClick={this.expandCollapse} ref="RowElement">
                <div className="character-portrait-wrapper" style={{ height: this.state.portraitSize, width: this.state.portraitSize }}>
                    <PortraitLifebar
                        draggable={this.props.isDM}
                        characterId={this.props.character.Id}
                        size={this.state.portraitSize}
                        currentHitPoints={this.props.character.CurrentHitPoints}
                        maxHitPoints={this.props.character.MaxHitPoints + this.props.character.EnhancedHitPoints}
                        extraHitPoints={this.props.character.TemporaryHitPoints + this.props.character.ClassPowerHitPoints}
                        portrait={this.props.character.Portrait}
                        showDetails={this.props.isDM}
                    />
                </div>
                <div className="character-info-wrapper" style={{ height: this.state.portraitSize, width: this.state.bodySize }}>
                    <div className="character-name" style={{ fontSize: (this.state.portraitSize * 0.25)+"px" }}>{this.props.character.Name}</div>
                    <div className="character-initiative" style={{ fontSize: (this.state.portraitSize * 0.20) + "px" }}>{this.props.initiativeCount}</div>
                    <div className="character-concentrating">
                        {this.props.character.ConcentratingOn ?
                            [<div key="concentration-label" className="effect-label" style={{ fontSize: (this.state.portraitSize * 0.15) + "px" }}>Conc: </div>,
                                <EffectDisplay key="concentration-effect" effect={this.props.character.ConcentratingOn} fontSize={this.state.portraitSize * 0.15} />] :
                            <div>Not Concentrating</div>
                        }
                    </div>
                    <EffectListDisplay effects={this.props.character.Effects} fontSize={this.state.portraitSize * 0.15} />
                </div>
            </div>
        );

        if (this.props.isDM && this.state.expanded) {
            rows.push(
                <div key="expanded-row" className={className} style={{ height: "50px", width: this.state.portraitSize + this.state.bodySize }}>
                    <div>
                        <input className="input" onChange={this.updateHpAdjust} value={this.state.hpAdjust || ""} />
                    </div>
                    <div>
                        <button className="button" onClick={this.applyDamage}>Damage</button>
                    </div>
                    <div>
                        <button className="button" onClick={this.applyHealing}>Heal</button>
                    </div>
                    <div>
                        <button className="button" onClick={this.addTempHp}>Temp HP</button>
                    </div>
                    <div>
                        <button className="button" onClick={this.addEnhancedHp}> Enh HP</button>
                    </div>
                    <div>
                        <button className="button" onClick={this.addClassHp}>Class HP</button>
                    </div>
                </div>
            );
            rows.push(
                <div key="delete-row" className={className} style={{ height: "30px", width: this.state.portraitSize + this.state.bodySize }}>
                    <button className="button character-delete" onClick={() => { Communication.RemoveCharacter(this.props.character.Id); }}>X</button>
                </div>
            );
        }

        return rows;
    }
}