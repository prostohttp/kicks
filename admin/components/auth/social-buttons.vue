<script lang="ts" setup>
import { eng } from "~/lang/eng";

const { signIn } = useAuth();
</script>

<template>
  <div class="flex justify-between gap-[5px] sm:gap-[24px]">
    <UTooltip :text="eng.loginGithub" class="w-[31%]">
      <AuthSocialButton
        @click="signIn('github')"
        link="https:github.com"
        :title="eng.loginGithub"
        class="w-full"
      >
        <img
          src="~/assets/img/icon-github.svg"
          class="scale-[300%] sm:scale-[270%]"
        />
      </AuthSocialButton>
    </UTooltip>
    <UTooltip :text="eng.loginYandex" class="w-[31%]">
      <AuthSocialButton
        :title="eng.loginYandex"
        @click="signIn('yandex')"
        class="w-full"
      >
        <img
          src="~/assets/img/icon-yandex.svg"
          class="scale-100 sm:scale-[170%]"
        />
      </AuthSocialButton>
    </UTooltip>
    <UTooltip :text="eng.loginDiscord" class="w-[31%]">
      <AuthSocialButton
        :title="eng.loginDiscord"
        @click="signIn('discord')"
        class="w-full"
      >
        <img
          src="~/assets/img/icon-discord.svg"
          class="scale-[200%] sm:scale-[200%]"
        />
      </AuthSocialButton>
    </UTooltip>
  </div>
</template>
