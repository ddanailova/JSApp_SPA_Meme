const validateForm = function () {

    const register = function (selector) {
        $(selector).on('submit', function (ev) {
            let isFormValid = true;
            $('input').removeClass('is-invalid');
            $('.validation-massage').text('');
            let username = $('input[name="username"]');
            let password = $('input[name="password"]');
            let confirmPass = $('input[name="repeatPass"]');
            let email = $('input[name="email"]');
            let avatarUrl = $('input[name="avatarUrl"]');

            let validateUser = /^[a-zA-Z]{3,}$/;
            let validatePass = /^[a-zA-Z0-9]{6,}$/;

            if (!validateUser.test(username.val().trim())) {
                isFormValid = false;
                username.addClass('is-invalid');
                $('#validate-username').text('The username must be more then 3 latin letters');
            }

            if (!validatePass.test(password.val().trim())) {
                isFormValid = false;
                password.addClass('is-invalid');
                $('#validate-password').text('The password must be more then 6 digits or latin letters');
            }

            if (password.val().trim() !== confirmPass.val().trim()) {
                isFormValid = false;
                password.addClass('is-invalid');
                confirmPass.addClass('is-invalid');
                $('#validate-password').text('The passwords should match');
                $('#validate-repeatPass').text('The passwords should match');
            }

            if (!isFormValid) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        });
    };

    const login = function (selector) {
        $(selector).on('submit', function (ev) {
            let isFormValid = true;
            $('input').removeClass('is-invalid');
            $('.validation-massage').text('');
            let username = $('input[name="username"]');
            let password = $('input[name="password"]');

            let validateUser = /^[a-zA-Z]{3,}$/;
            let validatePass = /^[a-zA-Z0-9]{6,}$/;

            if (!validateUser.test(username.val().trim())) {
                isFormValid = false;
                username.addClass('is-invalid');
                $('#validate-username').text('The username must be more then 3 latin letters');
            }

            if (!validatePass.test(password.val().trim())) {
                isFormValid = false;
                password.addClass('is-invalid');
                $('#validate-password').text('The password must be more then 6 digits or latin letters');
            }

            if (!isFormValid) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        });
    };

    const item = function (selector) {
        // //Realtime validation
        // let isFormValid = true;
        // let destination = $('input[name="destination"]');
        // $(`${selector} input[name="destination"]`).on('keydown', function () {
        //     if (destination.val().trim().length < 4) {
        //         isFormValid = false;
        //         destination.addClass('is-invalid');
        //         $('#validate-destination').text('Destination must be more then 4 symbols');
        //     }else{
        //         isFormValid = true;
        //         destination.removeClass('is-invalid');
        //         $('#validate-destination').text("");
        //     }
        // })
        $(selector).on('submit', function (ev) {
            let isFormValid = true;
            $('input').removeClass('is-invalid');
            $('.validation-massage').text('');
            let title = $('input[name="title"]');
            let description = $('input[name="description"]');
            let imageUrl = $('input[name="imageUrl"]');

            if (title.val().trim().length === 0 || title.val().trim().length > 33) {
                isFormValid = false;
                title.addClass('is-invalid');
                $('#validate-title').text('The title length must not exceed 33 characters!');
                title.val('');
            }

            if (description.val().trim().length < 30 || description.val().trim().length > 450) {
                isFormValid = false;
                description.addClass('is-invalid');
                $('#validate-description').text('The description length must not exceed 450 characters and should be at least 30!');
                description.val('');
            }
            
            if (imageUrl.val().trim().substr(0, 4) !== 'http') {
                isFormValid = false;
                imageUrl.addClass('is-invalid');
                $('#validate-imageUrl').text('Please provide a valid image URL starting with "http"');
            }

            if (!isFormValid) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        });
    };

    return {
        register,
        login,
        item,
    }
}();