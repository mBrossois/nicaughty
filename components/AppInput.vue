<script setup lang="ts">
const props = defineProps<{
    value?: string,
    placeholder?: string
    hasError?: boolean
    maxlength?: number
}>()

const emits = defineEmits<{
    (e: 'blur', value?: string): void
}>()

const inputValue = ref(props.value)

function onBlur() {
    emits('blur', inputValue.value)
}
</script>

<template>
    <input v-model="inputValue" :placeholder="placeholder" :maxlength="maxlength" class="input" @blur="onBlur"/>
</template>

<style lang="scss" scoped>
.input {
    font-size: 1.5rem;
    border: none;
    background-color: transparent;
    padding: .5rem;
    border-radius: 10px;
    
    &:hover {
        outline: 1px solid black;
    }
}
</style>