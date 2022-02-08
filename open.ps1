invoke-expression 'cmd /c start /max powershell -NoExit -Command { echo "getting git status..."; git status }';
invoke-expression 'cmd /c start /max powershell -NoExit -Command { echo "starting compilation..."; npm run dev }';
invoke-expression 'cmd /c start /max powershell -NoExit -Command { echo "starting proxy server..."; npx netlify-cms-proxy-server }';

start firefox -argumentlist "-foreground -new-window http://localhost:3000" -Wait
start firefox -argumentlist "-new-tab http://localhost:3000/admin/index.html"
