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
        usersStore.emptyConnections()
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

            <div v-for="connection in getConnections" :key="connection.id" class="players_grid">
                <CharacterCard class="character" :name="connection.name ?? 'Unknown'" :character="connection.character!" @remove="removePlayer(connection.id)" />
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
        
        & > .character {
            &:nth-child(odd) {
                animation: animate-left 300ms ease-out;
            }
            &:nth-child(even) {
                animation: animate-right 300ms ease-out;
            }
        }
    }
}

@keyframes animate-left {
    from {
        transform: translateX(-105vw);
    }
    to {
        transform: translateX(0);
    }
}

@keyframes animate-right {
    from {
        transform: translateX(105vw);
    }
    to {
        transform: translateX(0);
    }
}
</style>