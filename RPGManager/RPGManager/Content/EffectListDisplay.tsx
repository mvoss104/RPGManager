//============================
// Copyright 2018 Michael Voss
//
// EffectListDisplay is responsible for presenting a list of effects in summary.
//============================

class EffectListDisplay extends React.Component {
    props: {
        fontSize: number,
        effects: Effect[]
    }

    render() {
        if (this.props.effects && this.props.effects.length > 0) {
            return (
                <div className="effects-container">
                    <div className="effect-label" style={{ fontSize: this.props.fontSize + "px" }}>Effected By: </div>
                    {this.props.effects.map((effect, index, effects) => {
                        if (index === effects.length - 1) {
                            return [<EffectDisplay fontSize={this.props.fontSize} effect={effect} />];
                        }
                        else {
                            return [<EffectDisplay fontSize={this.props.fontSize} effect={effect} />, <span className="effect-label" style={{ fontSize: this.props.fontSize + "px" }}>, </span>];
                        }
                    })}
                </div>
            );
        }
        return null;
    }
}