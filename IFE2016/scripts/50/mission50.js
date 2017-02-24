var containerEl = $('.container');
var day = new Date();
var cfg = [
	{
		'title':'my first article',
		'state':'inLine',//inLine,finish,outLine
		'stopTime':'2017/1/1',
		'questions':[
			{
				'type':'single',
				'questionTitle':'firstQue',
				'choses':['1','2','3'],
				'data':[10,20,30]
			},
			{
				'questionTitle':'secondQue',
				'type':'text',
				'must':true,
				'data':50
			}
		],
	},
	{
		'title':'my second article',
		'state':'finish',//inLine,finish,outLine
		'stopTime':'2017/1/1',
		'questions':[
			{
				'type':'many',
				'questionTitle':'firstQue',
				'choses':['1','2','3','4'],
				'data':[10,20,30,40]
			},
			{
				'type':'many',
				'questionTitle':'secondQue',
				'choses':['1','2'],
				'data':[10,20]
			},
			{
				'type':'single',
				'questionTitle':'thirdQue',
				'choses':['1','2'],
				'data':[10,20]
			},
			{
				'questionTitle':'secondQue',
				'type':'text',
				'must':true,
				'data':60
			}
		],
	},
	{
		'title':'my third article',
		'state':'outLine',//inLine,finish,outLine
		'stopTime':'2017/1/1',
		'questions':[
			{
				'type':'single',
				'questionTitle':'firstQue',
				'choses':['1','3'],
				'data':[10,20]
			}
		],
	},
	{
		'title':'my fourth article',
		'state':'outLine',//inLine,finish,outLine
		'stopTime':'2017/1/1',
		'questions':[
			{
				'type':'single',
				'questionTitle':'firstQue',
				'choses':['1','2','3'],
				'data':[10,20,50]
			},
			{
				'questionTitle':'secondQue',
				'type':'text',
				'must':true,
				'data':20
			}
		],
	}
];
var artical = new componentArticalList(cfg);
var showData = new componentShowData();
var navEl = new componentNav();
navEl.appendToEl($('body'));