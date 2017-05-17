// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 150);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = 0;
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.checkCollisions = function(enemy) {
    if (player.x >= enemy.x - 50 &&
        player.x <= enemy.x + 50 &&
        player.y >= enemy.y - 50 &&
        player.y <= enemy.y + 50) {
        player.resetGame();
    }
};

// Now write your own player class
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.life = 2;
    this.speed = (Math.random() * (.2 * 1 + 1)) + 1 * 300;
    this.sprite = 'images/char-princess-girl.png';
    this.width = 20;
    this.height = 40;

};
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;
    if (this.x > 450) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(movement) {
    if (movement === 'up') {
        this.y -= 100;
        if (this.y < 0) {
            alert("You did it!");
            this.x = 200;
            this.y = 400;
        }
    }
    if (movement === 'down') {
        //ensure player don't go off the board
        if (this.y < 340) {
            this.y = this.y + 80;
        }
    }
    if (movement === 'left') {
        this.x -= 50;
    }
    if (movement === 'right') {
        this.x += 100;
    }
};

Player.prototype.resetGame = function() {
        this.x = 200;
        this.y = 400;
    }
    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    var enemy = new Enemy(-100, (i + 1) * 83);
    allEnemies.push(enemy);
}
// Place the player object in a variable called player
var player = new Player(200, 400);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});