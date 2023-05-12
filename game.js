// BLACKWATER INTERACTIVE intro scene
class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    preload() {
        this.load.path = 'assets/';
        this.load.image('blackwater', 'blackwater.png');
    }
    create() {
        // fill white
        this.cameras.main.setBackgroundColor(0xffffff)

        // for debugging, fill black
        // this.cameras.main.setBackgroundColor(0x000000)
        
        // fade into scene
        this.cameras.main.fadeIn(1000,0,0,0)

        // add logo
        this.add.image(930, 400, 'blackwater')

        // game studio text
        this.add.text(600, 700, "BLACKWATER INTERACTIVE", {
            font: "50px Lora", 
            fill: "black"});

        // instructions to move to next scene
        this.add.text(810, 800, "press SPACE to continue", {
            font: "25px Lora", 
            fill: "black"});

        this.input.keyboard.once('keydown-SPACE', () => {
            this.cameras.main.fadeOut(500,0,0,0)
        })

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('titleScreen')
        })
    }
}

// EXTRACTION title scene
class TitleScreen extends Phaser.Scene {
    constructor() {
        super('titleScreen')
    }
    preload() {
        this.load.path = 'assets/';
        this.load.image('title', 'extraction.png');
    }

    create() {        
        this.add.image(960,540,'title')
        this.add.text(800,650, "Click anywhere to begin.").setFontSize(20);
        
        this.add.text(810,750, "Press ESC for credits.").setFontSize(20);
        this.input.keyboard.once('keydown-ESC', () => {
            this.cameras.main.fadeOut(500,0,0,0)
            this.scene.start('creditsScreen')
        })

        this.input.on('pointerdown', () => {
            this.cameras.main.fade(500, 0,0,0);
            this.time.delayedCall(500, () => this.scene.start('scene1'));
        });
    }
}

// credits scene
class CreditsScreen extends Phaser.Scene {
    constructor() {
        super('creditsScreen')
    }
    preload() {
        this.load.path = 'assets/';
    }
    create() {

        // fill black
        this.cameras.main.setBackgroundColor(0x000000)
        
        // fade into scene
        this.cameras.main.fadeIn(1000,0,0,0)

        // game studio text
        this.add.text(850, 100, "Credits", {
            font: "50px Lora", 
            fill: "white"});

        // first credits line
        this.add.text(660, 500, "Everything is my own work besides the default fonts", {
            font: "35px Lora", 
            fill: "white"});

        // second credits line
        this.add.text(660, 600, "The Blackwater Interactive logo was hand drawn by me in 'Goodnotes'", {
            font: "35px Lora", 
            fill: "white"});

        // third credits line
        this.add.text(660, 700 , "'EXTRACTION' logo was drawn by me in 'ASEPRITE'", {
            font: "35px Lora", 
            fill: "white"});

        this.input.keyboard.once('keydown-SPACE', () => {
            this.cameras.main.fadeOut(500,0,0,0)
        })

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('titleScreen')
        })
    }
}

// the first room
class Scene1 extends AdventureScene {
    constructor() {
        super("scene1", "The Bedroom");
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('player','player.png');
        this.load.image('card','card.png');
        this.load.image('hostage','hostage.png');
        this.load.image('trash','trash.png');
        this.load.image('door_scene1','door_scene1.png');
        this.load.image('drawer','drawer.png');
        this.load.image('enemy','enemy.png');
        this.load.image('wall','wall.png');
        this.load.image('key','key.png');
    }

    onEnter() {
        // add walls
        // top wall
        this.add.image(900, 300, 'wall')

        // bottom wall
        this.add.image(900, 1300, 'wall')

        let hostage = this.add.image(1100, 400, 'hostage')
            //.setFontSize(this.s * 4)
            .setInteractive()
            .on('pointerover', () => this.showMessage("This is a hostage."))
            .on('pointerdown', () => {
                this.showMessage("Help me! Find the key before they notice!");
                this.tweens.add({
                    targets: hostage,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("Thank you! I'm free!");
                    this.gainItem("🙍‍♂️ hostage");

                    // sprite fades out
                    this.tweens.add({
                        targets: hostage,
                        alpha: {from: 1, to: 0},
                        duration: 100
                    });
                }
            })

        //let enemy  = this.add.text(700, 500, "🧟‍♂️")
        let enemy = this.add.image(1100, 200, 'enemy')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("This is an enemy. Don't touch them.")
            })
            .on('pointerdown', () => {
                this.gotoScene('loseScreen');
            })

