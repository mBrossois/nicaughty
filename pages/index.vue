<script setup lang="ts">
</script>

<template>
    <div class="home-block">
        <AppButton class="btn" to="/room-host" variant="primary" color="primary">Create as host room</AppButton>
        <AppButton class="btn" to="/join-room" variant="secondary" color="primary">Join room</AppButton>
    </div>
</template>

<style lang="scss">
.home-block {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
}
</style>