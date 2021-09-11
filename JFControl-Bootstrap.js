
function form_handle(data) {
    var promise = new Promise((resolve, reject) => {
        var progressElem = $(data.loader);
        progressElem.css('width', '0%');
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
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                //Upload progress
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        //Do something with upload progress
                        var percents = percentComplete * 100;
                        progressElem.val(percents);
                        console.log(percents + '%');
                        progressElem.css('width',percents + '%');
                        if (percents > 20) {
                            progressElem.removeClass('bg-danger');
                            progressElem.addClass('bg-warning');
                        }
                        if (percents > 60) {
                            progressElem.removeClass('bg-warning');
                            progressElem.addClass('bg-info');
                        }
                        if (percents > 80) {
                            progressElem.removeClass('bg-info');
                            progressElem.addClass('bg-success');
                        }
                        if (percents == 100) {
                            progressElem.removeAttr('value');
                        }
                    }
                }, false);
                return xhr;
            },
            failed: function (res) {
                progressElem.css('width','0&');
                progressElem.removeClass('bg-success');
                progressElem.addClass('bg-danger');
                try {
                    var res = JSON.parse(res);
                    reject(res);
                } catch (err) {
                    reject(res);
                }
            },
            success: function (res) {
                progressElem.css('width','100&');
                progressElem.removeClass('bg-danger');
                progressElem.addClass('bg-success');
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
