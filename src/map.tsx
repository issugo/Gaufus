const game = {
    terrainType: [
        {
            id: 0,
            name: "mountain",
            img: "assets/terrainTiles/mountain.png"
        },
        {
            id: 1,
            name: "plain",
            img: "assets/terrainTiles/plaine.png"
        },
        {
            id: 2,
            name: "water",
            img: "assets/terrainTiles/water.png"
        },
        {
            id: 3,
            name: "lava",
            img: "assets/terrainTiles/lava.png"
        }
    ],
    levels: [
        {
            id: 0,
            name: "Level 1",
            region: "Plain",
            map: [
                [2,2,2,2,2,2,2,2,2,2],
                [2,1,1,1,1,1,1,1,1,2],
                [2,1,0,1,0,0,1,0,1,2],
                [2,1,1,1,1,1,1,1,1,2],
                [2,1,1,1,1,1,1,1,1,2],
                [2,1,0,1,0,0,1,0,1,2],
                [2,1,1,1,1,1,0,1,1,2],
                [2,0,1,1,0,1,1,1,0,2],
                [2,1,1,1,1,1,1,1,1,2],
                [2,2,2,2,2,2,2,2,2,2]
            ],
            depart: {
                x: 5,
                y: 8
            },
            ennemies: [
                {
                    type: "male",
                    hp: 50,
                    sens: "down",
                    x: 3,
                    y: 8
                },
                {
                    type: "female",
                    hp: 40,
                    sens: "left",
                    x: 5,
                    y: 4
                }
            ]
        },
        {
            id: 1,
            name: "Level 2",
            region: "Plain",
            map: [
                [0,1,2,0,1,2,0,1,2,0],
                [0,1,2,0,1,2,0,1,2,0],
                [0,1,2,0,1,2,0,1,2,0],
                [0,1,2,0,1,2,0,1,2,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,1,2,0,1,2,0,1,2,0],
                [0,1,2,0,1,2,0,1,2,0],
                [0,1,2,0,1,2,0,1,2,0],
                [0,1,2,0,1,2,0,1,2,0],
                [0,1,2,0,1,2,0,1,2,0]
            ],
            ennemies: [
                {
                    type: "female",
                    hp: 40,
                    sens: "left",
                    x: 5,
                    y: 4
                }
            ]
        },
        {
            id: 2,
            name: "Level 3",
            region: "Plain",
            map: [
                [0,1,2,0,1,2,0,1,2,0],
                [0,1,2,0,1,2,0,1,2,0],
                [0,1,2,0,1,2,0,1,2,0],
                [0,1,2,0,1,2,0,1,2,0],
                [1,1,1,1,1,1,1,1,1,1],
                [0,1,2,0,1,2,0,1,2,0],
                [0,1,2,0,1,2,0,1,2,0],
                [0,1,2,0,1,2,0,1,2,0],
                [0,1,2,0,1,2,0,1,2,0],
                [0,1,2,0,1,2,0,1,2,0]
            ],
            ennemies: [
                {
                    type: "female",
                    hp: 40,
                    sens: "left",
                    x: 5,
                    y: 4
                }
            ]
        },
        {
            id: 3,
            name: "Level 1",
            region: "Lava",
            map: [
                [0,1,0,0,1,1,0,1,3,3],
                [0,1,3,0,1,1,0,1,0,3],
                [0,1,3,0,1,1,0,1,3,3],
                [0,1,3,0,1,1,0,1,0,3],
                [1,1,1,1,0,0,1,1,1,0],
                [0,1,3,0,0,0,0,1,0,3],
                [0,1,0,0,1,1,0,1,0,3],
                [0,0,3,0,0,1,0,1,0,3],
                [0,0,3,0,0,0,0,1,3,3],
                [3,0,1,0,1,0,0,1,3,3]
            ],
            ennemies: [
                {
                    type: "male",
                    hp: 50,
                    sens: "down",
                    x: 3,
                    y: 8
                },
                {
                    type: "male",
                    hp: 50,
                    sens: "up",
                    x: 3,
                    y: 8
                },
                {
                    type: "female",
                    hp: 40,
                    sens: "left",
                    x: 5,
                    y: 4
                }
            ]
        },
    ],
    spells: [
        {
            id: 0,
            name: "walk",
            alt: "walk",
            actionType: "moveSelf",
            rangeOfEffect: 1
        },
        {
            id: 1,
            name: "sword",
            alt: "coup épée",
            actionType: "damageEnnemy",
            rangeOfEffect: 1
        },
        {
            id: 2,
            name: "staff",
            alt: "boule de feu",
            actionType: "damageEnnemy",
            rangeOfEffect: 2
        },
        {
            id: 3,
            name: "dagger",
            alt: "coup dague",
            actionType: "damageEnnemy",
            rangeOfEffect: 1
        }
    ]
}

export default game;