        let trash = this.add.image(770, 100, 'trash')
        .setInteractive()
        .on('pointerover', () => this.showMessage("You might find something valuable in here."))
        .on('pointerdown', () => {
            this.showMessage("You found a key inside!");
            this.tweens.add({
                targets: trash,
                alpha: {from: 1, to: 0},
                duration: 100
            });

            // spawn key after clicking trash can
            //let key = this.add.text(680, 200, "🔑")
            let key = this.add.image(770, 100, 'key')
            //.setFontSize(this.s * 3)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("This can be used to free hostages.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up a key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })
        })

        // empty drawer (left)
        let drawer_left = this.add.image(90, 500, 'drawer')
        .setInteractive()
        .on('pointerover', () => this.showMessage("You can find things in here if you're lucky."))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: drawer_left,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            this.showMessage("There's nothing in here");
        })

        // drawer with card
        let drawer = this.add.image(1350, 700, 'drawer')
        .setInteractive()
        .on('pointerover', () => this.showMessage("You might find something valuable in here."))
        .on('pointerdown', () => {
            this.showMessage("You found a card inside!");
            this.tweens.add({
                targets: drawer,
                alpha: {from: 1, to: 0},
                duration: 100
            });

            // spawn card after clicking drawer
            let card = this.add.image(1350, 700, "card")            
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You can use this to unlock doors.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up a card.");
                this.gainItem('card');
                this.tweens.add({
                    targets: card,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => card.destroy()
                });
            })
        })

        //let door = this.add.text(150,30,"door")
        let door = this.add.image(150, 30, 'door_scene1')
            //.setFontSize(this.s * 5)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("card") && this.hasItem("🙍‍♂️ hostage")) {
                    this.showMessage("You have the card and hostage. You are ready to leave.");
                }
                else {
                    this.showMessage("You can't leave without the card and hostage!");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("card") && this.hasItem("🙍‍♂️ hostage")) {
                    this.loseItem("card");
                    this.showMessage("*squeak*");
                    //door.setText("🚪 unlocked door");
                    this.gotoScene('scene2');
                }
            })

        
    }
}

