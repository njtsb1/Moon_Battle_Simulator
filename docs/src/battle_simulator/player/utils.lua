local utils = {}

---
---This function enables UTF-8 mode in the terminal.
---
function utils.enableUtf8()
    os.execute("chcp 65001")
end

---
---Prints the simulator header to the terminal.
---
function utils.printHeader()
    print([[
=====================================================================
                _
     _         | |
    | | _______| |---------------------------------------------\
    |:-)_______|==[]============================================>
    |_|        | |---------------------------------------------/
               |_|

                -----------------------------------------

                        ⚔ BATTLE SIMULATOR ⚔

=====================================================================

            You wield your sword and prepare to fight.
                            It's time for battle!

]])
end


---
---Calculates an ASCII progress bar based on an attribute.
---@param attribute number Number from 0 to 10.
---@return string
---
function utils.getProgressBar(attribute)
    local fullChar = "▰"
    local emptyChar = "▱"

    local result = ""
    for i = 1, 10, 1 do
        if i <= attribute then
            result = result .. fullChar
        else
            result = result .. emptyChar
        end
    end
    return result
end

---
---Prints the information card of a creature.
---@param creature table
---
function utils.printCreature(creature)
    -- Calculate health rate
    local healthRate = math.floor((creature.health / creature.maxHealth) * 10)

    -- Card
    print("| " .. creature.name)
    print("| ")
    print("| " .. creature.description)
    print("| ")
    print("| Attributes")
    print("|    Health:        " .. utils.getProgressBar(healthRate))
    print("|    Attack:        " .. utils.getProgressBar(creature.attack))
    print("|    Defense:       " .. utils.getProgressBar(creature.defense))
    print("|    Speed:         " .. utils.getProgressBar(creature.speed))
end

---Asks the user for a number and returns it.
---@return any
function utils.ask()
    io.write("> ")
    local answer = io.read("*n")
    return answer
end

return utils
