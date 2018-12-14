const app = Sammy('#main-conteiner', function () {
    this.use('Handlebars', 'hbs');
    this.before({
        except: {}
    }, function () {
        user.initializeLogin();
    });

    this.get('#/', home.index);
    this.get('#/login', user.getLogin);
    this.post('#/login', user.postLogin);
    this.get('#/logout', user.logout);
    this.get('#/register', user.getRegister);
    this.post('#/register', user.postRegister);
    this.get('#/user/remove', user.remove);
    this.get('#/meme/add', meme.getAdd);
    this.post('#/meme/add', meme.postAdd);
    this.get('#/meme/details', meme.details);
    this.get('#/meme/edit', meme.getEdit);
    this.post('#/meme/edit/:id', meme.postEdit);
    this.get('#/meme/remove', meme.remove);
    this.get('#/user/my/profile', user.myProfile);
    this.get('#/user/creator/profile', user.creatorProfile);

});

$(function () {
    app.run('#/');
});