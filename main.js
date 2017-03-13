//Main js

var Validator = {
    patterns:{
        email:"^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$",
        password: "/^[a-z0-9_-]{6,18}$/",
        url: "/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/"

    },
    launchFormValidation: function(form) {
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
    setformvalidation: function(input, form) {
        input.on("click", function(e) {
            if (!Validator.validateAll(form)) {
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
            if (!Validator.validateOne($(this), form)) {
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

            Validator.validateOne($(this), form);
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
        //Validation Pattern
        if (input.data("vd-pattern")) {
            if(input.data("vd-pattern")=="email"){
                var patt = new RegExp(Validator.patterns.email);
                console.log(patt)
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
        Validator.fomrIfAllValid(form)
        return true
    }
}
formaction = function() {
    if($(this).hasClass("dirty")){
    console.log("fdfddf")
    }
}

(function() {
    $("form").each(function() {
        var element = $(this);
        if (element.data("validator")) {
            Validator.launchFormValidation(element)
        }
    })
}());