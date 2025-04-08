<script setup lang="ts">
import type { ConcreteComponent } from 'vue';
import type { Characters } from '~/types/characters';

defineProps<{
    character: Characters
}>()

const characters: Record<Characters, ConcreteComponent | string> = {
    baller: resolveComponent('CharactersBaller'),
    candela: resolveComponent('CharactersCandela'),
    cane: resolveComponent('CharactersCane'),
    hattie: resolveComponent('CharactersHattie'),
    jingley: resolveComponent('CharactersJingley'),
    snowflaker: resolveComponent('CharactersSnowflaker'),
    socku: resolveComponent('CharactersSocku'),
    treet: resolveComponent('CharactersTreet')
}
</script>

<template>
    <component :is="characters[character]" class="character" />
</template>

<style lang="scss" scoped>
.character {
    width: 201px;
    height: 234px;

    rotate: -15deg;
}
</style>