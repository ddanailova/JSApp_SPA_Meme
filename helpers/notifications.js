const notifications = function () {

    const showInfo = function (massage) {
        $('#infoBox>span').text(massage);
        $('#infoBox').show();
        $('#infoBox').fadeOut(8000);
    };

    const showError = function (massage) {
        $('#errorBox>span').text(massage);
        $('#errorBox').show();
        $('#errorBox').fadeOut(8000);
        $('#errorBox').on('click', function(){$(this).fadeOut(500)});
    };

    const handleError = function(reason) {
        showError(reason.responseJSON.description);
    };

    const showLoading = function () {
        $(document).ajaxStart(function () {
            $('#loadingBox').show()
        });
        $(document).ajaxStop(function () {
            $('#loadingBox').hide()
        });
    };

    return{
        showInfo,
        showError,
        showLoading,
        handleError
    }
}();