let output;

$(".ck-dropdown__panel").css("left","-130px");
$("#getCodeBtn").click(function(){
  output = new Convert();
  output.remove("p");
  output.convert("strong");
  output.convert("i");
  output.convert("u");
  output.convert("s");
  output.convertColor();
  $("#codeHere").html(output.getCode())

})

$("#copyBtn").click(function(){
if ($("#codeHere").val()) {
  /* Get the text field */
 var copyText = document.getElementById("codeHere");

 /* Select the text field */
 copyText.select();
 copyText.setSelectionRange(0, 99999); /*For mobile devices*/

 /* Copy the text inside the text field */
 document.execCommand("copy");

 /* Alert the copied text */
 alert("Copied! Now paste it on ML!");
}else {
    output = new Convert();
  if (output.data) {
    alert("Click Get Code!")
  }else {
    alert("Type and Edit something!")
  }
}
})
