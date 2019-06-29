import React, { Component } from "react";
import dateFns from "date-fns";
import "./calendar.css";

class Calendar extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentMonth: new Date(),
      today: new Date(),
      modalVisible:"",
      formInputs:{},
      submissions:{}
    };
  }
  renderHeader() {
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, "MMMM YYYY")}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {

    let days = [];
    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), "dddd")}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { today, currentMonth } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    let rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, "D");
        const cloneDay = day;
        days.push(
            <div
              className={`col cell ${
                !dateFns.isSameMonth(day, monthStart)
                  ? "disabled"
                  : dateFns.isSameDay(day, today) ? "selected" : ""
              }`}
              key={day}
              onDoubleClick = {() => this.dateDoubleClickHandler(dateFns.parse(cloneDay))}
            >
            
              <span className="number">{formattedDate}</span>
              <span className="bg">{formattedDate}</span>
              <span style={{position:"absolute", top:0, left:0, bottom:0, right:0, padding:15}}>
              {
                this.state.submissions[day] !== undefined &&
                this.state.submissions[day].length !== 0 ?
                this.state.submissions[day].length !== 1 ?
                  <div>
                    <span style={{overflow:"hidden", display:"block", height:20, width:"100%", padding:2}}>
                      <button className="button" onClick={() => this.dateSubmissionItemSelectedHandler("single", dateFns.parse(cloneDay), 0)} 
                      style={{overflow:"hidden", backgroundColor:"rgba(0,0,0,.25)", height:"100%"}}>
                          <span style={{display:"block", color:"#333333"}}>{this.state.submissions[day][0].title}</span>
                      </button>
                    </span>
                    <span style={{overflow:"hidden", display:"block", height:20, width:"100%", padding:2}}>
                      <button className="button" onClick={() => this.dateSubmissionItemSelectedHandler("group", dateFns.parse(cloneDay), 0)} 
                      style={{overflow:"hidden", backgroundColor:"rgba(0,0,0,.25)", height:"100%"}}>
                          <span style={{display:"block", color:"#333333"}}>+ {this.state.submissions[day].length-1} more</span>
                      </button>
                    </span> 
                  </div>
                  :
                  <span style={{overflow:"hidden", display:"block", height:20, width:"100%", padding:2}}>
                    <button className="button" onClick={() => this.dateSubmissionItemSelectedHandler("single", dateFns.parse(cloneDay), 0)} 
                    style={{overflow:"hidden", backgroundColor:"rgba(0,0,0,.25)", height:"100%"}}>
                        <span style={{display:"block", color:"#333333"}}>{this.state.submissions[day][0].title}</span>
                    </button>
                  </span>
                  : null
              }
              </span>
            </div> 
            
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };
  
  dateDoubleClickHandler = date => {
    this.setState({
      ...this.state,
      selectedDate:date,
      modalVisible:"modalId1"
    })
  };

  inputChangeHandler = (key, value) => {
    let formInputs = this.state.formInputs
    formInputs[key] = value
    this.setState({
      ...this.state,
      formInputs:formInputs
    })
  };

  inputFieldSelectedHandler = (event, id) => {
    // we use this method to set the id of the selected input field. 
    // we also use this method to remove all field errors when the
    // user selects any input field following a failed validation.

    this.setState({
      ...this.state,
      inputFieldSelectedId:id,
      inputFieldError:""
    })
  };

  formSubmittedHandler = event => {
    event.preventDefault()

    if(this.state.formInputs.title !== undefined &&
    this.state.formInputs.title !== "" ){
      //reset input values if pass validation
      event.target.reset()
      let submissions = this.state.submissions
      if(submissions[this.state.selectedDate] !== undefined){
        submissions[this.state.selectedDate] = submissions[this.state.selectedDate]
            .concat(this.state.formInputs)
        this.setState({
          ...this.state,
          submissions:submissions
        }, () => this.setState({
          ...this.state,
          inputFieldSelectedId:"",
          formInputs:{},
          modalVisible:""}))
      }else{
        submissions[this.state.selectedDate] = [this.state.formInputs]
        this.setState({
          ...this.state,
          submissions:submissions
        }, () => this.setState({
          ...this.state,
          inputFieldSelectedId:"",
          formInputs:{},
          modalVisible:""}))
      }
    }else{
      this.setState({
        ...this.state,
        inputFieldSelectedId:"",
        inputFieldError:"inputId1"
      })
    }
  };

  clearAllFormFields = () => {
    document.getElementById("formId1").reset()
    this.setState({
      ...this.state,
      inputFieldSelectedId:"",
      inputFieldError:"",
      formInputs:{}
    })
  };
  
  dateSubmissionItemSelectedHandler = (type, date, id) => {

    this.setState({
      ...this.state,
      selectedDate:date,
      selectedSubmissionByDate:id
    }, () => {
      let interactiveModal = this.state.interactiveModal
      let modalVisible = this.state.modalVisible
      if(type ==="single"){
        if(modalVisible==="modalId3"){
           /*=======================================================
            --------------------------------------------------------
            IMPORTANT 
            --------------------------------------------------------
            modalVisible becomes modalId2, but we still need to show 
            modalId3 in the background. We use interactiveModal as a 
            dependency for modalId3 visibility when modalVisibility 
            is set to modalId2. We also use interactiveModal to signal
            when to animate/offset the desired modal relative to the 
            background modal.
            ========================================================*/
            interactiveModal = "modalId2"
        }
        //detail modal
        modalVisible = "modalId2"
      }else{
        //list modal
        modalVisible = "modalId3"
      }
      
      interactiveModal = interactiveModal !== undefined && 
      interactiveModal !== "" ? interactiveModal : ""
      this.setState({
        ...this.state,
        interactiveModal:interactiveModal,
        modalVisible:modalVisible
      })
    })
  };
  /*--------------------------------------
  ::modalId1: form modal
  ::modalId2: detail modal
  ::modalId3: list modal
  ---------------------------------------*/
  actionButtonSelectedHandler = action => {

    let modalVisible = this.state.modalVisible
    let interactiveModal = this.state.interactiveModal

    if(action ==="delete"){
      let submissions = this.state.submissions

      if(modalVisible === "modalId2" ){
        submissions[this.state.selectedDate].splice(this.state.selectedSubmissionByDate,1)
        this.setState({
          ...this.state,
          submissions:submissions
        }, () => {
          interactiveModal === "modalId2" ? 
            this.setState({modalVisible:"modalId3"})
          :this.setState({modalVisible:""})
        })
      } 
    }

    if(action === "close"){
      modalVisible === "modalId1" ?
      Promise.resolve(this.clearAllFormFields())
      .then(() => this.setState({...this.state, modalVisible:""}))
      :
      modalVisible === "modalId3" ? 
      this.setState({...this.state, interactiveModal:"", modalVisible:""})
      :

      /*=============================================================
      this is most likely the foreground modal. modals that interact
      with one another ie modalId2 and modalId3 in this case, the 
      dependency for visibility of the background modal exists only 
      when `interactiveModal` state is set to its corresponding 
      foreground modal. Otherwise any modal is visible when the
      `modalVisible` state is set to the modal's id. 

      When removing a modal, we check if its id is set in the `modalVisible`
      state. Setting the visibility state to an id other than the current
      modal will remove it. This is ideal here also, because the background
      modal being set as the current modal will be represented in the state
      which we use to determine which modal to remove when handling the close 
      modal process in this method.
      ==============================================================*/
      modalVisible === "modalId2" ? 
        interactiveModal === "modalId2" ? 
          this.setState({modalVisible:"modalId3"})
        :this.setState({modalVisible:""})
      :this.setState({modalVisible:""})
      }

  };

  render() {
    return (
      <div>
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
        <span className="modal-container" style={{display:this.state.modalVisible === "modalId1" ? "flex" : "none"}}>
          <span className="modal">
            <span className="icon action" onClick={() => this.actionButtonSelectedHandler("close")}
            style={{position:"absolute", top:15, right:10, fontSize:22}}>
              clear
            </span>
            <form id="formId1" autocomplete="off" onSubmit={event => this.formSubmittedHandler(event)} style={{width:"100%", height:"100%", borderRadius:10, 
            paddingHorizontal:20}}>
              <div style={{paddingBottom:30, width:"100%", height:"100%", borderRadius:10}}>
                <input maxlength="60" type="text" placeholder="Add title" className={`input ${this.state.inputFieldError !==undefined && 
                  this.state.inputFieldError === "inputId1" && "error"}`} 
                  onClick={event => this.inputFieldSelectedHandler(event, "inputId1")}
                  name="title" onChange={event => this.inputChangeHandler(event.target.name, event.target.value)}
                  style={{borderColor:this.state.inputFieldSelectedId !== undefined && 
                  this.state.inputFieldSelectedId=== "inputId1" && "blue"}}/>

                <span style={{display:"block", width:"100%", height:"100%", paddingTop:10}}>
                  <label style={{width:"100%", height:20}} htmlFor="inputId2">Todo</label>
                  <span style={{display:"block", width:"100%", height:70}}>
                    <textarea id="inputId2" className="textarea" name="todo" 
                    onClick={event => this.inputFieldSelectedHandler(event, "inputId2")}
                    onChange={event => this.inputChangeHandler(event.target.name, event.target.value)}/>
                  </span>
                </span>
              </div>
              <button className="submit-button"><span>Save</span></button>
            </form>
          </span>
        </span>

        <span className="modal-container" style={{display:this.state.modalVisible === "modalId2" ? "flex" : "none"}}>
          <span className={this.state.interactiveModal !== undefined 
            && this.state.interactiveModal ==="modalId2" ? "-modal -interactive":"modal"}>
            <span style={{position:"absolute", top:15, right:10}}>
              <span className="icon action" onClick={() => this.actionButtonSelectedHandler("delete")}
              style={{fontSize:20, marginRight:5}}>
                delete_outline
              </span>
              <span className="icon action" onClick={() => this.actionButtonSelectedHandler("close")}
              style={{fontSize:22}}>
                clear
              </span>
            </span>
            
            <div style={{width:"100%", height:"100%", borderRadius:10, paddingHorizontal:20}}>
              <div style={{width:"100%", height:"100%", borderRadius:10}}>
                <h3>{this.state.selectedSubmissionByDate !== undefined &&
                  this.state.submissions[this.state.selectedDate] !== undefined &&
                  this.state.submissions[this.state.selectedDate][this.state.selectedSubmissionByDate] !== undefined &&
                  this.state.submissions[this.state.selectedDate][this.state.selectedSubmissionByDate].title}</h3>
                  <span class="-scrollY -sm">
                  <p class="-sm">{this.state.selectedSubmissionByDate !== undefined &&
                  this.state.submissions[this.state.selectedDate] !== undefined &&
                  this.state.submissions[this.state.selectedDate][this.state.selectedSubmissionByDate] !== undefined &&
                  this.state.submissions[this.state.selectedDate][this.state.selectedSubmissionByDate].todo}</p>
                  </span>
              </div>
            </div>
          </span>
        </span>

        <span className="modal-container" style={{display:this.state.modalVisible === "modalId3" || 
        this.state.interactiveModal !== undefined && this.state.interactiveModal ==="modalId2" ? "flex" : "none"}}>
          <span class="-modal -flexable">
            <span style={{position:"absolute", top:15, right:10}}>
              <span className="icon action" onClick={() => this.actionButtonSelectedHandler("close")}
              style={{fontSize:22}}>
                clear
              </span>
            </span>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", 
            borderRadius:10, paddingHorizontal:20}}>
            {
              this.state.submissions[this.state.selectedDate] !== undefined 
              && this.state.submissions[this.state.selectedDate].length !== 0 ?
                this.state.submissions[this.state.selectedDate].map((item, index) => 
                  <span key={index} style={{display:"block", height:24, width:160, padding:2}}>
                    <span style={{overflow:"hidden", display:"block", height:"100%", width:"100%"}}>
                      <button className="button" 
                      onClick={() => this.dateSubmissionItemSelectedHandler("single", this.state.selectedDate, index)} 
                      style={{overflow:"hidden", backgroundColor:"rgba(0,0,0,.25)", height:"100%"}}>
                          <span style={{display:"block", color:"#333333"}}>{item.title}</span>
                      </button>
                    </span>
                  </span>
                )
              :
                <span style={{textAlign:"center", display:"block", height:"100%", width:"100%"}}>
                  <p class="-sm">There are no todos on this date</p>
                </span>
            }
            </div>
          </span>
        </span>

      </div>
    );
  }
}

export default Calendar;