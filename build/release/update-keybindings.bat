call code-insiders --wait --disable-extensions --export-default-keybindings .\build\keybindings\
call code-insiders --wait --agents --export-default-keybindings .\build\keybindings\agents
node .\build\release\append-keybindings.js .\build\keybindings .\build\keybindings\agents
node .\build\release\cleanup-keybindings.js
rmdir /s /q .\build\keybindings\agents
