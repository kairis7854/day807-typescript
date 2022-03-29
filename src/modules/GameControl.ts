import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// 主程序
class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    // 移動方向
    direction: string = 'Right';
    // 遊戲狀態
    gameState = true;
    /*
        遊戲按鍵
        Chrome       IE
        ArrowUp      Up
        ArrowDown    Down
        ArrowLeft    Left
        ArrowRight   Right
    */
    keydown = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Up', 'Down', 'Left', 'Right']

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 1);

        this.init();
    }

    // 初始化
    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this));

        this.run();
    }

    // 遊戲按鍵
    keydownHandler(event: KeyboardEvent) {
        if (this.keydown.includes(event.code)) {
            this.direction = event.key;
        }
    }

    // 移動
    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;

        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                break;
        }

        // 是否吃到食物
        this.checkEat(X, Y);

        // 調整蛇位置
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e: any) {
            alert(e.message + ' GAME OVER!');
            this.gameState = false;
        }

        this.gameState && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    // 是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
        }
    }
}

export default GameControl;