// room with the bookshelves
class Scene2 extends AdventureScene {
    constructor() {
        super("scene2", "Library")
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('player','player.png');
        this.load.image('card','card.png');
        this.load.image('door_scene2','door_scene2.png');
        this.load.image('trash','trash.png');
        this.load.image('drawer','drawer.png');
        this.load.image('bookshelf','bookshelf.png');
    }
    onEnter() {
        let door = this.add.image(30, 540, 'door_scene2')
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("card")) {
                    this.showMessage("You've got the card and dumpster key to continue.");
                }
                else {
                    this.showMessage("You need a card and a dumpster key to continue.");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("card") && this.hasItem("dumpster key")) {
                    this.loseItem("card");
                    this.showMessage("*squeak*");
                    this.gotoScene('scene3');
                }
            })

        // empty drawer (very left)
        //let empty_drawer1  = this.add.text(300, 20, "🗄️")
        let empty_drawer1 = this.add.image(300, 150, 'drawer')
        .setInteractive()
        .on('pointerover', () => this.showMessage("You can find things in here if you're lucky."))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: empty_drawer1,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            this.showMessage("There's nothing in here");
        })

        // locked drawer with a card (middle)
        //let empty_drawer2  = this.add.text(600, 20, "🗄️")
        let empty_drawer2 = this.add.image(700, 150, 'drawer')
        .setInteractive()
        
        .on('pointerover', () => {
            if (this.hasItem("drawer key")) {
                this.showMessage("Maybe you can use the key you found in the bookshelf to unlock this drawer.");
            }
            else {
                this.showMessage("This drawer is locked... hmm that's odd.");
            }
        })
        .on('pointerdown', () => {
            if (this.hasItem("drawer key")) {
                this.loseItem("drawer key");
                this.gainItem("card");
                this.showMessage("You found a card inside the locked drawer!");
                //door.setText("🚪 unlocked door");
                //this.gotoScene('scene3');
            }
            else {
                this.tweens.add({
                    targets: empty_drawer2,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            }
        })

        // empty drawer (very right)
        let empty_drawer3  = this.add.image(1100, 150, 'drawer')
        .setInteractive()
        .on('pointerover', () => this.showMessage("You can find things in here if you're lucky."))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: empty_drawer3,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            this.showMessage("There's nothing in here");
        })

        let empty_drawer4  = this.add.image(300, 930, 'drawer')
        .setInteractive()
        .on('pointerover', () => this.showMessage("You can find things in here if you're lucky."))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: empty_drawer4,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            this.showMessage("There's nothing in here");
        })

        let empty_drawer5  = this.add.image(700, 930, 'drawer')
        .setInteractive()
        .on('pointerover', () => this.showMessage("You can find things in here if you're lucky."))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: empty_drawer5,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            this.showMessage("There's nothing in here");
        })

        let empty_drawer6  = this.add.image(1100, 930, 'drawer')
        .setInteractive()
        .on('pointerover', () => this.showMessage("You can find things in here if you're lucky."))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: empty_drawer6,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            this.showMessage("There's nothing in here");
        })

        // empty bookshelf (very left)
        let bookshelf1  = this.add.image(400, 540, 'bookshelf')
        .setInteractive()
        .on('pointerover', () => this.showMessage("You could find interesting things in here... perhaps, books?"))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: bookshelf1,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            this.showMessage("You find books... but who likes to read?");
        })

        // bookshelf with dumpster key (middle)
        let bookshelf2  = this.add.image(700, 540, 'bookshelf')
        .setInteractive()
        .on('pointerover', () => this.showMessage("You could find interesting things in here... perhaps, books?"))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: bookshelf2,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            this.showMessage("You find a dumpster key? You decide to keep it anyway.");
            this.gainItem("dumpster key")
        })

        // bookshelf with hidden drawer key (very right)
        let bookshelf3  = this.add.image(1000, 540, 'bookshelf')
        .setInteractive()
        .on('pointerover', () => this.showMessage("You could find interesting things in here... perhaps, books?"))
        .on('pointerdown', () => {
            this.showMessage("You found a hidden key inside the bookshelf!");
            this.gainItem('drawer key');
            this.tweens.add({
                targets: bookshelf3,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })

        let empty_trash  = this.add.image(1330, 970, 'trash')
        .setInteractive()
        .on('pointerover', () => this.showMessage("You can find things in here if you're lucky."))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: empty_trash,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            this.showMessage("There's nothing in here");
        })
        
    }
}

// room with the dumpsters
class Scene3 extends AdventureScene {
    constructor() {
        super("scene3","Garbage Disposal Room");
    }
    
    preload() {
        this.load.path = 'assets/';
        this.load.image('player','player.png');
        this.load.image('card','card.png');
        this.load.image('dumpster','dumpster.png');
        this.load.image('door_scene3','door_scene3.png');
    }

