(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{175:function(e,t,a){},176:function(e,t,a){},177:function(e,t,a){"use strict";a.r(t);var s=a(1),n=a.n(s),l=a(66),i=a.n(l),o=a(15),r=a(16),d=a(18),c=a(17),m=a(19),u=a(3),h=a(2),p=a.n(h),b=(a(175),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(d.a)(this,Object(c.a)(t).call(this,e))).nextMonth=function(){a.setState({currentMonth:p.a.addMonths(a.state.currentMonth,1)})},a.prevMonth=function(){a.setState({currentMonth:p.a.subMonths(a.state.currentMonth,1)})},a.dateDoubleClickHandler=function(e){a.setState(Object(u.a)({},a.state,{selectedDate:e,modalVisible:"modalId1"}))},a.inputChangeHandler=function(e,t){var s=a.state.formInputs;s[e]=t,a.setState(Object(u.a)({},a.state,{formInputs:s}))},a.inputFieldSelectedHandler=function(e,t){a.setState(Object(u.a)({},a.state,{inputFieldSelectedId:t,inputFieldError:""}))},a.formSubmittedHandler=function(e){if(e.preventDefault(),void 0!==a.state.formInputs.title&&""!==a.state.formInputs.title){e.target.reset();var t=a.state.submissions;void 0!==t[a.state.selectedDate]?(t[a.state.selectedDate]=t[a.state.selectedDate].concat(a.state.formInputs),a.setState(Object(u.a)({},a.state,{submissions:t}),function(){return a.setState(Object(u.a)({},a.state,{inputFieldSelectedId:"",formInputs:{},modalVisible:""}))})):(t[a.state.selectedDate]=[a.state.formInputs],a.setState(Object(u.a)({},a.state,{submissions:t}),function(){return a.setState(Object(u.a)({},a.state,{inputFieldSelectedId:"",formInputs:{},modalVisible:""}))}))}else a.setState(Object(u.a)({},a.state,{inputFieldSelectedId:"",inputFieldError:"inputId1"}))},a.clearAllFormFields=function(){document.getElementById("formId1").reset(),a.setState(Object(u.a)({},a.state,{inputFieldSelectedId:"",inputFieldError:"",formInputs:{}}))},a.dateSubmissionItemSelectedHandler=function(e,t,s){a.setState(Object(u.a)({},a.state,{selectedDate:t,selectedSubmissionByDate:s}),function(){var t=a.state.interactiveModal,s=a.state.modalVisible;"single"===e?("modalId3"===s&&(t="modalId2"),s="modalId2"):s="modalId3",t=void 0!==t&&""!==t?t:"",a.setState(Object(u.a)({},a.state,{interactiveModal:t,modalVisible:s}))})},a.actionButtonSelectedHandler=function(e){var t=a.state.modalVisible,s=a.state.interactiveModal;if("delete"===e){var n=a.state.submissions;"modalId2"===t&&(n[a.state.selectedDate].splice(a.state.selectedSubmissionByDate,1),a.setState(Object(u.a)({},a.state,{submissions:n}),function(){"modalId2"===s?a.setState({modalVisible:"modalId3"}):a.setState({modalVisible:""})}))}"close"===e&&("modalId1"===t?Promise.resolve(a.clearAllFormFields()).then(function(){return a.setState(Object(u.a)({},a.state,{modalVisible:""}))}):"modalId3"===t?a.setState(Object(u.a)({},a.state,{interactiveModal:"",modalVisible:""})):"modalId2"===t&&"modalId2"===s?a.setState({modalVisible:"modalId3"}):a.setState({modalVisible:""}))},a.state={currentMonth:new Date,today:new Date,modalVisible:"",formInputs:{},submissions:{}},a}return Object(m.a)(t,e),Object(r.a)(t,[{key:"renderHeader",value:function(){return n.a.createElement("div",{className:"header row flex-middle"},n.a.createElement("div",{className:"col col-start"},n.a.createElement("div",{className:"icon",onClick:this.prevMonth},"chevron_left")),n.a.createElement("div",{className:"col col-center"},n.a.createElement("span",null,p.a.format(this.state.currentMonth,"MMMM YYYY"))),n.a.createElement("div",{className:"col col-end",onClick:this.nextMonth},n.a.createElement("div",{className:"icon"},"chevron_right")))}},{key:"renderDays",value:function(){for(var e=[],t=p.a.startOfWeek(this.state.currentMonth),a=0;a<7;a++)e.push(n.a.createElement("div",{className:"col col-center",key:a},p.a.format(p.a.addDays(t,a),"dddd")));return n.a.createElement("div",{className:"days row"},e)}},{key:"renderCells",value:function(){for(var e=this,t=this.state,a=t.today,s=t.currentMonth,l=p.a.startOfMonth(s),i=p.a.endOfMonth(l),o=p.a.startOfWeek(l),r=p.a.endOfWeek(i),d=[],c=[],m=o,u="";m<=r;){for(var h=function(t){u=p.a.format(m,"D");var s=m;c.push(n.a.createElement("div",{className:"col cell ".concat(p.a.isSameMonth(m,l)?p.a.isSameDay(m,a)?"selected":"":"disabled"),key:m,onDoubleClick:function(){return e.dateDoubleClickHandler(p.a.parse(s))}},n.a.createElement("span",{className:"number"},u),n.a.createElement("span",{className:"bg"},u),n.a.createElement("span",{style:{position:"absolute",top:0,left:0,bottom:0,right:0,padding:15}},void 0!==e.state.submissions[m]&&0!==e.state.submissions[m].length?1!==e.state.submissions[m].length?n.a.createElement("div",null,n.a.createElement("span",{style:{overflow:"hidden",display:"block",height:20,width:"100%",padding:2}},n.a.createElement("button",{className:"button",onClick:function(){return e.dateSubmissionItemSelectedHandler("single",p.a.parse(s),0)},style:{overflow:"hidden",backgroundColor:"rgba(0,0,0,.25)",height:"100%"}},n.a.createElement("span",{style:{display:"block",color:"#333333"}},e.state.submissions[m][0].title))),n.a.createElement("span",{style:{overflow:"hidden",display:"block",height:20,width:"100%",padding:2}},n.a.createElement("button",{className:"button",onClick:function(){return e.dateSubmissionItemSelectedHandler("group",p.a.parse(s),0)},style:{overflow:"hidden",backgroundColor:"rgba(0,0,0,.25)",height:"100%"}},n.a.createElement("span",{style:{display:"block",color:"#333333"}},"+ ",e.state.submissions[m].length-1," more")))):n.a.createElement("span",{style:{overflow:"hidden",display:"block",height:20,width:"100%",padding:2}},n.a.createElement("button",{className:"button",onClick:function(){return e.dateSubmissionItemSelectedHandler("single",p.a.parse(s),0)},style:{overflow:"hidden",backgroundColor:"rgba(0,0,0,.25)",height:"100%"}},n.a.createElement("span",{style:{display:"block",color:"#333333"}},e.state.submissions[m][0].title))):null))),m=p.a.addDays(m,1)},b=0;b<7;b++)h();d.push(n.a.createElement("div",{className:"row",key:m},c)),c=[]}return n.a.createElement("div",{className:"body"},d)}},{key:"render",value:function(){var e=this;return n.a.createElement("div",null,n.a.createElement("div",{className:"calendar"},this.renderHeader(),this.renderDays(),this.renderCells()),n.a.createElement("span",{className:"modal-container",style:{display:"modalId1"===this.state.modalVisible?"flex":"none"}},n.a.createElement("span",{className:"modal"},n.a.createElement("span",{className:"icon action",onClick:function(){return e.actionButtonSelectedHandler("close")},style:{position:"absolute",top:15,right:10,fontSize:22}},"clear"),n.a.createElement("form",{id:"formId1",autocomplete:"off",onSubmit:function(t){return e.formSubmittedHandler(t)},style:{width:"100%",height:"100%",borderRadius:10,paddingHorizontal:20}},n.a.createElement("div",{style:{paddingBottom:30,width:"100%",height:"100%",borderRadius:10}},n.a.createElement("input",{maxlength:"60",type:"text",placeholder:"Add title",className:"input ".concat(void 0!==this.state.inputFieldError&&"inputId1"===this.state.inputFieldError&&"error"),onClick:function(t){return e.inputFieldSelectedHandler(t,"inputId1")},name:"title",onChange:function(t){return e.inputChangeHandler(t.target.name,t.target.value)},style:{borderColor:void 0!==this.state.inputFieldSelectedId&&"inputId1"===this.state.inputFieldSelectedId&&"blue"}}),n.a.createElement("span",{style:{display:"block",width:"100%",height:"100%",paddingTop:10}},n.a.createElement("label",{style:{width:"100%",height:20},htmlFor:"inputId2"},"Todo"),n.a.createElement("span",{style:{display:"block",width:"100%",height:70}},n.a.createElement("textarea",{id:"inputId2",className:"textarea",name:"todo",onClick:function(t){return e.inputFieldSelectedHandler(t,"inputId2")},onChange:function(t){return e.inputChangeHandler(t.target.name,t.target.value)}})))),n.a.createElement("button",{className:"submit-button"},n.a.createElement("span",null,"Save"))))),n.a.createElement("span",{className:"modal-container",style:{display:"modalId2"===this.state.modalVisible?"flex":"none"}},n.a.createElement("span",{className:void 0!==this.state.interactiveModal&&"modalId2"===this.state.interactiveModal?"-modal -interactive":"modal"},n.a.createElement("span",{style:{position:"absolute",top:15,right:10}},n.a.createElement("span",{className:"icon action",onClick:function(){return e.actionButtonSelectedHandler("delete")},style:{fontSize:20,marginRight:5}},"delete_outline"),n.a.createElement("span",{className:"icon action",onClick:function(){return e.actionButtonSelectedHandler("close")},style:{fontSize:22}},"clear")),n.a.createElement("div",{style:{width:"100%",height:"100%",borderRadius:10,paddingHorizontal:20}},n.a.createElement("div",{style:{width:"100%",height:"100%",borderRadius:10}},n.a.createElement("h3",null,void 0!==this.state.selectedSubmissionByDate&&void 0!==this.state.submissions[this.state.selectedDate]&&void 0!==this.state.submissions[this.state.selectedDate][this.state.selectedSubmissionByDate]&&this.state.submissions[this.state.selectedDate][this.state.selectedSubmissionByDate].title),n.a.createElement("span",{class:"-scrollY -sm"},n.a.createElement("p",{class:"-sm"},void 0!==this.state.selectedSubmissionByDate&&void 0!==this.state.submissions[this.state.selectedDate]&&void 0!==this.state.submissions[this.state.selectedDate][this.state.selectedSubmissionByDate]&&this.state.submissions[this.state.selectedDate][this.state.selectedSubmissionByDate].todo)))))),n.a.createElement("span",{className:"modal-container",style:{display:"modalId3"===this.state.modalVisible||void 0!==this.state.interactiveModal&&"modalId2"===this.state.interactiveModal?"flex":"none"}},n.a.createElement("span",{class:"-modal -flexable"},n.a.createElement("span",{style:{position:"absolute",top:15,right:10}},n.a.createElement("span",{className:"icon action",onClick:function(){return e.actionButtonSelectedHandler("close")},style:{fontSize:22}},"clear")),n.a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",borderRadius:10,paddingHorizontal:20}},void 0!==this.state.submissions[this.state.selectedDate]&&0!==this.state.submissions[this.state.selectedDate].length?this.state.submissions[this.state.selectedDate].map(function(t,a){return n.a.createElement("span",{key:a,style:{display:"block",height:24,width:160,padding:2}},n.a.createElement("span",{style:{overflow:"hidden",display:"block",height:"100%",width:"100%"}},n.a.createElement("button",{className:"button",onClick:function(){return e.dateSubmissionItemSelectedHandler("single",e.state.selectedDate,a)},style:{overflow:"hidden",backgroundColor:"rgba(0,0,0,.25)",height:"100%"}},n.a.createElement("span",{style:{display:"block",color:"#333333"}},t.title))))}):n.a.createElement("span",{style:{textAlign:"center",display:"block",height:"100%",width:"100%"}},n.a.createElement("p",{class:"-sm"},"There are no todos on this date"))))))}}]),t}(s.Component)),f=function(e){function t(){return Object(o.a)(this,t),Object(d.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement("header",null,n.a.createElement("div",{id:"logo"},n.a.createElement("span",{className:"icon"},"date_range"),n.a.createElement("span",null,"todo",n.a.createElement("b",null,"calendar")))),n.a.createElement("main",null,n.a.createElement(b,null)))}}]),t}(s.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(176);i.a.render(n.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},67:function(e,t,a){e.exports=a(177)}},[[67,1,2]]]);
//# sourceMappingURL=main.fef71a16.chunk.js.map