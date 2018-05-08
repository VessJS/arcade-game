// Enemies our player must avoid
// var Enemy = function () {
// Variables applied to each of our instances go here,
// we've provided one for you to get started

// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
//    this.sprite = 'images/enemy-bug.png';
// };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function (dt) {
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
// };

// Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function () {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Base {
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends Base {
    constructor() {
        super();
        this.x = this.getRndInteger(-100, 0) * 20;
        this.y = this.getRndInteger(1, 3) * 73;
        this.sprite = 'images/enemy-bug.png';
    }

    update(dt) {
        this.x += 300 * dt;
        if (this.x > 500) {
            this.x = this.getRndInteger(-50, 0) * 10;
            this.y = this.getRndInteger(70, 240);
        }
    }

    getPosition() {
        return [this.ex, this.ey];
    }
}

class Player extends Base {
    constructor() {
        super();
        this.x = 200;
        this.y = 290;
        this.sprite = 'images/char-horn-girl.png';

    }
    update() {

    }

    handleInput(key = "") {
        switch (key) {
            case "left":
                this.x -= 100;
                break;
            case "right":
                this.x += 100;
                break;
            case "up":
                this.y -= 80;
                break;
            case "down":
                this.y += 80;
                break;
            default:
                return [this.x, this.y];
        }
        if (this.y < 0) {
            this.reset();
        }
        if (this.y > 380 || this.x < 0 || this.x > 400) {
            this.reset();
        }
    }
    checkCollisions(enemies) {
        enemies.forEach(enemy => {
           let [x, y] = enemy.getPosition();

            if (x > this.x && y > this.y) {
                this.reset();
            }
        });
    }
    reset() {
        this.x = 200;
        this.y = 290;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player();
let allEnemies = [new Enemy(), new Enemy(), new Enemy()];
player.checkCollisions(allEnemies);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});