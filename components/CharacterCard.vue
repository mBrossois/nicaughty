<script setup lang="ts">
import type { Characters } from '~/types/characters';

const props = defineProps<{
    name: string,
    character: Characters
}>()

const emits = defineEmits<{
    (event: 'remove'): void
}>()

function removeConnection() {
    emits('remove')
}
</script>

<template>
    <div class="card">
        <p class="text">
            <span class="name">{{ name }}</span>
            <span class="secondary">as</span>
            <span class="character">{{ character }}</span>
        </p>
        <div class="character-container">
            <AppCharactar :character="character" />
        </div>
        <img src="~/assets/icons/close-icon.svg" height="24" width="24" class="close" @click="removeConnection"/>
    </div>
</template>

<style lang="scss" scoped>
.card {
    width: 346px;
    height: 146px;
    background-color: color.$primary-color;
    border-radius: 15px;

    position: relative;

    box-shadow: 2px 2px 10px 4px rgba(0,0,0,0.2);

    overflow: hidden;

    .text {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        height: 100%;
        width: 140px;
        padding: 1rem;
        color: white;

        .name {
            font-size: 20px;
            line-height: 16px;
            word-wrap: break-word;
        }

        .secondary {
            font-size: 14px;
            line-height: 16px;
            padding-left: 24px;
        }

        .character {
            font-size: 16px;
            line-height: 16px;
            padding-left: 14px;
        }
    }

    .character-container {
        position: absolute;
        left: 110px;
        top: -38px;
    }

    .close {
        position: absolute;
        right: 1rem;
        top: 1rem;
        cursor: pointer;
    }
}
</style>