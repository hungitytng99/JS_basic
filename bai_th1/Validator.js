// Đối tượng validator
function Validator(options) {
    var selectorRule = {};

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector))
                return element.parentElement;
            element = element.parentElement;
        }
    }


    //Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage = rule.test(inputElement.value);

        var rules = selectorRule[rule.selector];
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    //console.log(formElement.querySelector(rule.selector + ':checked').value);
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
                    break;
            }

            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = "";
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }


    //Lấy element của form
    var formElement = document.querySelector(options.form);
    if (formElement) {


        //Lặp qua mỗi rule và xử lý(lắng nghe sự kiện blur, input) để validate;
        options.rules.forEach(function(rule) {
            //lưu lại các rule cho input
            if (Array.isArray(selectorRule[rule.selector])) {
                selectorRule[rule.selector].push(rule.test);

            } else {
                selectorRule[rule.selector] = [rule.test];
            }
            var inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function(inputElement) {
                if (inputElement) {
                    // Xử lý trường hợp blur khỏi input
                    inputElement.onblur = function() {
                        validate(inputElement, rule);
                    }

                    // Xử lý khi người dùng nhập vào input
                    inputElement.oninput = function() {
                        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                        errorElement.innerText = "";
                        getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                    }
                }
            })

        });

        formElement.onsubmit = function(e) {
            e.preventDefault();

            var isFormValid = true;
            //Kiểm tra xem tất cả các form có lỗi không?
            options.rules.forEach(function(rule) {
                var inputElement = formElement.querySelector(rule.selector);
                isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Trường hợp submit với js
                if (typeof options.onSubmit === 'function') {

                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                    var formValues = Array.from(enableInputs).reduce(function(values, input) {

                        switch (input.type) {
                            case 'radio':
                                if (input.matches(':checked'))
                                    values[input.name] = input.value;
                                break;

                            case 'checkbox':

                                if (!input.matches(':checked')) {
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                };
                                values[input.name].push(input.value);

                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }


                        return values;
                    }, {});
                    //call API
                    options.onSubmit(formValues);
                } else { // Trường hợp submit với hành vi mặc định
                    formElement.submit();
                }
            }


        }
    }
}


// Định nghĩa các rules:
// Nguyên tắc:
// 1. Khi có lỗi => trả message lỗi
// 2. Không lỗi => ko trả
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value ? undefined : message || 'Vui lòng nhập trường này.';
        },
    }
}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message || "Trường này phải là email."
        }
    }
}

Validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập ${min} kí tự.`
        }
    }
}

Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}