    onEnter() {
        let door = this.add.image(1410, 530, 'door_scene3')
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("card")) {
                    this.showMessage("You've got the card to unlock the door. \n\TIP: Keep cursor hovering over this door when unlocked.");
                }
                else {
                    this.showMessage("It's locked. Can you find a card?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("card")) {
                    this.loseItem("card");
                    this.showMessage("*squeak*");
                    this.gotoScene('scene4');
                }
            })

        let empty_dumpster1a  = this.add.image(300, 210, 'dumpster')
        .setInteractive()
        .on('pointerover', () => this.showMessage("This dumpster is locked. Maybe that dumpster key will come in handy later."))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: empty_dumpster1a,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            this.showMessage("You try to use the dumpster key you found earlier, but it doesn't budge.");
        })

        let empty_dumpster2a  = this.add.image(700, 210, 'dumpster')
        .setInteractive()
        .on('pointerover', () => this.showMessage("This dumpster is locked. Maybe that dumpster key will come in handy later."))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: empty_dumpster2a,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            this.showMessage("You try to use the dumpster key you found earlier, but it doesn't budge.");
        })

        let empty_dumpster3a  = this.add.image(1100, 210, 'dumpster')
        .setInteractive()
        .on('pointerover', () => this.showMessage("This dumpster is locked. Maybe that dumpster key will come in handy later."))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: empty_dumpster3a,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            this.showMessage("You try to use the dumpster key you found earlier, but it doesn't budge.");
        })

        let empty_dumpster1b  = this.add.image(300, 530, 'dumpster')
        .setInteractive()
        .on('pointerover', () => this.showMessage("This dumpster is locked. Maybe that dumpster key will come in handy later."))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: empty_dumpster1b,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            this.showMessage("You try to use the dumpster key you found earlier, but it doesn't budge.");
        })

        let empty_dumpster2b  = this.add.image(700, 530, 'dumpster')
        .setInteractive()
        .on('pointerover', () => this.showMessage("This dumpster is locked. Maybe that dumpster key will come in handy later."))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: empty_dumpster2b,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            this.showMessage("You try to use the dumpster key you found earlier, but it doesn't budge.");
        })

        let empty_dumpster3b  = this.add.image(1100, 530, 'dumpster')
        .setInteractive()
        .on('pointerover', () => this.showMessage("This dumpster is locked. Maybe that dumpster key will come in handy later."))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: empty_dumpster3b,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            this.showMessage("You try to use the dumpster key you found earlier, but it doesn't budge.");
        })

        // locked dumpster that has a card inside
        let empty_dumpster1c  = this.add.image(300, 850, 'dumpster')
        .setInteractive()
        .on('pointerover', () => this.showMessage("This dumpster is locked. Maybe that dumpster key will come in handy later."))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: empty_dumpster1c,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            if (this.hasItem("dumpster key")) {
                this.loseItem("dumpster key");
                this.gainItem("card");
                this.showMessage("You found a card inside the locked dumpster!");
            }
            else {
                this.tweens.add({
                    targets: empty_drawer2,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            }
        })

        let empty_dumpster2c  = this.add.image(700, 850, 'dumpster')
        .setInteractive()
        .on('pointerover', () => this.showMessage("This dumpster is locked. Maybe that dumpster key will come in handy later."))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: empty_dumpster2c,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            this.showMessage("You try to use the dumpster key you found earlier, but it doesn't budge.");
        })

        let empty_dumpster3c  = this.add.image(1100, 850, 'dumpster')
        .setInteractive()
        .on('pointerover', () => this.showMessage("This dumpster is locked. Maybe that dumpster key will come in handy later."))
        .on('pointerdown', () => {
            this.tweens.add({
                targets: empty_dumpster3c,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            this.showMessage("You try to use the dumpster key you found earlier, but it doesn't budge.");
        })
    }
}

class Scene4 extends AdventureScene {
    constructor() {
        super("scene4","Minefield")
    }
    
    preload() {
        this.load.path = 'assets/';
        this.load.image('player','player.png');
        this.load.image('card','vertical_card.png');
        this.load.image('landmine','landmine.png');
        this.load.image('minefield_top','minefield_top.png');
        this.load.image('minefield_bottom','minefield_bottom.png'); 
        this.load.image('key','golden_key.png');   
        this.load.image('enemy','enemy.png');
        this.load.image('hostage','hostage.png');
        this.load.image('trapdoor','trapdoor.png');
        this.load.image('arrow','arrow.png');
        this.load.image('player','player.png');

        // placeholder to know where to place landmines
        this.load.image('door_scene3','door_scene3.png');
    }

