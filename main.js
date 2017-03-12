//Main js

var Validator={

launchFormValidation : function(form) {
    form.children("input").each(function() {
        var input = $(this);
        if (input.attr("required")) {
            Validator.observeOne(input, form)
        }
        if (input.attr("type") == "submit") {
            Validator.setformvalidation(input, form)
        }
    })
},
setformvalidation : function(input, form) {
    input.on("click", function(e) {
        if (!Validator.validateAll(form)) {
            e.preventDefault();
        }
    })
},
fomrIfAllValid : function(form){
  if(form.children(".invalid").length==0){
   form.removeClass("invalid")
  }
},
validateAll : function(form) {
    var temp = true;
    form.children(".observed").each(function() {
        if (!Validator.validateOne($(this), form)) {
            temp = false;
        }
    })

    //If all checked ok:
    if (temp) {
        form.removeClass("invalid");
        form.addClass("valid")
        return true;
    }else{
     form.addClass("invalid");
        form.removeClass("valid")
    return false
    }
},
observeOne : function(input, form) {
    input.addClass("observed")
    $(input).on("change", function() {

        Validator.validateOne($(this), form);
    })

},
validateOne : function(input, form) {

    //Validation required
    if (!input.val()) {

        input.addClass("invalid-required")
        form.addClass("invalid")
        if(input.data("vd-invalid-message")){
            input.after("<div class='error-required error'>"+input.data("vd-invalid-message")+"</div>")
        }else if(form.data("vd-invalid-message")&&input.data("vd-invalid-message")!="none"){
            input.after("<div class='error-required error'>"+form.data("vd-invalid-message")+"</div>")
        }
        
        return false
    }else{
         input.removeClass("invalid-required")
    }

    //Validation Pattern
    if(input.data("pattern")){
    }
    $(input).next(".error").remove()
    //If valid check if any other is invalid or remove form class
    Validator.fomrIfAllValid(form) 
    return true
}
}
formaction=function(){
    console.log("fdfddf")
}

(function() {
    $("form").each(function() {
    var element = $(this);
      if (element.data("validator")) {
          Validator.launchFormValidation(element)
      }
    })
}());
