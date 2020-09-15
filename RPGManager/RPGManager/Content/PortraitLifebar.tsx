//============================
// Copyright 2018 Michael Voss
//
// PortraitLifebar is responsible for presenting a circular lifebar with a portrait in the middle.
//============================

class PortraitLifebar extends React.Component {
    static def_id: number;

    props: {
        size: number,
        currentHitPoints: number,
        maxHitPoints: number,
        extraHitPoints: number,
        portrait: string,
        showDetails: boolean
    }

    state: {
        def_id: number;
    }

    constructor(props:any) {
        super(props);

        PortraitLifebar.def_id = PortraitLifebar.def_id + 1 || 0;

        this.state = { def_id: PortraitLifebar.def_id };
    }

    render() {
        let tau: number = 6.28318;
        let radius: number = 54;
        let circumfrence = tau * radius;
        let lost = (this.props.maxHitPoints - this.props.currentHitPoints) / this.props.maxHitPoints;
        let temp = (this.props.maxHitPoints - this.props.extraHitPoints) / this.props.maxHitPoints;

        return (
            <svg width={this.props.size} height={this.props.size} viewBox="0 0 120 120">
                <defs>
                    <pattern id={"portrait" + this.state.def_id} x="0" y="0" width="1" height="1">
                        <image width="120" height="120" href={(location.pathname + "/" + this.props.portrait).replace("//","/")} />
                    </pattern>
                </defs>
                <circle cx="60" cy="60" r={radius} fill={"url(#portrait"+this.state.def_id+")"} stroke="#e0e0e0" strokeWidth="12" />
                <circle cx="180" cy="60" r={radius} fill="none" stroke="#992222" strokeWidth="12" strokeDasharray={circumfrence} strokeDashoffset={circumfrence * lost} strokeLinecap="butt" transform="rotate(-90 180 60) scale(1,-1)" />
                <circle cx="180" cy="60" r={radius} fill="none" stroke="#BB9922" strokeWidth="12" strokeDasharray={circumfrence} strokeDashoffset={circumfrence * temp} strokeLinecap="butt" transform="rotate(-90 180 60) scale(1,-1)" />
                {
                    this.props.showDetails ?
                        <g>
                            <text x="50%" textAnchor="middle" y="100" className="character-hitpoints">{this.props.currentHitPoints}/{this.props.maxHitPoints}</text>
                        </g>
                    : null
                }
            </svg>
        );
    }
}