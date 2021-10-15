function form_handle(data) {
    var promise = new Promise((resolve, reject) => {
        var form = new FormData($(data.form)[0]);
        if (data.hasOwnProperty('customData')) {
            $.each(data.customData, function (index, value) {
                form.append(index, value);
            });
        }
        // return;
        // Make the ajax call
        $.ajax({
            url: data.api_url,
            type: data.method,
            failed: function (res) {
                try {
                    reject(res);
                } catch (err) {
                    reject(res);
                }
            },
            success: function (res) {
                try {
                    var res = JSON.parse(res);
                    resolve(res);
                } catch (err) {
                    reject(res);
                }
            },
            data: form,
            cache: false,
            contentType: false,
            processData: false
        })
    });
    return promise;
}
