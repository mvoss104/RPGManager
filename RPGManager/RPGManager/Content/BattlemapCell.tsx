class BattlemapCell extends React.Component {
    public props: {
        x: number,
        y: number,
        isDM: boolean,
        isWall: boolean,
        combatRow: CombatRow,
    }

    public state: {
        highlight: boolean
    }

    constructor(props: any) {
        super(props);

        this.state = {
            highlight: false
        };

        this.drop = this.drop.bind(this);
        this.dragEnter = this.dragEnter.bind(this);
        this.dragExit = this.dragExit.bind(this);
        this.click = this.click.bind(this);
    }

    public drop(event: React.DragEvent<HTMLDivElement>) {
        this.setState({ highlight: false });
        Communication.UpdateCombatRow(parseInt(event.dataTransfer.getData("text")), null, this.props.x, this.props.y);
    }

    public dragEnter(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        if (!this.state.highlight) {
            this.setState({ highlight: true });
        }
    }

    public dragExit(event: React.DragEvent<HTMLDivElement>) {
        if (this.state.highlight) {
            this.setState({ highlight: false });
        }
    }

    public click(event: React.MouseEvent<HTMLDivElement>) {
        if (this.props.isDM) {
            if (this.props.isWall) {
                Communication.RemoveWall(this.props.x, this.props.y);
            }
            else {
                Communication.AddWall(this.props.x, this.props.y);
            }
        }
    }

    public render() {
        return (
            <td className={"battlemap-cell" + (this.state.highlight ? " highlight" : "") + (this.props.isWall ? " wall" : "")}>
                <div className="battlemap-cell-contents"
                    onDrop={this.drop}
                    onDragEnter={this.dragEnter}
                    onDragOver={this.dragEnter}
                    onDragExit={this.dragExit}
                    onDragLeave={this.dragExit}
                    onClick={this.click}>
                    {this.props.combatRow ?
                        <PortraitLifebar
                            draggable={this.props.isDM}
                            characterId={this.props.combatRow.Actor.Id}
                            size={Battlemap.cellSize}
                            currentHitPoints={this.props.combatRow.Actor.CurrentHitPoints}
                            maxHitPoints={this.props.combatRow.Actor.MaxHitPoints + this.props.combatRow.Actor.EnhancedHitPoints}
                            extraHitPoints={this.props.combatRow.Actor.TemporaryHitPoints + this.props.combatRow.Actor.ClassPowerHitPoints}
                            portrait={this.props.combatRow.Actor.Portrait}
                            showDetails={this.props.isDM}
                        />
                        : null}
                </div>
            </td>
        );
    }
}