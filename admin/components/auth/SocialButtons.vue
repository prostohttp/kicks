<script lang="ts" setup>
const { signIn } = useAuth();
</script>

<template>
  <div class="flex justify-between gap-[5px] sm:gap-[24px]">
    <UTooltip text="Log in with Github" class="w-[31%]">
      <AuthSocialButton
        @click="signIn('github')"
        link="https:github.com"
        title="Log in with Github"
        class="w-full"
      >
        <img
          src="~~/assets/img/icon-github.svg"
          class="scale-[300%] sm:scale-[270%]"
        />
      </AuthSocialButton>
    </UTooltip>
    <UTooltip text="Log in with Yandex" class="w-[31%]">
      <AuthSocialButton
        title="Log in with Yandex"
        @click="signIn('yandex')"
        class="w-full"
      >
        <img
          src="~~/assets/img/icon-yandex.svg"
          class="scale-100 sm:scale-[170%]"
        />
      </AuthSocialButton>
    </UTooltip>
    <UTooltip text="Log in with Discord" class="w-[31%]">
      <AuthSocialButton
        title="Log in with Discord"
        @click="signIn('discord')"
        class="w-full"
      >
        <img
          src="~~/assets/img/icon-discord.svg"
          class="scale-[200%] sm:scale-[200%]"
        />
      </AuthSocialButton>
    </UTooltip>
  </div>
</template>
