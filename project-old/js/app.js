console.log(React);
console.log(ReactDOM);
ReactDOM.render(
	React.createElement('h1', null, 'Привет, Мир'),
	document.getElementById('root')
);
ReactDOM.render(
	<h1>Hello, world!</h1>,
	document.getElementById('root')
);

var	myNews	=	[
	{
		author:	'Саша	Печкин',
		text:	'В	четчерг,	четвертого	числа...',
		bigText:	'в	четыре	с	четвертью	часа	четыре	чёрненьких	чумазеньких	чертёнка	чертил чёрными	чернилами	чертёж.'
},
{
	author:	'Просто	Вася',
		text:	'Считаю,	что	$	должен	стоить	35	рублей!',
	bigText:	'А	евро	42!'
},
{
	author:	'Гость',
		text:	'Бесплатно.	Скачать.	Лучший	сайт	-	http://localhost:3000',
	bigText:	'На	самом	деле	платно,	просто	нужно	прочитать	очень	длинное	лицензионное соглашение'
}
];

var Article = React.createClass({
	propTypes:	{
		data:	React.PropTypes.shape({
			author:	React.PropTypes.string.isRequired,
			text:	React.PropTypes.string.isRequired,
			bigText:	React.PropTypes.string.isRequired
		})
	},
	getInitialState: function() {
		return {
			visible: false,
		}
	},
	readmoreClick: function(e) {
		e.preventDefault();
		this.setState({visible:true}, function() {
			console.log('State was changed');
		});
	},
	render: function() {
		var	author	=	this.props.data.author,
			text	=	this.props.data.text,
			bigText	=	this.props.data.bigText,
			visible = this.state.visible;// считується значення змінної із стана компоненти
		console.log('render',this);
		return (
			<div	className="article">
				<p	className="news__author">{author}:</p>
				<p	className="news__text">{text}</p>
				<a href="#"
						onClick={this.readmoreClick}
						className={'news__readmore	'	+	(visible	?	'none':	'')}>
							Детальніше
							</a>
			<p	className={'news__big-text	'	+	(visible	?	'':	'none')}>{bigText}</p>
			</div>
		)
	}
});
var News = React.createClass({
	propTypes: {
		data: React.PropTypes.array.isRequired
	},
	getInitialState: function() {
		return {
			counter: 0
		}
	},
	onTotalNewsClick:	function()	{
		this.setState({counter:	++this.state.counter	});
	},
	render: function() {
		var data = this.props.data;
		var newsTemplate;

		if(data.length > 0) {
			newsTemplate = data.map(function(item, index) {
				return (
					<div	key={index}>
						<Article data={item}/>
				</div>
				)
			});
		} else {
			newsTemplate	=	<p>Нажаль новини відсутні</p>
		}
		return (
			<div className="news">
				{newsTemplate}
				<strong
					className={'news__count	'	+	(data.length	>	0	?	'':'none')	}
						onClick={this.onTotalNewsClick}>
						Всього новин: {data.length}
			</strong>
			</div>
		);
	}
});

/*var Comments = React.createClass({
	render: function() {
		return (
			<div className="comments">Новин не має - коментувати не має що.</div>
		);
	}
});*/

//	---	добавили	test	input	---
/*var	TestInput	=	React.createClass({
	getInitialState:	function()	{
		return	{
			myValue:	''
		};
	},
	onChangeHandler:	function(e)	{
		this.setState({myValue:	e.target.value})
	},
	onBtnClickHandler:	function()	{
		console.log(this.state.myValue);
	},
	render:	function()	{
		return	(
				<div>
			<input
		className='test-input'
		value={this.state.myValue}
		onChange={this.onChangeHandler}
		placeholder='введіть значення'
		/>
			<button	onClick={this.onBtnClickHandler}>Показати	консоль</button>
				</div>
		);
	}
});*/

var	TestInput	=	React.createClass({
	onBtnClickHandler:	function()	{
		console.log(this.refs);
		console.log(ReactDOM.findDOMNode(this.refs.myTestInput).value);
	},
	render:	function()	{
		return	(
			<div>
			<input
		className='test-input'
		defaultValue=''
		placeholder='введіть значення'
				ref='myTestInput'
			/>
			<button	onClick={this.onBtnClickHandler} ref='consoleButton'>Показати	консоль</button>
		</div>
		);
	}
});

var	Add	=	React.createClass({
	getInitialState:	function()	{	//устанавливаем	начальное	состояние	(state)
	return	{
		agreeNotChecked:	true,
		authorIsEmpty:	true,
		textIsEmpty:	true
	};
},
	componentDidMount:	function()	{
		ReactDOM.findDOMNode(this.refs.author).focus();
	},
	onBtnClickHandler:	function(e)	{
		e.preventDefault();
		var	author	=	ReactDOM.findDOMNode(this.refs.author).value;
		var	text	=	ReactDOM.findDOMNode(this.refs.text).value;
		alert(author	+	'\n'	+	text);
	},
	onCheckRuleClick:	function(e)	{
		this.setState({agreeNotChecked:	!this.state.agreeNotChecked});	//устанавливаем	значение	в	state
	},
	onAuthorChange:	function(e)	{
		if	(e.target.value.trim().length	>	0)	{
			this.setState({authorIsEmpty:	false})
		}	else	{
			this.setState({authorIsEmpty:	true})
		}
	},
	onTextChange:	function(e)	{
		if	(e.target.value.trim().length	>	0)	{
			this.setState({textIsEmpty:	false})
		}	else	{
			this.setState({textIsEmpty:	true})
		}
	},
	onFieldChange:	function(fieldName,	e)	{
		var	next	=	{};
		if	(e.target.value.trim().length	>	0)	{
			next[fieldName]	=	false;
			this.setState(next);
		}	else	{
			next[fieldName]	=	true;
			this.setState(next);
		}
	},
	render:	function()	{
		var	agreeNotChecked	=	this.state.agreeNotChecked,
			authorIsEmpty	=	this.state.authorIsEmpty,
			textIsEmpty	=	this.state.textIsEmpty;
		return	(
			<form	className='add	cf'>
			<input
		type='text'
		className='add__author'
		onChange={this.onFieldChange.bind(this,	'authorIsEmpty')}
		placeholder='Ваше	имя'
		ref='author'
			/>
			<textarea
		className='add__text'
		onChange={this.onFieldChange.bind(this,	'textIsEmpty')}
		placeholder='Текст	новости'
		ref='text'
			></textarea>		<label	className='add__checkrule'>
			<input	type='checkbox'	ref='checkrule'	onChange={this.onCheckRuleClick}/>Я	согласен	с	правилами
		</label>
		<button
		className='add__btn'
		onClick={this.onBtnClickHandler}
		ref='alert_button'
		disabled={agreeNotChecked	||	authorIsEmpty	||	textIsEmpty}
		>
		Показать	alert
		</button>
		</form>
		);
	}
});

var App = React.createClass({
	getInitialState:	function()	{
		return	{
			news:	myNews
		};
	},
	componentDidMount:	function()	{
		/*	Слушай	событие	"Создана	новость"
		 если	событие	произошло,	обнови	this.state.news
		 */
	},
	componentWillUnmount:	function()	{
		/*	Больше	не	слушай	событие	"Создана	новость"	*/
	},
	render: function() {
		console.log('render');
		return (
			<div	className="app">
			<Add />
			<h3>Новини</h3>
			<News data={myNews} /> {/* добавлена властивість	data	*/}
		</div>
		);
	}
});

ReactDOM.render(
<App	/>,
	document.getElementById('root')
);

