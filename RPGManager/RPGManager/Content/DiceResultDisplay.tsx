class DiceResultDisplay extends React.Component {
    public props: {
        diceResults: DiceResult[],
        dismiss: (event: React.MouseEvent<HTMLButtonElement>) => void
    }

    public static diceResultToRow(value: DiceResult, index: number, array: DiceResult[]) {
        return <div>{value.characterName + " rolled a " + value.diceResult}</div>;
    }

    public render() {
        if (!this.props.diceResults || this.props.diceResults.length === 0) {
            return null;
        }
        return (
            <div className="dice-result-container">
                {this.props.diceResults.map(DiceResultDisplay.diceResultToRow)}
                <div className="popup-button-container">
                    <button onClick={this.props.dismiss}>OK</button>
                </div>
            </div>
        );
    }
}