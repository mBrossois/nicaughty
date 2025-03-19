<script setup lang="ts">
import { usePartykitStore } from '~/store/partykit';
import { useUsersStore } from '~/store/users';

const error = ref()
const errors = {
    NOT_SET: 'Room name is required',
    TAKEN: 'Room has been taken'
}

const partykitStore = usePartykitStore()
const { getParty } = storeToRefs(partykitStore)
partykitStore.updateHost(true)

function updateRoomName(name?: string) {
    error.value = undefined

    if(getParty.value) {
        partykitStore.disconnect()
    }

    if(!name) {
        error.value = errors.NOT_SET
        return
    }

    partykitStore.connect(name || '')
}


const usersStore = useUsersStore()
const { getConnections } = storeToRefs(usersStore)
function removePlayer(id: string) {
    getParty.value.send(JSON.stringify({messageType: 'remove-player', value: id}))
}

watch(getParty, () => {
    if(getParty.value) {
        getParty.value.addEventListener("message", (e) => {
            const result = JSON.parse(e.data)
            switch(result.messageType) {
                case 'error':
                    if(result.message === 'Room taken') {
                        error.value = errors.TAKEN
                    }
                    partykitStore.disconnect()
                    return
                case 'connections': 
                    usersStore.setConnections(result.connections)
                    return
            }
            
        });
    }
})

onUnmounted(() => {
    if(getParty.value) {
        partykitStore.disconnect()
    }
})
</script>

<template>
    <div class="room">
        <div class="room_title">
            <AppText component="h2">Room<span class="required">*</span></AppText>
            <AppInput placeholder="Fill room name in" :has-error="true" @blur="updateRoomName"/>
            <AppText v-show="error" class="error" component="label">{{ error }}</AppText>
        </div>

        <div class="players">
            <AppText component="h2">Players {{ getConnections.length }}/{{ 8 }}</AppText>
            <div class="players_grid">
                <div v-for="connection in getConnections" :key="connection.id" class="player">
                    <div class="player_img"></div>
                    <div class="text">
                        <AppText component="p">Player:</AppText>
                        <AppText component="p">{{ connection.name || 'unknown'}}</AppText>
                    </div>
                    <AppButton class="btn" variant="primary" color="primary" @click="removePlayer(connection.id)">X</AppButton>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.room {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .room_title {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        height: 8rem;
    }

    .players .players_grid {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem 0;

        .player {
            background-color: color.$secondary_color;
            color: white;
            padding: 1rem;
            border-radius: 1rem;
            display: flex;
            align-items: center;

            .player_img {
                width: 100px;
                height: 100px;
            }
        }
    }
   
}
</style>