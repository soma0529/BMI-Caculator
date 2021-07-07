var userHeight = document.querySelector('.inputHeight');
var userWeight = document.querySelector('.inputWeight');
var resultButton = document.querySelector('.result');
var resultText = document.querySelector('.resultText');
var initButton = document.querySelector('.init');
var historyList = document.querySelector('.historyList');
var historyArray = JSON.parse(localStorage.getItem('dataArray'))||[];


function add(){
    var BMIvalue = 0
    var heightNumber = parseInt(userHeight.value)/100;
    var heightNumverlocal = parseInt(userHeight.value);
    var weightNumber = parseInt(userWeight.value);
    BMIvalue = (weightNumber/(heightNumber*heightNumber)).toFixed(1);
    var classSelector = ''
    // console.log(BMIvalue);
    // console.log(typeof(BMIvalue));
    if (BMIvalue >= 18.5 && BMIvalue <= 25){
        // 顯示BMI數值
        resultText.textContent = BMIvalue;
        // 變更下方顯示BMI字樣顏色
        resultText.setAttribute('class','perfectText')
        // 變更圈圈顏色class
        resultButton.setAttribute('class','perfect');
        // 顯示重置按鈕
        initButton.setAttribute('class','init initPerfect');
        // initButton.classList.remove('hide');
        classSelector = 'allList perfectList';
    }else if (BMIvalue < 18.5 ){
        resultText.textContent = BMIvalue;
        resultText.setAttribute('class','tooLightText');
        resultButton.setAttribute('class','tooLight');
        initButton.setAttribute('class','init initToolight');
        classSelector = 'allList toolightList';
    }else if (BMIvalue > 25 && BMIvalue <= 30){
        resultText.textContent = BMIvalue;
        resultText.setAttribute('class','littleFatText');
        resultButton.setAttribute('class','littleFat');
        initButton.setAttribute('class','init initLittleFat');
        classSelector = 'allList littlefatList';
    }else if (BMIvalue > 30 && BMIvalue <= 35){
        resultText.textContent = BMIvalue;
        resultText.setAttribute('class','fatText');
        resultButton.setAttribute('class','fat');
        initButton.setAttribute('class','init initFat')
        classSelector = 'allList fatList';
    }else if (BMIvalue > 35){
        resultText.textContent = BMIvalue;
        resultText.setAttribute('class','toofatText');
        resultButton.setAttribute('class','tooFat');
        initButton.setAttribute('class','init initToofat');
        classSelector = 'allList toofatList'; 
    }
    var infoObj = {class: classSelector,bmi: BMIvalue,height: heightNumverlocal,weight: weightNumber};
    historyArray.push(infoObj);
    console.log(historyArray);
    updateList();
    localStorage.setItem('dataArray',JSON.stringify(historyArray));
}

function init(event){
    event.stopPropagation();
    initButton.style.transform = "rotate(360deg)";
    setTimeout(changeStyle, 800);
};

function changeStyle(){
    resultText.textContent = '看結果';
    resultButton.setAttribute('class','result');
    resultText.setAttribute('class','resultText');
    initButton.setAttribute('class','init hide');
    userHeight.value = '';
    userWeight.value = ''; 
    initButton.style.transform = 'rotate(0deg)'; 
};

resultButton.addEventListener('click',add);
initButton.addEventListener('click',init);


function updateList(){
    var str = '';
    var BMIvalue = 0;
    var heightNumber = parseInt(userHeight.value)/100; 
    var weightNumber = parseInt(userWeight.value);
    var heightNumberCM = parseInt(userHeight.value);
    BMIvalue = (weightNumber/(heightNumber*heightNumber)).toFixed(1);
    // var classSelector = ''
    // if (BMIvalue >= 18.5 && BMIvalue <= 25){
    //     classSelector = 'allList perfectList';
    // }else if (BMIvalue < 18.5 ){
    //     classSelector = 'allList toolightList';
    // }
    for (var i=0;i<historyArray.length;i++){
        str += '<li class="'+historyArray[i].class+'"><span class="listContent"><span class="listTitle">BMI</span>'+historyArray
        [i].bmi+'</span><span class="listContent"><span class="listTitle">weight</span>'+historyArray[i].weight+'kg </span><span class="listContent"><span class="listTitle">height</span>'+historyArray[i].height+'cm</span></li>'
    }
    historyList.innerHTML = str;
};
updateList();