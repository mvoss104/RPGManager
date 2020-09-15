//============================
// Copyright 2018 Michael Voss
//
// SummaryView is responsible for organizing all details of the summary
//============================

class SummaryView extends React.Component {
    props: {
        isDM: boolean,
        activeRow: CombatRow,
        rows: CombatRow[]
    }

    render() {
        let ret = [];
        for (let row of this.props.rows) {
            ret.push(<CharacterRow key={row.Actor.Id} active={row === this.props.activeRow} character={row.Actor} initiativeCount={row.InitiativeCount} isDM={this.props.isDM} />);
        }
        if (this.props.isDM) {
            ret.push(<div key="bottom-spacer" className="bottom-spacer"></div>);
            ret.push(
                <div key="bottom" className="bottom">
                    <button className="button" onClick={Communication.NextInitiative}>Next Turn</button>
                    <button className="button" onClick={Communication.PrevInitiative}>Previous Turn</button>
                </div>
            );
        }

        return <div className="summary-wrapper">{ret}</div>;
    }
}