<template>
    <Page>
        <ActionBar title="MyCalculator" android:flat="false"/>
        <TabView android:tabBackgroundColor="#53ba82"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff" androidTabsPosition="bottom"
                 @selectedIndexChange="indexChange"
                 >
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
                        <button @tap="allDeleteDB()" text="모두 삭제" class="listBtn" ></button>
                        <ListView class="list-group" for="modifier in modifiersArr" style="height:2000px" @itemTap="onItemTap" >
                            <v-template>
                                <FlexboxLayout flexDirection="row" class="list-group-item">
                                    <Label :text="modifier" class="list-group-item-heading" style="width: 100%" />
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
  const appSettings = require("application-settings")

  const DetailHistoryPage = {
        data(){
          return{
            memo : ""
          }
        },
        props: ["modifier","modifierKey","itemMemoData"],
        methods: {
            onButtonTap() {
                this.$navigateBack();
            },
            onCopyTap(){
              const clipboard = require("nativescript-clipboard");   
              clipboard.setText(this.modifier).then(function() {
                  const Toast = require('nativescript-toast');
                  Toast.makeText('수식이 복사되었습니다.', 'long').show();
               })

            },
            onSaveMemo(msg){

              appSettings.setString("" , "");//초기화 코드
              let key = this.modifierKey+".memo"
              appSettings.setString(key , this.memo);//초기화 코드
              console.log("메모저장 key값"+key)
              console.log("메모 : "+this.memo)
              this.itemMemoData = this.memo
              this.displayToast('메모가 '+msg+'되었습니다.')

            },
            displayToast(msg){
              const Toast = require('nativescript-toast');
              Toast.makeText(msg, 'long').show();

            }
            
        },
        template: `
            <Page>
                <ActionBar title="MyCalculator" android:flat="false" backgroundColor="#43b883" style="color:#ffffff;"/>
                <StackLayout> 
                   수식 : <Label :text = "modifier"/>
                   메모 : <Label :text = "itemMemoData"/>
                   <TextField hint="메모를 입력하세요." v-model="memo"/>
                    <button text="수식복사"  @tap="onCopyTap" class="listBtn"/> 
                    <button v-if="itemMemoData != null" text="메모수정"  @tap="onSaveMemo('수정')" class="listBtn"/> 
                    <button v-else text="메모저장" @tap="onSaveMemo('저장')" class="listBtn"/> 
                    <button text="뒤로가기"  @tap="onButtonTap" class="listBtn"/>
                </StackLayout>
                  <StackLayout class="home-panel">
                    <Label text = " 수식" height="20" backgroundColor="#3c495e" style="color: #ffffff;"/>
                    <Label :text = "modifier" height="50" backgroundColor="#D8D8D8"/>
                    <Label text = " 메모" height="20" backgroundColor="#3c495e" style="color: #ffffff;"/>
                    <Label :text = "itemMemoData" height="70" backgroundColor="#D8D8D8"/>
                    <TextField hint="메모를 입력하세요." v-model="memo" height="50"/>
                    <button v-if="itemMemoData != null" text="메모수정"  @tap="onSaveMemo('수정')" backgroundColor="#2E2E2E" style="color: #ffffff;"/> 
                    <button v-else text="메모저장" @tap="onSaveMemo('저장')" backgroundColor="#2E2E2E" style="color: #ffffff;"/> 
                    <button text="수식복사"  @tap="onCopyTap" backgroundColor="#2E2E2E" style="color: #ffffff;"/> 
                    <button text="뒤로가기"  @tap="onButtonTap" backgroundColor="#2E2E2E" style="color: #ffffff;"/>
                </WrapLayout>
            </Page>`
    };

  export default {
    data() {
      return {
        num: "",
        tempNum:"",
        operator : "",
        evalResStr : "",
        numOperArray : [],
        isCalComplete : 0,
        modifiersArr : [],
        isSaveData : Boolean
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
        else if(data == '+/-'){
          this.num = this.num * -1
        }
        else if(data == '%'){ 
          this.num = this.num / 100;
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
        var dialogs = require("tns-core-modules/ui/dialogs")
        dialogs.alert(data).then(function() {
            console.log("Dialog closed!")
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
          console.log(key)
          appSettings.setString(key , data);
          
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
        
        try{
          appSettings.setString("" , "");//초기화 코드

          this.modifiersArr = []
          for(let i=1; i < appSettings.getAllKeys().length; i++){
            let keyName = appSettings.getAllKeys()[i]
            console.log(keyName+':'+appSettings.getString(keyName))
            var chkName = ""
            chkName = keyName
            if(chkName.includes(".") == false){
              this.modifiersArr.push(appSettings.getString(keyName))
            }
          }
           this.modifiersArr =  this.modifiersArr.reverse()

        }catch{
          console.log('초기화 못함')
        }
      
      },
      makeDbKey(){
        var d = new Date();
        appSettings.setString("" , "");//초기화 코드
        var result = appSettings.getAllKeys().length
        console.log('makeDbKey'+result)
        return JSON.stringify(result)
      },
      allDeleteDB(){
        appSettings.clear()
        this.modifiersArr = []
      },
      indexChange: function(args) {
        if(args.value == 1){
          this.getModifers()
        }
      },
      onItemTap(event) {

          appSettings.setString("" , "");//초기화 코드

          let itemKey = ""
          for(let i=1; i < appSettings.getAllKeys().length; i++){
            let keyName = appSettings.getAllKeys()[i]
            if(appSettings.getString(keyName) == event.item)
            itemKey = keyName
          }

          appSettings.setString("" , "");//초기화 코드
          let memoKey = itemKey+'.memo'
          let itemMemo = ""
          itemMemo = appSettings.getString(memoKey)
          console.log("불러온 메모 데이터: "+itemMemo)

          console.log('test.index :'+event.index)
          this.$navigateTo(DetailHistoryPage, {
                props: {
                    modifierKey : itemKey,
                    modifier: event.item,
                    itemMemoData : itemMemo
                }
            }
          );


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

    .my-button {
      background-color: #68e6a1;
      border-radius: 5;
      color: white;
      font-family: FontAwesome;
      font-size: 19;
      vertical-align: middle;
      width: 100%;
    }

    .my-button:active {
      background-color: lightslategray;
      color:white;
    }

    .listBtn{
      background-color: #53ba82; /* Green */
      border: none;
      color: white;
      padding: 8px 2px;
      text-align: center;
      text-decoration: none;
      /* display: inline-block; */
      font-size: 13px;
    }


</style>
