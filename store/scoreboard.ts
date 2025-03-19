import type { Scoreboard } from "~/types/scoreboard"

export const useScoreboardStore = defineStore('scoreboard', () => {

const scoreboard: Ref<Scoreboard> = ref({})
const getScoreboard = computed(() => scoreboard.value)
function setScoreboard(value: Scoreboard) {
    scoreboard.value = value
}

return { 
    getScoreboard, 
    setScoreboard, 
}

})