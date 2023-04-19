import React, { useState } from 'react';
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";
import { useSelector } from 'react-redux';
import { getHero } from '../../../../redux/reducers/gameSlice';
import ItemSlot from './ItemSlot';
import Item from './Item';
import { equipmentSlots } from '../helpers/slots';

function HeroEquipment() {
    const hero = useSelector(getHero);
    const [currentItemTypeDragging, setCurrentItemTypeDragging] = useState<string | null>(null);
    const [itemPositions, setItemPositions] = useState<any>([]);
    console.log(currentItemTypeDragging);
    

    const handleItemDrop = (position: any) => {
      const closestSlotIndex = getClosestSlotIndex(position);
      const updatedItemPositions = [...itemPositions];
      updatedItemPositions[closestSlotIndex] = position;
      setItemPositions(updatedItemPositions);
    };

    const getClosestSlotIndex = (position: any) => {
      let closestDistance = Infinity;
      let closestIndex = 0;
      equipmentSlots.forEach((slotPosition, index) => {
        const distance = getDistance(position, slotPosition);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      return closestIndex;
    };

    const getDistance = (p1: any, p2: any) => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      return Math.sqrt(dx * dx + dy * dy);
    };
    
    return (
      <Container position={[100, 150]}>
        <Sprite
          image={hero?.avatar}
          position={[120, 0]}
          width={250}
          height={250}
        />
        {equipmentSlots.map((position, index) => (
          <ItemSlot
            key={index}
            x={position.x}
            y={position.y}
            currentItem={currentItemTypeDragging}
            itemType={position.type}
          />
        ))}
        <Item
          onDrop={handleItemDrop}
          setCurrentItem={setCurrentItemTypeDragging}
        />
      </Container>
    );
}

export default HeroEquipment;