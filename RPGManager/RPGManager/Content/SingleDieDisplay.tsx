class SingleDieDisplay extends React.Component {
    public props: {
        value: number
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
            x: Math.random() * (window.innerWidth - SingleDieDisplay.__sizeInPixels),
            y: Math.random() * (window.innerHeight - SingleDieDisplay.__sizeInPixels),
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
                transform: "rotate(-1080deg)",
                offset: 0.3
            } as any,
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
                <svg style={{
                    height: SingleDieDisplay.__sizeInPixels + "px",
                    width: SingleDieDisplay.__sizeInPixels + "px"
                }} viewBox="0 0 272.33 313.39">
                    <g id="layer1" transform="translate(-246.69 -375.67)">
                        <circle style={{ fill: "#FFFFFF" }} cx="382.794" cy="537.251" r="157.6" transform="matrix(1, 0, -0.013127, 1, 8.797417, -4.18784)"></circle>
                        <path id="path3922" style={{ fill: "#000000" }} d="M 379.93 375.67 C 379.36 375.689 378.704 375.898 378.345 376.402 L 297.672 472.929 C 296.329 474.609 296.239 474.984 298.038 475.002 L 459.628 474.575 C 461.848 474.394 380.5 375.656 379.93 375.67 Z M 395.418 384.268 L 468.164 472.746 C 469.138 473.928 469.376 473.995 471.091 473.173 L 509.446 455.611 C 511.958 454.477 511.61 454.245 509.934 453.111 L 395.404 384.261 L 395.418 384.268 Z M 361.454 387.5 C 361.42 387.427 360.829 387.87 359.503 388.78 L 253.893 458.294 L 286.943 473.294 C 288.667 473.863 289.182 473.893 290.296 472.501 L 359.993 389.267 C 360.976 388.131 361.489 387.571 361.457 387.499 L 361.454 387.5 Z M 515.049 459.758 C 514.721 459.781 514.203 459.97 513.403 460.306 L 474.012 478.294 C 472.613 478.929 472.701 479.785 473.219 480.856 L 519.013 597.016 L 515.72 461.706 C 515.619 460.226 515.597 459.715 515.049 459.754 L 515.049 459.758 Z M 250.899 463.355 L 246.692 595.005 L 285.474 481.095 C 286.046 479.413 286.033 479.328 284.864 478.778 L 250.9 463.351 L 250.899 463.355 Z M 461.759 480.429 L 296.509 480.856 C 294.147 480.821 294.245 480.823 295.412 482.747 L 379.317 624.277 C 380.734 626.436 380.582 626.368 382.061 624.156 L 462.673 482.386 C 463.378 481.259 463.883 480.472 461.758 480.434 L 461.759 480.429 Z M 468.345 484.149 C 468.192 484.214 468.026 484.787 467.552 485.673 L 386.391 628.483 C 385.505 629.991 385.295 630.531 387.428 630.191 L 516.278 612.447 C 518.321 611.98 518.259 611.25 517.558 609.215 L 468.938 485.735 C 468.617 484.552 468.481 484.086 468.329 484.15 L 468.345 484.149 Z M 290.165 485.491 C 290.007 485.604 289.864 486.206 289.555 487.076 L 248.395 608.236 C 247.694 610.81 247.615 611.777 250.224 612.26 L 373.334 630.065 C 375.662 630.415 375.364 629.243 374.797 628.114 L 291.007 486.774 C 290.48 485.706 290.311 485.38 290.154 485.494 L 290.165 485.491 Z M 258.148 619.336 L 378.948 687.875 C 380.512 688.823 380.878 688.477 380.655 686.838 L 378.094 638.788 C 378.025 637.238 377.814 636.606 376.204 636.349 L 258.154 619.336 L 258.148 619.336 Z M 507.908 619.457 L 385.278 636.409 C 383.66 636.647 383.952 637.442 383.937 638.604 L 386.559 687.508 C 386.693 688.992 386.65 689.524 388.449 688.606 L 507.909 619.457 L 507.908 619.457 Z"></path>
                        <text x="364.996" y="528.526" style={{ fill: "#FFFFFF", fontSize: "28px" }} transform="matrix(1.909828, 0, 0, 1.885716, -347.079071, -444.561157)">{this.props.value}</text>
                    </g>
                </svg>
            </div>
        );
    }
}