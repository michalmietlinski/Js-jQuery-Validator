//Main js

var jQValidator = {
    patterns:{
        email:"^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$",
        password: "/^[a-z0-9_-]{6,18}$/",
        url: "/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/"

    },
    launchFormValidation: function(form) {
        form.children("input").each(function() {
            var input = $(this);
            if (input.attr("required")) {
                jQValidator.observeOne(input, form)
            }
            if (input.attr("type") == "submit") {
                jQValidator.setformvalidation(input, form)
            }
        })
    },
    setformvalidation: function(input, form) {
        input.on("click", function(e) {
            if (!jQValidator.validateAll(form)) {
                e.preventDefault();
            }
        })
    },
    fomrIfAllValid: function(form) {
        if (form.children(".invalid").length == 0) {
            form.removeClass("invalid")
        }
    },
    validateAll: function(form) {
        var temp = true;
        form.children(".observed").each(function() {
            if (!jQValidator.validateOne($(this), form)) {
                temp = false;
            }
        })

        //If all checked ok:
        if (temp) {
            form.removeClass("invalid");
            form.addClass("valid")
            return true;
        } else {
            form.addClass("invalid");
            form.removeClass("valid")
            return false
        }
    },
    observeOne: function(input, form) {
        input.addClass("observed")
        $(input).on("change", function() {

            jQValidator.validateOne($(this), form);
        })

    },
    validateOne: function(input, form) {
        $(form).addClass("dirty")
        //Remove old error;
        $(input).next(".error").remove()
            //Validation required
        if (!input.val()) {

            input.addClass("invalid-required")
            form.addClass("invalid")
            if (input.data("vd-invalid-message")) {
                input.after("<div class='error-required error'>" + input.data("vd-invalid-message") + "</div>")
            } else if (form.data("vd-invalid-message") && input.data("vd-invalid-message") != "none") {
                input.after("<div class='error-required error'>" + form.data("vd-invalid-message") + "</div>")
            }

            return false
        } else {
            input.removeClass("invalid-required")
        }
        //Validate by compare
        if (input.data("vd-compare-to")) {
            if (input.val() != $(input.data("vd-compare-to")).val()) {
                input.addClass("invalid-compare")
                form.addClass("invalid")
                
                if (input.data("vd-compare-message")) {
                    input.after("<div class='error-required error'>" + input.data("vd-compare-message") + "</div>")
                } else if (form.data("vd-compare-message") && input.data("vd-compare-message") != "none") {
                    input.after("<div class='error-required error'>" + form.data("vd-compare-message") + "</div>")
                }
                return false
            } else {
                input.removeClass("invalid-compare")
            }
        }
        if (input.data("vd-min-length")) {
            if (input.val().length < input.data("vd-min-length")) {
                input.addClass("invalid-min-length")
                form.addClass("invalid")
                
                if (input.data("vd-length-message")) {
                    input.after("<div class='error-required error'>" + input.data("vd-length-message") + "</div>")
                } else if (form.data("vd-length-message") && input.data("vd-length-message") != "none") {
                    input.after("<div class='error-required error'>" + form.data("vd-length-message") + "</div>")
                }
                return false
            } else {
                input.removeClass("invalid-min-length")
            }
        }
        if (input.data("vd-max-length")) {
            if (input.val().length > input.data("vd-max-length")) {
                input.addClass("invalid-max-length")
                form.addClass("invalid")
                
                if (input.data("vd-length-message")) {
                    input.after("<div class='error-required error'>" + input.data("vd-length-message") + "</div>")
                } else if (form.data("vd-length-message") && input.data("vd-length-message") != "none") {
                    input.after("<div class='error-required error'>" + form.data("vd-length-message") + "</div>")
                }
                return false
            } else {
                input.removeClass("invalid-max-length")
            }
        }
        if (input.data("vd-min-val")) {
            if (input.val() < input.data("vd-min-val")) {
                input.addClass("invalid-min-val")
                form.addClass("invalid")
                
                if (input.data("vd-value-message")) {
                    input.after("<div class='error-required error'>" + input.data("vd-value-message") + "</div>")
                } else if (form.data("vd-value-message") && input.data("vd-value-message") != "none") {
                    input.after("<div class='error-required error'>" + form.data("vd-value-message") + "</div>")
                }
                return false
            } else {
                input.removeClass("invalid-value-length")
            }
        }
        if (input.data("vd-max-val")) {
            if (input.val() < input.data("vd-max-val")) {
                input.addClass("invalid-max-val")
                form.addClass("invalid")
                
                if (input.data("vd-value-message")) {
                    input.after("<div class='error-required error'>" + input.data("vd-value-message") + "</div>")
                } else if (form.data("vd-value-message") && input.data("vd-value-message") != "none") {
                    input.after("<div class='error-required error'>" + form.data("vd-value-message") + "</div>")
                }
                return false
            } else {
                input.removeClass("invalid-value-length")
            }
        }
        //Validation Pattern
        if (input.data("vd-pattern")) {
            if(input.data("vd-pattern")=="email"){
                var patt = new RegExp(jQValidator.patterns.email);
            }
            if(input.data("vd-pattern")=="url"){
                var patt = new RegExp(jQValidator.patterns.url);
            }
            if(input.data("vd-pattern")=="password"){
                var patt = new RegExp(jQValidator.patterns.password);
            }
        
                var res = patt.test(input.val());
            if(!res){
                input.addClass("invalid-pattern")
                form.addClass("invalid")
                if (input.data("vd-pattern-message")) {
                    input.after("<div class='error-required error'>" + input.data("vd-pattern-message") + "</div>")
                } else if (form.data("vd-pattern-message") && input.data("vd-pattern-message") != "none") {
                    input.after("<div class='error-required error'>" + form.data("vd-pattern-message") + "</div>")
                }
                return false
            } 
        }
        $(input).next(".error").remove()
            //If valid check if any other is invalid or remove form class
        jQValidator.fomrIfAllValid(form)
        return true
    },
    formaction : function(e) {
        e.preventDefault();
        alert("passed")
        
    }
};


