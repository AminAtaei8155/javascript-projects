<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Upload File</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col">
                <form action="/upload.php" method="POST" enctype="multipart/form-data" id="Upload">
                    <div class="form-group">
                        <label for="fileupload">File : </label>
                        <input type="file" id="fileupload" name="file" class="form-control-file">
                    </div>
                    <button class="btn btn-danger">submit</button>
                </form>
                <div class="mt-4 d-none" id="progress">
                    <div class="progress" role="progressbar">
                        <div class="progress-bar" style="width: 0%">0%</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <script src="https://unpkg.com/axios@1.6.7/dist/axios.min.js"></script>
    <script>
        const form = document.querySelector('#Upload');
        const progress = document.querySelector('#progress');
        const progressBar = progress.querySelector('.progress-bar');

        form.addEventListener('submit' , function (event) {
            event.preventDefault();

            let file = this.querySelector(`#fileupload`).files[0];

            if (file){
                progress.classList.remove('d-none');
                let formData = new FormData();
                formData.append('file' , file);

                axios.post('/upload.php' , formData , {
                    onUploadProgress : progressHander
                })
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => console.log(error))
                // let ajax = new XMLHttpRequest();
                // ajax.upload.addEventListener('progress' , progressHander);
                // ajax.addEventListener('load' , completeHandler);
                // ajax.open('POST' , '/upload.php');
                //
                // ajax.send(formData)
            }

        });
        
        function progressHander(event) {
            let percent = Math.round((event.loaded / event.total) * 100);
            progressBar.style.width = `${percent}%`;
            progressBar.innerHTML = `${percent}%`;
            console.log(percent)

        }

        // function completeHandler() {
        //     console.log('complete')
        // }


    </script>
</body>
</html>