    onEnter() {

        let door = this.add.image(190, 150, 'trapdoor')
        .setInteractive()
        .on('pointerover', () => {
            if (this.hasItem("card") && this.hasItem("🙍‍♂️ last hostage")) {
                this.showMessage("You have the card and hostage. You are ready to leave.");
            }
            else {
                this.showMessage("You can't leave without the card and hostage!");
            }
        })
        .on('pointerdown', () => {
            if (this.hasItem("card") && this.hasItem("🙍‍♂️ last hostage")) {
                this.loseItem("card");
                this.showMessage("*squeak*");
                this.gotoScene('outro');
            }
        })

        this.add.image(190, 350, 'arrow')
        
        // placeholder to know where to place landmines
        // this.add.image(1410, 530, 'door_scene3')

        let minefield_top = this.add.image(690, 250, 'minefield_top')
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage('debug_minefield');
            //this.gotoScene('blownUpScreen');
        })

        let minefield_bottom = this.add.image(690, 860, 'minefield_bottom')
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage('debug_minefield');
            //this.gotoScene('blownUpScreen');
        })

        let key = this.add.image(190, 890, 'key')
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("This can be used to free hostages.")
        })
        .on('pointerdown', () => {
            this.showMessage("You pick up a key.");
            this.gainItem('key');
            this.tweens.add({
                targets: key,
                y: `-=${2 * this.s}`,
                alpha: { from: 1, to: 0 },
                duration: 500,
                onComplete: () => key.destroy()
            });
        })

        let card = this.add.image(590, 180, "card")            
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You can use this to unlock doors.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up a card.");
                this.gainItem('card');
                this.tweens.add({
                    targets: card,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => card.destroy()
                });
            })
        
        let hostage  = this.add.image(590, 895, 'hostage')
        .setInteractive()
        .on('pointerover', () => this.showMessage("This is a hostage."))
        .on('pointerdown', () => {
            this.showMessage("Help me! Find the key before they notice!");
            this.tweens.add({
                targets: hostage,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        })
        .on('pointerdown', () => {
            if (this.hasItem("key")) {
                this.loseItem("key");
                this.showMessage("Thank you! I'm free!");
                this.gainItem("🙍‍♂️ last hostage");

                // sprite fades out
                this.tweens.add({
                    targets: hostage,
                    alpha: {from: 1, to: 0},
                    duration: 100
                });
            }
        })
        /* this.tweens.add({
            targets:hostage,
            x: 1000,
            //x: '+=' + this.s,
            repeat: -1,
            yoyo: true,
            ease: 'Sine.inOut',
            duration: 400
        })
 */
        let enemy_left  = this.add.image(190, 900, 'enemy')
        .setInteractive()
        .on('pointerover', () => {
            this.gotoScene('loseScreen')
        })
        .on('pointerdown', () => {
            this.gotoScene('loseScreen');
        })
        this.tweens.add({
            targets:enemy_left,
            y: 160,
            //x: '+=' + this.s,
            repeat: -1,
            yoyo: true,
            ease: 'Sine.inOut',
            duration: 1500
        })

        let enemy_middle  = this.add.image(590, 160, 'enemy')
        .setInteractive()
        .on('pointerover', () => {
            this.gotoScene('loseScreen')
        })
        .on('pointerdown', () => {
            this.gotoScene('loseScreen');
        })
        this.tweens.add({
            targets:enemy_middle,
            y: 900,
            repeat: -1,
            yoyo: true,
            ease: 'Sine.inOut',
            duration: 1500
        })

        let enemy_right  = this.add.image(990, 900, 'enemy')
        .setInteractive()
        .on('pointerover', () => {
            this.gotoScene('loseScreen')
        })
        .on('pointerdown', () => {
            this.gotoScene('loseScreen');
        })
        this.tweens.add({
            targets:enemy_right,
            y: 160,
            repeat: -1,
            yoyo: true,
            ease: 'Sine.inOut',
            duration: 1500
        })
        

    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('titleScreen'));
    }
}

class LoseScreen extends Phaser.Scene {
    constructor() {
        super('loseScreen');
    }
    create() {
        this.add.text(50, 50, "You were caught by an enemy!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('titleScreen'));
    }
}

class BlownUpScreen extends Phaser.Scene {
    constructor() {
        super('blownUpScreen');
    }
    create() {
        this.add.text(50, 50, "You walked straight into a field of mines and died!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('titleScreen'));
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    // for debugging
    scene: [Scene4],
    //scene: [Intro, TitleScreen, Scene1, Scene2, Scene3, Scene4, Outro, LoseScreen, CreditsScreen, BlownUpScreen],
    title: "Adventure Game",
});