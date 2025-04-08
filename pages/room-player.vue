<script setup lang="ts">
import AppCharactar from '~/components/AppCharactar.vue'
import { usePartykitStore } from '~/store/partykit'
import { useUsersStore } from '~/store/users'

const partykitStore = usePartykitStore()
const { getParty } = storeToRefs(partykitStore)

function updatePlayerName(name?: string) {
    getParty.value.send(JSON.stringify({messageType: 'player-name-change', value: name}))
}

const usersStore = useUsersStore()
const { getConnections, getUserId, getCharacter } = storeToRefs(usersStore)

const isConnectedToRoom = computed(() => {
    const playerConnected = getConnections.value.find(connection => connection.id === getUserId.value)
    return getConnections.value && getConnections.value.length > 0 && playerConnected
})

if(getParty.value) {
    getParty.value.addEventListener("message", (e) => {
        const result = JSON.parse(e.data)
        switch(result.messageType) {
            case 'connections': 
                usersStore.setConnections(result.connections)
                navigateTo('/room-player')
        }
    });
}


onUnmounted(() => {
    if(getParty.value) {
        partykitStore.disconnect()
    }
})
</script>

<template>
    <div>
        <div v-if="isConnectedToRoom" class="player_name">
            <AppText component="h2">Name<span class="required">*</span></AppText>
            <AppInput placeholder="Fill player name in" :maxlength="24" @blur="updatePlayerName"/>
            <AppCharactar v-if="getCharacter" :character="getCharacter" />
        </div>
        <div v-else>
            <AppText component="h2">You are not connected to any rooms</AppText>
            <AppButton to="/" color="primary" variant="primary">Go to home</AppButton>
        </div>
    </div>
</template>