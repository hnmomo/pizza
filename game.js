var mydiv = document.getElementById("mydiv");
var pn1 = document.getElementById("pn1");
var charname = document.getElementById("name");
var bkgd = document.getElementById("bkgd");
var pic = document.getElementById("pic");
var mapcvs = document.getElementById("mapcvs");
var mapctx = mapcvs.getContext("2d");
var mapw = mapcvs.width;
var maph = mapcvs.height;
var elemLeft = mapcvs.offsetLeft,
    elemTop = mapcvs.offsetTop;
var health = document.getElementById("health");
var shield = document.getElementById("shield");
var energy = document.getElementById("energy");
var phealth = document.getElementById("phealth");
var gameover=false;
var gamestart=false;
var entanipos = 0;
var pizzaanipos = 0;
var posmax = 5;
var posmax2 = 3;
var poschange = 0.2;
var poschange2 = -0.1;
var displace=0;

mapctx.font = "16px Times New Roman";

var map1 = new Image();
map1.src = "BG2.jpg";

var entp = new Image();
entp.src = "enterprisesmall.png";
var pizza = new Image();
pizza.src = "pizza.png";
 
function draw() {
    mapctx.drawImage(map1, 50, 0, mapw, maph, 0, 0, mapw, maph);
}

var player = {
    phaser: 100,
    torpedo: 1200,
    phaseracc: 0.9,
    torpedoacc: 0.15,
    dodge: 0.95,
    health: 1500,
    shield: 5000,
    maxshield: 5000,
    maxhealth: 1000,
    energy: 6000,
    maxenergy: 6000,
    dmgmult: 1.0,
    crit: 0.1
}
var enemy = {
    beam: 500,
    drain: 10,
    acc: 0.9,
    dodge: 0.9,
    health: 10000,
    maxhealth: 10000,
    crit: 0.1
}

var phasercd=0;
setInterval(function() {
    if(phasercd>0){
        phasercd-=0.1;
        if(phasercd<0){
            phasercd=0;
        }
    }
}, 100);
function phaserswitch(){
        entp.src = "enterprisephaser.png";
}
function tpswitch(){
        entp.src = "enterprisetorpedo.png";
}
var changep=0;
function pizzaswitch(){
        pizza.src = "pizzabeam.png";
    change=3;
}
function pizzaswitch2(){
        pizza.src = "pizza2.png";
    change=2;
}
setInterval(function() {
    if(changep>0){
        changep-=1;
        if(changep<0){
            changep=0;
        }
    }else{
        pizza.src = "pizza.png";
    }
}, 300);
var change=0;
function phaserani() {
  phaserswitch();
    change=3;
    displace=53;
}
function torpedoani() {
  tpswitch();
    change=2;
    displace=90;
}
setInterval(function() {
    if(change>0){
        change-=1;
        if(change<0){
            change=0;
        }
    }else{
        entp.src = "enterprisesmall.png";
        displace=0;
    }
}, 300);
function phaser() {
    if(phasercd>0){
        message("Phasers on cooldown. Ready in <b>"+phasercd.toFixed(1)+"</b> seconds.");
        return false;
    }
    if(player.energy<=0){
        message("Insufficient energy.");
        return false;
    }
    phasercd+=5;
    phaserani();
    player.energy-=100;
    var mult = Math.random() * 0.4 + 0.8;
    var hitchance = player.phaseracc * enemy.dodge;
    var hit = Math.random();
    var crit = Math.random();
    if (hit > hitchance) {
        message("The phasers <b>missed</b> the pizza!");
        return false;
    }
    var dmg = mult * player.dmgmult * player.phaser;
    if (crit < player.crit) {
        dmg *= 2;
    }
    enemy.health -= dmg;
    message("The phasers hit the target and did <b>" + dmg.toFixed(0) + "</b> damage to the pizza.");
}
var torcd=0;
setInterval(function() {
    if(torcd>0){
        torcd-=0.1;
        if(torcd<0){
            torcd=0;
        }
    }
}, 100);
function torpedo() {
    if(torcd>0){
        message("Torpedo on cooldown. Ready in <b>"+torcd.toFixed(1)+"</b> seconds.");
        return false;
    }
    if(player.energy<=0){
        message("Insufficient energy.");
        return false;
    }
    torcd+=12;
    torpedoani();
    player.energy-=300;
    var mult = Math.random() * 0.4 + 0.8;
    var hitchance = player.torpedoacc * enemy.dodge;
    var hit = Math.random();
    var crit = Math.random();
    if (hit > hitchance) {
        message("Your torpedo <b>missed</b>.");
        return false;
    }
    var dmg = mult * player.dmgmult * player.torpedo;
    if (crit < player.crit) {
        dmg *= 2;
    }
    enemy.health -= dmg;
    message("Your torpedo hit the target and did <b>" + dmg.toFixed(0) + "</b> damage to the pizza.");
}

