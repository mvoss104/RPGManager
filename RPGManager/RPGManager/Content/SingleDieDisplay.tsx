class SingleDieDisplay extends React.Component {
    public props: {
        die: Die
    }

    private __dieElement: React.RefObject<HTMLDivElement>;

    private static __animationLength: number = 2000;

    private static __sizeInPixels: number = 50;

    public state: {
        x: number,
        y: number,
        final: boolean
    }

    constructor(props: any) {
        super(props);

        this.state = {
            x: (Math.random() * ((window.innerWidth * 0.8) - SingleDieDisplay.__sizeInPixels) + (window.innerWidth * 0.1)),
            y: (Math.random() * ((window.innerHeight * 0.8) - SingleDieDisplay.__sizeInPixels) + (window.innerHeight * 0.1)),
            final: false
        }

        this.__dieElement = React.createRef();
    }

    public componentDidMount() {
        let bounceY = -(window.innerWidth * this.state.y) / (this.state.x - (2 * window.innerWidth));
        this.__dieElement.current.animate([
            {
                bottom: "0px",
                left: "0px",
                transform: "rotate(270deg)",
                offset: 0,
            } as any,
            {
                bottom: bounceY + "px",
                left: (window.innerWidth - this.__dieElement.current.clientWidth) + "px",
                transform: "rotate(-1890deg)",
                offset: 0.3
            } as any,
            {
                transform: "rotate(-1350deg)",
                offset: 0.4
            },
            {
                transform: "rotate(-900deg)",
                offset: 0.5,
            },
            {
                transform: "rotate(-540deg)",
                offset: 0.6
            },
            {
                transform: "rotate(-270deg)",
                offset: 0.7
            },
            {
                transform: "rotate(-90deg)",
                offset: 0.8
            },
            {
                bottom: this.state.y + "px",
                left: this.state.x + "px",
                transform: "rotate(0deg)",
                offset: 0.9
            }
        ], SingleDieDisplay.__animationLength);
    }

    render() {
        return (
            <div ref={this.__dieElement} style={{
                position: "fixed",
                bottom: this.state.y + "px",
                left: this.state.x + "px",
            }}>
                <DieDisplay die={this.props.die} size={SingleDieDisplay.__sizeInPixels} />
            </div>
        );
    }
}