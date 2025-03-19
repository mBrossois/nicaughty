<script setup lang="ts">
import { usePartykitStore } from '~/store/partykit';
import { useUsersStore } from '~/store/users';

const error = ref()
const errors = {
    NOT_SET: 'User name is required',
    NOT_FOUND: "We couldn't find the room"
}

const roomName = ref()
function updateRoomName(name?: string) {
    roomName.value = name
}

const usersStore = useUsersStore()

const partykitStore = usePartykitStore()
const { getParty } = storeToRefs(partykitStore)
function joinRoom() {
    if(getParty.value) {
        partykitStore.disconnect()
    }

    if(!roomName.value) {
        error.value = errors.NOT_SET
        return
    }
    partykitStore.connect(roomName.value)
}

watch(getParty, () => {
    if(getParty.value) {
        getParty.value.addEventListener("message", (e) => {
            const result = JSON.parse(e.data)
            console.log(result)
            switch(result.messageType) {
                case 'error':
                    if(result.message === 'Room not found') {
                        error.value = errors.NOT_FOUND
                    }
                    partykitStore.disconnect()
                    return;
                case 'set-id': 
                    usersStore.setUserId(result.value)
                    return;
                case 'connections': 
                    usersStore.setConnections(result.connections)
                    navigateTo('/room-player')
                    return;
            }
        });
    }
})
</script>

<template>
    <div class="room">
        <div class="room_title">
            <AppText component="h2">Room<span class="required">*</span></AppText>
            <AppInput placeholder="Fill room name in" @blur="updateRoomName"/>
            <AppText v-show="error" class="error" component="label">{{ error }}</AppText>
        </div>
        <AppButton class="btn" variant="primary" color="primary" @click="joinRoom">Join room</AppButton>
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
}
</style>