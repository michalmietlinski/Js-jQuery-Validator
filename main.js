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
                var patt = new RegExp(Validator.patterns.email);
            }
            if(input.data("vd-pattern")=="url"){
                var patt = new RegExp(Validator.patterns.url);
            }
            if(input.data("vd-pattern")=="password"){
                var patt = new RegExp(Validator.patterns.password);
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
    },
    formaction : function() {

        console.log("fdfddf")
        
    }
};


(function() {
    $("form").each(function() {
        var element = $(this);
        if (element.data("validator")) {
            Validator.launchFormValidation(element)
        }
    })
}());