<template>
  <g :data-name="`dimension-line dimension-line_${orientation}`">
    <SvgLine
      v-for="(line, index) in lines"
      :data-name="`dimension-line__${line.name}`"
      :key="index"
      :from="line.from"
      :to="line.to"
      :strokeColor="lineColor"
      stroke-linecap="square"
      shape-rendering="crispEdges"
      stroke-dasharray="3,3"
    />
    <SvgArrow
      :orientation="orientation"
      :width="arrowSize.width"
      :height="arrowSize.height"
      :transform="transform"
      :color="lineColor"
    />
    <SvgText
      data-name="dimension-line__text"
      :dx="text.position[0]"
      :dy="text.position[1]"
      :transform="`rotate(${text.rotate})`"
      text-anchor="middle"
      :style="textStyle"
    >
      {{ text.title }}
    </SvgText>
  </g>
</template>

<script>
import { SvgArrow, SvgLine, SvgText } from "@/components";
import {
  DIMENSION_LINE_OFFSET,
  DIMENSION_LINE_COLOR,
  DIMENSION_LINE_TEXT_STYLE
} from "@/constants";

export default {
  name: "DimensionLine",

  components: {
    SvgLine,
    SvgArrow,
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
    diameter: {
      type: String,
      default: "300"
    },
    side1: {
      type: String,
      default: "300"
    },
    side2: {
      type: String,
      default: "300"
    },
    type: {
      type: String,
      default: "rectangle"
    },
    radius: {
      type: String,
      default: "0"
    }
  },

  data() {
    return {
      lineColor: DIMENSION_LINE_COLOR,
      textStyle: DIMENSION_LINE_TEXT_STYLE
    };
  },

  computed: {
    arrowSize() {
      switch (this.type) {
        case "rectangle":
          return {
            width: this.width,
            height: this.height
          };

        case "circle":
          return {
            width: this.diameter,
            height: this.diameter
          };

        case "triangle":
          return {
            width: this.side2,
            height: this.side1
          };

        default:
          return {
            width: 0,
            height: 0
          };
      }
    },
    lines() {
      const width = parseInt(this.width, 10);
      const height = parseInt(this.height, 10);
      const cornerRadius = parseInt(this.radius, 10);
      const diameter = parseInt(this.diameter, 10);
      const side1 = parseInt(this.side1, 10);
      const side2 = parseInt(this.side2, 10);
      const offset = DIMENSION_LINE_OFFSET;

      const lines = {
        rectangle: {
          horizontal: [
            {
              from: [1, height + 1 - cornerRadius],
              to: [1, height + offset + 1],
              name: "left"
            },
            {
              from: [width + 1, height + 1 - cornerRadius],
              to: [width + 1, height + offset + 1],
              name: "right"
            }
          ],
          vertical: [
            {
              from: [width + 1 - cornerRadius, 1],
              to: [width + offset + 1, 1],
              name: "top"
            },
            {
              from: [width + 1 - cornerRadius, height + 1],
              to: [width + offset, height + 1],
              name: "bottom"
            }
          ]
        },
        circle: {
          horizontal: [
            {
              from: [1, diameter / 2],
              to: [1, diameter + offset],
              name: "left"
            },
            {
              from: [diameter + 1, diameter / 2],
              to: [diameter + 1, diameter + offset],
              name: "right"
            }
          ],
          vertical: [
            {
              from: [diameter / 2, 1],
              to: [diameter + offset, 1],
              name: "top"
            },
            {
              from: [diameter / 2, diameter + 2],
              to: [diameter + offset, diameter + 1],
              name: "bottom"
            }
          ]
        },
        triangle: {
          horizontal: [
            {
              from: [1, side1 + 1],
              to: [1, side1 + offset + 1],
              name: "left"
            },
            {
              from: [side2, side1 + 1],
              to: [side2, side1 + offset + 1],
              name: "right"
            }
          ],
          vertical: [
            {
              from: [1, 1],
              to: [side2 + offset + 1, 1],
              name: "top"
            },
            {
              from: [side2, side1 + 1],
              to: [side2 + offset, side1 + 1],
              name: "bottom"
            }
          ]
        }
      };

      return lines[this.type][this.orientation];
    },
    text() {
      const shapeWidth = parseInt(this.width, 10);
      const shapeHeight = parseInt(this.height, 10);
      const diameter = parseInt(this.diameter, 10);
      const side1 = parseInt(this.side1, 10);
      const side2 = parseInt(this.side2, 10);
      const offset = DIMENSION_LINE_OFFSET;
      const TEXT_OFFSET = 15;

      function generateText(width, height = width) {
        return {
          horizontal: {
            title: `${width.toString()}\u00A0мм`,
            position: [width / 2, height + offset - TEXT_OFFSET],
            rotate: 0
          },
          vertical: {
            title: `${height.toString()}\u00A0мм`,
            position: [-height / 2, width + offset - TEXT_OFFSET],
            rotate: -90
          }
        };
      }

      const text = {
        rectangle: generateText(shapeWidth, shapeHeight),
        circle: generateText(diameter),
        triangle: generateText(side2, side1)
      };

      return text[this.type][this.orientation];
    },
    transform() {
      const offset = 8;
      return this.orientation === "horizontal"
        ? `translate(0, -${offset})`
        : `translate(-${offset}, 0)`;
    }
  }
};
</script>
