<template>
    <div class="container">
        <div class="ping"></div>
    </div>
</template>

<script>
export default {
    name: 'Ping'
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(255,255,255,0.4);
    z-index: 1000;
}
.ping {
    --uib-size: 150px;
    --uib-color: #D76B42;
    --uib-speed: 2s;
    position: relative;
    height: var(--uib-size);
    width: var(--uib-size);
}

.ping::before,
.ping::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: var(--uib-color);
    animation: pulse var(--uib-speed) linear infinite;
    transform: scale(0);
    opacity: 0;
    transition: background-color 0.3s ease;
}

.ping::after {
    animation-delay: calc(var(--uib-speed) / -2);
}

@keyframes pulse {
    0% {
        transform: scale(0);
        opacity: 1;
    }

    100% {
        transform: scale(1);
        opacity: 0;
    }
}
</style>