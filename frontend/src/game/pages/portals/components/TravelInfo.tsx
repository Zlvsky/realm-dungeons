import { Container, Sprite, Text, withFilters } from "@pixi/react";
import { ColorMatrixFilter, TextStyle } from "pixi.js";
import IconWithText from "../../../../components/common/text/IconWithText";
import GoldIcon from "../../../../assets/images/icons/gui/gold-icon.png";
import AcceptBtn from "../../../../assets/images/acceptbtn.png";

const textStyle: any = {
  align: "left",
  fontFamily: "MedievalSharp",
  fontSize: 20,
  letterSpacing: 1,
  fill: ["#ffffff"],
};

const DisabledFilter: any = withFilters(Container, {
  matrix: ColorMatrixFilter,
});

function TravelInfo( { destination, currentDestination }: any ) {

    const handleAcceptDestination = async () => {

    }; 

    const TravelFee = () => {
        return (
          <Container>
            <Text text={`Fee:`} x={0} y={0} style={new TextStyle(textStyle)} />
            <IconWithText
              text={destination.fee.toString()}
              image={GoldIcon}
              position={[50, -6]}
              textStyle={textStyle}
            />
          </Container>
        );
    }

    const AcceptButton = () => (
      <DisabledFilter
        matrix={{ enabled: true }}
        apply={
          currentDestination === destination.name.toUpperCase()
            ? ({ matrix }: any) => matrix.blackAndWhite()
            : undefined
        }
      >
        <Sprite
          image={AcceptBtn}
          width={150}
          height={150}
          x={300}
          y={-63}
          cursor={"pointer"}
          interactive={true}
          onclick={handleAcceptDestination}
        />
      </DisabledFilter>
    );

    return (
        <Container position={[220, 530]}>
            <TravelFee />
            <AcceptButton />
        </Container>
    );
}

export default TravelInfo;