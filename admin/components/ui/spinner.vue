<template>
    <div
        class="w-full h-full flex justify-center items-center min-h-[300px] py-[40px] px-[30px]"
    >
        <svg :class="$style.spinner" viewBox="0 0 50 50">
            <circle
                :class="$style.path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke-width="5"
                class="dark:stroke-white"
            ></circle>
        </svg>
    </div>
</template>

<style module>
.spinner {
    -webkit-animation: rotate 2s linear infinite;
    animation: rotate 2s linear infinite;
    z-index: 2;
    margin: -25px 0 0 -25px;
    width: 50px;
    height: 50px;
}
.path {
    stroke: #232321;
    stroke-linecap: round;
    -webkit-animation: dash 1.5s ease-in-out infinite;
    animation: dash 1.5s ease-in-out infinite;
}

@-webkit-keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}
@-webkit-keyframes dash {
    0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
    }
    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
    }
}
@keyframes dash {
    0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
    }
    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
    }
}
</style>
