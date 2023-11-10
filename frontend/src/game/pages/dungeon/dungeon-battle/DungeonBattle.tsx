import { useState, useEffect } from "react";
import { ICharacter, IDungeon } from '../../../../interfaces/MainInterface';
import { setHero } from "../../../../redux/reducers/gameSlice";
import { useDispatch } from "react-redux";
import fetchHero from "../../../../utils/fetchers/fetchHero";
import { Container, Text, TilingSprite } from "@pixi/react";
import Bar from "../../../components/battle/Bar";
import Portrait from "../../../components/battle/Portrait";
import BattleStats from "../../../components/battle/BattleStats";
import { TextStyle } from "pixi.js";
import CombatActions from "../../../components/battle/CombatActions";
import CombatLogs from "../../../components/battle/CombatLogs";
import BattleEndPopup from "../../../components/battle/BattleEndPopup";
import BgPattern from "../../../../assets/images/dark_wall.png";

interface IDungeonBattle {
  hero: ICharacter;
  realmDungeon: IDungeon;
}

function DungeonBattle({ hero, realmDungeon }: IDungeonBattle) {
  const [battleWinner, setBattleWinner] = useState<1 | 2 | null>(null);
  const enemy = realmDungeon.enemies[realmDungeon.currentMonster];

  const dispatch = useDispatch();

  const updateHero = (data: any) => {
    dispatch(setHero(data));
  };

  const handleEnemyTurn = async () => {
    const response = await questEnemyTurn();
    if (response.status !== 200) return console.log(response);
    fetchHero(updateHero);
  };

  const handleBattleEnd = async () => {
    const response = await questBattleEndService();
    if (response.status !== 200) return console.log(response);
    fetchHero(updateHero);
  };

  useEffect(() => {
    if (realmDungeon!.battleWinner) {
      setBattleWinner(realmDungeon!.battleWinner);
    } else if (realmDungeon!.whosTurn === 2) {
      setTimeout(() => {
        handleEnemyTurn();
      }, 1000);
    }
  }, [hero]);

  const MobSection = () => {
    return (
      <Container position={[50, 100]}>
        <Bar
          position={[0, 0]}
          name={"Hit points"}
          value={enemy!.health}
          maxValue={enemy!.maxHealth}
        />
        {/* <BattleStats
          statistics={enemy!.statistics}
          position={[0, 150]}
        /> */}
        <Portrait
          position={[450, 0]}
          name={enemy!.name}
          level={enemy!.level}
          img={enemy!.avatar}
        />
      </Container>
    );
  };

  const HeroSection = () => {
    return (
      <Container position={[50, 500]}>
        <Bar
          position={[0, 0]}
          name={"Hit points"}
          value={hero.updatedValues.health}
          maxValue={hero.updatedValues.maxHealth}
        />
        <Bar
          position={[0, 70]}
          name={"Mana"}
          value={hero.updatedValues.mana}
          maxValue={hero.updatedValues.maxMana}
        />
        <BattleStats
          statistics={hero.updatedValues.statistics}
          armor={hero.updatedValues.armor}
          position={[0, 150]}
        />
        <Portrait
          position={[450, 0]}
          name={"You"}
          level={hero.progression.level}
          img={hero.avatar}
        />
      </Container>
    );
  };

  const Turn = () => {
    const whosTurn =
      realmDungeon!.whosTurn === 1
        ? "You"
        : enemy!.name;

    return (
      <Container position={[500, 380]}>
        <Text
          text={`Turn: ${whosTurn}`}
          y={50}
          x={250 / 2}
          anchor={0.5}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Almendra",
              fontSize: 30,
              fill: ["#BC330C"],
            })
          }
        />
      </Container>
    );
  };

  return (
    <Container position={[0, 0]}>
      <TilingSprite
        image={BgPattern}
        width={1315}
        height={935}
        tilePosition={{ x: 0, y: 0 }}
      />
      <MobSection />
      <Turn />
      <HeroSection />
      <CombatActions hero={hero} />
      {/* <CombatLogs logs={realmDungeon.textLogs} /> */}
      {battleWinner && (
        <BattleEndPopup
          battleWinner={battleWinner}
          rewards={enemy!.rewards}
          handleBattleEnd={handleBattleEnd}
        />
      )}
    </Container>
  );
}

export default DungeonBattle;