import type { Characters } from "~/types/characters"
import type { Connections, List } from "~/types/connections"

export const useUsersStore = defineStore('users', () => {
const user: Ref<{userId?: string, character?: Characters}> = ref({})
const getUserId = computed(() => user.value.userId)
const getCharacter = computed(() => user.value.character)
function setUser(id: string, character: Characters) {
    user.value.userId = id
    user.value.character = character
}

const connections: Ref<Connections> = ref([])
const getConnections = computed(() => connections.value)
function setConnections(value: Connections) {
    connections.value = value
}
function emptyConnections() {
    connections.value = []
}

const nicities: Ref<List> = ref({})
const getNicities = computed(() => nicities.value)
function setNicities(value: List) {
    nicities.value = value
}

const naughties: Ref<List> = ref({})
const getNaughties = computed(() => naughties.value)
function setNaughties(value: List) {
    naughties.value = value
}
return { 
    getConnections, 
    setConnections, 
    emptyConnections,
    getNicities, 
    setNicities,
    getNaughties,
    setNaughties,
    getUserId,
    setUser,
    getCharacter
}
})