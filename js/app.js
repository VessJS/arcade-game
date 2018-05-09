const points = document.getElementById("points");
let score = 0;

class Base {
    loadSprite(sprite) {
        this.img = Resources.get(sprite);
        this.width = this.img.width;
        this.height = this.img.height;
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    render() {
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y);
        }
    }
    // Collects the center of the picture
    getCenter() {
        return {
            x: Math.round(this.x) + Math.round(this.width / 2),
            y: Math.round(this.y) + Math.round(this.height / 2)
        };
    }
}

class Enemy extends Base {
    constructor() {
        super();
        this.speed = 300;
        this.x = this.getRndInteger(-30, -1) * 40;
        this.y = this.getRndInteger(1, 3) * 65;

        // Loads Enemy image
        Resources.onReady(function () {
            this.loadSprite('images/enemy-bug.png');
        }.bind(this));
    }

    update(dt) {
        this.x += this.speed * dt;
        if (this.x > 500) {
            this.x = this.getRndInteger(-40, -1) * 40;
            this.y = this.getRndInteger(1, 3) * 65;
        }
    }

    getPosition() {
        return [this.x, this.y];
    }
}

class Player extends Base {
    constructor() {
        super();
        this.x = 200;
        this.y = 290;
        // Loads Player image
        Resources.onReady(function () {
            this.loadSprite('images/char-horn-girl.png');
        }.bind(this));

    }

    update(dt) {
        this.checkCollisions(allEnemies);
    }
    // controls with arrows, also checks boarders of canvas
    handleInput(key) {
        if (key === 'left' && this.x > 0) {
            this.x -= 100;
        } else if (key === 'right' && this.x < 400) {
            this.x += 100;
        } else if (key === 'up') {
            this.y -= 80;
        } else if (key === 'down' && this.y < 340) {
            this.y += 80;
        }
        if (this.y < 0) {
            this.reset();
            score += 100;
            points.innerText = score;
        }
    }
    // function that checks the collision of objects
    checkCollisions(enemies) {
        enemies.forEach(enemy => {

            let playerCenter = this.getCenter();
            let enemyCenter = enemy.getCenter();
            var a = playerCenter.x - enemyCenter.x;
            var b = playerCenter.y - enemyCenter.y;
            var c = Math.sqrt(a * a + b * b);

            if (c < 60) {
                this.reset();
            }
        });
    }
    // function that resets the player's position.
    reset() {
        this.x = 200;
        this.y = 290;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player();
let allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];

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