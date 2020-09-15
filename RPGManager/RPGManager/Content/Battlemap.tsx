class Battlemap extends React.Component {
    private static cellSize = 30;

    props: {
        isDM: boolean,
        combatRows: CombatRow[]
    }

    constructor(props: any) {
        super(props);

        this.getCharacterInPosition = this.getCharacterInPosition.bind(this);
    }

    public getCharacterInPosition(x: number, y: number): Character {
        for (let row of this.props.combatRows) {
            if (row.Actor.LocationX == x && row.Actor.LocationY == y) {
                return row.Actor;
            }
        }
        return null;
    }

    render() {
        let rows = [];
        for (var y = 0; y < 10; y++) {
            let cells = [];
            for (var x = 0; x < 10; x++) {
                let character = this.getCharacterInPosition(x, y);
                let characterPortrait = null;
                if (character) {
                    characterPortrait = <PortraitLifebar
                        size={Battlemap.cellSize}
                        currentHitPoints={character.CurrentHitPoints}
                        maxHitPoints={character.MaxHitPoints + character.EnhancedHitPoints}
                        extraHitPoints={character.TemporaryHitPoints + character.ClassPowerHitPoints}
                        portrait={character.Portrait}
                        showDetails={this.props.isDM}
                    />
                }
                cells.push(<td key={x} className="battlemap-cell"><div className="battlemap-cell-contents">{characterPortrait}</div></td>)
            }
            rows.push(<tr key={y} style={{ height: Battlemap.cellSize }}>{cells}</tr>);
        }
        return (
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}