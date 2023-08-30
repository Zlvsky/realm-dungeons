import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import goldIcon from "../../../../assets/images/icons/gui/gold-icon.png";
import ActionButton from "./components/ActionButton";

interface IItemPreview {
  position: [number, number];
  itemData: {
    name: string;
    type: string;
    minDamage?: number;
    maxDamage?: number;
    image: string;
    armor?: number;
    statistics: {
      strength?: number;
      condition?: number;
      dexterity?: number;
      wisdom?: number;
      intelligence?: number;
      charisma?: number;
    };
  };
  price?: number;
  action?: "BUY" | "SELL" | "EQUIP" | "UNEQUIP";
  handleAction: any;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Box = ({ width, height }: any) => {
    return (
      <Graphics
        x={0}
        y={0}
        draw={(g) => {
          g.lineStyle(2, 0x656565);
          g.beginFill(0x2c2c2c, 0.3);
          g.drawRect(0, 0, width, height);
          g.endFill();
        }}
      />
    );
}



function ItemPreview({
  position,
  itemData,
  price,
  action,
  handleAction,
}: IItemPreview) {
  let boxHeight = 340;
  if (price) boxHeight = 390;
  const boxWidth = 325;

  const ItemImage = () => {
    return (
      <Sprite
        image={itemData.image}
        width={80}
        height={80}
        anchor={0.5}
        position={[boxWidth / 2, 40 + 20]}
      />
    );
  };

  const ItemName = () => {
    return (
      <Text
        text={itemData.name}
        anchor={0.5}
        x={boxWidth / 2}
        y={120}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Almendra",
            fontSize: 23,
            fontWeight: "400",
            fill: ["#ffffff"],
            letterSpacing: 0.5,
          })
        }
      />
    );
  };

  const ItemValues = () => {
    return (
      <>
        <Text
          text={`Type: ${itemData.type}`}
          x={20}
          y={150}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Almendra",
              fontSize: 20,
              fontWeight: "400",
              fill: ["#ffffff"],
              letterSpacing: 0.5,
            })
          }
        />
        <Text
          text={
            itemData.type.toLowerCase() === "armor"
              ? `Armor: ${itemData.armor}`
              : `Damage: ${itemData.minDamage} - ${itemData.maxDamage}`
          }
          x={20}
          y={175}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Almendra",
              fontSize: 20,
              fontWeight: "400",
              fill: ["#ffffff"],
              letterSpacing: 0.5,
            })
          }
        />
      </>
    );
  };

  const ItemStats = () => {
    if (!itemData.statistics || Object.keys(itemData.statistics).length === 0)
      return null;
    return (
      <>
        {Object.entries(itemData.statistics).map((statistic, index) => (
          <Text
            key={index}
            text={capitalizeFirstLetter(statistic[0]) + ": +" + statistic[1]}
            x={20}
            y={200 + index * 25}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "Almendra",
                fontSize: 20,
                fontWeight: "400",
                fill: ["#BC330C"],
                letterSpacing: 0.5,
              })
            }
          />
        ))}
      </>
    );
  };

  const ItemPrice = () => {
    if (!price) return null;
    return (
      <Container position={[20, 0]}>
        <Graphics
          x={0}
          y={330}
          draw={(g) => {
            g.clear();
            g.lineStyle(1, 0x656565);
            g.lineTo(boxWidth - 40, 0);
            g.endFill();
          }}
          interactive={true}
        />
        <Sprite
          image={goldIcon}
          width={40}
          height={40}
          position={[0, boxHeight - 50]}
        />
        <Text
          text={`Price: ${price}`}
          x={50}
          y={boxHeight - 40}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Almendra",
              fontSize: 20,
              fontWeight: "400",
              fill: ["#ffffff"],
              letterSpacing: 0.5,
            })
          }
        />
      </Container>
    );
  };

  return (
    <Container position={position}>
      <Box width={boxWidth} height={boxHeight} />
      <ItemImage />
      <ItemName />
      <ItemValues />
      <ItemStats />
      <ItemPrice />
      <ActionButton
        action={action}
        handleAction={handleAction}
        boxWidth={boxWidth}
        boxHeight={boxHeight}
      />
    </Container>
  );
}

export default ItemPreview;