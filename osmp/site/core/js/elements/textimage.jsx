"use strict";System.register([],function(_export,_context){return{setters:[],execute:function(){_export("default",React.createClass({propTypes:{img:React.PropTypes.string,text:React.PropTypes.string,isRight:React.PropTypes.bool,margin:React.PropTypes.string},getDefaultProps:function(){return{img:"",text:"",isRight:!1,margin:"0",className:"",style:{}}},render:function(){return React.createElement("div",{className:"text-n-image "+this.props.className,style:this.props.style},[React.createElement("div",{className:"image",key:"image"},React.createElement("img",{src:this.props.img,style:{marginRight:this.props.margin||20}})),React.createElement("div",{className:"text",key:"text"},this.props.text)][this.props.isRight?"reverse":"concat"]())}}))}}});