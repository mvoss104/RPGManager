var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PortraitLifebar = (function (_super) {
    __extends(PortraitLifebar, _super);
    function PortraitLifebar(props) {
        var _this = _super.call(this, props) || this;
        PortraitLifebar.def_id = PortraitLifebar.def_id + 1 || 0;
        _this.state = { def_id: PortraitLifebar.def_id };
        return _this;
    }
    PortraitLifebar.prototype.render = function () {
        var tau = 6.28318;
        var radius = 54;
        var circumfrence = tau * radius;
        var lost = (this.props.maxHitPoints - this.props.currentHitPoints) / this.props.maxHitPoints;
        var temp = (this.props.maxHitPoints - this.props.extraHitPoints) / this.props.maxHitPoints;
        return (React.createElement("svg", { width: this.props.size, height: this.props.size, viewBox: "0 0 120 120" },
            React.createElement("defs", null,
                React.createElement("pattern", { id: "portrait" + this.state.def_id, x: "0", y: "0", width: "1", height: "1" },
                    React.createElement("image", { width: "120", height: "120", href: (location.pathname + "/" + this.props.portrait).replace("//", "/") }))),
            React.createElement("circle", { cx: "60", cy: "60", r: radius, fill: "url(#portrait" + this.state.def_id + ")", stroke: "#e0e0e0", strokeWidth: "12" }),
            React.createElement("circle", { cx: "180", cy: "60", r: radius, fill: "none", stroke: "#992222", strokeWidth: "12", strokeDasharray: circumfrence, strokeDashoffset: circumfrence * lost, strokeLinecap: "butt", transform: "rotate(-90 180 60) scale(1,-1)" }),
            React.createElement("circle", { cx: "180", cy: "60", r: radius, fill: "none", stroke: "#BB9922", strokeWidth: "12", strokeDasharray: circumfrence, strokeDashoffset: circumfrence * temp, strokeLinecap: "butt", transform: "rotate(-90 180 60) scale(1,-1)" }),
            this.props.showDetails ?
                React.createElement("g", null,
                    React.createElement("text", { x: "50%", textAnchor: "middle", y: "100", className: "character-hitpoints" },
                        this.props.currentHitPoints,
                        "/",
                        this.props.maxHitPoints))
                : null));
    };
    return PortraitLifebar;
}(React.Component));
//# sourceMappingURL=PortraitLifebar.js.map