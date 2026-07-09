local utils = require "utils"

local actions = {}

actions.list = {}

---Create a list of actions that is stored internally.
function actions.build()
    -- Reset list
    actions.list = {}

    -- Body attack
    local bodyAttack = {
        description = "Attack with body.",
        requirement = nil,
        execute = function(playerData, creatureData)
            -- 1. Define success chance
            local successChance = playerData.speed == 0 and 1 or creatureData.speed / playerData.speed
            local success = math.random() <= successChance

            -- 2. Calculate damage
            local rawDamage = creatureData.attack - math.random() * playerData.defense
            local damage = math.max(1, math.ceil(rawDamage))

            if success then
                -- 3. Apply damage on success
                playerData.health = playerData.health - damage
                
                -- 4. Present result as print
                print(string.format("%s attacked %s and dealt %d points of damage", creatureData.name, playerData.name, damage))
                local healthRate = math.floor((playerData.health / playerData.maxHealth) * 10)
                print(string.format("%s: %s", playerData.name, utils.getProgressBar(healthRate)))
            else
                print(string.format("%s tried to attack but missed.", creatureData.name))
            end
        end
    }

    -- Sonar attack
    local sonarAttack = {
        description = "Sonar attack",
        requirement = nil,
        execute = function(playerData, creatureData)
            -- Calculate damage
            local rawDamage = creatureData.attack - math.random() * playerData.defense
            local damage = math.max(1, math.ceil(rawDamage * 0.3))

            -- Apply damage
            playerData.health = playerData.health - damage
            
            -- Present result as print
            print(string.format("%s used a sonar and dealt %d points of damage", creatureData.name, damage))
            local healthRate = math.floor((playerData.health / playerData.maxHealth) * 10)
            print(string.format("%s: %s", playerData.name, utils.getProgressBar(healthRate)))
        end
    }

    -- Wait
    local waitAction = {
        description = "Wait",
        requirement = nil,
        execute = function(playerData, creatureData)
            -- Present result as print
            print(string.format("%s decided to wait and did nothing this turn.", creatureData.name))
        end
    }

    -- Populate list
    actions.list[#actions.list + 1] = bodyAttack
    actions.list[#actions.list + 1] = sonarAttack
    actions.list[#actions.list + 1] = waitAction
end


---Return a list of valid actions
---@param playerData table Player definition
---@param creatureData table Creature definition
---@return table
function actions.getValidActions(playerData, creatureData)
    local validActions = {}
    for _, action in pairs(actions.list) do
        local requirement = action.requirement
        local isValid = requirement == nil or requirement(playerData, creatureData)
        if isValid then
            validActions[#validActions+1] = action
        end
    end
    return validActions
end


return actions
