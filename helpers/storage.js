const storage = function () {
    const appKey = 'kid_S1QrfgWgE';
    const appSecret = '3805d6df650a44a59154318afb8e8046';
    const masterSecret = '8ff83e6fbf324d0a81173209bccb935d';

    const saveData = function (key, value) {
        sessionStorage.setItem(appKey + key, JSON.stringify(value));
    };

    const getData = function (key) {
        return JSON.parse(sessionStorage.getItem(appKey + key));
    };

    const deleteData = function(key) {
        sessionStorage.removeItem(appKey + key);
    };

    const saveUser = function(data){
        saveData('userInfo', {
            id: data._id,
            username: data.username,
            email:data.email
            // firstName: data.first_name,
            // lastName: data.last_name
        });

        saveData('authToken', data._kmd.authtoken);
    };

    const deleteUser = function(){
        deleteData('authToken');
        deleteData('userInfo');
    };

    return {
        saveData,
        getData,
        deleteData,
        appKey,
        appSecret,
        masterSecret,
        saveUser,
        deleteUser
    };
}();