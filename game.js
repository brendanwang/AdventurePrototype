class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(500, 0,0,0);
            this.time.delayedCall(500, () => this.scene.start('scene1'));
        });
    }
}

// the first room
class Scene1 extends AdventureScene {
    constructor() {
        super("scene1", "First Room");
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('player','player.png');
        this.load.image('card','card.png');
    }

    onEnter() {

        let hostage  = this.add.text(this.w * 0.3, this.w * 0.3, "🙍‍♂️")
            .setFontSize(this.s * 4)
            .setInteractive()
            .on('pointerover', () => this.showMessage("This is a hostage."))
            .on('pointerdown', () => {
                this.showMessage("Help me!");
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
                    this.showMessage("*you freed a hostage*");
                    this.gainItem("🙍‍♂️ hostage");
                    hostage.setText("");
                }
            })

        let enemy  = this.add.text(700, 500, "🧟‍♂️")
        .setFontSize(this.s * 4)
        .setInteractive()
        .on('pointerover', () => this.showMessage("This is an enemy."))
        .on('pointerdown', () => {
            this.gotoScene('loseScreen');
        })
        

        let card = this.add.image(this.w * 0.5, this.w * 0.1, "card")
            //.setFontSize(this.s * 2)
            
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

        let key = this.add.text(500, 500, "🔑")
            .setFontSize(this.s * 2)
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

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪")
            .setFontSize(this.s * 5)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("card")) {
                    this.showMessage("You've got the card to unlock the door.");
                }
                else {
                    this.showMessage("It's locked. Can you find a card?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("card")) {
                    this.loseItem("card");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('scene2');
                }
            })

    }
}

class Scene1_Cleared extends AdventureScene {
    constructor() {
        super("scene1_cleared", "First Room");
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('player','player.png');
        this.load.image('card','card.png');
    }

    onEnter() {
        let enemy  = this.add.text(700, 500, "🧟‍♂️")
        .setFontSize(this.s * 4)
        .setInteractive()
        .on('pointerover', () => this.showMessage("This is an enemy."))
        .on('pointerdown', () => {
            this.gotoScene('loseScreen');
        })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪")
            .setFontSize(this.s * 5)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("card")) {
                    this.showMessage("You've got the card to unlock the door.");
                }
                else {
                    this.showMessage("It's locked. Can you find a card?");
                }
            })
            .on('pointerdown', () => {
                this.gotoScene('scene2');
            })

    }
}

// room with the bookshelves
class Scene2 extends AdventureScene {
    constructor() {
        super("scene2", "Second Room")
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('player','player.png');
        
        this.load.image('card','card.png');
    }
    onEnter() {
        let door = this.add.text(20, 500, "🚪")
            .setFontSize(this.s * 5)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("card")) {
                    this.showMessage("You've got the card to unlock the door.");
                }
                else {
                    this.showMessage("It's locked. Can you find a card?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("card")) {
                    this.loseItem("card");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('scene3');
                }
            })

        // empty drawer (very left)
        let empty_drawer1  = this.add.text(300, 20, "🗄️")
        .setFontSize(this.s * 5)
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

            // makes it disappear
            //empty_drawer.setText("");
        })

        // locked drawer with a card (middle)
        let empty_drawer2  = this.add.text(600, 20, "🗄️")
        .setFontSize(this.s * 5)
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
        let empty_drawer3  = this.add.text(900, 20, "🗄️")
        .setFontSize(this.s * 5)
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

        // empty bookshelf (very left)
        let bookshelf1  = this.add.text(400, 500, "📚")
        .setFontSize(this.s * 6)
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
        let bookshelf2  = this.add.text(600, 500, "📚")
        .setFontSize(this.s * 6)
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
        let bookshelf3  = this.add.text(800, 500, "📚")
        .setFontSize(this.s * 6)
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

        let empty_trash  = this.add.text(1300, 950, "🗑️")
        .setFontSize(this.s * 5)
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
        super("scene3","Third Room");
    }
    
    preload() {
        this.load.path = 'assets/';
        this.load.image('player','player.png');
        this.load.image('card','card.png');
    }

    onEnter() {
        let door = this.add.text(1300, 30, "🚪")
            .setFontSize(this.s * 5)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("card")) {
                    this.showMessage("You've got the card to unlock the door.");
                }
                else {
                    this.showMessage("It's locked. Can you find a card?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("card")) {
                    this.loseItem("card");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('scene3');
                }
            })

        let empty_dumpster1a  = this.add.text(300, 20, "🟩")
        .setFontSize(this.s * 6)
        .setInteractive()
        .on('pointerover', () => this.showMessage("You can find things in here if you're lucky."))
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
            this.showMessage("There's nothing in here");
        })

        let empty_dumpster2a  = this.add.text(600, 20, "🟩")
        .setFontSize(this.s * 6)
        .setInteractive()
        .on('pointerover', () => this.showMessage("You can find things in here if you're lucky."))
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
            this.showMessage("There's nothing in here");
        })

        let empty_dumpster3a  = this.add.text(900, 20, "🟩")
        .setFontSize(this.s * 6)
        .setInteractive()
        .on('pointerover', () => this.showMessage("You can find things in here if you're lucky."))
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
            this.showMessage("There's nothing in here");
        })

        let empty_dumpster1b  = this.add.text(300, 480, "🟩")
        .setFontSize(this.s * 6)
        .setInteractive()
        .on('pointerover', () => this.showMessage("You can find things in here if you're lucky."))
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
            this.showMessage("There's nothing in here");
        })

        let empty_dumpster2b  = this.add.text(600, 480, "🟩")
        .setFontSize(this.s * 6)
        .setInteractive()
        .on('pointerover', () => this.showMessage("You can find things in here if you're lucky."))
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
            this.showMessage("There's nothing in here");
        })

        let empty_dumpster3b  = this.add.text(900, 480, "🟩")
        .setFontSize(this.s * 6)
        .setInteractive()
        .on('pointerover', () => this.showMessage("You can find things in here if you're lucky."))
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
            this.showMessage("There's nothing in here");
        })

        let empty_dumpster1c  = this.add.text(300, 940, "🟩")
        .setFontSize(this.s * 6)
        .setInteractive()
        .on('pointerover', () => this.showMessage("You can find things in here if you're lucky."))
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
            this.showMessage("There's nothing in here");
        })

        let empty_dumpster2c  = this.add.text(600, 940, "🟩")
        .setFontSize(this.s * 6)
        .setInteractive()
        .on('pointerover', () => this.showMessage("You can find things in here if you're lucky."))
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
            this.showMessage("There's nothing in here");
        })

        let empty_dumpster3c  = this.add.text(900, 940, "🟩")
        .setFontSize(this.s * 6)
        .setInteractive()
        .on('pointerover', () => this.showMessage("You can find things in here if you're lucky."))
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
            this.showMessage("There's nothing in here");
        })
    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "Demo 2");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}



class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

class LoseScreen extends Phaser.Scene {
    constructor() {
        super('loseScreen');
    }
    create() {
        this.add.text(50, 50, "You were caught by an enemy!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Scene1, Scene1_Cleared, Scene2, Scene3, Demo2, Outro, LoseScreen],
    title: "Adventure Game",
});

