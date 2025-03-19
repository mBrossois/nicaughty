<script setup lang="ts">
import { usePartykitStore } from '~/store/partykit';

onUnmounted(() => {
    const partykitStore = usePartykitStore()
    if(partykitStore.getParty) {
        partykitStore.disconnect()
    }
})
</script>

<template>
    <div class="content-block">
        <RouterLink to="/"><h1 class="content-title">Nicaughty</h1></RouterLink>
        <hr/>
        <slot />
    </div>
</template>

<style lang="scss">
.content-block {
    width: 100dvw;
    height: 100dvh;

    background-color: #ffffffb0;
    backdrop-filter: blur(10px);

    padding: 1rem;

    .content-title {
        padding: 2rem 0;
        text-align: center;
        font-size: 3.5rem;
    }
}
</style>