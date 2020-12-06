class SessionCharacter extends React.Component {
    props: {
        character: Character
    }

    state: {
        expanded: boolean,
        portraitSize: number,
        bodySize: number
    }

    constructor(props: any) {
        super(props);

        this.state = {
            expanded: false,
            portraitSize: 100,
            bodySize: 380
        };

        this.expandCollapse = this.expandCollapse.bind(this);
    }

    expandCollapse() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
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
            </div>
       );
    }
}