const USER = {
    money: 2000,
    
}
const OPTIONS = ['bau', 'cua', 'ca', 'cop','ga','tom'];
const DICES_NUM = 3;
const betQueue = {
    'bau':0,
    'cua':0,
    'ca':0,
    'cop':0,
    'ga':0,
    'tom':0
};

let formClass = document.querySelector(".form-class");
formClass.addEventListener('submit',mainFunction);

function mainFunction(e){
    e.preventDefault();
    console.log('Submited');
    queueUserbet();
    

    console.log(betQueue);
    const rolledDiceInIndex = rollingDice();
    const rolledDiceInLetter = rolledDiceInIndex.map((x)=>OPTIONS[x]);
    console.log(rolledDiceInIndex);
    console.log(rolledDiceInLetter);
    //todo need to work on this calculation when roll 1 side double.
    let winingMoney = betQueue[rolledDiceInLetter[0]] + betQueue[rolledDiceInLetter[1]] + betQueue[rolledDiceInLetter[2]];
    console.log('wining money ',winingMoney);
    USER.money += winingMoney;

    let dequeMoney = 0;
    for (let key in betQueue){
        if (rolledDiceInLetter.includes(key)){
            dequeMoney += betQueue[key];
        }
        betQueue[key] = 0;
    }
    console.log(dequeMoney);
    USER.money += dequeMoney;

    console.log('money after roll dice', USER.money);
}

function rollingDice(){
    let result =[];
    for (let i = 0; i < DICES_NUM; i++) {
        result.push(Math.floor(Math.random()*OPTIONS.length)); 
    }
    return result;
}

function queueUserbet(){
    // const bau = document.querySelector('#bau').value;
    // const cua = document.querySelector('#cua').value;
    // const ca = document.querySelector('#ca').value;
    // const cop = document.querySelector('#cop').value;
    // const ga = document.querySelector('#ga').value;
    // const tom = document.querySelector('#tom').value;

    updateQueueWithInput('bau', document.querySelector('#bau').value);
    updateQueueWithInput('cua', document.querySelector('#cua').value);
    updateQueueWithInput('ca', document.querySelector('#ca').value);
    updateQueueWithInput('cop', document.querySelector('#cop').value);
    updateQueueWithInput('ga',  document.querySelector('#ga').value);
    updateQueueWithInput('tom', document.querySelector('#tom').value);

    console.log(betQueue);

    let reduceAmount = Object.values(betQueue).reduce((total, x)=> total + x);
    console.log(reduceAmount);
    // update user money
    USER.money -= reduceAmount;
    console.log('money when place bet', USER.money);
    return;
}

function updateQueueWithInput(keyofqueue, valueofqueue){
    // console.log(valueofqueue,typeof valueofqueue);
    if(!!parseInt(valueofqueue)){
        betQueue[keyofqueue] = parseInt(valueofqueue);
    }
}