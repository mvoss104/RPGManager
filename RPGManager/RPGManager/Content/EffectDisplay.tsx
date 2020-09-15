//============================
// Copyright 2018 Michael Voss
//
// CharacterRow is responsible for presenting a row for a character in an initiative order.
//============================

class EffectDisplay extends React.Component {
    props: {
        fontSize: number,
        effect: Effect
    }

    render() {
        let tooltip: string;
        if (this.props.effect.Concentrator) {
            tooltip = "From " + this.props.effect.Concentrator.Name;
        }
        else {
            tooltip = "Not connected to source";
        }

        return (
            <div className="effect-container" title={tooltip} style={{ fontSize: this.props.fontSize + "px" }}>
                <div className="effect-name">{this.props.effect.Name}</div>
                <div className="effect-duration">({this.props.effect.RemainingRounds})</div>
            </div>
        );
    }
}