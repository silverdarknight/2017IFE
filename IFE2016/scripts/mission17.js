/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
var baseData = {
  "北京": 500,
  "上海": 300,
  "广州": 200,
  "深圳": 100,
  "成都": 300,
  "西安": 500,
  "福州": 100,
  "厦门": 100,
  "沈阳": 500
};

// 用于渲染图表的数据
var chartData = {
};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
};

var radioInput = document.getElementsByTagName('input');
function getType(){
  for(var i = 0;i<radioInput.length;i++){
    if(radioInput[i].checked) pageState['nowGraTime'] = radioInput[i].value;
  }
}
function getCity(){
  pageState['nowSelectCity'] = document.getElementById('city-select').value;
}
function getData(){
  //get Month from string
  function getMonth(str){
    return parseInt(str.split('-')[1]);
  }

  //get Month average data from data
  function getAverageData(data , month){
    var average = 0,day = 0;
    for(var i in data){
      if(getMonth(i) == month) {average+=data[i];day++;}
    }
    return average/day;
  }

  //use getAverageData to get Month total data
  function getMonthData(data){
    var ans = {};
    var startMonth = getMonth(date[0]);
    var EndMonth = getMonth(date[date.length-1]);
    for(var i=startMonth;i<=EndMonth;i++){
      ans[i+"月"] = getAverageData(data,i);
    }
    return ans
  }

  //Main
  var date = [],rate = [],data = aqiSourceData[pageState.nowSelectCity];
  chartData = {};
  for(var i in data){
    date.push(i);
    rate.push(data[i]);
  }
  //console.log(date);
  //console.log(rate);
  if(pageState.nowGraTime == 'day'){
    chartData = aqiSourceData[pageState['nowSelectCity']];
  }
  else if(pageState.nowGraTime == 'week'){
    for(i=0;i<rate.length;i+=7){
      console.log(i);
      var j = i,ans = 0;
      for(;j<i+7;j++){
        ans+=rate[j];
      }
      ans = ans/7;
      chartData[date[i]] = Math.ceil(ans);
    }
  }
  else {
    chartData = getMonthData(data);
  }
}
function flashData(){
  getCity();
  getType();
  getData();
}
/**
 * 渲染图表
 */
function renderChart() {
  var text = [],rate = [],ul = document.getElementById('aqi-ul');
  ul.innerHTML = '';
  flashData();
  for(var i in chartData){
    text.push(i);rate.push(chartData[i]);
    var liEl = document.createElement('li');
    var bar = document.createElement('div');bar.style.backgroundColor = 'green';bar.style.height = (chartData[i]/baseData[pageState.nowSelectCity]*100)+'%';
    var span = document.createElement('span');span.innerText = chartData[i];
    liEl.appendChild(bar);
    liEl.appendChild(span);
    ul.appendChild(liEl);
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据
  flashData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据
  flashData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  flashData();
  renderChart();
  document.getElementById('form-gra-time').addEventListener('click', function(e){
    if(e.target.nodeName.toLowerCase() == 'input') graTimeChange();
  }, false);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  h = '';
  for(var i in aqiSourceData){
    h+='<option value="'+i+'">'+i+'</option>';
  }
  document.getElementById('city-select').innerHTML = h;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  //document.getElementById('city-select').addEventListener('change',citySelectChange(),false);
  document.getElementById('city-select').addEventListener('change',citySelectChange,false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();