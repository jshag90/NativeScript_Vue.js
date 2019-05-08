<template>
    <Page>
        <ActionBar title="My Calculator Prj"/>
        <GridLayout columns="*, *, *, *" rows="*, *, *, *, *, *, *" backgroundColor="#3c495e">
          <Label :text="operator" row="0" col="0"  backgroundColor="#ffffff"/>
          <Label :text="num" row="0" col="1" colSpan="4" backgroundColor="#ffffff" style="text-align:right;font-size:24px;"/>

          <Label :text="evalResStr" row="1" col="0" colSpan="6" backgroundColor="#ffffff" style="text-align:right;font-size:18px;"/>

          <button @tap="fn_calData('AC')" text="AC" row="2" col="0" backgroundColor="#D8D8D8"/>
          <button @tap="fn_calData('+/-')" text="+/-" row="2" col="1" backgroundColor="#D8D8D8"/>
          <button @tap="fn_calData('%')" text="%" row="2" col="2" backgroundColor="#D8D8D8"/>
          <button @tap="fn_calData('/')" text="÷" row="2" col="3" backgroundColor="#FF8000"/>

          <button @tap="fn_calData('7')" text="7" row="3" col="0" backgroundColor="#2E2E2E" class="numberBtn"/>
          <button @tap="fn_calData('8')" text="8" row="3" col="1" backgroundColor="#2E2E2E" class="numberBtn"/>
          <button @tap="fn_calData('9')" text="9" row="3" col="2" backgroundColor="#2E2E2E" class="numberBtn"/>
          <button @tap="fn_calData('*')" text="X" row="3" col="3" backgroundColor="#FF8000"/>

          <button @tap="fn_calData('4')" text="4" row="4" col="0" backgroundColor="#2E2E2E" class="numberBtn"/>
          <button @tap="fn_calData('5')" text="5" row="4" col="1" backgroundColor="#2E2E2E" class="numberBtn"/>
          <button @tap="fn_calData('6')" text="6" row="4" col="2" backgroundColor="#2E2E2E" class="numberBtn"/>
          <button @tap="fn_calData('-')" text="-" row="4" col="3" backgroundColor="#FF8000"/>

          <button @tap="fn_calData('1')" text="1" row="5" col="0" backgroundColor="#2E2E2E" class="numberBtn"/>
          <button @tap="fn_calData('2')" text="2" row="5" col="1" backgroundColor="#2E2E2E" class="numberBtn"/>
          <button @tap="fn_calData('3')" text="3" row="5" col="2" backgroundColor="#2E2E2E" class="numberBtn"/>
          <button @tap="fn_calData('+')" text="+" row="5" col="3" backgroundColor="#FF8000"/>

          <button @tap="fn_calData('0')" text="0" row="6" col="0" colSpan="2" backgroundColor="#2E2E2E" class="numberBtn"/>
          <button @tap="fn_calData('.')" text="." row="6" col="2" backgroundColor="#2E2E2E" class="numberBtn"/>
          <button @tap="fn_calData('=')" text="=" row="6" col="3" backgroundColor="#FF8000"/>
        </GridLayout>
    </Page>
</template>

<script >
  export default {
    data() {
      return {
        num: "",
        tempNum:"",
        operator : "",
        evalResStr : "",
        numOperArray : [],
        isCalComplete : 0
      }
    },
    methods:{
      fn_calData(data){

        if(data === 'AC'){
          this.excuteAllClear()
        }else if(data === '+'||data ==='-'||data ==='*'||data ==='/'){
          this.numOperArray.push(this.num)
          this.operator = data

          this.num = ""

          //연속으로 수식 들어 올 경우 처리
          let chkLastItem = this.isNumber(this.numOperArray[this.numOperArray.length-1])
          let chkData = this.isNumber(data)

          if(chkLastItem === false & chkData === false){
            this.numOperArray.splice(-1,1)
            this.numOperArray.pop()
            this.numOperArray.push(data)
          }else{
            this.numOperArray.push(data)
          }

          this.displayModifier()
        
        }
        else if(data === '='){

          this.evalModifier()
          this.displayModifier()
          this.isCalComplete = 1

        }
        else{

          if(this.isCalComplete === 1){
             this.excuteAllClear()
             this.isCalComplete = 0
          }

          this.num += data
          this.displayModifier()
          
        }

      },
      alertTest(data){
        var dialogs = require("tns-core-modules/ui/dialogs");
        dialogs.alert(data).then(function() {
            console.log("Dialog closed!");
        });
      },
      isNumber(s) {
        s += ''; // 문자열로 변환
        s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
        if (s == '' || isNaN(s)) return false;
        return true;
      },
      evalModifier(){

          this.numOperArray.push(this.num)
          this.num = ""

          let calModifer = ""
          for(let i=0; i<this.numOperArray.length; i++){
              calModifer += this.numOperArray[i]
          }
          console.log('calModifer : ' + calModifer)
          let evalRes = eval(calModifer)
          this.num = evalRes

      } ,
      displayModifier(){
        let calModifer = ""
          for(let i=0; i<this.numOperArray.length; i++){
              calModifer += this.numOperArray[i]
          }
        this.evalResStr = calModifer
      },
      excuteAllClear(){
        this.num = ""
        this.operator = ""
        this.numOperArray = []
        this.displayModifier()
      }

      

      
    }
  }

</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    .numberBtn{
        color:white;
    }
</style>
