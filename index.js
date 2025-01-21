class Tournament {
    constructor() {
        // მოთამაშეების ფერების მასივი
        this.colors = ['yellow', 'green', 'red', 'blue'];
        // მიმდინარე რაუნდის ნომერი, იწყება 1-დან
        this.currentRound = 1;
        // ყველა მატჩის შესანახი მასივი
        this.matches = [];
        // უკვე გამოყენებული ფერების სია
        this.usedColors = [];
        this.setupInitialScreen();
    }

    // საწყისი ეკრანის მომზადება და დაწყების ღილაკის დამატება
    setupInitialScreen() {
        const startBtn = document.getElementById('startBtn');
        const tournamentElements = document.querySelector('.tournament-elements');
        
        // When start button is clicked, hide initial screen and show tournament
        startBtn.addEventListener('click', () => {
            document.getElementById('initialScreen').style.display = 'none';
            tournamentElements.style.display = 'block';
            this.init();
        });
    }

    // თამაშის ხელახლა დაწყება და პარამეტრების განულება
    init() {
        this.currentRound = 1;
        this.matches = [];
        this.usedColors = [];
        this.createMatches();
        this.render();
        this.setupControls();
    }

    // მატჩების შექმნა მიმდინარე რაუნდისთვის
    // რაუნდების მიხედვით მატჩების რაოდენობა:
    // პირველი რაუნდი: 8 მატჩი (16 მოთამაშე)
    // მეორე რაუნდი: 4 მატჩი (8 მოთამაშე)
    // მესამე რაუნდი: 2 მატჩი (4 მოთამაშე)
    // ფინალი: 1 მატჩი (2 მოთამაშე)
    createMatches() {
        this.matches = [];
        this.usedColors = []; 

        // მატჩების რაოდენობის გამოთვლა რაუნდის მიხედვით
        const matchCount = this.currentRound === 1 ? 8 : Math.pow(2, 4 - this.currentRound);
        
        // თითოეული მატჩისთვის ორი განსხვავებული ფერის შერჩევა
        for (let i = 0; i < matchCount; i++) {
            // პირველი მოთამაშის ფერის შერჩევა
            let player1Color = this.getUniqueColor();
            // მეორე მოთამაშის ფერის შერჩევა (განსხვავებული პირველისგან)
            let player2Color = this.getUniqueColor(player1Color);
            this.matches.push({
                player1: { color: player1Color },
                player2: { color: player2Color }
            });
        }
    }

    // უნიკალური ფერის შერჩევის ალგორითმი
    // არ აძლევს ერთნაირ ფერებს მოწინააღმდეგეებს
    /**
     * აბრუნებს უნიკალურ ფერს ხელმისაწვდომი ფერების მასივიდან.
     * excludeColor პარამეტრი საშუალებას გვაძლევს გამოვრიცხოთ კონკრეტული ფერი არჩევისას.
     * თუ ყველა ფერი უკვე გამოყენებულია, ასუფთავებს გამოყენებული ფერების ისტორიას და იწყებს თავიდან.
     * 
     * @param {string|null} excludeColor - ფერი რომელიც არ უნდა იქნას არჩეული (გამოსარიცხი ფერი)
     * @returns {string} შემთხვევითად არჩეული უნიკალური ფერი
     */
    getUniqueColor(excludeColor = null) {
        // ხელმისაწვდომი ფერების გაფილტვრა
        /**
         * ფილტრავს ფერების მასივს და აბრუნებს იმ ფერებს რომლებიც:
         * 1. არ არის უკვე გამოყენებული (არ არის usedColors მასივში)
         * 2. არ უდრის excludeColor პარამეტრს
         * @returns {Array} ხელმისაწვდომი ფერების მასივი
         */

        let availableColors = this.colors.filter(color => 
            !this.usedColors.includes(color) && color !== excludeColor
        );

        // თუ აღარ დარჩა ფერები, თავიდან დაწყება
        if (availableColors.length === 0) {
            this.usedColors = [];
            availableColors = this.colors.filter(color => color !== excludeColor);
        }

        // შემთხვევითი ფერის არჩევა
        const color = availableColors[Math.floor(Math.random() * availableColors.length)];
        this.usedColors.push(color);
        return color;
    }

    // შემდეგ რაუნდზე გადასვლა
    progressRound() {
        // ფინალის შემოწმება
        if (this.matches.length === 1) {
            this.showWinner(this.matches[0].player1.color);
            return;
        }

        // რაუნდის გაზრდა და ახალი მატჩების შექმნა
        this.currentRound++;
        this.createMatches();
        this.render();
        
        // ფინალური რაუნდის შემოწმება
        if (this.matches.length === 1) {
            this.showFinalRound();
        }
    }

    // მატჩების ჩვენება ეკრანზე
    // მატჩები თანაბრად ნაწილდება მარცხენა და მარჯვენა მხარეს
    render() {
        // მიმდინარე რაუნდის ნომერის განახლება
        document.getElementById('roundNumber').textContent = this.currentRound;
        const left = document.getElementById('leftSection');
        const right = document.getElementById('rightSection');
        
        // წინა რაუნდის მატჩების გასუფთავება
        left.innerHTML = '';
        right.innerHTML = '';

        // მატჩების თანაბრად განაწილება მარცხენა და მარჯვენა სექციებში
        if (this.matches.length > 1) {
            const half = this.matches.length / 2;
            this.matches.forEach((match, i) => {
                const el = this.createMatchElement(match);
                // პირველი ნახევარი მარცხნივ, მეორე ნახევარი მარჯვნივ
                (i < half ? left : right).appendChild(el);
            });
        }
    }

    // მატჩის ვიზუალური ელემენტის შექმნა
    createMatchElement(match) {
        return createElement('div', 'matchup', [
            createElement('div', 'participant', [], match.player1.color),
            createElement('span', 'vs', ['VS']),
            createElement('div', 'participant', [], match.player2.color)
        ]);
    }

    // ფინალური რაუნდის ჩვენება
    showFinalRound() {
        const match = this.matches[0];
        document.getElementById('finalRound').innerHTML = 
            this.createMatchElement(match).outerHTML;
    }

    // გამარჯვებულის გამოცხადება და თამაშის დასრულება
    showWinner(color) {
        const screen = document.getElementById('winnerScreen');
        screen.innerHTML = `
            <h1 class="winner-title">გამარჯვებული!</h1>
            <div class="winner-color" style="background-color: ${color}"></div>
            <button id="restartBtn">ხელახლა დაწყება</button>
      <style>
         #restartBtn {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
         }

         #restartBtn:hover {
            background-color: #45a049;
         }
      </style>
        `;
        screen.classList.add('active');
        document.getElementById('nextRoundBtn').disabled = true;
        document.getElementById('restartBtn').onclick = () => this.restart();
    }

   // თამაშის ხელახლა დაწყება
   restart() {
      window.location.reload();
   }

    // შემდეგი რაუნდის ღილაკის ფუნქციონალის დამატება
    setupControls() {
        // ჩავანაცვლოთ ღილაკი
        const btn = document.getElementById('nextRoundBtn');
        btn.replaceWith(btn.cloneNode(true));
        document.getElementById('nextRoundBtn').onclick = () => this.progressRound();
    }
}

// დამხმარე ფუნქცია HTML ელემენტების შესაქმნელად
function createElement(tag, className, children = [], backgroundColor = null) {
    const el = document.createElement(tag);
    el.className = className;
    if (backgroundColor) el.style.backgroundColor = backgroundColor;
    children.forEach(child => {
        if (typeof child === 'string') el.textContent = child;
        else el.appendChild(child);
    });
    return el;
}

// თამაშის დაწყება გვერდის ჩატვირთვისას
document.addEventListener('DOMContentLoaded', () => {
    new Tournament();
});