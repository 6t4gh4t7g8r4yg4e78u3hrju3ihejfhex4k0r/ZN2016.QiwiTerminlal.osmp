"use strict";System.register(["handlers/xml/baseXml","constants/errorCodes","constants/currency","constants/paymentStatusCodes"],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var BaseXml,ErrorCodes,Currency,PaymentStatusCodes,_createClass,_get,History;return{setters:[function(_handlersXmlBaseXml){BaseXml=_handlersXmlBaseXml["default"]},function(_constantsErrorCodes){ErrorCodes=_constantsErrorCodes["default"]},function(_constantsCurrency){Currency=_constantsCurrency["default"]},function(_constantsPaymentStatusCodes){PaymentStatusCodes=_constantsPaymentStatusCodes["default"]}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},History=function(_BaseXml){function History(){return _classCallCheck(this,History),_possibleConstructorReturn(this,Object.getPrototypeOf(History).apply(this,arguments))}return _inherits(History,_BaseXml),_createClass(History,[{key:"parse",value:function(xml){_get(Object.getPrototypeOf(History.prototype),"parse",this).call(this,xml);var payments=this.filterData("/response/p-list/p"),actual=payments.iterateNext();for(this.result.payments=[];actual;)this.result.payments.push({operationType:"-"==actual.attributes.d.textContent?"outcome":"income",name:actual.attributes.p.textContent,date:actual.attributes.t.textContent,status:actual.attributes.st.textContent<60?"waiting":actual.attributes.st.textContent>=60&&actual.attributes.st.textContent<100?"ok":"error",statusCode:actual.attributes.st.textContent,errorCode:actual.attributes.e.textContent,account:actual.attributes.a.textContent,result:this.getPaymentStatus({error:actual.attributes.e.textContent,status:actual.attributes.st.textContent}),summ:{value:Number(actual.attributes.s.textContent),currency:Currency.getCurrency(actual.attributes.from_c.textContent)},operation:this.getOperationSumm(actual.attributes.d.textContent,0==actual.attributes.e.textContent,actual.attributes.to_c.textContent,actual.attributes.from_c.textContent,Number(actual.attributes.s.textContent),Number(actual.attributes.rs.textContent))}),actual=payments.iterateNext();return this.result}},{key:"getOperationSumm",value:function(direction,success,currencyTo,currencyFrom,summ,summWithCommiss){return currencyFrom==currencyTo&&success&&summWithCommiss-summ>0&&"-"==direction?{sum:{value:summWithCommiss,currency:Currency.getCurrency(currencyFrom)},commiss:{value:summWithCommiss-summ,currency:Currency.getCurrency(currencyFrom)}}:{sum:{value:summWithCommiss,currency:Currency.getCurrency(currencyFrom)}}}},{key:"getPaymentStatus",value:function(_ref){var error=_ref.error,status=_ref.status;return 0==error?PaymentStatusCodes.getStatus(status):ErrorCodes.getError(error)}}]),History}(BaseXml),_export("default",new History)}}});