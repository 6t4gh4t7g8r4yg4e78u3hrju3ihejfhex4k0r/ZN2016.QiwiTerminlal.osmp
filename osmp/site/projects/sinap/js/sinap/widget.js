"use strict";System.register([],function(_export,_context){function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var _get,_createClass,TYPE,KEYBOARD,LAYOUT,FEATURE,Widget,Info,Text,Date,ExpirationDate,Choices,List,Welcome,Switch,parse;return{setters:[],execute:function(){_get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),TYPE={INFO:"info",RADIO:"radio",LIST:"list",SWITCH:"switch",TEXT:"text",MASKED:"masked",EXPIRATION_DATE:"expiryDate",DATE:"date",WELCOME:"welcome"},KEYBOARD={QWERTY:"qwerty",NUMERIC:"numeric",EMAIL:"email"},LAYOUT={INFO:"info",RADIO:"radio",LIST:"list",SWITCH:"switch",TEXT:"text",WELCOME:"welcome"},FEATURE={CARD:"card"},Widget=function(){function Widget(){_classCallCheck(this,Widget),this._features=[]}return _createClass(Widget,[{key:"fromSaved",value:function(v){return v||""}},{key:"toDisplay",value:function(){return null}},{key:"toServer",value:function(v){return v||""}},{key:"keyboard",get:function(){return this._keyboard||null}},{key:"mask",get:function(){return this._mask?{inner:this._mask.replace(/[dwDMy\*]/g,"*"),shown:this.showMask?this._mask.replace(/[dw\*]/g,"X").replace(/DD/g,"ДД").replace(/MM/g,"ММ").replace(/yy/g,"ГГ"):this._mask.replace(/[dwDMy\*]/g,"•"),real:this._mask}:null}},{key:"layout",get:function(){return null}},{key:"features",get:function(){return this._features||[]}}]),Widget}(),Info=function(_Widget){function Info(){return _classCallCheck(this,Info),_possibleConstructorReturn(this,Object.getPrototypeOf(Info).apply(this,arguments))}return _inherits(Info,_Widget),_createClass(Info,[{key:"toDisplay",value:function(v){return v||""}},{key:"layout",get:function(){return LAYOUT.INFO}}]),Info}(Widget),Text=function(_Widget2){function Text(_ref){var keyboard=_ref.keyboard,autocomplete=_ref.autocomplete,stripStaticSymbols=_ref.stripStaticSymbols,_ref$mask=_ref.mask,mask=void 0===_ref$mask?"":_ref$mask,feature=_ref.feature;_classCallCheck(this,Text);var _this2=_possibleConstructorReturn(this,Object.getPrototypeOf(Text).call(this));return _this2._keyboard=Object.values(KEYBOARD).some(function(v){return v===keyboard})?keyboard:KEYBOARD.QWERTY,_this2._mask=mask.replace(/\?/g,""),autocomplete&&(_this2.autocomplete=autocomplete),_this2.showMask=_this2._mask&&_this2._mask.length===mask.length,_this2.stripStatic=stripStaticSymbols,_this2._features.push(feature),_this2}return _inherits(Text,_Widget2),_createClass(Text,[{key:"fromSaved",value:function(v){return this._mask&&!this.stripStatic?qiwi.utils.demask(_get(Object.getPrototypeOf(Text.prototype),"fromSaved",this).call(this,v),this.mask.inner):_get(Object.getPrototypeOf(Text.prototype),"fromSaved",this).call(this,v)}},{key:"toDisplay",value:function(v){return this._mask?qiwi.utils.mask(_get(Object.getPrototypeOf(Text.prototype),"toServer",this).call(this,v),this.mask.inner):_get(Object.getPrototypeOf(Text.prototype),"toServer",this).call(this,v)}},{key:"toServer",value:function(v){return this._mask&&!this.stripStatic?qiwi.utils.mask(_get(Object.getPrototypeOf(Text.prototype),"toServer",this).call(this,v),this.mask.inner):_get(Object.getPrototypeOf(Text.prototype),"toServer",this).call(this,v)}},{key:"layout",get:function(){return LAYOUT.TEXT}}]),Text}(Widget),Date=function(_Text){function Date(config){return _classCallCheck(this,Date),_possibleConstructorReturn(this,Object.getPrototypeOf(Date).call(this,qiwi.utils.defaults(config,{mask:config.format.replace(/d/g,"D")||"DD.MM.yyyy",keyboard:KEYBOARD.NUMERIC})))}return _inherits(Date,_Text),Date}(Text),ExpirationDate=function(_Date){function ExpirationDate(config){return _classCallCheck(this,ExpirationDate),_possibleConstructorReturn(this,Object.getPrototypeOf(ExpirationDate).call(this,Object.assign({},config,{format:"MM/yy"})))}return _inherits(ExpirationDate,_Date),_createClass(ExpirationDate,[{key:"toServer",value:function(){var v=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return _get(Object.getPrototypeOf(ExpirationDate.prototype),"toServer",this).call(this,v).replace(/\//g,"")}},{key:"fromSaved",value:function(){var v=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return v=this.toServer(v),v.slice(0,2)+"/"+v.slice(2)}},{key:"toDisplay",value:function(v){return this.fromSaved(v)}}]),ExpirationDate}(Date),Choices=function(_Widget3){function Choices(config){_classCallCheck(this,Choices);var _this5=_possibleConstructorReturn(this,Object.getPrototypeOf(Choices).call(this));return _this5.choices=config.choices,_this5}return _inherits(Choices,_Widget3),_createClass(Choices,[{key:"layout",get:function(){return LAYOUT.RADIO}}]),Choices}(Widget),List=function(_Choices){function List(){return _classCallCheck(this,List),_possibleConstructorReturn(this,Object.getPrototypeOf(List).apply(this,arguments))}return _inherits(List,_Choices),_createClass(List,[{key:"toDisplay",value:function(v){var choice=this.choices.find(function(choice){return v===choice.value});return choice?choice.title||choice.value:""}},{key:"layout",get:function(){return LAYOUT.LIST}}]),List}(Choices),Welcome=function(_Choices2){function Welcome(){return _classCallCheck(this,Welcome),_possibleConstructorReturn(this,Object.getPrototypeOf(Welcome).apply(this,arguments))}return _inherits(Welcome,_Choices2),_createClass(Welcome,[{key:"layout",get:function(){return LAYOUT.WELCOME}}]),Welcome}(Choices),Switch=function(_Widget4){function Switch(_ref2){var onValue=_ref2.onValue,offValue=_ref2.offValue;_classCallCheck(this,Switch);var _this8=_possibleConstructorReturn(this,Object.getPrototypeOf(Switch).call(this));return _this8.onValue=onValue||!0,_this8.offValue=offValue||!1,_this8}return _inherits(Switch,_Widget4),_createClass(Switch,[{key:"toggle",value:function(value){return value===this.offValue?this.onValue:this.offValue}},{key:"layout",get:function(){return LAYOUT.SWITCH}}]),Switch}(Widget),parse=function(config){switch(config.type){case TYPE.INFO:return new Info(config);case TYPE.RADIO:if(!config.expansion)return new Choices(config);case TYPE.LIST:return new List(config);case TYPE.WELCOME:return new Welcome(config);case TYPE.SWITCH:return new Switch(config);case TYPE.TEXT:case TYPE.MASKED:return new Text(config);case TYPE.EXPIRATION_DATE:return new ExpirationDate(config);case TYPE.DATE:return new Date(config);default:throw new Error("Некорректный тип виджета: "+config.type)}},parse.LAYOUT=LAYOUT,parse.TYPE=TYPE,parse.KEYBOARD=KEYBOARD,parse.FEATURE=FEATURE,_export("default",parse)}}});