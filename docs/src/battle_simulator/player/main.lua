--[[
    | Prismarine Colossus
    | 
    | Huge prismarine statues standing over 20 meters tall. Their threatening
    | appearance can intimidate even the bravest warriors.
    | They have bright turquoise eyes, but compliments won't help much in battle.
    | 
    | Attributes
    | Health    ▰▰▰▰▰▰▰▰▰▰
    | Attack    ▰▰▰▰▱▱▱▱▱▱
    | Defense   ▰▰▰▰▰▰▰▰▰▰
    | Speed     ▰▱▱▱▱▱▱▱▱▱

    What will you do?
    1. Attack with the sword.
    2. Use a regeneration potion.
    3. Throw a rock.
    4. Hide.
    > 2

]]

-- Dependencies
local utils = require("utils")
local player = require("player.player")
local playerActions = require("player.actions")
local colossus = require("colossus.colossus")
local colossusActions = require("colossus.actions")

-- Enable UTF-8 in terminal
utils.enableUtf8()

-- Header
utils.printHeader()

-- Get monster definition
local boss = colossus
local bossActions = colossusActions

-- Present the monster
utils.printCreature(boss)

-- Build actions
playerActions.build()
bossActions.build()

-- Start battle loop
while true do

    -- Show actions to the player
    print()
    print(string.format("What will be %s's next action?", player.name))
    local validPlayerActions = playerActions.getValidActions(player, boss)
    for i, action in pairs(validPlayerActions) do
        print(string.format("%d. %s", i, action.description))
    end
    local chosenIndex = utils.ask()
    local chosenAction = validPlayerActions[chosenIndex]
    local isActionValid = chosenAction ~= nil

    -- Simulate player's turn
    if isActionValid then
        chosenAction.execute(player, boss)
    else
        print(string.format("Your choice is invalid. %s lost the turn.", player.name))
    end

    -- Exit point: Creature ran out of life
    if boss.health <= 0 then
        break
    end

    -- Simulate creature's turn
    print()
    local validBossActions = bossActions.getValidActions(player, boss)
    local bossAction = validBossActions[math.random(#validBossActions)]
    bossAction.execute(player, boss)

    -- Exit point: Player ran out of life
    if player.health <= 0 then
        break
    end
end

-- Process victory and defeat conditions
if player.health <= 0 then
    print()
    print("---------------------------------------------------------------------")
    print()
    print("😭")
    print(string.format("%s was not able to defeat %s.", player.name, boss.name))
    print("Maybe next time...")
    print()
elseif boss.health <= 0 then
    print()
    print("---------------------------------------------------------------------")
    print()
    print("🥳")
    print(string.format("%s prevailed and defeated %s.", player.name, boss.name))
    print("Congratulations!!!")
    print()
end
