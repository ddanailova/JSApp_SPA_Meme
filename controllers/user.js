const user = (function () {
    const getLogin = function (ctx) {
        ctx.partial('views/user/login.hbs');
    };

    const postLogin = function (ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;
        let form = this.target;

        userModel.login(username, password).then(function (data) {
            storage.saveUser(data);
            $(form).trigger('reset');
            notifications.showInfo('Login successful.');
            ctx.redirect('#/');
        }).catch(
            function (res) {
                notifications.handleError(res);
            }
        );
    };

    const logout = function (ctx) {
        userModel.logout().then(function () {
            storage.deleteUser();
            notifications.showInfo('Logout successful.');
            ctx.redirect('#/login');
        }).catch(
            function (res) {
                notifications.handleError(res);
            }
        );
    };

    const getRegister = function (ctx) {
        ctx.partial('./views/user/register.hbs');
    };

    const postRegister = function (ctx) {
        let form = this.target;

        userModel.register(ctx.params).then(function (data) {
            storage.saveUser(data);
            $(form).trigger('reset');
            notifications.showInfo('User registration successful.');
            ctx.redirect('#/');
        }).catch(
            function (res) {
                notifications.handleError(res);
            }
        );
    };

    const myProfile = function (ctx) {
        let userInfo = storage.getData('userInfo');

        userModel.profile(userInfo.id).then(function (res) {
            ctx.user = res;
            memeModel.getByUser(userInfo.id).then(
                function (data) {
                    if (data.lenght === 0) {
                        ctx.noMemes = true;
                    }
                    ctx.memes = data;
                    ctx.loadPartials({
                        'userMemes': '../views/meme/usersMemes.hbs'
                    }).then(
                        function () {
                            this.partial('./views/user/profile.hbs')
                        }
                    )
                }
            )
        }).catch(
            function (res) {
                notifications.handleError(res);
            }
        );
    }

    const creatorProfile = function (ctx) {
        let userInfo = storage.getData('userInfo');
        let creatorId = ctx.params.creatorId;
        
        userModel.profile(creatorId).then(function (res) {
            ctx.user = res;
            memeModel.getByUser(creatorId).then(
                function (data) {
                    if (data.lenght === 0) {
                        ctx.noMemes = true;
                    }
                    ctx.memes = data;
                    ctx.memes.map((meme) => meme.MakeInvisible === ctx.MakeInvisible);
                    ctx.loadPartials({
                        'userMemes': '../views/meme/usersMemes.hbs'
                    }).then(
                        function () {
                            this.partial('./views/user/profile.hbs')
                        }
                    )
                }
            )
        }).catch(
            function (res) {
                notifications.handleError(res);
            }
        );
    }

    const initializeLogin = function () {
        let userInfo = storage.getData('userInfo');
        if (userModel.isAuthorized()) {
            $('#welcome-name').text(`${userInfo.username}`);
            $('.user-logged').removeClass('d-none');
            $('.user-not-logged').addClass('d-none');
        } else {
            $('#welcome-name').text("");
            $('.user-logged').addClass('d-none');
            $('.user-not-logged').removeClass('d-none');
        }
    };

    // const remove = function (ctx) {
    //     console.log("I am in user controller");
    //     let userId = ctx.params.id;
    //     userModel.remove(userId)
    //         .then(function (res) {
    //             console.log("Just made requst");
    //             notifications.showInfo('User deleted.');
    //             ctx.redirect('#/')
    //         })
    //         .catch(function (res) {
    //             notifications.handleError(res);
    //         });

    // };

    return {
        getLogin,
        postLogin,
        logout,
        getRegister,
        postRegister,
        myProfile,
        creatorProfile,
        initializeLogin,
        // remove
    };
}());