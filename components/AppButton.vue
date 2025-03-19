<script setup lang="ts">
const props = defineProps<{
    variant?: 'primary' | 'secondary'
    color?: 'primary'| 'secondary' 
    to?: string,
    }>()

const component = props.to ? resolveComponent('NuxtLink') : 'button'

const style = [
    `color-${props.color}`,
    `variant-${props.variant}`
]
</script>

<template>
    <component :is="component" :to="to" class="btn" :class="style" type="button">
        <slot />
    </component>
</template>

<style lang="scss" scoped>
.btn {
    padding: 1rem;
    border-radius: 15px;
    --color: #{color.$primary-color};
    font-size: 2rem;
    text-decoration: none;
    text-align: center;
    display: block;

    &.color-primary {
        --color: #{color.$primary-color};
    }

    &.color-secondary {
        --color: #{color.$secondary-color};
    }

    &.variant-primary {
        background-color: var(--color);
        border: 1px solid var(--color);
        color: #ffffff;

        &:hover {
            background-color: #ffffff00;
            border: 1px solid var(--color);
            color: var(--color);
        }
    }

    &.variant-secondary {
        background-color: #ffffff00;
        border: 1px solid var(--color);
        color: var(--color);

        &:hover {
            background-color: var(--color);
            border: 1px solid var(--color);
            color: #ffffff;
        }
    }
}
</style>