
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        function writting(mssg)
        {
            var msg = document.getElementById('msg');
            // msg.innerHTML = this.value;
            msg.innerHTML = mssg.value;
        }
    </script>
</head>
<body>
    <input type="text" onkeydown="writting(this)">
    <div contenteditable="true" id="msg"></div>
</body>
</html>
