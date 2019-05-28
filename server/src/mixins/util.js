export default{
   methods:{
       isNumber(val){
           let pattern = /^[-]?([1-9]\d*|0)(\.\d+)?$/;
           return pattern.test(val);
       },

       isSpecialCharas(val){
           let pattern = /([。.,?？*+=~^"#%&¥]+)/;
           return pattern.test(val);
       },

       isHiragana(val,num){
           let pattern = /^[ぁ-んー　]*$/;
           return (pattern.test(val) && val.length<3);
       }

   }
}