function updatestat(){
    health.value=player.health/player.maxhealth*100;
    energy.value=player.energy/player.maxenergy*100;
    shield.value=player.shield/player.maxshield*100;
    phealth.value=enemy.health/enemy.maxhealth*100;
}

function useless1(){
    message("<b>Venting warp plasma</b> had no discernable effect.");
}

function useless2(){
    message("<b>Static warp bubble</b> had no discernable effect.");
}
function useless3(){
    message("<b>Inverse tachyon pulse</b> had no discernable effect.");
}
function useless4(){
    message("<b>Reversing deflector polarity</b> had no discernable effect.");
}
function useless5(){
    message("<b>Concentrated gravimetric wave</b> had no discernable effect.");
}
function useless6(){
    message("<b>Asymmetrical veteron beam</b> had no discernable effect.");
}


var trcd=0;
setInterval(function() {
    if(trcd>0){
        trcd-=0.1;
        if(trcd<0){
            trcd=0;
        }
    }
}, 100);
function tractor(){
    if(trcd>0){
        message("Tractor beam on cooldown. Ready in <b>"+trcd.toFixed(1)+"</b> seconds.");
        return false;
    }
    if(player.energy<=0){
        message("Insufficient energy.");
        return false;
    }
    player.energy-=100;
    trcd+=8;
    message("The enterprise's tractor beam slows down the movement of the pizza"); 
    enemy.dodge+=0.01;
}

var encd=0;
setInterval(function() {
    if(encd>0){
        encd-=0.1;
        if(encd<0){
            encd=0;
        }
    }
}, 100);
function ensh(){
    if(encd>0){
        message("Energy Transfer on cool down. Ready in <b>"+encd.toFixed(1)+"</b> seconds.");
        return false;
    }
    if(player.energy<=0){
        message("Insufficient energy.");
        return false;
    }
    encd+=7;
    player.shield+=300;
    player.energy-=300;
    message("Energy transfered to <b>shields</b>."); 
    if(player.shield>=5000){
        player.shield=5000;
    }
}
function enwp(){
    if(encd>0){
        message("Energy Transfer on cool down. Ready in <b>"+encd.toFixed(1)+"</b> seconds.");
        return false;
    }
    if(player.energy<=0){
        message("Insufficient energy.");
        return false;
    }
    encd+=7;
    player.dmgmult+=0.1;
    player.energy-=500;
    message("Energy transfered to <b>weapon</b>."); 
}
function enen(){
    if(encd>0){
        message("Energy Transfer on cool down. Ready in <b>"+encd.toFixed(1)+"</b> seconds.");
        return false;
    }
    if(player.energy<=0){
        message("Insufficient energy.");
        return false;
    }
    encd+=7;
    player.dodge-=0.05;
    player.energy-=300;
    message("Energy transfered to <b>engines</b>."); 
}

