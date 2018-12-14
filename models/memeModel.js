const memeModel = function (){
    let memesUrl = `appdata/${storage.appKey}/memes`;

    const getAll = function () {
        let sortedMemesUrl = memesUrl +'?query={}&sort={"_kmd.ect": -1}'
        return requester.get(sortedMemesUrl);
    }

    const getByUser = function (id) {
        let userMemesUrl = memesUrl;
        userMemesUrl += `?query={"_acl.creator":"${id}"}`;
        return requester.get(userMemesUrl);
    };

    const add = function (params) {
        let username = storage.getData('userInfo').username;
        let data = {
            "title": params.title,
            "description": params.description,
            "imageUrl": params.imageUrl,
            "creator":username
        };
        return requester.post(memesUrl, data);
    };

    const details =function(id){
        let memeDetailUrl = memesUrl + `/${id}`;
        return requester.get(memeDetailUrl);
    }

    const edit = function (id, params) {
        let memeEditUrl = memesUrl + `/${id}`;
        let username = storage.getData('userInfo').username;
        let data = {
            "title": params.title,
            "description": params.description,
            "imageUrl": params.imageUrl,
            "creator":username
        };
        return requester.update(memeEditUrl, data);
    };

    const remove = function (id) {
        let memeRemoveUrl = memesUrl + `/${id}`;
        return requester.remove(memeRemoveUrl);
    };

    return {
        getAll,
        getByUser,
        add,
        details,
        edit,
        remove,
    }
}();