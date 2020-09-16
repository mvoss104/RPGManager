class Battlemap extends React.Component {
    public static cellSize = 30;

    props: {
        isDM: boolean,
        combatRows: CombatRow[],
        walls: boolean[][]
    }

    constructor(props: any) {
        super(props);

        this.getCombatRowInPosition = this.getCombatRowInPosition.bind(this);
    }

    public getCombatRowInPosition(x: number, y: number): CombatRow {
        for (let row of this.props.combatRows) {
            if (row.LocationX == x && row.LocationY == y) {
                return row;
            }
        }
        return null;
    }

    render() {
        let rows = [];
        for (var y = 1; y <= 30; y++) {
            let cells = [];
            for (var x = 1; x <= 30; x++) {
                let row = this.getCombatRowInPosition(x, y);
                cells.push(<BattlemapCell combatRow={row} x={x} y={y} isDM={this.props.isDM} isWall={this.props.walls[x] && this.props.walls[x][y]} />);
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