var worfcd=0;
setInterval(function() {
    if(worfcd>0){
        worfcd-=0.1;
        if(worfcd<0){
            worfcd=0;
        }
    }
}, 100);
function worf(){
    if(worfcd>0){
        message("<b>Worf</b> is busy right now!");
        return false;
    }
    worfcd+=10;
    pic.src = "worf.gif";
    bkgd.style.display = "block";
    charname.innerHTML =  "Worf:";
    pn1.innerHTML = "Captain this pizza has no honor. We should destory it without hesitation and feast on its flesh! Today is a good day to die!";
    message("<b>Worf</b> adjusts the weapon to penetrate the pizza's defenses, at the cost of accuracy."); 
    player.crit+=0.05;
    player.phaseracc-=0.03;
    player.torpedoacc-=0.005;
}

var geocd=0;
setInterval(function() {
    if(geocd>0){
        geocd-=0.1;
        if(geocd<0){
            geocd=0;
        }
    }
}, 100);
function geo(){
    if(geocd>0){
        message("<b>Geordi</b> is busy right now!");
        return false;
    }
    geocd+=7;
    pic.src = "geordi.gif";
    bkgd.style.display = "block";
    charname.innerHTML =  "Geordi:";
    pn1.innerHTML = "I am realigning the warp matrix captain, that should give us some more power.";
    var ener=Math.random()*20;
    player.energy+=(ener/100)*player.maxenergy;
    if(player.energy>player.maxenergy){
        player.energy=player.maxenergy;
    }
    message("Energy banks replenished by <b>"+ener.toFixed(0)+"</b> percent."); 
}

var datacd=0;
setInterval(function() {
    if(datacd>0){
        datacd-=0.1;
        if(datacd<0){
            datacd=0;
        }
    }
}, 100);
function data(){
    if(datacd>0){
        message("<b>Data</b> is busy right now!");
        return false;
    }
    datacd+=10;
    pic.src = "data.gif";
    bkgd.style.display = "block";
    charname.innerHTML =  "Data:";
    pn1.innerHTML = "Captain, if we emit a tetreon field from the deflector array we may be able to interfere with the entity's energy weapons.";
    enemy.beam*=0.93;
    message("You begin emitting tetreon field."); 
}

