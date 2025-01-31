local Library = loadstring(game:HttpGet("https://raw.githubusercontent.com/xHeptc/Kavo-UI-Library/main/source.lua"))()
local Window = Library.CreateLib("home", "DarkTheme")
local Tab = Window:NewTab("home")

local Section = Tab:NewSection("blox fruits discont")

Section:NewLabel("blox fruits")

Section:NewButton("ButtonText", "ButtonInfo", function()
    loadstring(game:HttpGet("https://raw.githubusercontent.com/MozilOnTopp/MozilHub/refs/heads/main/BloxFruits"))()
end)
