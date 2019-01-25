var distance = 10;
var hunger = 20;
var food = 10;
var people = 2;
var day = 1;
var temperature = 75;

document.getElementById("day").textContent = "Week " + day;
document.getElementById("distance").textContent = "Distance: " + distance;
            document.getElementById("food").textContent = "Food: " + food;
            document.getElementById("hunger").textContent = "Hunger: " + hunger;
            document.getElementById("temperature").textContent = "Temperature: " + temperature;


var events = ["Random Stranger", "Raining", "Road Agents", "Thief", "Building", "Betrayl"];
var eventDescriptions = ["You come by a random stranger in the road. Their clothes are ragged and they seem to have no food. What do you do?",
    "You feel the wind pick up and soon you are being pelted by rain. What do you do?",
    "The road rumbles beneath your feet. The almost foreign sound of an engine can be heard getting closer and you can just see a large group of people coming your way on the road. What do you do?",
    "You awake to find the packs and all of your food taken. What do you do?",
    "You have come across a building. What do you do?",
    "You awake to the sight of the stranger standing over you. Thier face is filled with insane delight. Their hands are holding a bloody knife, it aimed directly at your chest....you savor the sweet embrace of death"];

var normEvent = "You wake up in the makeshift shelter you had made the night before. The boy is still lying next to you shivering in the cold. What do you do?";
var currentEvent = null;

var previousDescription = normEvent;

var randEvent = -1;

var description = document.getElementById("Description");
var input = 1;
var update = false;

var gameEnd = false;

function checkInput(event) {
    var x = event.keyCode;
    console.log(x);
    if(gameEnd==true){

        if(distance>0){
            description.textContent = "You have died. Let this be a lesson to you. In a world where such horrors that are these exist, you should not trust anyone. Everyone could be an enemy at a moments time. Trust No One. Not even yourself.....If you have learned your lesson, you may attempt to play again...."
        }
        else{
            description.textContent = "You survived, somehow, even though ALL of the odds were stacked agaisnt you...";
        }
    }
    else if (x == 13 && update == false) {
        input = document.getElementById("user").value;

        if (input > 0 && input < 7) {
            choice(input);
            document.getElementById("user").value = "";
        }
    }
    else if(update == true) {

        description.textContent = previousDescription;
        document.getElementById("day").textContent = "Week " + day;
    document.getElementById("distance").textContent = "Distance: " + distance;
    document.getElementById("food").textContent = "Food: " + food;
    document.getElementById("hunger").textContent = "Hunger: " + hunger;
    document.getElementById("temperature").textContent = "Temperature: " + temperature;
    update = false;
    }
    else if(description.textContent == "You have died. Let this be a lesson to you. In a world where such horrors that are these exist, you should not trust anyone. Everyone could be an enemy at a moments time. Trust No One. Not even yourself.....If you have learned your lesson, you may attempt to play again...."){
        description.textContent = normEvent;
        restart();
    }
    
}


function choice(input) {
    
    if (randEvent == 5 && people == 3) {
        return;
    }

    console.log(input);
    switch (eval(input)) {
        case 1: distance -= 50;
            if(distance<=0){
                gameEnd = true;
                document.getElementById("distance").textContent = "Distance: " + distance;
                description.textContent = "You survived, somehow, even though ALL of the odds were stacked agaisnt you...";
                return;
            }

            console.log("Distance: " + distance);
            if (randEvent == 2) {
                description.textContent = "You walk striaght to the group of roadagents. Essentially handing yourself over. You hear the leader yelling about keeping the boy alive for other needs but having no use for you. They charge you. Amongst the hoard, you hear the boy crying out for you. Everything goes black...";
                gameEnd = true;
                return;
            }

            var prevEvent = randEvent;
            randEvent = Math.round(Math.random() * 7);
            console.log(randEvent);
            var maxEventNum;
            if (people == 2) {
                maxEventNum = 5;
            }
            else {
                maxEventNum = 6;
            }
            if (randEvent > -1 && randEvent < maxEventNum && randEvent != prevEvent) {
                description.textContent = eventDescriptions[randEvent];
            }
            else {
                description.textContent = normEvent;
            }

            if (randEvent == 3) {
                food = 0;
            }

            if (randEvent == 5 && people == 3) {
                gameEnd = true;
            }

            day+=1;
            previousDescription = description.textContent;
            document.getElementById("day").textContent = "Week " + day;
            document.getElementById("distance").textContent = "Distance: " + distance;
            document.getElementById("food").textContent = "Food: " + food;
            document.getElementById("hunger").textContent = "Hunger: " + hunger;
            document.getElementById("temperature").textContent = "Temperature: " + temperature;
            break;
        case 2:
            if (food > 0) {
                hunger -= 10;
                food -= 1;
                description.textContent = "You take a small break for the day and fill your starving bellies";
            }
            else {
                description.textContent = "You don't have enough food. You should try to scavange some quickly";
            }
            break;
        case 3:
            if (randEvent == 1) {
                description.textContent = "The rain put any fire you created out."
                break;
            }
            var randNum = Math.round(Math.random() * 5)
            if (randNum >= 4) {
                description.textContent = "You successfuly created fire. Your cold body appreciates the warmth."
                temperature += 15;
            }
            else {
                description.textContent = "You failed at creating fire"
            }
            break;
        case 4: if (randEvent == 0) {
            description.textContent = "After a long chat, the stranger decides to join your group";
            people += 1;
        }
        else if (randEvent == 2) {
            description.textContent = "You walk striaght to the group of roadagents. Essentially handing yourself over. You hear the leader yelling about keeping the boy alive for other needs but having no use for you. They charge you. Amongst the hoard, you hear the boy crying out for you. Everything goes black...";
            gameEnd = true;
            return;
        }
        else {
            description.textContent = "You and the boy have a lovely conversation about death.";
        }

            break;
        case 5:
            description.textContent = "You find fallen trees off of the road to create a makeshift shelter"
            temperature += 5
            randEvent = 10;
            previousDescription = normEvent;
            break;
        case 6:
            if (randEvent == 2) {
                description.textContent = "You, not so sneakily, attempt to take food from the roadagents....however, you only end up supplying them with more food..."
                gameEnd = true;
                return;
            }

            var maxFound = 3;
            if (randEvent == 4) {
                maxFound = 10;
            }
            var randFood = Math.round(Math.random() * maxFound);

            description.textContent = "You scavanged " + randFood + " food in the nearby area";
            food += randFood;
            break;

    }
    if (randNum == 1 && input != 5) {
        temperature -= 10;
    }

    hunger += 5;
    temperature -= 5;

    if(hunger > 100){
        description.textContent = "You have starved to death...you should remember eating is necessary for survival... ";
        gameEnd = true;
    }

    if(temperature < -10){
        description.textContent = "You have froze to death, essentially turning into a human popsicle....which in this society might actually be taken as a desseret....";
        gameEnd = true;
    }

    if(input != 1){
        update = true;
    }

    

}
