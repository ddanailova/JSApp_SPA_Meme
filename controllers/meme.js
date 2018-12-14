const meme = function () {
    const getAdd = function (ctx) {
        ctx.partial('views/meme/addMeme.hbs');
    };

    const postAdd = function (ctx) {
        memeModel.add(ctx.params).then(function () {
            notifications.showInfo('Meme created.');
            ctx.redirect('#/');
        }).catch(function (res) {
            notifications.handleError(res);
        });
    };

    const details = function (ctx) {
        let memeId = ctx.params.id;
        let username = storage.getData('userInfo').username;

        memeModel.details(memeId)
            .then(function (res) {
                ctx.meme = res;
                ctx.meme.creator === username ? ctx.meme.isCreator = true : ctx.meme.isCreator = false;
                ctx.partial('views/meme/detailsMeme.hbs');
            })
            .catch(function (res) {
                notifications.handleError(res);
            });
    }

    const getEdit = function (ctx) {
        let memeId = ctx.params.id;
        storage.saveData('memeId', memeId);
        memeModel.details(memeId)
            .then(function (res) {
                ctx.meme = res;
                ctx.partial('views/meme/editMeme.hbs');
            })
            .catch(function (res) {
                notifications.handleError(res);
            });
    };

    const postEdit = function (ctx) {
        let memeId = storage.getData('memeId');
        // let flightId=ctx.params.id.replace(':','');
        memeModel.edit(memeId, ctx.params)
            .then(function (res) {
                notifications.showInfo(`Meme ${res.title} updated`);
                ctx.redirect('#/');
            })
            .catch(function (res) {
                notifications.handleError(res);
            });

    };

    const remove = function (ctx) {
        let memeId = ctx.params.id;
        memeModel.remove(memeId)
            .then(function (res) {
                notifications.showInfo('Meme deleted.');
                ctx.redirect('#/')
            })
            .catch(function (res) {
                notifications.handleError(res);
            });

    };

    const getByUser = function (ctx) {
        memeModel.getMine()
            .then(function (res) {
                ctx.memes = res;

                ctx.loadPartials({
                    'myMemes': '../views/meme/usersMemes.hbs'
                }).then(function () {
                    this.partial('../views/user/profile.hbs');
                }).catch(function (res) {
                    notifications.handleError(res);
                })
            })
    };

    return {
        getAdd,
        postAdd,
        details,
        getEdit,
        postEdit,
        remove,
        getByUser
    }
}();