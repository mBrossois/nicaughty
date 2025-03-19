import type { Connections, List } from "~/types/connections"

export const useUsersStore = defineStore('users', () => {
const userId = ref()
const getUserId = computed(() => userId.value)
function setUserId(id?: string) {
    userId.value = id
}

const connections: Ref<Connections> = ref([])
const getConnections = computed(() => connections.value)
function setConnections(value: Connections) {
    connections.value = value
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
    getNicities, 
    setNicities,
    getNaughties,
    setNaughties,
    getUserId,
    setUserId
}

})