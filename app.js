new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    isGameOn: false,
    turns: []
  },
  methods: {
        startGame: function() {
          this.isGameOn = true;
          this.playerHealth = 100;
          this. monsterHealth = 100;
          this.turns = [];
        },
        attack: function() {
          var damage = this.caculateDamage(3,10);
          this.monsterHealth -= damage;
          this.turns.unshift({
            isPlayer: true,
            text: 'player hit monster for ' + damage
          });
          if(this.checkWin()) {
            return;
          }
          this.monsterAttacks();
        },
        specialAttack: function(){
          var damage = this.caculateDamage(3,10);
          this.monsterHealth -= damage;
          this.turns.unshift({
            isPlayer: true,
            text: 'player hit monster hard for ' + damage
          });
          if(this.checkWin()) {
            return;
          }
          this.monsterAttacks();
        },
        monsterAttacks: function() {
          var damage = this.caculateDamage(5,12);
          this.playerHealth -= damage;
          this.checkWin();
          this.turns.unshift({
            isPlayer: false,
            text: 'Monster hit player for ' + damage
          });
        },
        caculateDamage: function(min, max) {
          return Math.max(Math.floor(Math.random()* max) +1, min);
        },
        heal: function() {
          if(this.playerHealth <= 90) {
            this.playerHealth += 10;
          } else {
            this.playerHealth = 100;
          }
          this.turns.unshift({
            isPlayer: true,
            text: 'Play heals for 10'
          });
          this.monsterAttacks();
        },
        giveUp: function() {
          this.isGameOn = false;

        },
        checkWin: function() {
          if(this.monsterHealth <= 0) {
            if(confirm('You won. new game?')) {
              this.startGame();
            } else {
              this.isGameOn = false;
            }
            return true;
          } else if (this.playerHealth <= 0) {
              if(confirm('You lost. new game?')) {
                this.startGame();
              } else {
                this.isGameOn = false;
            }
            return true;
          }
          return false;
        }
  }
})
