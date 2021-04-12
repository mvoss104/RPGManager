class DieDisplay extends React.Component {
    props: {
        die: Die,
        size: number
    }

    state: {
        gradientId: string;
    }

    private static gradientCount = 0;

    constructor(props: any) {
        super(props);

        this.state = {
            gradientId: "gradient" + DieDisplay.gradientCount++
        }
    }

    render() {
        let fillString: string;
        let gradient = null;
        if (this.props.die.Colors.length == 1) {
            fillString = this.props.die.Colors[0];
        }
        else {
            fillString = "url(#" + this.state.gradientId + ")";
            let percent = 100 / (this.props.die.Colors.length - 1);
            let stops = [];
            for (let c = 0; c < this.props.die.Colors.length; c++) {
                stops.push(<stop key={c} style={{ stopColor: this.props.die.Colors[c] }} offset={(percent * c) + "%"} />);
            }
            gradient = <linearGradient id={this.state.gradientId} x1="0" x2="0" y1="0" y2="1">
                {stops}
            </linearGradient>
        }

        switch (this.props.die.DieType) {
            case DiceType.d4:
                return (<svg style={{
                    height: this.props.size + "px",
                    width: this.props.size + "px"
                }} viewBox="0 0 500 500">
                    {gradient}
                    <path style={{ fill: fillString }} d="M 486.95 456 L 25.05 456 L 256 56 L 486.95 456 Z"></path>
                    <text x="190" y="400" style={{ fill: this.props.die.TextColor, fontSize: "250px" }}>{this.props.die.Value}</text>
                </svg>);
            case DiceType.d6:
                return (<svg style={{
                    height: this.props.size + "px",
                    width: this.props.size + "px"
                }} viewBox="0 0 500 500">
                    {gradient}
                    <path style={{ fill: fillString }} d="M 74.5 36 C 53.237 36 36 53.237 36 74.5 L 36 437.5 C 36 458.763 53.237 476 74.5 476 L 437.5 476 C 458.763 476 476 458.763 476 437.5 L 476 74.5 C 476 53.237 458.763 36 437.5 36 L 74.5 36 Z"></path>
                    <text x="170" y="375" style={{ fill: this.props.die.TextColor, fontSize: "350px" }}>{this.props.die.Value}</text>
                </svg>);
            case DiceType.d8:
                return (<svg style={{
                    height: this.props.size + "px",
                    width: this.props.size + "px"
                }} viewBox="0 0 500 500">
                    {gradient}
                    <circle style={{ fill: "#1E1E1E" }} cx="250" cy="250" r="200"></circle>
                    <path style={{ fill: fillString }} d="M 256 37.143 L 77.896 343.853 L 434.104 343.853 L 256 37.143 Z M 230.154 49.79 L 72 164.233 L 72 322.143 L 230.154 49.79 Z M 281.844 49.79 L 440 322.144 L 440 164.232 L 281.844 49.79 Z M 88.7 359.852 L 256 480.912 L 423.3 359.852 L 88.7 359.852 Z"></path>
                    <text x="210" y="300" style={{ fill: this.props.die.TextColor, fontSize: "150px" }}>{this.props.die.Value}</text>
                </svg>);
            case DiceType.d10:
                return (<svg style={{
                    height: this.props.size + "px",
                    width: this.props.size + "px"
                }} viewBox="0 0 500 500">
                    {gradient}
                    <circle style={{ fill: "#1E1E1E" }} cx="250" cy="250" r="200"></circle>
                    <path style={{ fill: fillString }} d="M 375.483 251.243 L 265.503 302.381 L 265.716 485.762 L 477.01 266.346 L 390.017 244.536 L 375.483 251.243 Z M 121.603 244.334 L 36.893 266.097 L 246.474 486 L 246.474 302.38 L 136.528 251.243 L 121.603 244.334 Z M 27.19 248.865 L 227.03 35.443 L 124.933 215.019 L 119.225 225.079 L 27.19 248.865 Z M 285.018 35.371 L 484.811 248.639 L 393.239 225.698 L 387.139 214.995 L 285.018 35.371 Z M 255.987 26 L 137.456 231.026 L 255.988 286.076 L 374.592 231.026 L 255.987 26 Z"></path>
                    <text x={this.props.die.Value >= 10 ? "165" : "210"} y="240" style={{ fill: this.props.die.TextColor, fontSize: "150px" }}>{this.props.die.Value}</text>
                </svg>);
            case DiceType.d12:
                return (<svg style={{
                    height: this.props.size + "px",
                    width: this.props.size + "px"
                }} viewBox="0 0 500 500">
                    {gradient}
                    <circle style={{ fill: "#1E1E1E" }} cx="250" cy="250" r="250"></circle>
                    <g transform="matrix(1.25, 0, 0, 1.198035, -69.764427, -56.891476)">
                        <path style={{ fill: fillString }} d="M 449.981 181.516 L 379.497 84.452 L 265.441 47.487 L 265.441 140.139 L 361.825 210.17 L 449.981 181.516 Z M 246.362 140.139 L 246.362 47.487 L 132.306 84.452 L 61.822 181.516 L 149.978 210.134 L 246.362 140.139 Z M 198.402 333.753 L 313.4 333.753 L 348.91 224.383 L 255.901 156.785 L 162.892 224.384 L 198.402 333.753 Z M 196.28 352.832 L 141.846 427.872 L 255.901 464.837 L 369.957 427.872 L 315.523 352.832 L 196.28 352.832 Z M 367.655 228.271 L 330.845 341.551 L 385.328 416.544 L 455.812 319.528 L 455.812 199.665 L 367.655 228.271 Z M 143.968 228.271 L 55.812 199.653 L 55.812 319.587 L 126.296 416.603 L 180.778 341.611 L 143.968 228.271 Z"></path>
                    </g>
                    <text x={this.props.die.Value >= 10 ? "165" : "210"} y="300" style={{ fill: this.props.die.TextColor, fontSize: "150px" }}>{this.props.die.Value}</text>
                </svg>);
            case DiceType.d20:
                return (<svg style={{
                    height: this.props.size + "px",
                    width: this.props.size + "px"
                }} viewBox="0 0 272.33 313.39">
                    {gradient}
                    <g transform="translate(-246.69 -375.67)">
                        <circle style={{ fill: "#1E1E1E" }} cx="382.794" cy="537.251" r="145"></circle>
                        <path style={{ fill: fillString }} d="M 379.93 375.67 C 379.36 375.689 378.704 375.898 378.345 376.402 L 297.672 472.929 C 296.329 474.609 296.239 474.984 298.038 475.002 L 459.628 474.575 C 461.848 474.394 380.5 375.656 379.93 375.67 Z M 395.418 384.268 L 468.164 472.746 C 469.138 473.928 469.376 473.995 471.091 473.173 L 509.446 455.611 C 511.958 454.477 511.61 454.245 509.934 453.111 L 395.404 384.261 L 395.418 384.268 Z M 361.454 387.5 C 361.42 387.427 360.829 387.87 359.503 388.78 L 253.893 458.294 L 286.943 473.294 C 288.667 473.863 289.182 473.893 290.296 472.501 L 359.993 389.267 C 360.976 388.131 361.489 387.571 361.457 387.499 L 361.454 387.5 Z M 515.049 459.758 C 514.721 459.781 514.203 459.97 513.403 460.306 L 474.012 478.294 C 472.613 478.929 472.701 479.785 473.219 480.856 L 519.013 597.016 L 515.72 461.706 C 515.619 460.226 515.597 459.715 515.049 459.754 L 515.049 459.758 Z M 250.899 463.355 L 246.692 595.005 L 285.474 481.095 C 286.046 479.413 286.033 479.328 284.864 478.778 L 250.9 463.351 L 250.899 463.355 Z M 461.759 480.429 L 296.509 480.856 C 294.147 480.821 294.245 480.823 295.412 482.747 L 379.317 624.277 C 380.734 626.436 380.582 626.368 382.061 624.156 L 462.673 482.386 C 463.378 481.259 463.883 480.472 461.758 480.434 L 461.759 480.429 Z M 468.345 484.149 C 468.192 484.214 468.026 484.787 467.552 485.673 L 386.391 628.483 C 385.505 629.991 385.295 630.531 387.428 630.191 L 516.278 612.447 C 518.321 611.98 518.259 611.25 517.558 609.215 L 468.938 485.735 C 468.617 484.552 468.481 484.086 468.329 484.15 L 468.345 484.149 Z M 290.165 485.491 C 290.007 485.604 289.864 486.206 289.555 487.076 L 248.395 608.236 C 247.694 610.81 247.615 611.777 250.224 612.26 L 373.334 630.065 C 375.662 630.415 375.364 629.243 374.797 628.114 L 291.007 486.774 C 290.48 485.706 290.311 485.38 290.154 485.494 L 290.165 485.491 Z M 258.148 619.336 L 378.948 687.875 C 380.512 688.823 380.878 688.477 380.655 686.838 L 378.094 638.788 C 378.025 637.238 377.814 636.606 376.204 636.349 L 258.154 619.336 L 258.148 619.336 Z M 507.908 619.457 L 385.278 636.409 C 383.66 636.647 383.952 637.442 383.937 638.604 L 386.559 687.508 C 386.693 688.992 386.65 689.524 388.449 688.606 L 507.909 619.457 L 507.908 619.457 Z"></path>
                    </g>
                    <text x={this.props.die.Value >= 10 ? "88" : "115"} y="180" style={{ fill: this.props.die.TextColor, fontSize: "75px" }}>{this.props.die.Value}</text>
                </svg>);
            default:
                return (<svg style={{
                    height: this.props.size + "px",
                    width: this.props.size + "px"
                }} viewBox="0 0 500 500">
                    {gradient}
                    <circle style={{ fill: fillString }} cx="250" cy="250" r="200"></circle>
                    <text x={this.props.die.Value >= 10 ? "165" : "210"} y="240" style={{ fill: this.props.die.TextColor, fontSize: "150px" }}>{this.props.die.Value}</text>
                </svg>);
        }
    }
}