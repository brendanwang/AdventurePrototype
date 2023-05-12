**EXTRACTION**:
A simple adventure game by Brendan Wang based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**:
    - Scene1
    - Scene2
    - Scene3
    - Scene4
- **2+ scenes *not* based on `AdventureScene`**:
    - Intro
    - TitleScreen
    - CreditsScreen
    - Outro
    - LoseScreen
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: changed default background color
    - Enhancement 2: adjusted transition speed so that it is faster

Experience requirements:
- **4+ locations in the game world**:
    - Location 1 (Scene1)
        - the very first room after the title screen disappears
    - Location 2 (Scene2)
        - second room with the drawers and bookshelves
    - Location 3 (Scene3)
        - third room with all the dumpsters
    - Location 4 (Scene4)
        - the level with the rapidly moving sprites
- **2+ interactive objects in most scenes**:
    - Scene 1
        - You can interact with all the sprites.  Hovering your mouse or clicking on a sprite will prompt some text on the right side
    - Scene 2
        - Ability to interact with the drawers, bookshelves, and door
    - Scene 3
        - Ability to interact with all the dumpsters as well as the door
    - Scene 4
        - Ability to interact with all the sprites including the hostage, enemies, card, key, and door
- **Many objects have `pointerover` messages**:
    - Every sprite in each location scene prompts the user with a message when hovering mouse over
- **Many objects have `pointerdown` effects**:
    - Every sprite in each location scene reacts to 'pointerdown'
- **Some objects are themselves animated**:
    - In the 4th location, there are moving enemies
    - Some sprites move and jiggle when clicked on

Asset sources:
- **Blackwater Interactive Logo**
    - hand drawn by me in the iPad app, 'Goodnotes'
    - original idea and creation
- **EXTRACTION title**
    - created by me in 'Aseprite'
    - original idea and creation

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.