var JsValidator = {
    patterns:{
        email:"^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$",
        password: "/^[a-z0-9_-]{6,18}$/",
        url: "/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/"

    },
    addClass:function(element,classname){
        if(element.className.indexOf(classname)==-1){
        element.className += " "+classname;
        }
    },
    insertAfter: function (targetElement,newElement) {
    // target is what you want it to go after. Look for this elements parent.
    // console.log(targetElement)
    var parent = targetElement.parentNode;
    var NewElement = document.createElement('div');
    NewElement.innerHTML = newElement;
    NewElement.className="error";
    // if the parents lastchild is the targetElement...
    if (parent.lastChild == targetElement) {
        // add the newElement after the target element.
        parent.appendChild(NewElement);
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(NewElement, targetElement.nextSibling);
    }
    // targetElement.after(newElement)
    },
    launchFormValidation: function(form) {
        var inputs= form.getElementsByTagName("input")

        for(var i=0;i<inputs.length;i++){
            var input = inputs[i];

            if (input.required) {

                JsValidator.observeOne(input, form)
            }
            if (input.getAttribute("type") == "submit") {
                JsValidator.setformvalidation(input, form)
            }
        }
    },
    setformvalidation: function(input, form) {
        input.addEventListener("click", function(event) {
            // alert(JsValidator.validateAll(form))
            if (!JsValidator.validateAll(form)) {
                event.preventDefault();
            }
        })
    },
    fomrIfAllValid: function(form) {
        var inputs= form.getElementsByClassName("invalid")

        // for(var i=0;i<inputs.length;i++){
        //     var input = inputs[i];
        if (inputs.length == 0) {
            form.classList.remove("invalid")
        }
    },
    validateAll: function(form) {
        var temp = true;
       var inputs= form.getElementsByClassName("observed")
       // console.log(inputs.length)
        for(var i=0;i<inputs.length;i++){
            // console.log(JsValidator.validateOne(inputs[i], form))
            if (!JsValidator.validateOne(inputs[i], form)) {
                temp = false;
            }
        }

        //If all checked ok:
        if (temp) {
            form.classList.remove("invalid");
            JsValidator.addClass(form,"valid")
            return true;
        } else {
            JsValidator.addClass(form,"invalid");
            form.classList.remove("valid")
            return false
        }
    },
    observeOne: function(input, form) {
        JsValidator.addClass(input,"observed")
        input.addEventListener("blur", function() {
            
            JsValidator.validateOne(this, form);
        })

    },
    validateOne: function(input, form) {
        
        JsValidator.addClass(form,"dirty")
        //Remove old error;
          
       if(input.nextSibling.classList&&input.nextSibling.classList[0].indexOf("error")!=-1){
        input.nextSibling.remove();
       }
            //Validation required
        if (!input.value) {

            JsValidator.addClass(input,"invalid-required")
            JsValidator.addClass(form,"invalid")
            if (input.getAttribute("data-vd-invalid-message")) {
                JsValidator.insertAfter(input,"<div class='error-required error'>" + input.getAttribute("data-vd-invalid-message") + "</div>")
            } else if (form.getAttribute("data-vd-invalid-message") && input.getAttribute("data-vd-invalid-message") != "none") {
                JsValidator.insertAfter(input,"<div class='error-required error'>" + form.getAttribute("data-vd-invalid-message") + "</div>")
            }

            return false
        } else {
            input.classList.remove("invalid-required")
        }
        //Validate by compare
        if (input.getAttribute("data-vd-compare-to")) {
            // console.log(document.getElementById(input.getAttribute("data-vd-compare-to")))
            if (input.value != document.getElementById(input.getAttribute("data-vd-compare-to")).value) {
                JsValidator.addClass(input,"invalid-compare")
                JsValidator.addClass(form,"invalid")
                
                if (input.getAttribute("data-vd-compare-message")) {
                    JsValidator.insertAfter(input,"<div class='error-required error'>" + input.getAttribute("data-vd-compare-message") + "</div>")
                } else if (form.getAttribute("data-vd-compare-message") && input.getAttribute("data-vd-compare-message") != "none") {
                    JsValidator.insertAfter(input,"<div class='error-required error'>" + form.getAttribute("data-vd-compare-message") + "</div>")
                }
                return false
            } else {
                input.classList.remove("invalid-compare")
            }
        }
        if (input.getAttribute("data-vd-min-length")) {
            if (input.value.length < input.getAttribute("data-vd-min-length")) {
                JsValidator.addClass(input,"invalid-min-length")
                JsValidator.addClass(form,"invalid")
                
                if (input.getAttribute("data-vd-length-message")) {
                    JsValidator.insertAfter(input,"<div class='error-required error'>" + input.getAttribute("data-vd-length-message") + "</div>")
                } else if (form.getAttribute("data-vd-length-message") && input.getAttribute("data-vd-length-message") != "none") {
                    JsValidator.insertAfter(input,"<div class='error-required error'>" + form.getAttribute("data-vd-length-message") + "</div>")
                }
                return false
            } else {
                input.classList.remove("invalid-min-length")
            }
        }
        if (input.getAttribute("data-vd-max-length")) {
            if (input.value.length > input.getAttribute("data-vd-max-length")) {
                JsValidator.addClass(input,"invalid-max-length")
                JsValidator.addClass(form,"invalid")
                
                if (input.getAttribute("data-vd-length-message")) {
                    JsValidator.insertAfter(input,"<div class='error-required error'>" + input.getAttribute("data-vd-length-message") + "</div>")
                } else if (form.getAttribute("data-vd-length-message") && input.getAttribute("data-vd-length-message") != "none") {
                    JsValidator.insertAfter(input,"<div class='error-required error'>" + form.getAttribute("data-vd-length-message") + "</div>")
                }
                return false
            } else {
                input.classList.remove("invalid-max-length")
            }
        }
        if (input.getAttribute("data-vd-min-val")) {
            if (input.value < input.getAttribute("data-vd-min-val")) {
                JsValidator.addClass(input,"invalid-min-val")
                JsValidator.addClass(form,"invalid")
                
                if (input.getAttribute("data-vd-value-message")) {
                    JsValidator.insertAfter(input,"<div class='error-required error'>" + input.getAttribute("data-vd-value-message") + "</div>")
                } else if (form.getAttribute("data-vd-value-message") && input.getAttribute("data-vd-value-message") != "none") {
                    JsValidator.insertAfter(input,"<div class='error-required error'>" + form.getAttribute("data-vd-value-message") + "</div>")
                }
                return false
            } else {
                input.classList.remove("invalid-value-length")
            }
        }
        if (input.getAttribute("data-vd-max-val")) {
            if (input.value < input.getAttribute("data-vd-max-val")) {
                JsValidator.addClass(input,"invalid-max-val")
                JsValidator.addClass(form,"invalid")
                
                if (input.getAttribute("data-vd-value-message")) {
                    JsValidator.insertAfter(input,"<div class='error-required error'>" + input.getAttribute("data-vd-value-message") + "</div>")
                } else if (form.getAttribute("data-vd-value-message") && input.getAttribute("data-vd-value-message") != "none") {
                    JsValidator.insertAfter(input,"<div class='error-required error'>" + form.getAttribute("data-vd-value-message") + "</div>")
                }
                return false
            } else {
                input.classList.remove("invalid-value-length")
            }
        }
        //Validation Pattern
        if (input.getAttribute("data-vd-pattern")) {
            if(input.getAttribute("data-vd-pattern")=="email"){
                var patt = new RegExp(JsValidator.patterns.email);
            }
            if(input.getAttribute("data-vd-pattern")=="url"){
                var patt = new RegExp(JsValidator.patterns.url);
            }
            if(input.getAttribute("data-vd-pattern")=="password"){
                var patt = new RegExp(JsValidator.patterns.password);
            }
        
                var res = patt.test(input.value);
            if(!res){
                JsValidator.addClass(input,"invalid-pattern")
                JsValidator.addClass(form,"invalid")
                if (input.getAttribute("data-vd-pattern-message")) {
                    JsValidator.insertAfter(input,"<div class='error-required error'>" + input.getAttribute("data-vd-pattern-message") + "</div>")
                } else if (form.getAttribute("data-vd-pattern-message") && input.getAttribute("data-vd-pattern-message") != "none") {
                    JsValidator.insertAfter(input,"<div class='error-required error'>" + form.getAttribute("data-vd-pattern-message") + "</div>")
                }
                return false
            } 
        }
        if(input.nextSibling.classList&&input.nextSibling.classList[0].indexOf("error")!=-1){
        input.nextSibling.remove();
       }
            //If valid check if any other is invalid or remove form class
        JsValidator.fomrIfAllValid(form)
        return true
    },
    formaction : function(e) {
        e.preventDefault();
        alert("passed")
        
    }
};
(function() {
    $("form").each(function() {
        var element = $(this);
        if (element.data("validator")) {
            jQValidator.launchFormValidation(element)
        }
    })
    var forms=document.getElementsByTagName("form");
    for(var i =0; i<forms.length;i++){
        var element=forms[i]
        // console.log(element.getAttribute("data-jsvalidator"))
        if (element.getAttribute("data-jsvalidator")) {
        
        JsValidator.launchFormValidation(element)
        }
    }
}());