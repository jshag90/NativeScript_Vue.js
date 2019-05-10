<template>
    <Page>
        <ActionBar title="MyCalculator" android:flat="true"/>
        <TabView android:tabBackgroundColor="#53ba82"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff" androidTabsPosition="bottom">
            <TabViewItem title="계산기">
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
            </TabViewItem>
            <TabViewItem title="기록" >
                <ScrollView>
                    <StackLayout class="home-panel">
                       <button @tap="getModifers()" text="불러오기"/>
                       <button @tap="allDeleteDB()" text="모두삭제"/>
                        <ListView class="list-group" for="modifer in modifiersArr" 
                            style="height:2000px">
                            <v-template>
                                <FlexboxLayout flexDirection="row" class="list-group-item">
                                    <Label :text="modifer" class="list-group-item-heading" style="width: 60%" />
                                </FlexboxLayout>
                            </v-template>
                        </ListView> 
                    </StackLayout>
                </ScrollView>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script >
  const appSettings = require("application-settings");

  export default {
    mounted() {
      // window.addEventListener('load', () => {
      //      this.getModifers()
      // })
    },
    data() {
      return {
        num: "",
        tempNum:"",
        operator : "",
        evalResStr : "",
        numOperArray : [],
        isCalComplete : 0,
        modifiersArr : []
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

          //수식 검증
          let chkLastItem = this.isNumber(this.numOperArray[this.numOperArray.length-1])
          let chkLastBeforeItem = this.isNumber(this.numOperArray[this.numOperArray.length-2])
          
          if(chkLastItem === false && chkLastBeforeItem === true){
              this.numOperArray.splice(-1,1)
              this.numOperArray.pop()
              chkLastItem = true
          }else if(chkLastItem === false && chkLastBeforeItem === false){
              this.numOperArray.splice(-1,1)
              this.numOperArray.pop()
              chkLastItem = true
          }

          let calModifer = ""
          for(let i=0; i<this.numOperArray.length; i++){
              calModifer += this.numOperArray[i]
          }
          console.log('calModifer : ' + calModifer)
          let evalRes = eval(calModifer)
          this.num = evalRes

          let data = calModifer+"="+evalRes
          let key = this.makeDbKey()
          appSettings.setString( key , data);
          console.log(appSettings.getAllKeys())
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
      },
      getModifers(){
        // this.modifers =  appSettings.getString("modifiers");
        this.modifiersArr = []
        for(let i=0; i < appSettings.getAllKeys().length ; i++){
          let keyName = appSettings.getAllKeys()[i]
          console.log(keyName)
          this.modifiersArr.push(appSettings.getString(keyName))
        }
      
      },
      makeDbKey(){
        var d = new Date();
        var result = d.getTime();
        console.log('makeDbKey'+result)
        return JSON.stringify(result)
      },
      allDeleteDB(){
        appSettings.clear()
        this.modifiersArr = []
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
        color: #ffffff;
    }
</style>
