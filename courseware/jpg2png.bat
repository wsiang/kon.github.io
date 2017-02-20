for /r . %%i in (*.jpg) do ffmpeg -i %%i %%~pi%%~ni.png 
pause
