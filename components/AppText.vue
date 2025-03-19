<script setup lang="ts">
defineProps<{
    component: 'p' | 'h1' | 'h2' | 'label'
}>()
</script>

<template>
    <component :is="component" :class="component">
        <slot />
    </component>
</template>

<style lang="scss">
.p {
    font-size: 1.5rem;
}

.h1 {
    font-size: 3rem;
}

.h2 {
    font-size: 2rem;
}

</style>