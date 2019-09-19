<template>
  <g data-name="arrow">
    <SvgPolygon
      v-for="(arrow, index) in arrows"
      :data-name="`arrow__${arrow.name}`"
      :key="index"
      :points="points"
      :style="arrowStyle(arrow)"
    />
    <SvgLine
      data-name="arrow__line"
      :from="line.from"
      :to="line.to"
      :strokeColor="color"
      stroke-linecap="square"
      shape-rendering="crispEdges"
    />
  </g>
</template>

<script>
import { ARROW_TEMPLATE, DIMENSION_LINE_OFFSET, ARROW_SIZE } from "@/constants";
import { SvgPolygon, SvgLine, SvgText } from "@/components";

export default {
  name: "SvgArrow",

  components: {
    SvgPolygon,
    SvgLine,
    SvgText
  },

  props: {
    orientation: {
      type: String,
      default: "horizontal" // or "vertical"
    },
    width: {
      type: String,
      default: "300"
    },
    height: {
      type: String,
      default: "300"
    },
    color: {
      type: String,
      default: "#000"
    }
  },

  computed: {
    points() {
      return ARROW_TEMPLATE.map(point => point.join(" ")).join(", ");
    },
    arrows() {
      const shapeWidth = parseInt(this.width, 10);
      const shapeHeight = parseInt(this.height, 10);
      const offset = DIMENSION_LINE_OFFSET;
      const arrowWidth = ARROW_SIZE;

      const arrows = {
        horizontal: [
          {
            name: "right",
            move: [
              shapeWidth - arrowWidth,
              shapeHeight + offset - arrowWidth / 2
            ],
            angle: "90"
          },
          {
            name: "left",
            move: [1, shapeHeight + offset - arrowWidth / 2],
            angle: "270"
          }
        ],
        vertical: [
          {
            name: "up",
            move: [shapeWidth + offset - arrowWidth / 2, 1],
            angle: "0"
          },
          {
            name: "down",
            move: [
              shapeWidth + offset - arrowWidth / 2,
              shapeHeight - arrowWidth
            ],
            angle: "180"
          }
        ]
      };

      return arrows[this.orientation];
    },
    line() {
      const shapeWidth = parseInt(this.width, 10);
      const shapeHeight = parseInt(this.height, 10);
      const offset = DIMENSION_LINE_OFFSET;

      const line = {
        horizontal: {
          from: [0, shapeHeight + offset],
          to: [shapeWidth, shapeHeight + offset]
        },
        vertical: {
          from: [shapeWidth + offset, 0],
          to: [shapeWidth + offset, shapeHeight]
        }
      };

      return line[this.orientation];
    }
  },

  methods: {
    arrowStyle({ angle, move: [x, y] }) {
      return `
        transform: translate(${x}px, ${y}px) rotate(${angle}deg);
        transform-origin: ${ARROW_SIZE / 2}px ${ARROW_SIZE / 2}px;
        fill: ${this.color};
      `;
    }
  }
};
</script>
