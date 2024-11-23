<script lang="ts" setup>
import { locale } from "~/lang/locale";

// store
const settingsDataStore = useSettingsDataStore();

// vars
const { signIn } = useAuth();
</script>

<template>
    <div class="flex justify-between gap-[5px] sm:gap-[24px]">
        <UTooltip
            :text="locale[settingsDataStore.locale].loginGithub"
            class="w-[31%]"
        >
            <AuthSocialButton
                @click="signIn('github')"
                link="https:github.com"
                :title="locale[settingsDataStore.locale].loginGithub"
                class="w-full"
            >
                <img
                    src="~/assets/img/icon-github.svg"
                    class="scale-[300%] sm:scale-[270%]"
                />
            </AuthSocialButton>
        </UTooltip>
        <UTooltip
            :text="locale[settingsDataStore.locale].loginYandex"
            class="w-[31%]"
        >
            <AuthSocialButton
                :title="locale[settingsDataStore.locale].loginYandex"
                @click="signIn('yandex')"
                class="w-full"
            >
                <img
                    src="~/assets/img/icon-yandex.svg"
                    class="scale-100 sm:scale-[170%]"
                />
            </AuthSocialButton>
        </UTooltip>
        <UTooltip
            :text="locale[settingsDataStore.locale].loginDiscord"
            class="w-[31%]"
        >
            <AuthSocialButton
                :title="locale[settingsDataStore.locale].loginDiscord"
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
