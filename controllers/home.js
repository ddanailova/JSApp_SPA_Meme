const home = (function () {
    const index = function (ctx) {
        if (userModel.isAuthorized()) {
            memeModel.getAll().then(function (res) {
                if(res.lenght === 0){
                    ctx.noMemes = true;
                }else{
                    ctx.memes = res;
                    let username = storage.getData('userInfo').username;
                    let userId = storage.getData('userInfo').userId;
                    ctx.userId = userId;
                    ctx.memes.map(meme=>{
                        meme.creator === username? meme.isCreator =true:meme.isCreator=false;
                    });
                    ctx.partial('views/meme/listMemes.hbs');
                }
            }).catch(
                function (res) {
                    notifications.handleError(res);
                }
            );
        } else {
            ctx.partial('views/home/index.hbs');
        }
    };

    return {
        index,
    };
}());