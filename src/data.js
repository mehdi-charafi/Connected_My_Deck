const creatures = [
  {
    id: "#001",                                 
    name: "Dark Magician",                            
    type: "Effect",                                 
    level: "7",                               
    stats: { attack: 2500, defence: 2100 },  
    image: "https://images.ygoprodeck.com/images/cards/88570003.jpg",         
    description: "This card's name becomes Dark Magician while on the field or in the GY. You can only use 1 of the following effects of Dark Magician, the Pharaoh's Servant per turn, and only once that turn. If this card is in your hand: You can reveal 1 Spell in your hand; Special Summon this card, then you can Set 1 Spell/Trap that mentions Dark Magician from your Deck. (Quick Effect): You can discard 1 Spell; destroy all Spells/Traps your opponent controls."        
  },
  {
    id: "#002",
    name: "Blue-Eyes White Dragon",
    type: "LIGHT",
    level: "8",
    stats: { attack: 3000, defence: 2500 },
    image: "https://images.ygoprodeck.com/images/cards/30397786.jpg",
    description: "When this card is added from the Deck to your hand, or a monster you control is destroyed by battle: You can reveal this card in your hand; Special Summon it. If this card is Special Summoned from the hand or Deck: You can destroy all monsters your opponent controls, also you can only attack directly with \"Blue-Eyes\" monsters for the rest of this turn. You can only use each of the preceding effects of \"Blue-Eyes White Dragon, the White Phantom Beast\" once per turn. When a card or effect is activated that targets this card on the field (Quick Effect): You can discard 1 card; negate that effect."
  },
  {
    id: "#003",
    name: "Red-Eyes Dragon Exceed",
    type: "Fusion",
    level: "9",
    stats: { attack: 3400, defence: 3000 },
    image: "https://images.ygoprodeck.com/images/cards/17242022.jpg",
    description: "\"Red-Eyes Black Dragon\" + 1 monster that mentions \"Dark Time Wizard\" Must be either Fusion Summoned, or Special Summoned (from your Extra Deck) by Tributing 1 face-up monster on either field during the turn a monster was destroyed by the effect of \"Dark Time Wizard\". You can only Special Summon \"Red-Eyes Black Dragon Exceed\" once per turn this way, no matter which method you use. Unaffected by your opponent's activated Spell or monster effects. If this card is Special Summoned: You can Special Summon 1 Level 8 or lower monster from your hand or GY."
  },
  {
    id: "#004",
    name: "Kuriboh - Multiply!",
    type: "Effect",
    level: "1",
    stats: { attack: 300, defence: 200 },
    image: "https://images.ygoprodeck.com/images/cards/14965712.jpg",
    description: "When your opponent activates a monster effect, or an opponent's monster declares an attack (Quick Effect): You can Special Summon this card from your hand. You can only use this effect of \"Kuriboh - Multiply!\" once per turn. Once per turn, when your opponent activates a monster effect on the field, or during damage calculation when an opponent's monster attacks (Quick Effect): You can add to your hand or Special Summon, from your Deck or GY, 1 \"Dark Magician\" or 1 monster with 300 ATK/200 DEF, then you can change that opponent's monster's ATK to 0."
  },
  {
    id: "#005",
    name: "Summoned Skull",
    type: "DARK",
    level: "6",
    stats: { attack: 2500, defence: 1200 },
    image: "https://images.ygoprodeck.com/images/cards/70781052.jpg",
    description: "A fiend with dark powers for confusing the enemy. Among the Fiend-Type monsters, this monster boasts considerable force."
  },
  {
    id: "#006",
    name: "Dark Magician Girl",
    type: "DARK",
    level: "6",
    stats: { attack: 2000, defence: 1700 },
    image: "https://images.ygoprodeck.com/images/cards/2501624.jpg",
    description: "You can Special Summon this card (from your hand) by discarding 1 card, and if you do, this card's name becomes \"Dark Magician Girl\". You can only Special Summon \"Dark Magician Girl the Magician's Apprentice\" once per turn this way. If this card is Normal or Special Summoned: You can add 1 \"Shining Sarcophagus\" from your Deck to your hand. You can only use this effect of \"Dark Magician Girl the Magician's Apprentice\" once per turn. Gains 300 ATK for each monster that mentions \"Shining Sarcophagus\" in the GYs."
  },
  {
    id: "#007",
    name: "Gaia the Fierce Knight",
    type: "EARTH",
    level: "4",
    stats: { attack: 1600, defence: 1200 },
    image: "https://images.ygoprodeck.com/images/cards/50354944.jpg",
    description: "This card can be treated as 2 Tributes for the Tribute Summon of a Warrior monster. You can only use each of the following effects of \"Gaia the Fierce Knight Origin\" once per turn. You can send 1 Level 5 or higher monster from your hand to the GY; Special Summon this card from your hand. During the Battle Phase (Quick Effect): You can banish this card from your GY, then target 1 monster on the field whose current ATK is different from its original ATK; its ATK becomes its original ATK."
  },
  {
    id: "#008",
    name: "Buster Blader",
    type: "EARTH",
    level: "8",
    stats: { attack: 2600, defence: 2300 },
    image: "https://images.ygoprodeck.com/images/cards/100461001.jpg",
    description: "If this card is in your hand or GY: You can discard 1 Spell; Special Summon this card, and if you do, its name becomes \"Buster Blader\", also banish it when it leaves the field. You can only use this effect of \"Buster Blader, the One Who Surpasses the Limits\" once per turn. Gains 500 ATK for each Attack Position monster your opponent controls. When this card destroys a monster by battle: You can discard 1 card; Special Summon that monster to your field."
  },
  {
    id: "#009",
    name: "Beaver Warrior",
    type: "EARTH",
    level: "4",
    stats: { attack: 1200, defence: 1500 },
    image: "https://images.ygoprodeck.com/images/cards/32452818.jpg",
    description: "What this creature lacks in size it makes up for in defense when battling in the prairie."
  },
  {
    id: "#010",
    name: "Catapult Turtle",
    type: "WATER",
    level: "5",
    stats: { attack: 1000, defence: 2000 },
    image: "https://images.ygoprodeck.com/images/cards/95727991.jpg",
    description: "Once per turn: You can Tribute 1 monster; inflict damage to your opponent equal to half the Tributed monster's ATK on the field."
  },
  {
    id: "#011",
    name: "Time Wizard",
    type: "LIGHT",
    level: "2",
    stats: { attack: 500, defence: 400 },
    image: "https://images.ygoprodeck.com/images/cards/71625222.jpg",
    description: "Once per turn: You can toss a coin and call it. If you call it right, destroy all monsters your opponent controls. If you call it wrong, destroy as many monsters you control as possible, and if you do, take damage equal to half the total ATK those destroyed monsters had while face-up on the field."
  },
  {
    id: "#012",
    name: "Gearfried the Knight",
    type: "EARTH",
    level: "4",
    stats: { attack: 1800, defence: 1600 },
    image: "https://images.ygoprodeck.com/images/cards/423705.jpg",
    description: "If either player equips an Equip Card(s) to this card: Destroy that Equip Card(s)."
  }
];
