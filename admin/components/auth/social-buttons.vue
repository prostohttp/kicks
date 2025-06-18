<script lang="ts" setup>
import { locale } from "~/lang/locale";

// store
const settingsDataStore = useSettingsDataStore();

// vars
const { signIn } = useAuth();
</script>

<template>
    <div class="flex gap-[5px] sm:gap-[24px]">
        <UTooltip
            :text="locale[settingsDataStore.locale].loginGithub"
            class="w-[31%]"
        >
            <AuthSocialButton
                :title="locale[settingsDataStore.locale].loginGithub"
                class="w-full"
                link="https:github.com"
                @click="signIn('github')"
            >
                <img
                    class="scale-[300%] sm:scale-[270%]"
                    src="~/assets/img/icon-github.svg"
                />
            </AuthSocialButton>
        </UTooltip>
        <UTooltip
            :text="locale[settingsDataStore.locale].loginYandex"
            class="w-[31%]"
        >
            <AuthSocialButton
                :title="locale[settingsDataStore.locale].loginYandex"
                class="w-full"
                @click="signIn('yandex')"
            >
                <img
                    class="scale-100 sm:scale-[170%]"
                    src="~/assets/img/icon-yandex.svg"
                />
            </AuthSocialButton>
        </UTooltip>
    </div>
</template>
