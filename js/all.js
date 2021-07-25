var userHeight = document.querySelector('.inputHeight');
var userWeight = document.querySelector('.inputWeight');
var resultButton = document.querySelector('.result');
var resultText = document.querySelector('.resultText');
var initButton = document.querySelector('.init');
var historyList = document.querySelector('.historyList');
var clearButton = document.querySelector('.clearButton');
var historyArray = JSON.parse(localStorage.getItem('dataArray'))||[];

updateList();

function add(){
    if (userHeight.value === '' || userHeight.value === 0 || userWeight === '' || userWeight === 0){
        alert('請輸入正確的身高及體重！')
    }else{
        showResult();
    };
}

function showResult(){
    let BMIvalue = 0
    let heightNumber = parseInt(userHeight.value)/100;
    let heightNumberlocal = parseInt(userHeight.value);
    let weightNumber = parseInt(userWeight.value);
    BMIvalue = (weightNumber/(heightNumber*heightNumber)).toFixed(1);
    let classSelector = ''
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
    let infoObj = {class: classSelector,bmi: BMIvalue,height: heightNumberlocal,weight: weightNumber};
    historyArray.push(infoObj);
    updateList();
    localStorage.setItem('dataArray',JSON.stringify(historyArray));
};

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
function clearAll(){
    historyArray = [];
    localStorage.setItem('dataArray',JSON.stringify(historyArray));
    init(event);
    updateList();
}

resultButton.addEventListener('click',add);
initButton.addEventListener('click',init);
clearButton.addEventListener('click',clearAll);



function updateList(){
    let str = '';
    let BMIvalue = 0;
    let heightNumber = parseInt(userHeight.value)/100; 
    let weightNumber = parseInt(userWeight.value);
    BMIvalue = (weightNumber/(heightNumber*heightNumber)).toFixed(1);
    for (let i=0;i<historyArray.length;i++){
        str += '<li class="'+historyArray[i].class+'"><span class="listContent"><span class="listTitle">BMI</span>'+historyArray
        [i].bmi+'</span><span class="listContent"><span class="listTitle">weight</span>'+historyArray[i].weight+'kg </span><span class="listContent"><span class="listTitle">height</span>'+historyArray[i].height+'cm</span><a data-num="'+i+'" href="" class="delEach">刪除</a></li>'
    }
    historyList.innerHTML = str;
    deleteOne();
};

function deleteOne(){
    var delEach = document.querySelectorAll('.delEach');
    for (let i=0;i<delEach.length;i++){
        let num = delEach[i].dataset.num;
        delEach[i].addEventListener('click',function(e){
            e.preventDefault();
            historyArray.splice(num,1);
            updateList();
            localStorage.setItem('dataArray',JSON.stringify(historyArray));
        });
    };
    
};
