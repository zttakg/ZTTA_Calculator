<template>
  <g data-name="hole">
    <SvgRectangle
      class="hole"
      v-if="hole.type === 'rectangle'"
      :key="hole.id"
      :id="hole.id"
      :fillColor="holeColor"

      :width="hole.width"
      :height="hole.height"
      :radius="hole.radius"
      :x="position[0].toString()"
      :y="position[1].toString()"
      transition=""
    />

    <SvgCircle
      class="hole"
      v-if="hole.type === 'circle'"
      :key="hole.id"
      :id="hole.id"
      :fillColor="holeColor"

      :diameter="hole.diameter"
      :cx="position[0].toString()"
      :cy="position[1].toString()"
    />
  </g>
</template>

<script>
import { HOLE_COLOR, HOLE_ACTIVE_COLOR } from "@/constants";
import { mapGetters, mapState } from "vuex";
import { SvgRectangle, SvgCircle } from "@/components";

const degToRad = angle => (angle * Math.PI) / 180;

export default {
  name: "DrawHole",

  components: {
    SvgRectangle,
    SvgCircle
  },

  props: {
    id: String
  },

  computed: {
    ...mapState({
      hole(state) {
        return state.shape.holes[this.id];
      },
      shapeType: state => state.shape.type
    }),
    ...mapGetters({
      isRectangle: "shape/isRectangle",
      isCircle: "shape/isCircle",
      isTriangle: "shape/isTriangle",
      shape: "shape/shape"
    }),
    holeColor() {
      return this.hole.isHovered ? HOLE_ACTIVE_COLOR : HOLE_COLOR;
    },
    holeType() {
      return this.hole.type;
    },
    shapeZeroPoint() {
      return this.hole.position.zeroPoint[this.shapeType];
    },
    holeZeroPoint() {
      return this.hole.position.zeroPoint.hole;
    },
    position() {
      const holeWidth = parseInt(this.hole.width, 10);
      const holeHeight = parseInt(this.hole.height, 10);
      const positionX = parseInt(this.hole.position.x, 10);
      const positionY = parseInt(this.hole.position.y, 10);
      const shapeWidth = parseInt(this.shape.width, 10);
      const shapeHeight = parseInt(this.shape.height, 10);
      const holeDiameter = parseInt(this.hole.diameter, 10);
      const shapeDiameter = parseInt(this.shape.diameter, 10);
      const distance = parseInt(this.hole.position.l, 10);
      const angle = parseInt(this.hole.position.angle, 10);
      const side1 = parseInt(this.shape.side1, 10);
      const side2 = parseInt(this.shape.side2, 10);

      const swKey = [this.shapeType, this.holeType].join(" ");

      switch (swKey) {
        case "rectangle rectangle":
          return this.calculateRectanglePosition({
            holeWidth,
            holeHeight,
            positionX,
            positionY,
            shapeWidth,
            shapeHeight
          });

        case "rectangle circle":
          return this.calculateRectanglePosition({
            holeWidth: holeDiameter,
            holeHeight: holeDiameter,
            positionX,
            positionY,
            shapeWidth,
            shapeHeight
          });

        case "circle circle":
          return this.calculateRadialPosition({
            holeDiameter,
            distance,
            angle,
            shapeDiameter
          });

        case "triangle circle":
          return this.calculateRectanglePosition({
            holeWidth: holeDiameter,
            holeHeight: holeDiameter,
            positionX,
            positionY,
            shapeWidth: side2,
            shapeHeight: side1
          });

        default:
          return [0, 0];
      }
    }
  },

  methods: {
    calculateRectanglePosition({
      holeWidth,
      holeHeight,
      positionX,
      positionY,
      shapeWidth,
      shapeHeight
    }) {
      const halfWidth = holeWidth / 2;
      const halfHeight = holeHeight / 2;
      const swKEY = [this.shapeZeroPoint, this.holeZeroPoint].join(" ");

      switch (swKEY) {
        case "top-left center":
          return [positionX - halfWidth, positionY - halfHeight];

        case "top-left side":
          return [positionX, positionY];

        case "top-right center":
          return [
            shapeWidth - holeWidth - positionX + halfWidth,
            positionY - halfHeight
          ];

        case "top-right side":
          return [shapeWidth - holeWidth - positionX, positionY];

        case "bottom-right center":
          return [
            shapeWidth - holeWidth - positionX + halfWidth,
            shapeHeight - holeHeight - positionY + halfWidth
          ];

        case "bottom-right side":
          return [
            shapeWidth - holeWidth - positionX,
            shapeHeight - holeHeight - positionY
          ];

        case "bottom-left center":
          return [
            positionX - halfWidth,
            shapeHeight - holeHeight - positionY + halfWidth
          ];

        case "bottom-left side":
          return [positionX, shapeHeight - holeHeight - positionY];

        default:
          return [0, 0];
      }
    },
    calculateRadialPosition({ angle, distance, holeDiameter, shapeDiameter }) {
      const holeRadius = Math.round(holeDiameter / 2);
      const figureRadius = shapeDiameter / 2;
      const angleRad = degToRad(angle);

      let hypotenuse = 0;

      const swKEY = [this.shapeZeroPoint, this.holeZeroPoint].join(" ");

      switch (swKEY) {
        case "center center":
          hypotenuse = distance;
          break;
        case "center side":
          hypotenuse = distance + holeRadius;
          break;
        case "side center":
          hypotenuse = figureRadius - distance;
          break;
        case "side side":
          hypotenuse = figureRadius - distance - holeRadius;
          break;

        default:
          break;
      }

      const x = figureRadius + hypotenuse * Math.sin(angleRad) - holeRadius;
      const y = figureRadius - hypotenuse * Math.cos(angleRad) - holeRadius;

      return [x, y];
    }
  }
};
</script>

<style lang="stylus" scoped>
.hole
  transition 125ms fill ease-in-out
</style>
