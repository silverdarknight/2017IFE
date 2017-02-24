/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById('aqi-city-input').value;
	var rate = document.getElementById('aqi-value-input').value;
  var reCity = /^[\w|[\u4e00-\u9fa5]|\s]+$/g;
  var reRate = /^\d+$/g;
  if(reCity.test(city)&&reRate.test(rate)) aqiData[city] = rate;
  else alert('丢类楼某输错了！');
  //console.log(reCity.test(city));
  //console.log(reRate.test(rate));
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var targetTable = document.getElementById('aqi-table');
	var item = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
	for(var city in aqiData){
		item += '<tr><td>'+city+'</td><td>'+aqiData[city]+'</td><td><button data-city="'+city+'">删除</button></td></tr>';
	}
	targetTable.innerHTML = item;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  //console.log(aqiData[this.dataset.city]);
  delete aqiData[this.dataset.city];
  var city = this.parentNode.parentNode.firstChild.innerText;
  console.log(city);
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById('add-btn')
  .addEventListener('click', addBtnHandle, false);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  document.getElementById('aqi-table').addEventListener('click',function(event){
  	if(event.target.nodeName.toLowerCase() == 'button') {
  		console.log(event.target);
  		delBtnHandle.call(event.target);
  	}
  	else console.log(event.target.nodeName);
  },false);
}

init();