# jQuery-form-control
Plugin to handle form, support uploading files and build in progress bar

how to use?
very simple!
```html
<link rel="stylesheet" href="/path/to/JFControl.css">

<form id="myForm" enctype="multipart/form-data">
  <input name="input_1">
  <input type="file" name="input_file">
  <div id="html_data"></div>
  <progress id="my_loader" max="100"></progress>
  <button id="sendForm">Send</button>
</form>

<script src="/path/to/jQuery.js"></script>
<script src="/path/to/JFControl.js"></script>
<script>
  $(document).on('click','#sendForm',function(e){
    e.preventDefault();
    form_control({
      api_url : '/path/to/api',
      method  : 'POST',
      form    : '#myForm',
      loader  : '#my_loader',
      customData : {
        custom_data : $('#html_data').html()
      }
    }).then((res)=>{
      /* handle JSON/data from res */
    }).catch((err)=>{
      /* handle data err */
    })
  })
</script>
```

if your backend return JSON, this plugin automatically detect it.