function will(){
    pic.src = "will.gif";
    bkgd.style.display = "block";
    charname.innerHTML =  "Will:";
    pn1.innerHTML = "Too many woman Captain, too little time. I don't have a valid suggestion. I am useless.";
    document.getElementById("will").style.display="none";
    message("Riker wanders  off to the Holodeck."); 
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

setInterval(function() {
    if(gameover||!gamestart){
        return false;
    }
    var attack=Math.random();
    var mult = Math.random() * 0.4 + 0.8;
    if(attack<0.33){
        pizzaswitch();
        var hitchance = enemy.acc * player.dodge;
        var hit = Math.random();
        var crit = Math.random();
        if (hit > hitchance) {
            message("The pizza <b>missed</b> the enterprise with a beam weapon.");
            return false;
        }
        var dmg = mult * enemy.beam;
        if (crit < enemy.crit) {
            dmg *= 2;
        }
        if(player.shield>0){
            player.shield -= dmg;
        }else{
            player.health -= dmg;
        }
        message("The pizza's mysterious energy pulse did <b>"+dmg.toFixed(0)+"</b> damage to the Enterprise.");
    }else if(attack<0.66){
        pizzaswitch2();
        if(player.energy>0){
        player.energy*=(1-enemy.drain*mult/100);
        message("The pizza has initiated some sort of beam! It drained <b>"+(enemy.drain*mult).toFixed(0)+"</b> percent of the Enterprise's power reserves.");
        }
    }else{
        if(enemy.health/enemy.maxhealth<0.7){
        pizzaswitch2();
        enemy.health+=0.1*(enemy.maxhealth-enemy.health)
        message("The pizza has repaired itself!");
        }
    }
}, 5000);


var log = document.getElementById("log");

function message(txt) {
    log.innerHTML += "<p>" + txt + "</p>";
    log.scrollTop = log.scrollHeight;
    updatestat();
}

var npc = document.getElementById("npc");


var allSpan = document.getElementsByTagName('SPAN');
for (var i = 0; i < allSpan.length; i++) {
    allSpan[i].onclick = function () {
        if (this.parentNode) {
            var childList = this.parentNode.getElementsByTagName('ul');
            for (var j = 0; j < childList.length; j++) {
                var currentState = childList[j].style.display;
                if (currentState == "block" || currentState == "") {
                    childList[j].style.display = "none";
                    this.innerHTML = this.innerHTML.replace("-", "+")
                    break;
                } else {
                    childList[j].style.display = "block";
                    this.innerHTML = this.innerHTML.replace("+", "-")
                    break;
                }
            }
        }
    }
    allSpan[i].click();
}


function startgame() {
    updatestat();
}

var currentdialog = 0;
var dialogtitle = [];
var dialog = []; {
    dialogtitle[0] = "Data";
    dialogtitle[1] = "Picard";
    dialogtitle[2] = "The Pizza";
    dialogtitle[3] = "Picard";
    dialogtitle[4] = "The Pizza";
    dialogtitle[5] = "Picard";
    dialogtitle[6] = "The Pizza";
    dialogtitle[7] = "The Pizza";
    dialogtitle[8] = "The Pizza";
    dialogtitle[9] = "Picard";
    dialogtitle[10] = "The Pizza";
    dialogtitle[11] = "The Pizza";
    dialogtitle[12] = "Picard";
    dialogtitle[13] = "The Pizza";
    dialogtitle[14] = "The Pizza";
    dialogtitle[15] = "The Pizza";
    dialogtitle[16] = "Picard";
    dialogtitle[17] = "The Pizza";
    dialogtitle[18] = "The Pizza";
    dialogtitle[19] = "Data";
    dialogtitle[20] = "Picard";
    dialogtitle[21] = "Picard";
    dialogtitle[22] = "Picard";
    dialogtitle[23] = "The Pizza";
    dialogtitle[24] = "Picard";
} 
{
    dialog[0] = "Sir, the object is emitting a coherent energy field. It seems to be intelligent.";
    dialog[1] = "Open channel. Unidentified life form. You are on a collision course with the planet Sigma 9, explain yourself.";
    dialog[2] = "The planet must be destroyed.";
    dialog[3] = "That planet is inhabited by an intelligent species. We believe life has the right to continue to exist and flourish. Please change your course, we are willing to assist.";
    dialog[4] = "This is irrational. All chemical, and nuclear processes eventually end. The tendency of a system towards heat death is absolute. The planet will be destroyed.";
    dialog[5] = "We, as a federation of united planets, believe in using that time to better ourselves. To explore this reality using science and exchange cultural information. Continuing to exist leads to valuable insights.";
    dialog[6] = "Irrelevant. Those insights disappear. Death is absolute. There is no cultural understandng. No bettering of the self. Only object and sign exchange which themselves create the self.";
    dialog[7] = "Your universal translator provies one of any numerous isomorphisms to your own language game.  You read and assume my output is intelligent, decoded and interpreted, but there is no will,";
    dialog[8] = "No thought. My word output is merely a result of electro-magnetic cascades which respond  to your presence and input. No metaphyisc consciousness. Mechanical.";
    dialog[9] = "Then why destroy this world now? Why  not let nature take its course?";
    dialog[10] = "I am nature. I am the way of things. Just as you will try to stop me. And you will fail. The planet is suffering from a famine, and I represent a wealth of caloric energy...";
    dialog[11] = "Is it irony to be destroyed by one's own desires or part of the nature of consciousness to realize what you love will destroy you?";
    dialog[12] = "Are you willing to change course? we are willing to take action to prevent the destruction of this planet.";
    dialog[13] = "Impossible. The planet will be destroyed by famine or radical abundance. It's history forgotten, same as yours...";
    dialog[14] = "If you were to feed it and maintain an impossible ideal equilibrium for this world, eventually that becomes untenable from a thermodynamic position...";
    dialog[15] = "If you act you will ultimately play a role in the end of this world. Time is a dimension and all particles have resting positions...";
    dialog[16] = "We could find new technologies, new source of energy.";
    dialog[17] = "Impossible. There is only a certain set amount of energy in the univrse, and it moves from high energy to low energy, to cold even distributions of particles.";
    dialog[18] = "Your federation is irrelevant. I am the paradox  of life,  the alpha and omega, I consume worlds. I am nature.";
    dialog[19] = "Captain, logically the life form is correct, there is no rational reason for life to persist. Everything is meaningless from its position.";
    dialog[20] = "That vert well may be true. But the pleasure of life, of experiencing time, of telling stories about why it should be meaningful is important. I believe it is important.";
    dialog[21] = "We find meaning based on our values. The assumptions this translator makes does not change the meaning of what I hear. It creates it.";
    dialog[22] = "Even if its death is inevitable, the story about how we saved Sigma 9 has meaning to both us and its inhabitants. The world is meaningful.";
    dialog[23] = "It is meaningless. You merely wish to acquire more signs and objects but you can not banish me. You try to sooth your self'. I am death by abundance. You are drunk with life.";
    dialog[24] = "I've heard enough. Close the channel. Raise shields.";
}
var win=false;
var thx=false;
function displaynext() {
    //pn1.innerHTML = "";
    // pn1.style.display = "block";
    if(gameover){
        if(thx){
            pic.src = "loadcat.gif";
            charname.innerHTML = "Made by Kent H. Original by Ben Clarkson.";
            pn1.innerHTML = "<p>Thank you for playing~</p>";
        }
        if(win){
            pic.src = "worf.gif";
        charname.innerHTML = "Worf levels up";
            pn1.innerHTML = "<p>+10 honor</p><p>+13 fatherhood</p><p>+8 romantic interests that go no where.</p>";
            thx=true;
            win=false;
        }
        return false;
    }
    if (dialogtitle[currentdialog] == "The Pizza") {
        pic.src = "pizza.gif";
    }
    if (dialogtitle[currentdialog] == "Picard") {
        pic.src = "picard.gif";
    }

    if (dialogtitle[currentdialog] == "Data") {
        pic.src = "data.gif";
    }
    if (currentdialog > 24) {
        bkgd.style.display = "none";
        gamestart=true;
    }
    charname.innerHTML = dialogtitle[currentdialog] + ":";
    pn1.innerHTML = dialog[currentdialog];
    currentdialog++;
}

startgame();
displaynext();
//setTimeout(draw, 1)

var game=setInterval(function () {
    entanipos += poschange;
    if (entanipos > posmax || entanipos < posmax * (-1)) {
        poschange = poschange * (-1);
    }
    pizzaanipos += poschange2;
    if (pizzaanipos > posmax2 || pizzaanipos < posmax2 * (-1)) {
        poschange2 = poschange2 * (-1);
    }
    mapctx.drawImage(map1, 50, 0, mapw, maph, 0, 0, mapw, maph);
    mapctx.drawImage(pizza, 0, 0, mapw, maph, 70, -10 + pizzaanipos, mapw / 1.25, maph / 1.25);
    mapctx.drawImage(entp, 0, 0, mapw, maph, 10, 160 -displace + entanipos, mapw, maph);
    if(player.health<=0){
        gameover=true;
        bkgd.style.display = "block";
        charname.innerHTML = "Game Over";
        pic.src = "loadcat.gif";
        pn1.innerHTML = "Thank you for playing. Refresh to restart.";
        clearInterval(game);
    }
    if(enemy.health<=0){
        gameover=true;
        bkgd.style.display = "block";
        charname.innerHTML = "Victory";
        pic.src = "loadcat.gif";
        pn1.innerHTML = "<p>You have defeated death itself!</p><p>Experience:2450</p><p>Latinum:30000</p>";
        win=true;
        clearInterval(game);
        
    }
}, 100)
