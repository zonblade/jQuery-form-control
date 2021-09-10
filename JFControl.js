function form_handle(data) {
    var promise = new Promise((resolve, reject) => {
        var progressElem = $(data.loader);
        progressElem.attr('value', 0);
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
                        progressElem.text(percents + '%');
                        if (percents > 20) {
                            progressElem.removeClass('is-danger');
                            progressElem.addClass('is-warning');
                        }
                        if (percents > 60) {
                            progressElem.removeClass('is-warning');
                            progressElem.addClass('is-info');
                        }
                        if (percents > 80) {
                            progressElem.removeClass('is-info');
                            progressElem.addClass('is-success');
                        }
                        if (percents == 100) {
                            progressElem.removeAttr('value');
                        }
                    }
                }, false);
                return xhr;
            },
            failed: function (res) {
                progressElem.attr('value', 100);
                progressElem.removeClass('is-success');
                progressElem.addClass('is-danger');
                try {
                    var res = JSON.parse(res);
                    reject(res);
                } catch (err) {
                    reject(res);
                }
            },
            success: function (res) {
                progressElem.attr('value', 100);
                try {
                    var res = JSON.parse(res);
                    resolve(res);
                } catch (err) {
                    progressElem.removeClass('is-success');
                    progressElem.addClass('is-danger');
                    progressElem.attr('value', 0);
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
